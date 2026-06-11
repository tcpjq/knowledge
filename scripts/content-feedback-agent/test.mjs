import {
  assertAllowedChangedFiles,
  buildBranchName,
  buildFeishuPrNotification,
  buildPrBody,
  buildPrTitle,
  isAllowedChangedFile,
  parseAgentResult,
} from './lib.mjs';

function assertEqual(actual, expected, message) {
  if (JSON.stringify(actual) !== JSON.stringify(expected)) {
    throw new Error(`${message}\nExpected: ${JSON.stringify(expected)}\nActual: ${JSON.stringify(actual)}`);
  }
}

assertEqual(isAllowedChangedFile('content/tech/tools/example.md'), true, 'allows content notes');
assertEqual(isAllowedChangedFile('topics/ai-era-technical-capability-map.md'), true, 'allows topic notes');
assertEqual(isAllowedChangedFile('web/src/generated/knowledge-data.ts'), true, 'allows generated data');
assertEqual(isAllowedChangedFile('.github/workflows/deploy-web.yml'), false, 'blocks workflows');
assertEqual(isAllowedChangedFile('web/package.json'), false, 'blocks package metadata');

assertAllowedChangedFiles([
  'content/tech/tools/example.md',
  'web/src/generated/knowledge-data.ts',
]);

try {
  assertAllowedChangedFiles(['content/tech/tools/example.md', 'web/package.json']);
  throw new Error('Expected blocked file check to throw');
} catch (error) {
  if (!String(error.message).includes('web/package.json')) {
    throw error;
  }
}

assertEqual(
  parseAgentResult(JSON.stringify({ status: 'changed', issueNumber: 42, summary: 'Updated wording.' })),
  { status: 'changed', issueNumber: 42, summary: 'Updated wording.' },
  'parses changed result',
);

assertEqual(
  parseAgentResult(JSON.stringify({ status: 'no_issue' })),
  { status: 'no_issue' },
  'parses no issue result',
);

assertEqual(buildBranchName(42), 'ai/content-feedback-42', 'builds content feedback branch name');
assertEqual(buildPrTitle(42), 'Fix content feedback #42', 'builds PR title');
assertEqual(
  buildPrBody({
    issueNumber: 42,
    summary: 'Updated the knowledge note.',
    verification: ['npm run generate', 'npm run test', 'npm run build'],
  }),
  [
    'Fixes #42',
    '',
    '## Summary',
    '',
    'Updated the knowledge note.',
    '',
    '## Verification',
    '',
    '- npm run generate',
    '- npm run test',
    '- npm run build',
  ].join('\n'),
  'builds PR body',
);

assertEqual(
  buildFeishuPrNotification({
    issueNumber: 42,
    issueTitle: '内容反馈：补充架构边界',
    issueUrl: 'https://github.com/tcpjq/knowledge/issues/42',
    summary: 'Updated the architecture note with clearer boundaries.',
    prUrl: 'https://github.com/tcpjq/knowledge/pull/43',
    branch: 'ai/content-feedback-42',
  }),
  [
    'Knowledge feedback PR created',
    '',
    'Issue: #42 内容反馈：补充架构边界',
    'Issue URL: https://github.com/tcpjq/knowledge/issues/42',
    'Why: 内容反馈：补充架构边界',
    'What changed: Updated the architecture note with clearer boundaries.',
    'PR: https://github.com/tcpjq/knowledge/pull/43',
    'Branch: ai/content-feedback-42',
  ].join('\n'),
  'builds Feishu PR notification with review context',
);
