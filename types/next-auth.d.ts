import NextAuth, { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  /**
   * Extend the default User type
   */
  interface User {
    id: string;
    role?: string; // Thêm thuộc tính role
    username?: string; // Bạn có thể thêm các thuộc tính khác nếu cần
    someExoticUserProperty?: string;
  }

  /**
   * Extend the Session type
   */
  interface Session {
    user?: {
      id: string;
      role?: string;
      username?: string;
      someExoticUserProperty?: string;
    } & DefaultSession['user']; // Kế thừa các thuộc tính mặc định
  }
}

declare module 'next-auth/jwt' {
  /**
   * Extend the JWT type
   */
  interface JWT {
    id: string;
    role?: string; // Thêm thuộc tính role vào JWT
    username?: string;
  }
}
