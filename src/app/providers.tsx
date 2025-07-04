"use client";

import { ThemeProvider } from "@mui/material/styles";
import { SnackbarProvider } from "notistack";
import CssBaseline from "@mui/material/CssBaseline";
// import { SessionProvider } from "next-auth/react";
import theme from "@/styles/theme";

export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        // <SessionProvider>
        <ThemeProvider theme={theme}>
            <SnackbarProvider maxSnack={3}>
                <CssBaseline />
                {children}
            </SnackbarProvider>
        </ThemeProvider>
        // </SessionProvider>
    );
}
