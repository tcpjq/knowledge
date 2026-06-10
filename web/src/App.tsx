import { createElement, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import {
  knowledgeChunks,
  knowledgeDocs,
  knowledgeModules,
  type Heading,
  type KnowledgeDoc,
} from './generated/knowledge-data';
import { flattenDocIds, getAdjacentDocIds, getDefaultExpandedSections } from './navigation';
import {
  highlightText,
  searchKnowledge,
  searchSelectionKnowledge,
  type HighlightPart,
  type SearchResult,
} from './search';

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

function findInitialDoc() {
  return (
    knowledgeDocs.find((doc) => doc.id === 'content/tech/architecture/what-is-architecture') ??
    knowledgeDocs[0]
  );
}

function HighlightedText({ parts }: { parts: HighlightPart[] }) {
  return (
    <>
      {parts.map((part, index) =>
        part.match ? (
          <mark key={`${part.text}-${index}`}>{part.text}</mark>
        ) : (
          <span key={`${part.text}-${index}`}>{part.text}</span>
        ),
      )}
    </>
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

function RelatedKnowledge({
  docs,
  onSelect,
}: {
  docs: KnowledgeDoc[];
  onSelect: (doc: KnowledgeDoc) => void;
}) {
  if (docs.length === 0) return null;

  return (
    <section className="related-knowledge" aria-label="相关知识">
      <h2>相关知识</h2>
      <div className="related-grid">
        {docs.map((doc) => (
          <button className="related-card" key={doc.id} onClick={() => onSelect(doc)} type="button">
            <strong>{doc.title}</strong>
            <span>
              {doc.moduleLabel} / {doc.sectionLabel}
            </span>
            {doc.tags.length > 0 ? <small>{doc.tags.slice(0, 3).join(' / ')}</small> : null}
          </button>
        ))}
      </div>
    </section>
  );
}

type SelectionPopoverState = {
  text: string;
  top: number;
  left: number;
  results: SearchResult<KnowledgeDoc>[];
};

function SelectionKnowledgePopover({
  state,
  onSelect,
}: {
  state: SelectionPopoverState | null;
  onSelect: (doc: KnowledgeDoc) => void;
}) {
  if (!state || state.results.length === 0) return null;

  return (
    <aside
      className="selection-popover"
      style={{ left: state.left, top: state.top }}
      aria-label="选中文本相关知识"
    >
      <div className="selection-popover-header">
        <span>相关知识点</span>
        <small>{state.text}</small>
      </div>
      <div className="selection-result-list">
        {state.results.map((result) => (
          <button
            className="selection-result"
            key={`${result.doc.id}-${result.chunk?.id ?? 'doc'}`}
            onClick={() => onSelect(result.doc)}
            type="button"
          >
            <strong>{result.doc.title}</strong>
            <span>
              {result.doc.moduleLabel} / {result.doc.sectionLabel}
              {result.chunk ? ` / ${result.chunk.heading}` : ''}
            </span>
            <small>{result.snippet}</small>
          </button>
        ))}
      </div>
    </aside>
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
  const articleRef = useRef<HTMLElement | null>(null);
  const popoverRef = useRef<HTMLDivElement | null>(null);
  const [selectionPopover, setSelectionPopover] = useState<SelectionPopoverState | null>(null);
  const [searchModuleId, setSearchModuleId] = useState('all');
  const searchResults = useMemo(
    () =>
      searchKnowledge({
        query,
        docs: knowledgeDocs,
        chunks: knowledgeChunks,
        modules: knowledgeModules,
        moduleId: searchModuleId,
      }),
    [query, searchModuleId],
  );
  const orderedDocIds = useMemo(() => flattenDocIds(knowledgeModules), []);
  const selectedDoc = docById.get(selectedId) ?? initialDoc;
  const activeModule =
    knowledgeModules.find((module) => module.id === activeModuleId) ?? knowledgeModules[0];
  const adjacentDocIds = selectedDoc
    ? getAdjacentDocIds(selectedDoc.id, orderedDocIds)
    : { previousId: undefined, nextId: undefined };
  const previousDoc = adjacentDocIds.previousId ? docById.get(adjacentDocIds.previousId) : undefined;
  const nextDoc = adjacentDocIds.nextId ? docById.get(adjacentDocIds.nextId) : undefined;
  const relatedDocs = selectedDoc
    ? selectedDoc.relatedDocIds
        .map((docId) => docById.get(docId))
        .filter((doc): doc is KnowledgeDoc => Boolean(doc))
    : [];

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

  const selectPopoverDoc = (doc: KnowledgeDoc) => {
    setSelectionPopover(null);
    window.getSelection()?.removeAllRanges();
    selectDoc(doc);
  };

  useEffect(() => {
    const closePopover = () => setSelectionPopover(null);

    if (!selectedDoc) {
      closePopover();
      return;
    }

    const handleSelection = () => {
      const selection = window.getSelection();
      const articleElement = articleRef.current;
      if (!selection || selection.rangeCount === 0 || !articleElement) {
        closePopover();
        return;
      }

      const selectedText = selection.toString().replace(/\s+/g, ' ').trim();
      const range = selection.getRangeAt(0);
      const container = range.commonAncestorContainer;
      const containerElement =
        container.nodeType === Node.TEXT_NODE ? container.parentElement : container;
      if (
        !selectedText ||
        !(containerElement instanceof Node) ||
        !articleElement.contains(containerElement)
      ) {
        closePopover();
        return;
      }

      const results = searchSelectionKnowledge({
        selectedText,
        currentDocId: selectedDoc.id,
        docs: knowledgeDocs,
        chunks: knowledgeChunks,
        modules: knowledgeModules,
      });

      if (results.length === 0) {
        closePopover();
        return;
      }

      const rect = range.getBoundingClientRect();
      const popoverWidth = Math.min(340, window.innerWidth - 32);
      const minLeft = window.scrollX + 16;
      const maxLeft = window.scrollX + window.innerWidth - popoverWidth - 16;
      const left = Math.min(
        Math.max(rect.left + window.scrollX, minLeft),
        Math.max(minLeft, maxLeft),
      );
      const popoverHeight = Math.min(420, window.innerHeight - 32);
      const belowTop = rect.bottom + window.scrollY + 10;
      const aboveTop = rect.top + window.scrollY - popoverHeight - 10;
      const viewportBottom = window.scrollY + window.innerHeight - 16;
      const top =
        belowTop + popoverHeight <= viewportBottom
          ? belowTop
          : Math.max(window.scrollY + 16, aboveTop);
      setSelectionPopover({ text: selectedText, top, left, results });
    };

    const handleMouseUp = () => window.setTimeout(handleSelection, 0);
    const handleKeyUp = () => window.setTimeout(handleSelection, 0);
    const handlePointerDown = (event: PointerEvent) => {
      if (event.target instanceof Node && popoverRef.current?.contains(event.target)) return;
      closePopover();
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closePopover();
    };

    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('keyup', handleKeyUp);
    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('keyup', handleKeyUp);
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedDoc]);

  useEffect(() => {
    setSelectionPopover(null);
  }, [selectedDoc?.id]);

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
              <div>
                <h1>搜索结果</h1>
                <span>{searchResults.length} 条匹配</span>
              </div>
              <button
                aria-label="关闭搜索结果"
                className="search-close"
                onClick={() => setQuery('')}
                type="button"
              >
                关闭
              </button>
            </div>
            <div className="search-controls" aria-label="搜索范围">
              <span>范围</span>
              <button
                className={searchModuleId === 'all' ? 'filter-chip active' : 'filter-chip'}
                onClick={() => setSearchModuleId('all')}
                type="button"
              >
                全部
              </button>
              {knowledgeModules.map((module) => (
                <button
                  className={searchModuleId === module.id ? 'filter-chip active' : 'filter-chip'}
                  key={module.id}
                  onClick={() => setSearchModuleId(module.id)}
                  type="button"
                >
                  {module.label}
                </button>
              ))}
            </div>
            {searchResults.length === 0 ? (
              <p className="no-results">没有找到匹配内容。</p>
            ) : (
              <div className="result-list">
                {searchResults.map((result) => (
                  <button
                    className={result.doc.id === selectedDoc.id ? 'result-card active' : 'result-card'}
                    key={result.doc.id}
                    onClick={() => selectDoc(result.doc)}
                    type="button"
                  >
                    <strong>
                      <HighlightedText parts={highlightText(result.doc.title, query)} />
                    </strong>
                    <span>
                      {result.doc.moduleLabel} / {result.doc.sectionLabel}
                      {result.chunk ? ` / ${result.chunk.heading}` : ''}
                    </span>
                    <small>
                      <HighlightedText parts={highlightText(result.snippet, query)} />
                    </small>
                  </button>
                ))}
              </div>
            )}
          </section>
        ) : null}

        <article className="article" ref={articleRef}>
          <div className="article-header">
            <h1>{selectedDoc.title}</h1>
            <Metadata doc={selectedDoc} />
            <div className="toc-inline">
              <h2>本文目录</h2>
              <Toc headings={selectedDoc.headings} />
            </div>
          </div>
          <div className="markdown-body">{renderMarkdown(selectedDoc.body)}</div>
          <RelatedKnowledge docs={relatedDocs} onSelect={selectDoc} />
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
      <div ref={popoverRef}>
        <SelectionKnowledgePopover state={selectionPopover} onSelect={selectPopoverDoc} />
      </div>
    </div>
  );
}
