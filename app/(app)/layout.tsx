import Header from '@/components/layout/header';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import { auth } from '@/lib/auth';
import AppSidebar from '@/components/layout/app-sidebar';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'VOU Realtime Game Marketing',
  description: 'Website for counterparties to manage their games and campaigns.'
};

export default async function AppLayout({
  children
}: {
  children: React.ReactNode;
}) {
  // Persisting the sidebar state in the cookie.
  const cookieStore = cookies();
  const defaultOpen = cookieStore.get('sidebar:state')?.value === 'true';
  const session = await auth();

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AppSidebar session={session} />
      <SidebarInset>
        <Header />
        {/* page main content */}
        {children}
        {/* page main content ends */}
      </SidebarInset>
    </SidebarProvider>
  );
}
