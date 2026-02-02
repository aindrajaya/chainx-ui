import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    // Get session cookie from the request
    const sessionCookie = request.cookies.get('chainx.sid')

    if (!sessionCookie) {
      return NextResponse.json(
        { success: false, message: 'Not authenticated' },
        { status: 401 }
      )
    }

    // Get the request body
    const body = await request.json()
    const { name = "API Key", type = "PRODUCTION" } = body

    // Get userId from cookies (saved during login)
    const userIdCookie = request.cookies.get('userId')

    if (!userIdCookie) {
      return NextResponse.json(
        { success: false, message: 'User ID not found. Please log in again.' },
        { status: 401 }
      )
    }

    // Use session authentication for API key generation
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/generate-api-key`, {
      method: 'POST',
      headers: {
        'Cookie': `chainx.sid=${sessionCookie.value}`,
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Ensures cookies are sent
      body: JSON.stringify({
        userId: userIdCookie.value,
        type: type,
        name: name
      })
    })

    const data = await response.json()

    if (!response.ok) {
      return NextResponse.json(
        { success: false, message: data?.message || 'Failed to generate API key' },
        { status: response.status }
      )
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('Generate API key error:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to generate API key' },
      { status: 500 }
    )
  }
}
