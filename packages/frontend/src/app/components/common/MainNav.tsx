"use client"

import * as React from "react"
import Box from "@mui/material/Box"
import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import Button from "@mui/material/Button"
import Container from "@mui/material/Container"
import Divider from "@mui/material/Divider"
import Typography from "@mui/material/Typography"
import MenuItem from "@mui/material/MenuItem"
import Menu from "@mui/material/Menu"
import IconButton from "@mui/material/IconButton"
import MenuIcon from "@mui/icons-material/Menu"
import api from "@/app/components/services/apiService"
import { useState } from "react"
import CreateRoom from "./CreateRoomBox"
import JoinRoom from "./JoinRoomBox"
import { useUser } from "@/app/components/services/UserContext"
import { useTheme } from "@/app/components/services/ThemeContext";
import ModeNightRoundedIcon from "@mui/icons-material/ModeNightRounded";
import WbSunnyRoundedIcon from "@mui/icons-material/WbSunnyRounded";

const logoStyle = {
    width: "30px",
    height: "auto",
    cursor: "pointer",
    marginRight: "8px",
}

function NavBar() {
    const { userInfo } = useUser()
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const [mobileMenuAnchorEl, setMobileMenuAnchorEl] = useState<null | HTMLElement>(null)

    const handleUserSettingsClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget)
    }

    const { toggleMode , mode} = useTheme();
    const [openJoinRoom, setJoinOpen] = React.useState(false)
    const [openCreateRoom, setCreateOpen] = React.useState(false)

    const handleCreateClickOpen = () => {
        setCreateOpen(true)
        handleMobileMenuClose()
    }

    const handleCreateClose = () => {
        setCreateOpen(false)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    const handleJoinClickOpen = () => {
        setJoinOpen(true)
        handleMobileMenuClose()
    }

    const handleJoinClose = () => {
        setJoinOpen(false)
    }

    const handleSignOut = () => {
        sessionStorage.clear()
        api.post("/auth/signOut", {
            AccessToken: userInfo?.accessToken,
        })
        window.location.href = "/"
    }

    const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setMobileMenuAnchorEl(event.currentTarget)
    }

    const handleMobileMenuClose = () => {
        setMobileMenuAnchorEl(null)
    }

    return (
        <div>
            <AppBar
                position="fixed"
                sx={{
                    boxShadow: 0,
                    backgroundImage: "none",
                    mt: 2,
                    bgcolor: mode === 'light' ? 'rgba(255,255,255, 0.4)' : 'rgba(0, 0, 0, 0.4)',
                }}
            >
                <Container maxWidth="lg">
                    <Toolbar
                        variant="regular"
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            flexShrink: 0,
                            borderRadius: "999px",
                            bgcolor: mode === 'light' ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.4)',
                            backdropFilter: "blur(24px)",
                            border: "1px solid",
                            borderColor: "divider",
                            boxShadow: `0 0 1px rgba(85, 166, 246, 0.1), 1px 1.5px 2px -1px rgba(85, 166, 246, 0.15), 4px 4px 12px -2.5px rgba(85, 166, 246, 0.15)`,
                            py: { xs: 1, md: 0 },
                        }}
                    >
                        <Box
                            sx={{
                                flexGrow: 1,
                                display: "flex",
                                alignItems: "center",
                                ml: "-18px",
                                px: 0,
                            }}
                        >
                            <MenuItem onClick={() => (window.location.href = "/Lecturely")} sx={{ py: "6px", px: "12px" }}>
                                <img src="/lecturely.png" style={logoStyle} alt={"Lecturely"} />
                                <Typography variant="subtitle1" color="text.primary">
                                    Lecturely
                                </Typography>
                            </MenuItem>
                        </Box>
                        <Box
                            sx={{
                                display: { xs: "none", md: "flex" },
                                gap: 1.0,
                                alignItems: "center",
                            }}
                        >
                            <Button color="inherit" onClick={toggleMode}>
                                {mode === 'light' ? <ModeNightRoundedIcon /> : <WbSunnyRoundedIcon />}
                            </Button>
                            <Button color="primary" variant="text" size="medium" onClick={handleCreateClickOpen}>
                                Create
                            </Button>
                            <Button color="primary" variant="outlined" onClick={handleJoinClickOpen} size="medium">
                                Join
                            </Button>
                            <Divider orientation="vertical" flexItem />
                            <Button color="inherit" onClick={handleUserSettingsClick}>
                                User Settings
                            </Button>
                        </Box>
                        <Box sx={{ display: { xs: "flex", md: "none" } }}>
                            <IconButton
                                size="large"
                                aria-label="show more"
                                aria-controls="mobile-menu"
                                aria-haspopup="true"
                                onClick={handleMobileMenuOpen}
                                color="inherit"
                            >
                                <MenuIcon />
                            </IconButton>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
            <Menu
                anchorEl={mobileMenuAnchorEl}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                id="mobile-menu"
                keepMounted
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                open={Boolean(mobileMenuAnchorEl)}
                onClose={handleMobileMenuClose}
            >
                <MenuItem onClick={handleCreateClickOpen}>
                    <Typography textAlign="center">Create</Typography>
                </MenuItem>
                <MenuItem onClick={handleJoinClickOpen}>
                    <Typography textAlign="center">Join</Typography>
                </MenuItem>
                <MenuItem>
                    <Button color="inherit" onClick={toggleMode}>
                        {mode === 'light' ? <ModeNightRoundedIcon /> : <WbSunnyRoundedIcon />}
                    </Button>
                </MenuItem>
                <MenuItem onClick={handleSignOut}>
                    <Typography textAlign="center" color="error">
                        Log Out
                    </Typography>
                </MenuItem>
            </Menu>
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
                <MenuItem>
                    <Button color="error" variant="contained" size="medium" onClick={handleSignOut}>
                        Log Out
                    </Button>
                </MenuItem>
            </Menu>
            <CreateRoom open={openCreateRoom} handleClose={handleCreateClose} />
            <JoinRoom open={openJoinRoom} handleClose={handleJoinClose} />
        </div>
    )
}

export default NavBar