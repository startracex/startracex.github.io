import { isString } from "sharekit";
import { staticLangParams } from "@/lib/i18n";
import { createTranslation } from "@/lib/translation";
import { links } from "./_data";

const translations = {
  "zh-CN": {
    Links: "链接",
  },
};

export default async function Page({
  params,
}: {
  params: Promise<{
    lang: string;
  }>;
}) {
  const { lang } = await params;
  const t = createTranslation(translations[lang]);
  return (
    <div className="pt-12 px-4">
      <div className="flex justify-between items-end mb-8">
        <h1 className="text-4xl font-bold">{t`Links`}</h1>
      </div>
      <div className="gap-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {links.map((link) => {
          const name = isString(link.name) ? link.name : link.name[lang];
          const description = isString(link.description) ? link.description : link.description[lang];
          return (
            <a
              href={link.url}
              className="rounded-md border overflow-hidden"
              key={link.url}
            >
              <img
                className="w-full aspect-8/5 object-cover object-center"
                src={link.preview}
              />
              <div className="p-4 space-y-2">
                <h3 className="text-xl">{name}</h3>
                <p className=" text-muted-foreground">{description}</p>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
}

export function generateStaticParams() {
  return staticLangParams("lang");
}
