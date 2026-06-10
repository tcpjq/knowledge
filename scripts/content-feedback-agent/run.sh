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
BLOCKED_LABEL="${BLOCKED_LABEL:-content-feedback-blocked}"
REPO_OWNER="${REPO_FULL_NAME%%/*}"

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

next_feedback_issue_number() {
  gh api -X GET "repos/$REPO_FULL_NAME/issues" \
    -f state=open \
    -f labels=content-feedback \
    -f per_page=20 \
    --jq "map(select(([.labels[].name] | index(\"$BLOCKED_LABEL\")) | not)) | .[0].number // empty"
}

add_issue_label() {
  local issue_number="${1:?issue number required}"
  local label="${2:?label required}"

  gh api -X POST "repos/$REPO_FULL_NAME/issues/$issue_number/labels" \
    -f "labels[]=$label" \
    >/dev/null
}

add_issue_comment() {
  local issue_number="${1:?issue number required}"
  local body="${2:?comment body required}"

  gh api -X POST "repos/$REPO_FULL_NAME/issues/$issue_number/comments" \
    -f "body=$body" \
    >/dev/null
}

open_pr_count_for_branch() {
  local branch="${1:?branch required}"

  gh api -X GET "repos/$REPO_FULL_NAME/pulls" \
    -f state=open \
    -f "head=$REPO_OWNER:$branch" \
    --jq 'length'
}

create_pull_request() {
  local branch="${1:?branch required}"
  local title="${2:?title required}"
  local body="${3:?body required}"

  gh api -X POST "repos/$REPO_FULL_NAME/pulls" \
    -f base="$BASE_BRANCH" \
    -f head="$branch" \
    -f title="$title" \
    -f body="$body" \
    --jq '.html_url'
}

cd "$REPO_DIR"
git fetch origin "$BASE_BRANCH"

gh label create "$BLOCKED_LABEL" \
  --repo "$REPO_FULL_NAME" \
  --color "BFD4F2" \
  --description "Content feedback issue needs human clarification before AI processing" \
  >/dev/null 2>&1 || true

NEXT_FEEDBACK_ISSUE_NUMBER="$(next_feedback_issue_number)"
if [[ -z "$NEXT_FEEDBACK_ISSUE_NUMBER" ]]; then
  echo "No open content-feedback issue. Skipping Codex run."
  exit 0
fi

NEXT_FEEDBACK_BRANCH="$(node -e "import('./scripts/content-feedback-agent/lib.mjs').then(({buildBranchName}) => console.log(buildBranchName(Number(process.argv[1]))))" "$NEXT_FEEDBACK_ISSUE_NUMBER")"
if [[ "$(open_pr_count_for_branch "$NEXT_FEEDBACK_BRANCH")" != "0" ]]; then
  echo "Open PR already exists for $NEXT_FEEDBACK_BRANCH. Skipping Codex run."
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

if [[ -d "$REPO_DIR/web/node_modules" && ! -e "$WORKTREE_DIR/web/node_modules" ]]; then
  ln -s "$REPO_DIR/web/node_modules" "$WORKTREE_DIR/web/node_modules"
fi

if [[ ! -x "$WORKTREE_DIR/web/node_modules/.bin/tsc" ]]; then
  echo "Missing web dependencies in temporary worktree." >&2
  echo "Run npm install in $REPO_DIR/web, or provide $WORKTREE_DIR/web/node_modules before starting the agent." >&2
  exit 1
fi

mkdir -p .agent
node "$REPO_DIR/scripts/content-feedback-agent/build-prompt.mjs" .agent/content-feedback-prompt.md

set +e
"$REPO_DIR/scripts/content-feedback-agent/providers/$AGENT_PROVIDER.sh" .agent/content-feedback-prompt.md
PROVIDER_STATUS=$?
set -e

if [[ ! -f .agent/content-feedback-result.json ]]; then
  ISSUE_NUMBER="$(next_feedback_issue_number)"
  if [[ -n "$ISSUE_NUMBER" ]]; then
    ISSUE_URL="https://github.com/$REPO_FULL_NAME/issues/$ISSUE_NUMBER"
    cat > .agent/content-feedback-result.json <<JSON
{
  "status": "blocked",
  "issueNumber": $ISSUE_NUMBER,
  "issueUrl": "$ISSUE_URL",
  "summary": "Agent provider exited with status $PROVIDER_STATUS and did not write .agent/content-feedback-result.json."
}
JSON
  else
    cat > .agent/content-feedback-result.json <<JSON
{
  "status": "no_issue",
  "summary": "没有找到可处理的 content-feedback issue"
}
JSON
  fi
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
    add_issue_label "$ISSUE_NUMBER" "$BLOCKED_LABEL" || true
    add_issue_comment "$ISSUE_NUMBER" "$(cat <<COMMENT
AI content feedback agent needs more information before it can safely update the knowledge base.

$SUMMARY

请直接编辑当前 issue，补充：

- 「问题说明」：具体哪里缺失、不准确、过时或表达不清。
- 「期望修改」：希望补充什么内容，或希望把原文改成什么。

补充完成后，请移除 \`$BLOCKED_LABEL\` 标签。下一轮定时检测会重新处理这个 issue。
COMMENT
)"
  fi
  exit 0
fi

ISSUE_NUMBER="$(node -e "import('./scripts/content-feedback-agent/lib.mjs').then(({parseAgentResult}) => console.log(parseAgentResult(process.argv[1]).issueNumber))" "$RESULT_JSON")"
SUMMARY="$(node -e "import('./scripts/content-feedback-agent/lib.mjs').then(({parseAgentResult}) => console.log(parseAgentResult(process.argv[1]).summary))" "$RESULT_JSON")"
FINAL_BRANCH="$(node -e "import('./scripts/content-feedback-agent/lib.mjs').then(({buildBranchName}) => console.log(buildBranchName(Number(process.argv[1]))))" "$ISSUE_NUMBER")"

OPEN_PR_COUNT="$(open_pr_count_for_branch "$FINAL_BRANCH")"
if [[ "$OPEN_PR_COUNT" != "0" ]]; then
  echo "Open PR already exists for $FINAL_BRANCH"
  exit 0
fi

rm -rf .agent

mapfile -t CHANGED_FILES < <(
  {
    git diff --name-only --diff-filter=ACMR
    git ls-files --others --exclude-standard
  } | sort -u | grep -vx 'web/node_modules' || true
)

if [[ "${#CHANGED_FILES[@]}" -eq 0 ]]; then
  add_issue_comment "$ISSUE_NUMBER" "AI content feedback agent did not produce file changes."
  exit 0
fi

printf '%s\n' "${CHANGED_FILES[@]}" | node -e "import('./scripts/content-feedback-agent/lib.mjs').then(({assertAllowedChangedFiles}) => { const fs = require('node:fs'); assertAllowedChangedFiles(fs.readFileSync(0, 'utf8').trim().split('\\n').filter(Boolean)); })"

(cd web && npm run generate && npm run test && npm run build)

mapfile -t FINAL_CHANGED_FILES < <(
  {
    git diff --name-only --diff-filter=ACMR
    git ls-files --others --exclude-standard
  } | sort -u | grep -vx 'web/node_modules' || true
)

printf '%s\n' "${FINAL_CHANGED_FILES[@]}" | node -e "import('./scripts/content-feedback-agent/lib.mjs').then(({assertAllowedChangedFiles}) => { const fs = require('node:fs'); assertAllowedChangedFiles(fs.readFileSync(0, 'utf8').trim().split('\\n').filter(Boolean)); })"

git branch -m "$FINAL_BRANCH"
trap - EXIT

git add "${FINAL_CHANGED_FILES[@]}"
git commit -m "Fix content feedback #$ISSUE_NUMBER"
git push origin "$FINAL_BRANCH"

PR_TITLE="$(node -e "import('./scripts/content-feedback-agent/lib.mjs').then(({buildPrTitle}) => console.log(buildPrTitle(Number(process.argv[1]))))" "$ISSUE_NUMBER")"
PR_BODY="$(node -e "import('./scripts/content-feedback-agent/lib.mjs').then(({buildPrBody}) => console.log(buildPrBody({ issueNumber: Number(process.argv[1]), summary: process.argv[2], verification: ['npm run generate', 'npm run test', 'npm run build'] })))" "$ISSUE_NUMBER" "$SUMMARY")"

PR_URL="$(create_pull_request "$FINAL_BRANCH" "$PR_TITLE" "$PR_BODY")"
add_issue_comment "$ISSUE_NUMBER" "AI content feedback agent opened PR: $PR_URL"

if [[ -n "${FEISHU_WEBHOOK:-}" ]]; then
  node -e "fetch(process.env.FEISHU_WEBHOOK, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ msg_type: 'text', content: { text: 'Knowledge feedback PR created: ' + process.argv[1] } }) })" "$PR_URL"
fi

cd "$REPO_DIR"
git worktree remove --force "$WORKTREE_DIR"
git branch -D "$FINAL_BRANCH" >/dev/null 2>&1 || true

echo "$PR_URL"
