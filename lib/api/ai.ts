/**
 * AI API 模块化管理 (前端调用本地代理接口)
 * 通过 /api/chat 代理以隐藏真实的 API Key
 */

const API_BASE_URL = '/api' // 指向本地 Next.js API Routes

export interface ChatResponse {
  reply: string
  length: number
}

export interface ChatRequest {
  message: string
}

/**
 * 通过本地代理调用聊天接口
 * @param message 用户输入的消息
 * @returns 返回聊天回复内容
 */
export async function chat(message: string): Promise<ChatResponse> {
  const response = await fetch(`${API_BASE_URL}/chat`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
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
