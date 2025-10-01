"use client"

import Link from "next/link"
import { useState, useEffect, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Mail, Shield, Activity, ArrowRight, CheckCircle, RefreshCw } from 'lucide-react'
import Image from "next/image"

interface FormData {
  email: string
  otp: string
}

function VerifyEmailForm() {
  const [formData, setFormData] = useState({
    email: "",
    otp: ""
  })
  const [isLoading, setIsLoading] = useState(false)
  const [isResending, setIsResending] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const [resendMessage, setResendMessage] = useState("")
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    // Pre-fill email if provided in URL params
    const emailParam = searchParams.get('email')
    if (emailParam) {
      setFormData(prev => ({ ...prev, email: emailParam }))
    }
  }, [searchParams])

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
      if (!formData.email || !formData.otp) {
        setError("Please fill in all fields")
        return
      }

      if (formData.otp.length !== 8) {
        setError("OTP must be 8 digits")
        return
      }

      const response = await fetch('/api/verify-email', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          otp: formData.otp
        }),
      })

      const data = await response.json()

      if (response.ok) {
        // Success - email verified
        setSuccess(true)
        // Redirect to sign in after 3 seconds
        setTimeout(() => {
          router.push("/auth/signin")
        }, 3000)
      } else {
        // Error - API returns error message
        throw new Error(data.error || data.message || "Verification failed")
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleResendOTP = async () => {
    setIsResending(true)
    setResendMessage('')
    setError('')

    try {
      if (!formData.email) {
        setError("Please enter your email address")
        return
      }

      const response = await fetch('/api/resend-otp', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setResendMessage("A new verification code has been sent to your email")
      } else {
        throw new Error(data.error || data.message || "Failed to resend OTP")
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to resend verification code")
    } finally {
      setIsResending(false)
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
              <h2 className="text-3xl font-bold text-gray-900">Email Verified!</h2>
              <p className="mt-2 text-gray-600">
                Your email has been successfully verified. You can now sign in to your account.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm space-y-4">
              <p className="text-sm text-gray-600 text-center">
                Redirecting to sign in page...
              </p>
              <Link
                href="/auth/signin"
                className="w-full flex items-center justify-center py-3 px-4 border border-transparent rounded-lg text-white bg-primary hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors"
              >
                Go to Sign In
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

          <div className="grid grid-cols-2 gap-6">
            {[
              { icon: Shield, text: "Enterprise Security" },
              { icon: Activity, text: "Real-time Monitoring" },
            ].map((item, index) => (
              <div key={index} className="flex items-center space-x-3 text-white/90">
                <item.icon className="h-5 w-5" />
                <span className="text-sm">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <Mail className="h-8 w-8 text-blue-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Verify your email</h2>
            <p className="mt-2 text-gray-600">Enter the verification code sent to your email</p>
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

              <div>
                <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
                  Verification Code
                </label>
                <input
                  id="otp"
                  name="otp"
                  type="text"
                  required
                  value={formData.otp}
                  onChange={handleChange}
                  maxLength={8}
                  className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors text-center text-2xl font-mono tracking-widest"
                  placeholder="00000000"
                />
              </div>

              {error && (
                <div className="bg-red-50 text-red-500 text-sm p-3 rounded-lg">
                  {error}
                </div>
              )}

              {resendMessage && (
                <div className="bg-green-50 text-green-600 text-sm p-3 rounded-lg">
                  {resendMessage}
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
                    <span>Verifying...</span>
                  </span>
                ) : (
                  <span className="flex items-center space-x-2">
                    <span>Verify Email</span>
                    <ArrowRight className="h-5 w-5" />
                  </span>
                )}
              </button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={handleResendOTP}
                  disabled={isResending}
                  className="text-sm text-primary hover:text-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 mx-auto"
                >
                  {isResending ? (
                    <>
                      <RefreshCw className="h-4 w-4 animate-spin" />
                      <span>Resending...</span>
                    </>
                  ) : (
                    <>
                      <span>Didn't receive code? Resend</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>

          <div className="text-center space-y-2">
            <p className="text-sm text-gray-600">
              <Link href="/auth/register" className="font-medium text-primary hover:text-green-600 transition-colors">
                Back to registration
              </Link>
            </p>
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link href="/auth/signin" className="font-medium text-primary hover:text-green-600 transition-colors">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyEmailForm />
    </Suspense>
  )
}