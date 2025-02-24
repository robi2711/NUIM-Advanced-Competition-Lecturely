"use client"

import { useState } from "react"
import {
	Box,
	Paper,
	Typography,
	TextField,
	Button,
	List,
	ListItem,
	ListItemText,
	ListItemIcon,
	CssBaseline,
	Divider,
	IconButton,
} from "@mui/material"
import { Send, PanTool, Person } from "@mui/icons-material"
import { useRouter } from "next/navigation"
import {useTheme} from "@/app/components/services/ThemeContext";

const users = ["You (Student)", "Alice Smith", "Bob Johnson", "Charlie Brown", "Diana Prince"]

interface RoomInfo {
	authorSub: string
	phraseList: string[]
}

interface UserRoomProps {
	roomInfo: RoomInfo | null
}

const initialMessages = [
	{ sender: "System", message: "Welcome to the lecture!" },
	{ sender: "Alice Smith", message: "Hi everyone!" },
	{ sender: "Bob Johnson", message: "Excited for today's topic!" },
]

export default function UserRoom({ roomInfo }: UserRoomProps) {
	const mode = useTheme();
	const [messages, setMessages] = useState(initialMessages)
	const [newMessage, setNewMessage] = useState("")
	const [handRaised, setHandRaised] = useState(false)
	const router = useRouter()

	const handleSendMessage = () => {
		if (newMessage.trim()) {
			setMessages([...messages, { sender: "You", message: newMessage.trim() }])
			setNewMessage("")
		}
	}

	const handleClose = () => {
		router.push("/Lecturely")
	};

	return (
		<Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, height: "100vh" }}>
			<CssBaseline />
			<Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column", p: 2 }}>
				<Paper elevation={3} sx={{ flexGrow: 1, mb: 2, p: 2, display: "flex", flexDirection: "column" }}>
					<Typography variant="h4" gutterBottom>
						Lecture Content
					</Typography>
					<Box sx={{ flexGrow: 1, bgcolor: "background.paper", p: 2, overflow: "auto" }}>
						<Typography variant="body1" sx={{ color: mode === 'dark'? 'white' : 'black' }}>
							{roomInfo ? roomInfo.phraseList.join(" ") : "This is where the lecture content would be displayed."}
						</Typography>
					</Box>
				</Paper>

				<Paper elevation={3} sx={{ height: { xs: "40%", md: "30%" }, p: 2, display: "flex", flexDirection: "column" }}>
					<Typography variant="h6" gutterBottom>
						Chat
					</Typography>
					<List sx={{ flexGrow: 1, overflow: "auto", mb: 2 }}>
						{messages.map((msg, index) => (
							<ListItem key={index}>
								<ListItemText primary={msg.sender} secondary={msg.message} />
							</ListItem>
						))}
					</List>
					<Box sx={{ display: "flex" }}>
						<TextField
							fullWidth
							variant="outlined"
							placeholder="Type a message"
							value={newMessage}
							onChange={(e) => setNewMessage(e.target.value)}
							onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
						/>
						<IconButton color="primary" onClick={handleSendMessage} sx={{ ml: 1 }}>
							<Send />
						</IconButton>
					</Box>
				</Paper>
			</Box>

			<Paper elevation={3} sx={{ width: { xs: "100%", md: 250 }, p: 2, display: "flex", flexDirection: "column" }}>
				<Typography variant="h6" gutterBottom>
					Participants
				</Typography>
				<List sx={{ flexGrow: 1, overflow: "auto" }}>
					{users.map((user, index) => (
						<ListItem key={index}>
							<ListItemIcon>
								<Person />
							</ListItemIcon>
							<ListItemText primary={user} />
						</ListItem>
					))}
				</List>
				<Divider sx={{ my: 2 }} />
				<Button
					variant="contained"
					color="secondary"
					size="large"
					onClick={() => handleClose()}
					sx={{ mt: 2 }}
					fullWidth
				>
					Leave Lecture
				</Button>
			</Paper>
		</Box>
	)
}

