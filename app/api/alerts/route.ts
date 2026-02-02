import { NextRequest, NextResponse } from 'next/server'
import { getCookieData } from '../../lib/cookies-exec'

export async function GET(request: NextRequest) {
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

    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId') || authToken

    // Proxy to backend API
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/alerts?userId=${userId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${authToken}`,
      }
    })

    const data = await response.json()

    if (!response.ok) {
      return NextResponse.json(
        { success: false, message: data.error || 'Failed to get alerts' },
        { status: response.status }
      )
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('Get alerts error:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}

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

    const { userId, alertType, message, criteria, isActive } = await request.json()

    // Proxy to backend API
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/alerts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`,
      },
      body: JSON.stringify({
        userId: userId || authToken,
        alertType,
        message,
        criteria,
        isActive
      })
    })

    const data = await response.json()

    if (!response.ok) {
      return NextResponse.json(
        { success: false, message: data.error || 'Failed to create alert' },
        { status: response.status }
      )
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('Create alert error:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}