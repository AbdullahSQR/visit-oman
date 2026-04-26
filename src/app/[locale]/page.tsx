/**
 * Landing page — Server-Side Rendered.
 * Content derived programmatically from the dataset (no hardcoded destination text).
 */
import type { Locale, Category, Month } from "@/lib/types";
import { DESTINATIONS } from "@/lib/data/destinations";
import { getT } from "@/lib/i18n/translations";
import { seasonFit } from "@/lib/algorithm/scoring";
import HeroSection from "@/components/discovery/HeroSection";
import CategoryGrid from "@/components/discovery/CategoryGrid";
import FeaturedDestinations from "@/components/discovery/FeaturedDestinations";

interface Props {
  params: { locale: Locale };
}

export default function LandingPage({ params }: Props) {
  const t = getT(params.locale);

  // Derive featured destinations: highest season-fit for current server month,
  // prioritising variety of categories and regions.
  const serverMonth = (new Date().getMonth() + 1) as Month;
  const featured = deriveFeatured(serverMonth);

  // Derive category stats for the category grid
  const categoryStats = deriveCategoryStats();

  return (
    <>
      <HeroSection t={t} locale={params.locale} />
      <CategoryGrid t={t} locale={params.locale} categoryStats={categoryStats} />
      <FeaturedDestinations
        t={t}
        locale={params.locale}
        destinations={featured}
      />
    </>
  );
}

/**
 * Select 6 featured destinations that cover diverse categories and regions.
 * Picks the best season-fit destination per category, with crowd level as tiebreaker.
 */
function deriveFeatured(month: Month) {
  const categories: Category[] = ["culture", "mountain", "desert", "beach", "nature", "food"];
  const seen = new Set<string>();
  const result = [];

  for (const cat of categories) {
    const matches = DESTINATIONS
      .filter((d) => d.categories.includes(cat) && !seen.has(d.id))
      .sort((a, b) => {
        const seasonDiff = seasonFit(month, b.recommended_months) - seasonFit(month, a.recommended_months);
        if (Math.abs(seasonDiff) > 0.01) return seasonDiff;        // primary: best season fit
        return b.crowd_level - a.crowd_level;                       // tiebreak: more notable
      });

    const pick = matches[0];
    if (pick) {
      seen.add(pick.id);
      result.push(pick);
    }
  }

  return result.slice(0, 6);
}

/**
 * Count how many destinations belong to each category.
 */
function deriveCategoryStats(): Record<Category, number> {
  const stats: Record<string, number> = {};
  for (const dest of DESTINATIONS) {
    for (const cat of dest.categories) {
      stats[cat] = (stats[cat] ?? 0) + 1;
    }
  }
  return stats as Record<Category, number>;
}
