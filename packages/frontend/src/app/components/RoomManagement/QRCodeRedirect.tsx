"use client"

import { useEffect } from "react"
import { Box, Typography, CircularProgress } from "@mui/material"

interface QRCodeRedirectProps {
    url: string
}

export default function QRCodeRedirect({ url }: QRCodeRedirectProps) {
    useEffect(() => {
        window.location.href = url
    }, [url])

    return (
        <Box
            sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100vh" }}
        >
            <CircularProgress size={60} />
            <Typography variant="h6" sx={{ mt: 2 }}>
                Redirecting...
            </Typography>
        </Box>
    )
}

