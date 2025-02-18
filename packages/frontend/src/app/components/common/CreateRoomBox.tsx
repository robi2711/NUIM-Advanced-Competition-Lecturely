import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import OutlinedInput from '@mui/material/OutlinedInput';
import api from "@/app/components/services/apiService";
import { addRoomToAuthor } from "@/app/components/services/UserServices";
import { useUser } from "@/app/components/services/UserContext";
import { useRouter } from "next/navigation";

interface CreateRoomProps {
    open: boolean;
    handleClose: () => void;
}


export default function CreateRoom({ open, handleClose }: CreateRoomProps) {
    const [name, setName] = React.useState('');
    const [roomDesc, setRoomDesc] = React.useState('');
    const { userInfo } = useUser();
    const { setUserInfo } = useUser();
    const router = useRouter();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const response = await api.post('/db/addRoom', {
                TableName: "TestTable",
                itemAttributes: {
                    name: name,
                    author: userInfo?.username,
                    authorSub: userInfo?.sub,
                    description: roomDesc
                }
            });
            if (response) {
                await addRoomToAuthor(response.data as string, userInfo, setUserInfo);
            }

            handleClose();
            //router.push('/rooms/' + response.data as string);
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