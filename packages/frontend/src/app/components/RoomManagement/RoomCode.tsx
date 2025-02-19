"use client"

import { useState } from "react"
import {
    Box,
    Paper,
    Typography,
    Button,
    ThemeProvider,
    createTheme,
    CssBaseline,
    Container,
    Divider,
} from "@mui/material"
import { Person, Lock } from "@mui/icons-material"
import LectureView from "./LectureContent"
import {useUser} from "@/app/components/services/UserContext";
import { useParams } from 'next/navigation';
import * as React from "react";
import api from "@/app/components/services/apiService";

interface RoomInfo {
    NameValue: string;
    password: string;
    PK: string;
}
interface RoomCodeProps {
    roomInfo: RoomInfo;
}

export default function RoomCode({ roomInfo }: RoomCodeProps){
    const [lectureStarted, setLectureStarted] = useState(false)

    if (lectureStarted) {
        return <LectureView roomInfo={roomInfo}/>
    }

    return (
        <Box>
            <CssBaseline />
            <Container component="main" maxWidth="xs" sx={{ height: "100vh", display: "flex", alignItems: "center" }}>
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
                </Paper>
            </Container>
        </Box>
    )
}

