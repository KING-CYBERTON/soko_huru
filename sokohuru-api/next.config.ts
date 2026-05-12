import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/t/:slug',
        destination: '/api/track/:slug',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
