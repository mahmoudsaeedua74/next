import type { NextConfig } from "next";
interface ImagePattern {
  protocol: "http" | "https";
  hostname: string;
  pathname: string;
}
function buildImagePatterns(): ImagePattern[] {
  const patterns: ImagePattern[] = [];
  const imageProtocol =
    (process.env.NEXT_PUBLIC_IMAGE_PROTOCOL as "http" | "https") || "https";
  const imageHostnames =
    process.env.NEXT_PUBLIC_IMAGE_HOSTNAMES?.split(",") || [];
  const imagePaths = process.env.NEXT_PUBLIC_IMAGE_PATHS?.split(",") || [];
  imageHostnames.forEach((hostname: string) => {
    imagePaths.forEach((pathname: string) => {
      const trimmedHostname = hostname.trim();
      const trimmedPathname = pathname.trim();

      if (trimmedHostname && trimmedPathname) {
        patterns.push({
          protocol: imageProtocol,
          hostname: trimmedHostname,
          pathname: trimmedPathname,
        });
      }
    });
  });

  return patterns;
}
const nextConfig: NextConfig = {
  images: {
    remotePatterns: buildImagePatterns(),
  },
};

module.exports = nextConfig;
