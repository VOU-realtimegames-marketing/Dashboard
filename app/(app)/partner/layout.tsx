import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function Layout({
  children
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  const { role } = session.user;

  if (role !== 'partner') {
    return redirect('/login');
  }

  return <>{children}</>;
}
