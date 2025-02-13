'use client'
import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import NavBar from '@/app/components/common/MainNav';
import { useSearchParams, useRouter } from "next/navigation";
import { useUser } from "@/app/components/services/UserContext";
import { useEffect } from "react";
import api from "@/app/components/services/apiService";

export default function LecturelyPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const { setUserInfo } = useUser();

    const addUser = async (data: any) => {
        try {
            const response = await api.post('/db/addItem', {
                TableName: 'lecturely',
                itemAttributes: {
                    PK: "users",
                    SK: "sub",
                    data: {
                            sub: data.sub,
                            username: data.username,
                            email: data.email
                    }
                }
            });
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const checkAuthStatus = async (code: string, state: string) => {
        const response = await fetch(`http://localhost:3001/auth/callback?code=${code}&state=${state}`, {
            credentials: 'include'
        });
        const data = await response.json();
        console.log(data);
        setUserInfo({
            username: data.given_name,
            email: data.email,
            email_verified: data.email_verified,
            sub: data.sub
        });
        await addUser(data);
        router.replace('/Lecturely');
    };

    useEffect(() => {
        const code = searchParams.get('code');
        const state = searchParams.get('state');
        if (code && state) {
            checkAuthStatus(code, state);
        }
    }, [searchParams]);


    return (
        <CssBaseline>
            <NavBar />
            <Box sx={{ bgcolor: 'background.default' }}>
            </Box>
        </CssBaseline>
    );
}