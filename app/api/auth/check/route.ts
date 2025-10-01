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
    // Use /v1/user-api-keys which requires session authentication
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/user-api-keys`, {
      method: 'GET',
      headers: {
        'Cookie': `chainx.sid=${sessionCookie.value}`,
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Ensures cookies are sent
    })

    if (!response.ok) {
      return NextResponse.json(
        { success: false, message: 'Session invalid' },
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
