"use client";

/**
 * Top-level client component for the planner.
 * Orchestrates form → algorithm → display.
 * All computation runs in the browser per contest requirements.
 */

import { useState, useTransition, useRef, useEffect } from "react";
import type { Locale, PlannerInput } from "@/lib/types";
import type { TranslationKeys } from "@/lib/i18n/translations";
import { useAppStore } from "@/lib/store/useAppStore";
import { generateItinerary } from "@/lib/algorithm/optimizer";
import PlannerForm from "./PlannerForm";
import ItineraryDisplay from "./ItineraryDisplay";

interface Props {
  locale: Locale;
  t: TranslationKeys;
}

export default function PlannerClient({ locale, t }: Props) {
  const { itinerary, setItinerary, clearItinerary } = useAppStore();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const itineraryRef = useRef<HTMLDivElement>(null);

  // Move focus to the itinerary section once it's ready so keyboard / screen-reader
  // users don't have to manually navigate past the form. Fires only when a generation
  // completes (isPending flips false with a defined generatedAt).
  useEffect(() => {
    if (!itinerary?.generatedAt || isPending) return;
    itineraryRef.current?.focus();
  }, [itinerary?.generatedAt, isPending]);

  const handleGenerate = (input: PlannerInput) => {
    setError(null);
    startTransition(() => {
      try {
        const result = generateItinerary(input);
        setItinerary(result);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Generation failed");
      }
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <header className="mb-8">
        <h1 className="font-display font-bold text-ink text-3xl">{t.planner.title}</h1>
        <p className="text-ink/50 mt-1">{t.planner.subtitle}</p>
      </header>

      {/* Form is always visible; itinerary renders below it when generated */}
      <PlannerForm
        t={t}
        locale={locale}
        onGenerate={handleGenerate}
        isGenerating={isPending}
        hasItinerary={!!itinerary}
      />

      {error && (
        <div className="mt-4 p-4 bg-omred/8 border border-omred/20 rounded-xl text-omred text-sm font-medium">
          {error}
        </div>
      )}

      {isPending && (
        <div className="mt-8 text-center text-teal font-medium animate-pulse">
          {t.planner.loading}
        </div>
      )}

      {itinerary && !isPending && (
        <div ref={itineraryRef} tabIndex={-1} className="outline-none">
          <ItineraryDisplay
            key={itinerary.generatedAt}
            itinerary={itinerary}
            t={t}
            locale={locale}
            onClear={clearItinerary}
          />
        </div>
      )}
    </div>
  );
}
