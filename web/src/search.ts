export type SearchDoc = {
  id: string;
  title: string;
  path: string;
  module: string;
  moduleLabel: string;
  section: string;
  sectionLabel: string;
  tags: string[];
  searchText: string;
};

export type SearchChunk = {
  id: string;
  docId: string;
  heading: string;
  text: string;
  searchText: string;
};

export type SearchModule = {
  id: string;
  label: string;
};

export type SearchHeading = {
  level: number;
  text: string;
  slug: string;
};

export type RelatedSearchDoc = SearchDoc & {
  body: string;
  headings: SearchHeading[];
};

export type SearchResult<TDoc extends SearchDoc = SearchDoc> = {
  doc: TDoc;
  chunk?: SearchChunk;
  snippet: string;
  score: number;
};

export type HighlightPart = {
  text: string;
  match: boolean;
};

function parseQuery(query: string) {
  return [...new Set(query.trim().toLowerCase().split(/\s+/).filter(Boolean))];
}

export function highlightText(text: string, query: string): HighlightPart[] {
  const keywords = parseQuery(query).sort((a, b) => b.length - a.length);
  if (keywords.length === 0) return [{ text, match: false }];

  const parts: HighlightPart[] = [];
  const lowerText = text.toLowerCase();
  let cursor = 0;

  while (cursor < text.length) {
    let nextIndex = -1;
    let nextKeyword = '';

    for (const keyword of keywords) {
      const keywordIndex = lowerText.indexOf(keyword, cursor);
      if (keywordIndex !== -1 && (nextIndex === -1 || keywordIndex < nextIndex)) {
        nextIndex = keywordIndex;
        nextKeyword = keyword;
      }
    }

    if (nextIndex === -1) {
      parts.push({ text: text.slice(cursor), match: false });
      break;
    }

    if (nextIndex > cursor) {
      parts.push({ text: text.slice(cursor, nextIndex), match: false });
    }
    parts.push({ text: text.slice(nextIndex, nextIndex + nextKeyword.length), match: true });
    cursor = nextIndex + nextKeyword.length;
  }

  return parts.filter((part) => part.text.length > 0);
}

function countMatches(text: string, query: string) {
  let count = 0;
  let cursor = 0;

  while (cursor < text.length) {
    const matchIndex = text.indexOf(query, cursor);
    if (matchIndex === -1) break;
    count += 1;
    cursor = matchIndex + query.length;
  }

  return count;
}

function makeSnippet(text: string, keywords: string[], maxLength = 110) {
  const normalizedText = text.replace(/\s+/g, ' ').trim();
  const lowerText = normalizedText.toLowerCase();
  const matchIndex = keywords.reduce((best, keyword) => {
    const index = lowerText.indexOf(keyword);
    if (index === -1) return best;
    return best === -1 ? index : Math.min(best, index);
  }, -1);

  if (matchIndex === -1 || normalizedText.length <= maxLength) {
    return normalizedText.slice(0, maxLength);
  }

  const start = Math.max(0, matchIndex - 32);
  const end = Math.min(normalizedText.length, start + maxLength);
  const prefix = start > 0 ? '...' : '';
  const suffix = end < normalizedText.length ? '...' : '';
  return `${prefix}${normalizedText.slice(start, end)}${suffix}`;
}

function normalizeSelectionText(value: string) {
  return value.replace(/\s+/g, ' ').trim();
}

function isMeaningfulSelectionText(value: string) {
  if (!value || value.length > 120) return false;
  if ((value.match(/\p{Script=Han}/gu) ?? []).length >= 2) return true;
  if ((value.match(/[a-z0-9]/gi) ?? []).length >= 3) return true;
  return false;
}

function isIndexDoc(doc: SearchDoc) {
  return doc.path === 'index.md' || doc.path.endsWith('/index.md');
}

function normalizePath(path: string) {
  const parts: string[] = [];
  for (const part of path.split('/')) {
    if (!part || part === '.') continue;
    if (part === '..') {
      parts.pop();
      continue;
    }
    parts.push(part);
  }
  return parts.join('/');
}

function dirname(path: string) {
  const index = path.lastIndexOf('/');
  return index === -1 ? '.' : path.slice(0, index);
}

function resolveMarkdownDocId(sourcePath: string, href: string) {
  const target = href.trim().replace(/^<|>$/g, '');
  if (!target || target.startsWith('#') || /^[a-z][a-z0-9+.-]*:/i.test(target) || target.startsWith('//')) {
    return '';
  }

  const [withoutHash] = target.split('#');
  const [targetPath] = withoutHash.split('?');
  if (!targetPath.endsWith('.md')) return '';

  return normalizePath(`${dirname(sourcePath)}/${targetPath}`).replace(/\.md$/, '');
}

function extractRelationSection(markdown: string) {
  const lines = markdown.split(/\r?\n/);
  const start = lines.findIndex((line) => /^##\s+关联\s*$/.test(line.trim()));
  if (start === -1) return '';

  const section: string[] = [];
  for (let index = start + 1; index < lines.length; index += 1) {
    if (/^##\s+/.test(lines[index])) break;
    section.push(lines[index]);
  }
  return section.join('\n');
}

function extractManualRelatedIds<TDoc extends RelatedSearchDoc>(doc: TDoc, docs: TDoc[]) {
  const docIds = new Set(docs.map((candidate) => candidate.id));
  const ids: string[] = [];
  const seen = new Set<string>();
  const relationSection = extractRelationSection(doc.body);
  const linkPattern = /\[[^\]]+]\(([^)]+)\)/g;

  for (const match of relationSection.matchAll(linkPattern)) {
    const id = resolveMarkdownDocId(doc.path, match[1]);
    if (!id || id === doc.id || seen.has(id) || !docIds.has(id)) continue;
    ids.push(id);
    seen.add(id);
  }

  return ids;
}

function extractQuestionLikeSentences(body: string) {
  return body
    .replace(/```[\s\S]*?```/g, ' ')
    .split(/[\n。！？!?]/)
    .map((sentence) => sentence.replace(/^#+\s+/, '').replace(/[-*`_[\]()]/g, ' ').replace(/\s+/g, ' ').trim())
    .filter((sentence) => /如何|为什么|是否|怎么|什么|？|\?/.test(sentence))
    .filter((sentence) => sentence.length >= 3 && sentence.length <= 40)
    .slice(0, 4);
}

function extractRuntimeRelatedQueries(doc: RelatedSearchDoc) {
  const queries = [
    ...doc.tags,
    doc.title,
    ...doc.headings
      .filter((heading) => heading.level === 2 || heading.level === 3)
      .map((heading) => heading.text),
    ...extractQuestionLikeSentences(doc.body),
  ];

  return [...new Set(queries.map((query) => query.replace(/\s+/g, ' ').trim()).filter((query) => query.length >= 2))].slice(0, 10);
}

export function searchKnowledge<TDoc extends SearchDoc>({
  query,
  docs,
  chunks,
  moduleId = 'all',
}: {
  query: string;
  docs: TDoc[];
  chunks: SearchChunk[];
  modules: SearchModule[];
  moduleId?: string;
}) {
  const keywords = parseQuery(query);
  if (keywords.length === 0) return [];

  const docsById = new Map(docs.map((doc) => [doc.id, doc]));
  const resultByDoc = new Map<string, SearchResult<TDoc>>();
  const candidateDocs = docs.filter((doc) => moduleId === 'all' || doc.module === moduleId);

  for (const doc of candidateDocs) {
    const titleText = doc.title.toLowerCase();
    const tagText = doc.tags.join(' ').toLowerCase();
    if (!keywords.every((keyword) => doc.searchText.includes(keyword))) continue;

    const score = keywords.reduce((total, keyword) => {
      const titleMatches = countMatches(titleText, keyword);
      const tagMatches = countMatches(tagText, keyword);
      const bodyMatches = countMatches(doc.searchText, keyword);
      return total + titleMatches * 100 + tagMatches * 45 + bodyMatches * 8;
    }, 0);

    if (score > 0) {
      resultByDoc.set(doc.id, {
        doc,
        snippet: makeSnippet(doc.searchText, keywords),
        score,
      });
    }
  }

  for (const chunk of chunks) {
    const doc = docsById.get(chunk.docId);
    if (!doc || (moduleId !== 'all' && doc.module !== moduleId)) continue;

    if (!keywords.every((keyword) => chunk.searchText.includes(keyword))) continue;

    const score = keywords.reduce((total, keyword) => total + countMatches(chunk.searchText, keyword) * 20, 0);
    const current = resultByDoc.get(doc.id);
    if (!current || score > current.score) {
      resultByDoc.set(doc.id, {
        doc,
        chunk,
        snippet: makeSnippet(chunk.text, keywords),
        score,
      });
    }
  }

  return [...resultByDoc.values()].sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return a.doc.title.localeCompare(b.doc.title, 'zh-CN');
  });
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
  if (!isMeaningfulSelectionText(normalized)) return [];

  return searchKnowledge({
    query: normalized,
    docs: docs.filter((doc) => doc.id !== currentDocId),
    chunks: chunks.filter((chunk) => chunk.docId !== currentDocId),
    modules,
  }).slice(0, limit);
}

export function findRuntimeRelatedKnowledge<TDoc extends RelatedSearchDoc>({
  doc,
  docs,
  chunks,
  modules,
  limit = 5,
}: {
  doc: TDoc;
  docs: TDoc[];
  chunks: SearchChunk[];
  modules: SearchModule[];
  limit?: number;
}) {
  const docsById = new Map(docs.map((candidate) => [candidate.id, candidate]));
  const manualIds = extractManualRelatedIds(doc, docs).filter((id) => {
    const candidate = docsById.get(id);
    return candidate && !isIndexDoc(candidate);
  });
  const manualSet = new Set(manualIds);
  const scored = new Map<string, SearchResult<TDoc>>();

  const addResult = (result: SearchResult<TDoc>, bonus: number) => {
    if (result.doc.id === doc.id || manualSet.has(result.doc.id) || isIndexDoc(result.doc)) return;
    const current = scored.get(result.doc.id);
    const score = result.score + bonus;
    if (!current || score > current.score) {
      scored.set(result.doc.id, { ...result, score });
    }
  };

  for (const query of extractRuntimeRelatedQueries(doc)) {
    for (const result of searchKnowledge({ query, docs, chunks, modules }).slice(0, 8)) {
      addResult(result, query === doc.title ? 20 : 0);
    }
  }

  const manualResults = manualIds
    .map((id) => docsById.get(id))
    .filter((candidate): candidate is TDoc => Boolean(candidate))
    .filter((candidate) => !isIndexDoc(candidate))
    .map((candidate) => ({
      doc: candidate,
      snippet: candidate.searchText.slice(0, 110),
      score: Number.MAX_SAFE_INTEGER,
    }));

  return [
    ...manualResults,
    ...[...scored.values()].sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return a.doc.title.localeCompare(b.doc.title, 'zh-CN');
    }),
  ].slice(0, limit);
}
