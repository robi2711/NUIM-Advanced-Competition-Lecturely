//TODO: Add a return to home button
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import ForgotPassword from './ForgotPassword';
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";

export default function SignIn(props: { disableCustomTheme?: boolean }) {
	const [emailError, setEmailError] = React.useState(false);
	const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
	const [passwordError, setPasswordError] = React.useState(false);
	const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
	const [open, setOpen] = React.useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		if (emailError || passwordError) {
			event.preventDefault();
			return;
		}
		const data = new FormData(event.currentTarget);
		console.log({
			email: data.get('email'),
			password: data.get('password'),
		});
	};

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
					variant="h4"
				>
					Sign in
				</Typography>
				<Box
					component="form"
					onSubmit={handleSubmit}
					noValidate
					sx={{
						display: 'flex',
						flexDirection: 'column',
						width: '100%',
						gap: 2,
					}}
				>
					<FormControl>
						<FormLabel htmlFor="email">Email</FormLabel>
						<TextField
							error={emailError}
							helperText={emailErrorMessage}
							id="email"
							type="email"
							name="email"
							placeholder="your@email.com"
							required
							fullWidth
							variant="outlined"
							color={emailError ? 'error' : 'primary'}
						/>
					</FormControl>
					<FormControl>
						<FormLabel htmlFor="password">Password</FormLabel>
						<TextField
							error={passwordError}
							helperText={passwordErrorMessage}
							name="password"
							placeholder="••••••"
							type="password"
							id="password"
							autoComplete="current-password"
							autoFocus
							required
							fullWidth
							variant="outlined"
							color={passwordError ? 'error' : 'error'}
						/>
					</FormControl>
					<ForgotPassword open={open} handleClose={handleClose} />
					<Button
						type="submit"
						fullWidth
						variant="contained"
						onClick={validateInputs}
					>
						Sign in
					</Button>
					<Link
						component="button"
						type="button"
						onClick={handleClickOpen}
						variant="body2"
						sx={{ alignSelf: 'center' }}
					>
						Forgot your password?
					</Link>
				</Box>
				<Divider>or</Divider>
				<Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>

					<Typography sx={{ textAlign: 'center' }}>
						Don&apos;t have an account?{' '}
						<Link
							href="/SignUp"
							variant="body2"
							sx={{ alignSelf: 'center' }}
						>
							Sign up
						</Link>
					</Typography>
				</Box>
			</Card>
		</Container>
	);
}