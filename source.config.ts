import { defineConfig, defineDocs, frontmatterSchema, metaSchema } from "fumadocs-mdx/config";

export const articles = defineDocs({
  dir: "content/articles",
  docs: {
    schema: frontmatterSchema,
    lastModified: true,
  },
  meta: {
    schema: metaSchema,
  },
});

export default defineConfig({
  mdxOptions: {},
});
