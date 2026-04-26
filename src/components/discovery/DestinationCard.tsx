import Link from "next/link";
import Image from "next/image";
import type { Destination, Locale } from "@/lib/types";
import type { TranslationKeys } from "@/lib/i18n/translations";
import SaveInterestButton from "@/components/ui/SaveInterestButton";
const MONTH_ABR = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

interface Props {
  destination: Destination;
  locale: Locale;
  t: TranslationKeys;
}

const CROWD_DOTS = [1,2,3,4,5];

export default function DestinationCard({ destination: d, locale, t }: Props) {
  const isRtl = locale === "ar";
  const region = t.regions[d.region.en as keyof typeof t.regions];

  return (
    <article className="card flex flex-col rounded-2xl overflow-hidden group">

      {/* ── Photo header ──────────────────────────────────────────────── */}
      <div className="relative h-44 overflow-hidden bg-parch">

        {/* Actual photo */}
        {d.imageUrl ? (
          <Image
            src={d.imageUrl}
            alt={d.name.en}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-sand/40 to-sand/10 flex items-center justify-center">
            <span className="text-4xl opacity-30">📸</span>
          </div>
        )}

        {/* Subtle dark gradient at bottom for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"/>

        {/* Region pill */}
        <span className="absolute top-3 start-3 px-2.5 py-0.5 rounded-full
          bg-black/30 backdrop-blur-sm text-white text-xs font-semibold uppercase tracking-wider">
          {region}
        </span>

        {/* Save button */}
        <div className="absolute top-2.5 end-2.5">
          <SaveInterestButton destId={d.id} t={t} compact />
        </div>

        {/* Free entry badge */}
        {d.ticket_cost_omr === 0 && (
          <span className="absolute bottom-5 start-3 px-2 py-0.5 rounded-full
            bg-green-700/85 backdrop-blur-sm text-white text-[9px] font-bold
            uppercase tracking-wider z-10">
            {t.featured.free}
          </span>
        )}

        {/* Hover overlay — recommended months */}
        <div className="absolute inset-x-0 bottom-0 bg-black/65 backdrop-blur-sm px-3 py-2
          translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-10
          flex items-center gap-1.5 flex-wrap">
          <span className="text-[9px] text-white/55 font-semibold uppercase tracking-wider me-0.5">
            ✦
          </span>
          {d.recommended_months.slice(0, 5).map((m) => (
            <span key={m} className="text-[10px] text-white font-semibold px-1.5 py-0.5
              rounded bg-white/20">
              {MONTH_ABR[m - 1]}
            </span>
          ))}
        </div>

        {/* Bottom ink squiggle transition */}
        <svg className="absolute bottom-0 left-0 w-full" height="14" viewBox="0 0 400 14"
             preserveAspectRatio="none">
          <path d="M0,5 Q50,0 100,5 Q150,10 200,5 Q250,0 300,5 Q350,10 400,5 L400,14 L0,14 Z"
                fill="#FAF6F0"/>
        </svg>
      </div>

      {/* ── Body ──────────────────────────────────────────────────────── */}
      <div className="flex flex-col flex-1 p-4 pt-3">

        {/* Category tags */}
        <div className="flex flex-wrap gap-1.5 mb-2">
          {d.categories.map((cat) => (
            <span key={cat}
              className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5
                rounded-full bg-parch text-ink/50">
              {t.categories[cat as keyof typeof t.categories]}
            </span>
          ))}
        </div>

        {/* Name */}
        <Link href={`/${locale}/destinations/${d.id}`}>
          <h3 className="font-display font-bold text-ink text-base leading-tight mb-3
            group-hover:text-teal transition-colors line-clamp-2">
            {isRtl ? d.name.ar : d.name.en}
          </h3>
        </Link>

        {/* Stats row */}
        <div className="mt-auto grid grid-cols-3 gap-1 pt-3 border-t border-ink/8">
          <Stat label={t.featured.visitDuration}
            value={`${d.avg_visit_duration_minutes}`}
            unit={t.featured.minutes} />
          <Stat label={t.featured.ticketCost}
            value={d.ticket_cost_omr === 0 ? t.featured.free : `${d.ticket_cost_omr}`}
            unit={d.ticket_cost_omr === 0 ? "" : t.featured.omr} />
          <div>
            <p className="text-[10px] text-ink/40 uppercase tracking-wide mb-1">
              {t.featured.crowdLevel}
            </p>
            <div className="flex gap-0.5">
              {CROWD_DOTS.map((i) => (
                <div key={i} className={`h-2 w-3 rounded-sm ${
                  i <= d.crowd_level ? "crowd-bar-on" : "crowd-bar-off"
                }`}/>
              ))}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

function Stat({ label, value, unit }: { label: string; value: string; unit: string }) {
  return (
    <div>
      <p className="text-[10px] text-ink/40 uppercase tracking-wide mb-0.5">{label}</p>
      <p className="font-semibold text-ink text-sm leading-tight">
        {value}
        {unit && <span className="text-[10px] text-ink/45 ms-0.5">{unit}</span>}
      </p>
    </div>
  );
}
