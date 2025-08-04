import "./globals.css";
import Providers from "./providers";
import CustomNavBar from "@/components/CustomNavBar";
import { Analytics } from "@vercel/analytics/next";
import CustomFooter from "@/components/CustomFooter";

// const APP_BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

export default function RootLayout({ children }: { children: React.ReactNode }) {

    return (
        <html lang="en">
            <body>
                <Providers>
                    <CustomNavBar />
                    {children}
                    <Analytics />
                    <CustomFooter />
                </Providers>
            </body>
        </html>
    );
}
