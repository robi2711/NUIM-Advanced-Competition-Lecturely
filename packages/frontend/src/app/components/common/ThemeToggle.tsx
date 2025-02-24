"use client"

import type React from "react"
import { IconButton } from "@mui/material"
import Brightness4Icon from "@mui/icons-material/Brightness4"
import Brightness7Icon from "@mui/icons-material/Brightness7"
import { useTheme } from "@/app/ThemeContext"

const ThemeToggle: React.FC = () => {
    const { mode, toggleTheme } = useTheme()

    return (
        <IconButton onClick={toggleTheme} color="inherit">
            {mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
    )
}

export default ThemeToggle

