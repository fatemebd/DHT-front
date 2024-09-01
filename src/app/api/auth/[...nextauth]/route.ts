import NextAuth from "next-auth";
import type { AuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import axios from "@/utils/axios"; // Ensure this import correctly references your axios instance

const authOptions: AuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.NEXT_PUBLIC_GITHUB_ID as string,
      clientSecret: process.env.NEXT_PUBLIC_GITHUB_SECRET as string,
    }),
  ],

  callbacks: {
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
          // console.error("Error sending token to /github/", error);
        }
      }
      return token;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
