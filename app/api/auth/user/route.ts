import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const accessToken = request.cookies.get('accessToken')?.value;
  const refreshToken = request.cookies.get('refreshToken')?.value;

  const fetchResp = await fetch(
    `${process.env.API_GATEWAY_URL}/api/v1/authorize`,
    {
      method: 'GET',
      headers: {
        cookie: `accessToken=${accessToken}; refreshToken=${refreshToken}`
      },
      next: { revalidate: 15 * 60 }
    }
  );

  return NextResponse.json(await fetchResp.json());
}
