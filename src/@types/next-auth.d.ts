// next-auth.d.ts
import NextAuth, { DefaultSession, DefaultUser, JWT } from "next-auth";

// Extend the default JWT interface
declare module "next-auth/jwt" {
  interface JWT {
    /** The user's ID from the backend API */
    backendUserId?: string;
  }
}

// Extend the default session interface
declare module "next-auth" {
  interface Session {
    user: {
      /** The user's ID from the backend API */
      id: string;
    } & DefaultSession["user"];
  }

  // Extend the default User interface if needed
  interface User extends DefaultUser {
    accessToken?: string;
  }
}
