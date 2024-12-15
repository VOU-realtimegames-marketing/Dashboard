'use client';

import { redirect } from 'next/navigation';
import AppSidebar from '@/components/layout/app-sidebar';

export default function ClientRoleHandler({
  children
}: {
  children: React.ReactNode;
}) {
  // const { data: session, status } = useSession();
  const session = {
    user: {
      role: 'nothing',
      id: '1',
      name: 'Name',
      email: 'demo@example.com',
      image:
        'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
    }
  };

  // if (status === 'loading') {
  //   // Render loading state nếu session đang được tải
  //   return <div>Loading...</div>;
  // }

  if (!session?.user) {
    // Nếu user chưa đăng nhập, redirect về trang chủ
    redirect('/');
  }

  const role = session.user.role || 'guest';

  return (
    <>
      <AppSidebar role={role} /> {/* Truyền role vào AppSidebar */}
      {children}
    </>
  );
}
