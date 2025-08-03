"use client";
import { ThemeProvider as TernaryThemeProvider, type TernaryTheme } from "ternary-theme";
import type { ReactNode } from "react";

export default function ThemeProvider({
  storageKey = "theme",
  children,
}: {
  storageKey?: string;
  children?: ReactNode;
}) {
  return (
    <TernaryThemeProvider
      onThemeInitialize={() => {
        return (localStorage.getItem(storageKey) || "auto") as TernaryTheme;
      }}
      onThemeChange={(theme, resolvedTheme) => {
        document.documentElement.dataset.theme = resolvedTheme;
        localStorage.setItem(storageKey, theme);
      }}
    >
      {children}
    </TernaryThemeProvider>
  );
}
