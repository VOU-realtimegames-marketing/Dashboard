import { redirect } from 'next/navigation';

export default async function Dashboard() {
  const session = { user: { role: 'nothing' } };

  if (!session?.user) {
    redirect('/'); // Redirect to home if user is not authenticated
  }

  const { role } = session.user;

  if (role === 'admin') {
    redirect('/dashboard/admin/overview');
  } else if (role === 'partner') {
    redirect('/dashboard/partner/overview');
  } else {
    redirect('/'); // Fallback redirect for unexpected roles
  }
}
