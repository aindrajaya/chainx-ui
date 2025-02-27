// app/api/auth/check/route.ts
import { NextResponse } from 'next/server'
import { getCookieData } from '../../../lib/cookies-exec'

export async function GET() {
  try {
    const cookieStore = await getCookieData()
    const cookieData = cookieStore.find((cookie) => cookie.name === 'auth-token')
    const authToken = cookieData?.value;

    if (!cookieData || !authToken) {
      return NextResponse.json(
        { success: false, message: 'No authentication found' },
        { status: 401 }
      )
    }

    // Since we have the userId stored in the auth-token cookie,
    // we can consider the user authenticated if the cookie exists
    return NextResponse.json({
      success: true,
      userId: authToken.value,
      message: 'Authentication valid'
    })

  } catch (error) {
    console.error('Auth check error:', error)
    
    // Clear the cookie on error and return unauthorized
    const errorResponse = NextResponse.json(
      { success: false, message: 'Authentication failed' },
      { status: 401 }
    )
    errorResponse.cookies.delete('auth-token')
    return errorResponse
  }
}

// Types for better type safety
interface AuthCheckResponse {
  success: boolean
  userId?: string
  message: string
}
