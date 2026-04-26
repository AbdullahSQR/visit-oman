import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import type { Locale } from "@/lib/types";
import { DESTINATIONS, getDestinationById } from "@/lib/data/destinations";
import { getT } from "@/lib/i18n/translations";
import SaveInterestButton from "@/components/ui/SaveInterestButton";
import DestinationMapPreview from "@/components/discovery/DestinationMapPreview";

interface Props { params: { locale: Locale; id: string } }

export function generateStaticParams() {
  return ["en","ar"].flatMap((locale) =>
    DESTINATIONS.map((d) => ({ locale, id: d.id }))
  );
}

export function generateMetadata({ params }: Props): Metadata {
  const dest = getDestinationById(params.id);
  if (!dest) return {};
  const isAr = params.locale === "ar";
  const name = isAr ? dest.name.ar : dest.name.en;
  const description = isAr
    ? (dest.description?.ar ?? `اكتشف ${name} في عُمان.`)
    : (dest.description?.en?.slice(0, 160) ?? `Discover ${name} in Oman.`);
  return {
    title: `${name} — Visit Oman`,
    description,
  };
}

export default function DestinationDetailPage({ params }: Props) {
  const dest = getDestinationById(params.id);
  if (!dest) notFound();

  const t      = getT(params.locale);
  const locale = params.locale;
  const isRtl  = locale === "ar";

  const regionLabel  = t.regions[dest.region.en as keyof typeof t.regions];
  const crowdBars    = [1,2,3,4,5];
  const currentMonth = new Date().getMonth() + 1; // 1–12

  return (
    <div className="max-w-4xl mx-auto px-5 py-10">

      {/* Breadcrumb */}
      <Link href={`/${locale}/destinations`}
        className="inline-flex items-center gap-1.5 text-sm text-ink/50 hover:text-teal
          transition-colors mb-8 font-medium">
        {isRtl ? "→" : "←"} {t.details.back}
      </Link>

      {/* Hero strip — real destination photo */}
      <div className="relative h-48 md:h-64 rounded-2xl overflow-hidden mb-8 bg-parch">

        {/* Photo or fallback gradient */}
        {dest.imageUrl ? (
          <Image
            src={dest.imageUrl}
            alt={isRtl ? dest.name.ar : dest.name.en}
            fill
            sizes="(max-width: 768px) 100vw, 896px"
            className="object-cover"
            priority
          />
        ) : (
          <div className="absolute inset-0"
            style={{
              background: `linear-gradient(145deg, ${getCatColors(dest.categories[0]).from} 0%,
                ${getCatColors(dest.categories[0]).to} 100%)`,
            }}>
            <div className="absolute inset-0" style={{
              backgroundImage: "radial-gradient(circle, rgba(0,0,0,0.07) 1px, transparent 1px)",
              backgroundSize: "9px 9px",
            }}/>
          </div>
        )}

        {/* Dark gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-transparent"/>

        {/* Ink squiggle band at bottom */}
        <svg className="absolute bottom-0 left-0 w-full" height="24"
          viewBox="0 0 1440 24" preserveAspectRatio="none">
          <path d="M0,10 Q120,0 240,10 Q360,20 480,10 Q600,0 720,10 Q840,20 960,10 Q1080,0
            1200,10 Q1320,20 1440,10 L1440,24 L0,24 Z" fill="#FAF6F0"/>
        </svg>

        {/* Region chip + save */}
        <div className="absolute top-4 start-4">
          <span className="px-3 py-1 rounded-full bg-black/30 backdrop-blur-sm text-white
            text-xs font-bold uppercase tracking-wider">
            {regionLabel}
          </span>
        </div>
        <div className="absolute top-4 end-4">
          <SaveInterestButton destId={dest.id} t={t}/>
        </div>

        {/* Destination name overlay */}
        <div className="absolute bottom-6 start-6">
          <h1 className="font-display font-black text-white text-2xl md:text-3xl drop-shadow-lg">
            {isRtl ? dest.name.ar : dest.name.en}
          </h1>
          <div className="flex flex-wrap gap-2 mt-2">
            {dest.categories.map((cat) => (
              <span key={cat} className="px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-sm
                text-white text-xs font-semibold">
                {t.categories[cat as keyof typeof t.categories]}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">

        {/* Map — 3/5 */}
        <div className="md:col-span-3 rounded-2xl overflow-hidden border border-ink/10"
          style={{ height: 300 }}>
          <DestinationMapPreview lat={dest.lat} lng={dest.lng}
            name={isRtl ? dest.name.ar : dest.name.en}/>
        </div>

        {/* Meta card — 2/5 */}
        <div className="md:col-span-2 card rounded-2xl p-5 space-y-4">
          <MetaRow label={t.details.visitDuration}
            value={`${dest.avg_visit_duration_minutes} ${t.featured.minutes}`}/>
          <MetaRow label={t.details.ticketCost}
            value={dest.ticket_cost_omr === 0
              ? t.details.free
              : `${dest.ticket_cost_omr} ${t.featured.omr}`}/>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-ink/40 mb-2">
              {t.details.crowdLevel}
            </p>
            <div className="flex gap-1.5">
              {crowdBars.map((i) => (
                <div key={i} className={`h-2.5 w-7 rounded-sm ${
                  i <= dest.crowd_level ? "bg-omred" : "bg-parch"
                }`}/>
              ))}
            </div>
          </div>
          <div className="pt-3 border-t border-ink/8">
            <p className="text-[10px] font-bold uppercase tracking-widest text-ink/40 mb-1">
              {t.details.managedBy}
            </p>
            <p className="text-sm text-ink/70 font-medium">
              {isRtl ? dest.company.ar : dest.company.en}
            </p>
          </div>
        </div>
      </div>

      {/* Description */}
      {dest.description && (
        <div className="card rounded-2xl p-6 mb-6">
          <p className="text-ink/70 leading-relaxed text-base">
            {isRtl ? dest.description.ar : dest.description.en}
          </p>
        </div>
      )}

      {/* Recommended months */}
      <div className="card rounded-2xl p-6">
        <h3 className="font-display font-bold text-ink text-lg mb-4">
          {t.details.recommendedMonths}
        </h3>
        <div className="flex flex-wrap gap-2">
          {Array.from({length:12},(_,i)=>i+1).map((m) => {
            const on      = dest.recommended_months.includes(m as never);
            const isCurrent = m === currentMonth;
            return (
              <span key={m} className={`px-3 py-1 rounded-full text-sm font-semibold transition-colors ${
                isCurrent ? "month-current" : on ? "month-on" : "month-off"
              }`}>
                {t.months[m as keyof typeof t.months]}
                {isCurrent && (
                  <span className="ms-1.5 text-[10px] font-bold opacity-80">Now</span>
                )}
              </span>
            );
          })}
        </div>
        {/* Handwritten note */}
        <p className="font-hand text-sand/70 text-sm mt-4">
          ✦ {t.details.monthsNote}
        </p>
      </div>

      {/* Where to Stay */}
      {dest.hotels && dest.hotels.length > 0 && (
        <div className="card rounded-2xl p-6 mt-6">
          <div className="flex items-center gap-3 mb-5">
            <span className="text-xl">🏨</span>
            <h3 className="font-display font-bold text-ink text-lg">{t.details.whereToStay}</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {dest.hotels.map((hotel) => (
              <HotelCard key={hotel.name} hotel={hotel}/>
            ))}
          </div>
          <p className="font-hand text-sand/70 text-sm mt-5">
            ✦ {t.details.hotelsNote}
          </p>
        </div>
      )}

    </div>
  );
}

function MetaRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[10px] font-bold uppercase tracking-widest text-ink/40 mb-0.5">{label}</p>
      <p className="font-semibold text-ink text-sm">{value}</p>
    </div>
  );
}

const TIER_COLORS: Record<string, { bg: string; text: string; border: string; label: string }> = {
  low:     { bg: "bg-teal/8",   text: "text-teal",   border: "border-teal/20",   label: "Budget" },
  medium:  { bg: "bg-sand/8",   text: "text-sand",   border: "border-sand/20",   label: "Mid-range" },
  luxury:  { bg: "bg-ink/5",    text: "text-ink/70", border: "border-ink/12",    label: "Luxury" },
};

function HotelCard({ hotel }: { hotel: { name: string; stars: number; pricePerNight: number; tier: string } }) {
  const c = TIER_COLORS[hotel.tier] ?? TIER_COLORS.medium;
  return (
    <div className={`rounded-xl border p-4 ${c.bg} ${c.border}`}>
      <div className="flex items-start justify-between gap-2 mb-2">
        <span className={`text-[10px] font-bold uppercase tracking-widest ${c.text}`}>
          {c.label}
        </span>
        <span className="text-amber-400 text-xs leading-none">
          {"★".repeat(hotel.stars)}
        </span>
      </div>
      <p className="font-semibold text-ink text-sm leading-snug mb-3">{hotel.name}</p>
      <div className="flex items-baseline gap-1">
        <span className="font-display font-black text-ink text-lg">{hotel.pricePerNight}</span>
        <span className="text-[10px] text-ink/45 font-medium">OMR / night</span>
      </div>
    </div>
  );
}

function getCatColors(cat: string) {
  const map: Record<string, { from: string; to: string }> = {
    mountain: { from:"#8EA8C8", to:"#4A7090" },
    beach:    { from:"#4AACCA", to:"#1A7A98" },
    culture:  { from:"#D8A050", to:"#A06820" },
    desert:   { from:"#E8B840", to:"#B07810" },
    nature:   { from:"#58B050", to:"#207830" },
    food:     { from:"#E07858", to:"#A84030" },
  };
  return map[cat] ?? map.culture;
}
