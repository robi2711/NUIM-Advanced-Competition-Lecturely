'use client'
import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import NavBar from '@/app/components/common/MainNav';
import { useSearchParams, useRouter } from "next/navigation";
import { useUser } from "@/app/components/services/UserContext";
import { useEffect } from "react";
import api from "@/app/components/services/apiService";
import HomeHero from "@/app/components/home/HomeHero";

export default function LecturelyPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const { setUserInfo } = useUser();

    const addUser = async (data: any) => {
        try {
            await api.post('/db/addUser', {
                TableName: 'TestTable',
                itemAttributes: {
                    PK: data.sub,
                    SK: "users",
                    data: {
                        username: data.given_name,
                        email: data.email,
                        rooms: [],
                    }
                }
            });
        } catch (error) {
            console.error(error);
        }
    };

    const getUser = async (sub: string) => {
        try {
            const response = await api.post('/db/getItem', {
                TableName: 'TestTable',
                itemAttributes: {
                    PK: sub,
                    SK:"users",
                }
            });
            return response.data;
        } catch (error) {
            console.error(error);
        }
    };

    const checkAuthStatus = async (code: string, state: string) => {
        const response = await fetch(`http://localhost:3001/auth/callback?code=${code}&state=${state}`, {
            credentials: 'include'
        });
        const data = await response.json();

        if (data.sub) {
            const user : any = await getUser(data.sub);
            const userRooms : string[] = user.rooms;
            if (!user) {
                await addUser(data);
            }
            router.replace('/Lecturely');
        }
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
            <HomeHero />
            <Box sx={{ bgcolor: 'background.default' }}>
            </Box>
        </CssBaseline>
    );
}