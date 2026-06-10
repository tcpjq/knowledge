export type GiscusConfig = {
  repo: string;
  repoId: string;
  category: string;
  categoryId: string;
  mapping: 'specific';
  strict: '0' | '1';
  reactionsEnabled: '0' | '1';
  emitMetadata: '0' | '1';
  inputPosition: 'top' | 'bottom';
  theme: string;
  lang: string;
  loading: 'lazy' | 'eager';
};

export const baseGiscusConfig: GiscusConfig = {
  repo: 'tcpjq/knowledge',
  repoId: 'R_kgDOS1ZCvQ',
  category: 'General',
  categoryId: 'DIC_kwDOS1ZCvc4C-5Bs',
  mapping: 'specific',
  strict: '0',
  reactionsEnabled: '1',
  emitMetadata: '0',
  inputPosition: 'bottom',
  theme: 'preferred_color_scheme',
  lang: 'zh-CN',
  loading: 'lazy',
};

export function buildGiscusTerm(docId: string) {
  return `knowledge:${docId}`;
}

export function isGiscusConfigured(config: GiscusConfig) {
  return Boolean(config.repo && config.repoId && config.category && config.categoryId);
}

export function buildGiscusAttributes(config: GiscusConfig, docId: string) {
  return {
    src: 'https://giscus.app/client.js',
    'data-repo': config.repo,
    'data-repo-id': config.repoId,
    'data-category': config.category,
    'data-category-id': config.categoryId,
    'data-mapping': config.mapping,
    'data-term': buildGiscusTerm(docId),
    'data-strict': config.strict,
    'data-reactions-enabled': config.reactionsEnabled,
    'data-emit-metadata': config.emitMetadata,
    'data-input-position': config.inputPosition,
    'data-theme': config.theme,
    'data-lang': config.lang,
    'data-loading': config.loading,
    crossorigin: 'anonymous',
    async: 'true',
  };
}
