# Knowledge

这是我的个人知识库，当前重点用于沉淀技术相关知识，并辅助后续和 AI 对话、学习、方案设计与工程判断。

## 入口

- [知识库索引](index.md)
- [AI 时代技术能力地图](topics/ai-era-technical-capability-map.md)

## 工作流

- 提问知识：先检索本仓库已有内容，再结合通用技术知识回答。
- 沉淀知识：把聊天内容整理成结构化 Markdown 笔记，而不是保存完整聊天记录。
- 整理知识：合并重复内容，更新分类索引，补充关联链接。

## 分类

- [AI](content/ai/index.md)
- [架构与系统设计](content/architecture/index.md)
- [工程实践](content/engineering/index.md)
- [数据库与存储](content/database/index.md)
- [前端](content/frontend/index.md)
- [后端](content/backend/index.md)
- [工具与效率](content/tools/index.md)
- [故障与复盘](content/incidents/index.md)

## 网页端

网页端位于 `web/`，内容来自本仓库 Markdown 文件，不使用数据库。

常用命令：

```bash
cd web
npm install
npm run generate
npm run dev
npm run build
```

### GitHub Pages 部署

网页端使用 GitHub Actions 自动部署到 GitHub Pages。推送到 `main` 后，workflow 会在 `web/` 中执行构建，并发布 `web/dist`。

首次使用需要在 GitHub 仓库设置中启用 Pages：

1. 打开仓库 Settings。
2. 进入 Pages。
3. Source 选择 `GitHub Actions`。

部署地址：

```text
https://tcpjq.github.io/knowledge/
```

## 建设原则

- 优先沉淀可复用的技术判断，而不是保存完整聊天记录。
- 每个知识点尽量独立、具体、可链接。
- 重要内容需要记录背景、取舍、例子和后续行动。
- 后续可以接入 VitePress，提供左侧目录、右侧章节目录和全文检索。
