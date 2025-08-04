import type { NextConfig } from "next";

const APP_BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    ignoreDuringBuilds: true,
  },
  basePath: APP_BASE_PATH,
  assetPrefix: APP_BASE_PATH,
};

export default nextConfig;