'use client'
import * as React from 'react';
import Footer from "@/app/components/common/Footer";
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import NavBar from '@/app/components/common/MainNav';
import TopGradiant from "@/app/components/common/TopGradiant";

export default function LecturelyPage() {


    return (
        <CssBaseline>
            <NavBar />
            <Box sx={{ bgcolor: 'background.default' }}>
                <TopGradiant />

                <Footer />
            </Box>
            <footer />
        </CssBaseline>
    );
}