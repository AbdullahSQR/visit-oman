import Link from "next/link";
import type { Locale, Category } from "@/lib/types";
import type { TranslationKeys } from "@/lib/i18n/translations";

interface Props {
  t: TranslationKeys;
  locale: Locale;
  categoryStats: Record<Category, number>;
}

/* Per-category: gradient, ink SVG scene, and label color */
const CAT_CONFIG: Record<Category, {
  from: string; to: string; text: string; svg: JSX.Element;
}> = {
  mountain: {
    from: "#8EA8C8", to: "#4A7090", text: "#1A3A50",
    svg: (
      <svg viewBox="0 0 80 50" className="w-full h-full" fill="none"
           stroke="rgba(255,255,255,0.85)" strokeWidth="1.8"
           strokeLinecap="round" strokeLinejoin="round">
        <polyline points="0,48 22,15 36,28 52,5 68,18 80,10"/>
        <polyline points="0,48 80,48" strokeWidth="1" opacity="0.4"/>
        <path d="M 52,5 L 56,8 M 52,5 L 48,8" strokeWidth="1.2" opacity="0.6"/>
        <circle cx="68" cy="8" r="5" stroke="rgba(255,255,210,0.7)" fill="rgba(255,255,180,0.15)" strokeWidth="1.2"/>
      </svg>
    ),
  },
  beach: {
    from: "#4AACCA", to: "#1A7A98", text: "#0A3A50",
    svg: (
      <svg viewBox="0 0 80 50" className="w-full h-full" fill="none"
           stroke="rgba(255,255,255,0.85)" strokeWidth="1.8"
           strokeLinecap="round" strokeLinejoin="round">
        <circle cx="65" cy="12" r="8" stroke="rgba(255,255,180,0.8)" fill="rgba(255,255,160,0.15)" strokeWidth="1.5"/>
        <path d="M 65,1 L 65,0 M 65,24 L 65,25 M 54,12 L 53,12 M 76,12 L 77,12 M 57,4 L 56,3 M 73,20 L 74,21"/>
        <path d="M 0,33 Q 20,26 40,33 Q 60,40 80,33"/>
        <path d="M 0,41 Q 20,34 40,41 Q 60,48 80,41"/>
        <path d="M 15,30 Q 18,20 22,30" strokeWidth="1.2" opacity="0.5"/>
      </svg>
    ),
  },
  culture: {
    from: "#D8A050", to: "#A06820", text: "#4A2800",
    svg: (
      <svg viewBox="0 0 80 50" className="w-full h-full" fill="none"
           stroke="rgba(255,255,255,0.9)" strokeWidth="1.8"
           strokeLinecap="round" strokeLinejoin="round">
        {/* Minarets */}
        <path d="M 10,48 L 10,20 L 13,14 L 16,20 L 16,48"/>
        <path d="M 64,48 L 64,20 L 67,14 L 70,20 L 70,48"/>
        {/* Dome */}
        <path d="M 25,30 Q 28,15 40,11 Q 52,15 55,30 Z"/>
        <rect x="25" y="30" width="30" height="18"/>
        {/* Finial */}
        <path d="M 37,11 L 40,5 L 43,11"/>
        {/* Arch */}
        <path d="M 33,48 L 33,38 Q 40,30 47,38 L 47,48"/>
      </svg>
    ),
  },
  desert: {
    from: "#E8B840", to: "#B07810", text: "#4A2A00",
    svg: (
      <svg viewBox="0 0 80 50" className="w-full h-full" fill="none"
           stroke="rgba(255,255,255,0.85)" strokeWidth="1.8"
           strokeLinecap="round" strokeLinejoin="round">
        {/* Dunes */}
        <path d="M 0,48 Q 22,24 44,48 Q 58,28 80,48"/>
        {/* Shadow edge */}
        <path d="M 44,48 Q 36,36 28,40" strokeWidth="1.2" opacity="0.5"/>
        {/* Sun */}
        <circle cx="68" cy="13" r="7" stroke="rgba(255,255,200,0.8)" fill="rgba(255,255,160,0.15)" strokeWidth="1.4"/>
        {/* Camel silhouette */}
        <ellipse cx="20" cy="37" rx="8" ry="4" strokeWidth="1.4"/>
        <path d="M 20,37 Q 21,31 24,30" strokeWidth="1.4"/>
        <line x1="15" y1="41" x2="14" y2="46" strokeWidth="1.4"/>
        <line x1="21" y1="41" x2="20" y2="46" strokeWidth="1.4"/>
        <line x1="25" y1="41" x2="24" y2="46" strokeWidth="1.4"/>
      </svg>
    ),
  },
  nature: {
    from: "#58B050", to: "#207830", text: "#0A3A10",
    svg: (
      <svg viewBox="0 0 80 50" className="w-full h-full" fill="none"
           stroke="rgba(255,255,255,0.88)" strokeWidth="1.8"
           strokeLinecap="round" strokeLinejoin="round">
        {/* Tree trunk */}
        <line x1="40" y1="48" x2="40" y2="28"/>
        {/* Canopy */}
        <circle cx="40" cy="21" r="12" fill="rgba(255,255,255,0.12)"/>
        <circle cx="32" cy="26" r="8"  fill="rgba(255,255,255,0.08)"/>
        <circle cx="48" cy="26" r="8"  fill="rgba(255,255,255,0.08)"/>
        {/* Pool */}
        <path d="M 10,44 Q 25,40 40,44 Q 55,48 68,44" strokeWidth="1.4" opacity="0.7"/>
        {/* Waterfall */}
        <path d="M 60,28 Q 61,36 59,44" strokeWidth="1.5" opacity="0.65"/>
        {/* Birds */}
        <path d="M 12,15 Q 15,11 18,15 M 22,10 Q 25,6 28,10" strokeWidth="1.2" opacity="0.6"/>
      </svg>
    ),
  },
  food: {
    from: "#E07858", to: "#A84030", text: "#4A0A00",
    svg: (
      <svg viewBox="0 0 80 50" className="w-full h-full" fill="none"
           stroke="rgba(255,255,255,0.88)" strokeWidth="1.8"
           strokeLinecap="round" strokeLinejoin="round">
        {/* Bowl */}
        <path d="M 18,30 Q 40,48 62,30"/>
        <path d="M 16,28 A 24,8 0 0 1 64,28"/>
        {/* Steam */}
        <path d="M 28,24 Q 31,17 28,11" strokeWidth="1.4"/>
        <path d="M 40,22 Q 43,15 40,9"  strokeWidth="1.4"/>
        <path d="M 52,24 Q 55,17 52,11" strokeWidth="1.4"/>
        {/* Frankincense tree */}
        <path d="M 70,48 Q 72,40 74,36"/>
        <circle cx="74" cy="34" r="4" fill="rgba(255,255,255,0.15)"/>
        {/* Small dots = resin */}
        <circle cx="71" cy="37" r="1.2" fill="rgba(255,255,255,0.7)"/>
        <circle cx="74" cy="40" r="1"   fill="rgba(255,255,255,0.7)"/>
      </svg>
    ),
  },
};

const CATS: Category[] = ["mountain", "beach", "culture", "desert", "nature", "food"];

export default function CategoryGrid({ t, locale, categoryStats }: Props) {
  return (
    <section className="max-w-7xl mx-auto px-5 py-16">
      {/* Section header */}
      <div className="text-center mb-10">
        <p className="font-hand text-sand text-lg mb-1">— browse by experience —</p>
        <h2 className="font-display font-bold text-ink text-3xl md:text-4xl">
          {t.categories.title}
        </h2>
        <p className="text-ink/55 mt-2 text-base">{t.categories.subtitle}</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {CATS.map((cat) => {
          const cfg = CAT_CONFIG[cat];
          const count = categoryStats[cat] ?? 0;
          return (
            <Link key={cat} href={`/${locale}/destinations?category=${cat}`}
              className="group relative rounded-2xl overflow-hidden cursor-pointer
                         shadow-card hover:shadow-card-hover transition-all duration-200
                         hover:-translate-y-1">

              {/* Gradient canvas */}
              <div className="h-32 relative"
                style={{ background: `linear-gradient(145deg, ${cfg.from} 0%, ${cfg.to} 100%)` }}>
                {/* Halftone dots on canvas */}
                <div className="absolute inset-0 opacity-100"
                  style={{
                    backgroundImage: "radial-gradient(circle, rgba(0,0,0,0.08) 1px, transparent 1px)",
                    backgroundSize: "9px 9px",
                  }}/>
                {/* SVG scene */}
                <div className="absolute inset-0 p-3">{cfg.svg}</div>
                {/* Bottom fade */}
                <div className="absolute bottom-0 left-0 right-0 h-8"
                  style={{ background: `linear-gradient(to top, ${cfg.to}CC, transparent)` }}/>
              </div>

              {/* Label */}
              <div className="bg-cream px-3 py-2.5 text-center">
                <p className="font-display font-bold text-sm" style={{ color: cfg.text }}>
                  {t.categories[cat as keyof typeof t.categories]}
                </p>
                <p className="font-hand text-xs text-ink/45 mt-0.5">{count} {t.categories.placesCount}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
