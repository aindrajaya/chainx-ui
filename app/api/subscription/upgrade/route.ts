import { NextRequest, NextResponse } from 'next/server'
import { getCookieData } from '../../../lib/cookies-exec'

export async function POST(request: NextRequest) {
  try {
    const cookieData = await getCookieData()
    const cookieDataToken = cookieData.find((cookie) => cookie.name === 'auth-token')
    const authToken = cookieDataToken?.value

    if (!authToken) {
      return NextResponse.json(
        { success: false, message: 'Not authenticated' },
        { status: 401 }
      )
    }

    const { userId, planType, returnUrl, cancelUrl } = await request.json()

    // Proxy to backend API
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/subscription/upgrade`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`,
      },
      body: JSON.stringify({
        userId: userId || authToken,
        planType: planType || 'PREMIUM',
        returnUrl,
        cancelUrl
      })
    })

    const data = await response.json()

    if (!response.ok) {
      return NextResponse.json(
        { success: false, message: data.error || 'Failed to upgrade subscription' },
        { status: response.status }
      )
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('Upgrade subscription error:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}