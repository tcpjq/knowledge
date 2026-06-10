import {
  buildGiscusAttributes,
  buildGiscusTerm,
  isGiscusConfigured,
  type GiscusConfig,
} from '../src/giscus.js';

function assertEqual<T>(actual: T, expected: T, message: string) {
  if (JSON.stringify(actual) !== JSON.stringify(expected)) {
    throw new Error(`${message}\nExpected: ${JSON.stringify(expected)}\nActual: ${JSON.stringify(actual)}`);
  }
}

const configured: GiscusConfig = {
  repo: 'tcpjq/knowledge',
  repoId: 'R_kgDOS1ZCvQ',
  category: 'General',
  categoryId: 'DIC_example',
  mapping: 'specific',
  strict: '1',
  reactionsEnabled: '1',
  emitMetadata: '0',
  inputPosition: 'bottom',
  theme: 'preferred_color_scheme',
  lang: 'zh-CN',
  loading: 'lazy',
};

assertEqual(
  buildGiscusTerm('content/tech/ai/superpowers-to-codex-subagent-workflow'),
  'knowledge:content/tech/ai/superpowers-to-codex-subagent-workflow',
  'uses a stable per-document discussion term',
);

assertEqual(
  isGiscusConfigured(configured),
  true,
  'complete giscus config is enabled',
);

assertEqual(
  isGiscusConfigured({ ...configured, categoryId: '' }),
  false,
  'missing category id disables giscus',
);

assertEqual(
  buildGiscusAttributes(configured, 'content/tech/ai/superpowers-to-codex-subagent-workflow'),
  {
    src: 'https://giscus.app/client.js',
    'data-repo': 'tcpjq/knowledge',
    'data-repo-id': 'R_kgDOS1ZCvQ',
    'data-category': 'General',
    'data-category-id': 'DIC_example',
    'data-mapping': 'specific',
    'data-term': 'knowledge:content/tech/ai/superpowers-to-codex-subagent-workflow',
    'data-strict': '1',
    'data-reactions-enabled': '1',
    'data-emit-metadata': '0',
    'data-input-position': 'bottom',
    'data-theme': 'preferred_color_scheme',
    'data-lang': 'zh-CN',
    'data-loading': 'lazy',
    crossorigin: 'anonymous',
    async: 'true',
  },
  'builds the script attributes expected by giscus',
);
