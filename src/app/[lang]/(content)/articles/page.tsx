import Link from "next/link";
import { isNumerical } from "sharekit";
import ArticleCard from "@/components/article-card";
import { staticLangParams } from "@/lib/i18n";
import { articleSource } from "@/lib/source";
import { createTranslation } from "@/lib/translation";

const translations = {
  "zh-CN": {
    Articles: "文章",
  },
};

export default async function Page(props: {
  params: Promise<{
    lang: string;
    slug?: string[];
  }>;
}) {
  const { lang } = await props.params;
  const pages = articleSource.getPages(lang).sort((a, b) => {
    const aDate = isNumerical(a.data.lastModified) ? new Date(a.data.lastModified) : new Date();
    const bDate = isNumerical(b.data.lastModified) ? new Date(b.data.lastModified) : new Date();
    return bDate.getTime() - aDate.getTime();
  });

  const t = createTranslation(translations[lang]);
  return (
    <div className="max-w-7xl w-full p-6 mx-auto">
      <div className="flex justify-between items-end mt-6 mb-8">
        <h1 className="text-4xl font-bold">{t`Articles`}</h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {pages.map((page) => {
          const date = isNumerical(page.data.lastModified)
            ? new Date(page.data.lastModified).toLocaleDateString(lang)
            : "";
          return (
            <Link
              className="bg-foreground/5 space-y-1 break-inside-avoid"
              key={page.url}
              href={page.url}
            >
              <ArticleCard
                title={page.data.title}
                description={page.data.description}
                date={date}
              />
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export function generateStaticParams() {
  return staticLangParams("lang");
}
