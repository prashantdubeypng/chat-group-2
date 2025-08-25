
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // Check if user is accessing protected routes
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    // For now, just allow all requests through
    // You can add token validation logic here if needed
    return NextResponse.next()
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*']
}