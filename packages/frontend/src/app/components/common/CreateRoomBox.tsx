import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import OutlinedInput from '@mui/material/OutlinedInput';

interface CreateRoomProps {
    open: boolean;
    handleClose: () => void;
}

export default function CreateRoom({ open, handleClose }: CreateRoomProps) {
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            PaperProps={{
                component: 'form',
                onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
                    event.preventDefault();
                    handleClose();
                },
                sx: { backgroundImage: 'none' },
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