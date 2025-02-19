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


export default function LectureLogin() {
    const [lectureStarted, setLectureStarted] = useState(false)
    const name = "John Doe"
    const password = "********"

    if (lectureStarted) {
        return <LectureView onStopLecture={() => setLectureStarted(false)} />
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
                        Lecture Login
                    </Typography>
                    <Box sx={{ mt: 2, mb: 2, width: "100%" }}>
                        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                            <Person sx={{ mr: 1, color: "text.secondary" }} />
                            <Typography variant="subtitle1">Name: {name}</Typography>
                        </Box>
                        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                            <Lock sx={{ mr: 1, color: "text.secondary" }} />
                            <Typography variant="subtitle1">Password: {password}</Typography>
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

