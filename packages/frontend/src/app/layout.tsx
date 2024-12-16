"use client"

import * as React from 'react';
import { createTheme, ThemeProvider } from "@mui/material";
import getLPTheme from "@/app/getLPTheme";
import CssBaseline from "@mui/material/CssBaseline";
import TopGradiant from "@/app/components/common/TopGradiant";
import Footer from "@/app/components/common/Footer";
import { UserProvider } from '@/app/components/services/UserContext';

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    const [mode, setMode] = React.useState<'light' | 'dark'>('dark');
    const theme = createTheme(getLPTheme(mode));

    return (
        <html lang="en">
        <head>
            <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap" rel="stylesheet"/>
            <title>Lecturely</title>
        </head>
        <body style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <UserProvider>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <TopGradiant/>
                <div style={{flex: 1}}>
                    {children}
                </div>
                <Footer/>
            </ThemeProvider>
        </UserProvider>
        </body>
        </html>
    )
}