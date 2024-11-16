import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import { useRouter } from 'next/router';

export default function SignIn() {
	const [emailError, setEmailError] = React.useState(false);
	const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
	const [passwordError, setPasswordError] = React.useState(false);
	const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');

	const validateInputs = () => {
		const email = document.getElementById('email') as HTMLInputElement;
		const password = document.getElementById('password') as HTMLInputElement;

		let isValid = true;

		if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
			setEmailError(true);
			setEmailErrorMessage('Please enter a valid email address.');
			isValid = false;
		} else {
			setEmailError(false);
			setEmailErrorMessage('');
		}

		if (!password.value || password.value.length < 6) {
			setPasswordError(true);
			setPasswordErrorMessage('Password must be at least 6 characters long.');
			isValid = false;
		} else {
			setPasswordError(false);
			setPasswordErrorMessage('');
		}

		return isValid;
	};

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (validateInputs()) {
			const data = new FormData(event.currentTarget);
			const email = data.get('email') as string;
			const password = data.get('password') as string;
			const router = useRouter();

			try {
				const response = await fetch('http://localhost:5000/signIn', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({ email, password }),
				});

				if (!response.ok) {
					const errorText = await response.text();
					console.error('Error signing in user:', errorText);
					return;
				}

				const result = await response.json();
				console.log('User signed in successfully:', result);
				router.push('/dashboard');
			} catch (error) {
				console.error('Error signing in user:', error);
			}
		}
	};

	return (
		<Container
			id="signin"
			sx={{
				position: 'center',
				display: 'flex',
				alignItems: 'center',
				minHeight: '100vh',
			}}
		>
			<Card variant="outlined"
			      sx={{
				      display: 'flex',
				      flexDirection: 'column',
				      alignSelf: 'center',
				      width: '50%',
				      padding: 6,
				      gap: 4,
				      margin: 'auto',
				      sm: '450px',
			      }}
			>
				<Typography
					variant="h1"
					sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
				>
					Sign in
				</Typography>
				<Box
					component="form"
					onSubmit={handleSubmit}
					sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
				>
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
							color={passwordError ? 'error' : 'primary'}
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
							color={passwordError ? 'error' : 'primary'}
						/>
					</FormControl>

					<Button
						type="submit"
						fullWidth
						variant="contained"
						onClick={validateInputs}
					>
						Sign in
					</Button>
				</Box>
			</Card>
		</Container>
	);
}