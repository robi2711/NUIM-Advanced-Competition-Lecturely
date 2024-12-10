'use client'
import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import NavBar from '@/app/components/common/MainNav';
import api from "@/app/components/services/apiService";

const checkAuthStatus = async () => {
    const response = await fetch('http://localhost:3001/Lecturely', {
        credentials: 'same-origin'
    });
    // Store user info in your frontend state management
    console.log(response);
};
checkAuthStatus()

export default function LecturelyPage() {


    return (
        <CssBaseline>
            <NavBar />
            <Box sx={{ bgcolor: 'background.default' }}>
            </Box>
        </CssBaseline>
    );
}