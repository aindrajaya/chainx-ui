"use client"

import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, Shield, Activity, ArrowRight } from 'lucide-react' // Assuming you use lucide-react for icons
import Image from "next/image"
import { useAuth } from "../../lib/auth"

interface FormData {
  email: string
  password: string
  rememberMe: boolean
}

interface LoginResponse {
  success: boolean
  message?: string
  token?: string
}

export default function AuthPage() {
  const {login} = useAuth()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      await login(formData.email, formData.password)
    } catch (err) {
      setError('Invalid credentials')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit333 = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
  
    try {
      if (!formData.email || !formData.password) {
        setError("Please fill in all fields")
        return
      }
  
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          email: formData.email, 
          password: formData.password,
          rememberMe: formData.rememberMe 
        }),
      })
  
      const data: LoginResponse = await response.json()
  
      if (!response.ok) {
        throw new Error(data.message || "Authentication failed")
      }
  
      if (data.success && data.token) {
        // Store the token
        localStorage.setItem("token", data.token)
        
        // Optional: store remember me preference
        if (formData.rememberMe) {
          localStorage.setItem("rememberMe", "true")
        }
  
        router.push("/dashboard/init")
      } else {
        setError(data.message || "Invalid credentials")
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit2 = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      // Your authentication logic here
      // const response = await signIn(formData)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      router.push("/dashboard")
    } catch (err) {
      setError("Invalid credentials. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Left Panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary relative">
        <div className="absolute inset-0 bg-gradient-to-br from-primary to-green-800 opacity-90" />
        <div className="relative z-10 flex flex-col justify-center px-16 space-y-12">
          <div className="space-y-8">
            <div className="h-24 w-48 bg-white/10 rounded-xl flex items-center justify-center p-2">
              {/* <Shield className="text-white h-6 w-6" /> */}
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
            <h2 className="text-3xl font-bold text-gray-900">Welcome back</h2>
            <p className="mt-2 text-gray-600">Please sign in to your account</p>
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
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="rememberMe"
                    name="rememberMe"
                    type="checkbox"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                    className="h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary"
                  />
                  <label htmlFor="rememberMe" className="ml-2 text-sm text-gray-700">
                    Remember me
                  </label>
                </div>
                <Link href="/forgot-password" className="text-sm font-medium text-primary hover:text-green-600 transition-colors">
                  Forgot password?
                </Link>
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
                    <span>Signing in...</span>
                  </span>
                ) : (
                  <span className="flex items-center space-x-2">
                    <span>Sign in</span>
                    <ArrowRight className="h-5 w-5" />
                  </span>
                )}
              </button>
            </div>
          </form>

          <p className="text-center text-sm text-gray-600">
            Don't have an account?{' '}
            <Link href="/register" className="font-medium text-primary hover:text-green-600 transition-colors">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
