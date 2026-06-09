---
name: personal-knowledge
description: Use when working with this repository as a personal technical knowledge base: answering questions from local notes, saving or沉淀 AI conversation content into Markdown notes, classifying technical knowledge, updating indexes, organizing duplicate notes, or maintaining the knowledge taxonomy.
---

# Personal Knowledge

把这个仓库当作 Markdown 优先的个人技术知识库使用。

## 意图模式

行动前先判断用户意图：

- **Ask Mode**：用户在提问，希望基于知识库或通用技术知识得到回答。
- **Capture Mode**：用户要求保存、沉淀、总结、记录，或把对话内容整理成笔记。
- **Organize Mode**：用户要求分类、合并、整理、建立索引、重构目录或改进已有笔记。

如果意图不完全明确，优先根据措辞推断并继续。只有在可能把内容写入错误分类时，才问一个简短问题。

## Ask Mode

1. 先用 `rg` 搜索本地笔记。
2. 优先检索 `content/`、`topics/`、`index.md` 和 `README.md`。
3. 只读取和问题相关的文件。
4. 如果本地有相关内容，优先基于本地知识回答。
5. 引用本地文件时使用可点击 Markdown 链接。
6. 如果没有找到相关本地笔记，明确说明“当前知识库没有找到相关笔记”，再基于通用技术知识回答。

## Capture Mode

1. 读取 `references/taxonomy.md`，选择最合适的分类。
2. 读取 `references/writing-rules.md`，遵守写作和更新规则。
3. 创建新笔记前，先搜索是否已有相关笔记。
4. 根据内容类型使用 `templates/note.md`、`templates/decision.md` 或 `templates/incident.md`。
5. 每篇笔记只聚焦一个概念、一个决策或一次故障。
6. 更新对应分类的 `index.md`。
7. 如果新增内容是基础或高频知识，也更新根目录 `index.md`。
8. 最后报告修改了哪些文件。

## Organize Mode

1. 用 `rg` 搜索相关分类。
2. 识别重复、重叠、过时或未被索引的笔记。
3. 只做和当前请求相关的聚焦修改。
4. 保留有价值的背景、例子、决策和本地链接。
5. 更新受影响的索引。
6. 最后说明修改内容和原因。

## 分类与写作参考

- 使用 `references/taxonomy.md` 判断分类。
- 使用 `references/writing-rules.md` 判断命名、结构、链接和更新方式。

## 安全边界

- 不保存完整聊天记录，除非用户明确要求。
- 不编造来源。
- 修改已有内容前先查看 diff，不覆盖用户未确认的改动。
- 不主动执行 `git commit` 或 `git push`，除非用户明确要求。
- 修改范围保持在用户请求内。
