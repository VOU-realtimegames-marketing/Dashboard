import { cookies } from 'next/headers';

export async function auth() {
  const cookieStore = cookies();
  const accessToken = cookieStore.get('accessToken')?.value;
  const refreshToken = cookieStore.get('refreshToken')?.value;

  // console.log({ accessToken, refreshToken });
  if (!accessToken || !refreshToken) {
    return null;
  }

  const response = await fetch(`${process.env.WEB_CLIENT_URL}/api/auth/user`, {
    method: 'GET',
    headers: {
      cookie: `accessToken=${accessToken}; refreshToken=${refreshToken}`
    }
  });

  if (!response.ok) {
    return null;
  }

  const session = await response.json();
  return session;
}
