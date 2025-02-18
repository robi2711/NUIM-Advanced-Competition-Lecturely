import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import OutlinedInput from '@mui/material/OutlinedInput';
import axios from 'axios';
import { addRoomToAuthor} from "@/app/components/services/UserServices";
import {useUser} from "@/app/components/services/UserContext";

interface CreateRoomProps {
    open: boolean;
    handleClose: () => void;
}

export default function CreateRoom({ open, handleClose }: CreateRoomProps) {
    const [name, setName] = React.useState('');
    const [author, setAuthor] = React.useState('');
    const [roomDesc, setRoomDesc] = React.useState('');
    const { userInfo } = useUser();
    const { setUserInfo } = useUser();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            console.log(name);
            console.log(author);
            console.log(roomDesc);
            await addRoomToAuthor(roomDesc, userInfo, setUserInfo);
            console.log('Room created successfully:');
            handleClose();
        } catch (error) {
            console.error('Error creating room:', error);
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
            <DialogTitle>Create Room</DialogTitle>
            <DialogContent
                sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}
            >
                <DialogContentText>
                    Enter your room&apos;s name, author and description.
                </DialogContentText>
                <OutlinedInput
                    autoFocus
                    required
                    margin="dense"
                    id="name"
                    name="name"
                    label="Enter full name"
                    placeholder="Room Name"
                    type="text"
                    fullWidth
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <OutlinedInput
                    required
                    margin="dense"
                    id="author"
                    name="author"
                    label="Author"
                    placeholder="Author"
                    type="text"
                    fullWidth
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                />
                <OutlinedInput
                    required
                    margin="dense"
                    id="roomDesc"
                    name="roomDesc"
                    label="Room Description"
                    placeholder="Room Description"
                    type="text"
                    fullWidth
                    value={roomDesc}
                    onChange={(e) => setRoomDesc(e.target.value)}
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