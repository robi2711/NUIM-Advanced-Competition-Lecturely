import * as React from 'react';
import { PaletteMode } from '@mui/material';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Link from 'next/link';
import {useState} from "react";


const logoStyle = {
    width: '30px',
    height: 'auto',
    cursor: 'pointer',
    marginRight: '8px',
};

interface AppAppBarProps {
    mode: PaletteMode;
    toggleColorMode: () => void;
}

function NavBar() {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleUserSettingsClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleSignOut = () => {
        sessionStorage.clear();
        window.location.href = 'http://localhost:3001/auth/logout';
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
                        variant="regular"
                        sx={({
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            flexShrink: 0,
                            borderRadius: '999px',
                            bgcolor: 'rgba(0, 0, 0, 0.4)',
                            backdropFilter: 'blur(24px)',
                            maxHeight: 40,
                            border: '1px solid',
                            borderColor: 'divider',
                            boxShadow: `0 0 1px rgba(85, 166, 246, 0.1), 1px 1.5px 2px -1px rgba(85, 166, 246, 0.15), 4px 4px 12px -2.5px rgba(85, 166, 246, 0.15)`

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
                            <Box sx={{display: {xs: 'none', md: 'flex'}}}>
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
                            </Box>
                        </Box>
                        <Box
                            sx={{
                                display: {xs: 'none', md: 'flex'},
                                gap: 1.0,
                                alignItems: 'center',
                            }}
                        >

                            <Link href="/CreateRoom" passHref>
                                <Button
                                    color="primary"
                                    variant="text"
                                    size="medium"
                                >
                                    Create Room
                                </Button>
                            </Link>

                            <Link href="/JoinRoom" passHref>
                                <Button
                                    color="primary"
                                    variant="outlined"
                                    size="medium"
                                >
                                    Join Room
                                </Button>
                            </Link>
                            <Divider orientation="vertical" flexItem />
                            <Button
                                color="inherit"
                                onClick={handleUserSettingsClick}
                            >
                                User Settings
                            </Button>
                            <Menu
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >
                                <MenuItem

                                >

                                        <Button
                                            color="error"
                                            variant="contained"
                                            size="medium"
                                            onClick={handleSignOut}
                                        >
                                            Log Out
                                        </Button>

                                </MenuItem>
                            </Menu>

                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        </div>
    );
}

export default NavBar;
