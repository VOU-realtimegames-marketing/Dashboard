'use server';

import { cookies } from 'next/headers';
import {
  CreateEditStoreValue,
  StoreValue
} from '@/app/(app)/partner/stores/_data/schema';
import { revalidatePath } from 'next/cache';

export async function createStoreAction(data: CreateEditStoreValue) {
  const cookieStore = cookies();
  const accessToken = cookieStore.get('accessToken')?.value;
  const refreshToken = cookieStore.get('refreshToken')?.value;

  const response = await fetch(
    `${process.env.API_GATEWAY_URL}/api/v1/create_store`,
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
    throw new Error('Failed to create store');
  }

  revalidatePath('/partner/stores');
}

export async function updateStoreAction(data: StoreValue) {
  const cookieStore = cookies();
  const accessToken = cookieStore.get('accessToken')?.value;
  const refreshToken = cookieStore.get('refreshToken')?.value;

  const response = await fetch(
    `${process.env.API_GATEWAY_URL}/api/v1/stores/${data.id}`,
    {
      method: 'PATCH',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        cookie: `accessToken=${accessToken}; refreshToken=${refreshToken}`
      }
    }
  );

  if (!response.ok) {
    throw new Error('Failed to update store');
  }

  revalidatePath('/partner/stores');
}
