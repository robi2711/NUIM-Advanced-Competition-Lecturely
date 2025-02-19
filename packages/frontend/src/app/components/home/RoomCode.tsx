import * as React from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useParams } from 'next/navigation';
import { useUser } from '@/app/components/services/UserContext';
import api from '@/app/components/services/apiService';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';

export default function RoomCode() {
    interface RoomInfo {
        roomName: string;
        password: string;
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
                    setRoomInfo(response.data as any);
                } catch (error) {
                    console.error(error);
                }
            }
        };
        getRoomInfo();
    }, [params]);

    const handleStartLecture = () => {
        console.log('Lecture started');
    };
    const style = {
        py: 0,
        width: '100%',
        maxWidth: 360,
        borderRadius: 2,
        border: '1px solid',
        borderColor: 'divider',
        backgroundColor: 'background.paper',
    };

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Card variant="outlined" sx={{ maxWidth: 360 }}>
            <Box sx={{ p: 2 }}>
                <Stack direction="column" sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography gutterBottom variant="h5" component="div">
                        Room Name
                    </Typography>
                    <Typography variant="body2" sx= {{fontSize:20,  color: 'text.secondary' }}>
                        <p>Username: {params.password}</p>
                    </Typography>
                </Stack>
            </Box>


                <Box sx={{  }}>
                    <Stack direction="column" sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography gutterBottom variant="h5" component="div">
                            Password
                        </Typography>
                        <Typography variant="body2" sx= {{fontSize:20,  color: 'text.secondary' }}>
                            CS171
                        </Typography>
                        <Box>
                            <Button sx = {{p: 5, m:1}}
                                variant="contained"
                                color="primary"
                                onClick={handleStartLecture}>
                                Start Lecture
                            </Button>
                        </Box>
                    </Stack>
                </Box>
            </Card>
        </Box>
        );
    }