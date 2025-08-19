import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['blog-meme.blr1.digitaloceanspaces.com'],
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  
};

export default nextConfig;
