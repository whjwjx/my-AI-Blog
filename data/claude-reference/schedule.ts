export type ScheduleItem = {
  start: number
  end: number
  title: string
  description: string
}

export const DAILY_SCHEDULE: ScheduleItem[] = [
  { start: 0, end: 450, title: '睡觉', description: '深度睡眠与身体恢复。' },
  { start: 450, end: 510, title: '晨间', description: '喝水、跑步、洗漱。' },
  { start: 510, end: 540, title: '计划与消息', description: '查看消息、写今日计划。' },
  { start: 540, end: 720, title: '需求讨论', description: '与 Agent 大军激情讨论、分析与设计需求。' },
  { start: 720, end: 840, title: '午休', description: '午休并查看或更新下午计划。' },
  { start: 840, end: 1080, title: '代码执行', description: '指挥 Agent 大军写代码。' },
  { start: 1080, end: 1200, title: '运动休息', description: '休息、健身或跑步。' },
  { start: 1200, end: 1380, title: '项目与写作', description: '指挥 Agent 大军搞项目、写博客、总结 AI 协同经验。' },
  { start: 1380, end: 1440, title: '复盘与洗漱', description: '畅想 AI 的未来、复盘、洗漱。' },
]

export const STATUS_QUESTIONS = [
  '目前网站主人在干嘛',
  '目前在干嘛',
  '他在忙什么',
  '现在干什么',
  '现在在干嘛',
  '在干嘛',
  '忙什么',
  '在忙什么',
  '现在干啥',
  '现在做什么',
]
