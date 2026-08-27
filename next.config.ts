import type { NextConfig } from "next";
import { securityHeaders, apiHeaders } from "./lib/security-headers";

const nextConfig: NextConfig = {
  // Brief §38 moved the sourcing pillars to keyword-first root URLs. These are
  // permanent so any existing link or index entry follows to the one canonical URL.
  async redirects() {
    return [
      { source: "/product-development", destination: "/development", permanent: true },
      { source: "/sourcing/apparel-manufacturer-pakistan", destination: "/apparel-manufacturer-pakistan", permanent: true },
      { source: "/sourcing/apparel-exporter-pakistan", destination: "/apparel-exporter-pakistan", permanent: true },
      { source: "/sourcing/fob-apparel-manufacturing", destination: "/fob-apparel-manufacturing", permanent: true },
      { source: "/sourcing/private-label-manufacturing", destination: "/private-label-manufacturing", permanent: true },
      { source: "/sourcing/garment-manufacturer-karachi", destination: "/garment-manufacturer-karachi", permanent: true },
    ];
  },

  images: {
    // AVIF first: meaningfully smaller than WebP for photography, with WebP as
    // the fallback for clients that do not accept it.
    formats: ["image/avif", "image/webp"],
    // Matches the breakpoints the layouts actually use, so no oversized variant
    // is generated or served.
    deviceSizes: [390, 640, 768, 1024, 1280, 1440, 1920],
    imageSizes: [64, 96, 128, 180, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 365,
  },

  experimental: {
    // Tree-shakes barrel imports so a single icon does not pull the whole set.
    optimizePackageImports: ["lucide-react"],
  },

  async headers() {
    return [
      // Security headers on every response. See lib/security-headers.ts for why
      // each one is here and what it actually prevents on this site.
      { source: "/:path*", headers: securityHeaders },
      // Submission responses must never be cached or indexed.
      { source: "/api/:path*", headers: apiHeaders },
      // Long-lived immutable caching for fingerprinted static assets.
      {
        source: "/assets/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
    ];
  },

  // Next regenerates CLAUDE.md on dev start; this repo keeps hand-written
  // working notes there instead.
  agentRules: false,

  poweredByHeader: false,
};

export default nextConfig;
