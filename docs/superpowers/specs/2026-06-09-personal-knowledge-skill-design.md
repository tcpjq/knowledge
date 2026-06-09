# Personal Knowledge Skill Design

## Goal

Build the first phase of this repository as an AI-assisted technical knowledge base.

This phase focuses on the writing workflow and content structure, not the web reading interface. The repository should gain a local Codex skill and a small set of Markdown conventions so future AI conversations can reliably distinguish between asking, saving, and organizing knowledge.

## Scope

In scope:

- Add a repository-local skill for personal knowledge management.
- Define how AI should classify user intent.
- Define stable content categories.
- Add reusable note templates.
- Add first-level content directories and index pages.
- Keep the system Markdown-first and easy to review in Git.

Out of scope for this phase:

- VitePress or other documentation site setup.
- Browser UI, left navigation, right table of contents, or search page.
- Vector database, embeddings, or external search services.
- Automated git commit or push behavior inside the skill.

## Repository Structure

The first implementation should add:

```text
skills/
  personal-knowledge/
    SKILL.md
    references/
      taxonomy.md
      writing-rules.md

content/
  ai/
    index.md
  architecture/
    index.md
  engineering/
    index.md
  database/
    index.md
  frontend/
    index.md
  backend/
    index.md
  tools/
    index.md
  incidents/
    index.md

templates/
  note.md
  decision.md
  incident.md

index.md
```

The existing `README.md` should stay as the repository entry point and link to the top-level `index.md`.

## Skill Behavior

The skill should be named `personal-knowledge`.

It should trigger when the user asks to:

- Ask questions based on this repository's knowledge.
- Save or沉淀 a concept, decision, summary, or learning.
- Organize, classify, merge, or update knowledge notes.
- Turn AI conversation content into reusable technical notes.

The skill should classify user intent into one of three modes.

### Ask Mode

Use when the user is asking a question and expects an answer.

Behavior:

- Search the repository first with `rg`.
- Prefer content under `content/`, `topics/`, and root index files.
- Answer from repository knowledge when relevant.
- Cite local files using clickable Markdown links.
- If the repository has no relevant note, answer from general technical knowledge and say that no local note was found.

### Capture Mode

Use when the user wants to save new knowledge from a conversation.

Behavior:

- Identify the best category.
- Create or update one Markdown note.
- Use the appropriate template from `templates/`.
- Keep each note focused on one concept, decision, or incident.
- Update the category `index.md`.
- Update top-level `index.md` when adding a new important note.

### Organize Mode

Use when the user wants to clean up or improve existing knowledge.

Behavior:

- Detect duplicate or overlapping notes.
- Propose merges when content has the same concept.
- Preserve useful context, examples, decisions, and links.
- Update affected category indexes.
- Avoid broad rewrites unless requested.

## Taxonomy

The first category set should stay small:

- `ai`: AI engineering, prompts, RAG, agents, model evaluation.
- `architecture`: architecture, system design, tradeoffs, solution design.
- `engineering`: testing, debugging, code review, refactoring, maintainability.
- `database`: storage, SQL, transactions, indexing, caching.
- `frontend`: UI engineering, browser behavior, frontend architecture.
- `backend`: APIs, services, queues, auth, backend architecture.
- `tools`: development tools, Git, CI/CD, productivity workflows.
- `incidents`: bugs, outages, postmortems, debugging records.

The taxonomy should be documented in `skills/personal-knowledge/references/taxonomy.md`.

## Writing Rules

The skill should follow these writing rules:

- Prefer concise, reusable notes over complete chat transcripts.
- One note should cover one clear knowledge unit.
- Use stable filenames in kebab case.
- Use frontmatter for metadata.
- Use Chinese for the main content unless the existing note is English.
- Preserve exact technical terms when English is clearer.
- Add examples when they improve later recall.
- Add local links when a related note exists.
- Do not invent sources.
- Do not overwrite user edits without checking the diff.

These rules should be documented in `skills/personal-knowledge/references/writing-rules.md`.

## Templates

### General Note

Use for technical concepts and reusable explanations.

Required sections:

- 核心结论
- 背景
- 内容
- 例子
- 关联

### Decision

Use for architecture and engineering choices.

Required sections:

- 背景
- 选项
- 决策
- 取舍
- 风险
- 复盘

### Incident

Use for bugs, failures, and debugging records.

Required sections:

- 现象
- 影响范围
- 排查过程
- 根因
- 修复方式
- 预防

## Data Flow

Capture flow:

```text
User says save/summarize/sediment knowledge
-> Skill classifies intent as Capture
-> Skill chooses category and template
-> Skill creates or updates note
-> Skill updates category index
-> Skill reports changed files
```

Ask flow:

```text
User asks technical question
-> Skill searches local repository
-> Skill reads relevant notes
-> Skill answers with links
-> Skill states when no local note exists
```

Organize flow:

```text
User asks to organize knowledge
-> Skill scans relevant category
-> Skill identifies overlaps or missing indexes
-> Skill applies focused cleanup
-> Skill reports changed files and rationale
```

## Error Handling

- If no category clearly fits, put the note in `content/engineering/` only when it is broadly technical; otherwise ask one concise question.
- If a matching note already exists, update it instead of creating a duplicate.
- If a requested save operation would rewrite a large existing note, summarize the proposed change before editing.
- If repository search finds nothing, the skill should still answer but mark the answer as not based on local notes.

## Testing And Verification

Because this phase is Markdown and workflow driven, verification should include:

- Confirm all intended files exist.
- Confirm Markdown links from `README.md` and `index.md` point to existing files.
- Run `git diff --check`.
- Use `rg` to verify taxonomy categories are present in the skill references.
- Manually inspect the skill description to ensure it triggers for ask, capture, and organize workflows.

## Future Phase

After this phase is stable, add a documentation site with VitePress:

- Left sidebar generated from content categories.
- Right table of contents for each Markdown page.
- Local full-text search.
- Build command for static publishing.

This should be a separate phase because the content model should stabilize before UI and search are added.
