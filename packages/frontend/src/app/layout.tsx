"use client"

import * as React from 'react';
import {createTheme, PaletteMode, ThemeProvider as MuiThemeProvider} from "@mui/material";
import getLPTheme from "@/app/getLPTheme";
import CssBaseline from "@mui/material/CssBaseline";
import TopGradiant from "@/app/components/common/TopGradiant";
import { UserProvider, useUser } from '@/app/components/services/UserContext';
import { useRouter, usePathname } from 'next/navigation';
import { ThemeProvider, useTheme } from "@/app/components/services/ThemeContext";

function ProtectedLayout({ children }: { children: React.ReactNode }) {
    const { userInfo } = useUser();
    const router = useRouter();
    const pathname = usePathname();

    React.useEffect(() => {
        const timer = setTimeout(() => {
            if (!userInfo && (pathname !== '/' && pathname !== '/SignIn' && pathname !== '/SignUp')) {
                router.push('/');
            }
        }, 200);

        return () => clearTimeout(timer);
    }, [userInfo, pathname, router]);

    return <>{children}</>;
}

function ThemedRootLayout({ children }: { children: React.ReactNode }) {
    const { mode } = useTheme();
    const themeMode: PaletteMode = mode === 'dark' || mode === 'light' ? mode : 'light';
    const theme = createTheme(getLPTheme(themeMode));

    return (
        <MuiThemeProvider theme={theme}>
            <CssBaseline/>
            <TopGradiant/>
            <ProtectedLayout>
                <div style={{flex: 1}}>
                    {children}
                </div>
            </ProtectedLayout>
        </MuiThemeProvider>
    );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
        <head>
            <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap" rel="stylesheet"/>
            <title>Lecturely</title>
        </head>
        <body style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <UserProvider>
            <ThemeProvider>
                <ThemedRootLayout>
                    {children}
                </ThemedRootLayout>
            </ThemeProvider>
        </UserProvider>
        </body>
        </html>
    );
}