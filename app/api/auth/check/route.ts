// app/api/auth/check/route.ts
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    // Get all cookies to debug
    const allCookies = request.cookies.getAll()
    console.log('All cookies received:', allCookies)
    
    // Get session cookie from the request
    const sessionCookie = request.cookies.get('chainx.sid')
    const userIdCookie = request.cookies.get('userId')
    console.log("SESSION GET: ", sessionCookie)
    console.log("USER ID GET: ", userIdCookie)

    if (!sessionCookie) {
      return NextResponse.json(
        { success: false, message: 'No session found' },
        { status: 401 }
      )
    }

    // Validate session by calling a protected backend endpoint
    // Forward the session cookie to the backend
    const cookieHeader = sessionCookie ? `chainx.sid=${sessionCookie.value}` : (request.headers.get('cookie') || '')
    console.log('Auth check forwarding Cookie header:', cookieHeader)
    console.log('Auth check session cookie value:', sessionCookie?.value)
    const backendUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/user-api-keys`
    console.log('Auth check forwarding to backend URL:', backendUrl)

    const response = await fetch(backendUrl, {
      method: 'GET',
      headers: {
        'Cookie': cookieHeader,
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
