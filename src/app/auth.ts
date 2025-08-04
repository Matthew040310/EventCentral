import NextAuth from "next-auth";
import Google from "next-auth/providers/google"
import type { Provider } from "next-auth/providers"
//import type { Session, User } from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./lib/prisma";

const APP_BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

const providers: Provider[] = [
  Google({
    clientId: process.env.AUTH_GOOGLE_ID!,
    clientSecret: process.env.AUTH_GOOGLE_SECRET!,
  }),
  // MicrosoftEntraID({
  //   clientId: process.env.AUTH_MICROSOFT_ENTRA_ID_ID!,
  //   clientSecret: process.env.AUTH_MICROSOFT_ENTRA_ID_SECRET!,
  //   issuer: process.env.AUTH_MICROSOFT_ENTRA_ID_ISSUER!,
  // })
];

const config = {
  adapter: PrismaAdapter(prisma),
  providers,
  session: {
    strategy: "database" as const,
  },
  trustHost: true,
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth/signin",
  },
  debug: false,
  basePath: APP_BASE_PATH,
};

export const { handlers, signIn, signOut, auth } = NextAuth(config);
