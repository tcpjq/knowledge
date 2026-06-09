import { createElement, useMemo, useState, type ReactNode } from 'react';
import {
  knowledgeDocs,
  knowledgeModules,
  type Heading,
  type KnowledgeDoc,
} from './generated/knowledge-data';
import { flattenDocIds, getAdjacentDocIds, getDefaultExpandedSections } from './navigation';

const docById = new Map(knowledgeDocs.map((doc) => [doc.id, doc]));

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function slugify(text: string) {
  return text
    .trim()
    .toLowerCase()
    .replace(/[`*_~[\]()]/g, '')
    .replace(/[^\p{L}\p{N}\s-]/gu, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

function inlineMarkdown(value: string) {
  let html = escapeHtml(value);
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>');
  html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  html = html.replace(
    /\[([^\]]+)]\(([^)]+)\)/g,
    '<a href="$2" target="_blank" rel="noreferrer">$1</a>',
  );
  return html;
}

function renderMarkdown(markdown: string) {
  const lines = markdown.split('\n');
  const nodes: ReactNode[] = [];
  const usedSlugs = new Map<string, number>();
  let index = 0;

  const nextSlug = (text: string) => {
    const base = slugify(text) || `heading-${nodes.length + 1}`;
    const count = usedSlugs.get(base) ?? 0;
    usedSlugs.set(base, count + 1);
    return count === 0 ? base : `${base}-${count + 1}`;
  };

  while (index < lines.length) {
    const line = lines[index];

    if (!line.trim()) {
      index += 1;
      continue;
    }

    if (line.startsWith('```')) {
      const language = line.slice(3).trim();
      const code: string[] = [];
      index += 1;
      while (index < lines.length && !lines[index].startsWith('```')) {
        code.push(lines[index]);
        index += 1;
      }
      index += 1;
      nodes.push(
        <pre className="code-block" key={`code-${index}`}>
          {language ? <span className="code-language">{language}</span> : null}
          <code>{code.join('\n')}</code>
        </pre>,
      );
      continue;
    }

    const heading = line.match(/^(#{1,6})\s+(.+)$/);
    if (heading) {
      const level = heading[1].length;
      const text = heading[2].trim().replace(/\s+#$/, '');
      const slug = nextSlug(text);
      nodes.push(createElement(`h${Math.min(level, 4)}`, { id: slug, key: `heading-${index}` }, text));
      index += 1;
      continue;
    }

    if (line.startsWith('>')) {
      const quote: string[] = [];
      while (index < lines.length && lines[index].startsWith('>')) {
        quote.push(lines[index].replace(/^>\s?/, ''));
        index += 1;
      }
      nodes.push(
        <blockquote
          key={`quote-${index}`}
          dangerouslySetInnerHTML={{ __html: inlineMarkdown(quote.join(' ')) }}
        />,
      );
      continue;
    }

    if (/^\s*[-*]\s+/.test(line)) {
      const items: string[] = [];
      while (index < lines.length && /^\s*[-*]\s+/.test(lines[index])) {
        items.push(lines[index].replace(/^\s*[-*]\s+/, ''));
        index += 1;
      }
      nodes.push(
        <ul key={`ul-${index}`}>
          {items.map((item, itemIndex) => (
            <li
              dangerouslySetInnerHTML={{ __html: inlineMarkdown(item) }}
              key={`${item}-${itemIndex}`}
            />
          ))}
        </ul>,
      );
      continue;
    }

    if (/^\s*\d+\.\s+/.test(line)) {
      const items: string[] = [];
      while (index < lines.length && /^\s*\d+\.\s+/.test(lines[index])) {
        items.push(lines[index].replace(/^\s*\d+\.\s+/, ''));
        index += 1;
      }
      nodes.push(
        <ol key={`ol-${index}`}>
          {items.map((item, itemIndex) => (
            <li
              dangerouslySetInnerHTML={{ __html: inlineMarkdown(item) }}
              key={`${item}-${itemIndex}`}
            />
          ))}
        </ol>,
      );
      continue;
    }

    const paragraph: string[] = [];
    while (
      index < lines.length &&
      lines[index].trim() &&
      !lines[index].startsWith('```') &&
      !/^(#{1,6})\s+/.test(lines[index]) &&
      !lines[index].startsWith('>') &&
      !/^\s*[-*]\s+/.test(lines[index]) &&
      !/^\s*\d+\.\s+/.test(lines[index])
    ) {
      paragraph.push(lines[index]);
      index += 1;
    }
    nodes.push(
      <p
        dangerouslySetInnerHTML={{ __html: inlineMarkdown(paragraph.join(' ')) }}
        key={`p-${index}`}
      />,
    );
  }

  return nodes;
}

function filterDocs(query: string) {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return [];
  return knowledgeDocs.filter((doc) => doc.searchText.includes(normalized));
}

function findInitialDoc() {
  return (
    knowledgeDocs.find((doc) => doc.id === 'content/tech/architecture/what-is-architecture') ??
    knowledgeDocs[0]
  );
}

function Metadata({ doc }: { doc: KnowledgeDoc }) {
  return (
    <div className="doc-meta">
      <span>{doc.moduleLabel}</span>
      <span>{doc.sectionLabel}</span>
      <span>{doc.path}</span>
      {doc.tags.map((tag) => (
        <span className="tag" key={tag}>
          {tag}
        </span>
      ))}
    </div>
  );
}

function Toc({ headings }: { headings: Heading[] }) {
  const visible = headings.filter((heading) => heading.level === 2 || heading.level === 3);

  if (visible.length === 0) {
    return <p className="toc-empty">当前文档暂无章节目录。</p>;
  }

  return (
    <nav className="toc-list" aria-label="当前文章目录">
      {visible.map((heading) => (
        <a className={`toc-link level-${heading.level}`} href={`#${heading.slug}`} key={heading.slug}>
          {heading.text}
        </a>
      ))}
    </nav>
  );
}

export default function App() {
  const initialDoc = findInitialDoc();
  const initialModuleId = initialDoc?.module ?? knowledgeModules[0]?.id ?? '';
  const initialModule =
    knowledgeModules.find((module) => module.id === initialModuleId) ?? knowledgeModules[0];
  const [selectedId, setSelectedId] = useState(initialDoc?.id ?? '');
  const [activeModuleId, setActiveModuleId] = useState(initialModuleId);
  const [expandedSections, setExpandedSections] = useState(
    () => new Set(getDefaultExpandedSections(initialModule, initialDoc?.section)),
  );
  const [query, setQuery] = useState('');
  const searchResults = useMemo(() => filterDocs(query), [query]);
  const orderedDocIds = useMemo(() => flattenDocIds(knowledgeModules), []);
  const selectedDoc = docById.get(selectedId) ?? initialDoc;
  const activeModule =
    knowledgeModules.find((module) => module.id === activeModuleId) ?? knowledgeModules[0];
  const adjacentDocIds = selectedDoc
    ? getAdjacentDocIds(selectedDoc.id, orderedDocIds)
    : { previousId: undefined, nextId: undefined };
  const previousDoc = adjacentDocIds.previousId ? docById.get(adjacentDocIds.previousId) : undefined;
  const nextDoc = adjacentDocIds.nextId ? docById.get(adjacentDocIds.nextId) : undefined;

  const selectModule = (moduleId: string) => {
    const nextModule = knowledgeModules.find((module) => module.id === moduleId);
    const firstDocId = nextModule?.sections.flatMap((section) => section.docs)[0];
    const firstDoc = firstDocId ? docById.get(firstDocId) : undefined;
    setActiveModuleId(moduleId);
    setExpandedSections(new Set(getDefaultExpandedSections(nextModule, firstDoc?.section)));
    if (firstDocId) {
      setSelectedId(firstDocId);
    }
  };

  const selectDoc = (doc: KnowledgeDoc) => {
    const nextModule = knowledgeModules.find((module) => module.id === doc.module);
    setSelectedId(doc.id);
    setActiveModuleId(doc.module);
    setExpandedSections((current) => {
      if (doc.module !== activeModuleId) {
        return new Set(getDefaultExpandedSections(nextModule, doc.section));
      }

      const next = new Set(current);
      for (const sectionId of getDefaultExpandedSections(nextModule, doc.section)) {
        next.add(sectionId);
      }
      return next;
    });
  };

  const toggleSection = (sectionId: string) => {
    setExpandedSections((current) => {
      const next = new Set(current);
      if (next.has(sectionId)) {
        next.delete(sectionId);
      } else {
        next.add(sectionId);
      }
      return next;
    });
  };

  if (!selectedDoc) {
    return (
      <main className="empty-state">
        <h1>Knowledge</h1>
        <p>当前没有可展示的知识文档。</p>
      </main>
    );
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <span className="brand-mark">K</span>
          <div>
            <strong>Knowledge</strong>
            <span>Markdown 知识库</span>
          </div>
        </div>

        <div className="search-mobile">
          <input
            aria-label="搜索知识库"
            onChange={(event) => setQuery(event.target.value)}
            placeholder="搜索标题、正文、标签..."
            type="search"
            value={query}
          />
        </div>

        <nav className="sidebar-modules" aria-label="知识模块">
          {knowledgeModules.map((module) => (
            <button
              className={module.id === activeModule?.id ? 'module-tab active' : 'module-tab'}
              key={module.id}
              onClick={() => selectModule(module.id)}
              type="button"
            >
              {module.label}
            </button>
          ))}
        </nav>

        <nav className="category-nav" aria-label="当前模块目录">
          {activeModule ? (
            <div className="module-context">
              <strong>{activeModule.label}</strong>
              <span>{activeModule.description}</span>
            </div>
          ) : null}

          {activeModule?.sections.map((section) => (
            <section className="category-group" key={section.id}>
              <h2>
                <button
                  aria-expanded={expandedSections.has(section.id)}
                  className="section-toggle"
                  onClick={() => toggleSection(section.id)}
                  type="button"
                >
                  <span>{section.label}</span>
                  <span aria-hidden="true" className="section-toggle-icon">
                    {expandedSections.has(section.id) ? '-' : '+'}
                  </span>
                </button>
              </h2>
              {expandedSections.has(section.id) ? (
                <div className="doc-list">
                  {section.docs.map((docId) => {
                    const doc = docById.get(docId);
                    if (!doc) return null;
                    return (
                      <button
                        className={doc.id === selectedDoc.id ? 'doc-button active' : 'doc-button'}
                        key={doc.id}
                        onClick={() => selectDoc(doc)}
                        type="button"
                      >
                        <span>{doc.title}</span>
                      </button>
                    );
                  })}
                </div>
              ) : null}
            </section>
          ))}
        </nav>
      </aside>

      <main className="content-panel">
        <header className="topbar">
          <nav className="module-tabs" aria-label="知识模块">
            {knowledgeModules.map((module) => (
              <button
                className={module.id === activeModule?.id ? 'module-tab active' : 'module-tab'}
                key={module.id}
                onClick={() => selectModule(module.id)}
                type="button"
              >
                {module.label}
              </button>
            ))}
          </nav>
          <div className="search-field">
            <input
              aria-label="搜索知识库"
              onChange={(event) => setQuery(event.target.value)}
              placeholder="搜索全部知识库..."
              type="search"
              value={query}
            />
          </div>
        </header>

        {query.trim() ? (
          <section className="search-results" aria-label="搜索结果">
            <div className="section-heading">
              <h1>搜索结果</h1>
              <span>{searchResults.length} 条匹配</span>
            </div>
            {searchResults.length === 0 ? (
              <p className="no-results">没有找到匹配内容。</p>
            ) : (
              <div className="result-list">
                {searchResults.map((doc) => (
                  <button
                    className={doc.id === selectedDoc.id ? 'result-card active' : 'result-card'}
                    key={doc.id}
                    onClick={() => selectDoc(doc)}
                    type="button"
                  >
                    <strong>{doc.title}</strong>
                    <span>
                      {doc.moduleLabel} / {doc.sectionLabel}
                    </span>
                    <small>{doc.path}</small>
                  </button>
                ))}
              </div>
            )}
          </section>
        ) : null}

        <article className="article">
          <div className="article-header">
            <h1>{selectedDoc.title}</h1>
            <Metadata doc={selectedDoc} />
            <div className="toc-inline">
              <h2>本文目录</h2>
              <Toc headings={selectedDoc.headings} />
            </div>
          </div>
          <div className="markdown-body">{renderMarkdown(selectedDoc.body)}</div>
          {(previousDoc || nextDoc) ? (
            <nav className="article-nav" aria-label="上一篇和下一篇">
              {previousDoc ? (
                <button className="article-nav-card previous" onClick={() => selectDoc(previousDoc)} type="button">
                  <span>上一篇</span>
                  <strong>{previousDoc.title}</strong>
                  <small>
                    {previousDoc.moduleLabel} / {previousDoc.sectionLabel}
                  </small>
                </button>
              ) : (
                <span />
              )}
              {nextDoc ? (
                <button className="article-nav-card next" onClick={() => selectDoc(nextDoc)} type="button">
                  <span>下一篇</span>
                  <strong>{nextDoc.title}</strong>
                  <small>
                    {nextDoc.moduleLabel} / {nextDoc.sectionLabel}
                  </small>
                </button>
              ) : (
                <span />
              )}
            </nav>
          ) : null}
        </article>
      </main>

      <aside className="toc-panel">
        <h2>本文目录</h2>
        <Toc headings={selectedDoc.headings} />
      </aside>
    </div>
  );
}
