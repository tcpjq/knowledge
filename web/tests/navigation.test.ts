import {
  flattenDocIds,
  getAdjacentDocIds,
  getDefaultExpandedSections,
  type NavigationModule,
} from '../src/navigation.js';

function assertEqual<T>(actual: T, expected: T, message: string) {
  if (JSON.stringify(actual) !== JSON.stringify(expected)) {
    throw new Error(`${message}\nExpected: ${JSON.stringify(expected)}\nActual: ${JSON.stringify(actual)}`);
  }
}

const modules: NavigationModule[] = [
  {
    id: 'tech',
    sections: [
      { id: 'root', docs: ['content/tech/index'] },
      {
        id: 'architecture',
        docs: ['content/tech/architecture/index', 'content/tech/architecture/what-is-architecture'],
      },
    ],
  },
  {
    id: 'communication',
    sections: [{ id: 'root', docs: ['content/communication/index'] }],
  },
];

assertEqual(
  flattenDocIds(modules),
  [
    'content/tech/index',
    'content/tech/architecture/index',
    'content/tech/architecture/what-is-architecture',
    'content/communication/index',
  ],
  'flattens docs in module and section order',
);

assertEqual(
  getAdjacentDocIds('content/tech/architecture/index', flattenDocIds(modules)),
  {
    previousId: 'content/tech/index',
    nextId: 'content/tech/architecture/what-is-architecture',
  },
  'finds previous and next docs',
);

assertEqual(
  getAdjacentDocIds('content/communication/index', flattenDocIds(modules)),
  {
    previousId: 'content/tech/architecture/what-is-architecture',
    nextId: undefined,
  },
  'returns undefined at the end of the doc list',
);

assertEqual(
  getDefaultExpandedSections(modules[0], 'architecture'),
  ['root', 'architecture'],
  'keeps overview and current section expanded',
);

assertEqual(
  getDefaultExpandedSections(modules[1], 'root'),
  ['root'],
  'does not duplicate the overview section',
);
