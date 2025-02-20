import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Container from "@mui/material/Container"
import Stack from "@mui/material/Stack"
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"
import { useTheme, useMediaQuery } from "@mui/material"

export default function Hero() {
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"))

    return (
        <Box sx={{ minHeight: "100vh", display: "flex", alignItems: "center" }}>
            <Container maxWidth="sm">
                <Stack spacing={4} useFlexGap sx={{ width: "100%" }}>
                    <Typography
                        component="h1"
                        variant={isMobile ? "h2" : "h1"}
                        sx={{
                            textAlign: "center",
                            fontWeight: "bold",
                        }}
                    >
                        Lecture
                        <Typography component="span" variant="inherit" sx={{ color: "primary.main" }}>
                            ly
                        </Typography>
                    </Typography>
                    <Typography variant="body1" textAlign="center" color="text.secondary">
                        Access real-time transcriptions of lectures and discussions, designed for students and individuals with
                        hearing impairments. Summarize and review your sessions effortlessly with AI-powered tools.
                    </Typography>
                    <Stack direction="column" spacing={2} useFlexGap sx={{ width: "100%" }}>
                        <TextField
                            id="email-input"
                            size="medium"
                            variant="outlined"
                            fullWidth
                            aria-label="Enter your email address"
                            placeholder="Your email address"
                            InputProps={{
                                sx: { borderRadius: 2 },
                            }}
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            href="/SignUp"
                            fullWidth
                            size="large"
                            sx={{
                                borderRadius: 2,
                                py: 1.5,
                            }}
                        >
                            Start now
                        </Button>
                    </Stack>
                </Stack>
            </Container>
        </Box>
    )
}

