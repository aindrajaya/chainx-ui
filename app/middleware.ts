// middleware.ts (in your root directory)
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Get the pathname of the request (e.g. /, /protected, /protected/123)
  const path = request.nextUrl.pathname

  // Define public paths that don't require authentication
  const isPublicPath = path === '/auth/signin' || path === '/auth/signup' || path === '/auth/forgot-password'

  // Get the token from the cookies
  const token = request.cookies.get('your-auth-token')?.value || ''

  // If the user is not authenticated and trying to access a protected route,
  // Redirect them to the signin page
  if (!token && !isPublicPath) {
    return NextResponse.redirect(new URL('/auth/signin', request.url))
  }

  // If the user is authenticated and trying to access a public route,
  // Redirect them to the home page
  if (token && isPublicPath) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return NextResponse.next()
}

// Configure which routes to run the middleware on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
