/**
 * Destinations browse page — Server-Side Rendered.
 * Filter state lives in URL query parameters for shareability.
 * Client-side interactions (filter changes, saves) are handled by DestinationsClient.
 */
import type { Locale } from "@/lib/types";
import { DESTINATIONS } from "@/lib/data/destinations";
import { getT } from "@/lib/i18n/translations";
import { filterDestinations } from "@/lib/utils/filterDestinations";
import DestinationsClient from "@/components/discovery/DestinationsClient";

interface Props {
  params: { locale: Locale };
  searchParams: {
    category?: string;
    region?: string;
    season?: string;
    sort?: string;
  };
}

export default function DestinationsPage({ params, searchParams }: Props) {
  const t = getT(params.locale);
  const { locale } = params;

  const initialFilters = {
    category: searchParams.category ?? "",
    region:   searchParams.region   ?? "",
    season:   searchParams.season   ?? "",
    sort:     searchParams.sort     ?? "",
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <header className="mb-8">
        <h1 className="font-display font-bold text-ink text-3xl">{t.browse.title}</h1>
        <p className="text-ink/50 mt-1">{t.browse.subtitle}</p>
      </header>
      <DestinationsClient
        allDestinations={DESTINATIONS}
        locale={locale}
        t={t}
        initialFilters={initialFilters}
      />
    </div>
  );
}
