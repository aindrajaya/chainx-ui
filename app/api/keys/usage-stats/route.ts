import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    // Get session cookie from the request
    const sessionCookie = request.cookies.get('chainx.sid')

    if (!sessionCookie) {
      return NextResponse.json(
        { success: false, message: 'Not authenticated' },
        { status: 401 }
      )
    }

    // Get timeframe from query parameters
    const { searchParams } = new URL(request.url)
    const timeframe = searchParams.get('timeframe') || '24h' // Default to 24 hours

    // Validate timeframe parameter
    const validTimeframes = ['1h', '24h', '7d']
    if (!validTimeframes.includes(timeframe)) {
      return NextResponse.json(
        { success: false, message: 'Invalid timeframe. Use 1h, 24h, or 7d' },
        { status: 400 }
      )
    }

    // Use session authentication for usage stats
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/api-keys/usage-stats?timeframe=${timeframe}`, {
      method: 'GET',
      headers: {
        'Cookie': `chainx.sid=${sessionCookie.value}`,
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Ensures cookies are sent
    })

    let data
    try {
      data = await response.json()
    } catch (parseError) {
      console.error('Failed to parse response as JSON:', parseError)
      return NextResponse.json(
        { success: false, message: 'Invalid response from server' },
        { status: 500 }
      )
    }

    if (!response.ok) {
      return NextResponse.json(
        { success: false, message: data?.error || data?.message || 'Failed to get usage stats' },
        { status: response.status }
      )
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('Get usage stats error:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}