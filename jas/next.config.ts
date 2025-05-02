import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["localhost"],
  },
  env: {
    API_URL: process.env.API_URL || "http://localhost:5000/api",
  },
};

export default nextConfig;
