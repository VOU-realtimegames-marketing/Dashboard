import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function Page() {
  const session = await auth();

  const { role } = session.user;

  if (role === 'partner') {
    redirect('/partner/dashboard');
  } else {
    redirect('/login'); // Fallback redirect for unexpected roles
  }
}
