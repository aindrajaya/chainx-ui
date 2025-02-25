"use client"

import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function Header() {
  const router = useRouter()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // Navigation items array with special styling for Docs
  const navigationItems = [
    { name: "How it Works", href: "#how-it-works" },
    { name: "Features", href: "#features" },
    { name: "Examples", href: "#examples" },
    { name: "Contact", href: "#contact" },
    { 
      name: "Docs", 
      href: "https://docs.chainx.id",
      isPrimary: true, // Added flag for primary items
    }
  ]

  // Custom rendering function for navigation items
  const renderNavLink = (item: typeof navigationItems[0]) => {
    if (item.isPrimary) {
      return (
        <Link
          key={item.name}
          href={item.href}
          target="_blank" // Open docs in new tab
          className="relative group px-4 py-2 bg-home-50 rounded-lg text-home-500 hover:bg-home-100 transition-all duration-300 flex items-center space-x-1"
        >
          <span>{item.name}</span>
          <i className="fa-solid fa-arrow-up-right-from-square text-xs"></i>
        </Link>
      )
    }

    return (
      <Link
        key={item.name}
        href={item.href}
        className="relative group text-neutral-600 hover:text-home-500 transition-colors duration-300"
      >
        {item.name}
        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-home-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
      </Link>
    )
  }

  return (
    <header className="fixed w-full bg-white border-b border-neutral-200 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo - remains the same */}
          <Link href="/" className="flex items-center space-x-2">
            <i className="fa-solid fa-link-simple text-2xl text-neutral-800"></i>
            <Image 
              alt="main logo"
              src="/main-logo-light.svg"
              width={125}
              height={125}
              className="transition-transform duration-300 hover:scale-105"
            />
          </Link>

          {/* Desktop Navigation - updated */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigationItems.map(item => renderNavLink(item))}
          </nav>

          {/* Auth Buttons - remains the same */}
          <div className="hidden md:flex items-center space-x-4">
            <button 
              onClick={() => router.push('/auth/signin')} 
              className="px-4 py-2 text-neutral-600 hover:text-neutral-900 transition-colors duration-300"
            >
              Log In
            </button>
            <button 
              className="px-4 py-2 bg-home-500 text-white rounded-lg hover:bg-home-600 transition-all duration-300 transform hover:-translate-y-0.5"
            >
              Sign Up
            </button>
          </div>

          {/* Mobile Menu Button - remains the same */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-neutral-600 hover:text-neutral-900 focus:outline-none"
            >
              <i className={`fa-solid ${isMenuOpen ? 'fa-xmark' : 'fa-bars'} text-2xl transition-transform duration-300 ${isMenuOpen ? 'rotate-90' : 'rotate-0'}`}></i>
            </button>
          </div>
        </div>

        {/* Mobile Menu - updated */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-neutral-200 shadow-lg">
            <div className="container mx-auto px-4 py-4">
              {/* Navigation Items */}
              <nav className="space-y-4">
                {navigationItems.map((item) => (
                  item.isPrimary ? (
                    <Link
                      key={item.name}
                      href={item.href}
                      target="_blank"
                      className="block py-2 px-4 bg-home-50 rounded-lg text-home-500 hover:bg-home-100 transition-all duration-300 flex items-center justify-between"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <span>{item.name}</span>
                      <i className="fa-solid fa-arrow-up-right-from-square text-xs"></i>
                    </Link>
                  ) : (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="block py-2 text-neutral-600 hover:text-home-500 transition-colors duration-300"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  )
                ))}
              </nav>

              {/* Mobile Auth Buttons - remains the same */}
              <div className="mt-6 space-y-3">
                <button 
                  onClick={() => {
                    router.push('/auth/signin')
                    setIsMenuOpen(false)
                  }} 
                  className="w-full px-4 py-2 text-neutral-600 hover:text-neutral-900 transition-colors duration-300"
                >
                  Log In
                </button>
                <button 
                  className="w-full px-4 py-2 bg-home-500 text-white rounded-lg hover:bg-home-600 transition-colors duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
