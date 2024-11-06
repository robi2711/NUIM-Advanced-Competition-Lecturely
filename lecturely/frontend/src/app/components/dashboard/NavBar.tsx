// NavBar.tsx
import Link from 'next/link';
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Container,
    IconButton,
    Menu,
    MenuItem,
} from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import React, { useState } from 'react';

// Define the props interface
interface NavBarProps {
    mode: 'light' | 'dark';
    toggleColorMode: () => void;
}

// Accept mode and toggleColorMode as props
const NavBar: React.FC<NavBarProps> = ({ mode, toggleColorMode }) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleUserSettingsClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        NutriScan
                    </Typography>
                    <Link href="/FoodDiary" passHref>
                        <Button color="inherit" sx={{ color: mode === 'light' ? 'black' : '#55A6F6' }}>Food Diary</Button>
                    </Link>
                    <Link href="/NutriBarcode" passHref>
                        <Button color="inherit" sx={{ color: mode === 'light' ? 'black' : '#55A6F6' }}>NutriBarcode</Button>
                    </Link>
                    {/* User Settings with Dropdown */}
                    <Button
                        color="inherit"
                        sx={{ color: mode === 'light' ? 'black' : '#55A6F6' }}
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
                            sx={{
                                backgroundColor: 'red',
                                color: 'white',
                                '&:hover': { backgroundColor: 'darkred' },
                            }}
                        >
                            <Link href="/" passHref>
                                <Button color="inherit" sx={{ color: 'white' }}>Log Out</Button>
                            </Link>
                        </MenuItem>
                    </Menu>
                    {/* IconButton to toggle light/dark mode */}
                    <IconButton onClick={toggleColorMode} color="inherit">
                        {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
                    </IconButton>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default NavBar;
