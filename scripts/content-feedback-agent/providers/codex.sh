#!/usr/bin/env bash
set -euo pipefail

PROMPT_FILE="${1:?Usage: providers/codex.sh <prompt-file>}"

codex exec \
  --sandbox workspace-write \
  --ephemeral \
  -c approval_policy=\"never\" \
  -c sandbox_workspace_write.network_access=true \
  "$(cat "$PROMPT_FILE")"
