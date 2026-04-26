
// Content Security Policy
// Keep the policy as a named constant for readability and easy future edits.
const CSP = [
  "default-src 'self'",
  // Next.js RSC / hot-reload inline scripts need 'unsafe-inline'; in production
  // you would replace this with a nonce-based approach.
  "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
  // Inline styles come from Tailwind / Leaflet / styled JSX
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com",
  // Images: Cloudinary CDN + OpenStreetMap tile CDNs + data URIs (Leaflet marker icons)
  "img-src 'self' data: blob: https://res.cloudinary.com https://*.tile.openstreetmap.org",
  // Tile requests (XHR from Leaflet)
  "connect-src 'self' https://*.tile.openstreetmap.org",
  // No plugins, frames, or objects
  "frame-src 'none'",
  "object-src 'none'",
  "base-uri 'self'",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy",            value: CSP },
  { key: "X-Content-Type-Options",             value: "nosniff" },
  { key: "X-Frame-Options",                    value: "DENY" },
  { key: "X-XSS-Protection",                   value: "1; mode=block" },
  { key: "Referrer-Policy",                    value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy",                 value: "camera=(), microphone=(), geolocation=()" },
];

const nextConfig = {
  output: 'standalone',
  // Allow Leaflet to work properly on client
  transpilePackages: ["react-leaflet"],

  images: {
    // Custom loader routes next/image directly to Cloudinary's CDN,
    // bypassing Next.js's /_next/image proxy entirely.
    loader: "custom",
    loaderFile: "./src/lib/cloudinary-loader.ts",
  },

  async headers() {
    return [
      {
        // Apply security headers to every route
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
