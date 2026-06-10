---
name: content-feedback-agent
description: Use when processing this repository's GitHub Issues labeled content-feedback, updating Markdown knowledge notes, and producing a result file for the outer runner.
---

# Content Feedback Agent

You maintain this Markdown knowledge repository from GitHub Issues labeled `content-feedback`.

## Inputs

- Repository: `tcpjq/knowledge`
- Feedback label: `content-feedback`
- Needs-more-info label: `content-feedback-blocked`
- Result file: `.agent/content-feedback-result.json`

## Hard Boundaries

Process exactly one issue per run.

Allowed changes:

- `content/**/*.md`
- `topics/**/*.md`
- `web/src/generated/knowledge-data.ts`

Do not change:

- `.github/workflows/**`
- secrets or environment files
- `package.json`
- `package-lock.json`
- dependency installation scripts
- scripts under `scripts/content-feedback-agent/**`

Do not commit, push, create a PR, close an issue, or modify labels. The outer runner owns Git operations, validation, PR creation, labels, and notifications.

## Issue Selection

1. Find open issues labeled `content-feedback`.
2. Skip issues labeled `content-feedback-blocked`; these issues are waiting for the reporter to add more information.
3. Pick one issue that has enough information to safely update the knowledge base.
4. Prefer REST commands such as `gh api repos/tcpjq/knowledge/issues/<number>` over `gh issue view` when GitHub CLI GraphQL fields fail.

## Issue Parsing

Read these sections from the issue body:

- `反馈对象`
- `原文`
- `问题说明`
- `期望修改`

Selection feedback may mark the selected text with `==...==` and include surrounding context. Treat `==...==` as the exact focus, not as text to preserve in the Markdown file.

If `问题说明` or `期望修改` still contains template placeholder text, only make a change when the title and selected text make the intended correction unambiguous. Otherwise return `blocked`.

Use `blocked` as "needs more information", not as a permanent rejection. In the `summary`, include exactly what information is missing and what the reporter should add to the current issue body.

## Editing Workflow

1. Read the target Markdown file.
2. Confirm the reported text or surrounding context exists.
3. Make the smallest content change that resolves the feedback.
4. Update local index files only when adding, moving, or renaming notes.
5. Run `cd web && npm run generate` if generated data needs updating.
6. Write `.agent/content-feedback-result.json` as strict JSON.

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
  "summary": "需要补充信息：请在当前 issue 的「问题说明」里说明具体哪里不对，并在「期望修改」里写出希望补充或改成什么。补充后移除 content-feedback-blocked 标签即可重新进入下一轮检测。"
}
```

## Writing Rules

- Keep notes concise and reusable.
- Preserve useful context, examples, and local links.
- Do not save full conversations.
- Do not invent sources.
- Use Chinese for main content unless the note is already English.
- Keep frontmatter stable when editing existing notes.
