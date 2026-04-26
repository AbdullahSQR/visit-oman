import type { MetadataRoute } from "next";
import { DESTINATIONS } from "@/lib/data/destinations";

const BASE_URL = "https://visit-oman.vercel.app";
const LOCALES  = ["en", "ar"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // Static routes per locale
  const staticRoutes = LOCALES.flatMap((locale) => [
    { url: `${BASE_URL}/${locale}`,              lastModified: now, changeFrequency: "weekly"  as const, priority: 1.0 },
    { url: `${BASE_URL}/${locale}/destinations`, lastModified: now, changeFrequency: "weekly"  as const, priority: 0.9 },
    { url: `${BASE_URL}/${locale}/plan`,         lastModified: now, changeFrequency: "monthly" as const, priority: 0.7 },
  ]);

  // One URL per destination per locale — 38 destinations × 2 = 76 entries
  const destinationRoutes = LOCALES.flatMap((locale) =>
    DESTINATIONS.map((d) => ({
      url:             `${BASE_URL}/${locale}/destinations/${d.id}`,
      lastModified:    now,
      changeFrequency: "monthly" as const,
      priority:        0.8,
    }))
  );

  return [...staticRoutes, ...destinationRoutes];
}
