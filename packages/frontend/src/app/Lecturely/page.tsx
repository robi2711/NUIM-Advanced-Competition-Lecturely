'use client'
import * as React from "react";
import LecturelyPage from "@/app/components/pages/Lecturely";
import {useSearchParams} from "next/navigation";
import { useEffect } from "react";
import { useUser } from '../components/types/UserContext';


export default function MainPage() {
    const searchParams = useSearchParams();
    const { setUserInfo , userInfo} = useUser();

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

    };

    useEffect(() => {
        const code = searchParams.get('code');
        const state = searchParams.get('state');
        if (code && state) {
            checkAuthStatus(code, state);
        }
    }, [searchParams]);


    return (
        <LecturelyPage/>
    );
}