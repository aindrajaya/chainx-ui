"use client"
import type React from "react"
import Footer from "../../components/Footer"
import Header from "../../components/Header"
import Sidebar from "../../components/sidebar"
import { ThemeProvider } from "../../components/theme-provider"
import { useRouter, usePathname } from "next/navigation"
import {useEffect} from "react"
import { useAuth } from "../lib/auth"



export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const { isLoading, isAuthenticated } = useAuth()
    const router = useRouter()
    const pathname = usePathname()
  
    useEffect(() => {
      if (!isLoading && !isAuthenticated) {
        router.push('/auth/signin')
      }
    }, [isLoading, isAuthenticated])
  
    if (isLoading) {
      return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
          <div className="flex flex-col items-center space-y-4">
            <div className="relative">
              <div className="w-12 h-12 border-4 border-gray-200 border-t-primary rounded-full animate-spin"></div>
              <div className="absolute inset-0 w-12 h-12 border-4 border-transparent border-t-primary/30 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
            </div>
            <div className="text-center">
              <h3 className="text-lg font-medium text-gray-900 mb-1">Loading Dashboard</h3>
              <p className="text-sm text-gray-500">Please wait while we prepare your workspace...</p>
            </div>
          </div>
        </div>
      )
    }
  
    if (!isAuthenticated) {
      return null
    }

    return (
        // <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <div className="flex h-screen bg-gray-50">
            <Sidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
                <Header />
                <main key={pathname} className="flex-1 overflow-y-auto p-6">
                    {children}
                </main>
                    
                <Footer />
            </div>
        </div>
            
        // </ThemeProvider>
    )
}
