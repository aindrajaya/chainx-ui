"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, BarChart2, FileSearch } from "lucide-react"
import Image from "next/image"

const navItems = [
  { 
    name: "Initial Page", 
    href: "/dashboard", 
    icon: Home,
    isActive: true,
    isAvailable: true
  },

  { 
    name: "Dashboard", 
    href: "/dashboard", 
    icon: Home,
    isActive: false,
    isAvailable: false
  },
  { 
    name: "Scanner Analytics", 
    href: "/dashboard/analytics", 
    icon: BarChart2,
    isActive: false,
    isAvailable: false
  },
  { 
    name: "Smart Contract Scan", 
    href: "/dashboard/scan", 
    icon: FileSearch,
    isActive: false,
    isAvailable: false
  },
]

export default function Sidebar() {
  const pathname = usePathname()

  // Helper component for Coming Soon badge
  const ComingSoonBadge = () => (
    <span className="px-2 py-0.5 text-[10px] font-medium bg-neutral-100 text-neutral-600 rounded-full ml-auto">
      Coming Soon
    </span>
  )

  // Unavailable Menu Item Component
  const UnavailableMenuItem = ({ item }) => (
    <div
      className="group relative flex items-center gap-3 px-4 py-3 mb-1 rounded-lg
        text-neutral-400 cursor-not-allowed bg-neutral-50/50"
    >
      <item.icon className="h-5 w-5 text-neutral-400" />
      <span className="text-sm font-medium">{item.name}</span>
      <ComingSoonBadge />
      
      {/* Tooltip */}
      <div className="absolute -top-2 left-1/2 -translate-x-1/2 -translate-y-full 
        hidden group-hover:block px-2 py-1 bg-neutral-800 text-white text-xs 
        rounded whitespace-nowrap z-10">
        This feature is coming soon!
      </div>
    </div>
  )

  return (
    <div className="flex flex-col h-full bg-white border-r border-neutral-100 w-64 shadow-sm">
      {/* Logo Section */}
      <div className="flex items-center gap-2 px-6 py-5 border-neutral-100">
        <Image 
          src="/main-logo-light.svg" 
          alt="ChainX Logo" 
          width={125} 
          height={125}
        />
        <span className="text-xl font-semibold bg-gradient-to-r from-home-500 to-home-600 text-transparent bg-clip-text">
          ChainX
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 pt-4">
        <div className="px-3">
          {navItems.map((item) => (
            <div key={item.name}>
              {item.isAvailable ? (
                // Available menu items are clickable
                <Link
                  href={item.href}
                  className={`
                    flex items-center gap-3 px-4 py-3 mb-1 rounded-lg transition-all duration-200
                    ${item.isActive 
                      ? "bg-home-50 text-home-600 shadow-sm" 
                      : "text-neutral-600 hover:bg-neutral-50"
                    }
                  `}
                >
                  <item.icon 
                    className={`h-5 w-5 transition-colors
                      ${item.isActive ? "text-home-500" : "text-neutral-400"}
                    `} 
                  />
                  <span className={`text-sm font-medium ${item.isActive ? "font-semibold" : ""}`}>
                    {item.name}
                  </span>
                  {item.isActive && (
                    <div className="ml-auto w-1.5 h-1.5 rounded-full bg-home-500"></div>
                  )}
                </Link>
              ) : (
                // Using the new UnavailableMenuItem component
                <UnavailableMenuItem item={item} />
              )}
            </div>
          ))}
        </div>
      </nav>

      {/* Bottom Section */}
      <div className="p-4 border-t border-neutral-100">
        <div className="p-3 bg-neutral-50 rounded-lg">
          <p className="text-xs text-neutral-600 text-center">
            Need help? Check our
            <Link href="/docs" className="text-home-500 hover:text-home-600 ml-1">
              documentation
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
