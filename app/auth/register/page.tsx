"use client"

import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, Shield, Activity, ArrowRight, ArrowLeft, CheckCircle } from 'lucide-react'
import Image from "next/image"

interface FormData {
  name: string
  email: string
  password: string
  confirmPassword: string
}

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const router = useRouter()

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
      if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
        setError("Please fill in all fields")
        return
      }

      if (formData.password !== formData.confirmPassword) {
        setError("Passwords do not match")
        return
      }

      if (formData.password.length < 8) {
        setError("Password must be at least 8 characters long")
        return
      }

      const response = await fetch('/api/register', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password
        }),
      })

      const data = await response.json()

      if (response.ok) {
        // Success - registration successful, show verification message
        setSuccess(true)
      } else {
        // Error - API returns error message
        throw new Error(data.error || data.message || "Registration failed")
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  if (success) {
    return (
      <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors">
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
            <Link
              href="/"
              className="inline-flex items-center text-sm font-medium text-primary hover:text-green-600 dark:text-green-400 dark:hover:text-green-300 transition-colors w-fit"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to homepage
            </Link>

            <div className="text-center">
              <div className="mx-auto w-16 h-16 bg-green-100 dark:bg-green-500/10 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Check your email</h2>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                We've sent a verification code to <strong>{formData.email}</strong>
              </p>
            </div>

            <div className="bg-white dark:bg-gray-900/70 p-8 rounded-xl shadow-sm dark:shadow-gray-900/40 space-y-4">
              <p className="text-sm text-gray-600 dark:text-gray-300 text-center">
                Please check your email and click the verification link to complete your registration.
              </p>
              <Link
                href="/auth/verify-email"
                className="w-full flex items-center justify-center py-3 px-4 border border-transparent rounded-lg text-white bg-primary hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-950 focus:ring-primary transition-colors"
              >
                Go to Email Verification
              </Link>
            </div>

            <p className="text-center text-sm text-gray-600 dark:text-gray-300">
              Already have an account?{' '}
              <Link href="/auth/signin" className="font-medium text-primary hover:text-green-600 dark:text-green-400 dark:hover:text-green-300 transition-colors">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors">
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
          <Link
            href="/"
            className="inline-flex items-center text-sm font-medium text-primary hover:text-green-600 dark:text-green-400 dark:hover:text-green-300 transition-colors w-fit"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to homepage
          </Link>

          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Create your account</h2>
            <p className="mt-2 text-gray-600 dark:text-gray-300">Join ChainX to get started</p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6 bg-white dark:bg-gray-900/70 p-8 rounded-xl shadow-sm dark:shadow-gray-900/40">
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                  Full Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1 w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                  placeholder="name@company.com"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                  Password
                </label>
                <div className="mt-1 relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                  Confirm Password
                </label>
                <div className="mt-1 relative">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    required
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
                  >
                    {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              {error && (
                <div className="bg-red-50 dark:bg-red-500/10 text-red-500 dark:text-red-300 text-sm p-3 rounded-lg">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center py-3 px-4 border border-transparent rounded-lg text-white bg-primary hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-950 focus:ring-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <span className="flex items-center space-x-2">
                    <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
                    <span>Creating account...</span>
                  </span>
                ) : (
                  <span className="flex items-center space-x-2">
                    <span>Create account</span>
                    <ArrowRight className="h-5 w-5" />
                  </span>
                )}
              </button>
            </div>
          </form>

          <p className="text-center text-sm text-gray-600 dark:text-gray-300">
            Already have an account?{' '}
            <Link href="/auth/signin" className="font-medium text-primary hover:text-green-600 dark:text-green-400 dark:hover:text-green-300 transition-colors">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
