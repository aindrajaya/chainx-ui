"use client"

import Link from "next/link"
import { useState } from "react"
import { ArrowLeft, Mail, CheckCircle } from 'lucide-react'
import Image from "next/image"

interface FormData {
  email: string
}

export default function ForgotPasswordPage() {
  const [formData, setFormData] = useState({
    email: ""
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      if (!formData.email) {
        setError("Please enter your email address")
        return
      }

      const response = await fetch('/api/forgot-password', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email }),
      })

      const data = await response.json()

      if (response.ok) {
        // Success - API returns just a message on success
        setSuccess(true)
      } else {
        // Error - API returns error message
        throw new Error(data.error || data.message || "Failed to send reset email")
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  if (success) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        {/* Left Panel */}
        <div className="hidden lg:flex lg:w-1/2 bg-primary relative">
          <div className="absolute inset-0 bg-gradient-to-br from-primary to-green-800 opacity-90" />
          <div className="relative z-10 flex flex-col justify-center px-16 space-y-12">
            <div className="space-y-8">
              <div className="h-24 w-48 bg-white/10 rounded-xl flex items-center justify-center p-2">
                <Image src="/logo-teal.png" alt="ChainX Logo" width={180} height={120}/>
              </div>
              <h1 className="text-5xl font-bold text-white leading-tight">
                ChainX Dashboard
              </h1>
              <p className="text-green-100 text-xl leading-relaxed max-w-md">
                Your trusted solution for smart contract security and API key management
              </p>
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
          <div className="w-full max-w-md space-y-8">
            <div className="text-center">
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">Check your email</h2>
              <p className="mt-2 text-gray-600">
                We've sent a password reset link to <strong>{formData.email}</strong>
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm space-y-4">
              <p className="text-sm text-gray-600 text-center">
                Didn't receive the email? Check your spam folder or{" "}
                <button
                  onClick={() => setSuccess(false)}
                  className="text-primary hover:text-green-600 font-medium"
                >
                  try again
                </button>
              </p>

              <Link
                href="/auth/signin"
                className="w-full flex items-center justify-center py-3 px-4 border border-transparent rounded-lg text-white bg-primary hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back to sign in
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Left Panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary relative">
        <div className="absolute inset-0 bg-gradient-to-br from-primary to-green-800 opacity-90" />
        <div className="relative z-10 flex flex-col justify-center px-16 space-y-12">
          <div className="space-y-8">
            <div className="h-24 w-48 bg-white/10 rounded-xl flex items-center justify-center p-2">
              <Image src="/logo-teal.png" alt="ChainX Logo" width={180} height={120}/>
            </div>
            <h1 className="text-5xl font-bold text-white leading-tight">
              ChainX Dashboard
            </h1>
            <p className="text-green-100 text-xl leading-relaxed max-w-md">
              Your trusted solution for smart contract security and API key management
            </p>
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">Forgot your password?</h2>
            <p className="mt-2 text-gray-600">
              Enter your email address and we'll send you a link to reset your password.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6 bg-white p-8 rounded-xl shadow-sm">
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                  placeholder="name@company.com"
                />
              </div>

              {error && (
                <div className="bg-red-50 text-red-500 text-sm p-3 rounded-lg">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center py-3 px-4 border border-transparent rounded-lg text-white bg-primary hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <span className="flex items-center space-x-2">
                    <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
                    <span>Sending...</span>
                  </span>
                ) : (
                  <span className="flex items-center space-x-2">
                    <Mail className="h-5 w-5" />
                    <span>Send reset link</span>
                  </span>
                )}
              </button>
            </div>
          </form>

          <p className="text-center text-sm text-gray-600">
            Remember your password?{' '}
            <Link href="/auth/signin" className="font-medium text-primary hover:text-green-600 transition-colors">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}