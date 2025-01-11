'use server';

import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';
import { CreateEventValue } from '@/app/(app)/partner/events/_data/schema';

export async function createEventAction(data: CreateEventValue) {
  const cookieStore = cookies();
  const accessToken = cookieStore.get('accessToken')?.value;
  const refreshToken = cookieStore.get('refreshToken')?.value;

  const response = await fetch(
    `${process.env.API_GATEWAY_URL}/api/v1/create_event`,
    {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        cookie: `accessToken=${accessToken}; refreshToken=${refreshToken}`
      }
    }
  );

  if (!response.ok) {
    throw new Error('Failed to create event');
  }

  revalidatePath('/partner/events');
}
