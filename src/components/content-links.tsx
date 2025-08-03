import { createStringTranslation } from "@/lib/translation";
import Tabs from "@godown/react/tabs.js";
import Link from "next/link";
const translations = {
  "zh-CN": {
    Articles: "文章",
    Links: "链接",
  },
};

export default function ContentLinks({ lang }) {
  const t = createStringTranslation(translations[lang]);
  return (
    <Tabs
      className="tabs"
      index={-1}
      beginning="previous"
      tabs={[`articles`, `links`]}
    >
      <Link
        className="inline-flex items-center justify-center w-full p-1.5"
        slot="articles"
        href={`/${lang}/articles`}
      >
        {t`Articles`}
      </Link>
      <Link
        className="inline-flex items-center justify-center w-full p-1.5"
        slot="links"
        href={`/${lang}/links`}
      >
        {t`Links`}
      </Link>
    </Tabs>
  );
}
