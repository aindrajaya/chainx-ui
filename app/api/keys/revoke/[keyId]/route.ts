import { NextRequest, NextResponse } from 'next/server'

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ keyId: string }> }
) {
  try {
    // Get session cookie from the request
    const sessionCookie = request.cookies.get('chainx.sid')

    if (!sessionCookie) {
      return NextResponse.json(
        { success: false, message: 'Not authenticated' },
        { status: 401 }
      )
    }

    const { keyId } = await params

    if (!keyId) {
      return NextResponse.json(
        { success: false, message: 'Key ID is required' },
        { status: 400 }
      )
    }

    // Use session authentication for key revocation
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/api-keys/${keyId}/revoke`, {
      method: 'POST',
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
        { success: false, message: data?.error || data?.message || 'Failed to revoke API key' },
        { status: response.status }
      )
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('Revoke API key error:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}