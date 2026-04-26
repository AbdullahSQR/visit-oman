import Link from "next/link";
import type { Destination, Locale } from "@/lib/types";
import type { TranslationKeys } from "@/lib/i18n/translations";
import DestinationCard from "./DestinationCard";

interface Props {
  t: TranslationKeys;
  locale: Locale;
  destinations: Destination[];
}

export default function FeaturedDestinations({ t, locale, destinations }: Props) {
  return (
    <section className="bg-parch py-18 md:py-20">
      <div className="max-w-7xl mx-auto px-5">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
          <div>
            <p className="font-hand text-sand text-lg mb-1">— top picks —</p>
            <h2 className="font-display font-bold text-ink text-3xl md:text-4xl leading-tight">
              {t.featured.title}
            </h2>
            <p className="text-ink/50 mt-2 text-sm">{t.featured.subtitle}</p>
          </div>
          <Link href={`/${locale}/destinations`}
            className="self-start md:self-auto flex items-center gap-2 text-sm font-semibold
              text-teal border border-teal/30 rounded-full px-4 py-2
              hover:bg-teal hover:text-white transition-all">
            {t.featured.viewAll}
            <span className="text-base">→</span>
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {destinations.map((dest) => (
            <DestinationCard key={dest.id} destination={dest} locale={locale} t={t} />
          ))}
        </div>

        {/* Bottom CTA banner */}
        <div className="mt-12 rounded-2xl overflow-hidden relative"
          style={{ background: "linear-gradient(135deg, #1C1410 0%, #3D2B1F 100%)" }}>
          {/* Dot texture */}
          <div className="absolute inset-0"
            style={{
              backgroundImage: "radial-gradient(circle, rgba(200,135,58,0.12) 1px, transparent 1px)",
              backgroundSize: "12px 12px",
            }}/>
          <div className="relative px-8 py-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <p className="font-hand text-sand text-lg">ready to explore?</p>
              <h3 className="font-display font-bold text-white text-2xl mt-1">
                Turn interest into a real itinerary
              </h3>
              <p className="text-white/50 text-sm mt-1">
                Our algorithm plans your perfect Oman trip — distances, seasons, budget, all sorted.
              </p>
            </div>
            <Link href={`/${locale}/plan`}
              className="btn-hand flex-shrink-0 px-7 py-3.5 bg-omred text-white rounded-xl
                font-semibold shadow-btn hover:bg-omred/90 transition-all hover:-translate-y-0.5 whitespace-nowrap">
              {t.hero.cta}
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
