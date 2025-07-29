import type { NextConfig } from "next";

const output = process.env.OUTPUT as undefined | "export" | "standalone";

const nextConfig: NextConfig = {
  output,
  experimental: {
    mdxRs: {
      mdxType: "gfm",
    },
  },
};

export default nextConfig;
