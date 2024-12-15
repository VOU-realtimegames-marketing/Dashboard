import { Metadata } from 'next';
import SignInViewPage from '../_components/signin-view';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Authentication | Sign In',
  description: 'Sign In page for authentication.'
};

export default async function Page() {
  const session = { user: { role: 'nothing' } };

  // console.log('___session', session?.user);

  if (!session?.user) {
    // Nếu không có session, hiển thị trang đăng nhập
    return <SignInViewPage />;
  } else {
    // Kiểm tra role và điều hướng đến route tương ứng
    const role = session.user.role;

    if (role === 'admin') {
      redirect('/dashboard/admin/overview');
    } else if (role === 'partner') {
      redirect('/dashboard/partner/overview');
    } else {
      // Nếu role không hợp lệ, điều hướng về trang chính hoặc thông báo lỗi
      return <SignInViewPage />;
    }
  }
}
