'use client'
import * as React from "react";
import { Box, Button, Typography } from "@mui/material";

const MicTestPage: React.FC = () => {
    const handleMicTest = () => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.onresult = async function(event) {
            const transcript = event.results[0][0].transcript;
            console.log(transcript);
        }
        recognition.start();
    };

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>
                Microphone Test
            </Typography>
            <Button variant="contained" color="primary" onClick={handleMicTest}>
                Start Mic Test
            </Button>
            {/* Add more components and logic as needed */}
        </Box>
    );
};

export default MicTestPage;

