import { NextResponse } from 'next/server'

/**
 * AI 聊天代理接口 (Server-side Proxy)
 * 作用：隐藏真实后台地址，防止 API 被直接调用，解决跨域问题。
 */
export async function POST(request: Request) {
  const API_URL = process.env.AI_API_URL?.replace(/\/$/, '')
  const API_KEY = process.env.AI_API_KEY

  if (!API_URL) {
    console.error('AI_API_URL is missing in environment variables')
    return NextResponse.json({ error: 'AI_API_URL is not configured' }, { status: 500 })
  }

  // 1. 简单的 Referer 和 Origin 校验：只允许来自自己域名的请求
  const referer = request.headers.get('referer')
  const origin = request.headers.get('origin')
  const host = request.headers.get('host')

  // 确保请求来自本站
  const isAuthorized =
    (!referer || referer.includes(host || '')) && (!origin || origin.includes(host || ''))

  if (!isAuthorized) {
    console.warn('Unauthorized request origin:', { referer, origin, host })
    return NextResponse.json({ error: 'Unauthorized request origin' }, { status: 403 })
  }

  try {
    const body = await request.json()
    const { message } = body

    // 2. 输入合法性校验
    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 })
    }

    if (message.length > 2000) {
      return NextResponse.json({ error: 'Message is too long' }, { status: 400 })
    }

    // 3. 转发请求至真实后端
    const backendUrl = `${API_URL}/chat`
    console.log(`Proxying request to: ${backendUrl}`)

    const requestHeaders: HeadersInit = {
      'Content-Type': 'application/json',
    }

    if (API_KEY) {
      requestHeaders['X-API-Key'] = API_KEY
    } else {
      console.warn('AI_API_KEY is missing in environment variables')
    }

    const response = await fetch(backendUrl, {
      method: 'POST',
      headers: requestHeaders,
      body: JSON.stringify({ message }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error(`Backend API Error (${response.status}):`, errorText)
      return NextResponse.json(
        { error: `Backend API error: ${response.status}`, detail: errorText },
        { status: response.status }
      )
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Proxy Error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
