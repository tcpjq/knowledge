# Custom Knowledge Web Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a custom static web UI under `web/` for browsing and searching Markdown knowledge in this repository.

**Architecture:** A Node generation script scans repository Markdown files and writes `web/src/generated/knowledge-data.ts`. The React app reads that static data, renders a three-pane knowledge UI, and performs client-side substring search without a database or backend.

**Tech Stack:** Vite, React, TypeScript, Node.js, Markdown text parsing, CSS.

---

## File Structure

- Create: `web/package.json`  
  Responsibility: npm scripts and frontend dependencies.
- Create: `web/index.html`  
  Responsibility: Vite HTML entry.
- Create: `web/vite.config.ts`  
  Responsibility: Vite React configuration.
- Create: `web/tsconfig.json`  
  Responsibility: TypeScript project settings.
- Create: `web/scripts/generate-knowledge-data.mjs`  
  Responsibility: scan Markdown files and generate frontend data.
- Create: `web/src/generated/knowledge-data.ts`  
  Responsibility: generated static knowledge data consumed by React.
- Create: `web/src/main.tsx`  
  Responsibility: React bootstrapping.
- Create: `web/src/App.tsx`  
  Responsibility: app state, search, navigation, Markdown rendering, and TOC.
- Create: `web/src/styles.css`  
  Responsibility: responsive three-column knowledge UI styling.
- Modify: `README.md`  
  Responsibility: document web app commands.

## Task 1: Scaffold Web App

**Files:**
- Create: `web/package.json`
- Create: `web/index.html`
- Create: `web/vite.config.ts`
- Create: `web/tsconfig.json`
- Create: `web/src/main.tsx`
- Create: `web/src/App.tsx`
- Create: `web/src/styles.css`

- [ ] **Step 1: Create directories**

Run:

```bash
mkdir -p web/src
```

Expected: command exits with status 0.

- [ ] **Step 2: Create `web/package.json`**

Write:

```json
{
  "name": "knowledge-web",
  "private": true,
  "version": "0.1.0",
  "type": "module",
  "scripts": {
    "dev": "vite --host 0.0.0.0",
    "generate": "node scripts/generate-knowledge-data.mjs",
    "build": "npm run generate && tsc --noEmit && vite build",
    "preview": "vite preview --host 0.0.0.0"
  },
  "dependencies": {
    "@vitejs/plugin-react": "^4.3.4",
    "vite": "^6.0.0",
    "typescript": "^5.7.2",
    "react": "^19.0.0",
    "react-dom": "^19.0.0"
  },
  "devDependencies": {}
}
```

- [ ] **Step 3: Create `web/index.html`**

Write:

```html
<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Knowledge</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

- [ ] **Step 4: Create `web/vite.config.ts`**

Write:

```ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
});
```

- [ ] **Step 5: Create `web/tsconfig.json`**

Write:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "useDefineForClassFields": true,
    "lib": ["DOM", "DOM.Iterable", "ES2022"],
    "allowJs": false,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx"
  },
  "include": ["src"]
}
```

- [ ] **Step 6: Create minimal app files**

Create `web/src/main.tsx`:

```tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles.css';

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
```

Create `web/src/App.tsx`:

```tsx
export default function App() {
  return <div className="app-shell">Knowledge</div>;
}
```

Create `web/src/styles.css`:

```css
:root {
  color: #17202a;
  background: #f6f7f9;
  font-family:
    Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
    sans-serif;
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
}

.app-shell {
  min-height: 100vh;
}
```

- [ ] **Step 7: Install and build scaffold**

Run:

```bash
cd web && npm install && npm run build
```

Expected: install succeeds; build may fail only because generated data is not implemented yet. If it fails for missing generated data, continue to Task 2.

- [ ] **Step 8: Commit scaffold**

Run:

```bash
git add web/package.json web/package-lock.json web/index.html web/vite.config.ts web/tsconfig.json web/src/main.tsx web/src/App.tsx web/src/styles.css
git commit -m "Add custom knowledge web scaffold"
```

Expected: commit succeeds.

## Task 2: Generate Static Knowledge Data

**Files:**
- Create: `web/scripts/generate-knowledge-data.mjs`
- Create: `web/src/generated/knowledge-data.ts`

- [ ] **Step 1: Create script and generated directories**

Run:

```bash
mkdir -p web/scripts web/src/generated
```

Expected: command exits with status 0.

- [ ] **Step 2: Create generator script**

Create `web/scripts/generate-knowledge-data.mjs` with a Node script that:

- Walks `README.md`, `index.md`, `content/`, and `topics/`.
- Ignores non-Markdown files.
- Parses simple YAML frontmatter.
- Extracts H1/H2/H3 headings.
- Creates slug anchors.
- Derives title, category, category label, tags, body, and search text.
- Writes `web/src/generated/knowledge-data.ts`.

- [ ] **Step 3: Run generator**

Run:

```bash
cd web && npm run generate
```

Expected: `web/src/generated/knowledge-data.ts` exists and contains `knowledgeDocs` plus `knowledgeCategories`.

- [ ] **Step 4: Verify generated content includes architecture note**

Run:

```bash
rg -n "什么是架构|architecture|knowledgeDocs|knowledgeCategories" web/src/generated/knowledge-data.ts
```

Expected: all four terms appear.

- [ ] **Step 5: Commit generator and generated data**

Run:

```bash
git add web/scripts/generate-knowledge-data.mjs web/src/generated/knowledge-data.ts
git commit -m "Generate static knowledge data"
```

Expected: commit succeeds.

## Task 3: Build Knowledge UI

**Files:**
- Modify: `web/src/App.tsx`
- Modify: `web/src/styles.css`

- [ ] **Step 1: Implement React UI**

Replace `web/src/App.tsx` with a React app that:

- Imports `knowledgeDocs` and `knowledgeCategories`.
- Tracks selected document id.
- Tracks search query.
- Shows category navigation when query is empty.
- Shows search results when query is non-empty.
- Renders Markdown using local parsing functions.
- Shows H2/H3 document TOC.
- Falls back to an empty state when no docs exist.

- [ ] **Step 2: Implement responsive CSS**

Replace `web/src/styles.css` with CSS that:

- Uses three columns on desktop.
- Keeps sidebar and TOC readable.
- Uses stacked layout on mobile.
- Styles headings, lists, code blocks, blockquotes, links, metadata, active items, and search results.

- [ ] **Step 3: Run build**

Run:

```bash
cd web && npm run build
```

Expected: TypeScript and Vite build succeed.

- [ ] **Step 4: Commit UI**

Run:

```bash
git add web/src/App.tsx web/src/styles.css
git commit -m "Build custom knowledge web UI"
```

Expected: commit succeeds.

## Task 4: Document Web Commands

**Files:**
- Modify: `README.md`

- [ ] **Step 1: Add web section to README**

Add:

```markdown
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
```

- [ ] **Step 2: Verify README and build**

Run:

```bash
git diff --check && cd web && npm run build
```

Expected: no whitespace errors; build succeeds.

- [ ] **Step 3: Commit README**

Run:

```bash
git add README.md
git commit -m "Document knowledge web commands"
```

Expected: commit succeeds.

## Task 5: Final Verification

**Files:**
- Read: `web/src/generated/knowledge-data.ts`
- Read: `web/src/App.tsx`
- Read: `web/src/styles.css`

- [ ] **Step 1: Run final build**

Run:

```bash
cd web && npm run build
```

Expected: build succeeds.

- [ ] **Step 2: Start dev server**

Run:

```bash
cd web && npm run dev
```

Expected: Vite starts and prints a local URL.

- [ ] **Step 3: Browser smoke check**

Open the local URL and verify:

- Left navigation shows `架构与系统设计`.
- Article `什么是架构` can be opened.
- Search for `架构` returns matching documents.
- Right TOC shows headings for the current article.
- Layout has no obvious overlap at desktop width.

- [ ] **Step 4: Check git status**

Run:

```bash
git status --short --branch
```

Expected: clean working tree, possibly ahead of `origin/main`.
