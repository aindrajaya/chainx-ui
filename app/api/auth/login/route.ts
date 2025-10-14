// app/api/auth/login/route.ts
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    // Proxy to backend API
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password
      })
    })

    // Log backend response headers/body for debugging Set-Cookie behavior
    try {
      const setCookieHeader = response.headers.get('set-cookie')
      console.log('Backend Set-Cookie header:', setCookieHeader)
      const headersArray = Array.from(response.headers.entries())
      console.log('Backend response headers:', headersArray)
    } catch (e) {
      console.log('Could not read backend response headers', e)
    }

    const data = await response.json()
    console.log("Data form backend: ", data)

    if (!response.ok) {
      return NextResponse.json(
        { error: data.error || 'Login failed' },
        { status: response.status }
      )
    }

        // ensure we have the values we need
    const sessionId = data?.user?.sessionId
    const userId = data?.user?.id
    if (!userId) {
      console.error('Backend response missing userId:', data)
      return NextResponse.json(
        { error: 'Invalid response from backend' },
        { status: 500 }
      )
    }

    // Create response and set cookies with environment-aware options
    const isProd = process.env.NODE_ENV === 'production'

    const nextResponse = NextResponse.json({
      success: true,
      message: data.message || 'Login successful',
      userId: userId,
    })

    // session cookie (httpOnly) - when frontend and backend are cross-site, browsers
    // require SameSite=None and Secure on production. In dev we use lax + secure=false
      // Prefer to forward backend Set-Cookie if present so attributes (SameSite, Secure) are preserved.
      try {
        const rawSetCookie = response.headers.get('set-cookie')
        if (rawSetCookie) {
          // The backend may send a single Set-Cookie header string. We attempt to parse
          // the cookie name and value and set it on the NextResponse with conservative defaults.
          // This isn't a full Set-Cookie parser but handles common cases like
          // 'chainx.sid=abc123; Path=/; HttpOnly; SameSite=None; Secure'
          const parts = rawSetCookie.split(';').map(p => p.trim())
          const [nameValue] = parts
          const eqIndex = nameValue.indexOf('=')
          if (eqIndex > 0) {
            const name = nameValue.substring(0, eqIndex)
            const value = nameValue.substring(eqIndex + 1)
            // Use backend attributes where possible
            const sameSite = parts.find(p => p.toLowerCase().startsWith('samesite='))
            const secure = parts.some(p => p.toLowerCase() === 'secure')
            const httpOnly = parts.some(p => p.toLowerCase() === 'httponly')

            nextResponse.cookies.set(name, value, {
              httpOnly: httpOnly,
              secure: isProd ? true : secure,
              sameSite: sameSite ? sameSite.split('=')[1] as any : (isProd ? 'none' : 'lax'),
              path: '/',
              maxAge: 60 * 60 * 24 * 7,
            })
          }
        } else if (sessionId) {
          // Fallback: set cookie from sessionId returned in body
          nextResponse.cookies.set('chainx.sid', sessionId, {
            httpOnly: true,
            secure: isProd,
            sameSite: isProd ? 'none' : 'lax',
            path: '/',
            maxAge: 60 * 60 * 24 * 7, // 7 days
          })
        }
      } catch (e) {
        console.log('Error forwarding Set-Cookie header:', e)
        if (sessionId) {
          nextResponse.cookies.set('chainx.sid', sessionId, {
            httpOnly: true,
            secure: isProd,
            sameSite: isProd ? 'none' : 'lax',
            path: '/',
            maxAge: 60 * 60 * 24 * 7, // 7 days
          })
        }
      }

    // optional client-readable userId cookie (not httpOnly)
    nextResponse.cookies.set('userId', userId, {
      httpOnly: false,
      secure: isProd,
      sameSite: isProd ? 'none' : 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    })

    return nextResponse
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}
