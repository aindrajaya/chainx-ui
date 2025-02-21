"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, BarChart2, Key, FileSearch } from "lucide-react"

const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Analytics", href: "/dashboard/analytics", icon: BarChart2 },
//   { name: "API Keys", href: "/dashboard/api-keys", icon: Key },
  { name: "Smart Contract Scan", href: "/dashboard/scan", icon: FileSearch },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="flex flex-col h-full bg-white  border-r border-gray-200  w-64">
      <div className="flex items-center justify-center h-16 border-b border-gray-200 border-x-0">
        <span className="text-2xl font-bold text-primary">ChainX</span>
      </div>
      <nav 
        className="flex-1 overflow-y-auto" 
        // style={{ marginTop: 'var(--header-height, 64px)' }}
      >
        <ul className="py-4">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className={`flex items-center px-4 py-2 text-sm font-medium ${
                  pathname === item.href
                    ? "text-primary bg-gray-100 "
                    : "text-gray-600 hover:text-primary hover:bg-gray-50"
                }`}
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}

