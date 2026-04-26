import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream:   { DEFAULT: "#FAF6F0", dark: "#F0E8DB" },
        parch:   { DEFAULT: "#F3EDE3", dark: "#E8DDD0" },
        ink:     { DEFAULT: "#1C1410", light: "#3D2B1F", muted: "#7A6A5A" },
        sand:    { DEFAULT: "#C8873A", light: "#E8A855", dark: "#A06828" },
        teal:    { DEFAULT: "#0E7490", light: "#1AA3C4", dark: "#0A5A72" },
        omred:   { DEFAULT: "#C0392B", light: "#E74C3C", dark: "#922B21" },
        omgreen: { DEFAULT: "#2D7A4F", light: "#3DA066", dark: "#1E5235" },
        wash:    { DEFAULT: "#FFE8C2", dark: "#F5D4A0" },
      },
      fontFamily: {
        display: ["Playfair Display", "Georgia", "serif"],
        body:    ["Inter", "system-ui", "sans-serif"],
        hand:    ["Caveat", "cursive"],
        arabic:  ["Noto Sans Arabic", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card:   "0 2px 16px rgba(28,20,16,0.08), 0 1px 4px rgba(28,20,16,0.04)",
        "card-hover": "0 8px 32px rgba(28,20,16,0.14), 0 2px 8px rgba(28,20,16,0.06)",
        btn:    "0 2px 8px rgba(192,57,43,0.30)",
      },
      backgroundImage: {
        "paper-texture": "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E\")",
      },
    },
  },
  plugins: [],
};

export default config;
