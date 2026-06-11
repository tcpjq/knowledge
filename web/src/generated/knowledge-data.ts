export type Heading = {
  level: number;
  text: string;
  slug: string;
};

export type KnowledgeDoc = {
  id: string;
  title: string;
  path: string;
  module: string;
  moduleLabel: string;
  section: string;
  sectionLabel: string;
  tags: string[];
  headings: Heading[];
  body: string;
  searchText: string;
};

export type KnowledgeSection = {
  id: string;
  label: string;
  docs: string[];
};

export type KnowledgeModule = {
  id: string;
  label: string;
  description: string;
  sections: KnowledgeSection[];
};

export type KnowledgeChunk = {
  id: string;
  docId: string;
  heading: string;
  text: string;
  searchText: string;
};

export const knowledgeDocs: KnowledgeDoc[] = [
  {
    "id": "content/communication/anxiety-to-action-narrative",
    "title": "焦虑转行动的叙事框架",
    "path": "content/communication/anxiety-to-action-narrative.md",
    "module": "communication",
    "moduleLabel": "沟通",
    "section": "general",
    "sectionLabel": "通用",
    "tags": [
      "anxiety",
      "self-narrative",
      "action"
    ],
    "headings": [
      {
        "level": 1,
        "text": "焦虑转行动的叙事框架",
        "slug": "焦虑转行动的叙事框架"
      },
      {
        "level": 2,
        "text": "核心结论",
        "slug": "核心结论"
      },
      {
        "level": 2,
        "text": "背景",
        "slug": "背景"
      },
      {
        "level": 2,
        "text": "叙事切换",
        "slug": "叙事切换"
      },
      {
        "level": 3,
        "text": "时间叙事",
        "slug": "时间叙事"
      },
      {
        "level": 3,
        "text": "能量叙事",
        "slug": "能量叙事"
      },
      {
        "level": 3,
        "text": "行动叙事",
        "slug": "行动叙事"
      },
      {
        "level": 3,
        "text": "旁观者叙事",
        "slug": "旁观者叙事"
      },
      {
        "level": 3,
        "text": "成本叙事",
        "slug": "成本叙事"
      },
      {
        "level": 3,
        "text": "降损叙事",
        "slug": "降损叙事"
      },
      {
        "level": 2,
        "text": "可直接使用的自我对话",
        "slug": "可直接使用的自我对话"
      },
      {
        "level": 2,
        "text": "例子",
        "slug": "例子"
      },
      {
        "level": 2,
        "text": "使用边界",
        "slug": "使用边界"
      },
      {
        "level": 2,
        "text": "关联",
        "slug": "关联"
      }
    ],
    "body": "\n# 焦虑转行动的叙事框架\n\n## 核心结论\n\n焦虑不一定要先被消灭，才可以开始行动。更实用的叙事是：焦虑可以存在，但它必须服务于行动；如果它不能给出下一步，就不能占用全部注意力。\n\n关键不是“我能不能立刻平静”，而是“在焦虑存在的情况下，我还能不能推进一小步”。\n\n## 背景\n\n焦虑常常让人误以为自己正在处理问题，但很多时候只是在反复模拟风险。时间不会因为焦虑而暂停：焦虑，时间会过去；不焦虑，时间也会过去。\n\n因此，注意力应从“如何完全不焦虑”转向“如何让这段时间留下行动痕迹”。\n\n## 叙事切换\n\n### 时间叙事\n\n旧叙事：\n\n> 我现在状态不好，等不焦虑了再开始。\n\n新叙事：\n\n> 时间无论如何都会过去。我无法阻止时间流逝，但可以决定这段时间留下什么痕迹。\n\n这个叙事把目标从“先恢复完美状态”改成“带着不安推进一点点”。\n\n### 能量叙事\n\n旧叙事：\n\n> 焦虑说明我不行。\n\n新叙事：\n\n> 焦虑说明我在乎某件事。它是一股没有找到出口的行动能量。\n\n可以追问：\n\n- 这个焦虑想让我保护什么？\n- 它在提醒我哪件事不能再拖？\n- 我能把它转成哪个 10 分钟动作？\n\n### 行动叙事\n\n旧叙事：\n\n> 我得先把心情调整好，才能工作。\n\n新叙事：\n\n> 行动不是好心情的结果，行动也是重建心情的手段。\n\n焦虑时不需要先完成全局任务，只需要启动一个小到无法拒绝的动作。\n\n### 旁观者叙事\n\n旧叙事：\n\n> 我很焦虑。\n\n新叙事：\n\n> 我注意到，身体里正在出现焦虑。大脑正在预测危险。这是一个信号，不是命令。\n\n这个改写能把自己从情绪中抽离出来。焦虑可以被看见，但不必由它来做决定。\n\n### 成本叙事\n\n旧叙事：\n\n> 我得继续想清楚，否则不安全。\n\n新叙事：\n\n> 焦虑如果不能帮我决策、完成任务或给出下一步，就不能继续占用全部注意力。\n\n焦虑可以提醒风险，但不能替代行动。否则它只是在消耗注意力。\n\n### 降损叙事\n\n旧叙事：\n\n> 今天必须彻底振作、彻底高效。\n\n新叙事：\n\n> 今天不需要完美翻盘，只需要不要把局面交给惯性。\n\n焦虑强的时候，目标可以降到：\n\n- 做 20 分钟。\n- 写 100 字。\n- 处理 1 个最小任务。\n- 发出一个粗糙版本。\n- 把问题列清楚。\n\n## 可直接使用的自我对话\n\n> 我现在焦虑，说明我在乎。  \n> 但焦虑不是行动本身。  \n> 时间无论如何都会过去。  \n> 我不要求自己马上平静，只要求自己做一个 10 分钟动作。  \n> 做完以后，再重新判断。\n\n## 例子\n\n- 焦虑“工作做不完”：列出今天唯一最重要的一件事，然后只做第一个 10 分钟动作。\n- 焦虑“别人评价我”：先发出一个不完美版本，把反馈变成下一轮输入。\n- 焦虑“未来不确定”：设计一个可逆的小实验，而不是试图一次想出终局答案。\n\n## 使用边界\n\n这套框架适合处理日常焦虑、拖延和工作状态波动。如果焦虑持续影响睡眠、饮食、工作、人际关系，或出现自伤念头，应优先寻求专业帮助。\n\n## 关联\n\n- [高效参与方案评审](effective-participation-in-design-review.md)\n",
    "searchText": "焦虑转行动的叙事框架 content/communication/anxiety-to-action-narrative.md 沟通 通用 anxiety self-narrative action 焦虑转行动的叙事框架 核心结论 焦虑不一定要先被消灭，才可以开始行动。更实用的叙事是：焦虑可以存在，但它必须服务于行动；如果它不能给出下一步，就不能占用全部注意力。 关键不是“我能不能立刻平静”，而是“在焦虑存在的情况下，我还能不能推进一小步”。 背景 焦虑常常让人误以为自己正在处理问题，但很多时候只是在反复模拟风险。时间不会因为焦虑而暂停：焦虑，时间会过去；不焦虑，时间也会过去。 因此，注意力应从“如何完全不焦虑”转向“如何让这段时间留下行动痕迹”。 叙事切换 时间叙事 旧叙事： 我现在状态不好，等不焦虑了再开始。 新叙事： 时间无论如何都会过去。我无法阻止时间流逝，但可以决定这段时间留下什么痕迹。 这个叙事把目标从“先恢复完美状态”改成“带着不安推进一点点”。 能量叙事 旧叙事： 焦虑说明我不行。 新叙事： 焦虑说明我在乎某件事。它是一股没有找到出口的行动能量。 可以追问： - 这个焦虑想让我保护什么？ - 它在提醒我哪件事不能再拖？ - 我能把它转成哪个 10 分钟动作？ 行动叙事 旧叙事： 我得先把心情调整好，才能工作。 新叙事： 行动不是好心情的结果，行动也是重建心情的手段。 焦虑时不需要先完成全局任务，只需要启动一个小到无法拒绝的动作。 旁观者叙事 旧叙事： 我很焦虑。 新叙事： 我注意到，身体里正在出现焦虑。大脑正在预测危险。这是一个信号，不是命令。 这个改写能把自己从情绪中抽离出来。焦虑可以被看见，但不必由它来做决定。 成本叙事 旧叙事： 我得继续想清楚，否则不安全。 新叙事： 焦虑如果不能帮我决策、完成任务或给出下一步，就不能继续占用全部注意力。 焦虑可以提醒风险，但不能替代行动。否则它只是在消耗注意力。 降损叙事 旧叙事： 今天必须彻底振作、彻底高效。 新叙事： 今天不需要完美翻盘，只需要不要把局面交给惯性。 焦虑强的时候，目标可以降到： - 做 20 分钟。 - 写 100 字。 - 处理 1 个最小任务。 - 发出一个粗糙版本。 - 把问题列清楚。 可直接使用的自我对话 我现在焦虑，说明我在乎。 但焦虑不是行动本身。 时间无论如何都会过去。 我不要求自己马上平静，只要求自己做一个 10 分钟动作。 做完以后，再重新判断。 例子 - 焦虑“工作做不完”：列出今天唯一最重要的一件事，然后只做第一个 10 分钟动作。 - 焦虑“别人评价我”：先发出一个不完美版本，把反馈变成下一轮输入。 - 焦虑“未来不确定”：设计一个可逆的小实验，而不是试图一次想出终局答案。 使用边界 这套框架适合处理日常焦虑、拖延和工作状态波动。如果焦虑持续影响睡眠、饮食、工作、人际关系，或出现自伤念头，应优先寻求专业帮助。 关联 - 高效参与方案评审"
  },
  {
    "id": "content/communication/effective-participation-in-design-review",
    "title": "高效参与方案评审",
    "path": "content/communication/effective-participation-in-design-review.md",
    "module": "communication",
    "moduleLabel": "沟通",
    "section": "general",
    "sectionLabel": "通用",
    "tags": [
      "会议",
      "方案评审",
      "表达",
      "协作"
    ],
    "headings": [
      {
        "level": 1,
        "text": "高效参与方案评审",
        "slug": "高效参与方案评审"
      },
      {
        "level": 2,
        "text": "核心结论",
        "slug": "核心结论"
      },
      {
        "level": 2,
        "text": "背景",
        "slug": "背景"
      },
      {
        "level": 2,
        "text": "跟不上细节时怎么办",
        "slug": "跟不上细节时怎么办"
      },
      {
        "level": 2,
        "text": "主干问题和枝节问题",
        "slug": "主干问题和枝节问题"
      },
      {
        "level": 2,
        "text": "当场想不清楚时怎么表达",
        "slug": "当场想不清楚时怎么表达"
      },
      {
        "level": 2,
        "text": "表达观点的结构",
        "slug": "表达观点的结构"
      },
      {
        "level": 2,
        "text": "更强的表达方式",
        "slug": "更强的表达方式"
      },
      {
        "level": 2,
        "text": "会议中的最低参与框架",
        "slug": "会议中的最低参与框架"
      },
      {
        "level": 2,
        "text": "关联",
        "slug": "关联"
      }
    ],
    "body": "\n# 高效参与方案评审\n\n## 核心结论\n\n方案评审里，目标不是当场理解每一个细节，而是持续抓住主线：目标、约束、关键假设、方案取舍、风险和下一步行动。\n\n如果因为一个细节没跟上而断开，要先判断它是主干问题还是枝节问题。主干问题当场问，枝节问题先标记，避免整场会议掉线。\n\n## 背景\n\n方案评审通常同时消耗三类能力：\n\n- 理解方案本身的技术或业务细节。\n- 跟上别人从前提到结论的推理链。\n- 在有限时间内形成自己的判断并表达出来。\n\n当会议连续发生、眼睛疲劳或大脑已经过载时，很容易因为一个细节没懂，导致后续讨论全部断开。\n\n## 跟不上细节时怎么办\n\n先判断这个细节是否影响后续判断。\n\n如果它影响主线，要当场提问。提问不等于暴露无知，真正的风险是会议结束后大家以为已经达成共识，但关键前提其实没有对齐。\n\n适合当场问的问题：\n\n```text\n我这里想对齐一下前提：刚才这个判断是基于 A，还是基于 B？\n\n我可能漏了一步，能不能帮我把 X 到 Y 的推导再串一下？\n\n这个点会影响后面的方案选择，我想确认一下：我们为什么排除 Z？\n\n我先复述一下我的理解：你是说因为 X，所以选择 Y，而不是 Z，对吗？\n```\n\n如果它不影响主线，先快速标记，会议后再补。\n\n```text\n待补：为什么这里用 X，不用 Y？\n```\n\n会议现场优先保住主线，不要被一个枝节拖走。\n\n## 主干问题和枝节问题\n\n主干问题通常包括：\n\n- 这个方案解决的到底是什么问题？\n- 当前有哪些关键约束？\n- 方案依赖哪些关键假设？\n- 为什么选择这个方案，而不是其他方案？\n- 最大风险是什么？\n- 谁在什么时候做什么？\n\n枝节问题通常包括：\n\n- 某个局部实现细节。\n- 某个术语或历史背景。\n- 某个暂时不影响结论的数据口径。\n- 某个可以会后单独查证的问题。\n\n只要主干问题没有断，即使部分细节没完全跟上，也仍然可以有效参与。\n\n## 当场想不清楚时怎么表达\n\n不需要强行给出立刻成熟的结论，可以表达自己的判断框架和当前卡点。\n\n```text\n这个点我现在还不能直接判断好坏，但我会从三个维度看：成本、风险、后续扩展性。现在我比较担心的是风险这一项。\n\n我还需要再想一下，但直觉上这里有个假设需要验证：X 是否一定成立。\n\n我现在不反对这个方向，但需要补一个验证点：如果 X 不成立，方案 Y 的兜底是什么？\n```\n\n成熟的表达不是永远立刻有结论，而是能说清楚自己卡在哪里、需要什么信息才能判断。\n\n## 表达观点的结构\n\n表达观点时，使用“结论、原因、风险、建议”的结构。\n\n```text\n结论：我倾向于 A。\n原因：因为 X 和 Y。\n风险：但这里有一个风险 Z。\n建议：所以我建议先做 B 验证，或补充 C 数据，或把 D 作为兜底。\n```\n\n示例：\n\n```text\n我倾向于先选方案 A。原因是它改动范围小，而且能更快验证核心假设。\n但风险是后面如果流量上来，扩展性可能不够。\n所以我建议这版先用 A，同时把扩展点预留出来，并约一个数据阈值，超过之后再切到 B。\n```\n\n这个结构的好处是：有立场、有依据、有风险意识，也有下一步。\n\n## 更强的表达方式\n\n少说抽象感受，多说判断依据。\n\n弱表达：\n\n```text\n我感觉这个方案不太好。\n```\n\n强表达：\n\n```text\n我担心这个方案的主要问题不是功能，而是回滚成本。\n因为它同时改了 A 和 B，一旦线上出问题，很难快速定位。\n```\n\n弱表达：\n\n```text\n我没太听懂。\n```\n\n强表达：\n\n```text\n我卡在这个前提上：如果 X 不成立，后面的 Y 方案是不是就不成立？\n```\n\n## 会议中的最低参与框架\n\n方案评审时只要持续盯住 5 个问题，就不容易掉线：\n\n1. 这个方案解决的到底是什么问题？\n2. 有哪些关键假设？\n3. 为什么选它，不选别的？\n4. 最大风险是什么？\n5. 谁在什么时候做什么？\n\n如果会议后只能留下这 5 个问题的答案，也已经抓住了评审的核心。\n\n## 关联\n\n- [AI 时代技术能力地图](../../topics/ai-era-technical-capability-map.md)\n",
    "searchText": "高效参与方案评审 content/communication/effective-participation-in-design-review.md 沟通 通用 会议 方案评审 表达 协作 高效参与方案评审 核心结论 方案评审里，目标不是当场理解每一个细节，而是持续抓住主线：目标、约束、关键假设、方案取舍、风险和下一步行动。 如果因为一个细节没跟上而断开，要先判断它是主干问题还是枝节问题。主干问题当场问，枝节问题先标记，避免整场会议掉线。 背景 方案评审通常同时消耗三类能力： - 理解方案本身的技术或业务细节。 - 跟上别人从前提到结论的推理链。 - 在有限时间内形成自己的判断并表达出来。 当会议连续发生、眼睛疲劳或大脑已经过载时，很容易因为一个细节没懂，导致后续讨论全部断开。 跟不上细节时怎么办 先判断这个细节是否影响后续判断。 如果它影响主线，要当场提问。提问不等于暴露无知，真正的风险是会议结束后大家以为已经达成共识，但关键前提其实没有对齐。 适合当场问的问题： 如果它不影响主线，先快速标记，会议后再补。 会议现场优先保住主线，不要被一个枝节拖走。 主干问题和枝节问题 主干问题通常包括： - 这个方案解决的到底是什么问题？ - 当前有哪些关键约束？ - 方案依赖哪些关键假设？ - 为什么选择这个方案，而不是其他方案？ - 最大风险是什么？ - 谁在什么时候做什么？ 枝节问题通常包括： - 某个局部实现细节。 - 某个术语或历史背景。 - 某个暂时不影响结论的数据口径。 - 某个可以会后单独查证的问题。 只要主干问题没有断，即使部分细节没完全跟上，也仍然可以有效参与。 当场想不清楚时怎么表达 不需要强行给出立刻成熟的结论，可以表达自己的判断框架和当前卡点。 成熟的表达不是永远立刻有结论，而是能说清楚自己卡在哪里、需要什么信息才能判断。 表达观点的结构 表达观点时，使用“结论、原因、风险、建议”的结构。 示例： 这个结构的好处是：有立场、有依据、有风险意识，也有下一步。 更强的表达方式 少说抽象感受，多说判断依据。 弱表达： 强表达： 弱表达： 强表达： 会议中的最低参与框架 方案评审时只要持续盯住 5 个问题，就不容易掉线： 1. 这个方案解决的到底是什么问题？ 2. 有哪些关键假设？ 3. 为什么选它，不选别的？ 4. 最大风险是什么？ 5. 谁在什么时候做什么？ 如果会议后只能留下这 5 个问题的答案，也已经抓住了评审的核心。 关联 - ai 时代技术能力地图"
  },
  {
    "id": "content/communication/index",
    "title": "沟通",
    "path": "content/communication/index.md",
    "module": "communication",
    "moduleLabel": "沟通",
    "section": "root",
    "sectionLabel": "概览",
    "tags": [],
    "headings": [
      {
        "level": 1,
        "text": "沟通",
        "slug": "沟通"
      },
      {
        "level": 2,
        "text": "会议",
        "slug": "会议"
      },
      {
        "level": 2,
        "text": "章节",
        "slug": "章节"
      }
    ],
    "body": "# 沟通\n\n沟通模块用于沉淀表达、写作、会议、反馈、谈判、协作和关系处理。\n\n## 会议\n\n- [高效参与方案评审](effective-participation-in-design-review.md)\n\n## 章节\n\n暂无更多章节。\n",
    "searchText": "沟通 content/communication/index.md 沟通 概览 沟通 沟通模块用于沉淀表达、写作、会议、反馈、谈判、协作和关系处理。 会议 - 高效参与方案评审 章节 暂无更多章节。"
  },
  {
    "id": "content/general/anxiety-to-action-narrative",
    "title": "焦虑转行动的叙事框架",
    "path": "content/general/anxiety-to-action-narrative.md",
    "module": "general",
    "moduleLabel": "通用",
    "section": "general",
    "sectionLabel": "通用",
    "tags": [
      "anxiety",
      "self-narrative",
      "action"
    ],
    "headings": [
      {
        "level": 1,
        "text": "焦虑转行动的叙事框架",
        "slug": "焦虑转行动的叙事框架"
      },
      {
        "level": 2,
        "text": "核心结论",
        "slug": "核心结论"
      },
      {
        "level": 2,
        "text": "背景",
        "slug": "背景"
      },
      {
        "level": 2,
        "text": "叙事切换",
        "slug": "叙事切换"
      },
      {
        "level": 3,
        "text": "时间叙事",
        "slug": "时间叙事"
      },
      {
        "level": 3,
        "text": "能量叙事",
        "slug": "能量叙事"
      },
      {
        "level": 3,
        "text": "行动叙事",
        "slug": "行动叙事"
      },
      {
        "level": 3,
        "text": "旁观者叙事",
        "slug": "旁观者叙事"
      },
      {
        "level": 3,
        "text": "成本叙事",
        "slug": "成本叙事"
      },
      {
        "level": 3,
        "text": "降损叙事",
        "slug": "降损叙事"
      },
      {
        "level": 2,
        "text": "可直接使用的自我对话",
        "slug": "可直接使用的自我对话"
      },
      {
        "level": 2,
        "text": "例子",
        "slug": "例子"
      },
      {
        "level": 2,
        "text": "使用边界",
        "slug": "使用边界"
      },
      {
        "level": 2,
        "text": "关联",
        "slug": "关联"
      }
    ],
    "body": "\n# 焦虑转行动的叙事框架\n\n## 核心结论\n\n焦虑不一定要先被消灭，才可以开始行动。更实用的叙事是：焦虑可以存在，但它必须服务于行动；如果它不能给出下一步，就不能占用全部注意力。\n\n关键不是“我能不能立刻平静”，而是“在焦虑存在的情况下，我还能不能推进一小步”。\n\n## 背景\n\n焦虑常常让人误以为自己正在处理问题，但很多时候只是在反复模拟风险。时间不会因为焦虑而暂停：焦虑，时间会过去；不焦虑，时间也会过去。\n\n因此，注意力应从“如何完全不焦虑”转向“如何让这段时间留下行动痕迹”。\n\n## 叙事切换\n\n### 时间叙事\n\n旧叙事：\n\n> 我现在状态不好，等不焦虑了再开始。\n\n新叙事：\n\n> 时间无论如何都会过去。我无法阻止时间流逝，但可以决定这段时间留下什么痕迹。\n\n这个叙事把目标从“先恢复完美状态”改成“带着不安推进一点点”。\n\n### 能量叙事\n\n旧叙事：\n\n> 焦虑说明我不行。\n\n新叙事：\n\n> 焦虑说明我在乎某件事。它是一股没有找到出口的行动能量。\n\n可以追问：\n\n- 这个焦虑想让我保护什么？\n- 它在提醒我哪件事不能再拖？\n- 我能把它转成哪个 10 分钟动作？\n\n### 行动叙事\n\n旧叙事：\n\n> 我得先把心情调整好，才能工作。\n\n新叙事：\n\n> 行动不是好心情的结果，行动也是重建心情的手段。\n\n焦虑时不需要先完成全局任务，只需要启动一个小到无法拒绝的动作。\n\n### 旁观者叙事\n\n旧叙事：\n\n> 我很焦虑。\n\n新叙事：\n\n> 我注意到，身体里正在出现焦虑。大脑正在预测危险。这是一个信号，不是命令。\n\n这个改写能把自己从情绪中抽离出来。焦虑可以被看见，但不必由它来做决定。\n\n### 成本叙事\n\n旧叙事：\n\n> 我得继续想清楚，否则不安全。\n\n新叙事：\n\n> 焦虑如果不能帮我决策、完成任务或给出下一步，就不能继续占用全部注意力。\n\n焦虑可以提醒风险，但不能替代行动。否则它只是在消耗注意力。\n\n### 降损叙事\n\n旧叙事：\n\n> 今天必须彻底振作、彻底高效。\n\n新叙事：\n\n> 今天不需要完美翻盘，只需要不要把局面交给惯性。\n\n焦虑强的时候，目标可以降到：\n\n- 做 20 分钟。\n- 写 100 字。\n- 处理 1 个最小任务。\n- 发出一个粗糙版本。\n- 把问题列清楚。\n\n## 可直接使用的自我对话\n\n> 我现在焦虑，说明我在乎。  \n> 但焦虑不是行动本身。  \n> 时间无论如何都会过去。  \n> 我不要求自己马上平静，只要求自己做一个 10 分钟动作。  \n> 做完以后，再重新判断。\n\n## 例子\n\n- 焦虑“工作做不完”：列出今天唯一最重要的一件事，然后只做第一个 10 分钟动作。\n- 焦虑“别人评价我”：先发出一个不完美版本，把反馈变成下一轮输入。\n- 焦虑“未来不确定”：设计一个可逆的小实验，而不是试图一次想出终局答案。\n\n## 使用边界\n\n这套框架适合处理日常焦虑、拖延和工作状态波动。如果焦虑持续影响睡眠、饮食、工作、人际关系，或出现自伤念头，应优先寻求专业帮助。\n\n## 关联\n\n- [高效参与方案评审](../communication/effective-participation-in-design-review.md)\n",
    "searchText": "焦虑转行动的叙事框架 content/general/anxiety-to-action-narrative.md 通用 通用 anxiety self-narrative action 焦虑转行动的叙事框架 核心结论 焦虑不一定要先被消灭，才可以开始行动。更实用的叙事是：焦虑可以存在，但它必须服务于行动；如果它不能给出下一步，就不能占用全部注意力。 关键不是“我能不能立刻平静”，而是“在焦虑存在的情况下，我还能不能推进一小步”。 背景 焦虑常常让人误以为自己正在处理问题，但很多时候只是在反复模拟风险。时间不会因为焦虑而暂停：焦虑，时间会过去；不焦虑，时间也会过去。 因此，注意力应从“如何完全不焦虑”转向“如何让这段时间留下行动痕迹”。 叙事切换 时间叙事 旧叙事： 我现在状态不好，等不焦虑了再开始。 新叙事： 时间无论如何都会过去。我无法阻止时间流逝，但可以决定这段时间留下什么痕迹。 这个叙事把目标从“先恢复完美状态”改成“带着不安推进一点点”。 能量叙事 旧叙事： 焦虑说明我不行。 新叙事： 焦虑说明我在乎某件事。它是一股没有找到出口的行动能量。 可以追问： - 这个焦虑想让我保护什么？ - 它在提醒我哪件事不能再拖？ - 我能把它转成哪个 10 分钟动作？ 行动叙事 旧叙事： 我得先把心情调整好，才能工作。 新叙事： 行动不是好心情的结果，行动也是重建心情的手段。 焦虑时不需要先完成全局任务，只需要启动一个小到无法拒绝的动作。 旁观者叙事 旧叙事： 我很焦虑。 新叙事： 我注意到，身体里正在出现焦虑。大脑正在预测危险。这是一个信号，不是命令。 这个改写能把自己从情绪中抽离出来。焦虑可以被看见，但不必由它来做决定。 成本叙事 旧叙事： 我得继续想清楚，否则不安全。 新叙事： 焦虑如果不能帮我决策、完成任务或给出下一步，就不能继续占用全部注意力。 焦虑可以提醒风险，但不能替代行动。否则它只是在消耗注意力。 降损叙事 旧叙事： 今天必须彻底振作、彻底高效。 新叙事： 今天不需要完美翻盘，只需要不要把局面交给惯性。 焦虑强的时候，目标可以降到： - 做 20 分钟。 - 写 100 字。 - 处理 1 个最小任务。 - 发出一个粗糙版本。 - 把问题列清楚。 可直接使用的自我对话 我现在焦虑，说明我在乎。 但焦虑不是行动本身。 时间无论如何都会过去。 我不要求自己马上平静，只要求自己做一个 10 分钟动作。 做完以后，再重新判断。 例子 - 焦虑“工作做不完”：列出今天唯一最重要的一件事，然后只做第一个 10 分钟动作。 - 焦虑“别人评价我”：先发出一个不完美版本，把反馈变成下一轮输入。 - 焦虑“未来不确定”：设计一个可逆的小实验，而不是试图一次想出终局答案。 使用边界 这套框架适合处理日常焦虑、拖延和工作状态波动。如果焦虑持续影响睡眠、饮食、工作、人际关系，或出现自伤念头，应优先寻求专业帮助。 关联 - 高效参与方案评审"
  },
  {
    "id": "content/general/index",
    "title": "通用",
    "path": "content/general/index.md",
    "module": "general",
    "moduleLabel": "通用",
    "section": "root",
    "sectionLabel": "概览",
    "tags": [],
    "headings": [
      {
        "level": 1,
        "text": "通用",
        "slug": "通用"
      },
      {
        "level": 2,
        "text": "自我管理",
        "slug": "自我管理"
      },
      {
        "level": 2,
        "text": "章节",
        "slug": "章节"
      }
    ],
    "body": "# 通用\n\n通用模块用于沉淀暂不归入专业模块、但可复用的个人管理、思维框架和日常实践。\n\n## 自我管理\n\n- [焦虑转行动的叙事框架](anxiety-to-action-narrative.md)\n\n## 章节\n\n暂无更多章节。\n",
    "searchText": "通用 content/general/index.md 通用 概览 通用 通用模块用于沉淀暂不归入专业模块、但可复用的个人管理、思维框架和日常实践。 自我管理 - 焦虑转行动的叙事框架 章节 暂无更多章节。"
  },
  {
    "id": "content/tech/ai/index",
    "title": "AI",
    "path": "content/tech/ai/index.md",
    "module": "tech",
    "moduleLabel": "技术",
    "section": "ai",
    "sectionLabel": "AI",
    "tags": [],
    "headings": [
      {
        "level": 1,
        "text": "AI",
        "slug": "ai"
      },
      {
        "level": 2,
        "text": "笔记",
        "slug": "笔记"
      }
    ],
    "body": "# AI\n\nAI 工程、Prompt、RAG、Agent、模型评估、上下文管理和 AI 应用架构。\n\n## 笔记\n\n- [Superpowers 到 Codex 的子 agent 编排链路](superpowers-to-codex-subagent-workflow.md)\n",
    "searchText": "ai content/tech/ai/index.md 技术 ai ai ai 工程、prompt、rag、agent、模型评估、上下文管理和 ai 应用架构。 笔记 - superpowers 到 codex 的子 agent 编排链路"
  },
  {
    "id": "content/tech/ai/superpowers-to-codex-subagent-workflow",
    "title": "Superpowers 到 Codex 的子 agent 编排链路",
    "path": "content/tech/ai/superpowers-to-codex-subagent-workflow.md",
    "module": "tech",
    "moduleLabel": "技术",
    "section": "ai",
    "sectionLabel": "AI",
    "tags": [
      "codex",
      "superpowers",
      "agent",
      "workflow"
    ],
    "headings": [
      {
        "level": 1,
        "text": "Superpowers 到 Codex 的子 agent 编排链路",
        "slug": "superpowers-到-codex-的子-agent-编排链路"
      },
      {
        "level": 2,
        "text": "核心结论",
        "slug": "核心结论"
      },
      {
        "level": 2,
        "text": "背景",
        "slug": "背景"
      },
      {
        "level": 2,
        "text": "从 Superpowers 到 Codex 的映射",
        "slug": "从-superpowers-到-codex-的映射"
      },
      {
        "level": 2,
        "text": "执行链路",
        "slug": "执行链路"
      },
      {
        "level": 2,
        "text": "子 agent 是什么",
        "slug": "子-agent-是什么"
      },
      {
        "level": 2,
        "text": "回调模型",
        "slug": "回调模型"
      },
      {
        "level": 2,
        "text": "Superpowers 的价值",
        "slug": "superpowers-的价值"
      },
      {
        "level": 2,
        "text": "实践判断",
        "slug": "实践判断"
      },
      {
        "level": 2,
        "text": "关联",
        "slug": "关联"
      }
    ],
    "body": "\n# Superpowers 到 Codex 的子 agent 编排链路\n\n## 核心结论\n\nSuperpowers 不是子 agent runtime。它主要提供 workflow spec、prompt template 和跨平台工具映射；真正创建、并发执行、等待、继续和关闭子 agent 的能力来自 Codex runtime。\n\n可以把职责分成三层：\n\n```text\nSuperpowers\n  编排规则、prompt 模板、验收流程\n\n主 agent\n  解释 Superpowers 规则，并决定何时调用 Codex 工具\n\nCodex runtime\n  管理 agent thread 生命周期、并发、状态、通知、approval、sandbox 和工具调用\n```\n\n## 背景\n\nSuperpowers 的 subagent 工作流常见于两类场景：\n\n- `dispatching-parallel-agents`：把多个独立问题拆给多个子 agent 并行探索或修复。\n- `subagent-driven-development`：按计划逐个任务派发 implementer，再派 spec reviewer 和 code quality reviewer 做两阶段验收。\n\n这些 skill 文件本身是 Markdown 说明和 prompt 模板，不是后台调度器。它们告诉主 agent 什么时候派发、怎样写子任务、怎样审查结果，以及什么时候继续或回退。\n\n## 从 Superpowers 到 Codex 的映射\n\nSuperpowers 原始说明常用 Claude Code 的 `Task` 表达“派发子 agent”。在 Codex 环境里，工具映射大致是：\n\n```text\nTask tool              -> spawn_agent\nMultiple Task calls    -> multiple spawn_agent calls\nTask returns result    -> wait_agent\nTask completes cleanup -> close_agent\nTodoWrite              -> update_plan\n```\n\n因此，Superpowers 看到“dispatch subagent”时，在 Codex 中实际落到这些 runtime 工具：\n\n- `spawn_agent`：创建一个独立 agent thread，返回 agent id。\n- `wait_agent`：等待一个或多个 agent 完成，并返回 final message/status。\n- `send_input`：给已有 agent 追加指令，或打断当前任务。\n- `close_agent`：关闭已完成或不再需要的 agent thread，释放并发槽。\n\n## 执行链路\n\n一次典型链路是：\n\n```text\n用户请求\n  -> 主 agent 判断触发 Superpowers skill\n  -> 主 agent 读取 workflow 和 prompt template\n  -> skill 要求 dispatch subagent\n  -> 主 agent 调用 Codex 的 spawn_agent(prompt)\n  -> Codex runtime 创建后台 agent thread\n  -> 子 agent 独立执行自己的 model/tool loop\n  -> 主 agent 调用 wait_agent(agent_id)\n  -> Codex runtime 返回子 agent 的结果\n  -> 主 agent 根据结果决定接受、追问、修复、复审或关闭\n```\n\n这里的“监听”不是 Superpowers 自己开线程监听。更准确地说，Codex runtime 维护 agent id 到状态和结果的映射；主 agent 需要结果时调用 `wait_agent`，由 runtime 挂起等待或返回已完成结果。\n\n## 子 agent 是什么\n\nCodex 文档使用的是 **agent thread** 这个产品抽象。它不是对操作系统 thread/process 的公开承诺。\n\n可以确定的语义是：\n\n- 每个子 agent 有独立的 prompt / message history。\n- 每个子 agent 有自己的模型调用循环和工具调用流。\n- 子 agent 继承父会话的 sandbox 和 approval policy。\n- CLI 中可以通过 `/agent` 查看或切换 active agent threads。\n- 多个 agent 可以并行运行，但并行写同一批文件会带来冲突风险。\n\n不能确定的是：\n\n- 一个子 agent 是否对应一个 OS process。\n- 一个子 agent 是否对应一个 OS thread。\n- CLI、App、Cloud、app-server 是否使用完全相同的底层实现。\n\n稳定可依赖的抽象是 `agent thread`，不是进程或线程模型。\n\n## 回调模型\n\nCodex 的子 agent 结果回传更像异步任务状态机制，而不是传统代码里的 callback function：\n\n```text\nspawn_agent -> 返回 agent_id\nagent_id -> runtime 内部跟踪 running / completed / failed 等状态\nwait_agent(agent_id) -> 查询或等待状态变化\ncompleted -> runtime 把 final message/status 返回给主 agent\n```\n\n伪代码可以理解为：\n\n```ts\nconst child = runtime.spawnAgent({\n  parentThreadId,\n  prompt,\n  agentType: \"worker\",\n  inheritedConfig: {\n    cwd,\n    sandbox,\n    approvals,\n    modelDefaults,\n    skills,\n    mcpServers,\n  },\n});\n\nscheduler.runInBackground(child);\n\nconst result = await runtime.waitAgent({\n  targets: [child.id],\n  timeoutMs: 300000,\n});\n```\n\n`scheduler.runInBackground` 内部可能是 async task、worker thread、独立进程、远端 job 或混合实现。公开语义不要求用户知道这一层。\n\n## Superpowers 的价值\n\nSuperpowers 的价值不是“实现了子 agent”，而是把子 agent 的使用标准化：\n\n- 什么时候值得拆成子 agent。\n- 怎样保证子任务边界清晰。\n- 怎样避免主会话被中间日志和探索过程污染。\n- 怎样给子 agent 足够上下文，但不继承整段会话噪音。\n- 怎样做 spec compliance review 和 code quality review。\n- 怎样处理 `DONE`、`DONE_WITH_CONCERNS`、`NEEDS_CONTEXT`、`BLOCKED`。\n- 怎样避免多个子 agent 同时改同一批文件。\n\n换句话说：\n\n```text\nCodex = execution engine / agent runtime / tool system\nSuperpowers = orchestration protocol / operating manual / prompt workflow\n```\n\n## 实践判断\n\n适合用子 agent 的任务：\n\n- 多个独立问题可以并行探索。\n- 多个测试失败属于不同模块。\n- 需要一个 reviewer 从新上下文审查实现。\n- 需要把 noisy 的日志分析、代码搜索、长文档总结移出主会话。\n\n不适合用子 agent 的任务：\n\n- 根因高度相关，必须整体理解。\n- 下一步马上依赖该结果，派发只会增加等待。\n- 多个 agent 会写同一批文件。\n- 任务边界不清，子 agent 只能猜。\n\n## 关联\n\n- [AI](index.md)\n",
    "searchText": "superpowers 到 codex 的子 agent 编排链路 content/tech/ai/superpowers-to-codex-subagent-workflow.md 技术 ai codex superpowers agent workflow superpowers 到 codex 的子 agent 编排链路 核心结论 superpowers 不是子 agent runtime。它主要提供 workflow spec、prompt template 和跨平台工具映射；真正创建、并发执行、等待、继续和关闭子 agent 的能力来自 codex runtime。 可以把职责分成三层： 背景 superpowers 的 subagent 工作流常见于两类场景： - dispatching-parallel-agents：把多个独立问题拆给多个子 agent 并行探索或修复。 - subagent-driven-development：按计划逐个任务派发 implementer，再派 spec reviewer 和 code quality reviewer 做两阶段验收。 这些 skill 文件本身是 markdown 说明和 prompt 模板，不是后台调度器。它们告诉主 agent 什么时候派发、怎样写子任务、怎样审查结果，以及什么时候继续或回退。 从 superpowers 到 codex 的映射 superpowers 原始说明常用 claude code 的 task 表达“派发子 agent”。在 codex 环境里，工具映射大致是： 因此，superpowers 看到“dispatch subagent”时，在 codex 中实际落到这些 runtime 工具： - spawnagent：创建一个独立 agent thread，返回 agent id。 - waitagent：等待一个或多个 agent 完成，并返回 final message/status。 - sendinput：给已有 agent 追加指令，或打断当前任务。 - closeagent：关闭已完成或不再需要的 agent thread，释放并发槽。 执行链路 一次典型链路是： 这里的“监听”不是 superpowers 自己开线程监听。更准确地说，codex runtime 维护 agent id 到状态和结果的映射；主 agent 需要结果时调用 waitagent，由 runtime 挂起等待或返回已完成结果。 子 agent 是什么 codex 文档使用的是 agent thread 这个产品抽象。它不是对操作系统 thread/process 的公开承诺。 可以确定的语义是： - 每个子 agent 有独立的 prompt / message history。 - 每个子 agent 有自己的模型调用循环和工具调用流。 - 子 agent 继承父会话的 sandbox 和 approval policy。 - cli 中可以通过 /agent 查看或切换 active agent threads。 - 多个 agent 可以并行运行，但并行写同一批文件会带来冲突风险。 不能确定的是： - 一个子 agent 是否对应一个 os process。 - 一个子 agent 是否对应一个 os thread。 - cli、app、cloud、app-server 是否使用完全相同的底层实现。 稳定可依赖的抽象是 agent thread，不是进程或线程模型。 回调模型 codex 的子 agent 结果回传更像异步任务状态机制，而不是传统代码里的 callback function： 伪代码可以理解为： scheduler.runinbackground 内部可能是 async task、worker thread、独立进程、远端 job 或混合实现。公开语义不要求用户知道这一层。 superpowers 的价值 superpowers 的价值不是“实现了子 agent”，而是把子 agent 的使用标准化： - 什么时候值得拆成子 agent。 - 怎样保证子任务边界清晰。 - 怎样避免主会话被中间日志和探索过程污染。 - 怎样给子 agent 足够上下文，但不继承整段会话噪音。 - 怎样做 spec compliance review 和 code quality review。 - 怎样处理 done、donewithconcerns、needscontext、blocked。 - 怎样避免多个子 agent 同时改同一批文件。 换句话说： 实践判断 适合用子 agent 的任务： - 多个独立问题可以并行探索。 - 多个测试失败属于不同模块。 - 需要一个 reviewer 从新上下文审查实现。 - 需要把 noisy 的日志分析、代码搜索、长文档总结移出主会话。 不适合用子 agent 的任务： - 根因高度相关，必须整体理解。 - 下一步马上依赖该结果，派发只会增加等待。 - 多个 agent 会写同一批文件。 - 任务边界不清，子 agent 只能猜。 关联 - ai"
  },
  {
    "id": "content/tech/architecture/index",
    "title": "架构与系统设计",
    "path": "content/tech/architecture/index.md",
    "module": "tech",
    "moduleLabel": "技术",
    "section": "architecture",
    "sectionLabel": "架构与系统设计",
    "tags": [],
    "headings": [
      {
        "level": 1,
        "text": "架构与系统设计",
        "slug": "架构与系统设计"
      },
      {
        "level": 2,
        "text": "章节",
        "slug": "章节"
      }
    ],
    "body": "# 架构与系统设计\n\n系统设计、架构取舍、模块边界、可靠性、可扩展性和演进路径。\n\n## 章节\n\n- [什么是架构](what-is-architecture.md)\n",
    "searchText": "架构与系统设计 content/tech/architecture/index.md 技术 架构与系统设计 架构与系统设计 系统设计、架构取舍、模块边界、可靠性、可扩展性和演进路径。 章节 - 什么是架构"
  },
  {
    "id": "content/tech/architecture/what-is-architecture",
    "title": "什么是架构",
    "path": "content/tech/architecture/what-is-architecture.md",
    "module": "tech",
    "moduleLabel": "技术",
    "section": "architecture",
    "sectionLabel": "架构与系统设计",
    "tags": [
      "architecture",
      "system-design"
    ],
    "headings": [
      {
        "level": 1,
        "text": "什么是架构",
        "slug": "什么是架构"
      },
      {
        "level": 2,
        "text": "核心结论",
        "slug": "核心结论"
      },
      {
        "level": 2,
        "text": "背景",
        "slug": "背景"
      },
      {
        "level": 2,
        "text": "内容",
        "slug": "内容"
      },
      {
        "level": 3,
        "text": "边界",
        "slug": "边界"
      },
      {
        "level": 3,
        "text": "关系",
        "slug": "关系"
      },
      {
        "level": 3,
        "text": "数据",
        "slug": "数据"
      },
      {
        "level": 3,
        "text": "取舍",
        "slug": "取舍"
      },
      {
        "level": 2,
        "text": "例子",
        "slug": "例子"
      },
      {
        "level": 3,
        "text": "Markdown 文件",
        "slug": "markdown-文件"
      },
      {
        "level": 3,
        "text": "数据库",
        "slug": "数据库"
      },
      {
        "level": 3,
        "text": "向量数据库",
        "slug": "向量数据库"
      },
      {
        "level": 2,
        "text": "判断标准",
        "slug": "判断标准"
      },
      {
        "level": 2,
        "text": "关联",
        "slug": "关联"
      }
    ],
    "body": "\n# 什么是架构\n\n## 核心结论\n\n架构是在约束下组织系统的方式。\n\n它不是画几张图，也不是用了微服务、消息队列、Redis、Kubernetes 就叫有架构。架构真正关心的是：系统如何拆分、模块如何协作、数据如何流动、状态放在哪里、出错时怎么处理，以及未来变化时哪里容易改、哪里会很痛。\n\n一句话总结：\n\n**架构是把业务需求、技术约束、团队能力和未来变化组织成一个可运行、可维护、可演进的系统结构。**\n\n## 背景\n\n在 AI 时代，AI 会越来越擅长生成代码，但人仍然需要判断：\n\n- 该写什么？\n- 系统应该如何组织？\n- 当前复杂度是否值得？\n- 出问题时如何定位和恢复？\n- 未来需求变化时，哪些地方会成为阻力？\n\n所以架构能力不是“选择高级技术”，而是做合理取舍。\n\n## 内容\n\n架构主要关注四件事。\n\n### 边界\n\n边界回答：系统分成哪些模块，什么归谁管。\n\n这里的能力可以是用户登录、内容发布、搜索、支付、通知、权限校验、索引更新等业务或系统职责。\n\n典型问题：\n\n- 哪些能力应该放在同一个模块？\n- 哪些能力应该拆开？\n- 模块之间是否有清晰职责？\n- 一个模块是否承担了太多事情？\n\n### 关系\n\n关系回答：模块之间怎么通信，谁依赖谁。\n\n典型问题：\n\n- 是直接调用，还是通过事件、队列、消息？\n- 依赖方向是否清晰？\n- 一个模块变化是否会影响很多地方？\n- 是否存在循环依赖？\n\n### 数据\n\n数据回答：数据怎么存、怎么流、怎么保持一致。\n\n典型问题：\n\n- 数据源头在哪里？\n- 状态应该放在客户端、服务端、数据库还是缓存？\n- 数据更新后，其他模块如何感知？\n- 是否需要强一致，还是最终一致就够？\n\n### 取舍\n\n取舍回答：为了性能、成本、维护性、扩展性，牺牲了什么。\n\n典型问题：\n\n- 当前阶段需要这个复杂度吗？\n- 简单方案能撑多久？\n- 引入新组件会增加多少维护成本？\n- 这个设计未来最难改的地方是什么？\n\n## 例子\n\n假设要做一个知识库系统。\n\n最简单的实现可以是：\n\n```text\n用户输入内容\n-> 直接存到数据库\n-> 页面直接查数据库展示\n```\n\n这在早期可能完全够用。\n\n但开始考虑下面这些问题时，就进入了架构设计：\n\n- 内容如何分类？\n- 使用 Markdown 文件还是数据库？\n- 是否需要全文搜索？\n- 是否需要 AI 检索？\n- 搜索索引用什么生成？\n- 内容更新后如何同步索引？\n- 未来要不要做网页目录？\n\n不同方案有不同取舍。\n\n### Markdown 文件\n\n优点：\n\n- 简单。\n- 可读。\n- Git 友好。\n- 适合个人知识库。\n\n缺点：\n\n- 复杂查询能力弱。\n- 多人协作时可能出现冲突。\n\n### 数据库\n\n优点：\n\n- 查询能力强。\n- 适合动态系统。\n- 适合复杂权限、状态和多用户协作。\n\n缺点：\n\n- 维护成本更高。\n- 不如 Markdown 直观。\n- 和 Git 的结合较弱。\n\n### 向量数据库\n\n优点：\n\n- 适合语义搜索。\n- 适合 RAG 场景。\n\n缺点：\n\n- 引入额外复杂度。\n- 需要考虑切分、嵌入、更新、评估。\n- 早期可能是过度设计。\n\n## 判断标准\n\n判断一个架构好不好，不是看它高级不高级，而是看它是否匹配当前阶段。\n\n小项目更需要：\n\n- 简单。\n- 清晰。\n- 容易修改。\n\n增长期系统更需要：\n\n- 边界清楚。\n- 数据一致。\n- 可观测。\n- 可扩展。\n\n生产系统必须考虑：\n\n- 可靠性。\n- 降级。\n- 回滚。\n- 监控。\n- 故障恢复。\n\n## 关联\n\n- [架构与系统设计](index.md)\n- [AI 时代技术能力地图](../../../topics/ai-era-technical-capability-map.md)\n",
    "searchText": "什么是架构 content/tech/architecture/what-is-architecture.md 技术 架构与系统设计 architecture system-design 什么是架构 核心结论 架构是在约束下组织系统的方式。 它不是画几张图，也不是用了微服务、消息队列、redis、kubernetes 就叫有架构。架构真正关心的是：系统如何拆分、模块如何协作、数据如何流动、状态放在哪里、出错时怎么处理，以及未来变化时哪里容易改、哪里会很痛。 一句话总结： 架构是把业务需求、技术约束、团队能力和未来变化组织成一个可运行、可维护、可演进的系统结构。 背景 在 ai 时代，ai 会越来越擅长生成代码，但人仍然需要判断： - 该写什么？ - 系统应该如何组织？ - 当前复杂度是否值得？ - 出问题时如何定位和恢复？ - 未来需求变化时，哪些地方会成为阻力？ 所以架构能力不是“选择高级技术”，而是做合理取舍。 内容 架构主要关注四件事。 边界 边界回答：系统分成哪些模块，什么归谁管。 这里的能力可以是用户登录、内容发布、搜索、支付、通知、权限校验、索引更新等业务或系统职责。 典型问题： - 哪些能力应该放在同一个模块？ - 哪些能力应该拆开？ - 模块之间是否有清晰职责？ - 一个模块是否承担了太多事情？ 关系 关系回答：模块之间怎么通信，谁依赖谁。 典型问题： - 是直接调用，还是通过事件、队列、消息？ - 依赖方向是否清晰？ - 一个模块变化是否会影响很多地方？ - 是否存在循环依赖？ 数据 数据回答：数据怎么存、怎么流、怎么保持一致。 典型问题： - 数据源头在哪里？ - 状态应该放在客户端、服务端、数据库还是缓存？ - 数据更新后，其他模块如何感知？ - 是否需要强一致，还是最终一致就够？ 取舍 取舍回答：为了性能、成本、维护性、扩展性，牺牲了什么。 典型问题： - 当前阶段需要这个复杂度吗？ - 简单方案能撑多久？ - 引入新组件会增加多少维护成本？ - 这个设计未来最难改的地方是什么？ 例子 假设要做一个知识库系统。 最简单的实现可以是： 这在早期可能完全够用。 但开始考虑下面这些问题时，就进入了架构设计： - 内容如何分类？ - 使用 markdown 文件还是数据库？ - 是否需要全文搜索？ - 是否需要 ai 检索？ - 搜索索引用什么生成？ - 内容更新后如何同步索引？ - 未来要不要做网页目录？ 不同方案有不同取舍。 markdown 文件 优点： - 简单。 - 可读。 - git 友好。 - 适合个人知识库。 缺点： - 复杂查询能力弱。 - 多人协作时可能出现冲突。 数据库 优点： - 查询能力强。 - 适合动态系统。 - 适合复杂权限、状态和多用户协作。 缺点： - 维护成本更高。 - 不如 markdown 直观。 - 和 git 的结合较弱。 向量数据库 优点： - 适合语义搜索。 - 适合 rag 场景。 缺点： - 引入额外复杂度。 - 需要考虑切分、嵌入、更新、评估。 - 早期可能是过度设计。 判断标准 判断一个架构好不好，不是看它高级不高级，而是看它是否匹配当前阶段。 小项目更需要： - 简单。 - 清晰。 - 容易修改。 增长期系统更需要： - 边界清楚。 - 数据一致。 - 可观测。 - 可扩展。 生产系统必须考虑： - 可靠性。 - 降级。 - 回滚。 - 监控。 - 故障恢复。 关联 - 架构与系统设计 - ai 时代技术能力地图"
  },
  {
    "id": "content/tech/backend/index",
    "title": "后端",
    "path": "content/tech/backend/index.md",
    "module": "tech",
    "moduleLabel": "技术",
    "section": "backend",
    "sectionLabel": "后端",
    "tags": [],
    "headings": [
      {
        "level": 1,
        "text": "后端",
        "slug": "后端"
      },
      {
        "level": 2,
        "text": "章节",
        "slug": "章节"
      }
    ],
    "body": "# 后端\n\nAPI、服务、认证授权、队列、后台任务、服务边界和集成模式。\n\n## 章节\n\n暂无。\n",
    "searchText": "后端 content/tech/backend/index.md 技术 后端 后端 api、服务、认证授权、队列、后台任务、服务边界和集成模式。 章节 暂无。"
  },
  {
    "id": "content/tech/database/index",
    "title": "数据库与存储",
    "path": "content/tech/database/index.md",
    "module": "tech",
    "moduleLabel": "技术",
    "section": "database",
    "sectionLabel": "数据库与存储",
    "tags": [],
    "headings": [
      {
        "level": 1,
        "text": "数据库与存储",
        "slug": "数据库与存储"
      },
      {
        "level": 2,
        "text": "章节",
        "slug": "章节"
      }
    ],
    "body": "# 数据库与存储\n\n数据库、事务、索引、缓存、数据建模、查询优化和一致性。\n\n## 章节\n\n暂无。\n",
    "searchText": "数据库与存储 content/tech/database/index.md 技术 数据库与存储 数据库与存储 数据库、事务、索引、缓存、数据建模、查询优化和一致性。 章节 暂无。"
  },
  {
    "id": "content/tech/engineering/index",
    "title": "工程实践",
    "path": "content/tech/engineering/index.md",
    "module": "tech",
    "moduleLabel": "技术",
    "section": "engineering",
    "sectionLabel": "工程实践",
    "tags": [],
    "headings": [
      {
        "level": 1,
        "text": "工程实践",
        "slug": "工程实践"
      },
      {
        "level": 2,
        "text": "章节",
        "slug": "章节"
      }
    ],
    "body": "# 工程实践\n\n测试、调试、代码审查、重构、可维护性、可观测性和交付质量。\n\n## 章节\n\n暂无。\n",
    "searchText": "工程实践 content/tech/engineering/index.md 技术 工程实践 工程实践 测试、调试、代码审查、重构、可维护性、可观测性和交付质量。 章节 暂无。"
  },
  {
    "id": "content/tech/frontend/index",
    "title": "前端",
    "path": "content/tech/frontend/index.md",
    "module": "tech",
    "moduleLabel": "技术",
    "section": "frontend",
    "sectionLabel": "前端",
    "tags": [],
    "headings": [
      {
        "level": 1,
        "text": "前端",
        "slug": "前端"
      },
      {
        "level": 2,
        "text": "章节",
        "slug": "章节"
      }
    ],
    "body": "# 前端\n\n浏览器、UI 工程、前端架构、状态管理、渲染、可访问性和性能。\n\n## 章节\n\n暂无。\n",
    "searchText": "前端 content/tech/frontend/index.md 技术 前端 前端 浏览器、ui 工程、前端架构、状态管理、渲染、可访问性和性能。 章节 暂无。"
  },
  {
    "id": "content/tech/incidents/index",
    "title": "故障与复盘",
    "path": "content/tech/incidents/index.md",
    "module": "tech",
    "moduleLabel": "技术",
    "section": "incidents",
    "sectionLabel": "故障与复盘",
    "tags": [],
    "headings": [
      {
        "level": 1,
        "text": "故障与复盘",
        "slug": "故障与复盘"
      },
      {
        "level": 2,
        "text": "常见排查思路",
        "slug": "常见排查思路"
      }
    ],
    "body": "# 故障与复盘\n\nBug、故障、排查记录、复盘、性能问题和从失败中沉淀的预防经验。\n\n## 常见排查思路\n\n排查故障时先收敛事实，再扩大假设范围，避免一开始就陷入猜测。\n\n- 确认影响面：哪些用户、接口、任务、地域或版本受影响，是否仍在扩大。\n- 对齐时间线：记录首次告警、变更发布时间、流量变化、依赖异常和恢复动作。\n- 观察关键指标：错误率、延迟、吞吐、资源使用率、队列积压、重试量和下游依赖状态。\n- 检查最近变更：代码发布、配置调整、数据迁移、权限变更、容量调整和第三方服务变更。\n- 缩小问题范围：按环境、版本、租户、请求类型、数据特征或依赖链路逐步切分。\n- 验证假设：每次只改变一个变量，用日志、指标、追踪或复现实验确认结论。\n- 优先止血：在根因未完全确认前，可以先降级、回滚、限流、切流或暂停高风险任务。\n- 复盘沉淀：补充监控告警、操作手册、自动化校验和预防性测试，避免同类问题重复发生。\n",
    "searchText": "故障与复盘 content/tech/incidents/index.md 技术 故障与复盘 故障与复盘 bug、故障、排查记录、复盘、性能问题和从失败中沉淀的预防经验。 常见排查思路 排查故障时先收敛事实，再扩大假设范围，避免一开始就陷入猜测。 - 确认影响面：哪些用户、接口、任务、地域或版本受影响，是否仍在扩大。 - 对齐时间线：记录首次告警、变更发布时间、流量变化、依赖异常和恢复动作。 - 观察关键指标：错误率、延迟、吞吐、资源使用率、队列积压、重试量和下游依赖状态。 - 检查最近变更：代码发布、配置调整、数据迁移、权限变更、容量调整和第三方服务变更。 - 缩小问题范围：按环境、版本、租户、请求类型、数据特征或依赖链路逐步切分。 - 验证假设：每次只改变一个变量，用日志、指标、追踪或复现实验确认结论。 - 优先止血：在根因未完全确认前，可以先降级、回滚、限流、切流或暂停高风险任务。 - 复盘沉淀：补充监控告警、操作手册、自动化校验和预防性测试，避免同类问题重复发生。"
  },
  {
    "id": "content/tech/index",
    "title": "技术",
    "path": "content/tech/index.md",
    "module": "tech",
    "moduleLabel": "技术",
    "section": "root",
    "sectionLabel": "概览",
    "tags": [],
    "headings": [
      {
        "level": 1,
        "text": "技术",
        "slug": "技术"
      },
      {
        "level": 2,
        "text": "章节",
        "slug": "章节"
      }
    ],
    "body": "# 技术\n\n技术模块用于沉淀 AI 工程、架构与系统设计、工程实践、数据库、前端、后端、工具效率和故障复盘。\n\n## 章节\n\n- [AI](ai/index.md)\n- [架构与系统设计](architecture/index.md)\n- [工程实践](engineering/index.md)\n- [数据库与存储](database/index.md)\n- [前端](frontend/index.md)\n- [后端](backend/index.md)\n- [工具与效率](tools/index.md)\n- [故障与复盘](incidents/index.md)\n",
    "searchText": "技术 content/tech/index.md 技术 概览 技术 技术模块用于沉淀 ai 工程、架构与系统设计、工程实践、数据库、前端、后端、工具效率和故障复盘。 章节 - ai - 架构与系统设计 - 工程实践 - 数据库与存储 - 前端 - 后端 - 工具与效率 - 故障与复盘"
  },
  {
    "id": "content/tech/tools/index",
    "title": "工具与效率",
    "path": "content/tech/tools/index.md",
    "module": "tech",
    "moduleLabel": "技术",
    "section": "tools",
    "sectionLabel": "工具与效率",
    "tags": [],
    "headings": [
      {
        "level": 1,
        "text": "工具与效率",
        "slug": "工具与效率"
      },
      {
        "level": 2,
        "text": "笔记",
        "slug": "笔记"
      }
    ],
    "body": "# 工具与效率\n\n开发工具、Git、CI/CD、编辑器工作流、命令行效率、自动化和本地开发环境。\n\n## 笔记\n\n- [知识库使用与反馈流程](knowledge-base-workflow.md)\n",
    "searchText": "工具与效率 content/tech/tools/index.md 技术 工具与效率 工具与效率 开发工具、git、ci/cd、编辑器工作流、命令行效率、自动化和本地开发环境。 笔记 - 知识库使用与反馈流程"
  },
  {
    "id": "content/tech/tools/knowledge-base-workflow",
    "title": "知识库使用与反馈流程",
    "path": "content/tech/tools/knowledge-base-workflow.md",
    "module": "tech",
    "moduleLabel": "技术",
    "section": "tools",
    "sectionLabel": "工具与效率",
    "tags": [
      "knowledge-base",
      "github",
      "giscus",
      "search",
      "feedback"
    ],
    "headings": [
      {
        "level": 1,
        "text": "知识库使用与反馈流程",
        "slug": "知识库使用与反馈流程"
      },
      {
        "level": 2,
        "text": "核心结论",
        "slug": "核心结论"
      },
      {
        "level": 2,
        "text": "存储结构",
        "slug": "存储结构"
      },
      {
        "level": 2,
        "text": "构建流程",
        "slug": "构建流程"
      },
      {
        "level": 2,
        "text": "如何搜索知识",
        "slug": "如何搜索知识"
      },
      {
        "level": 2,
        "text": "如何关联知识",
        "slug": "如何关联知识"
      },
      {
        "level": 3,
        "text": "手动关联",
        "slug": "手动关联"
      },
      {
        "level": 2,
        "text": "关联",
        "slug": "关联"
      },
      {
        "level": 3,
        "text": "运行时自动关联",
        "slug": "运行时自动关联"
      },
      {
        "level": 2,
        "text": "如何评论",
        "slug": "如何评论"
      },
      {
        "level": 2,
        "text": "如何反馈问题",
        "slug": "如何反馈问题"
      },
      {
        "level": 2,
        "text": "评论和反馈的区别",
        "slug": "评论和反馈的区别"
      },
      {
        "level": 2,
        "text": "AI 修复闭环",
        "slug": "ai-修复闭环"
      },
      {
        "level": 3,
        "text": "1. 创建内容反馈 Issue",
        "slug": "1-创建内容反馈-issue"
      },
      {
        "level": 3,
        "text": "2. 服务器定期扫描 Issue",
        "slug": "2-服务器定期扫描-issue"
      },
      {
        "level": 3,
        "text": "3. Codex 根据仓库 skill 修改内容",
        "slug": "3-codex-根据仓库-skill-修改内容"
      },
      {
        "level": 3,
        "text": "4. runner 验证、提交分支并创建 PR",
        "slug": "4-runner-验证提交分支并创建-pr"
      },
      {
        "level": 3,
        "text": "5. 合并 PR 后 Issue 如何解决",
        "slug": "5-合并-pr-后-issue-如何解决"
      },
      {
        "level": 3,
        "text": "6. 信息不足时如何处理",
        "slug": "6-信息不足时如何处理"
      },
      {
        "level": 3,
        "text": "7. 当前服务器配置",
        "slug": "7-当前服务器配置"
      },
      {
        "level": 3,
        "text": "8. 为什么不在 GitHub Actions 里跑 Codex",
        "slug": "8-为什么不在-github-actions-里跑-codex"
      },
      {
        "level": 2,
        "text": "关联",
        "slug": "关联-2"
      }
    ],
    "body": "\n# 知识库使用与反馈流程\n\n## 核心结论\n\n当前知识库是一个基于 Markdown、GitHub 和静态前端的个人知识系统。\n\n内容存储在 Git 仓库中，网页端通过构建脚本生成搜索索引和导航数据；读者可以搜索知识、查看相关知识、在文章底部评论，也可以对整篇文章、某个段落或选中文字提交 GitHub Issue 反馈。\n\n这个设计把不同类型的互动分开：\n\n- 普通讨论走 GitHub Discussions / giscus。\n- 内容缺失、错误、过时等可处理反馈走 GitHub Issues。\n- 内容修复仍然通过 Pull Request 和 review 合并。\n\n## 存储结构\n\n知识内容以 Markdown 文件存储在仓库中。\n\n主要目录：\n\n```text\ncontent/\n  tech/\n  communication/\n  travel/\n\ntopics/\n\nweb/\n  src/\n  scripts/\n  tests/\n```\n\n内容组织采用两层分类：\n\n```text\n模块 module\n  章节 section\n    笔记 note\n```\n\n例如：\n\n```text\ncontent/tech/tools/knowledge-base-workflow.md\n```\n\n表示：\n\n- module：`tech`\n- section：`tools`\n- note：`knowledge-base-workflow`\n\n新增笔记时，需要同步更新对应章节的 `index.md`，让网页导航能展示出来。\n\n## 构建流程\n\n网页端在构建时读取 Markdown 内容，并生成静态数据文件：\n\n```text\nMarkdown 文件\n  -> web/scripts/generate-knowledge-data.mjs\n  -> web/src/generated/knowledge-data.ts\n  -> React 前端渲染导航、正文、搜索、相关知识\n```\n\n构建命令：\n\n```bash\ncd web\nnpm run build\n```\n\n测试命令：\n\n```bash\ncd web\nnpm run test\n```\n\n构建不会把评论或反馈写回 Markdown。评论和反馈分别存储在 GitHub Discussions 和 GitHub Issues 中。\n\n## 如何搜索知识\n\n网页顶部提供全文搜索。\n\n搜索数据来自每篇文档的：\n\n- 标题\n- 文件路径\n- 模块和章节名\n- tags\n- Markdown 正文\n- 按标题切分的正文 chunk\n\n搜索逻辑在：\n\n```text\nweb/src/search.ts\n```\n\n搜索结果会显示：\n\n- 匹配文档标题\n- 所属模块和章节\n- 命中的正文片段\n- 匹配关键词高亮\n\n文章内选中文字时，也会触发一次本地搜索，用选中的文本查找相关知识点。\n\n## 如何关联知识\n\n知识关联分两类：手动关联和运行时自动关联。\n\n### 手动关联\n\n在 Markdown 文章末尾添加 `## 关联` 章节：\n\n```markdown\n## 关联\n\n- [AI](../ai/index.md)\n- [工具与效率](index.md)\n```\n\n手动关联优先级最高。网页端会解析这些链接，并优先展示到文章底部的“相关知识”区域。\n\n### 运行时自动关联\n\n如果手动关联不足，前端会基于当前文档自动补充相关内容。\n\n自动关联会参考：\n\n- title\n- tags\n- 二级和三级标题\n- 正文中的问题式句子\n- 本地搜索结果\n\n自动关联在浏览器运行时计算，不再依赖构建期生成的 `relatedDocIds`。\n\n## 如何评论\n\n文章底部的“评论”区域使用 giscus。\n\ngiscus 的作用是把 GitHub Discussions 嵌入到静态网页中：\n\n```text\n文章页面\n  -> giscus script\n  -> GitHub Discussions\n```\n\n当前配置：\n\n```text\nrepo: tcpjq/knowledge\nrepoId: R_kgDOS1ZCvQ\ncategory: General\ncategoryId: DIC_kwDOS1ZCvc4C-5Bs\nmapping: specific\ntheme: preferred_color_scheme\nlang: zh-CN\n```\n\n因为当前网页是 SPA，切换文章时浏览器 pathname 不变，所以不能用 `pathname` 做 discussion 映射。\n\n当前使用 `specific` 映射，并由前端按文章生成 term：\n\n```text\nknowledge:<doc.id>\n```\n\n例如：\n\n```text\nknowledge:content/tech/tools/knowledge-base-workflow\n```\n\n这样每篇文章都有独立的 Discussion。\n\n评论适合用于：\n\n- 讨论文章观点\n- 补充背景\n- 读者交流\n- 非必须处理的留言\n\n## 如何反馈问题\n\n如果文章内容缺失、不准确、过时或需要修改，应该使用内容反馈，而不是普通评论。\n\n网页端提供三种反馈入口：\n\n- `反馈本文问题`：针对整篇文章。\n- `反馈此段`：针对某个段落。\n- `反馈选中文字`：针对选中的原文。\n\n这些入口都会打开 GitHub 新建 Issue 页面，并预填：\n\n- 文档标题\n- Markdown 路径\n- 位置\n- 原文\n- 问题说明模板\n- 期望修改模板\n- `content-feedback` label\n\n反馈 Issue 的模板在：\n\n```text\n.github/ISSUE_TEMPLATE/content-feedback.md\n```\n\n反馈适合用于：\n\n- 指出事实错误。\n- 补充缺失概念。\n- 标记过时内容。\n- 建议改写不清楚的段落。\n- 给后续 AI 自动修复提供结构化输入。\n\n如果 AI 判断反馈信息不足，会给 Issue 加上 `content-feedback-blocked` 标签并评论说明缺少什么。\n\n这个标签表示“待补充信息”，不是永久拒绝。处理方式是：\n\n1. 直接编辑同一个 Issue。\n2. 补充 `问题说明`，说明具体哪里不对、缺失、过时或表达不清。\n3. 补充 `期望修改`，说明希望补充什么，或希望把原文改成什么。\n4. 移除 `content-feedback-blocked` 标签。\n\n下一轮定时检测会重新处理这个 Issue。\n\n## 评论和反馈的区别\n\n| 类型 | 存储位置 | 适合内容 | 是否需要处理 |\n| --- | --- | --- | --- |\n| 评论 | GitHub Discussions | 讨论、补充、交流 | 不一定 |\n| 反馈 | GitHub Issues | 缺失、错误、过时、待修改 | 是 |\n\n简单判断：\n\n- 想讨论：用评论。\n- 想推动修改：用反馈。\n\n## AI 修复闭环\n\n当前第一版已经接入个人服务器上的内容反馈 agent。它把 `content-feedback` Issue 转成知识库修复 PR，但不自动合并。\n\n完整流程：\n\n```text\nGitHub Issues(content-feedback)\n  -> systemd timer 定期启动个人服务器 runner\n  -> runner 创建临时 git worktree\n  -> Codex 读取仓库内 skill\n  -> AI 读取反馈和 Markdown 上下文\n  -> 修改文章和生成数据\n  -> runner 校验变更范围、测试、构建\n  -> runner 推送 ai/content-feedback-<issue-number> 分支\n  -> runner 创建 Pull Request\n  -> runner 在原 Issue 评论 PR 链接\n  -> 人工 review 并合并 PR\n  -> GitHub 构建发布\n  -> GitHub 根据 Fixes #<issue-number> 自动关闭 Issue\n```\n\n### 1. 创建内容反馈 Issue\n\n读者在文章页点击反馈入口：\n\n- `反馈本文问题`\n- `反馈此段`\n- `反馈选中文字`\n\n网页会打开 GitHub 新建 Issue 页面，并预填文档路径、位置、原文、问题说明、期望修改和 `content-feedback` 标签。\n\nIssue 内容越具体，AI 越容易处理。至少应该说明：\n\n- 哪里缺失、不准确、过时或表达不清。\n- 希望补充什么，或希望把原文改成什么。\n- 如果是选中文字反馈，Issue 会带上选中文本和前后上下文。\n\n### 2. 服务器定期扫描 Issue\n\n个人服务器通过 systemd timer 定期启动 runner：\n\n```text\nknowledge-agent.timer\n  -> knowledge-agent.service\n  -> scripts/content-feedback-agent/run.sh\n```\n\nrunner 会查找 open 状态、带 `content-feedback` 标签、且没有 `content-feedback-blocked` 标签的 Issue。\n\n如果某个 Issue 已经有打开的修复 PR，例如分支 `ai/content-feedback-5` 已经存在对应 PR，runner 会直接跳过，不再重复启动 Codex。\n\n### 3. Codex 根据仓库 skill 修改内容\n\nrunner 不直接让 Codex 随意工作，而是生成一次性 prompt，要求 Codex 读取仓库内标准 skill：\n\n```text\n.agents/skills/content-feedback-agent/SKILL.md\n```\n\n这个 skill 规定：\n\n- 每次只处理一个 Issue。\n- 只允许修改知识内容和生成数据。\n- 不允许 Codex commit、push、创建 PR、关闭 Issue 或改 label。\n- 必须写入 `.agent/content-feedback-result.json`，告诉外层 runner 处理结果。\n\n这样做的边界是：Codex 只负责理解反馈和修改内容；Git 操作、验证、PR 创建都由 shell runner 控制。\n\n### 4. runner 验证、提交分支并创建 PR\n\n如果 Codex 返回 `changed`，runner 会继续执行：\n\n```text\n校验变更文件范围\n  -> cd web && npm run generate\n  -> cd web && npm run test\n  -> cd web && npm run build\n  -> git commit\n  -> git push origin ai/content-feedback-<issue-number>\n  -> 创建 Pull Request\n```\n\n允许修改的文件范围是：\n\n```text\ncontent/**/*.md\ntopics/**/*.md\nweb/src/generated/knowledge-data.ts\n```\n\n如果 Codex 改了 workflow、依赖文件、脚本或其他不在白名单里的文件，runner 会失败，不会创建 PR。\n\nPR 标题格式：\n\n```text\nFix content feedback #<issue-number>\n```\n\nPR body 会包含：\n\n```text\nFixes #<issue-number>\n```\n\n这个字段很重要。PR 合并到默认分支后，GitHub 会自动关闭对应 Issue。\n\n### 5. 合并 PR 后 Issue 如何解决\n\nIssue 不由 agent 直接关闭，而是在 PR 合并后由 GitHub 自动关闭。\n\n例如：\n\n```text\nIssue: #5 内容反馈：什么是架构\nPR:    #6 Fix content feedback #5\nBody:  Fixes #5\n```\n\n当 PR #6 合并到 `main` 后：\n\n- GitHub 自动关闭 Issue #5。\n- GitHub Actions 按主分支更新触发构建发布。\n- 下一轮 agent 只扫描 open Issue，所以不会再处理 #5。\n\n如果 PR 被关闭但没有合并，Issue 仍然 open；这时后续定时扫描可能会再次处理这个 Issue。\n\n### 6. 信息不足时如何处理\n\n如果 AI 判断 Issue 信息不足，会返回 `blocked`。\n\nrunner 会：\n\n- 给 Issue 加上 `content-feedback-blocked` 标签。\n- 评论说明缺少什么信息。\n- 跳过这个 Issue，直到有人补充信息。\n\n处理方式：\n\n1. 直接编辑同一个 Issue。\n2. 补充清楚 `问题说明` 和 `期望修改`。\n3. 移除 `content-feedback-blocked` 标签。\n4. 等下一轮定时扫描重新处理。\n\n### 7. 当前服务器配置\n\n运行配置在服务器本地，不提交到仓库：\n\n```text\n~/.config/knowledge-agent/env\n```\n\n核心配置项：\n\n```bash\nREPO_DIR=/jockie/code/my/knowledge\nREPO_FULL_NAME=tcpjq/knowledge\nAGENT_PROVIDER=codex\nWORKTREE_ROOT=/tmp/knowledge-content-feedback-agent\nBASE_BRANCH=main\nBLOCKED_LABEL=content-feedback-blocked\nCODEX_BYPASS_SANDBOX=1\nFEISHU_WEBHOOK=\n```\n\nsystemd 配置：\n\n```text\n~/.config/systemd/user/knowledge-agent.service\n~/.config/systemd/user/knowledge-agent.timer\n```\n\n常用操作：\n\n```bash\nsystemctl --user status knowledge-agent.timer\nsystemctl --user status knowledge-agent.service\nsystemctl --user start knowledge-agent.service\njournalctl --user -u knowledge-agent.service -f\n```\n\n临时 worktree 不包含被 Git 忽略的 `web/node_modules`。runner 会把主仓库的 `web/node_modules` 链接到临时 worktree 中，所以服务器主仓库需要先安装前端依赖：\n\n```bash\ncd /jockie/code/my/knowledge/web\nnpm install\n```\n\n### 8. 为什么不在 GitHub Actions 里跑 Codex\n\n当前选择个人服务器定期扫描，而不是 GitHub Actions 直接跑 Codex，主要原因是：\n\n- Codex 登录态和个人配置留在服务器本地，避免提交到仓库或 CI 配置中。\n- runner 可以使用本地已登录的 `gh` 和 `codex`。\n- 可以以后替换 `AGENT_PROVIDER`，例如从 Codex 换成 Claude。\n- GitHub Actions 只负责合并后的构建发布，避免每个反馈分支都自动打包镜像。\n\n这个设计的关键边界是：AI 负责提出修改，人工通过 PR review 决定是否合并。\n\n## 关联\n\n- [工具与效率](index.md)\n- [Superpowers 到 Codex 的子 agent 编排链路](../ai/superpowers-to-codex-subagent-workflow.md)\n",
    "searchText": "知识库使用与反馈流程 content/tech/tools/knowledge-base-workflow.md 技术 工具与效率 knowledge-base github giscus search feedback 知识库使用与反馈流程 核心结论 当前知识库是一个基于 markdown、github 和静态前端的个人知识系统。 内容存储在 git 仓库中，网页端通过构建脚本生成搜索索引和导航数据；读者可以搜索知识、查看相关知识、在文章底部评论，也可以对整篇文章、某个段落或选中文字提交 github issue 反馈。 这个设计把不同类型的互动分开： - 普通讨论走 github discussions / giscus。 - 内容缺失、错误、过时等可处理反馈走 github issues。 - 内容修复仍然通过 pull request 和 review 合并。 存储结构 知识内容以 markdown 文件存储在仓库中。 主要目录： 内容组织采用两层分类： 例如： 表示： - module：tech - section：tools - note：knowledge-base-workflow 新增笔记时，需要同步更新对应章节的 index.md，让网页导航能展示出来。 构建流程 网页端在构建时读取 markdown 内容，并生成静态数据文件： 构建命令： 测试命令： 构建不会把评论或反馈写回 markdown。评论和反馈分别存储在 github discussions 和 github issues 中。 如何搜索知识 网页顶部提供全文搜索。 搜索数据来自每篇文档的： - 标题 - 文件路径 - 模块和章节名 - tags - markdown 正文 - 按标题切分的正文 chunk 搜索逻辑在： 搜索结果会显示： - 匹配文档标题 - 所属模块和章节 - 命中的正文片段 - 匹配关键词高亮 文章内选中文字时，也会触发一次本地搜索，用选中的文本查找相关知识点。 如何关联知识 知识关联分两类：手动关联和运行时自动关联。 手动关联 在 markdown 文章末尾添加 ## 关联 章节： 手动关联优先级最高。网页端会解析这些链接，并优先展示到文章底部的“相关知识”区域。 运行时自动关联 如果手动关联不足，前端会基于当前文档自动补充相关内容。 自动关联会参考： - title - tags - 二级和三级标题 - 正文中的问题式句子 - 本地搜索结果 自动关联在浏览器运行时计算，不再依赖构建期生成的 relateddocids。 如何评论 文章底部的“评论”区域使用 giscus。 giscus 的作用是把 github discussions 嵌入到静态网页中： 当前配置： 因为当前网页是 spa，切换文章时浏览器 pathname 不变，所以不能用 pathname 做 discussion 映射。 当前使用 specific 映射，并由前端按文章生成 term： 例如： 这样每篇文章都有独立的 discussion。 评论适合用于： - 讨论文章观点 - 补充背景 - 读者交流 - 非必须处理的留言 如何反馈问题 如果文章内容缺失、不准确、过时或需要修改，应该使用内容反馈，而不是普通评论。 网页端提供三种反馈入口： - 反馈本文问题：针对整篇文章。 - 反馈此段：针对某个段落。 - 反馈选中文字：针对选中的原文。 这些入口都会打开 github 新建 issue 页面，并预填： - 文档标题 - markdown 路径 - 位置 - 原文 - 问题说明模板 - 期望修改模板 - content-feedback label 反馈 issue 的模板在： 反馈适合用于： - 指出事实错误。 - 补充缺失概念。 - 标记过时内容。 - 建议改写不清楚的段落。 - 给后续 ai 自动修复提供结构化输入。 如果 ai 判断反馈信息不足，会给 issue 加上 content-feedback-blocked 标签并评论说明缺少什么。 这个标签表示“待补充信息”，不是永久拒绝。处理方式是： 1. 直接编辑同一个 issue。 2. 补充 问题说明，说明具体哪里不对、缺失、过时或表达不清。 3. 补充 期望修改，说明希望补充什么，或希望把原文改成什么。 4. 移除 content-feedback-blocked 标签。 下一轮定时检测会重新处理这个 issue。 评论和反馈的区别 | 类型 | 存储位置 | 适合内容 | 是否需要处理 | | --- | --- | --- | --- | | 评论 | github discussions | 讨论、补充、交流 | 不一定 | | 反馈 | github issues | 缺失、错误、过时、待修改 | 是 | 简单判断： - 想讨论：用评论。 - 想推动修改：用反馈。 ai 修复闭环 当前第一版已经接入个人服务器上的内容反馈 agent。它把 content-feedback issue 转成知识库修复 pr，但不自动合并。 完整流程： 1. 创建内容反馈 issue 读者在文章页点击反馈入口： - 反馈本文问题 - 反馈此段 - 反馈选中文字 网页会打开 github 新建 issue 页面，并预填文档路径、位置、原文、问题说明、期望修改和 content-feedback 标签。 issue 内容越具体，ai 越容易处理。至少应该说明： - 哪里缺失、不准确、过时或表达不清。 - 希望补充什么，或希望把原文改成什么。 - 如果是选中文字反馈，issue 会带上选中文本和前后上下文。 2. 服务器定期扫描 issue 个人服务器通过 systemd timer 定期启动 runner： runner 会查找 open 状态、带 content-feedback 标签、且没有 content-feedback-blocked 标签的 issue。 如果某个 issue 已经有打开的修复 pr，例如分支 ai/content-feedback-5 已经存在对应 pr，runner 会直接跳过，不再重复启动 codex。 3. codex 根据仓库 skill 修改内容 runner 不直接让 codex 随意工作，而是生成一次性 prompt，要求 codex 读取仓库内标准 skill： 这个 skill 规定： - 每次只处理一个 issue。 - 只允许修改知识内容和生成数据。 - 不允许 codex commit、push、创建 pr、关闭 issue 或改 label。 - 必须写入 .agent/content-feedback-result.json，告诉外层 runner 处理结果。 这样做的边界是：codex 只负责理解反馈和修改内容；git 操作、验证、pr 创建都由 shell runner 控制。 4. runner 验证、提交分支并创建 pr 如果 codex 返回 changed，runner 会继续执行： 允许修改的文件范围是： 如果 codex 改了 workflow、依赖文件、脚本或其他不在白名单里的文件，runner 会失败，不会创建 pr。 pr 标题格式： pr body 会包含： 这个字段很重要。pr 合并到默认分支后，github 会自动关闭对应 issue。 5. 合并 pr 后 issue 如何解决 issue 不由 agent 直接关闭，而是在 pr 合并后由 github 自动关闭。 例如： 当 pr #6 合并到 main 后： - github 自动关闭 issue #5。 - github actions 按主分支更新触发构建发布。 - 下一轮 agent 只扫描 open issue，所以不会再处理 #5。 如果 pr 被关闭但没有合并，issue 仍然 open；这时后续定时扫描可能会再次处理这个 issue。 6. 信息不足时如何处理 如果 ai 判断 issue 信息不足，会返回 blocked。 runner 会： - 给 issue 加上 content-feedback-blocked 标签。 - 评论说明缺少什么信息。 - 跳过这个 issue，直到有人补充信息。 处理方式： 1. 直接编辑同一个 issue。 2. 补充清楚 问题说明 和 期望修改。 3. 移除 content-feedback-blocked 标签。 4. 等下一轮定时扫描重新处理。 7. 当前服务器配置 运行配置在服务器本地，不提交到仓库： 核心配置项： systemd 配置： 常用操作： 临时 worktree 不包含被 git 忽略的 web/nodemodules。runner 会把主仓库的 web/nodemodules 链接到临时 worktree 中，所以服务器主仓库需要先安装前端依赖： 8. 为什么不在 github actions 里跑 codex 当前选择个人服务器定期扫描，而不是 github actions 直接跑 codex，主要原因是： - codex 登录态和个人配置留在服务器本地，避免提交到仓库或 ci 配置中。 - runner 可以使用本地已登录的 gh 和 codex。 - 可以以后替换 agentprovider，例如从 codex 换成 claude。 - github actions 只负责合并后的构建发布，避免每个反馈分支都自动打包镜像。 这个设计的关键边界是：ai 负责提出修改，人工通过 pr review 决定是否合并。 关联 - 工具与效率 - superpowers 到 codex 的子 agent 编排链路"
  },
  {
    "id": "content/travel/index",
    "title": "旅游",
    "path": "content/travel/index.md",
    "module": "travel",
    "moduleLabel": "旅游",
    "section": "root",
    "sectionLabel": "概览",
    "tags": [],
    "headings": [
      {
        "level": 1,
        "text": "旅游",
        "slug": "旅游"
      },
      {
        "level": 2,
        "text": "章节",
        "slug": "章节"
      }
    ],
    "body": "# 旅游\n\n旅游模块用于沉淀目的地、攻略、预算、行程、签证、酒店和旅行复盘。\n\n## 章节\n\n暂无。\n",
    "searchText": "旅游 content/travel/index.md 旅游 概览 旅游 旅游模块用于沉淀目的地、攻略、预算、行程、签证、酒店和旅行复盘。 章节 暂无。"
  },
  {
    "id": "topics/ai-era-technical-capability-map",
    "title": "AI 时代技术能力地图",
    "path": "topics/ai-era-technical-capability-map.md",
    "module": "topics",
    "moduleLabel": "主题",
    "section": "root",
    "sectionLabel": "概览",
    "tags": [],
    "headings": [
      {
        "level": 1,
        "text": "AI 时代技术能力地图",
        "slug": "ai-时代技术能力地图"
      },
      {
        "level": 2,
        "text": "定位",
        "slug": "定位"
      },
      {
        "level": 2,
        "text": "能力层级",
        "slug": "能力层级"
      },
      {
        "level": 3,
        "text": "1. 基础工程能力",
        "slug": "1-基础工程能力"
      },
      {
        "level": 3,
        "text": "2. 架构与方案设计",
        "slug": "2-架构与方案设计"
      },
      {
        "level": 3,
        "text": "3. 需求抽象与建模能力",
        "slug": "3-需求抽象与建模能力"
      },
      {
        "level": 3,
        "text": "4. AI 工程能力",
        "slug": "4-ai-工程能力"
      },
      {
        "level": 3,
        "text": "5. 代码审查与调试能力",
        "slug": "5-代码审查与调试能力"
      },
      {
        "level": 3,
        "text": "6. 产品与业务技术判断",
        "slug": "6-产品与业务技术判断"
      },
      {
        "level": 2,
        "text": "知识库建设方向",
        "slug": "知识库建设方向"
      },
      {
        "level": 3,
        "text": "技术概念",
        "slug": "技术概念"
      },
      {
        "level": 3,
        "text": "方案模式",
        "slug": "方案模式"
      },
      {
        "level": 3,
        "text": "架构决策",
        "slug": "架构决策"
      },
      {
        "level": 3,
        "text": "故障案例",
        "slug": "故障案例"
      },
      {
        "level": 3,
        "text": "AI 工程",
        "slug": "ai-工程"
      },
      {
        "level": 3,
        "text": "代码实践",
        "slug": "代码实践"
      },
      {
        "level": 2,
        "text": "推荐学习主线",
        "slug": "推荐学习主线"
      },
      {
        "level": 2,
        "text": "后续使用方式",
        "slug": "后续使用方式"
      }
    ],
    "body": "# AI 时代技术能力地图\n\n## 定位\n\n这个文档用于指导后续技术能力提升和知识库建设。\n\nAI 时代仍然需要懂技术，但重点不再是记住 API 或框架细节，而是能够判断问题、设计系统、审查 AI 产出的代码，并把技术方案落到真实业务约束里。\n\n核心目标：\n\n- 能判断一个技术方案是否合理。\n- 能把模糊需求拆成清晰模型。\n- 能设计可维护、可演进的系统。\n- 能把 AI 接入真实工程流程。\n- 能审查、调试和改进 AI 生成的代码。\n\n## 能力层级\n\n### 1. 基础工程能力\n\n基础工程能力是所有技术判断的底座。AI 可以辅助写代码，但人需要知道什么是正确、稳定、可维护的实现。\n\n需要持续积累：\n\n- 数据结构与算法：复杂度、常见数据结构、基本算法思想。\n- 网络：HTTP、DNS、TCP、TLS、WebSocket、缓存、代理。\n- 数据库：索引、事务、锁、隔离级别、查询优化、数据建模。\n- 操作系统：进程、线程、内存、文件系统、IO、并发。\n- 工程工具：Git、CI/CD、测试、日志、监控、部署、回滚。\n\n沉淀方式：\n\n- 每个概念写成一篇原子笔记。\n- 每篇笔记回答：是什么、为什么需要、常见误区、实际例子。\n- 遇到 bug 时反向补充对应底层知识。\n\n### 2. 架构与方案设计\n\n架构能力是 AI 时代最值得重点提升的能力之一。AI 可以给出很多方案，但方案是否适合当前阶段，需要人来判断。\n\n需要持续训练的问题：\n\n- 系统边界怎么划分？\n- 核心模块有哪些？\n- 数据流怎么走？\n- 状态应该放在哪里？\n- 同步还是异步？\n- 单体、模块化单体、微服务分别适合什么场景？\n- 如何保证可扩展、可观测、可回滚？\n- 出问题时如何降级？\n- 哪些设计是当前需要，哪些是过早复杂化？\n\n沉淀方式：\n\n- 保存典型系统设计：登录、权限、支付、订单、搜索、知识库、消息系统。\n- 每个方案记录约束、取舍、风险和替代方案。\n- 不只保存最终方案，也保存为什么没有选择其他方案。\n\n### 3. 需求抽象与建模能力\n\n需求抽象能力决定了技术实现是否真正解决问题。很多系统复杂，不是因为代码难，而是因为一开始没有把对象、关系和流程想清楚。\n\n需要持续训练：\n\n- 核心用户是谁？\n- 真实业务对象有哪些？\n- 对象之间是什么关系？\n- 哪些状态需要持久化？\n- 哪些流程有异常分支？\n- 哪些约束来自业务，哪些约束来自技术？\n- 当前必须做什么，哪些可以延后？\n\n例子：\n\n做一个知识库，不应该一开始就决定是否使用向量数据库，而是先判断：\n\n- 知识的最小单元是什么？\n- 知识如何被引用？\n- 知识如何更新？\n- 如何避免重复？\n- 如何让 AI 容易读取和检索？\n\n沉淀方式：\n\n- 为每个项目建立“需求建模”文档。\n- 用实体、状态、流程、异常、约束来组织内容。\n- 把模糊需求转成清晰问题清单。\n\n### 4. AI 工程能力\n\nAI 工程能力不是只会写 prompt，而是能把模型接入真实系统，并管理上下文、工具、数据、安全和评估。\n\n需要持续积累：\n\n- Prompt 设计：角色、任务、约束、示例、输出格式。\n- 上下文管理：信息选择、压缩、记忆、引用、窗口限制。\n- RAG：切分、嵌入、检索、重排、引用、更新。\n- Agent：工具调用、状态管理、任务拆解、失败恢复。\n- 模型选择：能力、成本、延迟、上下文长度、稳定性。\n- 评估：如何判断 AI 输出是否稳定、正确、可复现。\n- 安全：权限控制、提示注入、数据泄漏、幻觉控制。\n\n沉淀方式：\n\n- 保存可复用 prompt。\n- 记录 AI 工作流设计。\n- 记录失败案例：模型为什么答错、上下文哪里不够、评估哪里缺失。\n- 建立 AI 输出审查清单。\n\n### 5. 代码审查与调试能力\n\nAI 会显著提高代码产量，因此代码审查和调试能力会更重要。\n\n需要重点判断：\n\n- 代码是否只在局部正确，但整体有风险？\n- 错误处理是否完整？\n- 类型设计是否表达了真实约束？\n- 状态是否清晰？\n- 并发、缓存、事务是否存在隐患？\n- 测试是否覆盖关键路径？\n- 抽象是否过早？\n- 代码是否容易被后续维护？\n\n沉淀方式：\n\n- 保存代码审查清单。\n- 记录典型 bug 的定位过程。\n- 把每次修复沉淀为：现象、原因、验证、修复、预防。\n- 对 AI 生成代码单独记录常见问题。\n\n### 6. 产品与业务技术判断\n\n高级技术能力不是把系统做复杂，而是知道什么时候不需要复杂技术。\n\n需要持续训练：\n\n- 技术方案是否匹配业务阶段？\n- 当前最小可用方案是什么？\n- 哪些复杂度是真需求，哪些是想象出来的？\n- 交付速度和长期维护如何平衡？\n- 自动化是否值得？\n- 成本、稳定性、体验之间如何取舍？\n\n沉淀方式：\n\n- 记录技术决策。\n- 每个决策写清楚背景、选项、取舍、风险、复盘。\n- 建立“什么时候不用某项技术”的反向笔记。\n\n## 知识库建设方向\n\n后续知识库可以围绕以下类型沉淀。\n\n### 技术概念\n\n用于记录基础知识。\n\n例子：\n\n- 什么是事务？\n- 什么是数据库索引？\n- 什么是消息队列？\n- HTTP 缓存如何工作？\n\n### 方案模式\n\n用于记录常见系统设计。\n\n例子：\n\n- 登录系统怎么设计？\n- 权限系统怎么设计？\n- 支付系统怎么设计？\n- 知识库系统怎么设计？\n- RAG 系统怎么设计？\n\n### 架构决策\n\n用于记录具体选择背后的判断。\n\n例子：\n\n- 为什么选择模块化单体而不是微服务？\n- 为什么先不用向量数据库？\n- 为什么使用异步队列？\n- 为什么某个字段需要冗余？\n\n### 故障案例\n\n用于记录真实问题和排查过程。\n\n推荐结构：\n\n- 现象\n- 影响范围\n- 排查过程\n- 根因\n- 修复方式\n- 如何预防\n\n### AI 工程\n\n用于记录和 AI 相关的工程经验。\n\n例子：\n\n- Prompt 模板\n- RAG 切分策略\n- Agent 工具调用模式\n- AI 代码审查清单\n- 模型评估方法\n\n### 代码实践\n\n用于记录日常工程质量方法。\n\n例子：\n\n- 测试策略\n- 重构方法\n- 类型设计\n- 错误处理\n- 日志与监控\n- Code review checklist\n\n## 推荐学习主线\n\n优先级建议：\n\n1. 基础工程能力\n2. 一条主技术栈\n3. 系统设计\n4. AI 工程\n5. 架构决策\n6. 代码审查与调试\n7. 产品与业务技术判断\n\n如果只能优先选择三个方向：\n\n- 系统设计\n- AI 工程\n- 调试与代码审查\n\n原因是：AI 会越来越擅长生成代码，但人仍然要负责判断该写什么、如何组织系统、出了问题如何定位和修复。\n\n## 后续使用方式\n\n每次和 AI 聊到有价值的技术内容时，优先判断它属于哪一类：\n\n- 概念\n- 方案\n- 决策\n- 故障\n- AI 工程\n- 代码实践\n\n然后把内容沉淀成独立 Markdown 笔记，并在相关主题文档中建立链接。\n\n长期目标不是保存所有聊天记录，而是把聊天提炼成可以复用、可以检索、可以持续更新的技术判断体系。\n",
    "searchText": "ai 时代技术能力地图 topics/ai-era-technical-capability-map.md 主题 概览 ai 时代技术能力地图 定位 这个文档用于指导后续技术能力提升和知识库建设。 ai 时代仍然需要懂技术，但重点不再是记住 api 或框架细节，而是能够判断问题、设计系统、审查 ai 产出的代码，并把技术方案落到真实业务约束里。 核心目标： - 能判断一个技术方案是否合理。 - 能把模糊需求拆成清晰模型。 - 能设计可维护、可演进的系统。 - 能把 ai 接入真实工程流程。 - 能审查、调试和改进 ai 生成的代码。 能力层级 1. 基础工程能力 基础工程能力是所有技术判断的底座。ai 可以辅助写代码，但人需要知道什么是正确、稳定、可维护的实现。 需要持续积累： - 数据结构与算法：复杂度、常见数据结构、基本算法思想。 - 网络：http、dns、tcp、tls、websocket、缓存、代理。 - 数据库：索引、事务、锁、隔离级别、查询优化、数据建模。 - 操作系统：进程、线程、内存、文件系统、io、并发。 - 工程工具：git、ci/cd、测试、日志、监控、部署、回滚。 沉淀方式： - 每个概念写成一篇原子笔记。 - 每篇笔记回答：是什么、为什么需要、常见误区、实际例子。 - 遇到 bug 时反向补充对应底层知识。 2. 架构与方案设计 架构能力是 ai 时代最值得重点提升的能力之一。ai 可以给出很多方案，但方案是否适合当前阶段，需要人来判断。 需要持续训练的问题： - 系统边界怎么划分？ - 核心模块有哪些？ - 数据流怎么走？ - 状态应该放在哪里？ - 同步还是异步？ - 单体、模块化单体、微服务分别适合什么场景？ - 如何保证可扩展、可观测、可回滚？ - 出问题时如何降级？ - 哪些设计是当前需要，哪些是过早复杂化？ 沉淀方式： - 保存典型系统设计：登录、权限、支付、订单、搜索、知识库、消息系统。 - 每个方案记录约束、取舍、风险和替代方案。 - 不只保存最终方案，也保存为什么没有选择其他方案。 3. 需求抽象与建模能力 需求抽象能力决定了技术实现是否真正解决问题。很多系统复杂，不是因为代码难，而是因为一开始没有把对象、关系和流程想清楚。 需要持续训练： - 核心用户是谁？ - 真实业务对象有哪些？ - 对象之间是什么关系？ - 哪些状态需要持久化？ - 哪些流程有异常分支？ - 哪些约束来自业务，哪些约束来自技术？ - 当前必须做什么，哪些可以延后？ 例子： 做一个知识库，不应该一开始就决定是否使用向量数据库，而是先判断： - 知识的最小单元是什么？ - 知识如何被引用？ - 知识如何更新？ - 如何避免重复？ - 如何让 ai 容易读取和检索？ 沉淀方式： - 为每个项目建立“需求建模”文档。 - 用实体、状态、流程、异常、约束来组织内容。 - 把模糊需求转成清晰问题清单。 4. ai 工程能力 ai 工程能力不是只会写 prompt，而是能把模型接入真实系统，并管理上下文、工具、数据、安全和评估。 需要持续积累： - prompt 设计：角色、任务、约束、示例、输出格式。 - 上下文管理：信息选择、压缩、记忆、引用、窗口限制。 - rag：切分、嵌入、检索、重排、引用、更新。 - agent：工具调用、状态管理、任务拆解、失败恢复。 - 模型选择：能力、成本、延迟、上下文长度、稳定性。 - 评估：如何判断 ai 输出是否稳定、正确、可复现。 - 安全：权限控制、提示注入、数据泄漏、幻觉控制。 沉淀方式： - 保存可复用 prompt。 - 记录 ai 工作流设计。 - 记录失败案例：模型为什么答错、上下文哪里不够、评估哪里缺失。 - 建立 ai 输出审查清单。 5. 代码审查与调试能力 ai 会显著提高代码产量，因此代码审查和调试能力会更重要。 需要重点判断： - 代码是否只在局部正确，但整体有风险？ - 错误处理是否完整？ - 类型设计是否表达了真实约束？ - 状态是否清晰？ - 并发、缓存、事务是否存在隐患？ - 测试是否覆盖关键路径？ - 抽象是否过早？ - 代码是否容易被后续维护？ 沉淀方式： - 保存代码审查清单。 - 记录典型 bug 的定位过程。 - 把每次修复沉淀为：现象、原因、验证、修复、预防。 - 对 ai 生成代码单独记录常见问题。 6. 产品与业务技术判断 高级技术能力不是把系统做复杂，而是知道什么时候不需要复杂技术。 需要持续训练： - 技术方案是否匹配业务阶段？ - 当前最小可用方案是什么？ - 哪些复杂度是真需求，哪些是想象出来的？ - 交付速度和长期维护如何平衡？ - 自动化是否值得？ - 成本、稳定性、体验之间如何取舍？ 沉淀方式： - 记录技术决策。 - 每个决策写清楚背景、选项、取舍、风险、复盘。 - 建立“什么时候不用某项技术”的反向笔记。 知识库建设方向 后续知识库可以围绕以下类型沉淀。 技术概念 用于记录基础知识。 例子： - 什么是事务？ - 什么是数据库索引？ - 什么是消息队列？ - http 缓存如何工作？ 方案模式 用于记录常见系统设计。 例子： - 登录系统怎么设计？ - 权限系统怎么设计？ - 支付系统怎么设计？ - 知识库系统怎么设计？ - rag 系统怎么设计？ 架构决策 用于记录具体选择背后的判断。 例子： - 为什么选择模块化单体而不是微服务？ - 为什么先不用向量数据库？ - 为什么使用异步队列？ - 为什么某个字段需要冗余？ 故障案例 用于记录真实问题和排查过程。 推荐结构： - 现象 - 影响范围 - 排查过程 - 根因 - 修复方式 - 如何预防 ai 工程 用于记录和 ai 相关的工程经验。 例子： - prompt 模板 - rag 切分策略 - agent 工具调用模式 - ai 代码审查清单 - 模型评估方法 代码实践 用于记录日常工程质量方法。 例子： - 测试策略 - 重构方法 - 类型设计 - 错误处理 - 日志与监控 - code review checklist 推荐学习主线 优先级建议： 1. 基础工程能力 2. 一条主技术栈 3. 系统设计 4. ai 工程 5. 架构决策 6. 代码审查与调试 7. 产品与业务技术判断 如果只能优先选择三个方向： - 系统设计 - ai 工程 - 调试与代码审查 原因是：ai 会越来越擅长生成代码，但人仍然要负责判断该写什么、如何组织系统、出了问题如何定位和修复。 后续使用方式 每次和 ai 聊到有价值的技术内容时，优先判断它属于哪一类： - 概念 - 方案 - 决策 - 故障 - ai 工程 - 代码实践 然后把内容沉淀成独立 markdown 笔记，并在相关主题文档中建立链接。 长期目标不是保存所有聊天记录，而是把聊天提炼成可以复用、可以检索、可以持续更新的技术判断体系。"
  }
];

export const knowledgeModules: KnowledgeModule[] = [
  {
    "id": "tech",
    "label": "技术",
    "description": "AI 工程、架构、工程实践、数据库、前端、后端、工具与故障复盘。",
    "sections": [
      {
        "id": "root",
        "label": "概览",
        "docs": [
          "content/tech/index"
        ]
      },
      {
        "id": "ai",
        "label": "AI",
        "docs": [
          "content/tech/ai/index",
          "content/tech/ai/superpowers-to-codex-subagent-workflow"
        ]
      },
      {
        "id": "architecture",
        "label": "架构与系统设计",
        "docs": [
          "content/tech/architecture/index",
          "content/tech/architecture/what-is-architecture"
        ]
      },
      {
        "id": "engineering",
        "label": "工程实践",
        "docs": [
          "content/tech/engineering/index"
        ]
      },
      {
        "id": "database",
        "label": "数据库与存储",
        "docs": [
          "content/tech/database/index"
        ]
      },
      {
        "id": "frontend",
        "label": "前端",
        "docs": [
          "content/tech/frontend/index"
        ]
      },
      {
        "id": "backend",
        "label": "后端",
        "docs": [
          "content/tech/backend/index"
        ]
      },
      {
        "id": "tools",
        "label": "工具与效率",
        "docs": [
          "content/tech/tools/index",
          "content/tech/tools/knowledge-base-workflow"
        ]
      },
      {
        "id": "incidents",
        "label": "故障与复盘",
        "docs": [
          "content/tech/incidents/index"
        ]
      }
    ]
  },
  {
    "id": "communication",
    "label": "沟通",
    "description": "表达、写作、会议、反馈、谈判、协作和关系处理。",
    "sections": [
      {
        "id": "root",
        "label": "概览",
        "docs": [
          "content/communication/index"
        ]
      },
      {
        "id": "general",
        "label": "通用",
        "docs": [
          "content/communication/anxiety-to-action-narrative",
          "content/communication/effective-participation-in-design-review"
        ]
      }
    ]
  },
  {
    "id": "travel",
    "label": "旅游",
    "description": "目的地、攻略、预算、行程、签证、酒店和旅行复盘。",
    "sections": [
      {
        "id": "root",
        "label": "概览",
        "docs": [
          "content/travel/index"
        ]
      }
    ]
  },
  {
    "id": "topics",
    "label": "主题",
    "description": "跨模块主题、路线图和能力地图。",
    "sections": [
      {
        "id": "root",
        "label": "概览",
        "docs": [
          "topics/ai-era-technical-capability-map"
        ]
      }
    ]
  },
  {
    "id": "general",
    "label": "通用",
    "description": "没有归入具体模块的通用内容。",
    "sections": [
      {
        "id": "root",
        "label": "概览",
        "docs": [
          "content/general/index"
        ]
      },
      {
        "id": "general",
        "label": "通用",
        "docs": [
          "content/general/anxiety-to-action-narrative"
        ]
      }
    ]
  }
];

export const knowledgeChunks: KnowledgeChunk[] = [
  {
    "id": "content/communication/anxiety-to-action-narrative::1",
    "docId": "content/communication/anxiety-to-action-narrative",
    "heading": "核心结论",
    "text": "焦虑不一定要先被消灭，才可以开始行动。更实用的叙事是：焦虑可以存在，但它必须服务于行动；如果它不能给出下一步，就不能占用全部注意力。 关键不是“我能不能立刻平静”，而是“在焦虑存在的情况下，我还能不能推进一小步”。",
    "searchText": "焦虑转行动的叙事框架 核心结论 焦虑不一定要先被消灭，才可以开始行动。更实用的叙事是：焦虑可以存在，但它必须服务于行动；如果它不能给出下一步，就不能占用全部注意力。 关键不是“我能不能立刻平静”，而是“在焦虑存在的情况下，我还能不能推进一小步”。"
  },
  {
    "id": "content/communication/anxiety-to-action-narrative::2",
    "docId": "content/communication/anxiety-to-action-narrative",
    "heading": "背景",
    "text": "焦虑常常让人误以为自己正在处理问题，但很多时候只是在反复模拟风险。时间不会因为焦虑而暂停：焦虑，时间会过去；不焦虑，时间也会过去。 因此，注意力应从“如何完全不焦虑”转向“如何让这段时间留下行动痕迹”。",
    "searchText": "焦虑转行动的叙事框架 背景 焦虑常常让人误以为自己正在处理问题，但很多时候只是在反复模拟风险。时间不会因为焦虑而暂停：焦虑，时间会过去；不焦虑，时间也会过去。 因此，注意力应从“如何完全不焦虑”转向“如何让这段时间留下行动痕迹”。"
  },
  {
    "id": "content/communication/anxiety-to-action-narrative::3",
    "docId": "content/communication/anxiety-to-action-narrative",
    "heading": "时间叙事",
    "text": "旧叙事： 我现在状态不好，等不焦虑了再开始。 新叙事： 时间无论如何都会过去。我无法阻止时间流逝，但可以决定这段时间留下什么痕迹。 这个叙事把目标从“先恢复完美状态”改成“带着不安推进一点点”。",
    "searchText": "焦虑转行动的叙事框架 时间叙事 旧叙事： 我现在状态不好，等不焦虑了再开始。 新叙事： 时间无论如何都会过去。我无法阻止时间流逝，但可以决定这段时间留下什么痕迹。 这个叙事把目标从“先恢复完美状态”改成“带着不安推进一点点”。"
  },
  {
    "id": "content/communication/anxiety-to-action-narrative::4",
    "docId": "content/communication/anxiety-to-action-narrative",
    "heading": "能量叙事",
    "text": "旧叙事： 焦虑说明我不行。 新叙事： 焦虑说明我在乎某件事。它是一股没有找到出口的行动能量。 可以追问： - 这个焦虑想让我保护什么？ - 它在提醒我哪件事不能再拖？ - 我能把它转成哪个 10 分钟动作？",
    "searchText": "焦虑转行动的叙事框架 能量叙事 旧叙事： 焦虑说明我不行。 新叙事： 焦虑说明我在乎某件事。它是一股没有找到出口的行动能量。 可以追问： - 这个焦虑想让我保护什么？ - 它在提醒我哪件事不能再拖？ - 我能把它转成哪个 10 分钟动作？"
  },
  {
    "id": "content/communication/anxiety-to-action-narrative::5",
    "docId": "content/communication/anxiety-to-action-narrative",
    "heading": "行动叙事",
    "text": "旧叙事： 我得先把心情调整好，才能工作。 新叙事： 行动不是好心情的结果，行动也是重建心情的手段。 焦虑时不需要先完成全局任务，只需要启动一个小到无法拒绝的动作。",
    "searchText": "焦虑转行动的叙事框架 行动叙事 旧叙事： 我得先把心情调整好，才能工作。 新叙事： 行动不是好心情的结果，行动也是重建心情的手段。 焦虑时不需要先完成全局任务，只需要启动一个小到无法拒绝的动作。"
  },
  {
    "id": "content/communication/anxiety-to-action-narrative::6",
    "docId": "content/communication/anxiety-to-action-narrative",
    "heading": "旁观者叙事",
    "text": "旧叙事： 我很焦虑。 新叙事： 我注意到，身体里正在出现焦虑。大脑正在预测危险。这是一个信号，不是命令。 这个改写能把自己从情绪中抽离出来。焦虑可以被看见，但不必由它来做决定。",
    "searchText": "焦虑转行动的叙事框架 旁观者叙事 旧叙事： 我很焦虑。 新叙事： 我注意到，身体里正在出现焦虑。大脑正在预测危险。这是一个信号，不是命令。 这个改写能把自己从情绪中抽离出来。焦虑可以被看见，但不必由它来做决定。"
  },
  {
    "id": "content/communication/anxiety-to-action-narrative::7",
    "docId": "content/communication/anxiety-to-action-narrative",
    "heading": "成本叙事",
    "text": "旧叙事： 我得继续想清楚，否则不安全。 新叙事： 焦虑如果不能帮我决策、完成任务或给出下一步，就不能继续占用全部注意力。 焦虑可以提醒风险，但不能替代行动。否则它只是在消耗注意力。",
    "searchText": "焦虑转行动的叙事框架 成本叙事 旧叙事： 我得继续想清楚，否则不安全。 新叙事： 焦虑如果不能帮我决策、完成任务或给出下一步，就不能继续占用全部注意力。 焦虑可以提醒风险，但不能替代行动。否则它只是在消耗注意力。"
  },
  {
    "id": "content/communication/anxiety-to-action-narrative::8",
    "docId": "content/communication/anxiety-to-action-narrative",
    "heading": "降损叙事",
    "text": "旧叙事： 今天必须彻底振作、彻底高效。 新叙事： 今天不需要完美翻盘，只需要不要把局面交给惯性。 焦虑强的时候，目标可以降到： - 做 20 分钟。 - 写 100 字。 - 处理 1 个最小任务。 - 发出一个粗糙版本。 - 把问题列清楚。",
    "searchText": "焦虑转行动的叙事框架 降损叙事 旧叙事： 今天必须彻底振作、彻底高效。 新叙事： 今天不需要完美翻盘，只需要不要把局面交给惯性。 焦虑强的时候，目标可以降到： - 做 20 分钟。 - 写 100 字。 - 处理 1 个最小任务。 - 发出一个粗糙版本。 - 把问题列清楚。"
  },
  {
    "id": "content/communication/anxiety-to-action-narrative::9",
    "docId": "content/communication/anxiety-to-action-narrative",
    "heading": "可直接使用的自我对话",
    "text": "我现在焦虑，说明我在乎。 但焦虑不是行动本身。 时间无论如何都会过去。 我不要求自己马上平静，只要求自己做一个 10 分钟动作。 做完以后，再重新判断。",
    "searchText": "焦虑转行动的叙事框架 可直接使用的自我对话 我现在焦虑，说明我在乎。 但焦虑不是行动本身。 时间无论如何都会过去。 我不要求自己马上平静，只要求自己做一个 10 分钟动作。 做完以后，再重新判断。"
  },
  {
    "id": "content/communication/anxiety-to-action-narrative::10",
    "docId": "content/communication/anxiety-to-action-narrative",
    "heading": "例子",
    "text": "- 焦虑“工作做不完”：列出今天唯一最重要的一件事，然后只做第一个 10 分钟动作。 - 焦虑“别人评价我”：先发出一个不完美版本，把反馈变成下一轮输入。 - 焦虑“未来不确定”：设计一个可逆的小实验，而不是试图一次想出终局答案。",
    "searchText": "焦虑转行动的叙事框架 例子 - 焦虑“工作做不完”：列出今天唯一最重要的一件事，然后只做第一个 10 分钟动作。 - 焦虑“别人评价我”：先发出一个不完美版本，把反馈变成下一轮输入。 - 焦虑“未来不确定”：设计一个可逆的小实验，而不是试图一次想出终局答案。"
  },
  {
    "id": "content/communication/anxiety-to-action-narrative::11",
    "docId": "content/communication/anxiety-to-action-narrative",
    "heading": "使用边界",
    "text": "这套框架适合处理日常焦虑、拖延和工作状态波动。如果焦虑持续影响睡眠、饮食、工作、人际关系，或出现自伤念头，应优先寻求专业帮助。",
    "searchText": "焦虑转行动的叙事框架 使用边界 这套框架适合处理日常焦虑、拖延和工作状态波动。如果焦虑持续影响睡眠、饮食、工作、人际关系，或出现自伤念头，应优先寻求专业帮助。"
  },
  {
    "id": "content/communication/anxiety-to-action-narrative::12",
    "docId": "content/communication/anxiety-to-action-narrative",
    "heading": "关联",
    "text": "- 高效参与方案评审",
    "searchText": "焦虑转行动的叙事框架 关联 - 高效参与方案评审"
  },
  {
    "id": "content/communication/effective-participation-in-design-review::1",
    "docId": "content/communication/effective-participation-in-design-review",
    "heading": "核心结论",
    "text": "方案评审里，目标不是当场理解每一个细节，而是持续抓住主线：目标、约束、关键假设、方案取舍、风险和下一步行动。 如果因为一个细节没跟上而断开，要先判断它是主干问题还是枝节问题。主干问题当场问，枝节问题先标记，避免整场会议掉线。",
    "searchText": "高效参与方案评审 核心结论 方案评审里，目标不是当场理解每一个细节，而是持续抓住主线：目标、约束、关键假设、方案取舍、风险和下一步行动。 如果因为一个细节没跟上而断开，要先判断它是主干问题还是枝节问题。主干问题当场问，枝节问题先标记，避免整场会议掉线。"
  },
  {
    "id": "content/communication/effective-participation-in-design-review::2",
    "docId": "content/communication/effective-participation-in-design-review",
    "heading": "背景",
    "text": "方案评审通常同时消耗三类能力： - 理解方案本身的技术或业务细节。 - 跟上别人从前提到结论的推理链。 - 在有限时间内形成自己的判断并表达出来。 当会议连续发生、眼睛疲劳或大脑已经过载时，很容易因为一个细节没懂，导致后续讨论全部断开。",
    "searchText": "高效参与方案评审 背景 方案评审通常同时消耗三类能力： - 理解方案本身的技术或业务细节。 - 跟上别人从前提到结论的推理链。 - 在有限时间内形成自己的判断并表达出来。 当会议连续发生、眼睛疲劳或大脑已经过载时，很容易因为一个细节没懂，导致后续讨论全部断开。"
  },
  {
    "id": "content/communication/effective-participation-in-design-review::3",
    "docId": "content/communication/effective-participation-in-design-review",
    "heading": "跟不上细节时怎么办",
    "text": "先判断这个细节是否影响后续判断。 如果它影响主线，要当场提问。提问不等于暴露无知，真正的风险是会议结束后大家以为已经达成共识，但关键前提其实没有对齐。 适合当场问的问题： 如果它不影响主线，先快速标记，会议后再补。 会议现场优先保住主线，不要被一个枝节拖走。",
    "searchText": "高效参与方案评审 跟不上细节时怎么办 先判断这个细节是否影响后续判断。 如果它影响主线，要当场提问。提问不等于暴露无知，真正的风险是会议结束后大家以为已经达成共识，但关键前提其实没有对齐。 适合当场问的问题： 如果它不影响主线，先快速标记，会议后再补。 会议现场优先保住主线，不要被一个枝节拖走。"
  },
  {
    "id": "content/communication/effective-participation-in-design-review::4",
    "docId": "content/communication/effective-participation-in-design-review",
    "heading": "主干问题和枝节问题",
    "text": "主干问题通常包括： - 这个方案解决的到底是什么问题？ - 当前有哪些关键约束？ - 方案依赖哪些关键假设？ - 为什么选择这个方案，而不是其他方案？ - 最大风险是什么？ - 谁在什么时候做什么？ 枝节问题通常包括： - 某个局部实现细节。 - 某个术语或历史背景。 - 某个暂时不影响结论的数据口径。 - 某个可以会后单独查证的问题。 只要主干问题没有断，即使部分细节没完全跟上，也仍然可以有效参与。",
    "searchText": "高效参与方案评审 主干问题和枝节问题 主干问题通常包括： - 这个方案解决的到底是什么问题？ - 当前有哪些关键约束？ - 方案依赖哪些关键假设？ - 为什么选择这个方案，而不是其他方案？ - 最大风险是什么？ - 谁在什么时候做什么？ 枝节问题通常包括： - 某个局部实现细节。 - 某个术语或历史背景。 - 某个暂时不影响结论的数据口径。 - 某个可以会后单独查证的问题。 只要主干问题没有断，即使部分细节没完全跟上，也仍然可以有效参与。"
  },
  {
    "id": "content/communication/effective-participation-in-design-review::5",
    "docId": "content/communication/effective-participation-in-design-review",
    "heading": "当场想不清楚时怎么表达",
    "text": "不需要强行给出立刻成熟的结论，可以表达自己的判断框架和当前卡点。 成熟的表达不是永远立刻有结论，而是能说清楚自己卡在哪里、需要什么信息才能判断。",
    "searchText": "高效参与方案评审 当场想不清楚时怎么表达 不需要强行给出立刻成熟的结论，可以表达自己的判断框架和当前卡点。 成熟的表达不是永远立刻有结论，而是能说清楚自己卡在哪里、需要什么信息才能判断。"
  },
  {
    "id": "content/communication/effective-participation-in-design-review::6",
    "docId": "content/communication/effective-participation-in-design-review",
    "heading": "表达观点的结构",
    "text": "表达观点时，使用“结论、原因、风险、建议”的结构。 示例： 这个结构的好处是：有立场、有依据、有风险意识，也有下一步。",
    "searchText": "高效参与方案评审 表达观点的结构 表达观点时，使用“结论、原因、风险、建议”的结构。 示例： 这个结构的好处是：有立场、有依据、有风险意识，也有下一步。"
  },
  {
    "id": "content/communication/effective-participation-in-design-review::7",
    "docId": "content/communication/effective-participation-in-design-review",
    "heading": "更强的表达方式",
    "text": "少说抽象感受，多说判断依据。 弱表达： 强表达： 弱表达： 强表达：",
    "searchText": "高效参与方案评审 更强的表达方式 少说抽象感受，多说判断依据。 弱表达： 强表达： 弱表达： 强表达："
  },
  {
    "id": "content/communication/effective-participation-in-design-review::8",
    "docId": "content/communication/effective-participation-in-design-review",
    "heading": "会议中的最低参与框架",
    "text": "方案评审时只要持续盯住 5 个问题，就不容易掉线： 1. 这个方案解决的到底是什么问题？ 2. 有哪些关键假设？ 3. 为什么选它，不选别的？ 4. 最大风险是什么？ 5. 谁在什么时候做什么？ 如果会议后只能留下这 5 个问题的答案，也已经抓住了评审的核心。",
    "searchText": "高效参与方案评审 会议中的最低参与框架 方案评审时只要持续盯住 5 个问题，就不容易掉线： 1. 这个方案解决的到底是什么问题？ 2. 有哪些关键假设？ 3. 为什么选它，不选别的？ 4. 最大风险是什么？ 5. 谁在什么时候做什么？ 如果会议后只能留下这 5 个问题的答案，也已经抓住了评审的核心。"
  },
  {
    "id": "content/communication/effective-participation-in-design-review::9",
    "docId": "content/communication/effective-participation-in-design-review",
    "heading": "关联",
    "text": "- AI 时代技术能力地图",
    "searchText": "高效参与方案评审 关联 - ai 时代技术能力地图"
  },
  {
    "id": "content/communication/index::1",
    "docId": "content/communication/index",
    "heading": "沟通",
    "text": "沟通模块用于沉淀表达、写作、会议、反馈、谈判、协作和关系处理。",
    "searchText": "沟通 沟通 沟通模块用于沉淀表达、写作、会议、反馈、谈判、协作和关系处理。"
  },
  {
    "id": "content/communication/index::2",
    "docId": "content/communication/index",
    "heading": "会议",
    "text": "- 高效参与方案评审",
    "searchText": "沟通 会议 - 高效参与方案评审"
  },
  {
    "id": "content/communication/index::3",
    "docId": "content/communication/index",
    "heading": "章节",
    "text": "暂无更多章节。",
    "searchText": "沟通 章节 暂无更多章节。"
  },
  {
    "id": "content/general/anxiety-to-action-narrative::1",
    "docId": "content/general/anxiety-to-action-narrative",
    "heading": "核心结论",
    "text": "焦虑不一定要先被消灭，才可以开始行动。更实用的叙事是：焦虑可以存在，但它必须服务于行动；如果它不能给出下一步，就不能占用全部注意力。 关键不是“我能不能立刻平静”，而是“在焦虑存在的情况下，我还能不能推进一小步”。",
    "searchText": "焦虑转行动的叙事框架 核心结论 焦虑不一定要先被消灭，才可以开始行动。更实用的叙事是：焦虑可以存在，但它必须服务于行动；如果它不能给出下一步，就不能占用全部注意力。 关键不是“我能不能立刻平静”，而是“在焦虑存在的情况下，我还能不能推进一小步”。"
  },
  {
    "id": "content/general/anxiety-to-action-narrative::2",
    "docId": "content/general/anxiety-to-action-narrative",
    "heading": "背景",
    "text": "焦虑常常让人误以为自己正在处理问题，但很多时候只是在反复模拟风险。时间不会因为焦虑而暂停：焦虑，时间会过去；不焦虑，时间也会过去。 因此，注意力应从“如何完全不焦虑”转向“如何让这段时间留下行动痕迹”。",
    "searchText": "焦虑转行动的叙事框架 背景 焦虑常常让人误以为自己正在处理问题，但很多时候只是在反复模拟风险。时间不会因为焦虑而暂停：焦虑，时间会过去；不焦虑，时间也会过去。 因此，注意力应从“如何完全不焦虑”转向“如何让这段时间留下行动痕迹”。"
  },
  {
    "id": "content/general/anxiety-to-action-narrative::3",
    "docId": "content/general/anxiety-to-action-narrative",
    "heading": "时间叙事",
    "text": "旧叙事： 我现在状态不好，等不焦虑了再开始。 新叙事： 时间无论如何都会过去。我无法阻止时间流逝，但可以决定这段时间留下什么痕迹。 这个叙事把目标从“先恢复完美状态”改成“带着不安推进一点点”。",
    "searchText": "焦虑转行动的叙事框架 时间叙事 旧叙事： 我现在状态不好，等不焦虑了再开始。 新叙事： 时间无论如何都会过去。我无法阻止时间流逝，但可以决定这段时间留下什么痕迹。 这个叙事把目标从“先恢复完美状态”改成“带着不安推进一点点”。"
  },
  {
    "id": "content/general/anxiety-to-action-narrative::4",
    "docId": "content/general/anxiety-to-action-narrative",
    "heading": "能量叙事",
    "text": "旧叙事： 焦虑说明我不行。 新叙事： 焦虑说明我在乎某件事。它是一股没有找到出口的行动能量。 可以追问： - 这个焦虑想让我保护什么？ - 它在提醒我哪件事不能再拖？ - 我能把它转成哪个 10 分钟动作？",
    "searchText": "焦虑转行动的叙事框架 能量叙事 旧叙事： 焦虑说明我不行。 新叙事： 焦虑说明我在乎某件事。它是一股没有找到出口的行动能量。 可以追问： - 这个焦虑想让我保护什么？ - 它在提醒我哪件事不能再拖？ - 我能把它转成哪个 10 分钟动作？"
  },
  {
    "id": "content/general/anxiety-to-action-narrative::5",
    "docId": "content/general/anxiety-to-action-narrative",
    "heading": "行动叙事",
    "text": "旧叙事： 我得先把心情调整好，才能工作。 新叙事： 行动不是好心情的结果，行动也是重建心情的手段。 焦虑时不需要先完成全局任务，只需要启动一个小到无法拒绝的动作。",
    "searchText": "焦虑转行动的叙事框架 行动叙事 旧叙事： 我得先把心情调整好，才能工作。 新叙事： 行动不是好心情的结果，行动也是重建心情的手段。 焦虑时不需要先完成全局任务，只需要启动一个小到无法拒绝的动作。"
  },
  {
    "id": "content/general/anxiety-to-action-narrative::6",
    "docId": "content/general/anxiety-to-action-narrative",
    "heading": "旁观者叙事",
    "text": "旧叙事： 我很焦虑。 新叙事： 我注意到，身体里正在出现焦虑。大脑正在预测危险。这是一个信号，不是命令。 这个改写能把自己从情绪中抽离出来。焦虑可以被看见，但不必由它来做决定。",
    "searchText": "焦虑转行动的叙事框架 旁观者叙事 旧叙事： 我很焦虑。 新叙事： 我注意到，身体里正在出现焦虑。大脑正在预测危险。这是一个信号，不是命令。 这个改写能把自己从情绪中抽离出来。焦虑可以被看见，但不必由它来做决定。"
  },
  {
    "id": "content/general/anxiety-to-action-narrative::7",
    "docId": "content/general/anxiety-to-action-narrative",
    "heading": "成本叙事",
    "text": "旧叙事： 我得继续想清楚，否则不安全。 新叙事： 焦虑如果不能帮我决策、完成任务或给出下一步，就不能继续占用全部注意力。 焦虑可以提醒风险，但不能替代行动。否则它只是在消耗注意力。",
    "searchText": "焦虑转行动的叙事框架 成本叙事 旧叙事： 我得继续想清楚，否则不安全。 新叙事： 焦虑如果不能帮我决策、完成任务或给出下一步，就不能继续占用全部注意力。 焦虑可以提醒风险，但不能替代行动。否则它只是在消耗注意力。"
  },
  {
    "id": "content/general/anxiety-to-action-narrative::8",
    "docId": "content/general/anxiety-to-action-narrative",
    "heading": "降损叙事",
    "text": "旧叙事： 今天必须彻底振作、彻底高效。 新叙事： 今天不需要完美翻盘，只需要不要把局面交给惯性。 焦虑强的时候，目标可以降到： - 做 20 分钟。 - 写 100 字。 - 处理 1 个最小任务。 - 发出一个粗糙版本。 - 把问题列清楚。",
    "searchText": "焦虑转行动的叙事框架 降损叙事 旧叙事： 今天必须彻底振作、彻底高效。 新叙事： 今天不需要完美翻盘，只需要不要把局面交给惯性。 焦虑强的时候，目标可以降到： - 做 20 分钟。 - 写 100 字。 - 处理 1 个最小任务。 - 发出一个粗糙版本。 - 把问题列清楚。"
  },
  {
    "id": "content/general/anxiety-to-action-narrative::9",
    "docId": "content/general/anxiety-to-action-narrative",
    "heading": "可直接使用的自我对话",
    "text": "我现在焦虑，说明我在乎。 但焦虑不是行动本身。 时间无论如何都会过去。 我不要求自己马上平静，只要求自己做一个 10 分钟动作。 做完以后，再重新判断。",
    "searchText": "焦虑转行动的叙事框架 可直接使用的自我对话 我现在焦虑，说明我在乎。 但焦虑不是行动本身。 时间无论如何都会过去。 我不要求自己马上平静，只要求自己做一个 10 分钟动作。 做完以后，再重新判断。"
  },
  {
    "id": "content/general/anxiety-to-action-narrative::10",
    "docId": "content/general/anxiety-to-action-narrative",
    "heading": "例子",
    "text": "- 焦虑“工作做不完”：列出今天唯一最重要的一件事，然后只做第一个 10 分钟动作。 - 焦虑“别人评价我”：先发出一个不完美版本，把反馈变成下一轮输入。 - 焦虑“未来不确定”：设计一个可逆的小实验，而不是试图一次想出终局答案。",
    "searchText": "焦虑转行动的叙事框架 例子 - 焦虑“工作做不完”：列出今天唯一最重要的一件事，然后只做第一个 10 分钟动作。 - 焦虑“别人评价我”：先发出一个不完美版本，把反馈变成下一轮输入。 - 焦虑“未来不确定”：设计一个可逆的小实验，而不是试图一次想出终局答案。"
  },
  {
    "id": "content/general/anxiety-to-action-narrative::11",
    "docId": "content/general/anxiety-to-action-narrative",
    "heading": "使用边界",
    "text": "这套框架适合处理日常焦虑、拖延和工作状态波动。如果焦虑持续影响睡眠、饮食、工作、人际关系，或出现自伤念头，应优先寻求专业帮助。",
    "searchText": "焦虑转行动的叙事框架 使用边界 这套框架适合处理日常焦虑、拖延和工作状态波动。如果焦虑持续影响睡眠、饮食、工作、人际关系，或出现自伤念头，应优先寻求专业帮助。"
  },
  {
    "id": "content/general/anxiety-to-action-narrative::12",
    "docId": "content/general/anxiety-to-action-narrative",
    "heading": "关联",
    "text": "- 高效参与方案评审",
    "searchText": "焦虑转行动的叙事框架 关联 - 高效参与方案评审"
  },
  {
    "id": "content/general/index::1",
    "docId": "content/general/index",
    "heading": "通用",
    "text": "通用模块用于沉淀暂不归入专业模块、但可复用的个人管理、思维框架和日常实践。",
    "searchText": "通用 通用 通用模块用于沉淀暂不归入专业模块、但可复用的个人管理、思维框架和日常实践。"
  },
  {
    "id": "content/general/index::2",
    "docId": "content/general/index",
    "heading": "自我管理",
    "text": "- 焦虑转行动的叙事框架",
    "searchText": "通用 自我管理 - 焦虑转行动的叙事框架"
  },
  {
    "id": "content/general/index::3",
    "docId": "content/general/index",
    "heading": "章节",
    "text": "暂无更多章节。",
    "searchText": "通用 章节 暂无更多章节。"
  },
  {
    "id": "content/tech/ai/index::1",
    "docId": "content/tech/ai/index",
    "heading": "AI",
    "text": "AI 工程、Prompt、RAG、Agent、模型评估、上下文管理和 AI 应用架构。",
    "searchText": "ai ai ai 工程、prompt、rag、agent、模型评估、上下文管理和 ai 应用架构。"
  },
  {
    "id": "content/tech/ai/index::2",
    "docId": "content/tech/ai/index",
    "heading": "笔记",
    "text": "- Superpowers 到 Codex 的子 agent 编排链路",
    "searchText": "ai 笔记 - superpowers 到 codex 的子 agent 编排链路"
  },
  {
    "id": "content/tech/ai/superpowers-to-codex-subagent-workflow::1",
    "docId": "content/tech/ai/superpowers-to-codex-subagent-workflow",
    "heading": "核心结论",
    "text": "Superpowers 不是子 agent runtime。它主要提供 workflow spec、prompt template 和跨平台工具映射；真正创建、并发执行、等待、继续和关闭子 agent 的能力来自 Codex runtime。 可以把职责分成三层：",
    "searchText": "superpowers 到 codex 的子 agent 编排链路 核心结论 superpowers 不是子 agent runtime。它主要提供 workflow spec、prompt template 和跨平台工具映射；真正创建、并发执行、等待、继续和关闭子 agent 的能力来自 codex runtime。 可以把职责分成三层："
  },
  {
    "id": "content/tech/ai/superpowers-to-codex-subagent-workflow::2",
    "docId": "content/tech/ai/superpowers-to-codex-subagent-workflow",
    "heading": "背景",
    "text": "Superpowers 的 subagent 工作流常见于两类场景： - dispatching-parallel-agents：把多个独立问题拆给多个子 agent 并行探索或修复。 - subagent-driven-development：按计划逐个任务派发 implementer，再派 spec reviewer 和 code quality reviewer 做两阶段验收。 这些 skill 文件本身是 Markdown 说明和 prompt 模板，不是后台调度器。它们告诉主 agent 什么时候派发、怎样写子任务、怎样审查结果，以及什么时候继续或回退。",
    "searchText": "superpowers 到 codex 的子 agent 编排链路 背景 superpowers 的 subagent 工作流常见于两类场景： - dispatching-parallel-agents：把多个独立问题拆给多个子 agent 并行探索或修复。 - subagent-driven-development：按计划逐个任务派发 implementer，再派 spec reviewer 和 code quality reviewer 做两阶段验收。 这些 skill 文件本身是 markdown 说明和 prompt 模板，不是后台调度器。它们告诉主 agent 什么时候派发、怎样写子任务、怎样审查结果，以及什么时候继续或回退。"
  },
  {
    "id": "content/tech/ai/superpowers-to-codex-subagent-workflow::3",
    "docId": "content/tech/ai/superpowers-to-codex-subagent-workflow",
    "heading": "从 Superpowers 到 Codex 的映射",
    "text": "Superpowers 原始说明常用 Claude Code 的 Task 表达“派发子 agent”。在 Codex 环境里，工具映射大致是： 因此，Superpowers 看到“dispatch subagent”时，在 Codex 中实际落到这些 runtime 工具： - spawnagent：创建一个独立 agent thread，返回 agent id。 - waitagent：等待一个或多个 agent 完成，并返回 final message/status。 - sendinput：给已有 agent 追加指令，或打断当前任务。 - closeagent：关闭已完成或不再需要的 agent thread，释放并发槽。",
    "searchText": "superpowers 到 codex 的子 agent 编排链路 从 superpowers 到 codex 的映射 superpowers 原始说明常用 claude code 的 task 表达“派发子 agent”。在 codex 环境里，工具映射大致是： 因此，superpowers 看到“dispatch subagent”时，在 codex 中实际落到这些 runtime 工具： - spawnagent：创建一个独立 agent thread，返回 agent id。 - waitagent：等待一个或多个 agent 完成，并返回 final message/status。 - sendinput：给已有 agent 追加指令，或打断当前任务。 - closeagent：关闭已完成或不再需要的 agent thread，释放并发槽。"
  },
  {
    "id": "content/tech/ai/superpowers-to-codex-subagent-workflow::4",
    "docId": "content/tech/ai/superpowers-to-codex-subagent-workflow",
    "heading": "执行链路",
    "text": "一次典型链路是： 这里的“监听”不是 Superpowers 自己开线程监听。更准确地说，Codex runtime 维护 agent id 到状态和结果的映射；主 agent 需要结果时调用 waitagent，由 runtime 挂起等待或返回已完成结果。",
    "searchText": "superpowers 到 codex 的子 agent 编排链路 执行链路 一次典型链路是： 这里的“监听”不是 superpowers 自己开线程监听。更准确地说，codex runtime 维护 agent id 到状态和结果的映射；主 agent 需要结果时调用 waitagent，由 runtime 挂起等待或返回已完成结果。"
  },
  {
    "id": "content/tech/ai/superpowers-to-codex-subagent-workflow::5",
    "docId": "content/tech/ai/superpowers-to-codex-subagent-workflow",
    "heading": "子 agent 是什么",
    "text": "Codex 文档使用的是 agent thread 这个产品抽象。它不是对操作系统 thread/process 的公开承诺。 可以确定的语义是： - 每个子 agent 有独立的 prompt / message history。 - 每个子 agent 有自己的模型调用循环和工具调用流。 - 子 agent 继承父会话的 sandbox 和 approval policy。 - CLI 中可以通过 /agent 查看或切换 active agent threads。 - 多个 agent 可以并行运行，但并行写同一批文件会带来冲突风险。 不能确定的是： - 一个子 agent 是否对应一个 OS process。 - 一个子 agent 是否对应一个 OS thread。 - CLI、App、Cloud、app-server 是否使用完全相同的底层实现。 稳定可依赖的抽象是 agent thread，不是进程或线程模型。",
    "searchText": "superpowers 到 codex 的子 agent 编排链路 子 agent 是什么 codex 文档使用的是 agent thread 这个产品抽象。它不是对操作系统 thread/process 的公开承诺。 可以确定的语义是： - 每个子 agent 有独立的 prompt / message history。 - 每个子 agent 有自己的模型调用循环和工具调用流。 - 子 agent 继承父会话的 sandbox 和 approval policy。 - cli 中可以通过 /agent 查看或切换 active agent threads。 - 多个 agent 可以并行运行，但并行写同一批文件会带来冲突风险。 不能确定的是： - 一个子 agent 是否对应一个 os process。 - 一个子 agent 是否对应一个 os thread。 - cli、app、cloud、app-server 是否使用完全相同的底层实现。 稳定可依赖的抽象是 agent thread，不是进程或线程模型。"
  },
  {
    "id": "content/tech/ai/superpowers-to-codex-subagent-workflow::6",
    "docId": "content/tech/ai/superpowers-to-codex-subagent-workflow",
    "heading": "回调模型",
    "text": "Codex 的子 agent 结果回传更像异步任务状态机制，而不是传统代码里的 callback function： 伪代码可以理解为： scheduler.runInBackground 内部可能是 async task、worker thread、独立进程、远端 job 或混合实现。公开语义不要求用户知道这一层。",
    "searchText": "superpowers 到 codex 的子 agent 编排链路 回调模型 codex 的子 agent 结果回传更像异步任务状态机制，而不是传统代码里的 callback function： 伪代码可以理解为： scheduler.runinbackground 内部可能是 async task、worker thread、独立进程、远端 job 或混合实现。公开语义不要求用户知道这一层。"
  },
  {
    "id": "content/tech/ai/superpowers-to-codex-subagent-workflow::7",
    "docId": "content/tech/ai/superpowers-to-codex-subagent-workflow",
    "heading": "Superpowers 的价值",
    "text": "Superpowers 的价值不是“实现了子 agent”，而是把子 agent 的使用标准化： - 什么时候值得拆成子 agent。 - 怎样保证子任务边界清晰。 - 怎样避免主会话被中间日志和探索过程污染。 - 怎样给子 agent 足够上下文，但不继承整段会话噪音。 - 怎样做 spec compliance review 和 code quality review。 - 怎样处理 DONE、DONEWITHCONCERNS、NEEDSCONTEXT、BLOCKED。 - 怎样避免多个子 agent 同时改同一批文件。 换句话说：",
    "searchText": "superpowers 到 codex 的子 agent 编排链路 superpowers 的价值 superpowers 的价值不是“实现了子 agent”，而是把子 agent 的使用标准化： - 什么时候值得拆成子 agent。 - 怎样保证子任务边界清晰。 - 怎样避免主会话被中间日志和探索过程污染。 - 怎样给子 agent 足够上下文，但不继承整段会话噪音。 - 怎样做 spec compliance review 和 code quality review。 - 怎样处理 done、donewithconcerns、needscontext、blocked。 - 怎样避免多个子 agent 同时改同一批文件。 换句话说："
  },
  {
    "id": "content/tech/ai/superpowers-to-codex-subagent-workflow::8",
    "docId": "content/tech/ai/superpowers-to-codex-subagent-workflow",
    "heading": "实践判断",
    "text": "适合用子 agent 的任务： - 多个独立问题可以并行探索。 - 多个测试失败属于不同模块。 - 需要一个 reviewer 从新上下文审查实现。 - 需要把 noisy 的日志分析、代码搜索、长文档总结移出主会话。 不适合用子 agent 的任务： - 根因高度相关，必须整体理解。 - 下一步马上依赖该结果，派发只会增加等待。 - 多个 agent 会写同一批文件。 - 任务边界不清，子 agent 只能猜。",
    "searchText": "superpowers 到 codex 的子 agent 编排链路 实践判断 适合用子 agent 的任务： - 多个独立问题可以并行探索。 - 多个测试失败属于不同模块。 - 需要一个 reviewer 从新上下文审查实现。 - 需要把 noisy 的日志分析、代码搜索、长文档总结移出主会话。 不适合用子 agent 的任务： - 根因高度相关，必须整体理解。 - 下一步马上依赖该结果，派发只会增加等待。 - 多个 agent 会写同一批文件。 - 任务边界不清，子 agent 只能猜。"
  },
  {
    "id": "content/tech/ai/superpowers-to-codex-subagent-workflow::9",
    "docId": "content/tech/ai/superpowers-to-codex-subagent-workflow",
    "heading": "关联",
    "text": "- AI",
    "searchText": "superpowers 到 codex 的子 agent 编排链路 关联 - ai"
  },
  {
    "id": "content/tech/architecture/index::1",
    "docId": "content/tech/architecture/index",
    "heading": "架构与系统设计",
    "text": "系统设计、架构取舍、模块边界、可靠性、可扩展性和演进路径。",
    "searchText": "架构与系统设计 架构与系统设计 系统设计、架构取舍、模块边界、可靠性、可扩展性和演进路径。"
  },
  {
    "id": "content/tech/architecture/index::2",
    "docId": "content/tech/architecture/index",
    "heading": "章节",
    "text": "- 什么是架构",
    "searchText": "架构与系统设计 章节 - 什么是架构"
  },
  {
    "id": "content/tech/architecture/what-is-architecture::1",
    "docId": "content/tech/architecture/what-is-architecture",
    "heading": "核心结论",
    "text": "架构是在约束下组织系统的方式。 它不是画几张图，也不是用了微服务、消息队列、Redis、Kubernetes 就叫有架构。架构真正关心的是：系统如何拆分、模块如何协作、数据如何流动、状态放在哪里、出错时怎么处理，以及未来变化时哪里容易改、哪里会很痛。 一句话总结： 架构是把业务需求、技术约束、团队能力和未来变化组织成一个可运行、可维护、可演进的系统结构。",
    "searchText": "什么是架构 核心结论 架构是在约束下组织系统的方式。 它不是画几张图，也不是用了微服务、消息队列、redis、kubernetes 就叫有架构。架构真正关心的是：系统如何拆分、模块如何协作、数据如何流动、状态放在哪里、出错时怎么处理，以及未来变化时哪里容易改、哪里会很痛。 一句话总结： 架构是把业务需求、技术约束、团队能力和未来变化组织成一个可运行、可维护、可演进的系统结构。"
  },
  {
    "id": "content/tech/architecture/what-is-architecture::2",
    "docId": "content/tech/architecture/what-is-architecture",
    "heading": "背景",
    "text": "在 AI 时代，AI 会越来越擅长生成代码，但人仍然需要判断： - 该写什么？ - 系统应该如何组织？ - 当前复杂度是否值得？ - 出问题时如何定位和恢复？ - 未来需求变化时，哪些地方会成为阻力？ 所以架构能力不是“选择高级技术”，而是做合理取舍。",
    "searchText": "什么是架构 背景 在 ai 时代，ai 会越来越擅长生成代码，但人仍然需要判断： - 该写什么？ - 系统应该如何组织？ - 当前复杂度是否值得？ - 出问题时如何定位和恢复？ - 未来需求变化时，哪些地方会成为阻力？ 所以架构能力不是“选择高级技术”，而是做合理取舍。"
  },
  {
    "id": "content/tech/architecture/what-is-architecture::3",
    "docId": "content/tech/architecture/what-is-architecture",
    "heading": "内容",
    "text": "架构主要关注四件事。",
    "searchText": "什么是架构 内容 架构主要关注四件事。"
  },
  {
    "id": "content/tech/architecture/what-is-architecture::4",
    "docId": "content/tech/architecture/what-is-architecture",
    "heading": "边界",
    "text": "边界回答：系统分成哪些模块，什么归谁管。 这里的能力可以是用户登录、内容发布、搜索、支付、通知、权限校验、索引更新等业务或系统职责。 典型问题： - 哪些能力应该放在同一个模块？ - 哪些能力应该拆开？ - 模块之间是否有清晰职责？ - 一个模块是否承担了太多事情？",
    "searchText": "什么是架构 边界 边界回答：系统分成哪些模块，什么归谁管。 这里的能力可以是用户登录、内容发布、搜索、支付、通知、权限校验、索引更新等业务或系统职责。 典型问题： - 哪些能力应该放在同一个模块？ - 哪些能力应该拆开？ - 模块之间是否有清晰职责？ - 一个模块是否承担了太多事情？"
  },
  {
    "id": "content/tech/architecture/what-is-architecture::5",
    "docId": "content/tech/architecture/what-is-architecture",
    "heading": "关系",
    "text": "关系回答：模块之间怎么通信，谁依赖谁。 典型问题： - 是直接调用，还是通过事件、队列、消息？ - 依赖方向是否清晰？ - 一个模块变化是否会影响很多地方？ - 是否存在循环依赖？",
    "searchText": "什么是架构 关系 关系回答：模块之间怎么通信，谁依赖谁。 典型问题： - 是直接调用，还是通过事件、队列、消息？ - 依赖方向是否清晰？ - 一个模块变化是否会影响很多地方？ - 是否存在循环依赖？"
  },
  {
    "id": "content/tech/architecture/what-is-architecture::6",
    "docId": "content/tech/architecture/what-is-architecture",
    "heading": "数据",
    "text": "数据回答：数据怎么存、怎么流、怎么保持一致。 典型问题： - 数据源头在哪里？ - 状态应该放在客户端、服务端、数据库还是缓存？ - 数据更新后，其他模块如何感知？ - 是否需要强一致，还是最终一致就够？",
    "searchText": "什么是架构 数据 数据回答：数据怎么存、怎么流、怎么保持一致。 典型问题： - 数据源头在哪里？ - 状态应该放在客户端、服务端、数据库还是缓存？ - 数据更新后，其他模块如何感知？ - 是否需要强一致，还是最终一致就够？"
  },
  {
    "id": "content/tech/architecture/what-is-architecture::7",
    "docId": "content/tech/architecture/what-is-architecture",
    "heading": "取舍",
    "text": "取舍回答：为了性能、成本、维护性、扩展性，牺牲了什么。 典型问题： - 当前阶段需要这个复杂度吗？ - 简单方案能撑多久？ - 引入新组件会增加多少维护成本？ - 这个设计未来最难改的地方是什么？",
    "searchText": "什么是架构 取舍 取舍回答：为了性能、成本、维护性、扩展性，牺牲了什么。 典型问题： - 当前阶段需要这个复杂度吗？ - 简单方案能撑多久？ - 引入新组件会增加多少维护成本？ - 这个设计未来最难改的地方是什么？"
  },
  {
    "id": "content/tech/architecture/what-is-architecture::8",
    "docId": "content/tech/architecture/what-is-architecture",
    "heading": "例子",
    "text": "假设要做一个知识库系统。 最简单的实现可以是： 这在早期可能完全够用。 但开始考虑下面这些问题时，就进入了架构设计： - 内容如何分类？ - 使用 Markdown 文件还是数据库？ - 是否需要全文搜索？ - 是否需要 AI 检索？ - 搜索索引用什么生成？ - 内容更新后如何同步索引？ - 未来要不要做网页目录？ 不同方案有不同取舍。",
    "searchText": "什么是架构 例子 假设要做一个知识库系统。 最简单的实现可以是： 这在早期可能完全够用。 但开始考虑下面这些问题时，就进入了架构设计： - 内容如何分类？ - 使用 markdown 文件还是数据库？ - 是否需要全文搜索？ - 是否需要 ai 检索？ - 搜索索引用什么生成？ - 内容更新后如何同步索引？ - 未来要不要做网页目录？ 不同方案有不同取舍。"
  },
  {
    "id": "content/tech/architecture/what-is-architecture::9",
    "docId": "content/tech/architecture/what-is-architecture",
    "heading": "Markdown 文件",
    "text": "优点： - 简单。 - 可读。 - Git 友好。 - 适合个人知识库。 缺点： - 复杂查询能力弱。 - 多人协作时可能出现冲突。",
    "searchText": "什么是架构 markdown 文件 优点： - 简单。 - 可读。 - git 友好。 - 适合个人知识库。 缺点： - 复杂查询能力弱。 - 多人协作时可能出现冲突。"
  },
  {
    "id": "content/tech/architecture/what-is-architecture::10",
    "docId": "content/tech/architecture/what-is-architecture",
    "heading": "数据库",
    "text": "优点： - 查询能力强。 - 适合动态系统。 - 适合复杂权限、状态和多用户协作。 缺点： - 维护成本更高。 - 不如 Markdown 直观。 - 和 Git 的结合较弱。",
    "searchText": "什么是架构 数据库 优点： - 查询能力强。 - 适合动态系统。 - 适合复杂权限、状态和多用户协作。 缺点： - 维护成本更高。 - 不如 markdown 直观。 - 和 git 的结合较弱。"
  },
  {
    "id": "content/tech/architecture/what-is-architecture::11",
    "docId": "content/tech/architecture/what-is-architecture",
    "heading": "向量数据库",
    "text": "优点： - 适合语义搜索。 - 适合 RAG 场景。 缺点： - 引入额外复杂度。 - 需要考虑切分、嵌入、更新、评估。 - 早期可能是过度设计。",
    "searchText": "什么是架构 向量数据库 优点： - 适合语义搜索。 - 适合 rag 场景。 缺点： - 引入额外复杂度。 - 需要考虑切分、嵌入、更新、评估。 - 早期可能是过度设计。"
  },
  {
    "id": "content/tech/architecture/what-is-architecture::12",
    "docId": "content/tech/architecture/what-is-architecture",
    "heading": "判断标准",
    "text": "判断一个架构好不好，不是看它高级不高级，而是看它是否匹配当前阶段。 小项目更需要： - 简单。 - 清晰。 - 容易修改。 增长期系统更需要： - 边界清楚。 - 数据一致。 - 可观测。 - 可扩展。 生产系统必须考虑： - 可靠性。 - 降级。 - 回滚。 - 监控。 - 故障恢复。",
    "searchText": "什么是架构 判断标准 判断一个架构好不好，不是看它高级不高级，而是看它是否匹配当前阶段。 小项目更需要： - 简单。 - 清晰。 - 容易修改。 增长期系统更需要： - 边界清楚。 - 数据一致。 - 可观测。 - 可扩展。 生产系统必须考虑： - 可靠性。 - 降级。 - 回滚。 - 监控。 - 故障恢复。"
  },
  {
    "id": "content/tech/architecture/what-is-architecture::13",
    "docId": "content/tech/architecture/what-is-architecture",
    "heading": "关联",
    "text": "- 架构与系统设计 - AI 时代技术能力地图",
    "searchText": "什么是架构 关联 - 架构与系统设计 - ai 时代技术能力地图"
  },
  {
    "id": "content/tech/backend/index::1",
    "docId": "content/tech/backend/index",
    "heading": "后端",
    "text": "API、服务、认证授权、队列、后台任务、服务边界和集成模式。",
    "searchText": "后端 后端 api、服务、认证授权、队列、后台任务、服务边界和集成模式。"
  },
  {
    "id": "content/tech/backend/index::2",
    "docId": "content/tech/backend/index",
    "heading": "章节",
    "text": "暂无。",
    "searchText": "后端 章节 暂无。"
  },
  {
    "id": "content/tech/database/index::1",
    "docId": "content/tech/database/index",
    "heading": "数据库与存储",
    "text": "数据库、事务、索引、缓存、数据建模、查询优化和一致性。",
    "searchText": "数据库与存储 数据库与存储 数据库、事务、索引、缓存、数据建模、查询优化和一致性。"
  },
  {
    "id": "content/tech/database/index::2",
    "docId": "content/tech/database/index",
    "heading": "章节",
    "text": "暂无。",
    "searchText": "数据库与存储 章节 暂无。"
  },
  {
    "id": "content/tech/engineering/index::1",
    "docId": "content/tech/engineering/index",
    "heading": "工程实践",
    "text": "测试、调试、代码审查、重构、可维护性、可观测性和交付质量。",
    "searchText": "工程实践 工程实践 测试、调试、代码审查、重构、可维护性、可观测性和交付质量。"
  },
  {
    "id": "content/tech/engineering/index::2",
    "docId": "content/tech/engineering/index",
    "heading": "章节",
    "text": "暂无。",
    "searchText": "工程实践 章节 暂无。"
  },
  {
    "id": "content/tech/frontend/index::1",
    "docId": "content/tech/frontend/index",
    "heading": "前端",
    "text": "浏览器、UI 工程、前端架构、状态管理、渲染、可访问性和性能。",
    "searchText": "前端 前端 浏览器、ui 工程、前端架构、状态管理、渲染、可访问性和性能。"
  },
  {
    "id": "content/tech/frontend/index::2",
    "docId": "content/tech/frontend/index",
    "heading": "章节",
    "text": "暂无。",
    "searchText": "前端 章节 暂无。"
  },
  {
    "id": "content/tech/incidents/index::1",
    "docId": "content/tech/incidents/index",
    "heading": "故障与复盘",
    "text": "Bug、故障、排查记录、复盘、性能问题和从失败中沉淀的预防经验。",
    "searchText": "故障与复盘 故障与复盘 bug、故障、排查记录、复盘、性能问题和从失败中沉淀的预防经验。"
  },
  {
    "id": "content/tech/incidents/index::2",
    "docId": "content/tech/incidents/index",
    "heading": "常见排查思路",
    "text": "排查故障时先收敛事实，再扩大假设范围，避免一开始就陷入猜测。 - 确认影响面：哪些用户、接口、任务、地域或版本受影响，是否仍在扩大。 - 对齐时间线：记录首次告警、变更发布时间、流量变化、依赖异常和恢复动作。 - 观察关键指标：错误率、延迟、吞吐、资源使用率、队列积压、重试量和下游依赖状态。 - 检查最近变更：代码发布、配置调整、数据迁移、权限变更、容量调整和第三方服务变更。 - 缩小问题范围：按环境、版本、租户、请求类型、数据特征或依赖链路逐步切分。 - 验证假设：每次只改变一个变量，用日志、指标、追踪或复现实验确认结论。 - 优先止血：在根因未完全确认前，可以先降级、回滚、限流、切流或暂停高风险任务。 - 复盘沉淀：补充监控告警、操作手册、自动化校验和预防性测试，避免同类问题重复发生。",
    "searchText": "故障与复盘 常见排查思路 排查故障时先收敛事实，再扩大假设范围，避免一开始就陷入猜测。 - 确认影响面：哪些用户、接口、任务、地域或版本受影响，是否仍在扩大。 - 对齐时间线：记录首次告警、变更发布时间、流量变化、依赖异常和恢复动作。 - 观察关键指标：错误率、延迟、吞吐、资源使用率、队列积压、重试量和下游依赖状态。 - 检查最近变更：代码发布、配置调整、数据迁移、权限变更、容量调整和第三方服务变更。 - 缩小问题范围：按环境、版本、租户、请求类型、数据特征或依赖链路逐步切分。 - 验证假设：每次只改变一个变量，用日志、指标、追踪或复现实验确认结论。 - 优先止血：在根因未完全确认前，可以先降级、回滚、限流、切流或暂停高风险任务。 - 复盘沉淀：补充监控告警、操作手册、自动化校验和预防性测试，避免同类问题重复发生。"
  },
  {
    "id": "content/tech/index::1",
    "docId": "content/tech/index",
    "heading": "技术",
    "text": "技术模块用于沉淀 AI 工程、架构与系统设计、工程实践、数据库、前端、后端、工具效率和故障复盘。",
    "searchText": "技术 技术 技术模块用于沉淀 ai 工程、架构与系统设计、工程实践、数据库、前端、后端、工具效率和故障复盘。"
  },
  {
    "id": "content/tech/index::2",
    "docId": "content/tech/index",
    "heading": "章节",
    "text": "- AI - 架构与系统设计 - 工程实践 - 数据库与存储 - 前端 - 后端 - 工具与效率 - 故障与复盘",
    "searchText": "技术 章节 - ai - 架构与系统设计 - 工程实践 - 数据库与存储 - 前端 - 后端 - 工具与效率 - 故障与复盘"
  },
  {
    "id": "content/tech/tools/index::1",
    "docId": "content/tech/tools/index",
    "heading": "工具与效率",
    "text": "开发工具、Git、CI/CD、编辑器工作流、命令行效率、自动化和本地开发环境。",
    "searchText": "工具与效率 工具与效率 开发工具、git、ci/cd、编辑器工作流、命令行效率、自动化和本地开发环境。"
  },
  {
    "id": "content/tech/tools/index::2",
    "docId": "content/tech/tools/index",
    "heading": "笔记",
    "text": "- 知识库使用与反馈流程",
    "searchText": "工具与效率 笔记 - 知识库使用与反馈流程"
  },
  {
    "id": "content/tech/tools/knowledge-base-workflow::1",
    "docId": "content/tech/tools/knowledge-base-workflow",
    "heading": "核心结论",
    "text": "当前知识库是一个基于 Markdown、GitHub 和静态前端的个人知识系统。 内容存储在 Git 仓库中，网页端通过构建脚本生成搜索索引和导航数据；读者可以搜索知识、查看相关知识、在文章底部评论，也可以对整篇文章、某个段落或选中文字提交 GitHub Issue 反馈。 这个设计把不同类型的互动分开： - 普通讨论走 GitHub Discussions / giscus。 - 内容缺失、错误、过时等可处理反馈走 GitHub Issues。 - 内容修复仍然通过 Pull Request 和 review 合并。",
    "searchText": "知识库使用与反馈流程 核心结论 当前知识库是一个基于 markdown、github 和静态前端的个人知识系统。 内容存储在 git 仓库中，网页端通过构建脚本生成搜索索引和导航数据；读者可以搜索知识、查看相关知识、在文章底部评论，也可以对整篇文章、某个段落或选中文字提交 github issue 反馈。 这个设计把不同类型的互动分开： - 普通讨论走 github discussions / giscus。 - 内容缺失、错误、过时等可处理反馈走 github issues。 - 内容修复仍然通过 pull request 和 review 合并。"
  },
  {
    "id": "content/tech/tools/knowledge-base-workflow::2",
    "docId": "content/tech/tools/knowledge-base-workflow",
    "heading": "存储结构",
    "text": "知识内容以 Markdown 文件存储在仓库中。 主要目录： 内容组织采用两层分类： 例如： 表示： - module：tech - section：tools - note：knowledge-base-workflow 新增笔记时，需要同步更新对应章节的 index.md，让网页导航能展示出来。",
    "searchText": "知识库使用与反馈流程 存储结构 知识内容以 markdown 文件存储在仓库中。 主要目录： 内容组织采用两层分类： 例如： 表示： - module：tech - section：tools - note：knowledge-base-workflow 新增笔记时，需要同步更新对应章节的 index.md，让网页导航能展示出来。"
  },
  {
    "id": "content/tech/tools/knowledge-base-workflow::3",
    "docId": "content/tech/tools/knowledge-base-workflow",
    "heading": "构建流程",
    "text": "网页端在构建时读取 Markdown 内容，并生成静态数据文件： 构建命令： 测试命令： 构建不会把评论或反馈写回 Markdown。评论和反馈分别存储在 GitHub Discussions 和 GitHub Issues 中。",
    "searchText": "知识库使用与反馈流程 构建流程 网页端在构建时读取 markdown 内容，并生成静态数据文件： 构建命令： 测试命令： 构建不会把评论或反馈写回 markdown。评论和反馈分别存储在 github discussions 和 github issues 中。"
  },
  {
    "id": "content/tech/tools/knowledge-base-workflow::4",
    "docId": "content/tech/tools/knowledge-base-workflow",
    "heading": "如何搜索知识",
    "text": "网页顶部提供全文搜索。 搜索数据来自每篇文档的： - 标题 - 文件路径 - 模块和章节名 - tags - Markdown 正文 - 按标题切分的正文 chunk 搜索逻辑在： 搜索结果会显示： - 匹配文档标题 - 所属模块和章节 - 命中的正文片段 - 匹配关键词高亮 文章内选中文字时，也会触发一次本地搜索，用选中的文本查找相关知识点。",
    "searchText": "知识库使用与反馈流程 如何搜索知识 网页顶部提供全文搜索。 搜索数据来自每篇文档的： - 标题 - 文件路径 - 模块和章节名 - tags - markdown 正文 - 按标题切分的正文 chunk 搜索逻辑在： 搜索结果会显示： - 匹配文档标题 - 所属模块和章节 - 命中的正文片段 - 匹配关键词高亮 文章内选中文字时，也会触发一次本地搜索，用选中的文本查找相关知识点。"
  },
  {
    "id": "content/tech/tools/knowledge-base-workflow::5",
    "docId": "content/tech/tools/knowledge-base-workflow",
    "heading": "如何关联知识",
    "text": "知识关联分两类：手动关联和运行时自动关联。",
    "searchText": "知识库使用与反馈流程 如何关联知识 知识关联分两类：手动关联和运行时自动关联。"
  },
  {
    "id": "content/tech/tools/knowledge-base-workflow::6",
    "docId": "content/tech/tools/knowledge-base-workflow",
    "heading": "手动关联",
    "text": "在 Markdown 文章末尾添加 ## 关联 章节： ```markdown",
    "searchText": "知识库使用与反馈流程 手动关联 在 markdown 文章末尾添加 ## 关联 章节： ```markdown"
  },
  {
    "id": "content/tech/tools/knowledge-base-workflow::7",
    "docId": "content/tech/tools/knowledge-base-workflow",
    "heading": "关联",
    "text": "- AI - 工具与效率 ``` 手动关联优先级最高。网页端会解析这些链接，并优先展示到文章底部的“相关知识”区域。",
    "searchText": "知识库使用与反馈流程 关联 - ai - 工具与效率 ``` 手动关联优先级最高。网页端会解析这些链接，并优先展示到文章底部的“相关知识”区域。"
  },
  {
    "id": "content/tech/tools/knowledge-base-workflow::8",
    "docId": "content/tech/tools/knowledge-base-workflow",
    "heading": "运行时自动关联",
    "text": "如果手动关联不足，前端会基于当前文档自动补充相关内容。 自动关联会参考： - title - tags - 二级和三级标题 - 正文中的问题式句子 - 本地搜索结果 自动关联在浏览器运行时计算，不再依赖构建期生成的 relatedDocIds。",
    "searchText": "知识库使用与反馈流程 运行时自动关联 如果手动关联不足，前端会基于当前文档自动补充相关内容。 自动关联会参考： - title - tags - 二级和三级标题 - 正文中的问题式句子 - 本地搜索结果 自动关联在浏览器运行时计算，不再依赖构建期生成的 relateddocids。"
  },
  {
    "id": "content/tech/tools/knowledge-base-workflow::9",
    "docId": "content/tech/tools/knowledge-base-workflow",
    "heading": "如何评论",
    "text": "文章底部的“评论”区域使用 giscus。 giscus 的作用是把 GitHub Discussions 嵌入到静态网页中： 当前配置： 因为当前网页是 SPA，切换文章时浏览器 pathname 不变，所以不能用 pathname 做 discussion 映射。 当前使用 specific 映射，并由前端按文章生成 term： 例如： 这样每篇文章都有独立的 Discussion。 评论适合用于： - 讨论文章观点 - 补充背景 - 读者交流 - 非必须处理的留言",
    "searchText": "知识库使用与反馈流程 如何评论 文章底部的“评论”区域使用 giscus。 giscus 的作用是把 github discussions 嵌入到静态网页中： 当前配置： 因为当前网页是 spa，切换文章时浏览器 pathname 不变，所以不能用 pathname 做 discussion 映射。 当前使用 specific 映射，并由前端按文章生成 term： 例如： 这样每篇文章都有独立的 discussion。 评论适合用于： - 讨论文章观点 - 补充背景 - 读者交流 - 非必须处理的留言"
  },
  {
    "id": "content/tech/tools/knowledge-base-workflow::10",
    "docId": "content/tech/tools/knowledge-base-workflow",
    "heading": "如何反馈问题",
    "text": "如果文章内容缺失、不准确、过时或需要修改，应该使用内容反馈，而不是普通评论。 网页端提供三种反馈入口： - 反馈本文问题：针对整篇文章。 - 反馈此段：针对某个段落。 - 反馈选中文字：针对选中的原文。 这些入口都会打开 GitHub 新建 Issue 页面，并预填： - 文档标题 - Markdown 路径 - 位置 - 原文 - 问题说明模板 - 期望修改模板 - content-feedback label 反馈 Issue 的模板在： 反馈适合用于： - 指出事实错误。 - 补充缺失概念。 - 标记过时内容。 - 建议改写不清楚的段落。 - 给后续 AI 自动修复提供结构化输入。 如果 AI 判断反馈信息不足，会给 Issue 加上 content-feedback-blocked 标签并评论说明缺少什么。 这个标签表示“待补充信息”，不是永久拒绝。处理方式是： 1. 直接编辑同一个 Issue。 2. 补充 问题说明，说明具体哪里不对、缺失、过时或表达不清。 3. 补充 期望修改，说明希望补充什么，或希望把原文改成什么。 4. 移除 content-feedback-blocked 标签。 下一轮定时检测会重新处理这个 Issue。",
    "searchText": "知识库使用与反馈流程 如何反馈问题 如果文章内容缺失、不准确、过时或需要修改，应该使用内容反馈，而不是普通评论。 网页端提供三种反馈入口： - 反馈本文问题：针对整篇文章。 - 反馈此段：针对某个段落。 - 反馈选中文字：针对选中的原文。 这些入口都会打开 github 新建 issue 页面，并预填： - 文档标题 - markdown 路径 - 位置 - 原文 - 问题说明模板 - 期望修改模板 - content-feedback label 反馈 issue 的模板在： 反馈适合用于： - 指出事实错误。 - 补充缺失概念。 - 标记过时内容。 - 建议改写不清楚的段落。 - 给后续 ai 自动修复提供结构化输入。 如果 ai 判断反馈信息不足，会给 issue 加上 content-feedback-blocked 标签并评论说明缺少什么。 这个标签表示“待补充信息”，不是永久拒绝。处理方式是： 1. 直接编辑同一个 issue。 2. 补充 问题说明，说明具体哪里不对、缺失、过时或表达不清。 3. 补充 期望修改，说明希望补充什么，或希望把原文改成什么。 4. 移除 content-feedback-blocked 标签。 下一轮定时检测会重新处理这个 issue。"
  },
  {
    "id": "content/tech/tools/knowledge-base-workflow::11",
    "docId": "content/tech/tools/knowledge-base-workflow",
    "heading": "评论和反馈的区别",
    "text": "| 类型 | 存储位置 | 适合内容 | 是否需要处理 | | --- | --- | --- | --- | | 评论 | GitHub Discussions | 讨论、补充、交流 | 不一定 | | 反馈 | GitHub Issues | 缺失、错误、过时、待修改 | 是 | 简单判断： - 想讨论：用评论。 - 想推动修改：用反馈。",
    "searchText": "知识库使用与反馈流程 评论和反馈的区别 | 类型 | 存储位置 | 适合内容 | 是否需要处理 | | --- | --- | --- | --- | | 评论 | github discussions | 讨论、补充、交流 | 不一定 | | 反馈 | github issues | 缺失、错误、过时、待修改 | 是 | 简单判断： - 想讨论：用评论。 - 想推动修改：用反馈。"
  },
  {
    "id": "content/tech/tools/knowledge-base-workflow::12",
    "docId": "content/tech/tools/knowledge-base-workflow",
    "heading": "AI 修复闭环",
    "text": "当前第一版已经接入个人服务器上的内容反馈 agent。它把 content-feedback Issue 转成知识库修复 PR，但不自动合并。 完整流程：",
    "searchText": "知识库使用与反馈流程 ai 修复闭环 当前第一版已经接入个人服务器上的内容反馈 agent。它把 content-feedback issue 转成知识库修复 pr，但不自动合并。 完整流程："
  },
  {
    "id": "content/tech/tools/knowledge-base-workflow::13",
    "docId": "content/tech/tools/knowledge-base-workflow",
    "heading": "1. 创建内容反馈 Issue",
    "text": "读者在文章页点击反馈入口： - 反馈本文问题 - 反馈此段 - 反馈选中文字 网页会打开 GitHub 新建 Issue 页面，并预填文档路径、位置、原文、问题说明、期望修改和 content-feedback 标签。 Issue 内容越具体，AI 越容易处理。至少应该说明： - 哪里缺失、不准确、过时或表达不清。 - 希望补充什么，或希望把原文改成什么。 - 如果是选中文字反馈，Issue 会带上选中文本和前后上下文。",
    "searchText": "知识库使用与反馈流程 1. 创建内容反馈 issue 读者在文章页点击反馈入口： - 反馈本文问题 - 反馈此段 - 反馈选中文字 网页会打开 github 新建 issue 页面，并预填文档路径、位置、原文、问题说明、期望修改和 content-feedback 标签。 issue 内容越具体，ai 越容易处理。至少应该说明： - 哪里缺失、不准确、过时或表达不清。 - 希望补充什么，或希望把原文改成什么。 - 如果是选中文字反馈，issue 会带上选中文本和前后上下文。"
  },
  {
    "id": "content/tech/tools/knowledge-base-workflow::14",
    "docId": "content/tech/tools/knowledge-base-workflow",
    "heading": "2. 服务器定期扫描 Issue",
    "text": "个人服务器通过 systemd timer 定期启动 runner： runner 会查找 open 状态、带 content-feedback 标签、且没有 content-feedback-blocked 标签的 Issue。 如果某个 Issue 已经有打开的修复 PR，例如分支 ai/content-feedback-5 已经存在对应 PR，runner 会直接跳过，不再重复启动 Codex。",
    "searchText": "知识库使用与反馈流程 2. 服务器定期扫描 issue 个人服务器通过 systemd timer 定期启动 runner： runner 会查找 open 状态、带 content-feedback 标签、且没有 content-feedback-blocked 标签的 issue。 如果某个 issue 已经有打开的修复 pr，例如分支 ai/content-feedback-5 已经存在对应 pr，runner 会直接跳过，不再重复启动 codex。"
  },
  {
    "id": "content/tech/tools/knowledge-base-workflow::15",
    "docId": "content/tech/tools/knowledge-base-workflow",
    "heading": "3. Codex 根据仓库 skill 修改内容",
    "text": "runner 不直接让 Codex 随意工作，而是生成一次性 prompt，要求 Codex 读取仓库内标准 skill： 这个 skill 规定： - 每次只处理一个 Issue。 - 只允许修改知识内容和生成数据。 - 不允许 Codex commit、push、创建 PR、关闭 Issue 或改 label。 - 必须写入 .agent/content-feedback-result.json，告诉外层 runner 处理结果。 这样做的边界是：Codex 只负责理解反馈和修改内容；Git 操作、验证、PR 创建都由 shell runner 控制。",
    "searchText": "知识库使用与反馈流程 3. codex 根据仓库 skill 修改内容 runner 不直接让 codex 随意工作，而是生成一次性 prompt，要求 codex 读取仓库内标准 skill： 这个 skill 规定： - 每次只处理一个 issue。 - 只允许修改知识内容和生成数据。 - 不允许 codex commit、push、创建 pr、关闭 issue 或改 label。 - 必须写入 .agent/content-feedback-result.json，告诉外层 runner 处理结果。 这样做的边界是：codex 只负责理解反馈和修改内容；git 操作、验证、pr 创建都由 shell runner 控制。"
  },
  {
    "id": "content/tech/tools/knowledge-base-workflow::16",
    "docId": "content/tech/tools/knowledge-base-workflow",
    "heading": "4. runner 验证、提交分支并创建 PR",
    "text": "如果 Codex 返回 changed，runner 会继续执行： 允许修改的文件范围是： 如果 Codex 改了 workflow、依赖文件、脚本或其他不在白名单里的文件，runner 会失败，不会创建 PR。 PR 标题格式： PR body 会包含： 这个字段很重要。PR 合并到默认分支后，GitHub 会自动关闭对应 Issue。",
    "searchText": "知识库使用与反馈流程 4. runner 验证、提交分支并创建 pr 如果 codex 返回 changed，runner 会继续执行： 允许修改的文件范围是： 如果 codex 改了 workflow、依赖文件、脚本或其他不在白名单里的文件，runner 会失败，不会创建 pr。 pr 标题格式： pr body 会包含： 这个字段很重要。pr 合并到默认分支后，github 会自动关闭对应 issue。"
  },
  {
    "id": "content/tech/tools/knowledge-base-workflow::17",
    "docId": "content/tech/tools/knowledge-base-workflow",
    "heading": "5. 合并 PR 后 Issue 如何解决",
    "text": "Issue 不由 agent 直接关闭，而是在 PR 合并后由 GitHub 自动关闭。 例如： 当 PR #6 合并到 main 后： - GitHub 自动关闭 Issue #5。 - GitHub Actions 按主分支更新触发构建发布。 - 下一轮 agent 只扫描 open Issue，所以不会再处理 #5。 如果 PR 被关闭但没有合并，Issue 仍然 open；这时后续定时扫描可能会再次处理这个 Issue。",
    "searchText": "知识库使用与反馈流程 5. 合并 pr 后 issue 如何解决 issue 不由 agent 直接关闭，而是在 pr 合并后由 github 自动关闭。 例如： 当 pr #6 合并到 main 后： - github 自动关闭 issue #5。 - github actions 按主分支更新触发构建发布。 - 下一轮 agent 只扫描 open issue，所以不会再处理 #5。 如果 pr 被关闭但没有合并，issue 仍然 open；这时后续定时扫描可能会再次处理这个 issue。"
  },
  {
    "id": "content/tech/tools/knowledge-base-workflow::18",
    "docId": "content/tech/tools/knowledge-base-workflow",
    "heading": "6. 信息不足时如何处理",
    "text": "如果 AI 判断 Issue 信息不足，会返回 blocked。 runner 会： - 给 Issue 加上 content-feedback-blocked 标签。 - 评论说明缺少什么信息。 - 跳过这个 Issue，直到有人补充信息。 处理方式： 1. 直接编辑同一个 Issue。 2. 补充清楚 问题说明 和 期望修改。 3. 移除 content-feedback-blocked 标签。 4. 等下一轮定时扫描重新处理。",
    "searchText": "知识库使用与反馈流程 6. 信息不足时如何处理 如果 ai 判断 issue 信息不足，会返回 blocked。 runner 会： - 给 issue 加上 content-feedback-blocked 标签。 - 评论说明缺少什么信息。 - 跳过这个 issue，直到有人补充信息。 处理方式： 1. 直接编辑同一个 issue。 2. 补充清楚 问题说明 和 期望修改。 3. 移除 content-feedback-blocked 标签。 4. 等下一轮定时扫描重新处理。"
  },
  {
    "id": "content/tech/tools/knowledge-base-workflow::19",
    "docId": "content/tech/tools/knowledge-base-workflow",
    "heading": "7. 当前服务器配置",
    "text": "运行配置在服务器本地，不提交到仓库： 核心配置项： systemd 配置： 常用操作： 临时 worktree 不包含被 Git 忽略的 web/nodemodules。runner 会把主仓库的 web/nodemodules 链接到临时 worktree 中，所以服务器主仓库需要先安装前端依赖：",
    "searchText": "知识库使用与反馈流程 7. 当前服务器配置 运行配置在服务器本地，不提交到仓库： 核心配置项： systemd 配置： 常用操作： 临时 worktree 不包含被 git 忽略的 web/nodemodules。runner 会把主仓库的 web/nodemodules 链接到临时 worktree 中，所以服务器主仓库需要先安装前端依赖："
  },
  {
    "id": "content/tech/tools/knowledge-base-workflow::20",
    "docId": "content/tech/tools/knowledge-base-workflow",
    "heading": "8. 为什么不在 GitHub Actions 里跑 Codex",
    "text": "当前选择个人服务器定期扫描，而不是 GitHub Actions 直接跑 Codex，主要原因是： - Codex 登录态和个人配置留在服务器本地，避免提交到仓库或 CI 配置中。 - runner 可以使用本地已登录的 gh 和 codex。 - 可以以后替换 AGENTPROVIDER，例如从 Codex 换成 Claude。 - GitHub Actions 只负责合并后的构建发布，避免每个反馈分支都自动打包镜像。 这个设计的关键边界是：AI 负责提出修改，人工通过 PR review 决定是否合并。",
    "searchText": "知识库使用与反馈流程 8. 为什么不在 github actions 里跑 codex 当前选择个人服务器定期扫描，而不是 github actions 直接跑 codex，主要原因是： - codex 登录态和个人配置留在服务器本地，避免提交到仓库或 ci 配置中。 - runner 可以使用本地已登录的 gh 和 codex。 - 可以以后替换 agentprovider，例如从 codex 换成 claude。 - github actions 只负责合并后的构建发布，避免每个反馈分支都自动打包镜像。 这个设计的关键边界是：ai 负责提出修改，人工通过 pr review 决定是否合并。"
  },
  {
    "id": "content/tech/tools/knowledge-base-workflow::21",
    "docId": "content/tech/tools/knowledge-base-workflow",
    "heading": "关联",
    "text": "- 工具与效率 - Superpowers 到 Codex 的子 agent 编排链路",
    "searchText": "知识库使用与反馈流程 关联 - 工具与效率 - superpowers 到 codex 的子 agent 编排链路"
  },
  {
    "id": "content/travel/index::1",
    "docId": "content/travel/index",
    "heading": "旅游",
    "text": "旅游模块用于沉淀目的地、攻略、预算、行程、签证、酒店和旅行复盘。",
    "searchText": "旅游 旅游 旅游模块用于沉淀目的地、攻略、预算、行程、签证、酒店和旅行复盘。"
  },
  {
    "id": "content/travel/index::2",
    "docId": "content/travel/index",
    "heading": "章节",
    "text": "暂无。",
    "searchText": "旅游 章节 暂无。"
  },
  {
    "id": "topics/ai-era-technical-capability-map::1",
    "docId": "topics/ai-era-technical-capability-map",
    "heading": "定位",
    "text": "这个文档用于指导后续技术能力提升和知识库建设。 AI 时代仍然需要懂技术，但重点不再是记住 API 或框架细节，而是能够判断问题、设计系统、审查 AI 产出的代码，并把技术方案落到真实业务约束里。 核心目标： - 能判断一个技术方案是否合理。 - 能把模糊需求拆成清晰模型。 - 能设计可维护、可演进的系统。 - 能把 AI 接入真实工程流程。 - 能审查、调试和改进 AI 生成的代码。",
    "searchText": "ai 时代技术能力地图 定位 这个文档用于指导后续技术能力提升和知识库建设。 ai 时代仍然需要懂技术，但重点不再是记住 api 或框架细节，而是能够判断问题、设计系统、审查 ai 产出的代码，并把技术方案落到真实业务约束里。 核心目标： - 能判断一个技术方案是否合理。 - 能把模糊需求拆成清晰模型。 - 能设计可维护、可演进的系统。 - 能把 ai 接入真实工程流程。 - 能审查、调试和改进 ai 生成的代码。"
  },
  {
    "id": "topics/ai-era-technical-capability-map::2",
    "docId": "topics/ai-era-technical-capability-map",
    "heading": "1. 基础工程能力",
    "text": "基础工程能力是所有技术判断的底座。AI 可以辅助写代码，但人需要知道什么是正确、稳定、可维护的实现。 需要持续积累： - 数据结构与算法：复杂度、常见数据结构、基本算法思想。 - 网络：HTTP、DNS、TCP、TLS、WebSocket、缓存、代理。 - 数据库：索引、事务、锁、隔离级别、查询优化、数据建模。 - 操作系统：进程、线程、内存、文件系统、IO、并发。 - 工程工具：Git、CI/CD、测试、日志、监控、部署、回滚。 沉淀方式： - 每个概念写成一篇原子笔记。 - 每篇笔记回答：是什么、为什么需要、常见误区、实际例子。 - 遇到 bug 时反向补充对应底层知识。",
    "searchText": "ai 时代技术能力地图 1. 基础工程能力 基础工程能力是所有技术判断的底座。ai 可以辅助写代码，但人需要知道什么是正确、稳定、可维护的实现。 需要持续积累： - 数据结构与算法：复杂度、常见数据结构、基本算法思想。 - 网络：http、dns、tcp、tls、websocket、缓存、代理。 - 数据库：索引、事务、锁、隔离级别、查询优化、数据建模。 - 操作系统：进程、线程、内存、文件系统、io、并发。 - 工程工具：git、ci/cd、测试、日志、监控、部署、回滚。 沉淀方式： - 每个概念写成一篇原子笔记。 - 每篇笔记回答：是什么、为什么需要、常见误区、实际例子。 - 遇到 bug 时反向补充对应底层知识。"
  },
  {
    "id": "topics/ai-era-technical-capability-map::3",
    "docId": "topics/ai-era-technical-capability-map",
    "heading": "2. 架构与方案设计",
    "text": "架构能力是 AI 时代最值得重点提升的能力之一。AI 可以给出很多方案，但方案是否适合当前阶段，需要人来判断。 需要持续训练的问题： - 系统边界怎么划分？ - 核心模块有哪些？ - 数据流怎么走？ - 状态应该放在哪里？ - 同步还是异步？ - 单体、模块化单体、微服务分别适合什么场景？ - 如何保证可扩展、可观测、可回滚？ - 出问题时如何降级？ - 哪些设计是当前需要，哪些是过早复杂化？ 沉淀方式： - 保存典型系统设计：登录、权限、支付、订单、搜索、知识库、消息系统。 - 每个方案记录约束、取舍、风险和替代方案。 - 不只保存最终方案，也保存为什么没有选择其他方案。",
    "searchText": "ai 时代技术能力地图 2. 架构与方案设计 架构能力是 ai 时代最值得重点提升的能力之一。ai 可以给出很多方案，但方案是否适合当前阶段，需要人来判断。 需要持续训练的问题： - 系统边界怎么划分？ - 核心模块有哪些？ - 数据流怎么走？ - 状态应该放在哪里？ - 同步还是异步？ - 单体、模块化单体、微服务分别适合什么场景？ - 如何保证可扩展、可观测、可回滚？ - 出问题时如何降级？ - 哪些设计是当前需要，哪些是过早复杂化？ 沉淀方式： - 保存典型系统设计：登录、权限、支付、订单、搜索、知识库、消息系统。 - 每个方案记录约束、取舍、风险和替代方案。 - 不只保存最终方案，也保存为什么没有选择其他方案。"
  },
  {
    "id": "topics/ai-era-technical-capability-map::4",
    "docId": "topics/ai-era-technical-capability-map",
    "heading": "3. 需求抽象与建模能力",
    "text": "需求抽象能力决定了技术实现是否真正解决问题。很多系统复杂，不是因为代码难，而是因为一开始没有把对象、关系和流程想清楚。 需要持续训练： - 核心用户是谁？ - 真实业务对象有哪些？ - 对象之间是什么关系？ - 哪些状态需要持久化？ - 哪些流程有异常分支？ - 哪些约束来自业务，哪些约束来自技术？ - 当前必须做什么，哪些可以延后？ 例子： 做一个知识库，不应该一开始就决定是否使用向量数据库，而是先判断： - 知识的最小单元是什么？ - 知识如何被引用？ - 知识如何更新？ - 如何避免重复？ - 如何让 AI 容易读取和检索？ 沉淀方式： - 为每个项目建立“需求建模”文档。 - 用实体、状态、流程、异常、约束来组织内容。 - 把模糊需求转成清晰问题清单。",
    "searchText": "ai 时代技术能力地图 3. 需求抽象与建模能力 需求抽象能力决定了技术实现是否真正解决问题。很多系统复杂，不是因为代码难，而是因为一开始没有把对象、关系和流程想清楚。 需要持续训练： - 核心用户是谁？ - 真实业务对象有哪些？ - 对象之间是什么关系？ - 哪些状态需要持久化？ - 哪些流程有异常分支？ - 哪些约束来自业务，哪些约束来自技术？ - 当前必须做什么，哪些可以延后？ 例子： 做一个知识库，不应该一开始就决定是否使用向量数据库，而是先判断： - 知识的最小单元是什么？ - 知识如何被引用？ - 知识如何更新？ - 如何避免重复？ - 如何让 ai 容易读取和检索？ 沉淀方式： - 为每个项目建立“需求建模”文档。 - 用实体、状态、流程、异常、约束来组织内容。 - 把模糊需求转成清晰问题清单。"
  },
  {
    "id": "topics/ai-era-technical-capability-map::5",
    "docId": "topics/ai-era-technical-capability-map",
    "heading": "4. AI 工程能力",
    "text": "AI 工程能力不是只会写 prompt，而是能把模型接入真实系统，并管理上下文、工具、数据、安全和评估。 需要持续积累： - Prompt 设计：角色、任务、约束、示例、输出格式。 - 上下文管理：信息选择、压缩、记忆、引用、窗口限制。 - RAG：切分、嵌入、检索、重排、引用、更新。 - Agent：工具调用、状态管理、任务拆解、失败恢复。 - 模型选择：能力、成本、延迟、上下文长度、稳定性。 - 评估：如何判断 AI 输出是否稳定、正确、可复现。 - 安全：权限控制、提示注入、数据泄漏、幻觉控制。 沉淀方式： - 保存可复用 prompt。 - 记录 AI 工作流设计。 - 记录失败案例：模型为什么答错、上下文哪里不够、评估哪里缺失。 - 建立 AI 输出审查清单。",
    "searchText": "ai 时代技术能力地图 4. ai 工程能力 ai 工程能力不是只会写 prompt，而是能把模型接入真实系统，并管理上下文、工具、数据、安全和评估。 需要持续积累： - prompt 设计：角色、任务、约束、示例、输出格式。 - 上下文管理：信息选择、压缩、记忆、引用、窗口限制。 - rag：切分、嵌入、检索、重排、引用、更新。 - agent：工具调用、状态管理、任务拆解、失败恢复。 - 模型选择：能力、成本、延迟、上下文长度、稳定性。 - 评估：如何判断 ai 输出是否稳定、正确、可复现。 - 安全：权限控制、提示注入、数据泄漏、幻觉控制。 沉淀方式： - 保存可复用 prompt。 - 记录 ai 工作流设计。 - 记录失败案例：模型为什么答错、上下文哪里不够、评估哪里缺失。 - 建立 ai 输出审查清单。"
  },
  {
    "id": "topics/ai-era-technical-capability-map::6",
    "docId": "topics/ai-era-technical-capability-map",
    "heading": "5. 代码审查与调试能力",
    "text": "AI 会显著提高代码产量，因此代码审查和调试能力会更重要。 需要重点判断： - 代码是否只在局部正确，但整体有风险？ - 错误处理是否完整？ - 类型设计是否表达了真实约束？ - 状态是否清晰？ - 并发、缓存、事务是否存在隐患？ - 测试是否覆盖关键路径？ - 抽象是否过早？ - 代码是否容易被后续维护？ 沉淀方式： - 保存代码审查清单。 - 记录典型 bug 的定位过程。 - 把每次修复沉淀为：现象、原因、验证、修复、预防。 - 对 AI 生成代码单独记录常见问题。",
    "searchText": "ai 时代技术能力地图 5. 代码审查与调试能力 ai 会显著提高代码产量，因此代码审查和调试能力会更重要。 需要重点判断： - 代码是否只在局部正确，但整体有风险？ - 错误处理是否完整？ - 类型设计是否表达了真实约束？ - 状态是否清晰？ - 并发、缓存、事务是否存在隐患？ - 测试是否覆盖关键路径？ - 抽象是否过早？ - 代码是否容易被后续维护？ 沉淀方式： - 保存代码审查清单。 - 记录典型 bug 的定位过程。 - 把每次修复沉淀为：现象、原因、验证、修复、预防。 - 对 ai 生成代码单独记录常见问题。"
  },
  {
    "id": "topics/ai-era-technical-capability-map::7",
    "docId": "topics/ai-era-technical-capability-map",
    "heading": "6. 产品与业务技术判断",
    "text": "高级技术能力不是把系统做复杂，而是知道什么时候不需要复杂技术。 需要持续训练： - 技术方案是否匹配业务阶段？ - 当前最小可用方案是什么？ - 哪些复杂度是真需求，哪些是想象出来的？ - 交付速度和长期维护如何平衡？ - 自动化是否值得？ - 成本、稳定性、体验之间如何取舍？ 沉淀方式： - 记录技术决策。 - 每个决策写清楚背景、选项、取舍、风险、复盘。 - 建立“什么时候不用某项技术”的反向笔记。",
    "searchText": "ai 时代技术能力地图 6. 产品与业务技术判断 高级技术能力不是把系统做复杂，而是知道什么时候不需要复杂技术。 需要持续训练： - 技术方案是否匹配业务阶段？ - 当前最小可用方案是什么？ - 哪些复杂度是真需求，哪些是想象出来的？ - 交付速度和长期维护如何平衡？ - 自动化是否值得？ - 成本、稳定性、体验之间如何取舍？ 沉淀方式： - 记录技术决策。 - 每个决策写清楚背景、选项、取舍、风险、复盘。 - 建立“什么时候不用某项技术”的反向笔记。"
  },
  {
    "id": "topics/ai-era-technical-capability-map::8",
    "docId": "topics/ai-era-technical-capability-map",
    "heading": "知识库建设方向",
    "text": "后续知识库可以围绕以下类型沉淀。",
    "searchText": "ai 时代技术能力地图 知识库建设方向 后续知识库可以围绕以下类型沉淀。"
  },
  {
    "id": "topics/ai-era-technical-capability-map::9",
    "docId": "topics/ai-era-technical-capability-map",
    "heading": "技术概念",
    "text": "用于记录基础知识。 例子： - 什么是事务？ - 什么是数据库索引？ - 什么是消息队列？ - HTTP 缓存如何工作？",
    "searchText": "ai 时代技术能力地图 技术概念 用于记录基础知识。 例子： - 什么是事务？ - 什么是数据库索引？ - 什么是消息队列？ - http 缓存如何工作？"
  },
  {
    "id": "topics/ai-era-technical-capability-map::10",
    "docId": "topics/ai-era-technical-capability-map",
    "heading": "方案模式",
    "text": "用于记录常见系统设计。 例子： - 登录系统怎么设计？ - 权限系统怎么设计？ - 支付系统怎么设计？ - 知识库系统怎么设计？ - RAG 系统怎么设计？",
    "searchText": "ai 时代技术能力地图 方案模式 用于记录常见系统设计。 例子： - 登录系统怎么设计？ - 权限系统怎么设计？ - 支付系统怎么设计？ - 知识库系统怎么设计？ - rag 系统怎么设计？"
  },
  {
    "id": "topics/ai-era-technical-capability-map::11",
    "docId": "topics/ai-era-technical-capability-map",
    "heading": "架构决策",
    "text": "用于记录具体选择背后的判断。 例子： - 为什么选择模块化单体而不是微服务？ - 为什么先不用向量数据库？ - 为什么使用异步队列？ - 为什么某个字段需要冗余？",
    "searchText": "ai 时代技术能力地图 架构决策 用于记录具体选择背后的判断。 例子： - 为什么选择模块化单体而不是微服务？ - 为什么先不用向量数据库？ - 为什么使用异步队列？ - 为什么某个字段需要冗余？"
  },
  {
    "id": "topics/ai-era-technical-capability-map::12",
    "docId": "topics/ai-era-technical-capability-map",
    "heading": "故障案例",
    "text": "用于记录真实问题和排查过程。 推荐结构： - 现象 - 影响范围 - 排查过程 - 根因 - 修复方式 - 如何预防",
    "searchText": "ai 时代技术能力地图 故障案例 用于记录真实问题和排查过程。 推荐结构： - 现象 - 影响范围 - 排查过程 - 根因 - 修复方式 - 如何预防"
  },
  {
    "id": "topics/ai-era-technical-capability-map::13",
    "docId": "topics/ai-era-technical-capability-map",
    "heading": "AI 工程",
    "text": "用于记录和 AI 相关的工程经验。 例子： - Prompt 模板 - RAG 切分策略 - Agent 工具调用模式 - AI 代码审查清单 - 模型评估方法",
    "searchText": "ai 时代技术能力地图 ai 工程 用于记录和 ai 相关的工程经验。 例子： - prompt 模板 - rag 切分策略 - agent 工具调用模式 - ai 代码审查清单 - 模型评估方法"
  },
  {
    "id": "topics/ai-era-technical-capability-map::14",
    "docId": "topics/ai-era-technical-capability-map",
    "heading": "代码实践",
    "text": "用于记录日常工程质量方法。 例子： - 测试策略 - 重构方法 - 类型设计 - 错误处理 - 日志与监控 - Code review checklist",
    "searchText": "ai 时代技术能力地图 代码实践 用于记录日常工程质量方法。 例子： - 测试策略 - 重构方法 - 类型设计 - 错误处理 - 日志与监控 - code review checklist"
  },
  {
    "id": "topics/ai-era-technical-capability-map::15",
    "docId": "topics/ai-era-technical-capability-map",
    "heading": "推荐学习主线",
    "text": "优先级建议： 1. 基础工程能力 2. 一条主技术栈 3. 系统设计 4. AI 工程 5. 架构决策 6. 代码审查与调试 7. 产品与业务技术判断 如果只能优先选择三个方向： - 系统设计 - AI 工程 - 调试与代码审查 原因是：AI 会越来越擅长生成代码，但人仍然要负责判断该写什么、如何组织系统、出了问题如何定位和修复。",
    "searchText": "ai 时代技术能力地图 推荐学习主线 优先级建议： 1. 基础工程能力 2. 一条主技术栈 3. 系统设计 4. ai 工程 5. 架构决策 6. 代码审查与调试 7. 产品与业务技术判断 如果只能优先选择三个方向： - 系统设计 - ai 工程 - 调试与代码审查 原因是：ai 会越来越擅长生成代码，但人仍然要负责判断该写什么、如何组织系统、出了问题如何定位和修复。"
  },
  {
    "id": "topics/ai-era-technical-capability-map::16",
    "docId": "topics/ai-era-technical-capability-map",
    "heading": "后续使用方式",
    "text": "每次和 AI 聊到有价值的技术内容时，优先判断它属于哪一类： - 概念 - 方案 - 决策 - 故障 - AI 工程 - 代码实践 然后把内容沉淀成独立 Markdown 笔记，并在相关主题文档中建立链接。 长期目标不是保存所有聊天记录，而是把聊天提炼成可以复用、可以检索、可以持续更新的技术判断体系。",
    "searchText": "ai 时代技术能力地图 后续使用方式 每次和 ai 聊到有价值的技术内容时，优先判断它属于哪一类： - 概念 - 方案 - 决策 - 故障 - ai 工程 - 代码实践 然后把内容沉淀成独立 markdown 笔记，并在相关主题文档中建立链接。 长期目标不是保存所有聊天记录，而是把聊天提炼成可以复用、可以检索、可以持续更新的技术判断体系。"
  }
];
