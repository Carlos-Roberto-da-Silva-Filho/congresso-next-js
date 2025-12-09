import { NextResponse } from 'next/server';

export function middleware(req) {
  const session = req.cookies.get('session');

  // Protege todas as rotas que começam com /dashboard
  if (!session && req.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // Se já estiver logado e tentar acessar login, manda pro dashboard
  if (session && req.nextUrl.pathname === '/login') {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/login'],
};
