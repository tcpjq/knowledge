#!/usr/bin/env bash
set -euo pipefail

AGENT_ENV_FILE="${AGENT_ENV_FILE:-$HOME/.config/knowledge-agent/env}"
if [[ -f "$AGENT_ENV_FILE" ]]; then
  # shellcheck disable=SC1090
  source "$AGENT_ENV_FILE"
fi

REPO_DIR="${REPO_DIR:-$(pwd)}"
REPO_FULL_NAME="${REPO_FULL_NAME:-tcpjq/knowledge}"
AGENT_PROVIDER="${AGENT_PROVIDER:-codex}"
WORKTREE_ROOT="${WORKTREE_ROOT:-/tmp/knowledge-content-feedback-agent}"
BASE_BRANCH="${BASE_BRANCH:-main}"

require_command() {
  command -v "$1" >/dev/null 2>&1 || {
    echo "Missing required command: $1" >&2
    exit 1
  }
}

require_command git
require_command gh
require_command node
require_command npm

if [[ "$AGENT_PROVIDER" == "codex" ]]; then
  require_command codex
fi

cd "$REPO_DIR"
git fetch origin "$BASE_BRANCH"

OPEN_FEEDBACK_COUNT="$(gh issue list --repo "$REPO_FULL_NAME" --label content-feedback --state open --limit 1 --json number --jq 'length')"
if [[ "$OPEN_FEEDBACK_COUNT" == "0" ]]; then
  echo "No open content-feedback issue. Skipping Codex run."
  exit 0
fi

mkdir -p "$WORKTREE_ROOT"
RUN_ID="$(date -u +%Y%m%d%H%M%S)"
WORKTREE_DIR="$WORKTREE_ROOT/run-$RUN_ID"
TEMP_BRANCH="ai/content-feedback-run-$RUN_ID"

cleanup() {
  if [[ -d "$WORKTREE_DIR/.git" || -f "$WORKTREE_DIR/.git" ]]; then
    git -C "$REPO_DIR" worktree remove --force "$WORKTREE_DIR" >/dev/null 2>&1 || true
  fi
  git -C "$REPO_DIR" branch -D "$TEMP_BRANCH" >/dev/null 2>&1 || true
}

trap cleanup EXIT

git worktree add "$WORKTREE_DIR" -b "$TEMP_BRANCH" "origin/$BASE_BRANCH"
cd "$WORKTREE_DIR"

mkdir -p .agent
node "$REPO_DIR/scripts/content-feedback-agent/build-prompt.mjs" .agent/content-feedback-prompt.md

"$REPO_DIR/scripts/content-feedback-agent/providers/$AGENT_PROVIDER.sh" .agent/content-feedback-prompt.md

if [[ ! -f .agent/content-feedback-result.json ]]; then
  echo "Agent did not write .agent/content-feedback-result.json" >&2
  exit 1
fi

RESULT_JSON="$(cat .agent/content-feedback-result.json)"
STATUS="$(node -e "import('./scripts/content-feedback-agent/lib.mjs').then(({parseAgentResult}) => console.log(parseAgentResult(process.argv[1]).status))" "$RESULT_JSON")"

if [[ "$STATUS" == "no_issue" ]]; then
  echo "No content feedback issue to process."
  exit 0
fi

if [[ "$STATUS" == "blocked" ]]; then
  ISSUE_NUMBER="$(node -e "const r=JSON.parse(process.argv[1]); console.log(r.issueNumber || '')" "$RESULT_JSON")"
  SUMMARY="$(node -e "const r=JSON.parse(process.argv[1]); console.log(r.summary || 'Blocked')" "$RESULT_JSON")"
  if [[ -n "$ISSUE_NUMBER" ]]; then
    gh issue comment "$ISSUE_NUMBER" --repo "$REPO_FULL_NAME" --body "AI content feedback agent is blocked: $SUMMARY"
  fi
  exit 0
fi

ISSUE_NUMBER="$(node -e "import('./scripts/content-feedback-agent/lib.mjs').then(({parseAgentResult}) => console.log(parseAgentResult(process.argv[1]).issueNumber))" "$RESULT_JSON")"
SUMMARY="$(node -e "import('./scripts/content-feedback-agent/lib.mjs').then(({parseAgentResult}) => console.log(parseAgentResult(process.argv[1]).summary))" "$RESULT_JSON")"
FINAL_BRANCH="$(node -e "import('./scripts/content-feedback-agent/lib.mjs').then(({buildBranchName}) => console.log(buildBranchName(Number(process.argv[1]))))" "$ISSUE_NUMBER")"

OPEN_PR_COUNT="$(gh pr list --repo "$REPO_FULL_NAME" --head "$FINAL_BRANCH" --state open --json number --jq 'length')"
if [[ "$OPEN_PR_COUNT" != "0" ]]; then
  echo "Open PR already exists for $FINAL_BRANCH"
  exit 0
fi

rm -rf .agent

mapfile -t CHANGED_FILES < <(
  {
    git diff --name-only --diff-filter=ACMR
    git ls-files --others --exclude-standard
  } | sort -u
)

if [[ "${#CHANGED_FILES[@]}" -eq 0 ]]; then
  gh issue comment "$ISSUE_NUMBER" --repo "$REPO_FULL_NAME" --body "AI content feedback agent did not produce file changes."
  exit 0
fi

printf '%s\n' "${CHANGED_FILES[@]}" | node -e "import('./scripts/content-feedback-agent/lib.mjs').then(({assertAllowedChangedFiles}) => { const fs = require('node:fs'); assertAllowedChangedFiles(fs.readFileSync(0, 'utf8').trim().split('\\n').filter(Boolean)); })"

(cd web && npm run generate && npm run test && npm run build)

mapfile -t FINAL_CHANGED_FILES < <(
  {
    git diff --name-only --diff-filter=ACMR
    git ls-files --others --exclude-standard
  } | sort -u
)

printf '%s\n' "${FINAL_CHANGED_FILES[@]}" | node -e "import('./scripts/content-feedback-agent/lib.mjs').then(({assertAllowedChangedFiles}) => { const fs = require('node:fs'); assertAllowedChangedFiles(fs.readFileSync(0, 'utf8').trim().split('\\n').filter(Boolean)); })"

git branch -m "$FINAL_BRANCH"
trap - EXIT

git add "${FINAL_CHANGED_FILES[@]}"
git commit -m "Fix content feedback #$ISSUE_NUMBER"
git push origin "$FINAL_BRANCH"

PR_TITLE="$(node -e "import('./scripts/content-feedback-agent/lib.mjs').then(({buildPrTitle}) => console.log(buildPrTitle(Number(process.argv[1]))))" "$ISSUE_NUMBER")"
PR_BODY="$(node -e "import('./scripts/content-feedback-agent/lib.mjs').then(({buildPrBody}) => console.log(buildPrBody({ issueNumber: Number(process.argv[1]), summary: process.argv[2], verification: ['npm run generate', 'npm run test', 'npm run build'] })))" "$ISSUE_NUMBER" "$SUMMARY")"

PR_URL="$(gh pr create --repo "$REPO_FULL_NAME" --base "$BASE_BRANCH" --head "$FINAL_BRANCH" --title "$PR_TITLE" --body "$PR_BODY")"
gh issue comment "$ISSUE_NUMBER" --repo "$REPO_FULL_NAME" --body "AI content feedback agent opened PR: $PR_URL"

if [[ -n "${FEISHU_WEBHOOK:-}" ]]; then
  node -e "fetch(process.env.FEISHU_WEBHOOK, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ msg_type: 'text', content: { text: 'Knowledge feedback PR created: ' + process.argv[1] } }) })" "$PR_URL"
fi

cd "$REPO_DIR"
git worktree remove --force "$WORKTREE_DIR"
git branch -D "$FINAL_BRANCH" >/dev/null 2>&1 || true

echo "$PR_URL"
