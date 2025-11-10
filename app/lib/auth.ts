// hooks/useAuth.ts
"use client"

import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { fetchWithSession } from '@/lib/fetchWithSession'

interface LoginResponse {
  message: string
  userId: string
}

export function useAuth() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userId, setUserId] = useState<string | null>(null)

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const response = await fetchWithSession(
        '/api/auth/check',
        { method: 'GET' },
        { redirectOnUnauthorized: false }
      )

      // console.log("DATA FROM AUTH: ", await response.json())
      
      if (response.ok) {
        const data = await response.json()
        setIsAuthenticated(true)
        setUserId(data.userId)
      } else {
        setIsAuthenticated(false)
        setUserId(null)
      }
    } catch (error) {
      console.error('Auth check error:', error)
      setIsAuthenticated(false)
      setUserId(null)
    } finally {
      setIsLoading(false)
    }
  }

  const login = async (email: string, password: string) => {
    try {
      // Call our API route which proxies to the backend
      const response = await fetchWithSession(
        '/api/auth/login',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        },
        { redirectOnUnauthorized: false }
      )

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Login failed')
      }

      const data: LoginResponse = await response.json()
      
      setIsAuthenticated(true)
      setUserId(data.userId)
      router.push('/dashboard')
      
      return data
    } catch (error) {
      console.error('Login error:', error)
      throw error
    }
  }

  const logout = async () => {
    try {
      await fetchWithSession(
        '/api/auth/logout',
        { method: 'POST' },
        { redirectOnUnauthorized: false }
      )
      
      setIsAuthenticated(false)
      setUserId(null)
      router.push('/login')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  return {
    isLoading,
    isAuthenticated,
    userId,
    login,
    logout,
  }
}
