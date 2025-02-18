'use client'
import * as React from "react";
import api from '@/app/components/services/apiService';
import { Box, Button, Typography } from "@mui/material";

const MicTestPage: React.FC = () => {
    const [transcript, setTranscript] = React.useState("");

    const sendPhrase = async (phrase: string) => {
        try {
            const response = await api.post('/db/updateItem', {
                TableName: 'TestTable',
                itemAttributes: {
                    PK: "1739919756097736",
                    SK: "room",
                    data: {
                        UpdateExpression: "SET phraseList = list_append(if_not_exists(phraseList, :emptyList), :phrase)",
                        ExpressionAttributeValues: {
                            ":phrase": [phrase],
                            ":emptyList": [],
                        }
                    },
                }
            });
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleMicTest = () => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        let liveTranscript = "";

        recognition.lang = "en-GB";
        recognition.continuous = true;
        recognition.maxAlternatives = 3;

        recognition.onresult = async function(event) {
            const currentPhrase = event.results[event.results.length-1][0].transcript;
            liveTranscript = liveTranscript + currentPhrase;
            await sendPhrase(currentPhrase);
            setTranscript(liveTranscript);
        }

        recognition.start();

        recognition.onend = () => {
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
            <Box sx ={{p: 10}}>
                <Typography>
                    {transcript}
                </Typography>
            </Box>
        </Box>

    );
};

export default MicTestPage;

