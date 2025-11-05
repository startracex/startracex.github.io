import { DocsLayout } from "fumadocs-ui/layouts/docs";
import type { ReactNode } from "react";
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

  const tree = articleSource.pageTree[lang];
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
      nav={{
        enabled: false,
      }}
      tree={tree}
    >
      {children}
    </DocsLayout>
  );
}
