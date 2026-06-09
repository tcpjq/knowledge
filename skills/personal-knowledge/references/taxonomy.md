# 知识模块与分类

知识库采用两层结构：

```text
模块 module
  章节 section
    笔记 note
```

网页端左侧只展示当前模块下的章节和笔记，避免不同领域混在一起。

## 模块

### 技术 (`content/tech/`)

技术模块用于沉淀 AI 工程、架构与系统设计、工程实践、数据库、前端、后端、工具效率和故障复盘。

章节：

- `content/tech/ai/`：AI 工程、Prompt、RAG、Agent、模型评估、上下文管理和模型集成。
- `content/tech/architecture/`：架构、系统设计、方案设计、技术取舍、模块边界、可靠性和演进路径。
- `content/tech/engineering/`：测试、调试、代码审查、重构、可维护性、可观测性和交付质量。
- `content/tech/database/`：存储、SQL、NoSQL、事务、索引、缓存、Schema 设计和数据一致性。
- `content/tech/frontend/`：浏览器行为、UI 工程、前端架构、状态管理、渲染、可访问性和前端性能。
- `content/tech/backend/`：API、服务、认证、授权、队列、Worker、服务边界和集成模式。
- `content/tech/tools/`：开发工具、Git、CI/CD、编辑器工作流、命令行效率和自动化。
- `content/tech/incidents/`：Bug、故障、复盘、调试记录、生产事故和预防经验。

### 沟通 (`content/communication/`)

沟通模块用于沉淀表达、写作、会议、反馈、谈判、协作和关系处理。

### 旅游 (`content/travel/`)

旅游模块用于沉淀目的地、攻略、预算、行程、签证、酒店和旅行复盘。

### 主题 (`topics/`)

主题用于跨模块的能力地图、路线图和长期索引。

## 分类规则

- 优先判断内容属于哪个模块，再判断模块内章节。
- 技术相关内容默认进入 `content/tech/`。
- 如果笔记重点是系统方案选择，放入 `content/tech/architecture/`。
- 如果笔记重点是 AI 系统行为或模型集成，放入 `content/tech/ai/`。
- 如果笔记来自 bug、故障或排查过程，放入 `content/tech/incidents/`。
- 如果笔记重点是代码质量、交付质量或工程方法，放入 `content/tech/engineering/`。
- 沟通、旅游等非技术内容不要写进技术模块。
- 如果两个章节都合适，选择一个主章节，后续可以从相关章节索引补链接。
