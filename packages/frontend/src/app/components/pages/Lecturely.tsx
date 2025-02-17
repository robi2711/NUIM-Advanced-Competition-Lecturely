'use client'
import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import NavBar from '@/app/components/common/MainNav';
import HomeHero from "@/app/components/home/HomeHero";
import HomeCards from "@/app/components/home/HomeCards";

export default function LecturelyPage() {

    return (
        <CssBaseline>
            <NavBar />
            <HomeHero />
            <HomeCards />
        </CssBaseline>
    );
}