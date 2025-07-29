"use client";
import type React from "react";
import { ChevronUp } from "lucide-react";
import { useTheme } from "ternary-theme/context.js";
import FSTS from "@/components/full-screen-theme-switcher";
import WordTransition from "@/components/word-transition";
import BackToTop from "@/components/back-to-top";
import { DraggableContainer } from "@/components/draggable-box";
import ContributionActivity from "@/components/contribution-activity";

export default function Page() {
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
        <FSTS
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
        </FSTS>
      </header>
      <main className="w-full max-w-4xl px-4 mx-auto mt-12 mb-6 space-y-12">
        <div className="shadow-md shadow-zinc-800/15 dark:shadow-zinc-100/10 rounded-lg p-8 space-y-6">
          <h2 className="text-3xl font-semibold">About me</h2>
          <div>
            <div className="flex justify-between sm:flex-row flex-col gap-4">
              <div className="space-y-4">
                <p>I am Shiro Wang aka Startracex, developer from China.</p>
                <p>
                  I named is Shiro because Shiro is a character from <i>Crayon Shin-chan</i> and its pronunciation is
                  similar to my Chinese name.
                </p>
              </div>
              <img
                className="rounded-md"
                width={150}
                height={150}
                src="https://avatars.githubusercontent.com/u/94100555?s=400"
                alt="Avatar"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-center px-2">
          <ContributionActivity theme={resolvedTheme} />
        </div>

        <DraggableContainer
          boxes={[
            {
              title: "Hobbies",
              content: [
                "Watching crude panda-head meme animations",
                "Watching kids', mystery, and mind game anime",
                "Playing games on PC",
                "Doing cosplay and cross-dressing",
              ],
            },
            {
              title: "Recently playing",
              content: [
                "Destiny 2",
                "HITMAN World of Assassination",
                "Grand Theft Auto V",
                "Minecraft",
                "Tiny Tina's Wonderlands",
              ],
            },
            {
              title: "Favorite work series",
              content: [
                "Crayon Shin-chan (クレヨンしんちゃん)",
                "Date A Live (デート・ア・ライブ)",
                "Death Note (デスノート)",
                "Detective Conan (名探偵コナン)",
                "Doraemon (ドラえもん)",
                "RevEvolution (超兽武裝)",
                "Hyakuju Sentai Gaoranger (百獣戦隊ガオレンジャー)",
                "Ultraman (ウルトラマン)",
              ],
            },
          ].map((box) => ({
            ...box,
            content: (
              <ul>
                {box.content.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            ),
          }))}
        />
      </main>
      <footer className="flex flex-col items-center gap-2 pb-4">
        <div className="cursor-crosshair mix-blend-difference bg-white text-black px-2 rounded-xs">
          Made by Shiro Wang
        </div>
        <a
          href={"https://github.com/startracex/startracex.github.io"}
          className="hover:underline"
          target="_blank"
        >
          View source on GitHub
        </a>
      </footer>
      <BackToTop />
    </div>
  );
}
