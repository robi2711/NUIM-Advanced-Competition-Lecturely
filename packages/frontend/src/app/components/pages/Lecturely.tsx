'use client'
import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import NavBar from '@/app/components/common/MainNav';
import { useSearchParams, useRouter } from "next/navigation";
import { useUser } from "@/app/components/services/UserContext";
import { useEffect, useState } from "react";

export default function LecturelyPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const { setUserInfo, userInfo } = useUser();
    const [isAuthChecked, setIsAuthChecked] = useState(false);

    const checkAuthStatus = async (code: string, state: string) => {
        const response = await fetch(`http://localhost:3001/auth/callback?code=${code}&state=${state}`, {
            credentials: 'include'
        });
        const data = await response.json();
        setUserInfo({
            username: data.username,
            email: data.email,
            email_verified: data.email_verified,
            sub: data.sub
        });
        setIsAuthChecked(true);
        router.replace('/Lecturely');
    };

    useEffect(() => {
        const code = searchParams.get('code');
        const state = searchParams.get('state');
        if (code && state) {
            checkAuthStatus(code, state);
        } else {
            setIsAuthChecked(true);
        }
    }, [searchParams]);

    useEffect(() => {
        if (isAuthChecked && !userInfo) {
            router.push('/');
        }
    }, [isAuthChecked, userInfo, router]);


    return (
        <CssBaseline>
            <NavBar />
            <Box sx={{ bgcolor: 'background.default' }}>
            </Box>
        </CssBaseline>
    );
}