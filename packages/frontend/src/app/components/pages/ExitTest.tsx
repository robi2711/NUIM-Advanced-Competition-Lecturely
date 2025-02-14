import * as React from 'react';
import MainNav from "@/app/components/common/MainNav";
import CssBaseline from "@mui/material/CssBaseline";
import {useUser} from "@/app/components/services/UserContext";

export default function ExitTest() {
    const { userInfo } = useUser();

    return (
        <CssBaseline>
            <MainNav />
            <div>
                {userInfo ? (
                    <div>
                        <p>Username: {userInfo.username}</p>
                        <p>Email: {userInfo.email}</p>
                        <p>Sub: {userInfo.sub}</p>
                        <p>Rooms: {userInfo.rooms.length}</p>
                    </div>
                ) : (
                    <p>No user info available</p>
                )}
            </div>
        </CssBaseline>
    );
};
