"use client"

import { useState } from 'react'
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
	ThemeProvider,
	createTheme,
	CssBaseline,
	Divider,
	IconButton,
	Tooltip,
} from "@mui/material"
import { Send, PanTool, Person } from "@mui/icons-material"

// Mock list of users
const users = [
	"You (Student)",
	"Alice Smith",
	"Bob Johnson",
	"Charlie Brown",
	"Diana Prince",
]

// Mock chat messages
const initialMessages = [
	{ sender: "System", message: "Welcome to the lecture!" },
	{ sender: "Alice Smith", message: "Hi everyone!" },
	{ sender: "Bob Johnson", message: "Excited for today's topic!" },
]

export default function StudentView() {
	const [messages, setMessages] = useState(initialMessages)
	const [newMessage, setNewMessage] = useState("")
	const [handRaised, setHandRaised] = useState(false)

	const handleSendMessage = () => {
		if (newMessage.trim()) {
			setMessages([...messages, { sender: "You", message: newMessage.trim() }])
			setNewMessage("")
		}
	}

	return (
		<Box>
			<CssBaseline />
			<Box sx={{ display: 'flex', height: '100vh', p: 2 }}>
				{/* Main content area */}
				<Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', mr: 2 }}>
					{/* Lecture content */}
					<Paper elevation={3} sx={{ flexGrow: 1, mb: 2, p: 2, display: 'flex', flexDirection: 'column' }}>
						<Typography variant="h4" gutterBottom>
							Lecture Content
						</Typography>
						<Box sx={{ flexGrow: 1, bgcolor: 'grey.200', display: 'flex', alignItems: 'center', justifyContent: 'center' , backgroundColor:"black"}}>
							<Typography variant="body1">
								Lecture video or slides would appear here
							</Typography>
						</Box>
					</Paper>

					{/* Chat section */}
					<Paper elevation={3} sx={{ height: '30%', p: 2, display: 'flex', flexDirection: 'column' }}>
						<Typography variant="h6" gutterBottom>
							Chat
						</Typography>
						<List sx={{ flexGrow: 1, overflow: 'auto', mb: 2 }}>
							{messages.map((msg, index) => (
								<ListItem key={index}>
									<ListItemText primary={msg.sender} secondary={msg.message} />
								</ListItem>
							))}
						</List>
						<Box sx={{ display: 'flex' }}>
							<TextField
								fullWidth
								variant="outlined"
								placeholder="Type a message"
								value={newMessage}
								onChange={(e) => setNewMessage(e.target.value)}
								onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
							/>
							<IconButton color="primary" onClick={handleSendMessage} sx={{ ml: 1 }}>
								<Send />
							</IconButton>
						</Box>
					</Paper>
				</Box>

				{/* Sidebar */}
				<Paper elevation={3} sx={{ width: 250, p: 2, display: 'flex', flexDirection: 'column' }}>
					<Typography variant="h6" gutterBottom>
						Participants
					</Typography>
					<List sx={{ flexGrow: 1, overflow: 'auto' }}>
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
					<Tooltip title={handRaised ? "Lower Hand" : "Raise Hand"}>
						<Button
							variant="contained"
							color={handRaised ? "secondary" : "primary"}
							startIcon={<PanTool />}
							onClick={() => setHandRaised(!handRaised)}
						>
							{handRaised ? "Lower Hand" : "Raise Hand"}
						</Button>
					</Tooltip>
				</Paper>
			</Box>
		</Box>
	)
}
