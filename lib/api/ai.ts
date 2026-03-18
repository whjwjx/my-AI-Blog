/**
 * AI API 模块化管理
 * 如果是 GitHub Pages (静态导出)，需要直接调用外部 API 地址。
 * 如果是服务端部署，建议通过 /api/chat 代理以隐藏 Key。
 */

// 优先读取环境变量中的外部 API 地址，如果没有则回退到本地代理
const EXTERNAL_API_URL = process.env.NEXT_PUBLIC_AI_API_URL
const API_BASE_URL = EXTERNAL_API_URL || '/api'

export interface ChatResponse {
  reply: string
  length: number
}

export interface ChatRequest {
  message: string
}

/**
 * 调用聊天接口
 * @param message 用户输入的消息
 * @returns 返回聊天回复内容
 */
export async function chat(message: string): Promise<ChatResponse> {
  const isExternal = !!EXTERNAL_API_URL
  const url = isExternal ? `${EXTERNAL_API_URL}/chat` : `${API_BASE_URL}/chat`

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  }

  // 如果直接调用外部 API，需要把 Key 带上 (注意：这会在浏览器 Network 中暴露 Key)
  if (isExternal && process.env.NEXT_PUBLIC_AI_API_KEY) {
    headers['X-API-Key'] = process.env.NEXT_PUBLIC_AI_API_KEY
  }

  const response = await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify({ message }),
  })

  if (!response.ok) {
    throw new Error(`AI Proxy Request failed with status ${response.status}`)
  }

  return response.json()
}

/**
 * 流式聊天接口 (预留，后续可扩展)
 * @param message 用户输入的消息
 * @returns 返回 ReadableStream
 */
export async function chatStream(message: string): Promise<ReadableStream<Uint8Array>> {
  const response = await fetch(`${API_BASE_URL}/chat/stream`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ message }),
  })

  if (!response.ok || !response.body) {
    throw new Error(`AI API Stream Request failed with status ${response.status}`)
  }

  return response.body
}

/**
 * 健康检查
 */
export async function healthCheck(): Promise<{ status: string }> {
  const response = await fetch(`${API_BASE_URL}/health`)
  if (!response.ok) {
    throw new Error('Health check failed')
  }
  return response.json()
}
