"use client"

import * as React from 'react';
import { CssBaseline } from '@mui/material';
import { useParams } from 'next/navigation';
import {useUser} from "@/app/components/services/UserContext";
import api from "@/app/components/services/apiService";
import NavBar from "@/app/components/common/MainNav";

export default function Rooms() {
    interface RoomInfo {
        authorSub: string;
    }

    const params = useParams();
    const { userInfo } = useUser();
    const [roomInfo, setRoomInfo] = React.useState<RoomInfo | null > (null);

    React.useEffect(() => {
        const getRoomInfo = async () => {
            const rooms = params.rooms;
            if (rooms) {
                try {
                    const response = await api.post('/db/getItem', {
                        TableName: 'TestTable',
                        itemAttributes: {
                            PK: rooms[0],
                            SK: "room",
                        }
                    });
                    console.log(response.data);
                    setRoomInfo(response.data as any);
                } catch (error) {
                    console.error(error);
                }
            }
        };
        getRoomInfo();
    }, [params]);


    return (
        <CssBaseline>
            <div>
                <div>
                    {userInfo && roomInfo ? (
                        <div>
                            <p>Username: {userInfo.username}</p>
                            <p>Email: {userInfo.email}</p>
                            <p>Sub: {userInfo.sub}</p>
                            <p>Rooms: {params.rooms}</p>
                            <p>Author Sub: {roomInfo.authorSub}</p>
                        </div>
                    ) : (
                        <p>Loading user info...</p>
                    )}
                    {userInfo && params && userInfo.sub === roomInfo?.authorSub ? (
                        <NavBar />
                    ) : (
                        <p>No room information available</p>
                    )}
                </div>
            </div>
        </CssBaseline>
    );
}