"use client"

import { Box, Paper, Typography, Button, List, ListItem, ListItemText, CssBaseline } from "@mui/material"
import api from "@/app/components/services/apiService"
import { useRouter } from "next/navigation"
import {useEffect, useState} from "react"

interface RoomInfo {
	PK: string
	phraseList: string[]
	participantList: string[]
}

interface LectureViewProps {
	roomInfo: RoomInfo

}

export default function LectureView({ roomInfo }: LectureViewProps) {
	const router = useRouter()
	const [transcript, setTranscript] = useState("")


	const sendPhrase = async (roomPK: string, phrase: string) => {
		try {
			const response = await api.post("/db/updateItem", {
				TableName: "TestTable",
				itemAttributes: {
					PK: roomPK,
					SK: "room",
					data: {
						UpdateExpression: "SET phraseList = list_append(if_not_exists(phraseList, :emptyList), :phrase)",
						ExpressionAttributeValues: {
							":phrase": [phrase],
							":emptyList": [],
						},
					},
				},
			})
			console.log(response.data)
		} catch (error) {
			console.error(error)
		}
	}

	useEffect(() => {
		if (roomInfo.phraseList) {
			setTranscript(roomInfo.phraseList.join(" "))
		}
	}, [roomInfo.phraseList])

	const handleTranscription = (roomInfo: RoomInfo) => {
		const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
		const recognition = new SpeechRecognition()
		let liveTranscript = ""

		recognition.lang = "en-GB"
		recognition.continuous = true
		recognition.maxAlternatives = 3

		recognition.onresult = async (event) => {
			const currentPhrase = event.results[event.results.length - 1][0].transcript
			liveTranscript = liveTranscript + currentPhrase
			await sendPhrase(roomInfo.PK, currentPhrase)
			setTranscript(liveTranscript)
		}

		recognition.start()

		recognition.onend = () => {
			if (window.location.pathname === `/room/${roomInfo.PK}`) {
				recognition.start()
			} else {
				recognition.stop()
			}
		}
	}

	const handleClose = () => {
		router.push("/Lecturely")
	}

	return (
		<Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, height: "100vh" }}>
			<CssBaseline />
			<Box sx={{ width: { xs: "100%", md: "66.66%" }, p: 2, bgcolor: "background.default" }}>
				<Paper elevation={3} sx={{ height: "100%", p: 2, display: "flex", flexDirection: "column" }}>
					<Typography variant="h4" gutterBottom>
						Lecture Content
					</Typography>
					<Box
						sx={{
							flexGrow: 1,
							bgcolor: "background.paper",
							p: 2,
							mt: 2,
							borderRadius: 1,
							border: "1px solid",
							borderColor: "divider",
							overflow: "auto",
						}}
					>
						<Typography variant="body1">{transcript || "Transcription will appear here once started."}</Typography>
					</Box>
				</Paper>
			</Box>

			<Box sx={{ width: { xs: "100%", md: "33.33%" }, p: 2, bgcolor: "background.paper" }}>
				<Paper elevation={3} sx={{ height: "100%", p: 2, display: "flex", flexDirection: "column" }}>
					<Typography variant="h5" gutterBottom>
						Participants
					</Typography>
					<List sx={{ flexGrow: 1, overflow: "auto" }}>
						{roomInfo.participantList.map((user, index) => (
							<ListItem key={index}>
								<ListItemText primary={user} />
							</ListItem>
						))}
					</List>

					<Button
						variant="contained"
						color="primary"
						size="large"
						onClick={() => handleTranscription(roomInfo)}
						sx={{ mt: 2 }}
					>
						Start Transcription
					</Button>
					<Button variant="contained" color="secondary" size="large" onClick={() => handleClose()} sx={{ mt: 2 }}>
						End Lecture
					</Button>
				</Paper>
			</Box>
		</Box>
	)
}

