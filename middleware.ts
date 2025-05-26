import { NextRequest, NextResponse } from 'next/server'

// Basic Auth 配置
const BASIC_AUTH_USER = process.env.BASIC_AUTH_USER || 'demo'
const BASIC_AUTH_PASSWORD = process.env.BASIC_AUTH_PASSWORD || 'demo123'

export function middleware(request: NextRequest) {
  // 检查 Authorization header
  const authHeader = request.headers.get('authorization')
  
  if (!authHeader || !authHeader.startsWith('Basic ')) {
    return new NextResponse('Authentication required', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Domain Marketplace - Demo"',
        'Content-Type': 'text/plain',
      },
    })
  }

  // 解析 Basic Auth
  try {
    const base64Credentials = authHeader.split(' ')[1]
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii')
    const [username, password] = credentials.split(':')

    // 验证凭据
    if (username !== BASIC_AUTH_USER || password !== BASIC_AUTH_PASSWORD) {
      return new NextResponse('Invalid credentials', {
        status: 401,
        headers: {
          'WWW-Authenticate': 'Basic realm="Domain Marketplace - Demo"',
          'Content-Type': 'text/plain',
        },
      })
    }
  } catch (error) {
    return new NextResponse('Invalid authorization format', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Domain Marketplace - Demo"',
        'Content-Type': 'text/plain',
      },
    })
  }

  // 认证成功，继续处理请求
  return NextResponse.next()
}

// 配置 middleware 匹配的路径
export const config = {
  matcher: [
    /*
     * 匹配所有路径除了:
     * - api routes (可选)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}
