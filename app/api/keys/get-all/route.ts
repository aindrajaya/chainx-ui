import { NextResponse } from 'next/server'
import { getCookieData } from '../../../lib/cookies-exec'

export async function GET() {
  try {
    const cookieData = await getCookieData()
    const cookieDataToken = cookieData.find((cookie) => cookie.name === 'auth-token')
    const authToken = cookieDataToken?.value.toString()

    console.log('Data Auth token get:', authToken)

    if (!authToken) {
      return NextResponse.json(
        { success: false, message: 'Not authenticated' },
        { status: 401 }
      )
    }

    console.log('API key list Token get #0:', authToken)

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/user-api-keys?userId=${authToken}`)

    console.log('API key list response #1:', response)

    const data = await response.json()

    console.log('API key list generated #1:', data.data.apiKeys)

    return NextResponse.json(data)
  } catch (error) {
    console.error('Generate API key error:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to get all API keys' },
      { status: 500 }
    )
  }
}
