import Link from "next/link";
import type { Locale } from "@/lib/types";
import type { TranslationKeys } from "@/lib/i18n/translations";
import OmanSkyline from "./OmanSkyline";

interface Props { t: TranslationKeys; locale: Locale }

export default function HeroSection({ t, locale }: Props) {
  return (
    <section className="relative overflow-hidden bg-cream flex flex-col" style={{ height: "calc(100vh - 56px)", minHeight: "540px" }}>

      {/* Halftone dot texture overlay */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(28,20,16,0.045) 1px, transparent 1px)",
          backgroundSize: "10px 10px",
        }} />

      {/* Warm radial glow behind the illustration */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[120%] h-[55%] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center bottom, rgba(200,135,58,0.16) 0%, rgba(250,246,240,0) 70%)"
        }} />

      {/* Content — compact so illustration is always in viewport */}
      <div className="relative flex-shrink-0 flex flex-col items-center justify-center px-4 text-center z-10"
        style={{ paddingTop: "clamp(20px, 3.5vh, 48px)", paddingBottom: "clamp(4px, 1vh, 12px)" }}>

        {/* Badge */}
        <span className="inline-flex items-center gap-2 px-4 py-1.5 mb-4 rounded-full
          border border-sand/40 bg-wash/70 text-sand font-hand font-semibold text-sm tracking-wide">
          ✦ {t.hero.badge} ✦
        </span>

        {/* Main headline */}
        <h1 className="font-display font-black text-ink leading-[1.05] mb-3"
          style={{ fontSize: "clamp(36px, 6vw, 82px)" }}>
          {locale === "ar" ? t.hero.title : (
            <>
              Discover the{" "}
              <span className="relative inline-block italic text-sand">
                Soul
                <svg className="absolute -bottom-2 left-0 w-full" height="10" viewBox="0 0 200 10" preserveAspectRatio="none">
                  <path d="M2,6 Q25,1 50,5 Q75,9 100,4 Q125,0 150,5 Q175,9 198,4"
                    stroke="#C8873A" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
                </svg>
              </span>{" "}
              of Arabia
            </>
          )}
        </h1>

        {/* Subheadline */}
        <p className="text-ink/60 max-w-xl mx-auto text-sm md:text-base leading-relaxed mb-5">
          {t.hero.subtitle}
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-4">
          <Link href={`/${locale}/plan`}
            className="btn-hand relative px-8 py-3 bg-omred text-white rounded-xl font-semibold text-sm shadow-btn hover:bg-omred/90 transition-all hover:-translate-y-0.5">
            {t.hero.cta}
          </Link>
          <Link href={`/${locale}/destinations`}
            className="px-8 py-3 bg-transparent border-2 border-ink/20 text-ink rounded-xl font-semibold text-sm hover:border-sand hover:text-sand transition-all">
            {t.hero.explore}
          </Link>
        </div>

        {/* Handwritten tagline */}
        <p className="font-hand text-sand/70 text-base">— plan smarter, wander deeper —</p>
      </div>

      {/* ── Illustrated skyline — fills all remaining viewport space ───── */}
      <div className="relative w-full flex-1 z-10 min-h-0 overflow-hidden" style={{ minHeight: "240px" }}>
        <OmanSkyline />
      </div>

    </section>
  );
}
