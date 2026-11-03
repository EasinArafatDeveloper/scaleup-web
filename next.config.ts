import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Self-contained server build for the Docker image (see Dockerfile).
  output: "standalone",
  // Lets a production build run in a separate folder while `next dev` keeps using .next.
  distDir: process.env.NEXT_DIST_DIR || ".next",
  cacheComponents: true,
  partialPrefetching: true,
  redirects() {
    return [
      // One canonical host: www → apex.
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.scaleupweb.xyz" }],
        destination: "https://scaleupweb.xyz/:path*",
        permanent: true
      },
      // "Digital Marketing" was replaced by "SEO, GEO & Tracking" — keep old links working.
      {
        source: "/services/digital-marketing/tracking-pixel-capi",
        destination: "/services/seo-geo-tracking/tracking-pixel-capi",
        permanent: true
      },
      { source: "/services/digital-marketing/:path*", destination: "/services/seo-geo-tracking", permanent: true }
    ];
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
