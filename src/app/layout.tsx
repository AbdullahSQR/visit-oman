import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

export const metadata: Metadata = {
  title: "Visit Oman — Discover & Plan",
  description:
    "Intelligently plan your Oman trip. Discover destinations across Muscat, Dhofar, Sharqiyah and more, then generate a realistic multi-day itinerary with one click.",
  keywords: "Oman, tourism, travel, itinerary, Muscat, Salalah, Wahiba Sands, Nizwa",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = headers().get("x-locale") ?? "en";
  const isRtl = locale === "ar";

  return (
    <html lang={locale} dir={isRtl ? "rtl" : "ltr"} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=Inter:wght@300;400;500;600;700&family=Caveat:wght@400;600;700&family=Noto+Sans+Arabic:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
