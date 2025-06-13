import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "findgreenery.com",
        pathname: "/uploads/categories/**",
      },
      {
        protocol: "https",
        hostname: "admin.findgreenery.com",
        pathname: "/uploads/website_images/**",
      },
      {
        protocol: "https",
        hostname: "admin.findgreenery.com",
        pathname: "/uploads/categories/**",
      },
      {
        protocol: "https",
        hostname: "m.media-amazon.com",
        pathname: "/images/**",
      },
    ],
  },
};
export default nextConfig;
