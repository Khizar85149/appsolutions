import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  poweredByHeader: false,
  experimental: {
    // Admin pages are rendered per request. Keeping a visited one in the browser
    // for 30 seconds makes switching back and forth between sections instant.
    // Saving, deleting or changing a status clears this at once.
    staleTimes: { dynamic: 30 },
    serverActions: {
      // Job applications carry a résumé of up to 4 MB (see src/lib/uploads.ts).
      bodySizeLimit: "5mb",
    },
  },
  images: {
    // AVIF first: roughly a third smaller than WebP for the hero photographs.
    formats: ["image/avif", "image/webp"],
    qualities: [60, 75],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async redirects() {
    return [
      // One canonical host. Search engines otherwise treat www and non-www as two sites.
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.appssolutionstech.com" }],
        destination: "https://appssolutionstech.com/:path*",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
};

export default nextConfig;
