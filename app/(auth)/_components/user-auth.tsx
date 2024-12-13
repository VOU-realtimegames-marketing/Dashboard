'use client';

import { useState } from 'react';
import GoogleSignInButton from './google-auth-button';
import LoginForm from './login-form';
import SignupForm from './signup-form';

export default function UserAuth() {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <>
      <div className="flex flex-col space-y-2 text-center font-bold">
        <h1 className="text-3xl font-semibold tracking-tight">
          {showLogin ? 'Welcome to VOU Marketing' : 'Create an account'}
        </h1>
        <p className="text-sm text-muted-foreground">
          <span>
            {showLogin ? "Don't have an account?" : 'Already have an account?'}
          </span>
          <button
            className="ml-2 text-blue-500"
            onClick={() => setShowLogin((show) => !show)}
          >
            {showLogin ? 'Sign up for free' : 'Login'}
          </button>
        </p>
      </div>
      {showLogin ? <LoginForm /> : <SignupForm />}

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">Or</span>
        </div>
      </div>
      <GoogleSignInButton />
    </>
  );
}
