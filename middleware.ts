import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const accessToken = request.cookies.get('accessToken')?.value;
  const refreshToken = request.cookies.get('refreshToken')?.value;

  if (!accessToken || !refreshToken) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  const response = await fetch(
    `${process.env.API_GATEWAY_URL}/api/v1/authorize`,
    {
      method: 'GET',
      headers: {
        cookie: `accessToken=${accessToken}; refreshToken=${refreshToken}`
      }
    }
  );

  if (!response.ok) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return;
}
export const config = {
  matcher: [
    {
      source:
        '/((?!signup|verify|login|assets|api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)'
    }
  ]
};

// '/((?!signup|verify|login|assets|api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)'
