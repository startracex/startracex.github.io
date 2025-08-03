import type { ReactNode } from "react";
import { RootProvider } from "fumadocs-ui/provider";
import { HomeLayout } from "fumadocs-ui/layouts/home";
import SearchDialog from "@/components/search";
import { i18nConfig } from "@/lib/i18n";
import { createTranslation } from "@/lib/translation";
import "./content.css";

const translations = {
  "zh-CN": {
    Home: "主页",
    Articles: "文章",
    Links: "链接",
    Contact: "联系",
  },
};

const locales = Object.entries(i18nConfig.languages).map(([locale, name]) => {
  return {
    name,
    locale,
  };
});

export default async function Layout({
  children,
  params,
}: {
  params: Promise<{
    lang: string;
  }>;
  children: ReactNode;
}) {
  const { lang } = await params;
  const t = createTranslation(translations[lang]);
  return (
    <RootProvider
      theme={{
        enabled: false,
      }}
      search={{
        SearchDialog,
      }}
      i18n={{
        locale: lang,
        locales,
        translations: {
          "zh-CN": {
            chooseLanguage: "选择语言",
            search: "搜索",
            chooseTheme: "选择主题",
            editOnGithub: "在 GitHub 上编辑",
            lastUpdate: "最后更新",
            nextPage: "下一页",
            previousPage: "上一页",
            searchNoResult: "无结果",
            toc: "目录",
            tocNoHeadings: "无标题",
          },
        }[lang],
      }}
    >
      <HomeLayout
        i18n={true}
        themeSwitch={{
          enabled: false,
        }}
        links={[
          {
            text: t`Home`,
            url: `/${lang}`,
          },
          {
            text: t`Articles`,
            url: `/${lang}/articles`,
            active: "nested-url",
          },
          {
            text: t`Links`,
            url: `/${lang}/links`,
            active: "url",
          },
          {
            type: "menu",
            text: t`Contact`,
            items: [
              {
                text: "Discord",
                url: "https://discord.gg/FHMGP5zMc7",
              },
              {
                text: "GitHub",
                url: "https://github.com/startracex",
              },
              {
                text: "QQ 频道",
                url: "https://pd.qq.com/s/ch908ymm1?b=9",
              },
            ],
          },
        ]}
        githubUrl="https://github.com/startracex/startracex.github.io"
      >
        {children}
      </HomeLayout>
    </RootProvider>
  );
}
