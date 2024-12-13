import { Metadata } from 'next';
import UserAuth from './user-auth';
import Image from 'next/image';
import bg from '@/public/auth-pic.jpg';

export const metadata: Metadata = {
  title: 'Authentication',
  description: 'Authentication forms built using the components.'
};

export default function SignInViewPage() {
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
          <UserAuth />
        </div>
      </div>
    </div>
  );
}
