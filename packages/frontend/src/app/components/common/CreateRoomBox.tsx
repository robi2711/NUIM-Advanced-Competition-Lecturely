import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import OutlinedInput from '@mui/material/OutlinedInput';
import api from "@/app/components/services/apiService";
import { addRoomToAuthor} from "@/app/components/services/UserServices";
import {useUser} from "@/app/components/services/UserContext";

interface CreateRoomProps {
    open: boolean;
    handleClose: () => void;
}
const sendRoom = async (name: string, author: string, description: string) => {
    try {
        const response = await api.post('/db/addRoom', {
            TableName: "TestTable",
            itemAttributes: {
                name: name,
                author: author,
                description: description
            }
        });
        console.log(response.data);
    } catch (error) {
        console.error(error);
    }
};

export default function CreateRoom({ open, handleClose }: CreateRoomProps) {
    const [name, setName] = React.useState('');
    const [author, setAuthor] = React.useState('');
    const [roomDesc, setRoomDesc] = React.useState('');
    const { userInfo } = useUser();
    const { setUserInfo } = useUser();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const response = await api.post('/db/addRoom', {
                TableName: "TestTable",
                itemAttributes: {
                    name: name,
                    author: author,
                    description: roomDesc
                }
            });
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
                    type="Name"
                    fullWidth
                />
                <OutlinedInput
                    autoFocus
                    required
                    margin="dense"
                    id="author"
                    name="author"
                    label="Author"
                    placeholder="Author"
                    type="Author"
                    fullWidth
                />
                <OutlinedInput
                    autoFocus
                    required
                    margin="dense"
                    id="roomDesc"
                    name="roomDesc"
                    label="Room Description"
                    placeholder="Room Description"
                    type="roomDesc"
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