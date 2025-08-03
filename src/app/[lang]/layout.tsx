import type { ReactNode } from "react";
import { GeistSans } from "geist/font/sans";
import { HrefLangLinks } from "@/lib/i18n";
import ThemeProvider from "@/components/theme-provider";

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
  return (
    <html lang={lang}>
      <head>
        <HrefLangLinks lang={lang} />
      </head>
      <body className={`${GeistSans.className} antialiased`}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
