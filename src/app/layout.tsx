"use client";
import { GeistSans } from "geist/font/sans";
import { ThemeProvider, type TernaryTheme } from "ternary-theme";
import { type ReactNode, useRef } from "react";
import "./globals.css";

export default function RootLayout({ children }: { children: ReactNode }) {
  const htmlRef = useRef<HTMLHtmlElement>(null);

  return (
    <html ref={htmlRef}>
      <body className={`${GeistSans.className} antialiased`}>
        <ThemeProvider
          onThemeInitialize={() => {
            return (localStorage.getItem("theme") || "auto") as TernaryTheme;
          }}
          onThemeChange={(theme, resolvedTheme) => {
            htmlRef.current.dataset.theme = resolvedTheme;
            localStorage.setItem("theme", theme);
          }}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
