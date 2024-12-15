import GoogleSignInButton from '../_components/google-auth-button';
import Link from 'next/link';
import SignUpForm from '../_components/signup-form';

export default function Page() {
  return (
    <>
      <div className="flex flex-col space-y-2 text-center font-bold">
        <h1 className="text-3xl font-semibold tracking-tight">
          Create an account
        </h1>
        <p className="text-sm text-muted-foreground">
          <span>Already have an account?</span>
          <Link href="/login" className="ml-2 text-blue-500">
            Login
          </Link>
        </p>
      </div>

      <SignUpForm />

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
