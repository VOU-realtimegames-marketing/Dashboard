import { Session } from '@/constants/data';
import { cookies } from 'next/headers';

export async function auth(): Promise<Session> {
  const cookieStore = cookies();
  const accessToken = cookieStore.get('accessToken')?.value;
  const refreshToken = cookieStore.get('refreshToken')?.value;

  // // console.log({ accessToken, refreshToken });
  // if (!accessToken || !refreshToken) {
  //   return null;
  // }

  const response = await fetch(`${process.env.WEB_CLIENT_URL}/api/auth/user`, {
    method: 'GET',
    headers: {
      cookie: `accessToken=${accessToken}; refreshToken=${refreshToken}`
    }
  });

  const session = await response.json();
  return session;
}
