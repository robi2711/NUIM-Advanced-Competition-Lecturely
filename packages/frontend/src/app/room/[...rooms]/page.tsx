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

                    {userInfo && params && userInfo.sub === roomInfo?.authorSub ? (
                        <div>
                            <p>{params.rooms}</p>
                            <RoomCode/>
                        </div>
                    ) : (
                        <div>

                            <UserRoom roomInfo={roomInfo} />
                        </div>
                    )}
            </div>
        </CssBaseline>
    );
}