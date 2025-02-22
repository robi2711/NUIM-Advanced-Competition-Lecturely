import React from 'react';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Link from 'next/link';
import ThemeToggle from '@/app/components/common/ThemeToggle'

const logoStyle = {
    width: '30px',
    height: 'auto',
    cursor: 'pointer',
    marginRight: '8px',
};

function NavBar() {
    const scrollToSection = (sectionId: string) => {
        const sectionElement = document.getElementById(sectionId);
        const offset = 128;
        if (sectionElement) {
            const targetScroll = sectionElement.offsetTop - offset;
            sectionElement.scrollIntoView({ behavior: 'smooth' });
            window.scrollTo({
                top: targetScroll,
                behavior: 'smooth',
            });
        }
    };

    return (
        <AppBar
            position="fixed"
            sx={{
                boxShadow: 0,
                bgcolor: 'transparent',
                backgroundImage: 'none',
                mt: 2,
            }}
        >
            <Container maxWidth="lg">
                <Toolbar
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        borderRadius: '999px',
                        bgcolor: 'rgba(0, 0, 0, 0.4)',
                        backdropFilter: 'blur(24px)',
                        border: '2px solid',
                        borderColor: 'divider',
                        px: 2,
                    }}
                >
                    <Box sx={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
                        <img src="/lecturely.png" style={logoStyle} alt="Lecturely" />
                        <Typography
                            variant="subtitle1"
                            color="text.primary"
                            sx={{
                                fontSize: { xs: '0.9rem', sm: '1rem' },
                                whiteSpace: 'nowrap',
                            }}
                        >
                            Lecturely
                        </Typography>
                    </Box>

                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        <MenuItem onClick={() => scrollToSection('features')}>
                            <Typography variant="body2" color="text.primary">
                                Features
                            </Typography>
                        </MenuItem>
                        <MenuItem onClick={() => scrollToSection('faq')}>
                            <Typography variant="body2" color="text.primary">
                                FAQ
                            </Typography>
                        </MenuItem>
                    </Box>

                    <Box sx={{ display: 'flex', gap: { xs: 1, sm: 2 }, ml: { xs: 1, sm: 2 } }}>
                        <Link href="/SignUp" passHref>
                            <Button
                                color="primary"
                                variant="text"
                                size="small"
                                sx={{
                                    minWidth: 0,
                                    px: { xs: 1, sm: 2 },
                                    fontSize: { xs: '0.75rem', sm: '0.875rem' },
                                }}
                            >
                                Sign up
                            </Button>
                        </Link>
                        <Link href="/SignIn" passHref>
                            <Button
                                color="primary"
                                variant="contained"
                                size="small"
                                sx={{
                                    minWidth: 0,
                                    px: { xs: 1, sm: 2 },
                                    fontSize: { xs: '0.75rem', sm: '0.875rem' },
                                }}
                            >
                                Sign in
                            </Button>
                        </Link>
                    </Box>
                   
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default NavBar;