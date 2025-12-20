import { NextResponse } from 'next/server';

export function middleware(req) {
  const session = req.cookies.get('session')?.value;
  const { pathname } = req.nextUrl;

  if (pathname.startsWith('/_next') || pathname.includes('/api/') || pathname.includes('.')) {
    return NextResponse.next();
  }

  // Se NÃO tem sessão e tenta acessar área restrita -> Login
  const isProtectedRoute = pathname.startsWith('/dashboard') || pathname.startsWith('/area_usuario');
  if (isProtectedRoute && !session) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/area_usuario/:path*', '/login'],
};