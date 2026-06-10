# Runtime Related Knowledge Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace build-time automatic related document generation with frontend runtime related-search computation.

**Architecture:** The generator emits only base document/search data. Runtime related knowledge is computed in `web/src/search.ts` from the current document, existing `knowledgeDocs`, and `knowledgeChunks`, using manual `## 关联` links as priority signals and local search results as automatic supplements.

**Tech Stack:** TypeScript, React 19, Vite, existing static generated data and no-framework test scripts.

---

## Task 1: Runtime Related Search Helper

**Files:**
- Modify: `web/src/search.ts`
- Modify: `web/tests/search.test.ts`

- [ ] Add failing tests for `findRuntimeRelatedKnowledge`.
- [ ] Implement manual relation extraction from `## 关联` in browser-safe TypeScript.
- [ ] Implement runtime query extraction from title, tags, headings, and question-like sentences.
- [ ] Use `searchKnowledge` to score candidate related docs.
- [ ] Exclude current doc and index docs.
- [ ] Keep manual links first, then runtime search results, deduped and limited.

## Task 2: Remove Build-Time Related IDs

**Files:**
- Modify: `web/scripts/generate-knowledge-data.mjs`
- Modify: `web/src/generated/knowledge-data.ts`
- Optional delete: `web/scripts/knowledge-relations.mjs`
- Optional modify/delete: `web/tests/relations.test.mjs`
- Modify: `web/package.json`

- [ ] Remove `computeRelatedDocIds` import and assignment from generator.
- [ ] Remove `relatedDocIds` from generated `KnowledgeDoc` type.
- [ ] Regenerate data.
- [ ] Remove now-unused relation helper/test if no longer referenced.
- [ ] Remove `test:relations` from package scripts if the helper is deleted.

## Task 3: Wire Runtime Related Docs In UI

**Files:**
- Modify: `web/src/App.tsx`

- [ ] Replace `selectedDoc.relatedDocIds` mapping with `useMemo(() => findRuntimeRelatedKnowledge(...))`.
- [ ] Keep existing related footer UI unchanged.
- [ ] Run search tests and full build.

## Verification

- [ ] `cd web && npm run test`
- [ ] `cd web && npm run build`
- [ ] `rg -n "relatedDocIds|computeRelatedDocIds|test:relations" web`
- [ ] Commit the completed change.
