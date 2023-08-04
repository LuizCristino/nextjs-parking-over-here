import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      email: string;
      isActive: boolean;
      createdAt: string;
      updatedAt: string;
      iat: number;
      exp: number;
      accessToken: string;
    };
    token: string;
  }
}
