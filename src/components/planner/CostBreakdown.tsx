"use client";

import type { GeneratedItinerary, Locale, Hotel } from "@/lib/types";
import type { TranslationKeys } from "@/lib/i18n/translations";

interface Props { itinerary: GeneratedItinerary; t: TranslationKeys; locale: Locale }

const ROW_COLORS = ["#0E7490","#C8873A","#2D7A4F","#C0392B"];
const TIER_STAR: Record<string, string> = { low: "★★", medium: "★★★", luxury: "★★★★★" };
const TIER_LABEL: Record<string, string> = { low: "Budget", medium: "Mid-range", luxury: "Luxury" };

export default function CostBreakdown({ itinerary, t }: Props) {
  const breakdown = itinerary.costBreakdown;
  const budget    = itinerary.input.budget;

  const omr = (n: number) => `${n.toFixed(2)} OMR`;

  const rows = [
    { label: t.itinerary.fuel,    value: breakdown.fuelOmr,    icon: "⛽" },
    { label: t.itinerary.tickets, value: breakdown.ticketsOmr, icon: "🎟️" },
    { label: t.itinerary.food,    value: breakdown.foodOmr,    icon: "🍽️" },
    { label: t.itinerary.hotel,   value: breakdown.hotelOmr,   icon: "🏨" },
  ];

  const maxVal = Math.max(...rows.map((r) => r.value), 0.01);

  // ── Collect hotel recommendations from visited destinations ──────────────
  const seenRegions = new Set<string>();
  const hotelPicks: (Hotel & { region: string })[] = [];

  for (const day of itinerary.days) {
    for (const stop of day.stops) {
      const regionKey = stop.destination.region.en;
      if (seenRegions.has(regionKey)) continue;
      seenRegions.add(regionKey);
      const match = stop.destination.hotels?.find((h) => h.tier === budget);
      if (match) {
        hotelPicks.push({ ...match, region: stop.destination.region.en });
      }
    }
  }

  return (
    <div className="card rounded-2xl p-6">
      <div className="flex items-center gap-3 mb-5 pb-4 border-b border-ink/8">
        <span className="text-xl">💰</span>
        <h3 className="font-display font-bold text-ink text-lg">{t.itinerary.costBreakdown}</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-4">
        {rows.map(({ label, value, icon }, i) => (
          <div key={label} className="flex items-center gap-3">
            <span className="text-lg w-7 text-center">{icon}</span>
            <div className="flex-1">
              <div className="flex justify-between text-xs mb-1">
                <span className="text-ink/55 font-medium">{label}</span>
                <span className="font-semibold text-ink">{omr(value)}</span>
              </div>
              <div className="h-1.5 bg-parch rounded-full overflow-hidden">
                <div className="h-full rounded-full grow-bar"
                  style={{
                    "--w": `${(value / maxVal) * 100}%`,
                    background: ROW_COLORS[i],
                    animationDelay: `${i * 80 + 400}ms`,
                  } as React.CSSProperties}/>
              </div>
              {/* Fuel sub-note */}
              {i === 0 && (
                <p className="text-[10px] text-ink/35 mt-1 font-medium">
                  {breakdown.totalKm} km · 12 km/l · 0.22 OMR/l — private car
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Hotel recommendations */}
      {hotelPicks.length > 0 && (
        <div className="mt-5 pt-4 border-t border-ink/8">
          <p className="text-[10px] font-bold uppercase tracking-widest text-ink/40 mb-3">
            {TIER_LABEL[budget]} Accommodation · per region
          </p>
          <div className="space-y-2">
            {hotelPicks.map((h) => (
              <div key={h.region}
                className="flex items-center justify-between bg-parch rounded-xl px-4 py-2.5">
                <div className="flex items-center gap-2.5">
                  <span className="text-sm">🏨</span>
                  <div>
                    <p className="text-xs font-semibold text-ink leading-tight">{h.name}</p>
                    <p className="text-[10px] text-ink/45 mt-0.5">
                      {TIER_STAR[h.tier]} · {h.region.charAt(0).toUpperCase() + h.region.slice(1)}
                    </p>
                  </div>
                </div>
                <div className="text-end">
                  <p className="font-bold text-sm text-ink">{h.pricePerNight} OMR</p>
                  <p className="text-[10px] text-ink/40">/ night</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Total + distance */}
      <div className="mt-6 pt-5 border-t border-ink/8 flex items-end justify-between gap-4">
        <div>
          <p className="text-xs text-ink/40 uppercase tracking-wider mb-1">
            {t.itinerary.totalKm}
          </p>
          <p className="font-semibold text-ink">{breakdown.totalKm} km</p>
        </div>
        <div className="text-end">
          <p className="text-xs text-ink/40 uppercase tracking-wider mb-1">
            {t.itinerary.total}
          </p>
          <p className="font-display font-black text-ink text-3xl">
            {omr(breakdown.totalOmr)}
          </p>
        </div>
      </div>

      {/* Budget pill */}
      <div className={`mt-4 px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 ${
        breakdown.budgetFeasible
          ? "bg-omgreen/10 text-omgreen border border-omgreen/20"
          : "bg-sand/10 text-sand border border-sand/20"
      }`}>
        <span className="text-sm">{breakdown.budgetFeasible ? "✓" : "⚠"}</span>
        {breakdown.budgetFeasible
          ? `${t.itinerary.budgetOk} — threshold ${omr(breakdown.budgetThreshold)}`
          : `${t.itinerary.budgetWarning} — threshold ${omr(breakdown.budgetThreshold)}`}
      </div>

      {/* Car travel disclaimer */}
      <p className="mt-4 text-[10px] text-ink/35 leading-relaxed border-t border-ink/6 pt-4">
        🚗 Fuel cost assumes travel by <strong className="text-ink/50">private car</strong>.
        Taxis, domestic flights, or public transport are not included in this estimate.
      </p>
    </div>
  );
}
