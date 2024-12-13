import { auth } from '@/auth';
import { User } from 'next-auth';
import { redirect } from 'next/navigation';

export default async function Dashboard() {
  const session = await auth();

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

  // if (!session?.user) return;

  // const user: User = session.user;
  // console.log("___user:", user);

  // if (!user) {
  //   return redirect('/');
  // }

  // if (user.name === 'partner') {
  //   redirect('/dashboard/partner');
  // } else {
  //   redirect('/dashboard/overview');
  // }
}
