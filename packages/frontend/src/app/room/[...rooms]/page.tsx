"use client"

import * as React from 'react';
import { CssBaseline } from '@mui/material';
import { useParams } from 'next/navigation';
import {useUser} from "@/app/components/services/UserContext";
import api from "@/app/components/services/apiService";
import RoomCode from "@/app/components/RoomManagement/RoomCode";
import UserRoom from "@/app/components/RoomManagement/UserRoom";

export default function Rooms() {
    interface RoomInfo {
        authorSub: string;
        phraseList: string[];
        password: string;
        NameValue: string;
        PK: string;
        isActive: boolean;
        participantList: string[];
    }

    const params = useParams();
    const { userInfo } = useUser();
    const [roomInfo, setRoomInfo] = React.useState<RoomInfo | null>(null);


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

        const intervalId = setInterval(getRoomInfo, 4000);
        return () => clearInterval(intervalId);
    }, [params]);



    return (
        <CssBaseline>

            <div>
                {roomInfo && userInfo ? (
                    userInfo.sub === roomInfo.authorSub ? (
                        <div>
                            <RoomCode roomInfo={roomInfo} />
                        </div>
                    ) : (
                        <div>
                            <UserRoom roomInfo={roomInfo} />
                        </div>
                    )
                ) : (
                    <div>Loading...</div>
                )}
            </div>
        </CssBaseline>
    );
}