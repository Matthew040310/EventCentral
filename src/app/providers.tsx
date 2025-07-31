"use client";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "@mui/material/styles";
import { SnackbarProvider } from "notistack";
import CssBaseline from "@mui/material/CssBaseline";
import AuthGate from "./AuthGate";
import theme from "@/styles/theme";

const APP_BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <AppRouterCacheProvider>
            <SessionProvider basePath={`${APP_BASE_PATH}/api/auth`} >
                <ThemeProvider theme={theme}>
                    <SnackbarProvider maxSnack={3}>
                        <CssBaseline />
                        <AuthGate>
                            {children}
                        </AuthGate>
                    </SnackbarProvider>
                </ThemeProvider>
            </SessionProvider>
        </AppRouterCacheProvider>
    );
}
