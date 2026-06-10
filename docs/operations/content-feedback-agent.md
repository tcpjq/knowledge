# Content Feedback Agent

The content feedback agent is a personal-server automation for converting `content-feedback` GitHub Issues into Markdown knowledge-base pull requests.

## Architecture

The first version uses a hybrid model:

```text
systemd timer
  -> scripts/content-feedback-agent/run.sh
  -> temporary git worktree
  -> Codex scans content-feedback issues and edits files
  -> shell runner validates changed paths
  -> npm run generate / test / build
  -> shell runner commits, pushes a branch, creates PR
  -> optional Feishu notification
```

Codex decides which issue is actionable and edits the knowledge content. The shell runner keeps control of Git operations, PR creation, validation, and notifications.

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
FEISHU_WEBHOOK=
EOF
chmod 600 ~/.config/knowledge-agent/env
```

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
```

Create `~/.config/systemd/user/knowledge-agent.timer`:

```ini
[Unit]
Description=Run knowledge content feedback agent every hour

[Timer]
OnBootSec=5min
OnUnitActiveSec=1h
Persistent=true

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
