# Content Feedback Agent

The content feedback agent is a personal-server automation for converting `content-feedback` GitHub Issues into Markdown knowledge-base pull requests.

## Architecture

The first version uses a hybrid model:

```text
systemd timer
  -> scripts/content-feedback-agent/run.sh
  -> temporary git worktree
  -> codex exec -C <temporary worktree>
  -> Codex reads .agents/skills/content-feedback-agent/SKILL.md
  -> Codex scans content-feedback issues and edits files
  -> shell runner validates changed paths
  -> npm run generate / test / build
  -> shell runner commits, pushes a branch, creates PR
  -> optional Feishu notification
```

Codex decides which issue is actionable and edits the knowledge content by following the repository skill. The shell runner keeps control of Git operations, PR creation, validation, labels, and notifications.

The canonical skill is:

```text
.agents/skills/content-feedback-agent/SKILL.md
```

The legacy `skills/content-feedback-agent/SKILL.md` path only points to the canonical file. Keep the executable workflow rules in `.agents/skills/...` so Codex CLI, Codex app, and other agent tools can discover the same workflow from the repository.

## Server Environment

Create a local env file on the server:

```bash
mkdir -p ~/.config/knowledge-agent
chmod 700 ~/.config/knowledge-agent
cat > ~/.config/knowledge-agent/env <<'EOF'
REPO_DIR=/home/ubuntu/agents/knowledge
REPO_FULL_NAME=tcpjq/knowledge
AGENT_PROVIDER=codex
WORKTREE_ROOT=/tmp/knowledge-content-feedback-agent
BASE_BRANCH=main
CODEX_BYPASS_SANDBOX=1
FEISHU_WEBHOOK=
EOF
chmod 600 ~/.config/knowledge-agent/env
```

Optional env:

```bash
BLOCKED_LABEL=content-feedback-blocked
```

Issues with `content-feedback-blocked` are skipped by the next scheduled scan. The label means "needs more information"; it is not a permanent rejection. The runner adds this label when an issue cannot be safely handled without human clarification, or when the AI provider exits without a valid result file. After the reporter edits the same issue with clearer `问题说明` and `期望修改`, remove the label so the next scheduled scan can process it again.

`CODEX_BYPASS_SANDBOX=1` is recommended for a personal server when Codex runs inside a systemd service and the host does not allow the nested bubblewrap sandbox to create writable user namespaces. The outer runner still isolates work in a temporary git worktree, validates allowed changed paths, runs verification, and opens a PR instead of merging directly.

Required tools:

```bash
git
gh
node
npm
codex
```

Authenticate GitHub on the server:

```bash
gh auth login
```

Authenticate Codex on the server using your preferred local Codex authentication method. Do not commit Codex auth files or API keys to this repository.

## Manual Run

```bash
cd /home/ubuntu/agents/knowledge
scripts/content-feedback-agent/run.sh
```

The runner creates a temporary worktree under `WORKTREE_ROOT`, asks Codex to process one issue, verifies the result, and opens a PR when there are valid changes.

Temporary worktrees do not contain ignored dependency directories. The runner reuses `web/node_modules` from `REPO_DIR` by symlinking it into each temporary worktree before verification. Install frontend dependencies in the main checkout first:

```bash
cd /home/ubuntu/agents/knowledge/web
npm install
```

## systemd User Timer

Create `~/.config/systemd/user/knowledge-agent.service`:

```ini
[Unit]
Description=Knowledge content feedback agent

[Service]
Type=oneshot
EnvironmentFile=%h/.config/knowledge-agent/env
WorkingDirectory=%h/agents/knowledge
ExecStart=%h/agents/knowledge/scripts/content-feedback-agent/run.sh
TimeoutStartSec=20min
```

Create `~/.config/systemd/user/knowledge-agent.timer`:

```ini
[Unit]
Description=Run knowledge content feedback agent every minute

[Timer]
OnActiveSec=1min
OnUnitActiveSec=1min
AccuracySec=10s
Persistent=true
Unit=knowledge-agent.service

[Install]
WantedBy=timers.target
```

Enable it:

```bash
systemctl --user daemon-reload
systemctl --user enable --now knowledge-agent.timer
```

Run once:

```bash
systemctl --user start knowledge-agent.service
```

Inspect logs:

```bash
journalctl --user -u knowledge-agent.service -f
```

## Safety Boundaries

Allowed changed files:

```text
content/**/*.md
topics/**/*.md
web/src/generated/knowledge-data.ts
```

The runner fails if Codex changes workflows, package metadata, scripts, or other files.

Codex is instructed not to commit, push, create PRs, or close issues. The shell runner performs those actions only after path validation and verification pass.
