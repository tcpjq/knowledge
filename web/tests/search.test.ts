import {
  highlightText,
  searchKnowledge,
  searchSelectionKnowledge,
  type SearchChunk,
  type SearchDoc,
  type SearchModule,
} from '../src/search.js';

function assertEqual<T>(actual: T, expected: T, message: string) {
  if (JSON.stringify(actual) !== JSON.stringify(expected)) {
    throw new Error(`${message}\nExpected: ${JSON.stringify(expected)}\nActual: ${JSON.stringify(actual)}`);
  }
}

const docs: SearchDoc[] = [
  {
    id: 'content/tech/architecture/what-is-architecture',
    title: '什么是架构',
    path: 'content/tech/architecture/what-is-architecture.md',
    module: 'tech',
    moduleLabel: '技术',
    section: 'architecture',
    sectionLabel: '架构与系统设计',
    tags: ['architecture'],
    searchText: '什么是架构 技术 架构与系统设计 系统边界 数据流 取舍 架构需要清晰边界',
  },
  {
    id: 'content/communication/index',
    title: '沟通',
    path: 'content/communication/index.md',
    module: 'communication',
    moduleLabel: '沟通',
    section: 'root',
    sectionLabel: '概览',
    tags: [],
    searchText: '沟通 表达 反馈 架构化表达',
  },
];

const chunks: SearchChunk[] = [
  {
    id: 'content/tech/architecture/what-is-architecture::1',
    docId: 'content/tech/architecture/what-is-architecture',
    heading: '边界',
    text: '边界回答系统分成哪些模块，什么归谁管。',
    searchText: '边界 边界回答系统分成哪些模块，什么归谁管。',
  },
  {
    id: 'content/communication/index::1',
    docId: 'content/communication/index',
    heading: '章节',
    text: '沟通模块用于沉淀表达、写作、会议、反馈。',
    searchText: '章节 沟通模块用于沉淀表达、写作、会议、反馈。',
  },
];

const modules: SearchModule[] = [
  { id: 'tech', label: '技术' },
  { id: 'communication', label: '沟通' },
];

const architectureResults = searchKnowledge({
  query: '架构',
  docs,
  chunks,
  modules,
});

assertEqual(
  architectureResults.map((result) => result.doc.id),
  ['content/tech/architecture/what-is-architecture', 'content/communication/index'],
  'title matches rank before body-only matches',
);

assertEqual(
  searchKnowledge({
    query: '架构',
    docs,
    chunks,
    modules,
    moduleId: 'communication',
  }).map((result) => result.doc.id),
  ['content/communication/index'],
  'module filter limits results',
);

assertEqual(
  searchKnowledge({
    query: '架构 边界',
    docs,
    chunks,
    modules,
  }).map((result) => result.doc.id),
  ['content/tech/architecture/what-is-architecture'],
  'space-separated keywords use AND matching',
);

const chunkResults = searchKnowledge({
  query: '归谁管',
  docs,
  chunks,
  modules,
});

assertEqual(
  chunkResults[0],
  {
    doc: docs[0],
    chunk: chunks[0],
    snippet: '边界回答系统分成哪些模块，什么归谁管。',
    score: 20,
  },
  'chunk matches return the matching chunk and snippet',
);

assertEqual(
  highlightText('架构是在约束下组织系统的方式', '架构'),
  [
    { text: '架构', match: true },
    { text: '是在约束下组织系统的方式', match: false },
  ],
  'highlights matching keyword',
);

assertEqual(
  highlightText('知识库需要清晰架构', '知识 架构'),
  [
    { text: '知识', match: true },
    { text: '库需要清晰', match: false },
    { text: '架构', match: true },
  ],
  'highlights multiple keywords',
);

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
