import { Metadata } from 'next';
import Image from 'next/image';
import bg from '@/public/auth-pic.jpg';
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Authentication | Sign In',
  description: 'Sign In page for authentication.'
};

export default async function Layout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="container relative flex h-screen max-w-none flex-col items-center justify-center md:grid md:grid-cols-2 md:px-0">
      <div className="relative col-span-1 h-full bg-muted p-10 text-white max-[768px]:hidden dark:border-r">
        <Image
          src={bg}
          placeholder="blur"
          fill
          quality={80}
          alt="Authentication"
        />
      </div>
      <div className="flex flex-col justify-center bg-background lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]">
          {children}
        </div>
      </div>
    </div>
  );
}
