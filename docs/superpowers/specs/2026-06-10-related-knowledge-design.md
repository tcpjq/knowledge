# Related Knowledge Design

## Goal

Add lightweight knowledge association to the static Markdown knowledge web app without introducing AI, embeddings, or server-side dependencies.

The feature has two parts:

1. Show related notes at the end of each article.
2. Show related knowledge points when the user selects text inside an article.

The first version should improve reading and discovery while keeping the system simple enough to maintain in the current static-data architecture.

## Scope

In scope:

- Generate related note ids during `web/scripts/generate-knowledge-data.mjs`.
- Prefer manually authored links in a document's `## 关联` section.
- Add automatic related-note scoring from static metadata and text.
- Render a related-notes section at the bottom of articles.
- Detect selected article text and show a small related-results popover.
- Reuse the existing local search and chunk data.
- Add focused tests for related data generation and selection search behavior.

Out of scope:

- AI model calls.
- Embeddings or vector database.
- Persistent user feedback on recommendation quality.
- Editing Markdown from the browser.
- Complex mobile gesture optimization.

## Current Context

The app already generates static data from Markdown files:

- `knowledgeDocs` stores title, path, module, section, tags, headings, body, and search text.
- `knowledgeChunks` stores section-level chunks for search.
- `searchKnowledge` ranks title, tag, document, and chunk matches.
- Articles already commonly use a `## 关联` section for explicit local links.

This makes a static related-knowledge feature feasible without changing storage architecture.

## Data Model

Extend `KnowledgeDoc` with:

```ts
relatedDocIds: string[];
```

`relatedDocIds` contains up to 5 document ids. It excludes:

- The current document.
- Module and section index pages such as `content/communication/index.md`.
- Documents that cannot be resolved from links.

Manual links from `## 关联` are preserved first. Automatic matches fill remaining slots.

## Related-Note Scoring

The generator computes related documents in this order:

1. Parse the current document's `## 关联` section and resolve local Markdown links.
2. Score remaining candidates using static signals:
   - Shared tags: high weight.
   - Title keyword overlap: high weight.
   - Same section: medium weight.
   - Same module: low weight.
   - Body/chunk keyword overlap: low-to-medium weight.
3. Sort by score, then title using `zh-CN` locale.
4. Keep the first 5 ids after manual links.

Manual links should outrank automatic results even if their text score is lower, because they represent intentional author judgment.

## Selection-Based Related Knowledge

When the user selects text inside the article body:

- Trim whitespace and normalize internal whitespace.
- Ignore selections shorter than 4 characters or longer than 120 characters.
- Run a local query against existing docs/chunks.
- Exclude the currently open document.
- Show up to 5 results, preferring chunk-level matches.
- Each result displays title, module/section, optional chunk heading, and a short snippet.
- Clicking a result opens that document and closes the popover.

The popover closes when:

- The user clears the selection.
- The user clicks outside the popover.
- The user presses `Escape`.
- The selected document changes.

## UI

### Article Footer

Add a `相关知识` section below article content and above previous/next navigation.

Each related note appears as a compact card with:

- Title.
- Module / section.
- Tags when present.

If there are no related notes, do not render the section.

### Selection Popover

The selection popover appears near the text selection when possible. It should:

- Be visually lightweight.
- Avoid covering too much article text.
- Stay within the viewport.
- Work with mouse selection first.

Mobile text selection support is best-effort in this version.

## Components and Boundaries

Recommended implementation boundaries:

- `web/scripts/generate-knowledge-data.mjs`
  - Extract manual relation links.
  - Compute related ids.
  - Emit the updated type and data.

- `web/src/search.ts`
  - Reuse or add a helper for selection queries.
  - Keep ranking deterministic and local.

- `web/src/App.tsx`
  - Render related-note footer.
  - Track selected text and popover state.
  - Handle close interactions.

- `web/src/styles.css`
  - Style related-note cards and selection popover.

## Error Handling

- Broken manual links are ignored during generation.
- Empty or low-quality selection text does not show a popover.
- If selection search returns no results, show a small empty state or close the popover. Prefer closing for the first version to avoid visual noise.
- If no related docs are generated, omit the article footer section.

## Testing

Add focused coverage for:

- Manual `## 关联` links are included first.
- Current document is excluded from generated related ids.
- Index pages are excluded from generated related ids.
- Automatic related ids are deterministic.
- Selection query excludes the current document and returns chunk-level matches when available.

Existing navigation and search tests should continue to pass.

## Success Criteria

- Articles with explicit `## 关联` links show those notes first.
- Articles without explicit links can still show reasonable automatic related notes.
- Selecting meaningful text in an article shows relevant local results.
- The feature works entirely in the static web app.
- No AI/API dependency is introduced.
