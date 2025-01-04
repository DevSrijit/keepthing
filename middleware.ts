// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { account } from '@/lib/appwrite'

// Define protected and public routes
const protectedRoutes = ['/(index)', '/home', '/settings'];
const authRoutes = ['/(auth)', '/login', '/signup', '/reset-password'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  try {
    const session = await account.getSession('current');
    const isAuthRoute = authRoutes.some(route => pathname.startsWith(route));
    const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));

    // Redirect authenticated users away from auth routes
    if (session && isAuthRoute) {
      return NextResponse.redirect(new URL('/home', request.url));
    }

    // Redirect unauthenticated users away from protected routes
    if (!session && isProtectedRoute) {
      return NextResponse.redirect(new URL('/', request.url));
    }

    return NextResponse.next();
  } catch (error) {
    // If there's an error checking the session and we're on a protected route,
    // redirect to auth page
    if (protectedRoutes.some(route => pathname.startsWith(route))) {
      return NextResponse.redirect(new URL('/', request.url));
    }
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}