import { writeFile } from 'node:fs/promises';

const [, , outputPath = '.agent/content-feedback-prompt.md'] = process.argv;

const prompt = `你是知识库内容反馈修复 agent。

任务目标：
1. 使用 GitHub CLI 检查仓库 tcpjq/knowledge 中 label=content-feedback 的 open issues。
2. 选择一个还没有被明显处理的 issue。
3. 根据 issue 中的文档路径、原文、问题说明和期望修改，更新 Markdown 知识库。
4. 必要时更新对应 index.md。
5. 如果内容变化影响网页数据，可以运行 \`cd web && npm run generate\`。
6. 写入结果文件 \`.agent/content-feedback-result.json\`。

硬性限制：
- 不要 commit。
- 不要 push。
- 不要创建 PR。
- 不要关闭 issue。
- 不要修改 .github/workflows/**。
- 不要修改 package.json 或 package-lock.json。
- 不要修改 secrets、环境变量或本脚本目录。
- 允许修改的文件只有：
  - content/**/*.md
  - topics/**/*.md
  - web/src/generated/knowledge-data.ts

处理规则：
- 每次只处理一个 issue。
- 如果没有可处理 issue，写入 status=no_issue。
- 如果 issue 信息不足，写入 status=blocked，并在 summary 里说明原因。
- 保持文章风格简洁，不保存完整对话记录。
- 每篇笔记只聚焦一个清晰知识单元。
- 新增笔记时更新对应章节 index.md。

结果文件必须是严格 JSON，不要带 Markdown 代码块：

{
  "status": "changed",
  "issueNumber": 123,
  "issueUrl": "https://github.com/tcpjq/knowledge/issues/123",
  "summary": "说明改了什么以及为什么"
}

无可处理 issue 时：

{
  "status": "no_issue",
  "summary": "没有找到可处理的 content-feedback issue"
}

信息不足或无法安全处理时：

{
  "status": "blocked",
  "issueNumber": 123,
  "issueUrl": "https://github.com/tcpjq/knowledge/issues/123",
  "summary": "说明阻塞原因"
}
`;

await writeFile(outputPath, prompt, 'utf8');
