/** app/api/auth/[...nextauth]/route.ts */

import NextAuth from "next-auth";
import type { AuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import GithubProvider from "next-auth/providers/github";


export const authOptions: AuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      console.log(user,"@@",token);
      return token
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
