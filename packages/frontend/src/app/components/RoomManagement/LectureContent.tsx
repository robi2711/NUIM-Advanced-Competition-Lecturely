"use client"

import {
	Box,
	Paper,
	Typography,
	Button,
	List,
	ListItem,
	ListItemText,
	CssBaseline,
} from "@mui/material"
import api from "@/app/components/services/apiService";
import * as React from "react";


// Mock list of users
const users = ["Alice Smith", "Bob Johnson", "Charlie Brown", "Diana Prince", "Ethan Hunt"]


interface RoomInfo {
	PK: string;
}

interface LectureViewProps {
	roomInfo: RoomInfo;
}

export default function LectureView({ roomInfo }: LectureViewProps) {
	const [transcript, setTranscript] = React.useState("");
	const sendPhrase = async (roomPK: string, phrase: string) => {
		try {
			const response = await api.post('/db/updateItem', {
				TableName: 'TestTable',
				itemAttributes: {
					PK: roomPK,
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

	const handleTranscription = (roomInfo: RoomInfo) => {
		const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
		const recognition = new SpeechRecognition();
		let liveTranscript = "";

		recognition.lang = "en-GB";
		recognition.continuous = true;
		recognition.maxAlternatives = 3;

		recognition.onresult = async function(event) {
			const currentPhrase = event.results[event.results.length-1][0].transcript;
			liveTranscript = liveTranscript + currentPhrase;
			await sendPhrase(roomInfo.PK, currentPhrase);
			setTranscript(liveTranscript);
		}

		recognition.start();

		recognition.onend = () => {
			recognition.start();
		};
	};
	return (
		<Box>
			<CssBaseline />
			<Box sx={{ display: "flex", height: "100vh" }}>
				{/* Left box - Lecture content area */}
				<Box sx={{ width: "66.66%", p: 2, bgcolor: "background.default" }}>
					<Paper elevation={3} sx={{ height: "100%", p: 2 }}>
						<Typography variant="h4" gutterBottom>
							Lecture Content
						</Typography>
						<Typography variant="body1">{transcript}</Typography>
					</Paper>
				</Box>

				{/* Right box - User list and Stop button */}
				<Box sx={{ width: "33.33%", p: 2, bgcolor: "background.paper" }}>
					<Paper elevation={3} sx={{ height: "100%", p: 2, display: "flex", flexDirection: "column" }}>
						<Typography variant="h5" gutterBottom>
							Participants
						</Typography>
						<List sx={{ flexGrow: 1, overflow: "auto" }}>
							{users.map((user, index) => (
								<ListItem key={index}>
									<ListItemText primary={user} />
								</ListItem>
							))}
						</List>
						<Button variant="contained" color="secondary" size="large" onClick={() => handleTranscription(roomInfo)} sx={{ mt: 2 }}>
							Start Transcription
						</Button>
					</Paper>
				</Box>
			</Box>
		</Box>
	)
}

