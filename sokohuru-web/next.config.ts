import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'your_supabase_project.supabase.co',
        // TODO: Replace 'your_supabase_project' with your actual Supabase project ID
        // Example: abcdefghijklmnop.supabase.co
      },
    ],
  },
};

export default nextConfig;
