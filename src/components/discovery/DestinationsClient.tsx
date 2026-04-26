"use client";

import { useCallback, useState, useTransition } from "react";
import { useRouter, usePathname } from "next/navigation";
import type { Destination, Locale, Category, Region } from "@/lib/types";
import type { TranslationKeys } from "@/lib/i18n/translations";
import { filterDestinations, type DestinationFilters } from "@/lib/utils/filterDestinations";
import DestinationCard from "./DestinationCard";

interface Props {
  allDestinations: Destination[];
  locale: Locale;
  t: TranslationKeys;
  initialFilters: DestinationFilters;
}

const CATEGORIES: Category[] = ["mountain","beach","culture","desert","nature","food"];
const REGIONS: Region[]     = ["muscat","dakhiliya","sharqiya","dhofar","batinah","dhahira"];
const MONTHS = Array.from({ length: 12 }, (_, i) => i + 1);

export default function DestinationsClient({
  allDestinations, locale, t, initialFilters,
}: Props) {
  const router    = useRouter();
  const pathname  = usePathname();
  const [isPending, start] = useTransition();
  const [filters, setFilters] = useState<DestinationFilters>(initialFilters);

  const filtered = filterDestinations(allDestinations, filters);

  const update = useCallback((key: keyof DestinationFilters, val: string) => {
    const next = { ...filters, [key]: val };
    setFilters(next);
    const p = new URLSearchParams();
    if (next.category) p.set("category", next.category);
    if (next.region)   p.set("region",   next.region);
    if (next.season)   p.set("season",   next.season);
    if (next.sort)     p.set("sort",     next.sort);
    start(() => router.replace(p.toString() ? `${pathname}?${p}` : pathname, { scroll: false }));
  }, [filters, pathname, router]);

  const clearAll = () => {
    setFilters({ category:"", region:"", season:"", sort:"" });
    start(() => router.replace(pathname, { scroll: false }));
  };

  const hasActive = Object.values(filters).some(Boolean);

  return (
    <div className="flex flex-col lg:flex-row gap-8">

      {/* ── Filter sidebar ─────────────────────────────────────────────── */}
      <aside className="w-full lg:w-64 shrink-0">
        <div className="card rounded-2xl p-5 sticky top-20">

          {/* Sidebar header */}
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-display font-bold text-ink text-lg">{t.browse.filters}</h2>
            {hasActive && (
              <button onClick={clearAll}
                className="text-xs text-omred font-semibold hover:underline">
                Clear all
              </button>
            )}
          </div>

          <FilterGroup label={t.browse.allCategories}>
            <div className="flex flex-wrap gap-1.5">
              {CATEGORIES.map((c) => (
                <button key={c} onClick={() => update("category", filters.category === c ? "" : c)}
                  className={`px-2.5 py-1 rounded-full text-xs font-semibold transition-all ${
                    filters.category === c
                      ? "bg-teal text-white"
                      : "bg-parch text-ink/60 hover:bg-teal/10 hover:text-teal"
                  }`}>
                  {t.categories[c as keyof typeof t.categories]}
                </button>
              ))}
            </div>
          </FilterGroup>

          <FilterGroup label={t.browse.allRegions}>
            <select value={filters.region} onChange={(e) => update("region", e.target.value)}
              className="w-full text-sm bg-parch border border-ink/12 rounded-xl px-3 py-2
                text-ink focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal
                appearance-none cursor-pointer">
              <option value="">{t.browse.allRegions}</option>
              {REGIONS.map((r) => (
                <option key={r} value={r}>{t.regions[r as keyof typeof t.regions]}</option>
              ))}
            </select>
          </FilterGroup>

          <FilterGroup label={t.browse.allSeasons}>
            <select value={filters.season} onChange={(e) => update("season", e.target.value)}
              className="w-full text-sm bg-parch border border-ink/12 rounded-xl px-3 py-2
                text-ink focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal
                appearance-none cursor-pointer">
              <option value="">{t.browse.allSeasons}</option>
              {MONTHS.map((m) => (
                <option key={m} value={String(m)}>{t.months[m as keyof typeof t.months]}</option>
              ))}
            </select>
          </FilterGroup>

          <FilterGroup label={t.browse.sortBy}>
            <div className="flex flex-col gap-1.5">
              {[
                { val: "",       label: "Default"              },
                { val: "crowd",  label: t.browse.sortPopularity },
                { val: "cost",   label: t.browse.sortCost       },
              ].map(({ val, label }) => (
                <button key={val} onClick={() => update("sort", val)}
                  className={`text-start px-3 py-1.5 rounded-lg text-sm transition-all ${
                    filters.sort === val
                      ? "bg-sand/15 text-sand font-semibold"
                      : "text-ink/60 hover:bg-parch"
                  }`}>
                  {label}
                </button>
              ))}
            </div>
          </FilterGroup>

          {/* Active filter chips */}
          {hasActive && (
            <div className="mt-4 pt-4 border-t border-ink/8">
              <p className="text-xs text-ink/40 mb-2">Active filters</p>
              <div className="flex flex-wrap gap-1.5">
                {filters.category && (
                  <Chip label={t.categories[filters.category as keyof typeof t.categories]}
                    onRemove={() => update("category","")}/>
                )}
                {filters.region && (
                  <Chip label={t.regions[filters.region as keyof typeof t.regions]}
                    onRemove={() => update("region","")}/>
                )}
                {filters.season && (
                  <Chip label={t.months[parseInt(filters.season) as keyof typeof t.months]}
                    onRemove={() => update("season","")}/>
                )}
              </div>
            </div>
          )}
        </div>
      </aside>

      {/* ── Results ────────────────────────────────────────────────────── */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-5">
          <p className="text-sm text-ink/50">
            <span className="font-semibold text-ink">{filtered.length}</span>{" "}
            {t.browse.results}
          </p>
        </div>

        {filtered.length === 0 ? (
          <div className="card rounded-2xl py-20 text-center">
            <p className="font-hand text-2xl text-sand/60 mb-2">✦ ✦ ✦</p>
            <p className="text-ink/40">{t.browse.noResults}</p>
          </div>
        ) : (
          <div className={`grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 transition-opacity duration-150 ${isPending ? "opacity-50 pointer-events-none" : "opacity-100"}`}>
            {filtered.map((dest) => (
              <DestinationCard key={dest.id} destination={dest} locale={locale} t={t}/>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function FilterGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mb-5">
      <p className="text-[11px] font-bold uppercase tracking-widest text-ink/40 mb-2">{label}</p>
      {children}
    </div>
  );
}

function Chip({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full
      bg-teal/10 text-teal text-xs font-semibold">
      {label}
      <button onClick={onRemove} className="hover:text-omred ml-0.5">×</button>
    </span>
  );
}

