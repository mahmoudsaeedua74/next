"use client";
import React, { createContext, useContext, ReactNode, useEffect, useState } from "react";
import { useThem } from "@/lib/api/queries";
import { getFontByApiName } from "../dynamic-fonts";

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
  const [currentFont, setCurrentFont] = useState("fallback");

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
        getFontByApiName(theme.theme.font).then((success) => {
          if (success) {
            setCurrentFont(theme.theme.font);
          } else {
            setCurrentFont("fallback");
          }
        });
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
    currentFont,
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