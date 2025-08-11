// auth.ts
import NextAuth, { User } from "next-auth";
import type { Provider } from "next-auth/providers"
import Google from "next-auth/providers/google";
// import AzureADProvider from "next-auth/providers/azure-ad";
import prisma from "@/app/api/prisma/dbClient";

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

export const { handlers, signIn, signOut, auth } = NextAuth({
    basePath: `${APP_BASE_PATH}/api/auth`,
    providers,
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
                return false;

                // Future Development. To route to Onboarding Page to create new Authorized User
                return `${APP_BASE_PATH}/SignIn/Onboarding`;
            }
            return true;
        },
        async jwt({ token, user }) {
            // When user signs in (user object only available at sign-in)
            if (user) {
                const userEmail = typeof user.email === "string" ? user.email : user.email || "";
                const authorizedUser = await prisma.authorizedUsers.findUnique({
                    where: { email: userEmail },
                });

                if (authorizedUser) {
                    token.role = authorizedUser.role;
                    token.group = authorizedUser.group;
                    token.department = authorizedUser.department;
                    token.cluster = authorizedUser.cluster;
                }
            }
            return token;
        },

        async session({ session, token }) {
            // Add the authorized user fields to the session.user object
            if (token) {
                session.user.role = token.role || "Guest";
                session.user.group = token.group || "";
                session.user.department = token.department || "";
                session.user.cluster = token.cluster || "";
            }
            return session;
        },
    },
    // debug: process.env.NODE_ENV === 'development',
})

// --- CAA 5 August 2025 ---
// NextAuth.js (as of v5 and current Next.js) doesn’t officially support basePath (serving your app at a subdirectory, e.g. /eventcentral)
// NextAuth and most OAuth flows expect routes like /api/auth/callback/... at the root, and do not resolve paths correctly when your app is configured to live under a subdirectory
//
// Key Problems:
// - Session and callback endpoints break,
// - Redirects misalign,
// - “Bad Request” or “UnknownAction: Cannot parse action” errors occur.
//
// Workaround:
// - Modify auth.ts to rewrite request, so that it contains proper hostname and basepath.
// Reference Link: https://github.com/nextauthjs/next-auth/discussions/12160