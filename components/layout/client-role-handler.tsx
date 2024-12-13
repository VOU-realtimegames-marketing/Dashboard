'use client';

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import AppSidebar from '@/components/layout/app-sidebar';

export default function ClientRoleHandler({
  children
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    // Render loading state nếu session đang được tải
    return <div>Loading...</div>;
  }

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
