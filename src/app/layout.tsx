import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import Providers from "./providers";
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
            <CustomFooter />
          </Providers>
        </AppRouterCacheProvider>
      </body>
    </html >
  );
}
