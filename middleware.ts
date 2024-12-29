import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { tokenExpiredMessage } from './app/api/auth/user/route';
import { el } from 'date-fns/locale';

export async function middleware(request: NextRequest) {
  const accessToken = request.cookies.get('accessToken')?.value;
  const refreshToken = request.cookies.get('refreshToken')?.value;
  const pathname = request.nextUrl.pathname;

  // Nếu không có accessToken hoặc refreshToken, redirect đến /login
  if (!accessToken || !refreshToken) {
    if (pathname === '/login' || pathname === '/') {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Lấy thông tin user từ API
  const response = await fetch(`${process.env.WEB_CLIENT_URL}/api/auth/user`, {
    method: 'GET',
    headers: {
      cookie: `accessToken=${accessToken}; refreshToken=${refreshToken}`
    }
  });

  if (!response.ok) {
    const errResponse = await response.json();
    if (response.status === 401 && errResponse.error === tokenExpiredMessage) {
      // Gia hạn accessToken
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

  const { user } = await response.json(); // Lấy thông tin user từ API
  const role = user?.role;

  const firstSegment = pathname.split('/')[1]; // e.g., "admin", "partner", or ""

  // Redirect logic based on role and path
  if (role === 'admin' && firstSegment !== 'admin') {
    return NextResponse.redirect(new URL('/admin/dashboard', request.url));
  } else if (role === 'partner' && firstSegment !== 'partner') {
    return NextResponse.redirect(new URL('/partner/dashboard', request.url));
  } else if (!['admin', 'partner'].includes(role)) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Continue the request if no redirect is needed
  return NextResponse.next();
}

export const config = {
  matcher: [
    // Exclude các route công khai
    '/((?!signup|verify|assets|api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)'
  ]
};
