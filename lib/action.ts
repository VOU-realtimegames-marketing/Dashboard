'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { UserLoginFormValue } from './form-schema';

export async function signInAction(data: UserLoginFormValue) {
  const cookieStore = cookies();

  const response = await fetch(
    `${process.env.API_GATEWAY_URL}/api/v1/login_user`,
    {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' }
    }
  );

  if (!response.ok) {
    throw new Error('Failed to sign in');
  }

  const user = await response.json();
  // console.log(user);
  cookieStore.set('accessToken', user.access_token);
  cookieStore.set('refreshToken', user.refresh_token);

  redirect('/dashboard/admin/overview');
}
