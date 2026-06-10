import { renderToStaticMarkup } from 'react-dom/server';
import { MarkdownContent, plainMarkdown } from '../src/markdown.js';

function assertEqual<T>(actual: T, expected: T, message: string) {
  if (JSON.stringify(actual) !== JSON.stringify(expected)) {
    throw new Error(`${message}\nExpected: ${JSON.stringify(expected)}\nActual: ${JSON.stringify(actual)}`);
  }
}

function assertIncludes(actual: string, expected: string, message: string) {
  if (!actual.includes(expected)) {
    throw new Error(`${message}\nExpected to include: ${expected}\nActual: ${actual}`);
  }
}

const markdown = [
  '## 评论和反馈',
  '',
  '| 类型 | 存储位置 |',
  '| --- | --- |',
  '| 评论 | GitHub Discussions |',
  '| 反馈 | GitHub Issues |',
  '',
  '这是一段 **Markdown** 内容。',
].join('\n');

const html = renderToStaticMarkup(<MarkdownContent markdown={markdown} />);

assertIncludes(html, '<h2 id="评论和反馈">评论和反馈</h2>', 'renders headings with stable ids');
assertIncludes(html, '<table>', 'renders GFM tables as real tables');
assertIncludes(html, '<th>类型</th>', 'renders table headers');
assertIncludes(html, '<td>GitHub Issues</td>', 'renders table cells');
assertIncludes(html, '<strong>Markdown</strong>', 'renders inline Markdown formatting');

const feedbackHtml = renderToStaticMarkup(
  <MarkdownContent
    markdown={markdown}
    onFeedback={() => undefined}
  />,
);
assertIncludes(feedbackHtml, 'class="inline-feedback-button"', 'keeps paragraph feedback controls');
assertIncludes(feedbackHtml, '反馈此段', 'renders the paragraph feedback label');

assertEqual(
  plainMarkdown('这是一段 **Markdown** 内容。'),
  '这是一段 Markdown 内容。',
  'plainMarkdown removes formatting from feedback quotes',
);
