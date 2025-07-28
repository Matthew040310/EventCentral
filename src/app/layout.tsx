import "./globals.css";
import Providers from "./providers";
import CustomNavBar from "@/components/CustomNavBar";
import { Analytics } from "@vercel/analytics/next";
import CustomFooter from "@/components/CustomFooter";

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
