import type { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "../db/prisma";
import { env } from "../config/env";

const isProduction = env.NODE_ENV === "production";
const rootDomain = env.NEXT_PUBLIC_ROOT_DOMAIN.split(":")[0];

export const authConfig: NextAuthConfig = {
  trustHost: true,
  adapter: PrismaAdapter(prisma),
  providers: [
    // 1. Google Connect for Public Tenants & Storefronts
    Google({
      clientId: env.AUTH_GOOGLE_ID,
      clientSecret: env.AUTH_GOOGLE_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),

    // 2. Internal Monitoring Credentials for Mabes (mabes.etalase.online) - Email & Password ONLY
    Credentials({
      id: "mabes-credentials",
      name: "Mabes Super Admin",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const email = String(credentials.email).trim().toLowerCase();
        const password = String(credentials.password);

        const isMatchEmail = email === env.MABES_ADMIN_EMAIL.toLowerCase();
        const isMatchPass = password === env.MABES_ADMIN_PASSWORD;

        if (isMatchEmail && isMatchPass) {
          return {
            id: "mabes-admin-root",
            name: "Super Admin Mabes",
            email: env.MABES_ADMIN_EMAIL,
            role: "SUPER_ADMIN",
          };
        }

        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  cookies: {
    sessionToken: {
      name: isProduction
        ? `__Secure-authjs.session-token`
        : `authjs.session-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: isProduction,
        domain: isProduction ? `.${rootDomain}` : undefined,
      },
    },
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as unknown as { role?: string }).role || "USER";

        const superAdminEmails = env.SUPER_ADMIN_EMAILS.split(",").map((e) =>
          e.trim().toLowerCase()
        );
        if (
          user.email &&
          (superAdminEmails.includes(user.email.toLowerCase()) ||
            user.email.toLowerCase() === env.MABES_ADMIN_EMAIL.toLowerCase())
        ) {
          token.role = "SUPER_ADMIN";
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token) {
        session.user.id = token.id as string;
        (session.user as unknown as { role: string }).role = (token.role as string) || "USER";
      }
      return session;
    },
  },
  pages: {
    signIn: "/onboarding",
    error: "/onboarding",
  },
};
