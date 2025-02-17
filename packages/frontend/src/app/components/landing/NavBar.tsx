import * as React from 'react';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Link from 'next/link';


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
        <div>
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
                        sx={({
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            borderRadius: '999px',
                            bgcolor: 'rgba(0, 0, 0, 0.4)',
                            backdropFilter: 'blur(24px)',
                            border: '2px solid',
                            borderColor: 'divider',

                        })}
                    >
                        <Box
                            sx={{
                                flexGrow: 1,
                                display: 'flex',
                                alignItems: 'center',
                                ml: '-18px',
                                px: 0,
                            }}
                        >
                            <MenuItem
                                onClick={() => window.location.href = '/Lecturely'}
                                sx={{py: '6px', px: '12px'}}
                            >
                                <img
                                    src="/lecturely.png"
                                    style={logoStyle}
                                    alt={"Lecturely"}
                                />
                                <Typography variant="subtitle1" color="text.primary">
                                    Lecturely
                                </Typography>
                            </MenuItem>
                            <MenuItem
                                onClick={() => scrollToSection('features')}
                                sx={{py: '6px', px: '12px'}}
                            >
                                <Typography variant="body2" color="text.primary">
                                    Features
                                </Typography>
                            </MenuItem>
                            <MenuItem
                                onClick={() => scrollToSection('faq')}
                                sx={{py: '6px', px: '12px'}}
                            >
                                <Typography variant="body2" color="text.primary">
                                    FAQ
                                </Typography>
                            </MenuItem>
                        </Box>
                        <Box
                            sx={{
                                display: {xs: 'flex', md: 'flex'},
                                gap: 1.0,
                                alignItems: 'center',
                            }}
                        >
                            <Link href="/SignUp" passHref>
                                <Button
                                    color="primary"
                                    variant="text"
                                    size="medium"
                                >
                                    Sign up
                                </Button>
                            </Link>
                            <Link href="/SignIn" passHref>
                                <Button
                                    color="primary"
                                    variant="contained"
                                    size="medium"
                                >
                                    Sign in
                                </Button>
                            </Link>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        </div>
    );
}

export default NavBar;
