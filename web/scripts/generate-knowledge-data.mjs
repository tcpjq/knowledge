import { mkdir, readdir, readFile, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const webRoot = path.resolve(scriptDir, '..');
const repoRoot = path.resolve(webRoot, '..');
const outputPath = path.join(webRoot, 'src', 'generated', 'knowledge-data.ts');

const moduleLabels = {
  tech: '技术',
  communication: '沟通',
  travel: '旅游',
  topics: '主题',
  general: '通用',
};

const moduleDescriptions = {
  tech: 'AI 工程、架构、工程实践、数据库、前端、后端、工具与故障复盘。',
  communication: '表达、写作、会议、反馈、谈判、协作和关系处理。',
  travel: '目的地、攻略、预算、行程、签证、酒店和旅行复盘。',
  topics: '跨模块主题、路线图和能力地图。',
  general: '没有归入具体模块的通用内容。',
};

const sectionLabels = {
  ai: 'AI',
  architecture: '架构与系统设计',
  engineering: '工程实践',
  database: '数据库与存储',
  frontend: '前端',
  backend: '后端',
  tools: '工具与效率',
  incidents: '故障与复盘',
  root: '概览',
  general: '通用',
};

const moduleOrder = ['tech', 'communication', 'travel', 'topics', 'general'];

const sectionOrder = [
  'root',
  'ai',
  'architecture',
  'engineering',
  'database',
  'frontend',
  'backend',
  'tools',
  'incidents',
  'general',
];

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

function deriveLocation(frontmatter, relPath) {
  const parts = relPath.split('/');

  if (parts[0] === 'content') {
    const moduleId = parts[1] && moduleLabels[parts[1]] ? parts[1] : 'general';
    const sectionId = parts[2] && parts[2] !== 'index.md' ? parts[2] : 'root';
    return {
      module: moduleId,
      moduleLabel: moduleLabels[moduleId] ?? moduleLabels.general,
      section: sectionLabels[sectionId] ? sectionId : 'general',
      sectionLabel: sectionLabels[sectionId] ?? sectionLabels.general,
    };
  }

  if (parts[0] === 'topics') {
    return {
      module: 'topics',
      moduleLabel: moduleLabels.topics,
      section: 'root',
      sectionLabel: sectionLabels.root,
    };
  }

  const frontmatterModule =
    typeof frontmatter.module === 'string' && moduleLabels[frontmatter.module]
      ? frontmatter.module
      : 'general';
  const frontmatterSection =
    typeof frontmatter.section === 'string' && sectionLabels[frontmatter.section]
      ? frontmatter.section
      : 'root';

  return {
    module: frontmatterModule,
    moduleLabel: moduleLabels[frontmatterModule] ?? moduleLabels.general,
    section: frontmatterSection,
    sectionLabel: sectionLabels[frontmatterSection] ?? sectionLabels.root,
  };
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

  for (const root of contentRoots) {
    files.push(...(await walkMarkdownFiles(root)));
  }

  return [...new Set(files)].sort((a, b) => a.localeCompare(b, 'zh-CN'));
}

function buildModules(docs) {
  const modules = new Map();

  for (const moduleId of moduleOrder) {
    modules.set(moduleId, {
      id: moduleId,
      label: moduleLabels[moduleId],
      description: moduleDescriptions[moduleId],
      sections: new Map(),
    });
  }

  for (const doc of docs) {
    if (!modules.has(doc.module)) {
      modules.set(doc.module, {
        id: doc.module,
        label: doc.moduleLabel,
        description: moduleDescriptions.general,
        sections: new Map(),
      });
    }

    const moduleEntry = modules.get(doc.module);
    if (!moduleEntry.sections.has(doc.section)) {
      moduleEntry.sections.set(doc.section, {
        id: doc.section,
        label: doc.sectionLabel,
        docs: [],
      });
    }
    moduleEntry.sections.get(doc.section).docs.push(doc.id);
  }

  return [...modules.values()]
    .filter((moduleEntry) => moduleEntry.sections.size > 0)
    .map((moduleEntry) => {
      const sections = [...moduleEntry.sections.values()].sort((a, b) => {
        const aIndex = sectionOrder.indexOf(a.id);
        const bIndex = sectionOrder.indexOf(b.id);
        return (aIndex === -1 ? 999 : aIndex) - (bIndex === -1 ? 999 : bIndex);
      });
      return {
        ...moduleEntry,
        sections,
      };
    });
}

async function main() {
  const files = await collectFiles();
  const docs = [];

  for (const relPath of files) {
    const markdown = await readFile(path.join(repoRoot, relPath), 'utf8');
    const { frontmatter, body } = parseFrontmatter(markdown);
    const location = deriveLocation(frontmatter, relPath);
    const tags = Array.isArray(frontmatter.tags) ? frontmatter.tags : [];
    const headings = extractHeadings(body);
    const title = deriveTitle(frontmatter, body, relPath);
    const id = relPath.replace(/\.md$/, '');
    const searchText = [
      title,
      relPath,
      location.moduleLabel,
      location.sectionLabel,
      ...tags,
      stripMarkdown(body),
    ]
      .join(' ')
      .toLowerCase();

    docs.push({
      id,
      title,
      path: relPath,
      module: location.module,
      moduleLabel: location.moduleLabel,
      section: location.section,
      sectionLabel: location.sectionLabel,
      tags,
      headings,
      body,
      searchText,
    });
  }

  const modules = buildModules(docs);
  const output = `export type Heading = {
  level: number;
  text: string;
  slug: string;
};

export type KnowledgeDoc = {
  id: string;
  title: string;
  path: string;
  module: string;
  moduleLabel: string;
  section: string;
  sectionLabel: string;
  tags: string[];
  headings: Heading[];
  body: string;
  searchText: string;
};

export type KnowledgeSection = {
  id: string;
  label: string;
  docs: string[];
};

export type KnowledgeModule = {
  id: string;
  label: string;
  description: string;
  sections: KnowledgeSection[];
};

export const knowledgeDocs: KnowledgeDoc[] = ${JSON.stringify(docs, null, 2)};

export const knowledgeModules: KnowledgeModule[] = ${JSON.stringify(modules, null, 2)};
`;

  await mkdir(path.dirname(outputPath), { recursive: true });
  await writeFile(outputPath, output, 'utf8');
  console.log(`Generated ${docs.length} docs at ${path.relative(repoRoot, outputPath)}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
