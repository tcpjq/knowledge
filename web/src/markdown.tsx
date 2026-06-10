import { type ReactNode } from 'react';
import ReactMarkdown, { type Components } from 'react-markdown';
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize';
import remarkGfm from 'remark-gfm';
import type { ContentFeedbackTarget } from './feedback.js';

export function slugify(text: string) {
  return text
    .trim()
    .toLowerCase()
    .replace(/[`*_~[\]()]/g, '')
    .replace(/[^\p{L}\p{N}\s-]/gu, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

export function plainMarkdown(value: string) {
  return value
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/!\[[^\]]*]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]+)]\([^)]*\)/g, '$1')
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/^>\s?/gm, '')
    .replace(/[*_~|]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function reactNodeToText(node: ReactNode): string {
  if (node === null || node === undefined || typeof node === 'boolean') {
    return '';
  }
  if (typeof node === 'string' || typeof node === 'number') {
    return String(node);
  }
  if (Array.isArray(node)) {
    return node.map(reactNodeToText).join('');
  }
  if (typeof node === 'object' && 'props' in node) {
    return reactNodeToText((node as { props?: { children?: ReactNode } }).props?.children);
  }
  return '';
}

const sanitizeSchema = {
  ...defaultSchema,
  attributes: {
    ...defaultSchema.attributes,
    a: [
      ...(defaultSchema.attributes?.a ?? []),
      ['target'],
      ['rel'],
    ],
    code: [
      ...(defaultSchema.attributes?.code ?? []),
      ['className'],
    ],
    h1: [
      ...(defaultSchema.attributes?.h1 ?? []),
      ['id'],
    ],
    h2: [
      ...(defaultSchema.attributes?.h2 ?? []),
      ['id'],
    ],
    h3: [
      ...(defaultSchema.attributes?.h3 ?? []),
      ['id'],
    ],
    h4: [
      ...(defaultSchema.attributes?.h4 ?? []),
      ['id'],
    ],
  },
};

export function MarkdownContent({
  markdown,
  onFeedback,
}: {
  markdown: string;
  onFeedback?: (target: Pick<ContentFeedbackTarget, 'sectionTitle' | 'quote'>) => void;
}) {
  const usedSlugs = new Map<string, number>();
  let currentSectionTitle = '';

  const nextSlug = (text: string) => {
    const base = slugify(text) || `heading-${usedSlugs.size + 1}`;
    const count = usedSlugs.get(base) ?? 0;
    usedSlugs.set(base, count + 1);
    return count === 0 ? base : `${base}-${count + 1}`;
  };

  const heading = (level: 1 | 2 | 3 | 4) =>
    function Heading({ children }: { children?: ReactNode }) {
      const text = reactNodeToText(children).trim();
      const slug = nextSlug(text);
      if (level <= 3) {
        currentSectionTitle = text;
      }
      const Tag = `h${level}` as const;
      return <Tag id={slug}>{children}</Tag>;
    };

  const components: Components = {
    a({ children, href }) {
      return (
        <a href={href} rel="noreferrer" target="_blank">
          {children}
        </a>
      );
    },
    h1: heading(1),
    h2: heading(2),
    h3: heading(3),
    h4: heading(4),
    h5: heading(4),
    h6: heading(4),
    p({ children }) {
      const quote = plainMarkdown(reactNodeToText(children));
      return (
        <div className="feedback-target">
          <p>{children}</p>
          {onFeedback ? (
            <button
              className="inline-feedback-button"
              onClick={() =>
                onFeedback({
                  sectionTitle: currentSectionTitle || undefined,
                  quote,
                })
              }
              type="button"
            >
              反馈此段
            </button>
          ) : null}
        </div>
      );
    },
    pre({ children }) {
      return <pre className="code-block">{children}</pre>;
    },
  };

  return (
    <ReactMarkdown
      components={components}
      rehypePlugins={[[rehypeSanitize, sanitizeSchema]]}
      remarkPlugins={[remarkGfm]}
    >
      {markdown}
    </ReactMarkdown>
  );
}
