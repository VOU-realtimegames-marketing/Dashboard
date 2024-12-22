'use server';

import { cookies } from 'next/headers';
import {
  CreateEditStoreValue,
  StoreValue
} from '@/app/(app)/partner/stores/_data/schema';
import { revalidatePath } from 'next/cache';
import { CreateBranchData } from '@/app/(app)/partner/stores/[storeId]/_data/schema';

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

export async function deleteStoreAction(data: StoreValue) {
  const cookieStore = cookies();
  const accessToken = cookieStore.get('accessToken')?.value;
  const refreshToken = cookieStore.get('refreshToken')?.value;

  const response = await fetch(
    `${process.env.API_GATEWAY_URL}/api/v1/stores/${data.id}`,
    {
      method: 'DELETE',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        cookie: `accessToken=${accessToken}; refreshToken=${refreshToken}`
      }
    }
  );

  if (!response.ok) {
    throw new Error('Failed to delete store');
  }

  revalidatePath('/partner/stores');
}

export async function createBranchAction(data: CreateBranchData) {
  const cookieStore = cookies();
  const accessToken = cookieStore.get('accessToken')?.value;
  const refreshToken = cookieStore.get('refreshToken')?.value;

  const response = await fetch(
    `${process.env.API_GATEWAY_URL}/api/v1/create_branch`,
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
    throw new Error('Failed to create branch');
  }

  revalidatePath(`/partner/stores/${data.store_id}`);
}

export async function deleteBranchAction({
  id,
  store_id
}: {
  id: number;
  store_id: number;
}) {
  const cookieStore = cookies();
  const accessToken = cookieStore.get('accessToken')?.value;
  const refreshToken = cookieStore.get('refreshToken')?.value;

  const response = await fetch(
    `${process.env.API_GATEWAY_URL}/api/v1/branches/${id}`,
    {
      method: 'DELETE',
      headers: {
        cookie: `accessToken=${accessToken}; refreshToken=${refreshToken}`
      }
    }
  );

  if (!response.ok) {
    throw new Error('Failed to delete this branch');
  }

  revalidatePath(`/partner/stores/${store_id}`);
}
