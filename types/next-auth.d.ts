// types/next-auth.d.ts
import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface User {
    role: string; // Add the 'role' field
  }

  interface Session {
    user: {
      role: string; // Add the 'role' field in session
      id: string;
    };
  }

  interface JWT {
    role: string; // Add the 'role' field in JWT token
    id: string;
  }
}