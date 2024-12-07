'use client'
import * as React from "react";
import { Box, Button, Typography } from "@mui/material";

const MicTestPage: React.FC = () => {
    const [transcript, setTranscript] = React.useState("");
    const handleMicTest = () => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        let transcript = "";
        recognition.lang = "en-US";
        recognition.continuous = true;
        recognition.onresult = async function(event) {
            transcript = transcript + event.results[event.results.length-1][0].transcript;
            setTranscript(transcript);
        }
        recognition.start();
        recognition.onend = () => {
            recognition.start();
        };
        recognition.onerror = (event) => {
            console.error(event.error);
            recognition.start();
        };
    };

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>
                Microphone Test
            </Typography>
            <Button variant="contained" color="primary" onClick={handleMicTest}>
                Start Mic Test
            </Button>
            <Box sx ={{ p: 10}}>
                <Typography>
                    {transcript}
                </Typography>
            </Box>
        </Box>

    );
};

export default MicTestPage;

