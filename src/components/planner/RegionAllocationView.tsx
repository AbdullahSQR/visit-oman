"use client";

import type { RegionPlan, Locale } from "@/lib/types";
import type { TranslationKeys } from "@/lib/i18n/translations";

interface Props { allocation: RegionPlan[]; t: TranslationKeys; locale: Locale }

const REGION_COLORS: Record<string, { bg: string }> = {
  muscat:    { bg:"#0E7490" },
  dakhiliya: { bg:"#C8873A" },
  sharqiya:  { bg:"#2D7A4F" },
  dhofar:    { bg:"#1A6A58" },
  batinah:   { bg:"#3A5A98" },
  dhahira:   { bg:"#A06820" },
};

export default function RegionAllocationView({ allocation, t }: Props) {
  const total = allocation.reduce((s, r) => s + r.daysAssigned, 0);

  return (
    <div className="card rounded-2xl p-5">
      <h3 className="font-display font-bold text-ink text-base mb-4">
        {t.itinerary.regionAllocation}
      </h3>

      {/* Visual segmented bar */}
      <div className="flex rounded-full overflow-hidden h-3 mb-4 gap-px">
        {allocation.map((r, idx) => {
          const cfg = REGION_COLORS[r.region] ?? { bg:"#888" };
          return (
            <div key={r.region}
              className="h-full grow-bar"
              style={{
                "--w": `${(r.daysAssigned/total)*100}%`,
                background: cfg.bg,
                animationDelay: `${idx * 100}ms`,
              } as React.CSSProperties}
              title={`${t.regions[r.region as keyof typeof t.regions]}: ${r.daysAssigned}d`}/>
          );
        })}
      </div>

      {/* Legend chips */}
      <div className="flex flex-wrap gap-2">
        {allocation.map((r) => {
          const cfg = REGION_COLORS[r.region] ?? { bg:"#888", text:"#fff" };
          return (
            <div key={r.region}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold"
              style={{ background:`${cfg.bg}18`, color: cfg.bg }}>
              <span className="w-2 h-2 rounded-full" style={{ background: cfg.bg }}/>
              {t.regions[r.region as keyof typeof t.regions]}
              <span className="opacity-60">
                · {t.itinerary.day} {r.startDay}{r.daysAssigned>1?`–${r.endDay}`:""}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
