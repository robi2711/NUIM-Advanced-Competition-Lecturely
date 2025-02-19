"use client"

import {
	Box,
	Paper,
	Typography,
	Button,
	List,
	ListItem,
	ListItemText,
	ThemeProvider,
	createTheme,
	CssBaseline,
} from "@mui/material"


// Mock list of users
const users = ["Alice Smith", "Bob Johnson", "Charlie Brown", "Diana Prince", "Ethan Hunt"]

interface LectureViewProps {
	onStopLecture: () => void
}

export default function LectureView({ onStopLecture }: LectureViewProps) {
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
						<Typography variant="body1">This is where the lecture content would be displayed.</Typography>
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
						<Button variant="contained" color="secondary" size="large" onClick={onStopLecture} sx={{ mt: 2 }}>
							Stop Lecture
						</Button>
					</Paper>
				</Box>
			</Box>
		</Box>
	)
}

