"use client"

import * as React from 'react';
import { CssBaseline } from '@mui/material';
import { useParams } from 'next/navigation';
import { getUser } from "@/app/components/services/UserService";
import {useUser} from "@/app/components/services/UserContext";
import api from "@/app/components/services/apiService";

export default function Rooms() {
    const params = useParams();
    const { userInfo } = useUser();

    React.useEffect(() => {
        const getRoomInfo = async () => {
            const rooms = params.rooms;
            if(rooms){
                try {
                    const response = await api.post('/db/getItem', {
                        TableName: 'TestTable',
                        itemAttributes: {
                            PK: rooms[0],
                            SK:"room",
                        }
                    });
                    console.log(response.data);
                    return response.data;
                } catch (error) {
                    console.error(error);
                }
            }
        }

        getRoomInfo();
    }, []);


    return (
        <CssBaseline>
            <div>
                <div>
                    {userInfo ? (
                        <div>
                            <p>Username: {userInfo.username}</p>
                            <p>Email: {userInfo.email}</p>
                            <p>Sub: {userInfo.sub}</p>
                            <p>Rooms: {params.rooms}</p>
                            <p>Author Sub: {params.authorSub}</p>
                        </div>
                    ) : (
                        <p>Loading user info...</p>
                    )}

                    {userInfo && params && userInfo.sub !== params.sub ? (
                        <p>Room ID: {userInfo.rooms[0]}</p>
                    ) : (
                        <p>No room information available</p>
                    )}

                </div>
            </div>
        </CssBaseline>
    );
}