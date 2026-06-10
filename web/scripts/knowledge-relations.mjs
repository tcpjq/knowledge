import path from 'node:path';

const MARKDOWN_LINK_RE = /\[[^\]]+\]\(([^)]+)\)/g;
const WORD_RE = /[\p{L}\p{N}_-]+/gu;

export function isIndexDoc(doc) {
  return doc?.path === 'index.md' || doc?.path?.endsWith('/index.md') === true;
}

export function extractManualRelatedDocIds(sourceDoc, docs) {
  const relationSection = extractRelationSection(sourceDoc?.body ?? '');
  if (!relationSection) {
    return [];
  }

  const docsById = new Map(docs.map((doc) => [doc.id, doc]));
  const sourceDir = path.posix.dirname(sourceDoc.path);
  const relatedIds = [];
  const seenIds = new Set();

  for (const linkTarget of extractMarkdownLinkTargets(relationSection)) {
    const relatedId = resolveMarkdownDocId(linkTarget, sourceDir);
    if (
      !relatedId ||
      relatedId === sourceDoc.id ||
      seenIds.has(relatedId) ||
      !docsById.has(relatedId)
    ) {
      continue;
    }

    relatedIds.push(relatedId);
    seenIds.add(relatedId);
  }

  return relatedIds;
}

export function computeRelatedDocIds(sourceDoc, docs, limit = 5) {
  const manualIds = extractManualRelatedDocIds(sourceDoc, docs).filter((id) => {
    const doc = docs.find((candidate) => candidate.id === id);
    return doc && !isIndexDoc(doc);
  });
  const manualIdSet = new Set(manualIds);
  const sourceTitleTokens = tokenize(sourceDoc.title);
  const sourceSearchTokens = tokenize(sourceDoc.searchText);
  const sourceTags = new Set(sourceDoc.tags ?? []);

  const automaticIds = docs
    .filter((doc) => doc.id !== sourceDoc.id && !manualIdSet.has(doc.id) && !isIndexDoc(doc))
    .map((doc) => ({
      doc,
      score: scoreRelatedDoc(sourceDoc, doc, sourceTags, sourceTitleTokens, sourceSearchTokens),
    }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score;
      }

      return a.doc.title.localeCompare(b.doc.title, 'zh-CN');
    })
    .map(({ doc }) => doc.id);

  return [...manualIds, ...automaticIds].slice(0, limit);
}

function extractRelationSection(markdown) {
  const lines = markdown.split(/\r?\n/);
  const headingIndex = lines.findIndex((line) => /^## 关联\s*$/.test(line));

  if (headingIndex === -1) {
    return '';
  }

  const sectionLines = [];
  for (let index = headingIndex + 1; index < lines.length; index += 1) {
    if (/^##\s+/.test(lines[index])) {
      break;
    }

    sectionLines.push(lines[index]);
  }

  return sectionLines.join('\n');
}

function extractMarkdownLinkTargets(markdown) {
  return [...markdown.matchAll(MARKDOWN_LINK_RE)].map((match) => match[1].trim());
}

function resolveMarkdownDocId(linkTarget, sourceDir) {
  const target = linkTarget.replace(/^<|>$/g, '');

  if (
    !target ||
    target.startsWith('#') ||
    /^[a-z][a-z0-9+.-]*:/i.test(target) ||
    target.startsWith('//')
  ) {
    return '';
  }

  const [targetWithoutHash] = target.split('#');
  const [targetPath] = targetWithoutHash.split('?');

  if (!targetPath.endsWith('.md')) {
    return '';
  }

  return path.posix.normalize(path.posix.join(sourceDir, targetPath)).replace(/\.md$/, '');
}

function scoreRelatedDoc(sourceDoc, targetDoc, sourceTags, sourceTitleTokens, sourceSearchTokens) {
  const targetTags = new Set(targetDoc.tags ?? []);
  const targetTitleTokens = tokenize(targetDoc.title);
  const targetSearchTokens = tokenize(targetDoc.searchText);

  return (
    intersectionSize(sourceTags, targetTags) * 8 +
    intersectionSize(sourceTitleTokens, targetTitleTokens) * 5 +
    (targetDoc.section === sourceDoc.section ? 4 : 0) +
    (targetDoc.module === sourceDoc.module ? 2 : 0) +
    intersectionSize(sourceSearchTokens, targetSearchTokens)
  );
}

function tokenize(text) {
  return new Set(String(text ?? '').toLocaleLowerCase('zh-CN').match(WORD_RE) ?? []);
}

function intersectionSize(left, right) {
  let count = 0;

  for (const value of left) {
    if (right.has(value)) {
      count += 1;
    }
  }

  return count;
}
