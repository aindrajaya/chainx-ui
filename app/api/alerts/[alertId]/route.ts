import { NextRequest, NextResponse } from 'next/server'
import { getCookieData } from '../../../lib/cookies-exec'

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ alertId: string }> }
) {
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

    const { alertId } = await params
    const { userId, alertType, message, criteria, isActive } = await request.json()

    // Proxy to backend API
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/alerts/${alertId}`, {
      method: 'PUT',
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
        { success: false, message: data.error || 'Failed to update alert' },
        { status: response.status }
      )
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('Update alert error:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ alertId: string }> }
) {
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

    const { alertId } = await params
    const { userId } = await request.json()

    // Proxy to backend API
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/alerts/${alertId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`,
      },
      body: JSON.stringify({
        userId: userId || authToken
      })
    })

    const data = await response.json()

    if (!response.ok) {
      return NextResponse.json(
        { success: false, message: data.error || 'Failed to delete alert' },
        { status: response.status }
      )
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('Delete alert error:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}