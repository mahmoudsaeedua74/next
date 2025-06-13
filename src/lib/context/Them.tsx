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
  mainColor: "hsl(103 74% 17%)",
  fontFamily: "sans-serif",
  isLoading: false,
  error: null,
});

function hslToHsla(hsl: string, alpha: number = 0.2): string {
  const hslMatch = hsl.match(/^hsl\((\d+)[,\s]+(\d+)%[,\s]+(\d+)%\)$/);
  if (hslMatch) {
    const [, h, s, l] = hslMatch;
    return `hsla(${h}, ${s}%, ${l}%, ${alpha})`;
  }
  return hsl;
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const { data: theme, isLoading, error } = useThem();

  useEffect(() => {
    if (theme?.theme) {
      const rawHsl = theme?.theme.main_color;
      if (rawHsl) {
        const hslColor = `hsl(${rawHsl})`;
        const hslaColor = hslToHsla(hslColor, 0.2);

        document.documentElement.style.setProperty("--main-color", hslColor);
        document.documentElement.style.setProperty(
          "--main-backColor",
          hslaColor
        );
      }

      if (theme?.theme.font) {
        document.documentElement.style.setProperty(
          "--font-family",
          theme.theme.font
        );
      }
    }
  }, [theme?.theme]);

  const contextValue = {
    mainColor: theme?.theme?.main_color
      ? `hsl(${theme?.theme.main_color})`
      : "hsl(103 74% 17%)",
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
