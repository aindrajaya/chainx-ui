// app/api/auth/login/route.ts
import { NextResponse } from "next/server"
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

// In a real app, this would be in your database
const MOCK_USER = {
  id: '1',
  email: 'user@example.com',
  // password is "password123"
  password: '$2a$10$YaB6xpBcJe8M1yjWPTtj0.Zl4.2hbgQfTh7MZNFzHGz.F.8y0q9Aq',
  name: 'Test User'
}

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    // Basic validation
    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: "Email and password are required" },
        { status: 400 }
      )
    }

    // In a real application, you would fetch the user from your database
    // Here we're using a mock user
    if (email !== MOCK_USER.email) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 401 }
      )
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, MOCK_USER.password)
    if (!isValidPassword) {
      return NextResponse.json(
        { success: false, message: "Invalid credentials" },
        { status: 401 }
      )
    }

    // Create JWT token
    const token = jwt.sign(
      { 
        userId: MOCK_USER.id,
        email: MOCK_USER.email 
      },
      JWT_SECRET,
      { expiresIn: '24h' }
    )

    // Set HTTP-only cookie
    const response = NextResponse.json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: MOCK_USER.id,
        email: MOCK_USER.email,
        name: MOCK_USER.name
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