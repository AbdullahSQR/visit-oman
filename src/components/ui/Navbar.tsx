"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import type { Locale } from "@/lib/types";
import { useAppStore } from "@/lib/store/useAppStore";
import { getT } from "@/lib/i18n/translations";

interface Props { locale: Locale }

export default function Navbar({ locale }: Props) {
  const t = getT(locale);
  const pathname = usePathname();
  const router = useRouter();
  const savedIds = useAppStore((s) => s.savedIds);
  const setLocale = useAppStore((s) => s.setLocale);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleLocale = () => {
    const next: Locale = locale === "en" ? "ar" : "en";
    setLocale(next);
    router.push(pathname.replace(`/${locale}`, `/${next}`));
  };

  const links = [
    { href: `/${locale}`,              label: t.nav.discover      },
    { href: `/${locale}/destinations`, label: t.nav.destinations  },
    { href: `/${locale}/plan`,         label: t.nav.planTrip      },
  ];

  const norm = (p: string) => p.replace(/\/$/, "");
  const isActive = (href: string) =>
    norm(pathname) === norm(href) || (href !== `/${locale}` && norm(pathname).startsWith(norm(href)));

  return (
    <nav className="sticky top-0 z-50 bg-cream/90 backdrop-blur-md border-b border-ink/8 shadow-sm">
      <div className="max-w-7xl mx-auto px-5 py-3 flex items-center justify-between">

        {/* Logo */}
        <Link href={`/${locale}`} className="flex items-center gap-2.5 group" onClick={() => setMenuOpen(false)}>
          <span className="text-2xl">🇴🇲</span>
          <span className="font-display font-bold text-ink text-lg leading-none">
            Visit <span className="text-sand">Oman</span>
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-7">
          {links.map(({ href, label }) => (
            <Link key={href} href={href}
              className={`text-sm font-medium transition-colors relative pb-0.5 ${
                isActive(href)
                  ? "text-sand after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-sand after:rounded-full"
                  : "text-ink/70 hover:text-ink"
              }`}>
              {label}
            </Link>
          ))}
        </div>

        {/* Right */}
        <div className="flex items-center gap-3">
          {savedIds.length > 0 && (
            <Link href={`/${locale}/plan`}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-wash border border-sand/30 text-ink text-xs font-semibold hover:bg-sand/20 transition-colors">
              <span className="text-omred">♥</span>
              <span>{savedIds.length} saved</span>
            </Link>
          )}
          <button onClick={toggleLocale}
            className="hidden md:block px-3 py-1.5 rounded-full border border-ink/15 text-sm font-medium text-ink/70 hover:border-sand hover:text-sand transition-colors">
            {t.nav.language}
          </button>
          {/* Hamburger — mobile only */}
          <button onClick={() => setMenuOpen((o) => !o)}
            className="md:hidden flex flex-col gap-1.5 p-2 rounded-lg hover:bg-parch transition-colors"
            aria-label="Menu">
            <span className={`block h-0.5 w-5 bg-ink transition-transform duration-200 ${menuOpen ? "translate-y-2 rotate-45" : ""}`}/>
            <span className={`block h-0.5 w-5 bg-ink transition-opacity duration-200 ${menuOpen ? "opacity-0" : ""}`}/>
            <span className={`block h-0.5 w-5 bg-ink transition-transform duration-200 ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`}/>
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {menuOpen && (
        <div className="md:hidden border-t border-ink/8 bg-cream/95 backdrop-blur-md px-5 py-4 flex flex-col gap-1">
          {links.map(({ href, label }) => (
            <Link key={href} href={href} onClick={() => setMenuOpen(false)}
              className={`py-2.5 px-3 rounded-xl text-sm font-semibold transition-colors ${
                isActive(href)
                  ? "bg-sand/15 text-sand"
                  : "text-ink/70 hover:bg-parch"
              }`}>
              {label}
            </Link>
          ))}
          <div className="border-t border-ink/8 mt-2 pt-3 flex items-center justify-between">
            {savedIds.length > 0 && (
              <Link href={`/${locale}/plan`} onClick={() => setMenuOpen(false)}
                className="flex items-center gap-1.5 text-xs font-semibold text-ink">
                <span className="text-omred">♥</span> {savedIds.length} saved
              </Link>
            )}
            <button onClick={() => { toggleLocale(); setMenuOpen(false); }}
              className="ms-auto px-3 py-1.5 rounded-full border border-ink/15 text-sm font-medium text-ink/70 hover:border-sand hover:text-sand transition-colors">
              {t.nav.language}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
