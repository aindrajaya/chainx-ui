// app/api/auth/login/route.ts
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    // Proxy to backend API
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password
      })
    })

    const data = await response.json()
    console.log("Data form backend: ", data)

    if (!response.ok) {
      return NextResponse.json(
        { error: data.error || 'Login failed' },
        { status: response.status }
      )
    }

    // Validate that we have the required data
    if (!data.user.id) {
      console.error('Backend response missing userId:', data)
      return NextResponse.json(
        { error: 'Invalid response from backend' },
        { status: 500 }
      )
    }

    // Create response and forward session cookies from backend
    const nextResponse = NextResponse.json({
      message: data.message || "Login successful",
      userId: data.userId
    })

    // Forward session cookies from backend response
    const backendCookies = response.headers.get('set-cookie')
    if (backendCookies) {
      // Split multiple cookies and forward them
      const cookieArray = backendCookies.split(',')
      cookieArray.forEach(cookie => {
        // Parse cookie attributes
        const cookieParts = cookie.trim().split(';')
        const [nameValue] = cookieParts
        const [name, value] = nameValue.split('=')

        if (name && value) {
          nextResponse.cookies.set(name, value, {
            httpOnly: cookie.includes('HttpOnly'),
            secure: cookie.includes('Secure'),
            sameSite: cookie.includes('SameSite') ? 'lax' : 'lax', // Default to lax
            path: cookie.includes('Path=') ? cookie.split('Path=')[1].split(';')[0] : '/',
            maxAge: cookie.includes('Max-Age=') ? parseInt(cookie.split('Max-Age=')[1].split(';')[0]) : undefined
          })
        }
      })
    }

    nextResponse.cookies.set('userId', data.user.id, {
      httpOnly: false, // Allow JavaScript access
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7 // 7 days
    })

    return nextResponse

  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}
