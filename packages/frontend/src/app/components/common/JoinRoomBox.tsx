import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import OutlinedInput from '@mui/material/OutlinedInput';
import api from "@/app/components/services/apiService";
import { addRoom } from "@/app/components/services/UserServices";
import {useUser} from "@/app/components/services/UserContext";
import {useRouter} from "next/navigation";

interface CreateRoomProps {
	open: boolean;
	handleClose: () => void;
}
export default function JoinRoom({ open, handleClose }: CreateRoomProps) {
	const [name, setName] = React.useState('');
	const [password, setPassword] = React.useState('');
	const { userInfo } = useUser();
	const { setUserInfo } = useUser();
	const router = useRouter();

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		try {
			try {
				const response = await api.post('/db/queryRoom', {
					TableName: 'TestTable',
					itemAttributes: {
						roomName: name,
						password: password,
					}
				});
				return response.data;
			} catch (error) {
				console.error(error);
			}
			await addRoom(password, userInfo, setUserInfo);
			console.log('Room joined successfully:');
			handleClose();
			//router.push('/rooms/' + response.data.PK);
		} catch (error) {
			console.error('Error join room:', error);
		}
	};

	return (
		<Dialog
			open={open}
			onClose={handleClose}
			PaperProps={{
				component: 'form',
				onSubmit: handleSubmit,
				sx: { backgroundImage: 'none', backgroundColor: 'black' },
			}}
		>
			<DialogTitle>Join Room</DialogTitle>
			<DialogContent
				sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}
			>
				<DialogContentText>
					Enter your room&apos;s name and password.
				</DialogContentText>
				<OutlinedInput
					autoFocus
					required
					margin="dense"
					id="name"
					name="name"
					label="Enter full name"
					placeholder="Room Name"
					type="Name"
					fullWidth
				/>
				<OutlinedInput
					autoFocus
					required
					margin="dense"
					id="password"
					name="password"
					label="Password"
					placeholder="Password"
					type="Password"
					fullWidth
				/>
			</DialogContent>
			<DialogActions sx={{ pb: 3, px: 3 }}>
				<Button onClick={handleClose}>Cancel</Button>
				<Button variant="contained" type="submit">
					Continue
				</Button>
			</DialogActions>
		</Dialog>
	);
}