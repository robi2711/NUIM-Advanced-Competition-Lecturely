'use client'
import * as React from 'react';
import { PaletteMode } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import NavBar from './components/landing/NavBar';
import Hero from './components/landing/Hero';
import Features from './components/landing/Features';
import FAQ from './components/landing/FAQ';
import Footer from './components/common/Footer';
import getLPTheme from './getLPTheme';

export default function LandingPage() {
  const [mode, setMode] = React.useState<PaletteMode>('dark');
  const [showCustomTheme, setShowCustomTheme] = React.useState(true);
  const LPtheme = createTheme(getLPTheme(mode));
  const defaultTheme = createTheme({ palette: { mode } });

  const toggleColorMode = () => {
    setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const toggleCustomTheme = () => {
    setShowCustomTheme((prev) => !prev);
  };

  return (
      <ThemeProvider theme={showCustomTheme ? LPtheme : defaultTheme}>
          <CssBaseline />
        <NavBar mode={mode} toggleColorMode={toggleColorMode} />
        <Hero />
        <Box sx={{ bgcolor: 'background.default' }}>
          <Features />
          <Divider />
          <Divider />
          <Divider />
          <Divider />
          <FAQ />
          <Divider />
          <Footer />
        </Box>
      </ThemeProvider>
  );
}
