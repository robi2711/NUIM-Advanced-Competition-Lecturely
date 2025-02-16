'use client'
import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import NavBar from '@/app/components/common/MainNav';
import { useSearchParams, useRouter } from "next/navigation";
import { useUser } from "@/app/components/services/UserContext";
import { useEffect } from "react";
import HomeHero from "@/app/components/home/HomeHero";
import {addUser, getUser} from "@/app/components/services/UserService";
import MainContent from "@/app/components/home/HomeCards";

export default function LecturelyPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const { setUserInfo } = useUser();

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
            setUserInfo({
                username: data.given_name,
                email: data.email,
                email_verified: data.email_verified,
                sub: data.sub,
                rooms: userRooms || []
            });
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
            <MainContent />
        </CssBaseline>
    );
}