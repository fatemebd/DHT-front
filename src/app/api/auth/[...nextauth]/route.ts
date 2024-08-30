import NextAuth from "next-auth";
import type { AuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import axios from "@/utils/axios"; // Ensure this import correctly references your axios instance

export const authOptions: AuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.NEXT_PUBLIC_GITHUB_ID as string,
      clientSecret: process.env.NEXT_PUBLIC_GITHUB_SECRET as string,
    }),
  ],

  callbacks: {
    async signIn({ user, account }) {
      if (account!.provider === "github") {
        // Store the token temporarily in the user object
        // user.accessToken = account!.accessToken;
      }
      return true; // Return true to complete the sign-in process
    },

    async jwt({ token, user }) {
      if (user?.accessToken) {
        // This should only occur on the initial login
        token.accessToken = user.accessToken;

        // Send a POST request to "/github/" with the GitHub token
        try {
          await axios.post("http://localhost:8000/github/", {
            token: user.accessToken,
          });
        } catch (error) {
          console.error("Error sending token to /github/", error);
        }
      }
      return token;
    },

    async session({ session, token }) {
      if (token.accessToken) {
        // Append the token to the session for client-side use if needed
        // session.accessToken = token.accessToken;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
