import { redirect } from 'next/navigation';
import GoogleSignInButton from '../_components/google-auth-button';
import Link from 'next/link';
import LoginForm from '../_components/login-form';

export default function UserAuth({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="flex flex-col space-y-2 text-center font-bold">
        <h1 className="text-3xl font-semibold tracking-tight">
          Welcome to VOU Marketing
        </h1>
        <p className="text-sm text-muted-foreground">
          <span>Don&apos;t have an account?</span>
          <Link href="/signup" className="ml-2 text-blue-500">
            Sign up for free
          </Link>
        </p>
      </div>

      <LoginForm />

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
