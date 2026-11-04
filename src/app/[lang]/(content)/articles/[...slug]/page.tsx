import { createRelativeLink } from "fumadocs-ui/mdx";
import { DocsBody, DocsPage } from "fumadocs-ui/layouts/docs/page";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import fmtime from "fmtime";
import { articleSource } from "@/lib/source";
import { createTranslation } from "@/lib/translation";
import { getMDXComponents } from "@/mdx-components";

const translations = {
  "zh-CN": {
    "Edit on GitHub": "在 GitHub 上编辑",
    "Last updated": "最后更新",
  },
};

export default async function Page(props: {
  params: Promise<{
    lang: string;
    slug?: string[];
  }>;
}) {
  const { slug, lang } = await props.params;
  const page = articleSource.getPage(slug, lang);

  const t = createTranslation(translations[lang]);

  if (!page) {
    return notFound();
  }

  const MDXContent = page.data.body;
  const updatedAt = page.data.lastModified?.getTime();
  return (
    <DocsPage
      toc={page.data.toc}
      tableOfContent={{
        style: "clerk",
      }}
      tableOfContentPopover={{
        style: "clerk",
      }}
      breadcrumb={{
        enabled: false,
      }}
      footer={{
        className: "p-0",
      }}
    >
      <h1 className="text-3xl font-bold">{page.data.title}</h1>
      <p className="text-muted-foreground">{page.data.description}</p>
      <DocsBody>
        `
        <MDXContent
          components={getMDXComponents({
            a: createRelativeLink(articleSource, page),
          })}
        />
      </DocsBody>
      <div className="flex justify-between text-sm">
        {/* <Link
          className="hover:underline"
          href={`https://github.com/startracex/startracex.github.io/blob/main/content/${page.data._file.path.replaceAll(
            "\\",
            "/",
          )}`}
        >
          {t`Edit on GitHub`}
        </Link> */}
        {updatedAt && (
          <time>
            {t`Last updated`} {fmtime("YYYY-MM-DD", new Date(updatedAt))}
          </time>
        )}
      </div>
    </DocsPage>
  );
}

export function generateStaticParams() {
  return articleSource.generateParams();
}

export async function generateMetadata(props: { params: Promise<{ slug?: string[] }> }): Promise<Metadata> {
  const params = await props.params;
  const page = articleSource.getPage(params.slug);
  if (!page) {
    return notFound();
  }
  return {
    title: page.data.title,
    description: page.data.description,
  };
}
