'use client'
import * as React from "react";
import LecturelyPage from "@/app/components/pages/Lecturely";
import {useSearchParams} from "next/navigation";
import {useEffect} from "react";

const checkAuthStatus = async (code: string, state: string) => {
    const response = await fetch(`http://localhost:3001/auth/Lecturely?code=${code}&state=${state}`, {
        credentials: 'same-origin'
    });
    const data = await response.json();
    console.log(data);
    // Store user info in your frontend state management

};

export default function MainPage() {
    const searchParams = useSearchParams();

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