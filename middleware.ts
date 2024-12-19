import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { tokenExpiredMessage } from './app/api/auth/user/route';

export async function middleware(request: NextRequest) {
  const accessToken = request.cookies.get('accessToken')?.value;
  const refreshToken = request.cookies.get('refreshToken')?.value;

  if (!accessToken || !refreshToken) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  const response = await fetch(`${process.env.WEB_CLIENT_URL}/api/auth/user`, {
    method: 'GET',
    headers: {
      cookie: `accessToken=${accessToken}; refreshToken=${refreshToken}`
    }
  });

  if (response.ok) {
    return;
  }

  const errResponse = await response.json();

  if (response.status === 401 && errResponse.error === tokenExpiredMessage) {
    // /api/v1/tokens/renew_access
    const renewResponse = await fetch(
      `${process.env.API_GATEWAY_URL}/api/v1/tokens/renew_access`,
      {
        method: 'POST',
        body: JSON.stringify({ refresh_token: refreshToken })
      }
    );

    if (!renewResponse.ok) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    const { access_token } = await renewResponse.json();
    if (access_token) {
      const nextResponse = NextResponse.next();
      nextResponse.cookies.set('accessToken', access_token, {
        httpOnly: true
      });
      return nextResponse;
    }
  }

  return NextResponse.redirect(new URL('/login', request.url));
}

export const config = {
  matcher: [
    '/((?!signup|verify|login|assets|api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)'
  ]
};

// '/((?!signup|verify|login|assets|api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)'
