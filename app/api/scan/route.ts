import { NextRequest, NextResponse } from 'next/server'
import { getCookieData } from '../../lib/cookies-exec'

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

    // Get the form data
    const formData = await request.formData()
    const file = formData.get('file') as File
    const symbolic = formData.get('symbolic') === 'true'

    if (!file) {
      return NextResponse.json(
        { success: false, message: 'File is required' },
        { status: 400 }
      )
    }

    // Create new FormData for backend
    const backendFormData = new FormData()
    backendFormData.append('file', file)
    if (symbolic) {
      backendFormData.append('symbolic', 'true')
    }

    // Proxy to backend API
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/scan`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${authToken}`,
      },
      body: backendFormData
    })

    const data = await response.json()

    if (!response.ok) {
      return NextResponse.json(
        { success: false, message: data.error || 'Scan failed' },
        { status: response.status }
      )
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('Scan error:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}