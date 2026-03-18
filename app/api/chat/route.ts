import { NextResponse } from 'next/server'

/**
 * AI 聊天代理接口 (Server-side Proxy)
 * 作用：隐藏真实后台地址，防止 API 被直接调用，解决跨域问题。
 */
export async function POST(request: Request) {
  const API_URL = process.env.AI_API_URL
  const API_KEY = process.env.AI_API_KEY

  if (!API_URL) {
    return NextResponse.json({ error: 'AI_API_URL is not configured' }, { status: 500 })
  }

  // 1. 简单的 Referer 和 Origin 校验：只允许来自自己域名的请求
  const referer = request.headers.get('referer')
  const origin = request.headers.get('origin')
  const host = request.headers.get('host')

  // 确保请求来自本站
  const isAuthorized = 
    (!referer || referer.includes(host || '')) && 
    (!origin || origin.includes(host || ''))

  if (!isAuthorized) {
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
    console.log(`Proxying request to: ${API_URL}/chat`)
    
    const requestHeaders: HeadersInit = {
      'Content-Type': 'application/json',
    }

    if (API_KEY) {
      requestHeaders['X-API-Key'] = API_KEY
      console.log('Using API Key: [Configured]')
    } else {
      console.warn('Using API Key: [MISSING] - Check your .env.local')
    }

    const response = await fetch(`${API_URL}/chat`, {
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
