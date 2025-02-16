import * as React from 'react';
import {addRoom} from "@/app/components/services/UserService";
import CssBaseline from "@mui/material/CssBaseline";
import Button from "@mui/material/Button";

export default function AddUserToRoom() {

    return (
        <CssBaseline>
            <Button variant="contained" color="primary" onClick={() => addRoom("TestRoom")}>
                Add room to user
            </Button>
        </CssBaseline>
    );
}

