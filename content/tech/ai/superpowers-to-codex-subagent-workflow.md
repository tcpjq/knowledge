---
title: Superpowers 到 Codex 的子 agent 编排链路
module: tech
section: ai
tags: [codex, superpowers, agent, workflow]
created: 2026-06-10
updated: 2026-06-10
status: stable
---

# Superpowers 到 Codex 的子 agent 编排链路

## 核心结论

Superpowers 不是子 agent runtime。它主要提供 workflow spec、prompt template 和跨平台工具映射；真正创建、并发执行、等待、继续和关闭子 agent 的能力来自 Codex runtime。

可以把职责分成三层：

```text
Superpowers
  编排规则、prompt 模板、验收流程

主 agent
  解释 Superpowers 规则，并决定何时调用 Codex 工具

Codex runtime
  管理 agent thread 生命周期、并发、状态、通知、approval、sandbox 和工具调用
```

## 背景

Superpowers 的 subagent 工作流常见于两类场景：

- `dispatching-parallel-agents`：把多个独立问题拆给多个子 agent 并行探索或修复。
- `subagent-driven-development`：按计划逐个任务派发 implementer，再派 spec reviewer 和 code quality reviewer 做两阶段验收。

这些 skill 文件本身是 Markdown 说明和 prompt 模板，不是后台调度器。它们告诉主 agent 什么时候派发、怎样写子任务、怎样审查结果，以及什么时候继续或回退。

## 从 Superpowers 到 Codex 的映射

Superpowers 原始说明常用 Claude Code 的 `Task` 表达“派发子 agent”。在 Codex 环境里，工具映射大致是：

```text
Task tool              -> spawn_agent
Multiple Task calls    -> multiple spawn_agent calls
Task returns result    -> wait_agent
Task completes cleanup -> close_agent
TodoWrite              -> update_plan
```

因此，Superpowers 看到“dispatch subagent”时，在 Codex 中实际落到这些 runtime 工具：

- `spawn_agent`：创建一个独立 agent thread，返回 agent id。
- `wait_agent`：等待一个或多个 agent 完成，并返回 final message/status。
- `send_input`：给已有 agent 追加指令，或打断当前任务。
- `close_agent`：关闭已完成或不再需要的 agent thread，释放并发槽。

## 执行链路

一次典型链路是：

```text
用户请求
  -> 主 agent 判断触发 Superpowers skill
  -> 主 agent 读取 workflow 和 prompt template
  -> skill 要求 dispatch subagent
  -> 主 agent 调用 Codex 的 spawn_agent(prompt)
  -> Codex runtime 创建后台 agent thread
  -> 子 agent 独立执行自己的 model/tool loop
  -> 主 agent 调用 wait_agent(agent_id)
  -> Codex runtime 返回子 agent 的结果
  -> 主 agent 根据结果决定接受、追问、修复、复审或关闭
```

这里的“监听”不是 Superpowers 自己开线程监听。更准确地说，Codex runtime 维护 agent id 到状态和结果的映射；主 agent 需要结果时调用 `wait_agent`，由 runtime 挂起等待或返回已完成结果。

## 子 agent 是什么

Codex 文档使用的是 **agent thread** 这个产品抽象。它不是对操作系统 thread/process 的公开承诺。

可以确定的语义是：

- 每个子 agent 有独立的 prompt / message history。
- 每个子 agent 有自己的模型调用循环和工具调用流。
- 子 agent 继承父会话的 sandbox 和 approval policy。
- CLI 中可以通过 `/agent` 查看或切换 active agent threads。
- 多个 agent 可以并行运行，但并行写同一批文件会带来冲突风险。

不能确定的是：

- 一个子 agent 是否对应一个 OS process。
- 一个子 agent 是否对应一个 OS thread。
- CLI、App、Cloud、app-server 是否使用完全相同的底层实现。

稳定可依赖的抽象是 `agent thread`，不是进程或线程模型。

## 回调模型

Codex 的子 agent 结果回传更像异步任务状态机制，而不是传统代码里的 callback function：

```text
spawn_agent -> 返回 agent_id
agent_id -> runtime 内部跟踪 running / completed / failed 等状态
wait_agent(agent_id) -> 查询或等待状态变化
completed -> runtime 把 final message/status 返回给主 agent
```

伪代码可以理解为：

```ts
const child = runtime.spawnAgent({
  parentThreadId,
  prompt,
  agentType: "worker",
  inheritedConfig: {
    cwd,
    sandbox,
    approvals,
    modelDefaults,
    skills,
    mcpServers,
  },
});

scheduler.runInBackground(child);

const result = await runtime.waitAgent({
  targets: [child.id],
  timeoutMs: 300000,
});
```

`scheduler.runInBackground` 内部可能是 async task、worker thread、独立进程、远端 job 或混合实现。公开语义不要求用户知道这一层。

## Superpowers 的价值

Superpowers 的价值不是“实现了子 agent”，而是把子 agent 的使用标准化：

- 什么时候值得拆成子 agent。
- 怎样保证子任务边界清晰。
- 怎样避免主会话被中间日志和探索过程污染。
- 怎样给子 agent 足够上下文，但不继承整段会话噪音。
- 怎样做 spec compliance review 和 code quality review。
- 怎样处理 `DONE`、`DONE_WITH_CONCERNS`、`NEEDS_CONTEXT`、`BLOCKED`。
- 怎样避免多个子 agent 同时改同一批文件。

换句话说：

```text
Codex = execution engine / agent runtime / tool system
Superpowers = orchestration protocol / operating manual / prompt workflow
```

## 实践判断

适合用子 agent 的任务：

- 多个独立问题可以并行探索。
- 多个测试失败属于不同模块。
- 需要一个 reviewer 从新上下文审查实现。
- 需要把 noisy 的日志分析、代码搜索、长文档总结移出主会话。

不适合用子 agent 的任务：

- 根因高度相关，必须整体理解。
- 下一步马上依赖该结果，派发只会增加等待。
- 多个 agent 会写同一批文件。
- 任务边界不清，子 agent 只能猜。

## 关联

- [AI](index.md)
