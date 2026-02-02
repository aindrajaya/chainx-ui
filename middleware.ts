// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Paths that don't require authentication (include auth namespace)
const PUBLIC_PATHS = ['/auth/signin', '/auth/register', '/forgot-password', '/auth/verify-email']

// Paths that should be protected
const PROTECTED_PATHS = ['/dashboard', '/profile', '/settings']

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const isAuthPage = PUBLIC_PATHS.some(path => pathname.startsWith(path))
  const isProtectedPage = PROTECTED_PATHS.some(path => pathname.startsWith(path))
  
  // Accept either a legacy 'auth-token' or the session cookie 'chainx.sid'
  const token = request.cookies.get('auth-token')
  const session = request.cookies.get('chainx.sid')

  // Redirect to dashboard if logged in user tries to access auth pages
  if (isAuthPage && (token || session)) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  // Redirect to login if user tries to access protected pages without token
  if (isProtectedPage && !(token || session)) {
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
