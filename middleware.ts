// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Define auth routes that should redirect if user is logged in
const authRoutes = ['/', '/reset-password'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Get the session cookie that Appwrite sets
  const session = request.cookies.get('a_session_');
  const isAuthRoute = authRoutes.includes(pathname);

  // Redirect authenticated users away from auth routes
  if (session && isAuthRoute) {
    return NextResponse.redirect(new URL('/home', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/',
    '/reset-password',
  ],
}