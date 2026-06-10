# Related Knowledge Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add automatic article-end related notes and selection-based related knowledge results to the static Markdown knowledge web app.

**Architecture:** Keep the feature static and local. Put relation scoring in a small generator-side module that can be tested directly, extend generated `KnowledgeDoc` data with `relatedDocIds`, add a search helper for selected text, then render related cards and a lightweight popover in the existing React app.

**Tech Stack:** Node ESM scripts, TypeScript, React 19, Vite, existing no-framework test scripts compiled with `tsc` or run with `node`.

---

## File Structure

- Create `web/scripts/knowledge-relations.mjs`
  - Pure JavaScript helpers for manual link extraction, candidate scoring, and related doc id generation.
- Modify `web/scripts/generate-knowledge-data.mjs`
  - Import relation helpers and emit `relatedDocIds` in generated docs and TypeScript types.
- Create `web/tests/relations.test.mjs`
  - Node-only tests for relation generation.
- Modify `web/package.json`
  - Add `test:relations` and include it in a combined `test` script.
- Modify `web/src/search.ts`
  - Add `searchSelectionKnowledge` for selected-text lookups with current-document exclusion and limit handling.
- Modify `web/tests/search.test.ts`
  - Add tests for selected-text search.
- Modify `web/src/App.tsx`
  - Render related note footer and selection popover.
- Modify `web/src/styles.css`
  - Style related note cards and selection popover.
- Regenerate `web/src/generated/knowledge-data.ts`
  - Run `npm run generate` so the new `relatedDocIds` field exists for all docs.

## Task 1: Add Relation Scoring Helpers

**Files:**
- Create: `web/scripts/knowledge-relations.mjs`
- Create: `web/tests/relations.test.mjs`
- Modify: `web/package.json`

- [ ] **Step 1: Write the failing relation tests**

Create `web/tests/relations.test.mjs`:

```js
import {
  computeRelatedDocIds,
  extractManualRelatedDocIds,
  isIndexDoc,
} from '../scripts/knowledge-relations.mjs';

function assertEqual(actual, expected, message) {
  if (JSON.stringify(actual) !== JSON.stringify(expected)) {
    throw new Error(`${message}\nExpected: ${JSON.stringify(expected)}\nActual: ${JSON.stringify(actual)}`);
  }
}

const docs = [
  {
    id: 'content/tech/architecture/source',
    title: '方案评审',
    path: 'content/tech/architecture/source.md',
    module: 'tech',
    section: 'architecture',
    tags: ['architecture', 'review'],
    body: '# 方案评审\n\n## 关联\n\n- [手动关联](manual.md)\n- [缺失链接](missing.md)\n',
    searchText: '方案评审 architecture review 系统设计 取舍 风险',
  },
  {
    id: 'content/tech/architecture/manual',
    title: '手动关联',
    path: 'content/tech/architecture/manual.md',
    module: 'tech',
    section: 'architecture',
    tags: [],
    body: '# 手动关联\n',
    searchText: '手动关联',
  },
  {
    id: 'content/tech/architecture/automatic',
    title: '架构取舍',
    path: 'content/tech/architecture/automatic.md',
    module: 'tech',
    section: 'architecture',
    tags: ['architecture'],
    body: '# 架构取舍\n\n系统设计需要关注取舍和风险。\n',
    searchText: '架构取舍 architecture 系统设计 取舍 风险',
  },
  {
    id: 'content/tech/architecture/index',
    title: '架构与系统设计',
    path: 'content/tech/architecture/index.md',
    module: 'tech',
    section: 'architecture',
    tags: [],
    body: '# 架构与系统设计\n',
    searchText: '架构与系统设计',
  },
  {
    id: 'content/communication/expression',
    title: '表达观点',
    path: 'content/communication/expression.md',
    module: 'communication',
    section: 'root',
    tags: ['review'],
    body: '# 表达观点\n\n方案评审时表达风险和建议。\n',
    searchText: '表达观点 review 方案评审 风险 建议',
  },
];

assertEqual(isIndexDoc(docs[3]), true, 'detects section index pages');
assertEqual(isIndexDoc(docs[2]), false, 'non-index notes are eligible');

assertEqual(
  extractManualRelatedDocIds(docs[0], docs),
  ['content/tech/architecture/manual'],
  'manual links from the relation section resolve and broken links are ignored',
);

assertEqual(
  computeRelatedDocIds(docs[0], docs, 5),
  [
    'content/tech/architecture/manual',
    'content/tech/architecture/automatic',
    'content/communication/expression',
  ],
  'manual links come first, current doc and index pages are excluded, automatic order is deterministic',
);
```

- [ ] **Step 2: Add the failing test script**

Modify `web/package.json` scripts to include:

```json
"test:relations": "node tests/relations.test.mjs",
"test": "npm run test:relations && npm run test:search && npm run test:navigation"
```

Preserve existing scripts and commas.

- [ ] **Step 3: Run the failing test**

Run:

```bash
cd web && npm run test:relations
```

Expected: FAIL with an import error because `scripts/knowledge-relations.mjs` does not exist.

- [ ] **Step 4: Implement relation helpers**

Create `web/scripts/knowledge-relations.mjs`:

```js
import path from 'node:path';

const keywordPattern = /[\p{L}\p{N}]+/gu;

export function isIndexDoc(doc) {
  return doc.path.endsWith('/index.md') || doc.path === 'index.md';
}

function normalizeText(value) {
  return String(value ?? '').toLowerCase();
}

function tokenize(value) {
  const matches = normalizeText(value).match(keywordPattern) ?? [];
  return [...new Set(matches.filter((token) => token.length >= 2))];
}

function extractRelationSection(body) {
  const lines = String(body ?? '').split('\n');
  const start = lines.findIndex((line) => /^##\s+关联\s*$/.test(line.trim()));
  if (start === -1) return '';

  const section = [];
  for (let index = start + 1; index < lines.length; index += 1) {
    if (/^##\s+/.test(lines[index])) break;
    section.push(lines[index]);
  }
  return section.join('\n');
}

function resolveMarkdownLink(sourceDoc, href) {
  if (!href || /^(https?:|mailto:|#)/i.test(href)) return undefined;
  const withoutHash = href.split('#')[0];
  if (!withoutHash.endsWith('.md')) return undefined;

  const sourceDir = path.posix.dirname(sourceDoc.path);
  return path.posix.normalize(path.posix.join(sourceDir, withoutHash)).replace(/\.md$/, '');
}

export function extractManualRelatedDocIds(sourceDoc, docs) {
  const docIds = new Set(docs.map((doc) => doc.id));
  const manualIds = [];
  const section = extractRelationSection(sourceDoc.body);
  const linkPattern = /\[[^\]]+]\(([^)]+)\)/g;

  for (const match of section.matchAll(linkPattern)) {
    const id = resolveMarkdownLink(sourceDoc, match[1].trim());
    if (!id || id === sourceDoc.id || !docIds.has(id) || manualIds.includes(id)) continue;
    manualIds.push(id);
  }

  return manualIds;
}

function countOverlap(left, right) {
  const rightSet = new Set(right);
  return left.reduce((total, token) => total + (rightSet.has(token) ? 1 : 0), 0);
}

function scoreCandidate(sourceDoc, candidate) {
  if (candidate.id === sourceDoc.id || isIndexDoc(candidate)) return 0;

  const sourceTags = Array.isArray(sourceDoc.tags) ? sourceDoc.tags : [];
  const candidateTags = Array.isArray(candidate.tags) ? candidate.tags : [];
  const sharedTags = sourceTags.filter((tag) => candidateTags.includes(tag)).length;
  const titleOverlap = countOverlap(tokenize(sourceDoc.title), tokenize(candidate.title));
  const bodyOverlap = countOverlap(tokenize(sourceDoc.searchText), tokenize(candidate.searchText));
  const sameSection = sourceDoc.section === candidate.section ? 1 : 0;
  const sameModule = sourceDoc.module === candidate.module ? 1 : 0;

  return sharedTags * 80 + titleOverlap * 45 + sameSection * 24 + sameModule * 10 + Math.min(bodyOverlap, 12) * 4;
}

export function computeRelatedDocIds(sourceDoc, docs, limit = 5) {
  const manualIds = extractManualRelatedDocIds(sourceDoc, docs)
    .filter((id) => !isIndexDoc(docs.find((doc) => doc.id === id)));
  const manualSet = new Set(manualIds);
  const scored = docs
    .filter((doc) => doc.id !== sourceDoc.id && !manualSet.has(doc.id) && !isIndexDoc(doc))
    .map((doc) => ({ doc, score: scoreCandidate(sourceDoc, doc) }))
    .filter((entry) => entry.score > 0)
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return a.doc.title.localeCompare(b.doc.title, 'zh-CN');
    })
    .map((entry) => entry.doc.id);

  return [...manualIds, ...scored].slice(0, limit);
}
```

- [ ] **Step 5: Run the relation test**

Run:

```bash
cd web && npm run test:relations
```

Expected: PASS.

- [ ] **Step 6: Commit Task 1**

Run:

```bash
git add web/scripts/knowledge-relations.mjs web/tests/relations.test.mjs web/package.json
git commit -m "Add related knowledge scoring helpers"
```

## Task 2: Emit Related Doc IDs From Generated Data

**Files:**
- Modify: `web/scripts/generate-knowledge-data.mjs`
- Modify after generation: `web/src/generated/knowledge-data.ts`

- [ ] **Step 1: Update the generator import and doc construction**

Modify `web/scripts/generate-knowledge-data.mjs` near the imports:

```js
import { computeRelatedDocIds } from './knowledge-relations.mjs';
```

After all `docs` have been pushed in `main()`, add:

```js
for (const doc of docs) {
  doc.relatedDocIds = computeRelatedDocIds(doc, docs);
}
```

Place this before `const modules = buildModules(docs);`.

- [ ] **Step 2: Update the generated TypeScript type template**

In the `KnowledgeDoc` template string inside `generate-knowledge-data.mjs`, add:

```ts
relatedDocIds: string[];
```

Put it after `searchText: string;`.

- [ ] **Step 3: Regenerate data**

Run:

```bash
cd web && npm run generate
```

Expected: command prints a generated-doc count and `web/src/generated/knowledge-data.ts` includes `relatedDocIds` on every doc.

- [ ] **Step 4: Run relation and build checks**

Run:

```bash
cd web && npm run test:relations && npm run build
```

Expected: PASS. The build should regenerate data, type-check, and create a production bundle.

- [ ] **Step 5: Commit Task 2**

Run:

```bash
git add web/scripts/generate-knowledge-data.mjs web/src/generated/knowledge-data.ts
git commit -m "Generate related document ids"
```

## Task 3: Add Selection Search Helper

**Files:**
- Modify: `web/src/search.ts`
- Modify: `web/tests/search.test.ts`

- [ ] **Step 1: Write failing selection search tests**

Append to `web/tests/search.test.ts`:

```ts
import { searchSelectionKnowledge } from '../src/search.js';

const selectionResults = searchSelectionKnowledge({
  selectedText: '系统分成哪些模块',
  currentDocId: 'content/tech/architecture/what-is-architecture',
  docs,
  chunks,
  modules,
});

assertEqual(
  selectionResults.map((result) => result.doc.id),
  [],
  'selection search excludes the current document',
);

const crossDocSelectionResults = searchSelectionKnowledge({
  selectedText: '沟通模块用于沉淀表达',
  currentDocId: 'content/tech/architecture/what-is-architecture',
  docs,
  chunks,
  modules,
});

assertEqual(
  crossDocSelectionResults[0].chunk?.id,
  'content/communication/index::1',
  'selection search returns chunk-level matches when available',
);

assertEqual(
  searchSelectionKnowledge({
    selectedText: '架',
    currentDocId: 'content/tech/architecture/what-is-architecture',
    docs,
    chunks,
    modules,
  }),
  [],
  'selection search ignores very short selections',
);
```

- [ ] **Step 2: Run the failing search test**

Run:

```bash
cd web && npm run test:search
```

Expected: FAIL because `searchSelectionKnowledge` is not exported.

- [ ] **Step 3: Implement `searchSelectionKnowledge`**

Add to `web/src/search.ts`:

```ts
function normalizeSelectionText(value: string) {
  return value.replace(/\s+/g, ' ').trim();
}

export function searchSelectionKnowledge<TDoc extends SearchDoc>({
  selectedText,
  currentDocId,
  docs,
  chunks,
  modules,
  limit = 5,
}: {
  selectedText: string;
  currentDocId: string;
  docs: TDoc[];
  chunks: SearchChunk[];
  modules: SearchModule[];
  limit?: number;
}) {
  const normalized = normalizeSelectionText(selectedText);
  if (normalized.length < 4 || normalized.length > 120) return [];

  return searchKnowledge({
    query: normalized,
    docs: docs.filter((doc) => doc.id !== currentDocId),
    chunks: chunks.filter((chunk) => chunk.docId !== currentDocId),
    modules,
  }).slice(0, limit);
}
```

- [ ] **Step 4: Run the search test**

Run:

```bash
cd web && npm run test:search
```

Expected: PASS.

- [ ] **Step 5: Commit Task 3**

Run:

```bash
git add web/src/search.ts web/tests/search.test.ts
git commit -m "Add selected text knowledge search"
```

## Task 4: Render Related Footer and Selection Popover

**Files:**
- Modify: `web/src/App.tsx`
- Modify: `web/src/styles.css`

- [ ] **Step 1: Update React imports and search import**

In `web/src/App.tsx`, replace the React import with:

```ts
import { createElement, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
```

Replace the search import with:

```ts
import {
  highlightText,
  searchKnowledge,
  searchSelectionKnowledge,
  type HighlightPart,
  type SearchResult,
} from './search';
```

- [ ] **Step 2: Add related footer component**

Add below `Toc` in `web/src/App.tsx`:

```tsx
function RelatedKnowledge({
  docs,
  onSelect,
}: {
  docs: KnowledgeDoc[];
  onSelect: (doc: KnowledgeDoc) => void;
}) {
  if (docs.length === 0) return null;

  return (
    <section className="related-knowledge" aria-label="相关知识">
      <h2>相关知识</h2>
      <div className="related-grid">
        {docs.map((doc) => (
          <button className="related-card" key={doc.id} onClick={() => onSelect(doc)} type="button">
            <strong>{doc.title}</strong>
            <span>
              {doc.moduleLabel} / {doc.sectionLabel}
            </span>
            {doc.tags.length > 0 ? (
              <small>{doc.tags.slice(0, 3).join(' / ')}</small>
            ) : null}
          </button>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Add selection popover component**

Add below `RelatedKnowledge` in `web/src/App.tsx`:

```tsx
type SelectionPopoverState = {
  text: string;
  top: number;
  left: number;
  results: SearchResult<KnowledgeDoc>[];
};

function SelectionKnowledgePopover({
  state,
  onSelect,
}: {
  state: SelectionPopoverState | null;
  onSelect: (doc: KnowledgeDoc) => void;
}) {
  if (!state || state.results.length === 0) return null;

  return (
    <aside
      className="selection-popover"
      style={{ left: state.left, top: state.top }}
      aria-label="选中文本相关知识"
    >
      <div className="selection-popover-header">
        <span>相关知识点</span>
        <small>{state.text}</small>
      </div>
      <div className="selection-result-list">
        {state.results.map((result) => (
          <button
            className="selection-result"
            key={`${result.doc.id}-${result.chunk?.id ?? 'doc'}`}
            onClick={() => onSelect(result.doc)}
            type="button"
          >
            <strong>{result.doc.title}</strong>
            <span>
              {result.doc.moduleLabel} / {result.doc.sectionLabel}
              {result.chunk ? ` / ${result.chunk.heading}` : ''}
            </span>
            <small>{result.snippet}</small>
          </button>
        ))}
      </div>
    </aside>
  );
}
```

- [ ] **Step 4: Add selection state and refs inside `App`**

Inside `App()`, after `query` state, add:

```ts
const articleRef = useRef<HTMLElement | null>(null);
const popoverRef = useRef<HTMLElement | null>(null);
const [selectionPopover, setSelectionPopover] = useState<SelectionPopoverState | null>(null);
```

After `nextDoc`, add:

```ts
const relatedDocs = selectedDoc
  ? selectedDoc.relatedDocIds.map((docId) => docById.get(docId)).filter((doc): doc is KnowledgeDoc => Boolean(doc))
  : [];
```

- [ ] **Step 5: Add selection handlers**

Inside `App()`, before `if (!selectedDoc)`, add:

```ts
useEffect(() => {
  const closePopover = () => setSelectionPopover(null);

  const handleSelection = () => {
    const selection = window.getSelection();
    const articleElement = articleRef.current;
    if (!selection || selection.rangeCount === 0 || !articleElement) {
      closePopover();
      return;
    }

    const selectedText = selection.toString().replace(/\s+/g, ' ').trim();
    const range = selection.getRangeAt(0);
    const container = range.commonAncestorContainer;
    if (!selectedText || !articleElement.contains(container.nodeType === Node.TEXT_NODE ? container.parentElement : container)) {
      closePopover();
      return;
    }

    const results = searchSelectionKnowledge({
      selectedText,
      currentDocId: selectedDoc.id,
      docs: knowledgeDocs,
      chunks: knowledgeChunks,
      modules: knowledgeModules,
    });

    if (results.length === 0) {
      closePopover();
      return;
    }

    const rect = range.getBoundingClientRect();
    const width = 340;
    const left = Math.min(Math.max(16, rect.left + window.scrollX), window.scrollX + window.innerWidth - width - 16);
    const top = rect.bottom + window.scrollY + 10;
    setSelectionPopover({ text: selectedText, top, left, results });
  };

  const handleMouseUp = () => window.setTimeout(handleSelection, 0);
  const handleKeyUp = () => window.setTimeout(handleSelection, 0);
  const handlePointerDown = (event: PointerEvent) => {
    if (popoverRef.current?.contains(event.target as Node)) return;
    closePopover();
  };
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') closePopover();
  };

  document.addEventListener('mouseup', handleMouseUp);
  document.addEventListener('keyup', handleKeyUp);
  document.addEventListener('pointerdown', handlePointerDown);
  document.addEventListener('keydown', handleKeyDown);

  return () => {
    document.removeEventListener('mouseup', handleMouseUp);
    document.removeEventListener('keyup', handleKeyUp);
    document.removeEventListener('pointerdown', handlePointerDown);
    document.removeEventListener('keydown', handleKeyDown);
  };
}, [selectedDoc]);

useEffect(() => {
  setSelectionPopover(null);
}, [selectedDoc?.id]);
```

- [ ] **Step 6: Wire the JSX**

Change:

```tsx
<article className="article">
```

to:

```tsx
<article className="article" ref={articleRef}>
```

After:

```tsx
<div className="markdown-body">{renderMarkdown(selectedDoc.body)}</div>
```

add:

```tsx
<RelatedKnowledge docs={relatedDocs} onSelect={selectDoc} />
```

Before the closing `</div>` of `.app-shell`, add:

```tsx
<div ref={popoverRef}>
  <SelectionKnowledgePopover state={selectionPopover} onSelect={selectDoc} />
</div>
```

- [ ] **Step 7: Add styles**

Append to `web/src/styles.css` before `.article-nav`:

```css
.related-knowledge {
  border-top: 1px solid #dfe3e8;
  margin-top: 38px;
  padding-top: 24px;
}

.related-knowledge h2 {
  color: #101820;
  font-size: 20px;
  margin: 0 0 14px;
}

.related-grid {
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
}

.related-card,
.selection-result {
  background: #ffffff;
  border: 1px solid #dfe3e8;
  border-radius: 8px;
  color: #25313f;
  display: grid;
  gap: 5px;
  padding: 13px;
  text-align: left;
  width: 100%;
}

.related-card:hover,
.selection-result:hover {
  background: #eef3f1;
  border-color: #b9d2c8;
}

.related-card strong,
.selection-result strong {
  color: #101820;
  font-size: 15px;
  line-height: 1.35;
  overflow-wrap: anywhere;
}

.related-card span,
.related-card small,
.selection-result span,
.selection-result small {
  color: #657080;
  font-size: 12px;
  overflow-wrap: anywhere;
}

.selection-popover {
  background: #ffffff;
  border: 1px solid #cfd6df;
  border-radius: 8px;
  box-shadow: 0 18px 40px rgba(16, 24, 32, 0.16);
  max-width: calc(100vw - 32px);
  padding: 12px;
  position: absolute;
  width: 340px;
  z-index: 20;
}

.selection-popover-header {
  display: grid;
  gap: 3px;
  margin-bottom: 10px;
}

.selection-popover-header span {
  color: #101820;
  font-size: 13px;
  font-weight: 700;
}

.selection-popover-header small {
  color: #657080;
  font-size: 12px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.selection-result-list {
  display: grid;
  gap: 8px;
}
```

- [ ] **Step 8: Run build**

Run:

```bash
cd web && npm run build
```

Expected: PASS.

- [ ] **Step 9: Commit Task 4**

Run:

```bash
git add web/src/App.tsx web/src/styles.css
git commit -m "Add related knowledge UI"
```

## Task 5: Final Verification

**Files:**
- Verify all changed files.

- [ ] **Step 1: Run all tests and build**

Run:

```bash
cd web && npm run test && npm run build
```

Expected: PASS.

- [ ] **Step 2: Inspect generated related data**

Run:

```bash
rg -n "relatedDocIds" web/src/generated/knowledge-data.ts | head -10
```

Expected: multiple generated docs include `relatedDocIds`.

- [ ] **Step 3: Review final diff**

Run:

```bash
git status --short
git log --oneline -5
```

Expected: clean working tree after commits, with task commits visible.

- [ ] **Step 4: Push when requested**

If the user asks to push:

```bash
git push origin main
```

Expected: local commits push to `origin/main`.
