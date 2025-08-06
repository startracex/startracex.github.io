import { DocsLayout } from "fumadocs-ui/layouts/docs";
import type { ReactNode } from "react";
import type { PageTree } from "fumadocs-core/server";
import { articleSource } from "@/lib/source";

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

  const tree = articleSource.pageTree[lang] as unknown as PageTree.Root;
  return (
    <DocsLayout
      themeSwitch={{
        enabled: false,
      }}
      searchToggle={{
        enabled: false,
      }}
      sidebar={{
        enabled: false,
      }}
      tree={tree}
    >
      {children}
    </DocsLayout>
  );
}
