# Custom Knowledge Web Design

## Goal

Build a custom web UI for browsing and searching this Markdown knowledge repository.

The web app must live under `web/`, use repository Markdown files as the only content source, and avoid any database or backend dependency.

## Scope

In scope:

- Add a `web/` frontend app.
- Read knowledge from repository Markdown files.
- Generate static frontend data at build time.
- Provide category navigation, article rendering, article table of contents, and local search.
- Keep content editing in Markdown and Git.

Out of scope:

- Database storage.
- Backend API.
- Authentication.
- Online editing.
- Vector search or embeddings.
- Automatic Git commits from the web UI.
- Deployment pipeline.

## Technology Choice

Use:

- Vite
- React
- TypeScript
- Markdown parsing/rendering in the frontend
- Node script for static data generation

Reasoning:

- The repository already uses Markdown as the source of truth.
- Vite keeps local development and static builds simple.
- React is a good fit for a custom split-pane knowledge UI.
- Build-time data generation avoids runtime filesystem access and avoids a backend.

## Repository Layout

Add:

```text
web/
  package.json
  index.html
  vite.config.ts
  tsconfig.json
  scripts/
    generate-knowledge-data.mjs
  src/
    App.tsx
    main.tsx
    styles.css
    generated/
      knowledge-data.ts
```

The generated file `web/src/generated/knowledge-data.ts` should be committed for now so the app can run immediately after install. The generation script should be repeatable and overwrite it.

## Content Sources

The generator should read:

```text
README.md
index.md
content/**/*.md
topics/**/*.md
```

It should not read:

```text
web/**
docs/superpowers/**
templates/**
skills/**
.git/**
```

## Data Model

The generated data should expose:

```ts
export type Heading = {
  level: number;
  text: string;
  slug: string;
};

export type KnowledgeDoc = {
  id: string;
  title: string;
  path: string;
  category: string;
  categoryLabel: string;
  tags: string[];
  headings: Heading[];
  body: string;
  searchText: string;
};

export type KnowledgeCategory = {
  id: string;
  label: string;
  docs: string[];
};

export const knowledgeDocs: KnowledgeDoc[] = [];
export const knowledgeCategories: KnowledgeCategory[] = [];
```

`id` should be the normalized relative file path without `.md`.

`title` should come from frontmatter `title`, then first H1, then filename.

`category` should come from frontmatter `category`, then path segment under `content/`, then `general`.

## Category Labels

Use these labels:

- `ai`: AI
- `architecture`: 架构与系统设计
- `engineering`: 工程实践
- `database`: 数据库与存储
- `frontend`: 前端
- `backend`: 后端
- `tools`: 工具与效率
- `incidents`: 故障与复盘
- `topics`: 主题
- `general`: 通用

## UI Layout

The app should use a three-column desktop layout:

```text
left sidebar | main article | right article toc
```

Top search should be visible above the main content area.

### Left Sidebar

Show:

- App title.
- Category groups.
- Docs under each category.
- Active doc state.

### Main Article

Show:

- Current document title.
- Metadata: path, category, tags when present.
- Markdown-rendered content.

Markdown rendering should support:

- headings
- paragraphs
- unordered and ordered lists
- inline code
- fenced code blocks
- blockquotes
- links
- bold text

### Right TOC

Show H2 and H3 headings for the current document.

Clicking a heading should scroll to the heading anchor.

### Search

Search should be local and client-side.

Search should match:

- title
- path
- category label
- tags
- body text

When the query is empty, show normal category navigation.

When the query is non-empty:

- Show matching results.
- Highlight active result by opening it when clicked.
- Keep matching simple and deterministic with case-insensitive substring matching.

## Responsive Behavior

Desktop:

- Three columns.
- Left sidebar fixed width.
- Right TOC fixed width.
- Main content scrolls naturally.

Mobile:

- Stack layout.
- Sidebar becomes a top section.
- TOC appears below article title or after the article metadata.
- No overlapping text or fixed elements that hide content.

## Styling Direction

Use a quiet technical knowledge base style:

- Dense but readable.
- Neutral background.
- Strong text contrast.
- Minimal decoration.
- No marketing hero.
- No card-heavy landing page.

Cards may be used for search results or doc list items, but avoid nested cards.

## Error Handling

Generator:

- If a Markdown file has invalid or missing frontmatter, still include it.
- If no H1 exists, derive the title from filename.
- If a category is unknown, use `general`.
- If the generated file directory does not exist, create it.

Frontend:

- If no docs exist, show an empty state.
- If search has no results, show a no-results message.
- If a selected doc id is missing, fall back to the first doc.

## Verification

Implementation should verify:

- `npm install` succeeds inside `web/`.
- `npm run generate` creates `src/generated/knowledge-data.ts`.
- `npm run build` succeeds.
- A local dev server starts.
- The page displays at least the architecture note.
- Search finds “架构”.
- Left navigation shows the architecture category.
- Right TOC shows headings from the current article.

## Future Work

Later phases may add:

- Better full-text search scoring.
- Fuzzy search.
- Tag pages.
- Static deployment.
- Generated sidebar ordering.
- Markdown link rewriting for internal navigation.
- Dark mode.
