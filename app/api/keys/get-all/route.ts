// app/api/keys/generate/route.ts
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function GET() {
  try {
    const cookieStore = cookies()
    const authToken = cookieStore.get('auth-token')

    if (!authToken) {
      return NextResponse.json(
        { success: false, message: 'Not authenticated' },
        { status: 401 }
      )
    }

    console.log('API key list Token get #0:', authToken.value)

    const response = await fetch(`http://localhost:3005/api/v1/user-api-keys?userId=${authToken.value}`, {
      method: 'GET'
    })

    const data = await response.json()

    console.log('API key list generated #1:', data.data.apiKeys)

    return NextResponse.json(data)
  } catch (error) {
    console.error('Generate API key error:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to generate API key' },
      { status: 500 }
    )
  }
}
