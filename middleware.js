import { NextResponse } from 'next/server';

export function middleware(req) {
  const session = req.cookies.get('session')?.value;
  const { pathname } = req.nextUrl;

  // 1. Libera arquivos internos e APIs
  if (pathname.startsWith('/_next') || pathname.includes('/api/') || pathname.includes('.')) {
    return NextResponse.next();
  }

  // 2. Se o usuário JÁ TEM um cookie e tenta entrar no /login, 
  // mandamos ele para o dashboard (o Layout lá dentro decidirá se ele é admin ou Pedro)
  if (pathname === '/login' && session) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  // 3. Se o usuário NÃO TEM cookie e tenta acessar áreas protegidas
  const isProtectedRoute = pathname.startsWith('/dashboard') || pathname.startsWith('/area_usuario');
  if (isProtectedRoute && !session) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/area_usuario/:path*', '/login'],
};
