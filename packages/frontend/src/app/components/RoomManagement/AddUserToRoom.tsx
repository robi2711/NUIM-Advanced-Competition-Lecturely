import * as React from 'react';
import CssBaseline from "@mui/material/CssBaseline";
import { useUser } from "@/app/components/services/UserContext";
import api from "@/app/components/services/apiService";
import {Button} from "@mui/material";

export default function AddUserToRoom() {
    const { userInfo } = useUser();
    const { setUserInfo } = useUser();
    const setRoom = async (room: string) => {
        if (userInfo){
        try {
            const response = await api.post('/db/updateItem', {
                TableName: 'TestTable',
                itemAttributes: {
                    PK: userInfo.sub,
                    SK: "users",
                    data: {
                        UpdateExpression: "SET rooms = list_append(if_not_exists(rooms, :emptyList), :room)",
                        ExpressionAttributeValues: {
                            ":room": [room],
                            ":emptyList": [],
                        }
                    },
                }
            });
        } catch (error) {
            console.error(error);
        }
        try {
            setUserInfo({
                username: userInfo.username,
                email: userInfo.email,
                email_verified: userInfo.email_verified,
                sub: userInfo.sub,
                rooms: userInfo.rooms.concat(room),
            });
        } catch (error){
            console.error(error)
        }
        }
        else {
            console.log("User Is not Logged In");
        }
    };

    return (
        <CssBaseline>
            <Button variant="contained" color="primary" onClick={() => setRoom("TestRoom")}>
             Add room to user
            </Button>
        </CssBaseline>
    );
};
