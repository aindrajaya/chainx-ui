"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { 
  Bell,
  Settings,
  HelpCircle,
  User,
  LogOut,
  Menu,
  X,
  Search,
  ChevronDown
} from "lucide-react"
import { ThemeToggle } from "./theme-toggle"
import { useRouter } from "next/navigation"
import { useAuth } from "../app/lib/auth"

interface MenuItem {
  label: string
  href: string
}

interface HeaderProps {
  isNavigationDisabled?: boolean;
}

const mainMenuItems: MenuItem[] = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "API Keys", href: "/api-keys" },
  { label: "Documentation", href: "https://docs.chainx.id" },
  { label: "Support", href: "/support" },
]

export default function Header({ isNavigationDisabled = true }: HeaderProps) {
  const router = useRouter()
  const {logout} = useAuth()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)

  const notifications = [
    { id: 1, text: "New API key request", time: "2m ago" },
    { id: 2, text: "Usage limit warning", time: "1h ago" },
    { id: 3, text: "Security alert", time: "3h ago" },
  ]

  const handleLogout = async () => {
    await logout()
    router.push('/auth/signin')
  }

  return (
    <header 
        className="bg-white border-b border-gray-200 fixed w-full top-0 z-50"
        style={{ height: 'var(--header-height, 64px)' }} // 64px is the default height
        // Add this line to set the CSS variable
        onLoad={() => {
            document.documentElement.style.setProperty(
            '--header-height',
            `${document.querySelector('header')?.offsetHeight}px`
            )
        }}
    >
      <div className="max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-left justify-between h-16">
          {/* Left section - Logo and Main Navigation */}
          <div className="flex items-center">
            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`lg:hidden p-2 rounded-md text-gray-400 
                ${isNavigationDisabled 
                  ? 'opacity-50 cursor-not-allowed' 
                  : 'hover:text-gray-500 hover:bg-gray-100'}`}
              disabled={isNavigationDisabled}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>

            {/* Logo */}
            {/* <Link 
              href="/dashboard" 
              className="flex items-center space-x-2"
            >
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">Cx</span>
              </div>
              <span className="text-xl font-bold text-gray-900">ChainX</span>
            </Link> */}

            {/* Main navigation - Desktop */}
            <nav className="hidden lg:ml-10 lg:flex lg:space-x-8">
              {mainMenuItems.map((item) => (
                <Link
                  key={item.label}
                  href={isNavigationDisabled ? '#' : item.href}
                  className={`text-sm font-medium px-3 py-2 rounded-md
                    ${isNavigationDisabled 
                      ? 'text-gray-400 cursor-not-allowed pointer-events-none' 
                      : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'}`}
                  onClick={isNavigationDisabled ? (e) => e.preventDefault() : undefined}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Right section - Search, Notifications, and Profile */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="hidden md:block">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="search"
                  placeholder="Search..."
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm"
                />
              </div>
            </div>

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                <span className="absolute -top-1 -right-1 h-4 w-4 text-xs bg-red-500 text-white rounded-full flex items-center justify-center">
                  3
                </span>
                <Bell className="h-6 w-6" />
              </button>

              {/* Notifications dropdown */}
              {isNotificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                  <div className="py-2">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <h3 className="text-sm font-semibold text-gray-900">Notifications</h3>
                    </div>
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className="px-4 py-3 hover:bg-gray-50 cursor-pointer"
                      >
                        <p className="text-sm text-gray-600">{notification.text}</p>
                        <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
                      </div>
                    ))}
                    <div className="px-4 py-2 border-t border-gray-100">
                      <Link
                        href="/notifications"
                        className="text-sm text-primary hover:text-primary-dark"
                      >
                        View all notifications
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* <ThemeToggle /> */}

            {/* Help */}
            <button className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
              <HelpCircle className="h-6 w-6" />
            </button>

            {/* Profile dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                className="flex items-center space-x-2 text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary rounded-full"
              >
                <Image
                  src="/avatar.png"
                  alt="User"
                  width={32}
                  height={32}
                  className="rounded-full"
                />
                <ChevronDown className="h-4 w-4 text-gray-400" />
              </button>

              {isProfileMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                  <div className="py-1">
                    <Link
                      href="/profile"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <User className="h-4 w-4 mr-3" />
                      Your Profile
                    </Link>
                    <Link
                      href="/settings"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <Settings className="h-4 w-4 mr-3" />
                      Settings
                    </Link>
                    <button
                      className="flex items-center w-full px-4 py-2 text-sm text-red-700 hover:bg-gray-100"
                      onClick={() => handleLogout()}
                    >
                      <LogOut className="h-4 w-4 mr-3" />
                      Sign out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden">
          <div className="pt-2 pb-3 space-y-1">
            {mainMenuItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
