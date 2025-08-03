import type { NextConfig } from "next";
import { createMDX } from "fumadocs-mdx/next";

let output = process.env.NEXT_PUBLIC_OUTPUT as undefined | "export" | "standalone";
if (output !== "export" && output !== "standalone") {
  output = undefined;
}

const withMDX = createMDX();

const nextConfig: NextConfig = {
  output,
  trailingSlash: output === "export",
  experimental: {
    useLightningcss: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  productionBrowserSourceMaps: true,
};

export default withMDX(nextConfig);
