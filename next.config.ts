import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    ignoreDuringBuilds: true,
  },
  basePath: '/event-central',
  assetPrefix: '/event-central',
};

export default nextConfig;
