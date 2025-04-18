"use client"

import * as React from "react"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import FormLabel from "@mui/material/FormLabel"
import FormControl from "@mui/material/FormControl"
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container"
import Card from "@mui/material/Card"
import api from "@/app/components/services/apiService"
import { useRouter, useSearchParams } from "next/navigation"
import { useUser } from "@/app/components/services/UserContext"
import {getUser, addUser, addRoom} from "@/app/components/services/UserServices"
import { Suspense } from "react"
import Link from "@mui/material/Link"

export default function SignIn() {
	const [email, setEmail] = React.useState("")
	const [emailError, setEmailError] = React.useState(false)
	const [emailErrorMessage, setEmailErrorMessage] = React.useState("")
	const [passwordError, setPasswordError] = React.useState(false)
	const [passwordErrorMessage, setPasswordErrorMessage] = React.useState("")
	const router = useRouter()
	const searchParams = useSearchParams()
	const { setUserInfo, userInfo } = useUser()

	React.useEffect(() => {
		const pk : any = searchParams.get("room")
		if (userInfo?.sub) {
			if (pk) {
				addRoom(pk, userInfo, setUserInfo)
				router.replace(`/room/${pk}`)
			} else {
				router.replace("/Lecturely")
			}
		}
		const email = searchParams.get("email")
		if (email) {
			setEmail(email)
		}
	}, [searchParams, userInfo, router])

	const validateInputs = () => {
		const password = document.getElementById("password") as HTMLInputElement

		let isValid = true

		if (!email || !/\S+@\S+\.\S+/.test(email)) {
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

		return isValid
	}

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		if (validateInputs()) {
			const data = new FormData(event.currentTarget)
			const password = data.get("password") as string

			try {
				const response: any = await api.post("/auth/signIn", {
					Email: email,
					Password: password,
				})
				if (response.data === "Wrong Username or Password") {
					setEmailError(true)
					setEmailErrorMessage("Invalid email or password")
					setPasswordError(true)
					setPasswordErrorMessage("Invalid email or password")
					return
				}
				if (response.data.username) {
					const user: any = await getUser(response.data.sub)
					const userRooms: string[] = user.rooms
					const userRoomsOwned: string[] = user.roomsOwned
					if (!user) {
						await addUser(response.data)
					}
					setUserInfo({
						username: response.data.username,
						email: response.data.email,
						sub: response.data.sub,
						accessToken: response.data.accessToken,
						idToken: response.data.idToken,
						refreshToken: response.data.refreshToken,
						tokenType: response.data.tokenType,
						roomsOwned: userRoomsOwned || [],
						rooms: userRooms || [],
					})
					const pk: string | null = searchParams.get("room")
					if (pk) {
						addRoom(pk, userInfo, setUserInfo)
						router.replace(`/room/${pk}`)
					} else {
						router.replace("/Lecturely")
					}
				}
			} catch (error) {
				console.error("Error signing in user:", error)
			}
		}
	}

	return (
		<Container
			id="signin"
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
					Sign in
				</Typography>
				<Suspense fallback={<div>Loading...</div>}>
					<Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
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
								value={email}
								onChange={(e) => setEmail(e.target.value)}
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
								autoComplete="current-password"
								variant="outlined"
								error={passwordError}
								helperText={passwordErrorMessage}
								color={passwordError ? "error" : "primary"}
							/>
						</FormControl>

						<Button type="submit" fullWidth variant="contained" onClick={validateInputs}>
							Sign in
						</Button>
					</Box>
					<Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
						<Typography sx={{ textAlign: "center" }}>
							Don't have an account?{" "}
							<Link href="/SignUp" variant="body2" sx={{ alignSelf: "center" }}>
								Sign up
							</Link>
						</Typography>
					</Box>
				</Suspense>
			</Card>
		</Container>
	)
}