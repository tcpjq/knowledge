---
title: 知识库使用与反馈流程
module: tech
section: tools
tags: [knowledge-base, github, giscus, search, feedback]
created: 2026-06-10
updated: 2026-06-11
status: stable
---

# 知识库使用与反馈流程

## 核心结论

当前知识库是一个基于 Markdown、GitHub 和静态前端的个人知识系统。

内容存储在 Git 仓库中，网页端通过构建脚本生成搜索索引和导航数据；读者可以搜索知识、查看相关知识、在文章底部评论，也可以对整篇文章、某个段落或选中文字提交 GitHub Issue 反馈。

这个设计把不同类型的互动分开：

- 普通讨论走 GitHub Discussions / giscus。
- 内容缺失、错误、过时等可处理反馈走 GitHub Issues。
- 内容修复仍然通过 Pull Request 和 review 合并。

## 存储结构

知识内容以 Markdown 文件存储在仓库中。

主要目录：

```text
content/
  tech/
  communication/
  travel/

topics/

web/
  src/
  scripts/
  tests/
```

内容组织采用两层分类：

```text
模块 module
  章节 section
    笔记 note
```

例如：

```text
content/tech/tools/knowledge-base-workflow.md
```

表示：

- module：`tech`
- section：`tools`
- note：`knowledge-base-workflow`

新增笔记时，需要同步更新对应章节的 `index.md`，让网页导航能展示出来。

## 构建流程

网页端在构建时读取 Markdown 内容，并生成静态数据文件：

```text
Markdown 文件
  -> web/scripts/generate-knowledge-data.mjs
  -> web/src/generated/knowledge-data.ts
  -> React 前端渲染导航、正文、搜索、相关知识
```

构建命令：

```bash
cd web
npm run build
```

测试命令：

```bash
cd web
npm run test
```

构建不会把评论或反馈写回 Markdown。评论和反馈分别存储在 GitHub Discussions 和 GitHub Issues 中。

## 如何搜索知识

网页顶部提供全文搜索。

搜索数据来自每篇文档的：

- 标题
- 文件路径
- 模块和章节名
- tags
- Markdown 正文
- 按标题切分的正文 chunk

搜索逻辑在：

```text
web/src/search.ts
```

搜索结果会显示：

- 匹配文档标题
- 所属模块和章节
- 命中的正文片段
- 匹配关键词高亮

文章内选中文字时，也会触发一次本地搜索，用选中的文本查找相关知识点。

## 如何关联知识

知识关联分两类：手动关联和运行时自动关联。

### 手动关联

在 Markdown 文章末尾添加 `## 关联` 章节：

```markdown
## 关联

- [AI](../ai/index.md)
- [工具与效率](index.md)
```

手动关联优先级最高。网页端会解析这些链接，并优先展示到文章底部的“相关知识”区域。

### 运行时自动关联

如果手动关联不足，前端会基于当前文档自动补充相关内容。

自动关联会参考：

- title
- tags
- 二级和三级标题
- 正文中的问题式句子
- 本地搜索结果

自动关联在浏览器运行时计算，不再依赖构建期生成的 `relatedDocIds`。

## 如何评论

文章底部的“评论”区域使用 giscus。

giscus 的作用是把 GitHub Discussions 嵌入到静态网页中：

```text
文章页面
  -> giscus script
  -> GitHub Discussions
```

当前配置：

```text
repo: tcpjq/knowledge
repoId: R_kgDOS1ZCvQ
category: General
categoryId: DIC_kwDOS1ZCvc4C-5Bs
mapping: specific
theme: preferred_color_scheme
lang: zh-CN
```

因为当前网页是 SPA，切换文章时浏览器 pathname 不变，所以不能用 `pathname` 做 discussion 映射。

当前使用 `specific` 映射，并由前端按文章生成 term：

```text
knowledge:<doc.id>
```

例如：

```text
knowledge:content/tech/tools/knowledge-base-workflow
```

这样每篇文章都有独立的 Discussion。

评论适合用于：

- 讨论文章观点
- 补充背景
- 读者交流
- 非必须处理的留言

## 如何反馈问题

如果文章内容缺失、不准确、过时或需要修改，应该使用内容反馈，而不是普通评论。

网页端提供三种反馈入口：

- `反馈本文问题`：针对整篇文章。
- `反馈此段`：针对某个段落。
- `反馈选中文字`：针对选中的原文。

这些入口都会打开 GitHub 新建 Issue 页面，并预填：

- 文档标题
- Markdown 路径
- 位置
- 原文
- 问题说明模板
- 期望修改模板
- `content-feedback` label

反馈 Issue 的模板在：

```text
.github/ISSUE_TEMPLATE/content-feedback.md
```

反馈适合用于：

- 指出事实错误。
- 补充缺失概念。
- 标记过时内容。
- 建议改写不清楚的段落。
- 给后续 AI 自动修复提供结构化输入。

如果 AI 判断反馈信息不足，会给 Issue 加上 `content-feedback-blocked` 标签并评论说明缺少什么。

这个标签表示“待补充信息”，不是永久拒绝。处理方式是：

1. 直接编辑同一个 Issue。
2. 补充 `问题说明`，说明具体哪里不对、缺失、过时或表达不清。
3. 补充 `期望修改`，说明希望补充什么，或希望把原文改成什么。
4. 移除 `content-feedback-blocked` 标签。

下一轮定时检测会重新处理这个 Issue。

## 评论和反馈的区别

```text
类型  存储位置              适合内容                  是否需要处理
评论  GitHub Discussions  讨论、补充、交流          不一定
反馈  GitHub Issues       缺失、错误、过时、待修改  是
```

简单判断：

- 想讨论：用评论。
- 想推动修改：用反馈。

## AI 修复闭环

当前第一版已经接入个人服务器上的内容反馈 agent。它把 `content-feedback` Issue 转成知识库修复 PR，但不自动合并。

完整流程：

```text
GitHub Issues(content-feedback)
  -> systemd timer 定期启动个人服务器 runner
  -> runner 创建临时 git worktree
  -> Codex 读取仓库内 skill
  -> AI 读取反馈和 Markdown 上下文
  -> 修改文章和生成数据
  -> runner 校验变更范围、测试、构建
  -> runner 推送 ai/content-feedback-<issue-number> 分支
  -> runner 创建 Pull Request
  -> runner 在原 Issue 评论 PR 链接
  -> 人工 review 并合并 PR
  -> GitHub 构建发布
  -> GitHub 根据 Fixes #<issue-number> 自动关闭 Issue
```

### 1. 创建内容反馈 Issue

读者在文章页点击反馈入口：

- `反馈本文问题`
- `反馈此段`
- `反馈选中文字`

网页会打开 GitHub 新建 Issue 页面，并预填文档路径、位置、原文、问题说明、期望修改和 `content-feedback` 标签。

Issue 内容越具体，AI 越容易处理。至少应该说明：

- 哪里缺失、不准确、过时或表达不清。
- 希望补充什么，或希望把原文改成什么。
- 如果是选中文字反馈，Issue 会带上选中文本和前后上下文。

### 2. 服务器定期扫描 Issue

个人服务器通过 systemd timer 定期启动 runner：

```text
knowledge-agent.timer
  -> knowledge-agent.service
  -> scripts/content-feedback-agent/run.sh
```

runner 会查找 open 状态、带 `content-feedback` 标签、且没有 `content-feedback-blocked` 标签的 Issue。

如果某个 Issue 已经有打开的修复 PR，例如分支 `ai/content-feedback-5` 已经存在对应 PR，runner 会直接跳过，不再重复启动 Codex。

### 3. Codex 根据仓库 skill 修改内容

runner 不直接让 Codex 随意工作，而是生成一次性 prompt，要求 Codex 读取仓库内标准 skill：

```text
.agents/skills/content-feedback-agent/SKILL.md
```

这个 skill 规定：

- 每次只处理一个 Issue。
- 只允许修改知识内容和生成数据。
- 不允许 Codex commit、push、创建 PR、关闭 Issue 或改 label。
- 必须写入 `.agent/content-feedback-result.json`，告诉外层 runner 处理结果。

这样做的边界是：Codex 只负责理解反馈和修改内容；Git 操作、验证、PR 创建都由 shell runner 控制。

### 4. runner 验证、提交分支并创建 PR

如果 Codex 返回 `changed`，runner 会继续执行：

```text
校验变更文件范围
  -> cd web && npm run generate
  -> cd web && npm run test
  -> cd web && npm run build
  -> git commit
  -> git push origin ai/content-feedback-<issue-number>
  -> 创建 Pull Request
```

允许修改的文件范围是：

```text
content/**/*.md
topics/**/*.md
web/src/generated/knowledge-data.ts
```

如果 Codex 改了 workflow、依赖文件、脚本或其他不在白名单里的文件，runner 会失败，不会创建 PR。

PR 标题格式：

```text
Fix content feedback #<issue-number>
```

PR body 会包含：

```text
Fixes #<issue-number>
```

这个字段很重要。PR 合并到默认分支后，GitHub 会自动关闭对应 Issue。

### 5. 合并 PR 后 Issue 如何解决

Issue 不由 agent 直接关闭，而是在 PR 合并后由 GitHub 自动关闭。

例如：

```text
Issue: #5 内容反馈：什么是架构
PR:    #6 Fix content feedback #5
Body:  Fixes #5
```

当 PR #6 合并到 `main` 后：

- GitHub 自动关闭 Issue #5。
- GitHub Actions 按主分支更新触发构建发布。
- 下一轮 agent 只扫描 open Issue，所以不会再处理 #5。

如果 PR 被关闭但没有合并，Issue 仍然 open；这时后续定时扫描可能会再次处理这个 Issue。

### 6. 信息不足时如何处理

如果 AI 判断 Issue 信息不足，会返回 `blocked`。

runner 会：

- 给 Issue 加上 `content-feedback-blocked` 标签。
- 评论说明缺少什么信息。
- 跳过这个 Issue，直到有人补充信息。

处理方式：

1. 直接编辑同一个 Issue。
2. 补充清楚 `问题说明` 和 `期望修改`。
3. 移除 `content-feedback-blocked` 标签。
4. 等下一轮定时扫描重新处理。

### 7. 当前服务器配置

运行配置在服务器本地，不提交到仓库：

```text
~/.config/knowledge-agent/env
```

核心配置项：

```bash
REPO_DIR=/jockie/code/my/knowledge
REPO_FULL_NAME=tcpjq/knowledge
AGENT_PROVIDER=codex
WORKTREE_ROOT=/tmp/knowledge-content-feedback-agent
BASE_BRANCH=main
BLOCKED_LABEL=content-feedback-blocked
CODEX_BYPASS_SANDBOX=1
FEISHU_WEBHOOK=
```

systemd 配置：

```text
~/.config/systemd/user/knowledge-agent.service
~/.config/systemd/user/knowledge-agent.timer
```

常用操作：

```bash
systemctl --user status knowledge-agent.timer
systemctl --user status knowledge-agent.service
systemctl --user start knowledge-agent.service
journalctl --user -u knowledge-agent.service -f
```

临时 worktree 不包含被 Git 忽略的 `web/node_modules`。runner 会把主仓库的 `web/node_modules` 链接到临时 worktree 中，所以服务器主仓库需要先安装前端依赖：

```bash
cd /jockie/code/my/knowledge/web
npm install
```

### 8. 为什么不在 GitHub Actions 里跑 Codex

当前选择个人服务器定期扫描，而不是 GitHub Actions 直接跑 Codex，主要原因是：

- Codex 登录态和个人配置留在服务器本地，避免提交到仓库或 CI 配置中。
- runner 可以使用本地已登录的 `gh` 和 `codex`。
- 可以以后替换 `AGENT_PROVIDER`，例如从 Codex 换成 Claude。
- GitHub Actions 只负责合并后的构建发布，避免每个反馈分支都自动打包镜像。

这个设计的关键边界是：AI 负责提出修改，人工通过 PR review 决定是否合并。

## 关联

- [工具与效率](index.md)
- [Superpowers 到 Codex 的子 agent 编排链路](../ai/superpowers-to-codex-subagent-workflow.md)
