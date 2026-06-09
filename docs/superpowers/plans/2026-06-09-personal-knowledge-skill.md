# Personal Knowledge Skill Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a repository-local personal knowledge workflow skill, Markdown content taxonomy, and reusable templates for AI-assisted technical knowledge capture.

**Architecture:** The repository remains Markdown-first. A local skill under `skills/personal-knowledge/` defines AI behavior, references describe taxonomy and writing rules, `content/` contains category indexes, and `templates/` contains reusable note formats.

**Tech Stack:** Markdown, Codex skills, Git, shell verification with `rg` and `git diff --check`.

---

## File Structure

- Create: `skills/personal-knowledge/SKILL.md`  
  Responsibility: Trigger and instruct the AI workflow for asking, capturing, and organizing repository knowledge.
- Create: `skills/personal-knowledge/references/taxonomy.md`  
  Responsibility: Define first-level knowledge categories and classification rules.
- Create: `skills/personal-knowledge/references/writing-rules.md`  
  Responsibility: Define note writing, naming, linking, and update rules.
- Create: `content/ai/index.md`  
  Responsibility: AI engineering category landing page.
- Create: `content/architecture/index.md`  
  Responsibility: architecture and system design category landing page.
- Create: `content/engineering/index.md`  
  Responsibility: engineering practice category landing page.
- Create: `content/database/index.md`  
  Responsibility: database and storage category landing page.
- Create: `content/frontend/index.md`  
  Responsibility: frontend category landing page.
- Create: `content/backend/index.md`  
  Responsibility: backend category landing page.
- Create: `content/tools/index.md`  
  Responsibility: tools and productivity category landing page.
- Create: `content/incidents/index.md`  
  Responsibility: incidents, bugs, and debugging records category landing page.
- Create: `templates/note.md`  
  Responsibility: Template for concept and reusable technical knowledge notes.
- Create: `templates/decision.md`  
  Responsibility: Template for architecture and engineering decisions.
- Create: `templates/incident.md`  
  Responsibility: Template for incidents and debugging records.
- Create: `index.md`  
  Responsibility: Top-level knowledge index.
- Modify: `README.md`  
  Responsibility: Link to the top-level knowledge index and current capability map.

## Task 1: Add Personal Knowledge Skill

**Files:**
- Create: `skills/personal-knowledge/SKILL.md`
- Create: `skills/personal-knowledge/references/taxonomy.md`
- Create: `skills/personal-knowledge/references/writing-rules.md`

- [ ] **Step 1: Create skill directories**

Run:

```bash
mkdir -p skills/personal-knowledge/references
```

Expected: command exits with status 0.

- [ ] **Step 2: Create `skills/personal-knowledge/SKILL.md`**

Write this exact content:

```markdown
---
name: personal-knowledge
description: Use when working with this repository as a personal technical knowledge base: answering questions from local notes, saving or沉淀 AI conversation content into Markdown notes, classifying technical knowledge, updating indexes, organizing duplicate notes, or maintaining the knowledge taxonomy.
---

# Personal Knowledge

Use this repository as a Markdown-first technical knowledge base.

## Intent Modes

Classify the user's request before acting:

- **Ask Mode**: The user asks a technical question or asks what the knowledge base says.
- **Capture Mode**: The user asks to save,沉淀, summarize, record, or turn conversation content into a note.
- **Organize Mode**: The user asks to classify, merge, clean up, index, restructure, or improve existing notes.

If the request is ambiguous, infer the most likely mode from wording and continue. Ask one concise question only when acting could write content to the wrong category.

## Ask Mode

1. Search local notes first with `rg`.
2. Prefer `content/`, `topics/`, `index.md`, and `README.md`.
3. Read only the relevant files.
4. Answer using repository knowledge when available.
5. Cite local files with clickable Markdown links.
6. If no relevant local note exists, say that no local note was found and answer from general technical knowledge.

## Capture Mode

1. Read `references/taxonomy.md` and choose the best category.
2. Read `references/writing-rules.md`.
3. Search for an existing related note before creating a new one.
4. Use `templates/note.md`, `templates/decision.md`, or `templates/incident.md`.
5. Keep one note focused on one concept, decision, or incident.
6. Update the category `index.md`.
7. Update root `index.md` when the note is important enough to be discoverable from the top level.
8. Report changed files.

## Organize Mode

1. Search the relevant category with `rg`.
2. Identify duplicate, overlapping, stale, or unindexed notes.
3. Make focused edits only.
4. Preserve useful context, examples, decisions, and local links.
5. Update affected indexes.
6. Report what changed and why.

## Category References

Use `references/taxonomy.md` for categories and classification.
Use `references/writing-rules.md` for note style, naming, metadata, and update rules.

## Safety

- Do not save complete chat transcripts unless explicitly requested.
- Do not invent sources.
- Do not overwrite user edits without checking the diff.
- Do not run git commit or git push unless the user explicitly asks.
- Keep edits scoped to the user's request.
```

- [ ] **Step 3: Create `skills/personal-knowledge/references/taxonomy.md`**

Write this exact content:

```markdown
# Knowledge Taxonomy

Use these first-level categories for technical knowledge.

## Categories

### AI (`content/ai/`)

AI engineering, prompts, RAG, agents, model evaluation, context management, AI product patterns, and model integration.

Examples:

- Prompt design
- RAG chunking strategy
- Agent tool calling
- Model evaluation
- AI safety for applications

### Architecture (`content/architecture/`)

Architecture, system design, solution design, tradeoffs, module boundaries, scalability, reliability, and evolution paths.

Examples:

- Modular monolith vs microservices
- Login system design
- Knowledge base architecture
- Queue-based async design
- Rollback and degradation strategy

### Engineering (`content/engineering/`)

General engineering practice, testing, debugging, code review, refactoring, maintainability, observability, and delivery quality.

Examples:

- Code review checklist
- Testing strategy
- Debugging workflow
- Error handling
- Logging and monitoring

### Database (`content/database/`)

Storage, SQL, NoSQL, transactions, indexing, caching, schema design, query optimization, and data consistency.

Examples:

- Transaction isolation
- Index design
- Cache invalidation
- Data modeling
- Query performance

### Frontend (`content/frontend/`)

Browser behavior, UI engineering, frontend architecture, state management, rendering, accessibility, and frontend performance.

Examples:

- Component design
- Client state vs server state
- Rendering performance
- Form state
- Accessibility patterns

### Backend (`content/backend/`)

APIs, services, authentication, authorization, queues, workers, backend architecture, service boundaries, and integration patterns.

Examples:

- REST API design
- Auth flow
- Background jobs
- Service error handling
- Rate limiting

### Tools (`content/tools/`)

Development tools, Git, CI/CD, editor workflows, command line productivity, automation, and local development setup.

Examples:

- Git workflow
- CI pipeline
- Local dev scripts
- Shell productivity
- Repository automation

### Incidents (`content/incidents/`)

Bugs, outages, postmortems, debugging records, production incidents, and lessons learned from failures.

Examples:

- Bug root cause analysis
- Outage postmortem
- Regression investigation
- Performance incident
- Prevention checklist

## Classification Rules

- Prefer the category that best matches the note's primary reusable value.
- If a note is about choosing between system designs, use `architecture`.
- If a note is about AI system behavior or model integration, use `ai`.
- If a note is about a bug or failure investigation, use `incidents`.
- If a note is broadly about code quality or delivery practices, use `engineering`.
- If two categories seem valid, choose one primary category and add links from related indexes later.
```

- [ ] **Step 4: Create `skills/personal-knowledge/references/writing-rules.md`**

Write this exact content:

```markdown
# Writing Rules

## Note Quality

- Prefer reusable notes over complete chat transcripts.
- One note should cover one clear knowledge unit.
- Explain the judgment, not just the conclusion.
- Include examples when they make the idea easier to reuse.
- Preserve English technical terms when translation would reduce precision.
- Use Chinese for the main content unless the existing note is English.

## File Naming

- Use kebab-case filenames.
- Use stable concept names rather than dates for durable notes.
- Use dates only for incidents or time-specific records.

Examples:

- `rag-chunking-strategy.md`
- `modular-monolith-vs-microservices.md`
- `2026-06-09-search-index-regression.md`

## Frontmatter

Use this frontmatter for normal notes:

```yaml
---
title:
category:
tags: []
created:
updated:
status: draft
---
```

Use `status: draft` for incomplete notes and `status: stable` for reviewed notes.

## Links

- Link related local notes when they exist.
- Use relative Markdown links.
- Do not create links to files that do not exist.
- Do not invent external sources.

## Updating Existing Notes

- Search before creating a new note.
- Update an existing note when the same concept already exists.
- Avoid broad rewrites unless the user asks for cleanup.
- Before editing a large note, identify the section that needs change.

## Index Updates

When adding a note:

1. Add it to the category `index.md`.
2. Add it to root `index.md` only if it is foundational or frequently useful.
3. Keep indexes short and scannable.
```

- [ ] **Step 5: Verify skill files**

Run:

```bash
rg -n "Ask Mode|Capture Mode|Organize Mode|content/ai|Writing Rules" skills/personal-knowledge
```

Expected: output includes matches from `SKILL.md`, `taxonomy.md`, and `writing-rules.md`.

- [ ] **Step 6: Commit Task 1**

Run:

```bash
git add skills/personal-knowledge
git commit -m "Add personal knowledge skill"
```

Expected: commit succeeds.

## Task 2: Add Content Categories And Root Index

**Files:**
- Create: `content/ai/index.md`
- Create: `content/architecture/index.md`
- Create: `content/engineering/index.md`
- Create: `content/database/index.md`
- Create: `content/frontend/index.md`
- Create: `content/backend/index.md`
- Create: `content/tools/index.md`
- Create: `content/incidents/index.md`
- Create: `index.md`

- [ ] **Step 1: Create content directories**

Run:

```bash
mkdir -p content/ai content/architecture content/engineering content/database content/frontend content/backend content/tools content/incidents
```

Expected: command exits with status 0.

- [ ] **Step 2: Create `content/ai/index.md`**

Write:

```markdown
# AI

AI 工程、Prompt、RAG、Agent、模型评估、上下文管理和 AI 应用架构。

## 章节

暂无。
```

- [ ] **Step 3: Create `content/architecture/index.md`**

Write:

```markdown
# 架构与系统设计

系统设计、架构取舍、模块边界、可靠性、可扩展性和演进路径。

## 章节

暂无。
```

- [ ] **Step 4: Create `content/engineering/index.md`**

Write:

```markdown
# 工程实践

测试、调试、代码审查、重构、可维护性、可观测性和交付质量。

## 章节

暂无。
```

- [ ] **Step 5: Create `content/database/index.md`**

Write:

```markdown
# 数据库与存储

数据库、事务、索引、缓存、数据建模、查询优化和一致性。

## 章节

暂无。
```

- [ ] **Step 6: Create `content/frontend/index.md`**

Write:

```markdown
# 前端

浏览器、UI 工程、前端架构、状态管理、渲染、可访问性和性能。

## 章节

暂无。
```

- [ ] **Step 7: Create `content/backend/index.md`**

Write:

```markdown
# 后端

API、服务、认证授权、队列、后台任务、服务边界和集成模式。

## 章节

暂无。
```

- [ ] **Step 8: Create `content/tools/index.md`**

Write:

```markdown
# 工具与效率

开发工具、Git、CI/CD、编辑器工作流、命令行效率、自动化和本地开发环境。

## 章节

暂无。
```

- [ ] **Step 9: Create `content/incidents/index.md`**

Write:

```markdown
# 故障与复盘

Bug、故障、排查记录、复盘、性能问题和从失败中沉淀的预防经验。

## 章节

暂无。
```

- [ ] **Step 10: Create root `index.md`**

Write:

```markdown
# 知识库索引

这是个人技术知识库的总入口。

## 能力地图

- [AI 时代技术能力地图](topics/ai-era-technical-capability-map.md)

## 分类

- [AI](content/ai/index.md)
- [架构与系统设计](content/architecture/index.md)
- [工程实践](content/engineering/index.md)
- [数据库与存储](content/database/index.md)
- [前端](content/frontend/index.md)
- [后端](content/backend/index.md)
- [工具与效率](content/tools/index.md)
- [故障与复盘](content/incidents/index.md)

## 使用方式

- 提问知识时，优先检索本仓库已有内容。
- 沉淀知识时，优先写成独立 Markdown 笔记。
- 整理知识时，更新对应分类索引和相关链接。
```

- [ ] **Step 11: Verify category files**

Run:

```bash
find content -maxdepth 2 -name index.md | sort
```

Expected output:

```text
content/ai/index.md
content/architecture/index.md
content/backend/index.md
content/database/index.md
content/engineering/index.md
content/frontend/index.md
content/incidents/index.md
content/tools/index.md
```

- [ ] **Step 12: Commit Task 2**

Run:

```bash
git add content index.md
git commit -m "Add knowledge content taxonomy"
```

Expected: commit succeeds.

## Task 3: Add Note Templates

**Files:**
- Create: `templates/note.md`
- Create: `templates/decision.md`
- Create: `templates/incident.md`

- [ ] **Step 1: Create templates directory**

Run:

```bash
mkdir -p templates
```

Expected: command exits with status 0.

- [ ] **Step 2: Create `templates/note.md`**

Write:

```markdown
---
title:
category:
tags: []
created:
updated:
status: draft
---

# 标题

## 核心结论

## 背景

## 内容

## 例子

## 关联
```

- [ ] **Step 3: Create `templates/decision.md`**

Write:

```markdown
---
title:
category:
tags: []
created:
updated:
status: draft
---

# 标题

## 背景

## 选项

## 决策

## 取舍

## 风险

## 复盘
```

- [ ] **Step 4: Create `templates/incident.md`**

Write:

```markdown
---
title:
category: incidents
tags: []
created:
updated:
status: draft
---

# 标题

## 现象

## 影响范围

## 排查过程

## 根因

## 修复方式

## 预防
```

- [ ] **Step 5: Verify template sections**

Run:

```bash
rg -n "核心结论|决策|现象|status: draft" templates
```

Expected: output includes matches from all three template files.

- [ ] **Step 6: Commit Task 3**

Run:

```bash
git add templates
git commit -m "Add knowledge note templates"
```

Expected: commit succeeds.

## Task 4: Update README And Verify Links

**Files:**
- Modify: `README.md`

- [ ] **Step 1: Replace `README.md` content**

Write:

```markdown
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

## 建设原则

- 优先沉淀可复用的技术判断，而不是保存完整聊天记录。
- 每个知识点尽量独立、具体、可链接。
- 重要内容需要记录背景、取舍、例子和后续行动。
- 后续可以接入 VitePress，提供左侧目录、右侧章节目录和全文检索。
```

- [ ] **Step 2: Verify expected links exist**

Run:

```bash
test -f index.md && test -f topics/ai-era-technical-capability-map.md && test -f content/ai/index.md && test -f skills/personal-knowledge/SKILL.md
```

Expected: command exits with status 0.

- [ ] **Step 3: Run Markdown whitespace check**

Run:

```bash
git diff --check
```

Expected: no output and exit status 0.

- [ ] **Step 4: Commit Task 4**

Run:

```bash
git add README.md
git commit -m "Update knowledge repository README"
```

Expected: commit succeeds.

## Task 5: Final Verification

**Files:**
- Read: `README.md`
- Read: `index.md`
- Read: `skills/personal-knowledge/SKILL.md`
- Read: `skills/personal-knowledge/references/taxonomy.md`
- Read: `skills/personal-knowledge/references/writing-rules.md`

- [ ] **Step 1: Verify repository structure**

Run:

```bash
find skills/personal-knowledge content templates -maxdepth 3 -type f | sort
```

Expected output includes:

```text
content/ai/index.md
content/architecture/index.md
content/backend/index.md
content/database/index.md
content/engineering/index.md
content/frontend/index.md
content/incidents/index.md
content/tools/index.md
skills/personal-knowledge/SKILL.md
skills/personal-knowledge/references/taxonomy.md
skills/personal-knowledge/references/writing-rules.md
templates/decision.md
templates/incident.md
templates/note.md
```

- [ ] **Step 2: Verify skill trigger coverage**

Run:

```bash
rg -n "answering questions|saving|classifying|Ask Mode|Capture Mode|Organize Mode" skills/personal-knowledge/SKILL.md
```

Expected: output shows the skill description and the three mode headings.

- [ ] **Step 3: Verify taxonomy coverage**

Run:

```bash
rg -n "content/(ai|architecture|engineering|database|frontend|backend|tools|incidents)/" skills/personal-knowledge/references/taxonomy.md
```

Expected: output includes all eight category paths.

- [ ] **Step 4: Verify no Markdown whitespace errors**

Run:

```bash
git diff --check HEAD
```

Expected: no output and exit status 0.

- [ ] **Step 5: Check git status**

Run:

```bash
git status --short --branch
```

Expected: clean working tree. Branch may be ahead of `origin/main` if not pushed yet.
