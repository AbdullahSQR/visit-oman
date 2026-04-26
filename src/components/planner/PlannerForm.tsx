"use client";

import { useEffect, useState } from "react";
import type { Locale, PlannerInput, BudgetTier, TravelIntensity, Category, Month } from "@/lib/types";
import type { TranslationKeys } from "@/lib/i18n/translations";
import { useAppStore } from "@/lib/store/useAppStore";
import { DESTINATIONS } from "@/lib/data/destinations";

const CATEGORIES: Category[] = ["mountain","beach","culture","desert","nature","food"];

/**
 * Returns the current calendar month as the planner default, unless it's
 * Jun/Jul/Aug — peak summer heat across most of Oman — in which case we
 * suggest October (the start of the ideal travel window) instead.
 */
function smartDefaultMonth(): Month {
  const m = new Date().getMonth() + 1; // 1–12
  return (m >= 6 && m <= 8 ? 10 : m) as Month;
}
const CAT_ICONS: Record<Category, string> = {
  mountain:"⛰️", beach:"🏖️", culture:"🏛️", desert:"🏜️", nature:"🌿", food:"🍽️",
};

const INTENSITY_ICONS: Record<TravelIntensity, string> = {
  relaxed:"🌙", balanced:"☀️", packed:"⚡",
};

interface Props {
  t: TranslationKeys;
  locale: Locale;
  onGenerate: (input: PlannerInput) => void;
  isGenerating: boolean;
  hasItinerary: boolean;
}

export default function PlannerForm({ t, locale, onGenerate, isGenerating, hasItinerary }: Props) {
  const { savedIds, plannerInput, setPlannerInput } = useAppStore();

  const savedCats = Array.from(new Set(
    DESTINATIONS.filter((d) => savedIds.includes(d.id)).flatMap((d) => d.categories)
  )) as Category[];

  const [days,       setDays]       = useState<number>(plannerInput?.days ?? 3);
  const [budget,     setBudget]     = useState<BudgetTier>(plannerInput?.budget ?? "medium");
  const [month,      setMonth]      = useState<Month>(plannerInput?.month ?? smartDefaultMonth());
  const [intensity,  setIntensity]  = useState<TravelIntensity>(plannerInput?.intensity ?? "balanced");
  const [categories, setCategories] = useState<Category[]>(plannerInput?.preferredCategories ?? savedCats);
  const [showCatHint, setShowCatHint] = useState(false);

  useEffect(() => {
    if (savedCats.length > 0 && categories.length === 0) setCategories(savedCats);
  }, [savedIds, categories.length]); // savedCats is derived from savedIds (stable dep)

  const toggleCat = (cat: Category) =>
    setCategories((p) => p.includes(cat) ? p.filter((c) => c !== cat) : [...p, cat]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (categories.length === 0) {
      setShowCatHint(true);
      // Still allow submission — algorithm handles empty preferences gracefully
    } else {
      setShowCatHint(false);
    }
    const input: PlannerInput = { days, budget, month, intensity, preferredCategories: categories };
    setPlannerInput(input);
    onGenerate(input);
  };

  return (
    <form onSubmit={handleSubmit} className="card rounded-2xl p-6">

      {/* Form title */}
      <div className="flex items-center gap-3 mb-6 pb-5 border-b border-ink/8">
        <span className="text-2xl">🧭</span>
        <div>
          <h2 className="font-display font-bold text-ink text-xl">{t.planner.title}</h2>
          <p className="text-ink/50 text-sm mt-0.5">{t.planner.subtitle}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Days */}
        <div>
          <label htmlFor="planner-days" className="block text-xs font-bold uppercase tracking-widest text-ink/50 mb-3">
            {t.planner.days}
          </label>
          <div className="flex items-center gap-4">
            <span className="font-display font-black text-5xl text-sand w-12 text-center leading-none" aria-hidden="true">
              {days}
            </span>
            <div className="flex-1">
              <input id="planner-days" type="range" min={1} max={7} step={1} value={days}
                aria-valuetext={`${days} day${days !== 1 ? "s" : ""}`}
                onChange={(e) => setDays(Number(e.target.value))}
                className="w-full h-2 rounded-full appearance-none cursor-pointer"
                style={{ accentColor: "#C8873A" }}/>
              <div className="flex justify-between text-xs text-ink/35 mt-1.5 px-0.5">
                {[1,2,3,4,5,6,7].map((n)=>(
                  <span key={n} className={n===days ? "font-bold text-sand" : ""}>{n}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Month */}
        <div>
          <label htmlFor="planner-month" className="block text-xs font-bold uppercase tracking-widest text-ink/50 mb-3">
            {t.planner.month}
          </label>
          <select id="planner-month" value={month} onChange={(e) => setMonth(Number(e.target.value) as Month)}
            className="w-full bg-parch border border-ink/12 rounded-xl px-4 py-2.5 text-sm
              text-ink focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal
              cursor-pointer">
            {Array.from({length:12},(_,i)=>i+1).map((m)=>(
              <option key={m} value={m}>{t.months[m as keyof typeof t.months]}</option>
            ))}
          </select>
        </div>

        {/* Budget */}
        <div role="group" aria-labelledby="budget-label">
          <p id="budget-label" className="block text-xs font-bold uppercase tracking-widest text-ink/50 mb-3">
            {t.planner.budget}
          </p>
          <div className="flex gap-2">
            {(["low","medium","luxury"] as BudgetTier[]).map((b) => (
              <button key={b} type="button" onClick={() => setBudget(b)}
                aria-pressed={budget === b}
                className={`flex-1 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wide
                  transition-all duration-150 ${budget===b
                    ? "bg-teal text-white shadow-sm scale-105"
                    : "bg-parch text-ink/55 hover:bg-teal/10 hover:text-teal border border-ink/10"
                  }`}>
                {t.planner.budgets[b]}
              </button>
            ))}
          </div>
        </div>

        {/* Intensity */}
        <div role="group" aria-labelledby="intensity-label">
          <p id="intensity-label" className="block text-xs font-bold uppercase tracking-widest text-ink/50 mb-3">
            {t.planner.intensity}
          </p>
          <div className="flex gap-2">
            {(["relaxed","balanced","packed"] as TravelIntensity[]).map((i) => (
              <button key={i} type="button" onClick={() => setIntensity(i)}
                aria-pressed={intensity === i}
                className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all duration-150
                  flex flex-col items-center gap-0.5 ${intensity===i
                    ? "bg-ink text-white scale-105"
                    : "bg-parch text-ink/55 hover:bg-ink/10 border border-ink/10"
                  }`}>
                <span>{INTENSITY_ICONS[i]}</span>
                <span>{t.planner.intensities[i].split(" ")[0]}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Categories */}
        <div className="md:col-span-2">
          <label className={`block text-xs font-bold uppercase tracking-widest mb-3 transition-colors ${
            showCatHint && categories.length === 0 ? "text-sand" : "text-ink/50"
          }`}>
            {t.planner.categories}
            {savedCats.length > 0 && (
              <span className="normal-case font-normal ms-2 text-sand">
                ({t.planner.savedInterests})
              </span>
            )}
          </label>
          <div className={`flex flex-wrap gap-2 rounded-xl transition-all ${
            showCatHint && categories.length === 0 ? "ring-1 ring-sand/40 p-2 -m-2" : ""
          }`}>
            {CATEGORIES.map((cat) => (
              <button key={cat} type="button" onClick={() => { toggleCat(cat); setShowCatHint(false); }}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full text-sm font-semibold
                  transition-all ${categories.includes(cat)
                    ? "bg-sand text-white shadow-sm"
                    : "bg-parch text-ink/55 border border-ink/12 hover:border-sand hover:text-sand"
                  }`}>
                <span>{CAT_ICONS[cat]}</span>
                {t.categories[cat as keyof typeof t.categories]}
              </button>
            ))}
          </div>
          {showCatHint && categories.length === 0 && (
            <p className="text-xs text-sand mt-2 font-medium">
              ✦ No interests selected — your itinerary will be based on season and crowd levels only.
            </p>
          )}
        </div>

        {/* Submit */}
        <div className="md:col-span-2">
          <button type="submit" disabled={isGenerating}
            className="btn-hand w-full py-4 bg-omred text-white rounded-xl font-bold text-sm
              uppercase tracking-widest shadow-btn hover:bg-omred/90 disabled:opacity-60
              transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2">
            {isGenerating
              ? <><span className="animate-spin">⟳</span> {t.planner.loading}</>
              : <>{hasItinerary ? t.planner.regenerate : t.planner.generate} →</>
            }
          </button>
        </div>

      </div>
    </form>
  );
}
