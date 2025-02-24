"use client"

import { useState } from "react"
import { Box, Paper, Typography, Button, CssBaseline, Container, Divider, Grid } from "@mui/material"
import { Person, Lock } from "@mui/icons-material"
import LectureView from "./LectureContent"
import { QRCodeSVG } from "qrcode.react"
import QRCodeRedirect from "./QRCodeRedirect"

interface RoomInfo {
    NameValue: string;
    password: string;
    PK: string;
    phraseList: string[];
    isActive: boolean;
    participantList: string[];
}

interface RoomCodeProps {
    roomInfo: RoomInfo;
}

export default function RoomCode({ roomInfo }: RoomCodeProps) {
    const [lectureStarted, setLectureStarted] = useState(false);
    const [showQRRedirect, setShowQRRedirect] = useState(false);

    if (lectureStarted || !roomInfo.isActive) {
        return <LectureView roomInfo={roomInfo} />
    }

    const qrCodeValue = `https://nuim-advanced-competition-lecturely-frontend-t1om.vercel.app/room/${roomInfo.PK}`

    return (
        <Box sx={{ minHeight: "100vh", display: "flex", alignItems: "center", py: 4 }}>
            <CssBaseline />
            <Container component="main" maxWidth="md">
                <Paper
                    elevation={3}
                    sx={{
                        padding: 4,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Typography component="h1" variant="h4" gutterBottom>
                        Lecture Information
                    </Typography>
                    <Grid container spacing={4}>
                        <Grid item xs={12} md={6}>
                            <Box sx={{ mt: 2, mb: 2, width: "100%" }}>
                                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                                    <Person sx={{ mr: 1, color: "text.secondary" }} />
                                    <Typography variant="subtitle1">Name: {roomInfo?.NameValue}</Typography>
                                </Box>
                                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                                    <Lock sx={{ mr: 1, color: "text.secondary" }} />
                                    <Typography variant="subtitle1">Password: {roomInfo?.password}</Typography>
                                </Box>
                            </Box>
                            <Divider sx={{ width: "100%", mb: 2 }} />
                            <Button
                                variant="contained"
                                color="primary"
                                size="large"
                                fullWidth
                                sx={{ mt: 2 }}
                                onClick={() => setLectureStarted(true)}
                            >
                                Start Lecture
                            </Button>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                <Typography variant="h6" gutterBottom>
                                    Scan to Join
                                </Typography>
                                <QRCodeSVG value={qrCodeValue} size={200} />
                            </Box>
                        </Grid>
                    </Grid>
                </Paper>
            </Container>
        </Box>
    )
}

