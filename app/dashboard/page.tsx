import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';

// {
//   user: {
//     username: 'demo',
//     full_name: 'Haha Cuong',
//     email: 'demo@example.com',
//     role: 'user',
//     password_changed_at: '0001-01-01T00:00:00Z',
//     created_at: '2024-12-15T07:03:26.086298Z'
//   }
// }
export default async function Dashboard() {
  const session = await auth();

  if (!session?.user) {
    redirect('/login'); // Redirect to home if user is not authenticated
  }

  const { role } = session.user;

  if (role === 'admin') {
    redirect('/dashboard/admin/overview');
  } else if (role === 'partner') {
    redirect('/dashboard/partner/overview');
  } else {
    redirect('/login'); // Fallback redirect for unexpected roles
  }
}
