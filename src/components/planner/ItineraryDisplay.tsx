"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import type { GeneratedItinerary, Locale } from "@/lib/types";
import type { TranslationKeys } from "@/lib/i18n/translations";
import DayView from "./DayView";
import CostBreakdown from "./CostBreakdown";
import RegionAllocationView from "./RegionAllocationView";
import MapErrorBoundary from "../map/MapErrorBoundary";

const RouteMap = dynamic(() => import("../map/RouteMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-parch animate-pulse rounded-xl flex items-center
      justify-center text-ink/30 text-sm font-hand text-lg">
      Loading map…
    </div>
  ),
});

interface Props {
  itinerary: GeneratedItinerary;
  t: TranslationKeys;
  locale: Locale;
  onClear: () => void;
}

const REGION_COLORS: Record<string, string> = {
  muscat:    "#0E7490",
  dakhiliya: "#C8873A",
  sharqiya:  "#2D7A4F",
  dhofar:    "#1A6A58",
  batinah:   "#3A5A98",
  dhahira:   "#A06820",
};

export default function ItineraryDisplay({ itinerary, t, locale, onClear }: Props) {
  const [activeDay, setActiveDay] = useState(1);
  const isRtl = locale === "ar";
  const activeDayPlan = itinerary.days.find((d) => d.day === activeDay) ?? itinerary.days[0];

  return (
    <div className="mt-8 space-y-6">

      {/* Header bar */}
      <div className="fade-up flex items-center justify-between" style={{ animationDelay: "0ms" }}>
        <div>
          <p className="font-hand text-sand text-base">— your journey —</p>
          <h2 className="font-display font-bold text-ink text-2xl">
            {itinerary.input.days}-Day Oman Itinerary
          </h2>
        </div>
        <button onClick={onClear}
          className="text-xs text-ink/40 hover:text-omred transition-colors font-medium border
            border-ink/12 rounded-full px-3 py-1.5 hover:border-omred">
          {t.itinerary.clearPlan}
        </button>
      </div>

      {/* Region allocation */}
      <div className="fade-up" style={{ animationDelay: "90ms" }}>
        <RegionAllocationView allocation={itinerary.regionAllocation} t={t} locale={locale}/>
      </div>

      {/* Day tabs — coloured by region to match the allocation bar above */}
      <div className="fade-up flex gap-2 overflow-x-auto pb-1" style={{ animationDelay: "180ms" }}>
        {itinerary.days.map((day) => {
          const regionColor = REGION_COLORS[day.region] ?? "#888";
          const isActive = activeDay === day.day;
          return (
            <button key={day.day} onClick={() => setActiveDay(day.day)}
              className="flex-shrink-0 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all"
              style={isActive
                ? { background: regionColor, color: "#fff", boxShadow: "0 1px 4px rgba(0,0,0,0.18)" }
                : { background: `${regionColor}12`, color: regionColor, border: `1px solid ${regionColor}30` }
              }>
              <span className="font-hand text-base me-1">
                {isActive ? "✦" : `${day.day}.`}
              </span>
              {t.itinerary.day} {day.day}
              <span className="ms-1.5 text-xs opacity-60">
                ({t.regions[day.region as keyof typeof t.regions]})
              </span>
            </button>
          );
        })}
      </div>

      {/* Map + Schedule side-by-side */}
      <div className="fade-up grid grid-cols-1 lg:grid-cols-5 gap-5" style={{ animationDelay: "270ms" }}>
        {/* Map — 3/5 */}
        <div className="lg:col-span-3 rounded-2xl overflow-hidden border border-ink/10"
          style={{ height: 440 }}>
          <MapErrorBoundary>
            <RouteMap days={itinerary.days} activeDay={activeDay} onDayChange={setActiveDay} t={t} locale={locale}/>
          </MapErrorBoundary>
        </div>
        {/* Schedule — 2/5 */}
        {activeDayPlan && (
          <div className="lg:col-span-2" aria-live="polite" aria-atomic="true">
            <DayView dayPlan={activeDayPlan} t={t} locale={locale}/>
          </div>
        )}
      </div>

      {/* Cost breakdown */}
      <div className="fade-up" style={{ animationDelay: "370ms" }}>
        <CostBreakdown itinerary={itinerary} t={t} locale={locale}/>
      </div>
    </div>
  );
}
