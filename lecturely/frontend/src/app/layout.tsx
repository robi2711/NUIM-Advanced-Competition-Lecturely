"use client"

import * as React from 'react';
import { createTheme, ThemeProvider } from "@mui/material";
import getLPTheme from "@/app/getLPTheme";
import CssBaseline from "@mui/material/CssBaseline";

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
      </head>
      <body>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}