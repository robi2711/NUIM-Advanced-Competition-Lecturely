"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type ThemeContextType = {
    mode: "light" | "dark"
    toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [mode, setMode] = useState<"light" | "dark">("dark")

    useEffect(() => {
        const savedMode = localStorage.getItem("themeMode") as "light" | "dark" | null
        if (savedMode) {
            setMode(savedMode)
        }
    }, [])

    const toggleTheme = () => {
        const newMode = mode === "light" ? "dark" : "light"
        setMode(newMode)
        localStorage.setItem("themeMode", newMode)
    }

    return <ThemeContext.Provider value={{ mode, toggleTheme }}>{children}</ThemeContext.Provider>
}

export const useTheme = () => {
    const context = useContext(ThemeContext)
    if (context === undefined) {
        throw new Error("useTheme must be used within a ThemeProvider")
    }
    return context
}

