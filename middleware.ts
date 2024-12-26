import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Redirection des anciennes URLs vers les nouvelles
  if (request.nextUrl.pathname.startsWith('/movie/')) {
    const id = request.nextUrl.pathname.split('/')[2];
    return NextResponse.redirect(new URL(`/film/${id}`, request.url));
  }

  if (request.nextUrl.pathname.startsWith('/category/')) {
    const category = request.nextUrl.pathname.split('/')[2];
    return NextResponse.redirect(new URL(`/categorie/${category}`, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/movie/:path*', '/category/:path*'],
};