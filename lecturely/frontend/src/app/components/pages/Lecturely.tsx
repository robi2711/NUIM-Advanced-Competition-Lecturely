'use client'
import * as React from 'react';
import Footer from "@/app/components/common/Footer";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { PaletteMode } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import getLPTheme from "@/app/getLPTheme";

export default function DashboardPage() {
    const [mode] = React.useState<PaletteMode>('dark');
    const [showCustomTheme] = React.useState(true);
    const LPtheme = createTheme(getLPTheme(mode));
    const defaultTheme = createTheme({ palette: { mode } });


    return (
        <ThemeProvider theme={showCustomTheme ? LPtheme : defaultTheme}>
            <CssBaseline />
            <Box sx={{ bgcolor: 'background.default' }}>
                <Divider />
                <Footer />
            </Box>
            <footer />
        </ThemeProvider>
    );
}