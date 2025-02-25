// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Paths that don't require authentication
const PUBLIC_PATHS = ['/sigin', '/register', '/forgot-password']

// Paths that should be protected
const PROTECTED_PATHS = ['/dashboard', '/profile', '/settings']

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const isAuthPage = PUBLIC_PATHS.some(path => pathname.startsWith(path))
  const isProtectedPage = PROTECTED_PATHS.some(path => pathname.startsWith(path))
  
  const token = request.cookies.get('auth-token')

  // Redirect to dashboard if logged in user tries to access auth pages
  if (isAuthPage && token) {
    return NextResponse.redirect(new URL('/dashboard/init', request.url))
  }

  // Redirect to login if user tries to access protected pages without token
  if (isProtectedPage && !token) {
    const loginUrl = new URL('/auth/signin', request.url)
    loginUrl.searchParams.set('from', pathname)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

// Configure which routes to run middleware on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
  ],
}
