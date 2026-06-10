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
