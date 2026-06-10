import { writeFile } from 'node:fs/promises';

const [, , outputPath = '.agent/content-feedback-prompt.md'] = process.argv;

const prompt = `使用 $content-feedback-agent 处理当前仓库的一个 content-feedback GitHub Issue。

必须先读取并遵守仓库内的标准 skill：

.agents/skills/content-feedback-agent/SKILL.md

补充约束：
- 当前工作目录就是临时 git worktree。
- 只处理一个 issue。
- 不要 commit、push、创建 PR、关闭 issue 或修改 label。
- 必须写入严格 JSON 结果文件：.agent/content-feedback-result.json
- 如果没有可处理 issue，写入 status=no_issue。
- 如果信息不足，写入 status=blocked，并说明原因。
`;

await writeFile(outputPath, prompt, 'utf8');
