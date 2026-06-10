#!/usr/bin/env bash
set -euo pipefail

PROMPT_FILE="${1:?Usage: providers/codex.sh <prompt-file>}"

if [[ "${CODEX_BYPASS_SANDBOX:-0}" == "1" ]]; then
  codex exec \
    --dangerously-bypass-approvals-and-sandbox \
    -C "$(pwd)" \
    --ephemeral \
    "$(cat "$PROMPT_FILE")"
else
  codex exec \
    --sandbox workspace-write \
    -C "$(pwd)" \
    --ephemeral \
    -c approval_policy=\"never\" \
    -c sandbox_workspace_write.network_access=true \
    "$(cat "$PROMPT_FILE")"
fi
