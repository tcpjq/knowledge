export type ContentFeedbackTarget = {
  docId: string;
  docTitle: string;
  docPath: string;
  sectionTitle?: string;
  quote?: string;
};

export type FeedbackDocument = {
  id: string;
  title: string;
  path: string;
};

const feedbackRepo = 'tcpjq/knowledge';

export function buildFeedbackLocation(target: ContentFeedbackTarget) {
  return `${target.docPath} / ${target.sectionTitle || '整篇文章'}`;
}

export function buildContentFeedbackBody(target: ContentFeedbackTarget) {
  const quote = target.quote?.trim() || '请在这里粘贴或描述有问题的原文。';

  return [
    '## 反馈对象',
    '',
    `- 文档：${target.docTitle}`,
    `- 路径：${target.docPath}`,
    `- 位置：${buildFeedbackLocation(target)}`,
    '',
    '## 原文',
    '',
    `> ${quote.replace(/\n+/g, '\n> ')}`,
    '',
    '## 问题说明',
    '',
    '请描述这里缺失、不准确或需要更新的内容。',
    '',
    '## 期望修改',
    '',
    '请描述你期望补充或修正成什么样。',
  ].join('\n');
}

export function buildContentFeedbackIssueUrl(target: ContentFeedbackTarget) {
  const url = new URL(`https://github.com/${feedbackRepo}/issues/new`);
  url.searchParams.set('template', 'content-feedback.md');
  url.searchParams.set('title', `内容反馈：${target.docTitle}`);
  url.searchParams.set('body', buildContentFeedbackBody(target));
  url.searchParams.set('labels', 'content-feedback');
  return url.toString();
}

export function buildSelectedTextFeedbackTarget(
  doc: FeedbackDocument,
  selectedText: string,
  context?: string,
): ContentFeedbackTarget {
  const normalizedSelectedText = selectedText.replace(/\s+/g, ' ').trim();
  const quote = context
    ? markSelectedTextInContext(context, normalizedSelectedText)
    : normalizedSelectedText;

  return {
    docId: doc.id,
    docTitle: doc.title,
    docPath: doc.path,
    quote,
  };
}

export function markSelectedTextInContext(context: string, selectedText: string) {
  const normalizedContext = context.replace(/\s+/g, ' ').trim();
  const normalizedSelectedText = selectedText.replace(/\s+/g, ' ').trim();
  if (!normalizedSelectedText) return normalizedContext;

  const index = normalizedContext.indexOf(normalizedSelectedText);
  if (index === -1) {
    return `${normalizedContext}\n\n选中内容：==${normalizedSelectedText}==`;
  }

  return [
    normalizedContext.slice(0, index),
    `==${normalizedSelectedText}==`,
    normalizedContext.slice(index + normalizedSelectedText.length),
  ].join('');
}
