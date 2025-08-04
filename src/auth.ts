// auth.ts
import NextAuth, { User } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import Google from "next-auth/providers/google";
// import AzureADProvider from "next-auth/providers/azure-ad";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/app/api/prisma/dbClient";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [Google],
    callbacks: {
        async signIn({ user }: { user: User | null }) {
            // Check if email is not a string, convert it to a string
            const userEmail =
                typeof user?.email === "string" ? user.email : user?.email || "";

            // Check if the user's email is in the AuthorizedUsers table
            const authorizedUser = await prisma.authorizedUsers.findUnique({
                where: {
                    email: userEmail,
                },
            });

            if (!authorizedUser) {
                // If the user's email is not authorized, add the user to the AuthorizedUsers table
                await prisma.authorizedUsers.create({
                    data: {
                        email: userEmail,
                        // Set any other properties you want to store for this user
                    },
                });

                // Return true to allow access
                return true;
            }

            // User's email is authorized, allow access
            return true;
        },
        // async session({ session, token }) {
        //     // Ensure session is properly populated with user ID
        //     if (session.user) {
        //         (session.user as { id?: string }).id = token.sub as string;
        //     }
        //     return session;
        // },
        // async jwt({ token, user }) {
        //     // Ensure user ID is included in token
        //     if (user) {
        //         token.sub = user.id;
        //     }
        //     return token;
        // },
    },
    // debug: process.env.NODE_ENV === 'development',
})