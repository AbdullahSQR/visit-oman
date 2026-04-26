"use client";

import { useAppStore } from "@/lib/store/useAppStore";
import type { TranslationKeys } from "@/lib/i18n/translations";

interface Props {
  destId: string;
  t: TranslationKeys;
  compact?: boolean;
}

export default function SaveInterestButton({ destId, t, compact = false }: Props) {
  const { isSaved, toggleSaved } = useAppStore();
  const saved = isSaved(destId);

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleSaved(destId);
      }}
      aria-label={saved ? t.featured.saved : t.featured.save}
      className={`flex items-center gap-1.5 rounded-full font-medium text-sm transition-all ${
        compact
          ? "px-2 py-1 text-xs"
          : "px-4 py-2"
      } ${
        saved
          ? "bg-omred text-white shadow-sm"
          : "bg-white/80 border border-ink/15 text-ink/60 hover:border-omred hover:text-omred"
      }`}
    >
      <span>{saved ? "♥" : "♡"}</span>
      {!compact && <span>{saved ? t.featured.saved : t.featured.save}</span>}
    </button>
  );
}
