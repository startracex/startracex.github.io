import React from "react";
import BackToTop from "@/components/back-to-top";
import { DraggableContainer } from "@/components/draggable-box";
import ContributionActivity from "@/components/contribution-activity";
import BinaryThemeBackground from "@/components/binary-theme-background";
import { staticLangParams } from "@/lib/i18n";
import { createTranslation } from "@/lib/translation";
import Link from "next/link";
import Button from "@/components/ui/button";

const translations = {
  "zh-CN": {
    "About me": "关于我",
    "I am Shiro Wang aka Startracex, developer from China.": "我是 Shiro Wang, 来自中国的开发者。",
    "Crayon Shin-chan": "蜡笔小新",
    "I named Shiro because Shiro is a character from ${0} and its pronunciation is similar to my Chinese name.":
      "我叫 Shiro 因为 Shiro (小白) 是 ${0} 中的角色, 它的发音类似于我的中文名",
    "Made by Shiro Wang": "由 Shiro Wang 制作",
    "View source on GitHub": "在 GitHub 上查看源代码",
    Hobbies: "兴趣爱好",
    "Watching crude panda-head meme animations": "观看熊猫头沙雕动画",
    "Watching comedy, reasoning, intellectual battles, adventures in anime, and tokusatsu":
      "观看喜剧、推理、智斗、冒险的动漫, 以及特摄",
    "Playing games on PC": "在 PC 上玩游戏",
    "Doing cosplay and cross-dressing": "角色扮演和女装",
    "Recently playing": "最近在玩",
    "Favorite work series": "最喜欢的作品系列",
    "Crayon Shin-chan (クレヨンしんちゃん)": "蜡笔小新 (クレヨンしんちゃん)",
    "Date A Live (デート・ア・ライブ)": "约会大作战 (デート・ア・ライブ)",
    "Death Note (デスノート)": "死亡笔记 (デスノート)",
    "Detective Conan (名探偵コナン)": "名侦探柯南 (名探偵コナン)",
    "Doraemon (ドラえもん)": "哆啦A梦 (ドラえもん)",
    "RevEvolution (超兽武裝)": "超兽武装",
    "Hyakuju Sentai Gaoranger (百獣戦隊ガオレンジャー)": "百兽战队牙吠连者 (百獣戦隊ガオレンジャー)",
    "Ultraman (ウルトラマン)": "奥特曼 (ウルトラマン)",
    "Browse articles": "浏览文章",
  },
};

export default async function Home({
  params,
}: {
  params: Promise<{
    lang: string;
  }>;
}) {
  const { lang } = await params;

  const t = createTranslation(translations[lang]);

  return (
    <BinaryThemeBackground>
      <main className="w-full max-w-4xl px-4 mx-auto mt-12 mb-6 space-y-10">
        <div className="shadow-md rounded-lg p-8 space-y-6">
          <h2 className="text-3xl font-semibold">{t`About me`}</h2>
          <div>
            <div className="flex justify-between sm:flex-row flex-col gap-4">
              <div className="space-y-4">
                <p>{t`I am Shiro Wang aka Startracex, developer from China.`}</p>
                <p>
                  {t`I named Shiro because Shiro is a character from ${(
                    <i>{t`Crayon Shin-chan`}</i>
                  )} and its pronunciation is similar to my Chinese name.`}
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
          <ContributionActivity />
        </div>

        <DraggableContainer
          boxes={[
            {
              id: "hobbies",
              title: t`Hobbies`,
              content: [
                t`Watching crude panda-head meme animations`,
                t`Watching comedy, reasoning, intellectual battles, adventures in anime, and tokusatsu`,
                t`Playing games on PC`,
                t`Doing cosplay and cross-dressing`,
              ],
            },
            {
              id: "recently_playing",
              title: t`Recently playing`,
              content: [
                "Destiny 2",
                "HITMAN World of Assassination",
                "Grand Theft Auto V",
                "Minecraft",
                "Tiny Tina's Wonderlands",
              ],
            },
            {
              id: "favorite_work_series",
              title: t`Favorite work series`,
              content: [
                t`Crayon Shin-chan (クレヨンしんちゃん)`,
                t`Date A Live (デート・ア・ライブ)`,
                t`Death Note (デスノート)`,
                t`Detective Conan (名探偵コナン)`,
                t`Doraemon (ドラえもん)`,
                t`RevEvolution (超兽武裝)`,
                t`Hyakuju Sentai Gaoranger (百獣戦隊ガオレンジャー)`,
                t`Ultraman (ウルトラマン)`,
              ],
            },
          ].map((box) => ({
            ...box,
            content: (
              <ul>
                {box.content.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            ),
          }))}
        />
        <div className="flex justify-center">
          <Button
            variant="outline"
            asChild
          >
            <Link href={`/${lang}/articles`}>{t`Browse articles`}</Link>
          </Button>
        </div>
      </main>
      <footer className="flex flex-col items-center gap-2 pb-4">
        <div className="cursor-crosshair mix-blend-difference bg-white text-black px-2 py-1 rounded-xs">{t`Made by Shiro Wang`}</div>
        <a
          href={"https://github.com/startracex/startracex.github.io"}
          className="hover:underline"
          target="_blank"
        >
          {t`View source on GitHub`}
        </a>
      </footer>
      <BackToTop />
    </BinaryThemeBackground>
  );
}

export function generateStaticParams() {
  return staticLangParams("lang");
}
