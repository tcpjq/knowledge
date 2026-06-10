import {
  buildContentFeedbackBody,
  buildContentFeedbackIssueUrl,
  buildFeedbackLocation,
  type ContentFeedbackTarget,
} from '../src/feedback.js';

function assertEqual<T>(actual: T, expected: T, message: string) {
  if (JSON.stringify(actual) !== JSON.stringify(expected)) {
    throw new Error(`${message}\nExpected: ${JSON.stringify(expected)}\nActual: ${JSON.stringify(actual)}`);
  }
}

const target: ContentFeedbackTarget = {
  docId: 'content/tech/ai/superpowers-to-codex-subagent-workflow',
  docTitle: 'Superpowers 到 Codex 的子 agent 编排链路',
  docPath: 'content/tech/ai/superpowers-to-codex-subagent-workflow.md',
  sectionTitle: '执行链路',
  quote: 'Codex runtime 返回子 agent 的结果',
};

assertEqual(
  buildFeedbackLocation(target),
  'content/tech/ai/superpowers-to-codex-subagent-workflow.md / 执行链路',
  'section feedback location includes document path and section title',
);

assertEqual(
  buildFeedbackLocation({ ...target, sectionTitle: undefined }),
  'content/tech/ai/superpowers-to-codex-subagent-workflow.md / 整篇文章',
  'document feedback location falls back to the whole article',
);

assertEqual(
  buildContentFeedbackBody(target),
  [
    '## 反馈对象',
    '',
    '- 文档：Superpowers 到 Codex 的子 agent 编排链路',
    '- 路径：content/tech/ai/superpowers-to-codex-subagent-workflow.md',
    '- 位置：content/tech/ai/superpowers-to-codex-subagent-workflow.md / 执行链路',
    '',
    '## 原文',
    '',
    '> Codex runtime 返回子 agent 的结果',
    '',
    '## 问题说明',
    '',
    '请描述这里缺失、不准确或需要更新的内容。',
    '',
    '## 期望修改',
    '',
    '请描述你期望补充或修正成什么样。',
  ].join('\n'),
  'feedback body gives AI and reviewers structured context',
);

const url = new URL(buildContentFeedbackIssueUrl(target));

assertEqual(url.origin + url.pathname, 'https://github.com/tcpjq/knowledge/issues/new', 'opens a new GitHub issue');
assertEqual(url.searchParams.get('labels'), 'content-feedback', 'applies content-feedback label');
assertEqual(
  url.searchParams.get('title'),
  '内容反馈：Superpowers 到 Codex 的子 agent 编排链路',
  'prefills a reviewable issue title',
);
assertEqual(url.searchParams.get('body'), buildContentFeedbackBody(target), 'prefills the issue body');
