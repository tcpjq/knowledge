import { mkdir, readdir, readFile, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const webRoot = path.resolve(scriptDir, '..');
const repoRoot = path.resolve(webRoot, '..');
const outputPath = path.join(webRoot, 'src', 'generated', 'knowledge-data.ts');

const categoryLabels = {
  ai: 'AI',
  architecture: '架构与系统设计',
  engineering: '工程实践',
  database: '数据库与存储',
  frontend: '前端',
  backend: '后端',
  tools: '工具与效率',
  incidents: '故障与复盘',
  topics: '主题',
  general: '通用',
};

const categoryOrder = [
  'ai',
  'architecture',
  'engineering',
  'database',
  'frontend',
  'backend',
  'tools',
  'incidents',
  'topics',
  'general',
];

const explicitFiles = ['README.md', 'index.md'];
const contentRoots = ['content', 'topics'];

async function fileExists(filePath) {
  try {
    await stat(filePath);
    return true;
  } catch {
    return false;
  }
}

async function walkMarkdownFiles(dir) {
  const absDir = path.join(repoRoot, dir);
  if (!(await fileExists(absDir))) {
    return [];
  }

  const entries = await readdir(absDir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const relPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walkMarkdownFiles(relPath)));
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      files.push(relPath.split(path.sep).join('/'));
    }
  }

  return files;
}

function parseFrontmatter(markdown) {
  if (!markdown.startsWith('---\n')) {
    return { frontmatter: {}, body: markdown };
  }

  const end = markdown.indexOf('\n---\n', 4);
  if (end === -1) {
    return { frontmatter: {}, body: markdown };
  }

  const raw = markdown.slice(4, end);
  const body = markdown.slice(end + 5);
  const frontmatter = {};

  for (const line of raw.split('\n')) {
    const match = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (!match) continue;

    const [, key, rawValue] = match;
    const value = rawValue.trim();

    if (value.startsWith('[') && value.endsWith(']')) {
      frontmatter[key] = value
        .slice(1, -1)
        .split(',')
        .map((item) => item.trim().replace(/^["']|["']$/g, ''))
        .filter(Boolean);
    } else {
      frontmatter[key] = value.replace(/^["']|["']$/g, '');
    }
  }

  return { frontmatter, body };
}

function slugify(text) {
  return text
    .trim()
    .toLowerCase()
    .replace(/[`*_~[\]()]/g, '')
    .replace(/[^\p{L}\p{N}\s-]/gu, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

function extractHeadings(body) {
  const used = new Map();
  const headings = [];

  for (const line of body.split('\n')) {
    const match = line.match(/^(#{1,3})\s+(.+)$/);
    if (!match) continue;

    const level = match[1].length;
    const text = match[2].trim().replace(/\s+#$/, '');
    const base = slugify(text) || `heading-${headings.length + 1}`;
    const count = used.get(base) ?? 0;
    used.set(base, count + 1);
    const slug = count === 0 ? base : `${base}-${count + 1}`;

    headings.push({ level, text, slug });
  }

  return headings;
}

function deriveTitle(frontmatter, body, relPath) {
  if (typeof frontmatter.title === 'string' && frontmatter.title.trim()) {
    return frontmatter.title.trim();
  }

  const h1 = body.match(/^#\s+(.+)$/m);
  if (h1) {
    return h1[1].trim();
  }

  const filename = path.basename(relPath, '.md');
  return filename
    .split('-')
    .filter(Boolean)
    .map((part) => part.slice(0, 1).toUpperCase() + part.slice(1))
    .join(' ');
}

function deriveCategory(frontmatter, relPath) {
  if (typeof frontmatter.category === 'string' && frontmatter.category.trim()) {
    const category = frontmatter.category.trim();
    return categoryLabels[category] ? category : 'general';
  }

  const parts = relPath.split('/');
  if (parts[0] === 'content' && parts[1] && categoryLabels[parts[1]]) {
    return parts[1];
  }

  if (parts[0] === 'topics') {
    return 'topics';
  }

  return 'general';
}

function stripMarkdown(markdown) {
  return markdown
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/!\[[^\]]*]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]+)]\([^)]*\)/g, '$1')
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/^>\s?/gm, '')
    .replace(/[*_~]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

async function collectFiles() {
  const files = [];

  for (const file of explicitFiles) {
    if (await fileExists(path.join(repoRoot, file))) {
      files.push(file);
    }
  }

  for (const root of contentRoots) {
    files.push(...(await walkMarkdownFiles(root)));
  }

  return [...new Set(files)].sort((a, b) => a.localeCompare(b, 'zh-CN'));
}

function buildCategories(docs) {
  const grouped = new Map();

  for (const category of categoryOrder) {
    grouped.set(category, []);
  }

  for (const doc of docs) {
    if (!grouped.has(doc.category)) {
      grouped.set(doc.category, []);
    }
    grouped.get(doc.category).push(doc.id);
  }

  return [...grouped.entries()]
    .filter(([, docsInCategory]) => docsInCategory.length > 0)
    .map(([id, docsInCategory]) => ({
      id,
      label: categoryLabels[id] ?? id,
      docs: docsInCategory,
    }));
}

async function main() {
  const files = await collectFiles();
  const docs = [];

  for (const relPath of files) {
    const markdown = await readFile(path.join(repoRoot, relPath), 'utf8');
    const { frontmatter, body } = parseFrontmatter(markdown);
    const category = deriveCategory(frontmatter, relPath);
    const tags = Array.isArray(frontmatter.tags) ? frontmatter.tags : [];
    const headings = extractHeadings(body);
    const title = deriveTitle(frontmatter, body, relPath);
    const id = relPath.replace(/\.md$/, '');
    const searchText = [title, relPath, categoryLabels[category], ...tags, stripMarkdown(body)]
      .join(' ')
      .toLowerCase();

    docs.push({
      id,
      title,
      path: relPath,
      category,
      categoryLabel: categoryLabels[category] ?? categoryLabels.general,
      tags,
      headings,
      body,
      searchText,
    });
  }

  const categories = buildCategories(docs);
  const output = `export type Heading = {
  level: number;
  text: string;
  slug: string;
};

export type KnowledgeDoc = {
  id: string;
  title: string;
  path: string;
  category: string;
  categoryLabel: string;
  tags: string[];
  headings: Heading[];
  body: string;
  searchText: string;
};

export type KnowledgeCategory = {
  id: string;
  label: string;
  docs: string[];
};

export const knowledgeDocs: KnowledgeDoc[] = ${JSON.stringify(docs, null, 2)};

export const knowledgeCategories: KnowledgeCategory[] = ${JSON.stringify(categories, null, 2)};
`;

  await mkdir(path.dirname(outputPath), { recursive: true });
  await writeFile(outputPath, output, 'utf8');
  console.log(`Generated ${docs.length} docs at ${path.relative(repoRoot, outputPath)}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
