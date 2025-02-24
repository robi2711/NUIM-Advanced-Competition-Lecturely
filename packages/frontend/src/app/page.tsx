"use client"
import CssBaseline from "@mui/material/CssBaseline"
import Box from "@mui/material/Box"
import Divider from "@mui/material/Divider"
import NavBar from "./components/landing/NavBar"
import Hero from "./components/landing/Hero"
import Features from "./components/landing/Features"
import FAQ from "./components/landing/FAQ"
import Footer from "@/app/components/common/Footer"


export default function LandingPage() {
    return (
        <>
            <CssBaseline />
            <NavBar />
            <Hero />
            <Box sx={{ bgcolor: "background.default" }}>
                <Divider />
                <Features />
                <Divider />
                <FAQ />
            </Box>
            <Footer />
        </>
    )
}
