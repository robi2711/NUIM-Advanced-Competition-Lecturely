// packages/frontend/src/app/components/RoomManagement/AddUserToRoom.tsx
import * as React from 'react';
import CssBaseline from "@mui/material/CssBaseline";
import { useUser } from "@/app/components/services/UserContext";
import { addRoom } from "@/app/components/services/UserServices";
import {Box, Button} from "@mui/material";

export default function AddUserToRoom() {
    const { userInfo } = useUser();
    const { setUserInfo } = useUser();

    const handleSetRoom = async (room: string) => {
        await addRoom(room, userInfo, setUserInfo);
    };

    return (
        <Box>
            <CssBaseline />
            <Button onClick={() => handleSetRoom('TestRoom')}>Add Test Room</Button>
        </Box>
    );
};