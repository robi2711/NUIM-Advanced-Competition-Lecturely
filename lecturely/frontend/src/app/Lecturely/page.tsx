import * as React from 'react';
import Footer from "../components/common/Footer";
import DashboardHero from "../components/dashboard/DashboardHero";
import NavBar from "../components/dashboard/NavBar";

import { ThemeProvider, createTheme } from '@mui/material/styles';
import { PaletteMode } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import getLPTheme from "../../theme";

export default function DashboardPage() {
    const [mode, setMode] = React.useState<PaletteMode>('dark');
    const [showCustomTheme] = React.useState(true);
    const LPtheme = createTheme(getLPTheme(mode));
    const defaultTheme = createTheme({ palette: { mode } });
    const toggleColorMode = () => {
        setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
    };


    return (
        <ThemeProvider theme={showCustomTheme ? LPtheme : defaultTheme}>
            <CssBaseline />
            <NavBar mode={mode}
                    toggleColorMode={toggleColorMode}/>
            <DashboardHero userName={'g'} />
            <Box sx={{ bgcolor: 'background.default' }}>
                <Divider />
                <Footer />
            </Box>
            <footer />
        </ThemeProvider>
    );
}