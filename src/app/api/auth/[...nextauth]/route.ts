import { fetchUserByUsername } from "@/services/Users";
import { hash } from "crypto";
import { AuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
  // session: {
  //   strategy: "jwt",
  // },
  providers: [
    CredentialsProvider({
      // name: "Credentials",
      type: "credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "Username" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Password",
        },
      },
      authorize: async (credential) => {
        try {
          const { username, password } = credential as {
            username: string;
            password: string;
          };

          // Simulate user from db
          const res = await fetchUserByUsername(username);
          const user = res[0];
          const hashPass = hash("sha256", "123456")

          if (username !== user.username || hash("sha256", password) !== hashPass) {
            throw new Error(`Invalid username or password`);
          }

          // If everything is correct, return the user object
          return {
            id: user.id,
            name: user.name,
            email: user.email,
            accessToken: "TemporaryAccessToken",
          };
        } catch (error) {
          console.log("Login error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    // This callback is used to store the user's access token in the JWT
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = (
          user as unknown as { accessToken: string }
        ).accessToken;
      }
      return token;
    },
    // This callback is used to send the token to the client
    async session({ session, token }) {
      (session as unknown as { accessToken: string }).accessToken =
        token.accessToken as string;
      return session;
    },
  },
  pages: {
    signIn: "/login",
    // signOut: "/signout",
    // error: "/error",
  },
  secret: process.env.NEXT_PUBLIC_NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

