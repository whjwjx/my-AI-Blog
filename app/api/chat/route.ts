import { NextResponse } from 'next/server'

/**
 * AI 聊天代理接口 (Server-side Proxy)
 * 作用：隐藏真实后台地址，防止 API 被直接调用，解决跨域问题。
 */
export async function POST(request: Request) {
  const API_URL = process.env.AI_API_URL?.trim().replace(/\/$/, '')
  const API_KEY = process.env.AI_API_KEY?.trim()

  if (!API_URL) {
    console.error('[Proxy] AI_API_URL is not configured in environment variables')
    return NextResponse.json({ error: 'AI_API_URL is not configured' }, { status: 500 })
  }

  // 1. 简单的 Referer 和 Origin 校验
  const referer = request.headers.get('referer')
  const origin = request.headers.get('origin')
  const host = request.headers.get('host')

  const isAuthorized =
    (!referer || referer.includes(host || '')) && (!origin || origin.includes(host || ''))

  if (!isAuthorized) {
    console.warn('[Proxy] Unauthorized request origin:', { referer, origin, host })
    return NextResponse.json({ error: 'Unauthorized request origin' }, { status: 403 })
  }

  try {
    const body = await request.json()
    const { message } = body

    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 })
    }

    // 2. 构造后端请求
    const backendUrl = `${API_URL}/chat`
    console.log(`[Proxy] Forwarding request to: ${backendUrl}`)

    const requestHeaders = new Headers()
    requestHeaders.set('Content-Type', 'application/json')
    
    if (API_KEY) {
      requestHeaders.set('X-API-Key', API_KEY)
    } else {
      console.warn('[Proxy] AI_API_KEY is missing in environment variables!')
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
