import { articleSource } from "@/lib/source";
import { createFromSource } from "fumadocs-core/search/server";
import { createTokenizer } from "@orama/tokenizers/mandarin";

export const revalidate = false;

const searchApi = createFromSource(articleSource, {
  localeMap: {
    "zh-CN": {
      components: {
        tokenizer: createTokenizer(),
      },
      search: {
        threshold: 0,
        tolerance: 0,
      },
    },
    "en-US": {
      language: "english",
    },
  },
});

export const GET = process.env.NEXT_PUBLIC_OUTPUT === "export" ? searchApi.staticGET : searchApi.GET;
