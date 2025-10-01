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
    const openrouterApiKey = formData.get('openrouterApiKey') as string
    const model = formData.get('model') as string

    if (!file || !openrouterApiKey || !model) {
      return NextResponse.json(
        { success: false, message: 'File, OpenRouter API key, and model are required' },
        { status: 400 }
      )
    }

    // Create new FormData for backend
    const backendFormData = new FormData()
    backendFormData.append('file', file)
    backendFormData.append('openrouterApiKey', openrouterApiKey)
    backendFormData.append('model', model)

    // Proxy to backend API
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/ai-scan`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${authToken}`,
      },
      body: backendFormData
    })

    const data = await response.json()

    if (!response.ok) {
      return NextResponse.json(
        { success: false, message: data.error || 'AI scan failed' },
        { status: response.status }
      )
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('AI scan error:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}