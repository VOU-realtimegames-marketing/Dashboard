'use server';

import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';
import { CreateEventValue } from '@/app/(app)/partner/events/_data/schema';

export async function createEventAction(data: CreateEventValue) {
  const cookieStore = cookies();
  const accessToken = cookieStore.get('accessToken')?.value;
  const refreshToken = cookieStore.get('refreshToken')?.value;

  console.log('__createEventAction: ', data);

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

export async function updateEventStatusAction(eventId: number) {
  const cookieStore = cookies();
  const accessToken = cookieStore.get('accessToken')?.value;
  const refreshToken = cookieStore.get('refreshToken')?.value;

  const response = await fetch(
    `${process.env.API_GATEWAY_URL}/api/v1/events/${eventId}/status`,
    {
      method: 'PATCH',
      body: JSON.stringify({ status: 'ready' }),
      headers: {
        'Content-Type': 'application/json',
        cookie: `accessToken=${accessToken}; refreshToken=${refreshToken}`
      }
    }
  );

  if (!response.ok) {
    throw new Error('Failed to update event');
  }

  revalidatePath('/admin/events');
  revalidatePath('/partner/events');
}
