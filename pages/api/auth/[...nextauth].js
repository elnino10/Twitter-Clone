import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.WEB_CLIENT_ID,
      clientSecret: process.env.WEB_CLIENT_SECRET,
    }),
    // ...add more providers here
  ],
  pages: {
    signin: "/auth/signin",
    signup: "/auth/signup"
  }
};
export default NextAuth(authOptions);
