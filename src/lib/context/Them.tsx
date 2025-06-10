"use client";
import React, { createContext, useContext, ReactNode, useEffect } from "react";
import { useThem } from "@/lib/api/queries";

interface ThemeContextType {
    mainColor: string;
    fontFamily: string;
    isLoading: boolean;
    error: unknown;
}

const ThemeContext = createContext<ThemeContextType>({
    mainColor: "hsl(35, 84%, 53%)",
    fontFamily: "sans-serif",
    isLoading: false,
    error: null,
});
export function ThemeProvider({ children }: { children: ReactNode }) {
    const { data: theme, isLoading, error } = useThem();
    useEffect(() => {
        if (theme?.theme) {
            if (theme?.theme.main_color) {
                document.documentElement.style.setProperty(
                    "--main-color",
                    `hsl(${theme?.theme.main_color})`
                );
            }
            if (theme?.theme.font) {
                document.documentElement.style.setProperty(
                    "--font-family",
                    theme?.theme.font
                );
            }
        }
    }, [theme?.theme]);
    const contextValue = {
        mainColor: theme?.theme?.main_color
            ? `hsl(${theme?.theme?.main_color})`
            : "hsl(35 84% 53%)",
        fontFamily: theme?.theme?.font || "sans-serif",
        isLoading,
        error,
    };
    return (
        <ThemeContext.Provider value={contextValue}>
            {children}
        </ThemeContext.Provider>
    );
}
export function useAppTheme() {
    return useContext(ThemeContext);
}
