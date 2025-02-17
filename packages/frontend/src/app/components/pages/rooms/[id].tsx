import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import api from '@/app/components/services/apiService';

interface RoomData {
    name: string;
    author: string;
    description: string;
    date: string;
}

const RoomPage = () => {
    const router = useRouter();
    const { id } = router.query;
    const [roomData, setRoomData] = useState<RoomData | null>(null);

    useEffect(() => {
        if (id) {
            const fetchRoomData = async () => {
                try {
                    const response = await api.get(`/rooms/${id}`);
                    setRoomData(response.data);
                } catch (error) {
                    console.error('Error fetching room data:', error);
                }
            };
            fetchRoomData();
        }
    }, [id]);

    if (!roomData) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Room: {roomData.name}</h1>
            <p><strong>Author:</strong> {roomData.author}</p>
            <p><strong>Description:</strong> {roomData.description}</p>
            <p><strong>Created on:</strong> {roomData.date}</p>
        </div>
    );
};

export default RoomPage;