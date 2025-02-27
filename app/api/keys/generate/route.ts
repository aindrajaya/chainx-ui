// app/api/keys/generate/route.ts
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST() {
  try {
    const cookieStore = cookies()
    const authToken = cookieStore.get('auth-token')

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
        userId: authToken.value
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
