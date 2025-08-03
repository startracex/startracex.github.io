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
    name: "Example",
    url: "https://example.com",
    description: "Example website",
    preview: "/placeholder.svg",
    languages: ["English"],
  },
];
