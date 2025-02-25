// app/api/auth/login/route.ts
import { NextResponse } from "next/server"
import jwt from 'jsonwebtoken'

// Mock users with plain text passwords
const MOCK_USERS = [
  {
    id: '1',
    email: 'test@chainx.id',
    password: 'password123', // Plain text password
    name: 'Dev Mode'
  }
]

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    // Debug logging
    console.log('Login attempt:', { email, password })

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: "Email and password are required" },
        { status: 400 }
      )
    }

    const user = MOCK_USERS.find(u => u.email === email)
    
    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 401 }
      )
    }

    // Simple password check
    const isValidPassword = password === user.password
    
    if (!isValidPassword) {
      return NextResponse.json(
        { 
          success: false, 
          message: "Invalid credentials"
        },
        { status: 401 }
      )
    }

    const token = jwt.sign(
      { 
        userId: user.id,
        email: user.email,
        name: user.name
      },
      JWT_SECRET,
      { expiresIn: '24h' }
    )

    const response = NextResponse.json({
      success: true,
      message: "Login successful",
      user: {
        id: user.id,
        email: user.email,
        name: user.name
      }
    })

    response.cookies.set({
      name: 'auth-token',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 // 24 hours
    })

    return response

  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { success: false, message: "An error occurred during login" },
      { status: 500 }
    )
  }
}
