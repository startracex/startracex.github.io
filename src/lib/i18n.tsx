import { memo } from "react";

export const i18nConfig = {
  defaultLanguage: "en-US",
  languages: {
    "zh-CN": "简体中文",
    "en-US": "English",
  },
} as const;

export const HrefLangLinks = memo(({ href, lang: excludeLang }: { lang?: string; href?: string }) => (
  <>
    {Object.keys(i18nConfig.languages)
      .filter((lang) => lang !== excludeLang)
      .map((lang) => {
        return (
          <link
            key={lang}
            rel="alternate"
            hrefLang={lang}
            href={`/${lang}${href || ""}`}
          ></link>
        );
      })}
  </>
));

export const staticLangParams = (key: string) => {
  return Object.keys(i18nConfig.languages).map((lang) => {
    return {
      [key]: lang,
    };
  });
};
