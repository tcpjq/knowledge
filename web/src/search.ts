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
  if (normalized.length < 4 || normalized.length > 120) return [];

  return searchKnowledge({
    query: normalized,
    docs: docs.filter((doc) => doc.id !== currentDocId),
    chunks: chunks.filter((chunk) => chunk.docId !== currentDocId),
    modules,
  }).slice(0, limit);
}
