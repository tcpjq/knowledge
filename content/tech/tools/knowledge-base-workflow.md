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

| 类型 | 存储位置 | 适合内容 | 是否需要处理 |
| --- | --- | --- | --- |
| 评论 | GitHub Discussions | 讨论、补充、交流 | 不一定 |
| 反馈 | GitHub Issues | 缺失、错误、过时、待修改 | 是 |

简单判断：

- 想讨论：用评论。
- 想推动修改：用反馈。

## 后续 AI 修复闭环

后续可以基于 `content-feedback` Issue 建立自动修复流程：

```text
GitHub Issues(content-feedback)
  -> 定时 GitHub Actions
  -> AI 读取反馈和 Markdown 上下文
  -> 修改文章
  -> 创建修复分支
  -> 提交 Pull Request
  -> 飞书通知相关人员 review
  -> 人工合并
  -> GitHub 构建发布
  -> Issue 关闭
```

第一版已经完成的是反馈数据入口和 GitHub 存储。AI 自动校验、自动修改、飞书通知和自动关闭反馈 Issue 属于下一阶段。

## 关联

- [工具与效率](index.md)
- [Superpowers 到 Codex 的子 agent 编排链路](../ai/superpowers-to-codex-subagent-workflow.md)
