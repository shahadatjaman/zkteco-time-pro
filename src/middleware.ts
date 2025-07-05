import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  console.log('path', path)
  const isPublicPath = path === '/login' || path === '/forgot-password' || path === '/reset-password' || path === '/email-confirmation';
;
  const token = request.cookies.get('refresh_token')?.value ?? '';

  if (isPublicPath && token) {
    return NextResponse.redirect(new URL('/', request.nextUrl));
  }

  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL('/login', request.nextUrl));
  }

  return NextResponse.next(); // ✅ Allow the request to continue if no redirect is needed
}

// Configure which routes the middleware should apply to
export const config = {
  matcher: [
    '/((?!_next|api).*)', // ✅ Exclude Next.js internals and API routes
  ],
};