'use client'
import * as React from "react";
import LecturelyPage from "@/app/components/pages/Lecturely";
import {useRouter} from "next/router";
import {useEffect} from "react";

const checkAuthStatus = async (code: string, state: string) => {
    const response = await fetch(`http://localhost:3001/auth/Lecturely?code=${code}&state=${state}`, {
        credentials: 'same-origin'
    });
    // Store user info in your frontend state management
    console.log(response);
};

export default function MainPage() {
    const router = useRouter();

    useEffect(() => {
        const { code, state } = router.query;
        if (code && state) {
            checkAuthStatus(code as string, state as string);
        }
    }, [router.isReady, router.query]);
    return (
        <LecturelyPage/>
    );
}