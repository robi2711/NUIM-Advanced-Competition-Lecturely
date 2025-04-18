"use client"

import * as React from "react"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Divider from "@mui/material/Divider"
import FormLabel from "@mui/material/FormLabel"
import FormControl from "@mui/material/FormControl"
import Link from "@mui/material/Link"
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container"
import Card from "@mui/material/Card"
import api from "@/app/components/services/apiService"
import { useRouter } from "next/navigation"
import { useUser } from "@/app/components/services/UserContext"

export default function SignUp() {
	const [emailError, setEmailError] = React.useState(false)
	const [emailErrorMessage, setEmailErrorMessage] = React.useState("")
	const [passwordError, setPasswordError] = React.useState(false)
	const [passwordErrorMessage, setPasswordErrorMessage] = React.useState("")
	const [nameError, setNameError] = React.useState(false)
	const [nameErrorMessage, setNameErrorMessage] = React.useState("")
	const [usernameExistsError, setUsernameExistsError] = React.useState("")
	const router = useRouter()
	const { userInfo } = useUser()

	React.useEffect(() => {
		if (userInfo?.sub) {
			router.replace("/Lecturely")
		}
	}, [userInfo, router])

	const validateInputs = () => {
		const email = document.getElementById("email") as HTMLInputElement
		const password = document.getElementById("password") as HTMLInputElement
		const name = document.getElementById("name") as HTMLInputElement

		let isValid = true

		if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
			setEmailError(true)
			setEmailErrorMessage("Please enter a valid email address.")
			isValid = false
		} else {
			setEmailError(false)
			setEmailErrorMessage("")
		}

		if (!password.value || password.value.length < 6) {
			setPasswordError(true)
			setPasswordErrorMessage("Password must be at least 6 characters long.")
			isValid = false
		} else {
			setPasswordError(false)
			setPasswordErrorMessage("")
		}

		if (!name.value || name.value.length < 1) {
			setNameError(true)
			setNameErrorMessage("Name is required.")
			isValid = false
		} else {
			setNameError(false)
			setNameErrorMessage("")
		}

		return isValid
	}

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		if (validateInputs()) {
			const data = new FormData(event.currentTarget)
			const email = data.get("email") as string
			const password = data.get("password") as string
			const displayName = data.get("name") as string

			try {
				const response: any = await api.post("/auth/signUp", {
					Email: email,
					Username: displayName,
					Password: password,
				})

				if (response.data === "Username already exists") {
					setUsernameExistsError("Email is already in use")
					return
				}
				router.replace("/SignIn" + "?email=" + email)
				console.log("User created successfully:", response)
			} catch (error) {
				console.error("Error creating user:", error)
			}
		}
	}

	return (
		<Container
			id="signup"
			sx={{
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				minHeight: "100vh",
				px: 2,
			}}
		>
			<Card
				variant="outlined"
				sx={{
					display: "flex",
					flexDirection: "column",
					width: "100%",
					maxWidth: "450px",
					padding: { xs: 3, sm: 6 },
					gap: 4,
				}}
			>
				<Typography variant="h1" sx={{ width: "100%", fontSize: "clamp(1.5rem, 5vw, 2.15rem)", textAlign: "center" }}>
					Sign up
				</Typography>
				{usernameExistsError && (
					<Typography color="error" sx={{ textAlign: "center" }}>
						{usernameExistsError}
					</Typography>
				)}
				<Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
					<FormControl>
						<FormLabel htmlFor="name">Full name</FormLabel>
						<TextField
							autoComplete="name"
							name="name"
							required
							fullWidth
							id="name"
							placeholder="Jon Snow"
							error={nameError}
							helperText={nameErrorMessage}
							color={nameError ? "error" : "primary"}
						/>
					</FormControl>
					<FormControl>
						<FormLabel htmlFor="email">Email</FormLabel>
						<TextField
							required
							fullWidth
							id="email"
							placeholder="your@email.com"
							name="email"
							autoComplete="email"
							variant="outlined"
							error={emailError}
							helperText={emailErrorMessage}
							color={passwordError ? "error" : "primary"}
						/>
					</FormControl>
					<FormControl>
						<FormLabel htmlFor="password">Password</FormLabel>
						<TextField
							required
							fullWidth
							name="password"
							placeholder="••••••"
							type="password"
							id="password"
							autoComplete="new-password"
							variant="outlined"
							error={passwordError}
							helperText={passwordErrorMessage}
							color={passwordError ? "error" : "primary"}
						/>
					</FormControl>

					<Button type="submit" fullWidth variant="contained" onClick={validateInputs}>
						Sign up
					</Button>
				</Box>
				<Divider>
					<Typography sx={{ color: "text.secondary" }}>or</Typography>
				</Divider>
				<Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
					<Typography sx={{ textAlign: "center" }}>
						Already have an account?{" "}
						<Link href="/SignIn" variant="body2" sx={{ alignSelf: "center" }}>
							Sign in
						</Link>
					</Typography>
				</Box>
			</Card>
		</Container>
	)
}

