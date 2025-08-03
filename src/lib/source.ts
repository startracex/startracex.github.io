import { articles } from "../../.source";
import { loader } from "fumadocs-core/source";
import { i18nConfig } from "./i18n";

export const articleSource = loader({
  i18n: {
    defaultLanguage: i18nConfig.defaultLanguage,
    languages: Object.keys(i18nConfig.languages),
    hideLocale: "never",
    parser: "dir",
  },
  baseUrl: "/articles",
  source: articles.toFumadocsSource(),
});
