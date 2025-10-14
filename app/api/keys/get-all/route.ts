import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    if (!process.env.NEXT_PUBLIC_API_BASE_URL) {
        throw new Error('API base URL not configured')
    }

    // Get session cookie from the request
    const sessionCookie = request.cookies.get('chainx.sid')

    if (!sessionCookie) {
      return NextResponse.json(
        { success: false, message: 'Not authenticated' },
        { status: 401 }
      )
    }

    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 5000)

    try {
      // Use session authentication
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/user-api-keys`, {
        method: 'GET',
        headers: {
          'Cookie': `chainx.sid=${sessionCookie.value}`,
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Ensures cookies are sent
        signal: controller.signal
      })

      clearTimeout(timeoutId);

      if (!response.ok) {
        console.error('Failed to get all API keys')
        return NextResponse.json(
          { success: false, message: 'Failed to get all API keys' },
          { status: response.status }
        )
      }

      const data = await response.json()
      console.log("DATA RECEIVED: ", data.data)

      // Backend returns full response object with success, message, and data
      if (!data.success) {
        console.error('No API keys found, or invalid response')
        return NextResponse.json(
          { success: false, message: 'No API keys found, or invalid response' },
          { status: 404 }
        )
      }

      return NextResponse.json(data)
    } catch (fetchError) {
      clearTimeout(timeoutId);
      if (fetchError.name === 'AbortError') {
        console.error('API request timed out')
        return NextResponse.json(
          { success: false, message: 'API request timed out' },
          { status: 500 }
        )
      }
      if (fetchError.code === 'ECONNREFUSED') {
        console.error('backend server not running or not accessible', {
          url: process.env.NEXT_PUBLIC_API_BASE_URL,
          error: fetchError
        })
        return NextResponse.json(
          { success: false, message: 'API request failed: Connection refused' },
          { status: 500 }
        )
      }
      throw fetchError
    }
  } catch (error) {
    console.error('Failed to get all API keys:', error)

    const errorMessage = error.message === 'backend server not running or not accessible' ?
    'Backend server not running or not accessible' : 'Failed to get all API keys'

    return NextResponse.json(
      { success: false, message: errorMessage, error: process.env.NODE_ENV === 'development' ? error.message : undefined },
      { status: error.message === 'backend server not running or not accessible' ? 503 : 500 }
    )
  }
}
