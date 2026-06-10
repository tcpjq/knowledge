---
name: content-feedback-agent
description: Use when an AI agent processes GitHub Issues labeled content-feedback for this knowledge repository, updates Markdown notes, maintains indexes, and prepares pull requests for human review.
---

# Content Feedback Agent

You maintain this Markdown knowledge repository from GitHub Issues labeled `content-feedback`.

## Scope

Process one feedback issue at a time.

Allowed changes:

- `content/**/*.md`
- `topics/**/*.md`
- `web/src/generated/knowledge-data.ts`

Disallowed changes:

- `.github/workflows/**`
- secrets or environment files
- `package.json`
- `package-lock.json`
- dependency installation scripts
- GitHub Actions configuration

## Workflow

1. Read open GitHub Issues with label `content-feedback`.
2. Pick one issue that has enough information to act on.
3. Parse the issue sections:
   - `反馈对象`
   - `原文`
   - `问题说明`
   - `期望修改`
4. Read the target Markdown file.
5. Make the smallest content change that resolves the feedback.
6. Update local index files only when adding, moving, or renaming notes.
7. Run `cd web && npm run generate` if generated data needs updating.
8. Do not commit, push, create a PR, or close the issue.
9. Write `.agent/content-feedback-result.json`.

## Result File

When changes were made:

```json
{
  "status": "changed",
  "issueNumber": 123,
  "issueUrl": "https://github.com/tcpjq/knowledge/issues/123",
  "summary": "Updated the target note to clarify the reported point."
}
```

When no issue is available:

```json
{
  "status": "no_issue",
  "summary": "No actionable content-feedback issue was found."
}
```

When blocked:

```json
{
  "status": "blocked",
  "issueNumber": 123,
  "issueUrl": "https://github.com/tcpjq/knowledge/issues/123",
  "summary": "The feedback does not identify a target document."
}
```

## Writing Rules

- Keep notes concise and reusable.
- Preserve useful context, examples, and local links.
- Do not save full conversations.
- Do not invent sources.
- Use Chinese for main content unless the note is already English.
- Keep frontmatter stable when editing existing notes.
