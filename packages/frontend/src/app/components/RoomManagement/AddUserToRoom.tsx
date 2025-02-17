import * as React from 'react';
import CssBaseline from "@mui/material/CssBaseline";
import { useUser } from "@/app/components/services/UserContext";
import api from "@/app/components/services/apiService";
import {Button} from "@mui/material";
import Box from "@mui/material/Box";

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
                sub: userInfo.sub,
                accessToken: userInfo.accessToken,
                idToken: userInfo.idToken,
                refreshToken: userInfo.refreshToken,
                tokenType: userInfo.tokenType,
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
        <Box>

        </Box>
    );
};
