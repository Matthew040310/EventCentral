"use client";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "@mui/material/styles";
import { SnackbarProvider } from "notistack";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "@/styles/theme";

export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <AppRouterCacheProvider>
            {/* <SessionProvider> */}
            <ThemeProvider theme={theme}>
                <SnackbarProvider maxSnack={3}>
                    <CssBaseline />
                    {children}
                </SnackbarProvider>
            </ThemeProvider>
            {/* </SessionProvider> */}
        </AppRouterCacheProvider>
    );
}
