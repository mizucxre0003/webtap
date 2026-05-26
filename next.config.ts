import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  typedRoutes: false,
  async rewrites() {
    return [
      {
        source: "/niche/beauty",
        destination: "/niche/beauty/index.html",
      },
      {
        source: "/niche/stroy",
        destination: "/niche/stroy/index.html",
      },
    ];
  },
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;
