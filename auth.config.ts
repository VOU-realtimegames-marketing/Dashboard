import { NextAuthConfig } from 'next-auth';
import CredentialProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';

const authConfig = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID ?? '',
      clientSecret: process.env.GOOGLE_SECRET ?? ''
    }),
    CredentialProvider({
      credentials: {
        email: { type: 'email' },
        password: { type: 'password' }
      },
      async authorize(credentials, req) {
        console.log('___credentials', credentials);

        // Fake user for testing purposes
        const user = {
          id: '1',
          name: 'Name',
          role: 'admin', // Hard-coded role "admin" || "partner"
          email: (credentials?.email as string) || 'admin@vou.vn'
        };

        if (user) {
          return user;
        }
        return null;
      }
    })
  ],
  pages: {
    signIn: '/' // Sign-in page
  },
  callbacks: {
    async jwt({ token, user }) {
      // Nếu có user (sau khi login), thêm thông tin vào token
      if (user) {
        token.role = user.role; // Lưu role vào token
        token.id = user.id; // Lưu id vào token
      }
      return token;
    },
    async session({ session, token }) {
      console.log('___token', token); // Log để kiểm tra token

      if (token) {
        session.user = {
          ...session.user,
          id: token.id as string, // Cast về string
          role: token.role as string // Cast về string
        };
      }
      console.log('___session', session); // Log để kiểm tra session
      return session;
    }
  },
  secret: process.env.NEXTAUTH_SECRET // Đảm bảo bạn đã đặt NEXTAUTH_SECRET
} satisfies NextAuthConfig;

export default authConfig;
