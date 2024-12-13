// Protecting routes with next-auth
// https://next-auth.js.org/configuration/nextjs#middleware
// https://nextjs.org/docs/app/building-your-application/routing/middleware
import NextAuth from 'next-auth';
import authConfig from './auth.config';

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  console.log("___req.auth:", req.auth);

  if (!req.auth) {
    const url = req.url.replace(req.nextUrl.pathname, '/');
    return Response.redirect(url);
  }

  const userRole = req?.auth?.user?.role;
  const url = new URL(req.url);

  // Redirect based on user role
  if (userRole === 'admin' && !url.pathname.startsWith('/dashboard/admin')) {
    url.pathname = '/dashboard/admin';
    return Response.redirect(url);
  } else if (userRole === 'partner' && !url.pathname.startsWith('/dashboard/partner')) {
    url.pathname = '/dashboard/partner';
    return Response.redirect(url);
  }
});

export const config = { matcher: ['/dashboard/:path*'] };
