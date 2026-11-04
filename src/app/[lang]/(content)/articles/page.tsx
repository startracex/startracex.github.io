import Link from "next/link";
import ArticleCard from "@/components/article-card";
import { staticLangParams } from "@/lib/i18n";
import { articleSource } from "@/lib/source";
import { createTranslation } from "@/lib/translation";
import fmtime from "fmtime";

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
    return (b.data.lastModified?.getTime() ?? 0) - (a.data.lastModified?.getTime() ?? 0);
  });

  const t = createTranslation(translations[lang]);
  return (
    <div className="pt-12 px-4">
      <div className="flex justify-between items-end mb-8">
        <h1 className="text-4xl font-bold">{t`Articles`}</h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {pages.map((page) => {
          const date = page.data.lastModified ? fmtime("YYYY-MM-DD", page.data.lastModified) : "";
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
