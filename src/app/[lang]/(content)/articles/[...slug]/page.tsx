import { DocsPage, DocsBody, DocsDescription, DocsTitle } from "fumadocs-ui/page";
import { createRelativeLink } from "fumadocs-ui/mdx";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { articleSource } from "@/lib/source";
import { getMDXComponents } from "@/mdx-components";

export default async function Page(props: {
  params: Promise<{
    lang: string;
    slug?: string[];
  }>;
}) {
  const { slug, lang } = await props.params;
  const page = articleSource.getPage(slug, lang);

  if (!page) {
    return notFound();
  }

  const MDXContent = page.data.body;
  return (
    <DocsPage
      toc={page.data.toc}
      full={page.data.full}
    >
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription>{page.data.description}</DocsDescription>
      <DocsBody>
        <MDXContent
          components={getMDXComponents({
            a: createRelativeLink(articleSource, page),
          })}
        />
      </DocsBody>
    </DocsPage>
  );
}

export async function generateStaticParams() {
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
