import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const tokenExpiredCode = 2;
export const tokenExpiredMessage = 'invalid access token: token has expired';

export async function GET(request: NextRequest) {
  const accessToken = request.cookies.get('accessToken')?.value;
  const refreshToken = request.cookies.get('refreshToken')?.value;

  const response = await fetch(
    `${process.env.API_GATEWAY_URL}/api/v1/authorize`,
    {
      method: 'GET',
      headers: {
        cookie: `accessToken=${accessToken}; refreshToken=${refreshToken}`
      },
      next: { revalidate: 0 }
    }
  );

  const data = await response.json();
  // console.log('🚀', { data });
  if (data.code === tokenExpiredCode && data.message === tokenExpiredMessage) {
    return NextResponse.json(
      { error: 'invalid access token: token has expired' },
      { status: 401 }
    );
  }
  return NextResponse.json(data);
}
