// app/api/auth/logout/route.ts
import { NextResponse } from "next/server"
import { getCookieData } from '../../../lib/cookies-exec'

export async function POST() {
  try {
    // Get session cookie
    const cookieStore = await getCookieData()
    const sessionCookie = cookieStore.find((cookie) => cookie.name === 'connect.sid')

    if (sessionCookie) {
      // Proxy to backend to destroy session
      await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/logout`, {
        method: 'POST',
        headers: {
          'Cookie': `connect.sid=${sessionCookie.value}`,
        }
      })
    }

    const response = NextResponse.json({
      success: true,
      message: "Logged out successfully"
    })

    // Clear session cookie
    response.cookies.delete('chainx.sid')

    // Clear userId cookie
    response.cookies.delete('userId')

    return response
  } catch (error) {
    console.error('Logout error:', error)
    return NextResponse.json(
      { success: false, message: 'Logout failed' },
      { status: 500 }
    )
  }
}
