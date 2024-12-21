import { Branch } from '@/app/(app)/partner/stores/[storeId]/_data/schema';
import { StoreValue } from '@/app/(app)/partner/stores/_data/schema';
import { cookies } from 'next/headers';

type Stores = {
  stores: StoreValue[];
};

export async function getStoresOfOwner(): Promise<Stores> {
  const cookieStore = cookies();
  const accessToken = cookieStore.get('accessToken')?.value;
  const refreshToken = cookieStore.get('refreshToken')?.value;

  const response = await fetch(`${process.env.API_GATEWAY_URL}/api/v1/stores`, {
    method: 'GET',
    headers: {
      cookie: `accessToken=${accessToken}; refreshToken=${refreshToken}`
    },
    next: { revalidate: 3600 }
  });

  if (!response.ok) {
    return { stores: [] };
  }

  const stores = await response.json();
  // console.log(stores);
  return stores;
}

type GetBranchsResponse = {
  branchs: Branch[];
};

export async function getBranchs(storeId: string): Promise<GetBranchsResponse> {
  const cookieStore = cookies();
  const accessToken = cookieStore.get('accessToken')?.value;
  const refreshToken = cookieStore.get('refreshToken')?.value;

  const response = await fetch(
    `${process.env.API_GATEWAY_URL}/api/v1/stores/${storeId}/branches`,
    {
      method: 'GET',
      headers: {
        cookie: `accessToken=${accessToken}; refreshToken=${refreshToken}`
      },
      next: { revalidate: 0 }
    }
  );

  if (!response.ok) {
    return { branchs: [] };
  }

  const branches = await response.json();
  return branches;
}
