"use client";

import Link from "next/link";
import type { DayPlan, Locale } from "@/lib/types";
import type { TranslationKeys } from "@/lib/i18n/translations";

interface Props { dayPlan: DayPlan; t: TranslationKeys; locale: Locale }

// Colour per score component — consistent, distinct, on-brand
const REASON_COLORS: Record<string, string> = {
  interest:  "#0E7490", // teal
  season:    "#2D7A4F", // green
  crowd:     "#C8873A", // sand
  cost:      "#7C6A5A", // muted
  detour:    "#6A5ACD", // slate-purple
  diversity: "#C0392B", // red
};

export default function DayView({ dayPlan, t, locale }: Props) {
  const isRtl = locale === "ar";

  // Max weighted contribution across all stops' top reasons — used to normalise bars
  const allVals = dayPlan.stops.flatMap((s) => s.topReasons.map(([, v]) => v));
  const globalMax = Math.max(...allVals, 0.01);

  return (
    <div className="card rounded-2xl p-4 h-full flex flex-col">
      {/* Day header */}
      <div className="pb-3 mb-3 border-b border-ink/8">
        <p className="font-hand text-sand text-sm">
          {t.itinerary.day} {dayPlan.day}
        </p>
        <h3 className="font-display font-bold text-ink text-lg leading-tight">
          {t.regions[dayPlan.region as keyof typeof t.regions]}
        </h3>
        <p className="text-xs text-ink/45 mt-0.5">
          {dayPlan.stops.length} {t.itinerary.stops} · {dayPlan.totalKm} {t.itinerary.km}
        </p>
      </div>

      {/* Timeline */}
      <div className="overflow-y-auto flex-1 space-y-1 pe-1">
        {dayPlan.stops.map((stop, idx) => (
          <div key={stop.destination.id}>
            {/* Drive segment connector */}
            {stop.travelMinutesFromPrev > 0 && (
              <div className="flex items-center gap-2 py-1.5 ms-5">
                <div className="w-0.5 h-4 bg-ink/15 mx-auto rounded-full"/>
                <span className="text-[10px] text-ink/40 font-medium whitespace-nowrap">
                  🚗 {stop.travelKmFromPrev} km · {stop.travelMinutesFromPrev} min
                </span>
                <div className="flex-1 border-t border-dashed border-ink/15"/>
              </div>
            )}

            {/* Stop card */}
            <div className="p-3 rounded-xl hover:bg-parch transition-colors border border-transparent hover:border-ink/8">
              {/* Row: bubble + name + time */}
              <div className="flex gap-3">
                <div className="w-7 h-7 rounded-full bg-teal text-white text-xs font-bold
                  flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                  {idx + 1}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <Link href={`/${locale}/destinations/${stop.destination.id}`}
                      className="font-semibold text-sm text-ink hover:text-teal transition-colors
                        leading-tight truncate">
                      {isRtl ? stop.destination.name.ar : stop.destination.name.en}
                    </Link>
                    <span className="text-[10px] text-ink/40 whitespace-nowrap shrink-0 font-medium">
                      {stop.arrivalTime}–{stop.departureTime}
                    </span>
                  </div>

                  {/* Category tags */}
                  <div className="flex flex-wrap gap-1 mt-1">
                    {stop.destination.categories.map((cat) => (
                      <span key={cat} className="text-[9px] px-1.5 py-0.5 rounded-full
                        bg-parch text-ink/45 font-semibold uppercase tracking-wide">
                        {t.categories[cat as keyof typeof t.categories]}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* ── Why Selected panel ──────────────────────────────────── */}
              {stop.topReasons.length > 0 && (
                <div className="mt-2.5 ms-10 rounded-lg bg-ink/[0.03] border border-ink/6 px-3 py-2">
                  <p className="text-[9px] font-bold uppercase tracking-widest text-ink/35 mb-2">
                    {t.itinerary.whySelected}
                  </p>
                  <div className="space-y-1.5">
                    {stop.topReasons.map(([key, val], idx) => {
                      const label = t.itinerary.scoreComponents[
                        key as keyof typeof t.itinerary.scoreComponents
                      ];
                      const color = REASON_COLORS[key] ?? "#888";
                      const pct = Math.round((val / globalMax) * 100);
                      const display = `${Math.round(val * 100)}%`;
                      return (
                        <div key={key}>
                          <div className="flex items-center justify-between mb-0.5">
                            <span className="text-[10px] font-semibold text-ink/60">{label}</span>
                            <span className="text-[10px] font-bold tabular-nums"
                              style={{ color }}>{display}</span>
                          </div>
                          <div className="h-1.5 bg-ink/8 rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full grow-bar"
                              style={{
                                "--w": `${pct}%`,
                                background: color,
                                animationDelay: `${idx * 80}ms`,
                              } as React.CSSProperties}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
