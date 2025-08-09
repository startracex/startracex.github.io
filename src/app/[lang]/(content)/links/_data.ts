type Translations = Record<string, string>;
type Links = {
  name: string | Translations;
  url: string;
  description: string | Translations;
  preview: string;
  languages: string[];
}[];

export const links: Links = [
  {
    name: {
      "en-US": "Example",
      "zh-CN": "示例",
    },
    description: {
      "en-US": "Example website",
      "zh-CN": "示例网站",
    },
    url: "https://example.com",
    preview: "/placeholder.svg",
    languages: ["English"],
  },
];
