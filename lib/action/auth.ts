'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { UserLoginFormValue, UserSignupFormValue } from '../form-schema';

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

  const session = await response.json();
  cookieStore.set('accessToken', session.access_token);
  cookieStore.set('refreshToken', session.refresh_token);
  redirect(`/${session.user.role}/dashboard`);
}

export async function signUpAction(data: UserSignupFormValue) {
  const signUpBody = {
    full_name: data.fullName,
    email: data.email,
    username: data.username,
    password: data.password,
    role: 'partner'
  };

  const response = await fetch(
    `${process.env.API_GATEWAY_URL}/api/v1/create_user`,
    {
      method: 'POST',
      body: JSON.stringify(signUpBody),
      headers: { 'Content-Type': 'application/json' }
    }
  );

  if (!response.ok) {
    throw new Error('Failed to sign up');
  }

  redirect('/login');
}

export async function signOutAction() {
  const cookieStore = cookies();

  cookieStore.delete('accessToken');
  cookieStore.delete('refreshToken');

  redirect('/login');
}
