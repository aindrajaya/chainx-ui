import { NextResponse } from 'next/server'
import { getCookieData } from '../../../lib/cookies-exec'

export async function POST() {
  try {
    const cookieData = await getCookieData()
    const cookieDataToken = cookieData.find((cookie) => cookie.name === 'auth-token')
    const authToken = cookieDataToken?.value

    console.log('API key list Token get #0:', authToken)

    if (!authToken) {
      return NextResponse.json(
        { success: false, message: 'Not authenticated' },
        { status: 401 }
      )
    }

    const response = await fetch('http://localhost:3005/api/generate-api-key', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: "test",
        userId: authToken
      })
    })

    const data = await response.json()

    return NextResponse.json(data)
  } catch (error) {
    console.error('Generate API key error:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to generate API key' },
      { status: 500 }
    )
  }
}
