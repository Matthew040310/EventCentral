import "./globals.css";
import Providers from "./providers";
import { SessionProvider } from "next-auth/react";
import CustomNavBar from "@/components/CustomNavBar";
import { Analytics } from "@vercel/analytics/next";
import CustomFooter from "@/components/CustomFooter";
import { auth } from "@/auth";

const APP_BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    const session = await auth();

    // if (!session) { console.log("No session", session) }

    return (
        <html lang="en">
            <body>
                <Providers>
                    <SessionProvider basePath={`${APP_BASE_PATH}/api/auth`} session={session}>
                        <CustomNavBar />
                        {children}
                        <Analytics />
                        <CustomFooter />
                    </SessionProvider>
                </Providers>
            </body>
        </html>
    );
}
