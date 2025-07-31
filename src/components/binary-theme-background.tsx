"use client";
import { ChevronUp } from "lucide-react";
import type { ReactNode } from "react";
import { useTheme } from "ternary-theme";
import WordTransition from "./word-transition";
import FullScreenThemeSwitcher from "./full-screen-theme-switcher";

export default function BinaryThemeBackground({ children }: { children: ReactNode }) {
  const { resolvedTheme, setTheme } = useTheme();
  return (
    <div
      style={{
        backgroundClip: "content-box",
        backgroundImage:
          resolvedTheme === "dark"
            ? "linear-gradient(to right, #242424 1px, transparent 1px), linear-gradient(to bottom, #242424 1px, transparent 1px)"
            : "radial-gradient(#3c3c3c 1px, transparent 1px)",
        backgroundSize: "70px 70px",
        backgroundPosition: resolvedTheme === "dark" ? "35px 35px" : "0.5px 0.5px",
        backgroundColor: resolvedTheme === "dark" ? "black" : "white",
        transition: "background-color .3s",
        color: resolvedTheme === "dark" ? "white" : "black",
      }}
    >
      <header className="contents">
        <FullScreenThemeSwitcher
          lightTooltip="Switch to light theme"
          darkTooltip="Switch to dark theme"
          noneTooltip="Switch to split view"
          lightContent={
            <WordTransition
              effectTime={1500}
              words={["SHIRO", "START"]}
              reverse
            />
          }
          darkContent={
            <WordTransition
              effectTime={1500}
              words={["WANG", "RACEX"]}
            />
          }
          onChange={setTheme}
        >
          <ChevronUp
            className="pointer-events-none z-1 absolute left-1/2 bottom-8 text-white mix-blend-difference -translate-x-1/2"
            size="4em"
          />
        </FullScreenThemeSwitcher>
      </header>
      {children}
    </div>
  );
}
