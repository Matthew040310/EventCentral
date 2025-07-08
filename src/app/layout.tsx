import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { Analytics } from "@vercel/analytics/next"
import Providers from "./providers";
import "./globals.css";
import CustomNavBar from "@/components/CustomNavBar";
import CustomFooter from "@/components/CustomFooter";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider>
          <Providers>
            <CustomNavBar />
            {children}
            <Analytics />
            <CustomFooter />
          </Providers>
        </AppRouterCacheProvider>
      </body>
    </html >
  );
}
