"use client"

import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import ThemeToggle from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

export default function Header() {
  const router = useRouter()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [theme, setTheme] = useState<"light" | "dark">("light")
  const isMobile = useIsMobile()

  // Track theme changes
  useEffect(() => {
    if (typeof window === "undefined") return;
    const hasDark = document.documentElement.classList.contains("dark");
    setTheme(hasDark ? "dark" : "light");

    // Listen for theme changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          const hasDark = document.documentElement.classList.contains("dark");
          setTheme(hasDark ? "dark" : "light");
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    return () => observer.disconnect();
  }, []);

  // Navigation items array with special styling for Docs
  const navigationItems = [
    { name: "How it Works", href: "#how" },
    { name: "Security Report", href: "#report" },
    { name: "Pricing", href: "#pricing" },
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
          className="relative group px-4 py-2 bg-primary/10 rounded-lg text-primary hover:bg-primary/20 transition-all duration-300 flex items-center space-x-1"
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
        onClick={(e) => {
          e.preventDefault();
          handleNavClick(item.href);
        }}
        className="hover:text-primary transition-colors duration-300 cursor-pointer"
      >
        {item.name}
      </Link>
    )
  }

  // Handle smooth scrolling for navigation links
  const handleNavClick = (href: string, isExternal: boolean = false) => {
    if (isExternal) return; // Let external links work normally

    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-background/60 bg-background/80 border-b">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo - conditional based on theme */}
          <Link href="/" className="flex items-center space-x-2">
            <i className="fa-solid fa-link-simple text-2xl text-neutral-800"></i>
            <Image 
              alt="main logo"
              src={theme === "dark" ? "/main-logo.svg" : "/main-logo-light.svg"}
              width={125}
              height={125}
              className="transition-transform duration-300 hover:scale-105"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6 text-sm">
            {navigationItems.map(item => renderNavLink(item))}
          </nav>

          {/* Auth Buttons - hidden on mobile */}
          {!isMobile && (
            <div className="flex items-center gap-3">
              <ThemeToggle />
              <Button variant="ghost" className="hidden sm:inline-flex cursor-pointer" onClick={() => router.push('/auth/signin')}>Sign in</Button>
              <Button className="inline-flex cursor-pointer">Get started</Button>
            </div>
          )}

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-3 text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-ring"
              aria-label="Toggle menu"
            >
              <i className={`fa-solid ${isMenuOpen ? 'fa-xmark' : 'fa-bars'} text-xl transition-transform duration-300 ${isMenuOpen ? 'rotate-90' : 'rotate-0'}`}></i>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur border-b shadow-lg">
            <div className="container mx-auto px-4 py-4">
              {/* Navigation Items */}
              <nav className="space-y-4">
                {navigationItems.map((item) => (
                  item.isPrimary ? (
                    <Link
                      key={item.name}
                      href={item.href}
                      target="_blank"
                      className="block py-2 px-4 bg-primary/10 rounded-lg text-primary hover:bg-primary/20 transition-all duration-300 flex items-center justify-between"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <span>{item.name}</span>
                      <i className="fa-solid fa-arrow-up-right-from-square text-xs"></i>
                    </Link>
                  ) : (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="block py-2 hover:text-primary transition-colors duration-300 cursor-pointer"
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavClick(item.href);
                        setIsMenuOpen(false);
                      }}
                    >
                      {item.name}
                    </Link>
                  )
                ))}
              </nav>

              {/* Mobile Auth Buttons */}
              <div className="mt-6 space-y-3">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-muted-foreground">Theme</span>
                  <ThemeToggle />
                </div>
                <Button 
                  variant="ghost"
                  className="w-full"
                  onClick={() => {
                    router.push('/auth/signin')
                    setIsMenuOpen(false)
                  }}
                >
                  Sign in
                </Button>
                <Button 
                  className="w-full"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Get started
                </Button>
              </div>
            </div>
          </div>
        )}
    </header>
  )
}
