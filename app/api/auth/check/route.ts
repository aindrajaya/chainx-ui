// app/api/auth/check/route.ts
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    // Get session cookie from the request
    const sessionCookie = request.cookies.get('chainx.sid')
    const userIdCookie = request.cookies.get('userId')
    console.log("SESSION GET: ", sessionCookie)

    if (!sessionCookie) {
      return NextResponse.json(
        { success: false, message: 'No session found' },
        { status: 401 }
      )
    }

    // Validate session by calling a protected backend endpoint
    // Forward only the session cookie (backend expects chainx.sid). This mirrors
    // other proxy routes which directly set 'Cookie': `chainx.sid=${sessionCookie.value}`.
    const cookieHeader = sessionCookie ? `chainx.sid=${sessionCookie.value}` : (request.headers.get('cookie') || '')
    console.log('Auth check forwarding Cookie header:', cookieHeader)
    const backendUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/user-api-keys`
    console.log('Auth check forwarding to backend URL:', backendUrl)

    const response = await fetch(backendUrl, {
      method: 'GET',
      headers: {
        ...(cookieHeader ? { 'Cookie': cookieHeader } : {}),
        'Content-Type': 'application/json',
      },
      // Note: credentials option is not used on server-side fetch
    })

    // Log backend status for debugging
    console.log('Auth check backend status:', response.status)
    let backendBody = null
    try {
      backendBody = await response.clone().json()
      console.log('Auth check backend body:', backendBody)
    } catch (e) {
      console.log('Auth check backend body: (non-json or empty)')
    }

    if (!response.ok) {
      // Include backend response body when returning 401 to help diagnose issues
      return NextResponse.json(
        { success: false, message: 'Session invalid', backend: backendBody },
        { status: 401 }
      )
    }

    return NextResponse.json({
      success: true,
      userId: userIdCookie?.value,
      message: 'Session valid'
    })

  } catch (error) {
    console.error('Auth check error:', error)
    return NextResponse.json(
      { success: false, message: 'Authentication check failed' },
      { status: 500 }
    )
  }
}

// Types for better type safety
interface AuthCheckResponse {
  success: boolean
  userId?: string
  message: string
}
