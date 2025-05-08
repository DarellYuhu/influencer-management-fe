import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { BaseClient } from "./base-client";

declare module "next-auth" {
  /**
   * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      id: string;
      username: string;
      role: "ADMIN" | "USER";
      accessToken: string;
    };
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  trustHost: true,
  callbacks: {
    async authorized({ auth }) {
      return !!auth;
    },
    async session({ session, token }) {
      //@ts-ignore
      session.user = token.user;
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
  },
  providers: [
    Credentials({
      credentials: {
        username: {},
        password: {},
      },
      //@ts-ignore
      async authorize(credentials) {
        const response = await BaseClient.post<AuthResponse>(
          "/auth/sign-in",
          credentials
        ).catch(() => null);
        if (!response) return null;
        BaseClient.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${response.data.accessToken}`;
        const user = {
          ...response.data.user,
          accessToken: response.data.accessToken,
        };
        return user;
      },
    }),
  ],
});

type AuthResponse = {
  user: {
    id: string;
    username: string;
    role: "ADMIN" | "USER";
  };
  accessToken: string;
};
