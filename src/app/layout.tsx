import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}

export const metadata: Metadata = {
  title: "Shiro Wang",
  description: "Shiro Wang's website",
  icons: {
    icon: [
      {
        url: "/favicon-light.svg",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/favicon-dark.svg",
        media: "(prefers-color-scheme: dark)",
      },
    ],
  },
};
