export const allowedChangedFilePatterns = [
  /^content\/.+\.md$/,
  /^topics\/.+\.md$/,
  /^web\/src\/generated\/knowledge-data\.ts$/,
];

export function isAllowedChangedFile(filePath) {
  return allowedChangedFilePatterns.some((pattern) => pattern.test(filePath));
}

export function assertAllowedChangedFiles(filePaths) {
  const blocked = filePaths.filter((filePath) => !isAllowedChangedFile(filePath));
  if (blocked.length > 0) {
    throw new Error(`Blocked changed files:\n${blocked.map((filePath) => `- ${filePath}`).join('\n')}`);
  }
}

export function parseAgentResult(raw) {
  const result = JSON.parse(raw);
  if (!['changed', 'no_issue', 'blocked'].includes(result.status)) {
    throw new Error(`Invalid agent result status: ${result.status}`);
  }

  if (result.status === 'changed') {
    if (!Number.isInteger(result.issueNumber) || result.issueNumber <= 0) {
      throw new Error('Changed agent result must include a positive integer issueNumber');
    }
    if (typeof result.summary !== 'string' || result.summary.trim().length === 0) {
      throw new Error('Changed agent result must include a summary');
    }
  }

  return result;
}

export function buildBranchName(issueNumber) {
  return `ai/content-feedback-${issueNumber}`;
}

export function buildPrTitle(issueNumber) {
  return `Fix content feedback #${issueNumber}`;
}

export function buildPrBody({ issueNumber, summary, verification }) {
  return [
    `Fixes #${issueNumber}`,
    '',
    '## Summary',
    '',
    summary.trim(),
    '',
    '## Verification',
    '',
    verification.map((item) => `- ${item}`).join('\n'),
  ].join('\n');
}
