import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function Layout() {
  const session = await auth();

  const { role } = session.user;

  if (role === 'admin') {
    redirect('/admin/dashboard');
  } else {
    redirect('/login'); // Fallback redirect for unexpected roles
  }
}
