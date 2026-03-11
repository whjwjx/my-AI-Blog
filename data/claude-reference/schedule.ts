export type ScheduleItem = {
  start: number
  end: number
  title: string
  description: string
}

export const DAILY_SCHEDULE: ScheduleItem[] = [
  { start: 0, end: 450, title: '休息', description: '深度睡眠与身体恢复。' },
  { start: 450, end: 540, title: '晨间', description: '起床、洗漱、早餐、整理计划。' },
  { start: 540, end: 720, title: '深度工作', description: '专注开发与核心事项推进。' },
  { start: 720, end: 810, title: '午间休息', description: '午餐与短暂休息。' },
  { start: 810, end: 1110, title: '项目推进', description: '需求处理、编码与协作沟通。' },
  { start: 1110, end: 1230, title: '晚间充电', description: '阅读、学习与知识整理。' },
  { start: 1230, end: 1350, title: '创作时间', description: '写作、复盘与灵感输出。' },
  { start: 1350, end: 1440, title: '放松收尾', description: '放松、整理、准备休息。' },
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
