'use client'
import * as React from "react";
import axios from "axios";
import { Box, Button, Typography } from "@mui/material";

const MicTestPage: React.FC = () => {
    const [transcript, setTranscript] = React.useState("");

    const sendResultsToBackend = async (results: SpeechRecognitionResultList) => {
        const resultsArray = Array.from(results)
            .slice(0, 3)
            .map(result => ({
                transcript: result[0]?.transcript || ""
            }));

        try {
            const response = await axios.post('http://localhost:3001/receivePhrase', {
                results: resultsArray,
            });

            console.log('Backend response:', response.data);
        } catch (error) {
            console.error('Error sending results to backend:', error);
        }
    };
    const handleMicTest = () => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        let transcript = "";
        recognition.lang = "en-US";
        recognition.continuous = true;
        recognition.onresult = async function(event) {
            const fullTranscript = Array.from(event.results)
                .map(result => result[0].transcript)
                .join(" ");
            setTranscript(fullTranscript);

            await sendResultsToBackend(event.results);
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

