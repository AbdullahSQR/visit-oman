import type { Locale } from "@/lib/types";
import Navbar from "@/components/ui/Navbar";

interface Props {
  children: React.ReactNode;
  params: { locale: Locale };
}

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "ar" }];
}

export default function LocaleLayout({ children, params }: Props) {
  const isRtl = params.locale === "ar";
  return (
    <div dir={isRtl ? "rtl" : "ltr"} lang={params.locale} className="min-h-screen bg-cream text-ink">
      <Navbar locale={params.locale} />
      <main>{children}</main>
      <footer className="bg-ink text-cream/70 py-8 px-4 text-center text-sm mt-16">
        <p className="font-hand text-base text-sand/80 mb-1">✦ Visit Oman ✦</p>
        <p className="text-xs opacity-50">
          {params.locale === "en"
            ? "© 2026 Visit Oman · Built for CODESTACKER 2026"
            : "© 2026 زيارة عُمان · مبني لـ CODESTACKER 2026"}
        </p>
      </footer>
    </div>
  );
}
