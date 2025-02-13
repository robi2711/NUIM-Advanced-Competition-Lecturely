'use client'
import * as React from "react";
import api from '@/app/components/services/apiService';
import { Box, Button, Typography } from "@mui/material";

const GetItemTestPage: React.FC = () => {
    const [item, setItem] = React.useState<any>(null);

    const handleGetItem = async () => {
        try {
            const response = await api.post('/db/getItem', {
                TableName: 'TestTable',
                itemAttributes: {
                    PK: 'phraseList',
                    SK: 'transcript'
                }
            });
            // @ts-ignore
            setItem(JSON.stringify(response.data.phraseList));
        } catch (error) {
            console.error('Error getting item:', error);
        }
    };

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>
                Get Item Test
            </Typography>
            <Button variant="contained" color="primary" onClick={handleGetItem}>
                Get Item
            </Button>
            {item && (
                <Box sx={{ p: 10 }}>
                    <Typography>
                        {item}
                    </Typography>
                </Box>
            )}
        </Box>
    );
};

export default GetItemTestPage;