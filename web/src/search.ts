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

export function highlightText(text: string, query: string): HighlightPart[] {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return [{ text, match: false }];

  const parts: HighlightPart[] = [];
  const lowerText = text.toLowerCase();
  let cursor = 0;

  while (cursor < text.length) {
    const matchIndex = lowerText.indexOf(normalized, cursor);
    if (matchIndex === -1) {
      parts.push({ text: text.slice(cursor), match: false });
      break;
    }

    if (matchIndex > cursor) {
      parts.push({ text: text.slice(cursor, matchIndex), match: false });
    }
    parts.push({ text: text.slice(matchIndex, matchIndex + normalized.length), match: true });
    cursor = matchIndex + normalized.length;
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

function makeSnippet(text: string, query: string, maxLength = 110) {
  const normalizedText = text.replace(/\s+/g, ' ').trim();
  const matchIndex = normalizedText.toLowerCase().indexOf(query);

  if (matchIndex === -1 || normalizedText.length <= maxLength) {
    return normalizedText.slice(0, maxLength);
  }

  const start = Math.max(0, matchIndex - 32);
  const end = Math.min(normalizedText.length, start + maxLength);
  const prefix = start > 0 ? '...' : '';
  const suffix = end < normalizedText.length ? '...' : '';
  return `${prefix}${normalizedText.slice(start, end)}${suffix}`;
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
  const normalized = query.trim().toLowerCase();
  if (!normalized) return [];

  const docsById = new Map(docs.map((doc) => [doc.id, doc]));
  const resultByDoc = new Map<string, SearchResult<TDoc>>();
  const candidateDocs = docs.filter((doc) => moduleId === 'all' || doc.module === moduleId);

  for (const doc of candidateDocs) {
    const titleMatches = countMatches(doc.title.toLowerCase(), normalized);
    const tagMatches = countMatches(doc.tags.join(' ').toLowerCase(), normalized);
    const bodyMatches = countMatches(doc.searchText, normalized);
    const score = titleMatches * 100 + tagMatches * 45 + bodyMatches * 8;

    if (score > 0) {
      resultByDoc.set(doc.id, {
        doc,
        snippet: makeSnippet(doc.searchText, normalized),
        score,
      });
    }
  }

  for (const chunk of chunks) {
    const doc = docsById.get(chunk.docId);
    if (!doc || (moduleId !== 'all' && doc.module !== moduleId)) continue;

    const chunkMatches = countMatches(chunk.searchText, normalized);
    if (chunkMatches === 0) continue;

    const score = chunkMatches * 20;
    const current = resultByDoc.get(doc.id);
    if (!current || score > current.score) {
      resultByDoc.set(doc.id, {
        doc,
        chunk,
        snippet: makeSnippet(chunk.text, normalized),
        score,
      });
    }
  }

  return [...resultByDoc.values()].sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return a.doc.title.localeCompare(b.doc.title, 'zh-CN');
  });
}
