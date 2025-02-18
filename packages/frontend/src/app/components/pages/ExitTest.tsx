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
                        <p>Rooms: {userInfo.rooms}</p>
                        <p>Rooms Owned: {userInfo.roomsOwned}</p>
                        <p>Access Token: {userInfo.accessToken}</p>
                        <p>Id Token: {userInfo.idToken}</p>
                        <p>Refresh Token: {userInfo.refreshToken}</p>
                        <p>Token Type: {userInfo.tokenType}</p>
                    </div>
                ) : (
                    <p>No user info available</p>
                )}
            </div>
        </CssBaseline>
    );
};
