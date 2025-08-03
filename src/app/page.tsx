import { redirect } from "next/navigation";
import type React from "react";
import Home from "./[lang]/page";
import { HrefLangLinks, i18nConfig } from "@/lib/i18n";
import { headers } from "next/headers";
import { GeistSans } from "geist/font/sans";
import ThemeProvider from "@/components/theme-provider";

export default async function Page() {
  if (process.env.NEXT_PUBLIC_OUTPUT === "export") {
    const lang = i18nConfig.defaultLanguage;
    return (
      <html lang={lang}>
        <head>
          <HrefLangLinks />
        </head>
        <body className={`${GeistSans.className} antialiased`}>
          <ThemeProvider>{<Home params={Promise.resolve({ lang })} />}</ThemeProvider>
        </body>
      </html>
    );
  }

  const headersList = await headers();

  headersList
    .get("accept-language")
    ?.split(",")
    .forEach((lang) => {
      if (i18nConfig.languages[lang]) {
        return redirect(`/${lang}`);
      }
    });
  redirect(`/${i18nConfig.defaultLanguage}`);
}
