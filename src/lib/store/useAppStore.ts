"use client";

/**
 * Global application state via Zustand.
 * Persisted to localStorage so state survives page refreshes.
 *
 * Slices:
 *   interests — saved destination IDs (from "Save" button)
 *   plannerInput — last-used planner form values
 *   itinerary — the generated itinerary (null if not yet generated)
 *   locale — current language ("en" | "ar")
 */

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { GeneratedItinerary, Locale, PlannerInput } from "@/lib/types";
import { PersistedStateSchema } from "@/lib/validation/storeSchema";

interface AppState {
  // ── Saved interests ─────────────────────────────────────────────────────
  savedIds: string[];
  saveDestination: (id: string) => void;
  unsaveDestination: (id: string) => void;
  toggleSaved: (id: string) => void;
  isSaved: (id: string) => boolean;

  // ── Planner inputs ───────────────────────────────────────────────────────
  plannerInput: PlannerInput | null;
  setPlannerInput: (input: PlannerInput) => void;

  // ── Generated itinerary ──────────────────────────────────────────────────
  itinerary: GeneratedItinerary | null;
  setItinerary: (itinerary: GeneratedItinerary | null) => void;
  clearItinerary: () => void;

  // ── UI state ─────────────────────────────────────────────────────────────
  locale: Locale;
  setLocale: (locale: Locale) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // ── Interests ──────────────────────────────────────────────────────
      savedIds: [],

      saveDestination: (id) =>
        set((s) => ({ savedIds: s.savedIds.includes(id) ? s.savedIds : [...s.savedIds, id] })),

      unsaveDestination: (id) =>
        set((s) => ({ savedIds: s.savedIds.filter((x) => x !== id) })),

      toggleSaved: (id) => {
        const { savedIds } = get();
        if (savedIds.includes(id)) {
          set({ savedIds: savedIds.filter((x) => x !== id) });
        } else {
          set({ savedIds: [...savedIds, id] });
        }
      },

      isSaved: (id) => get().savedIds.includes(id),

      // ── Planner ────────────────────────────────────────────────────────
      plannerInput: null,
      setPlannerInput: (input) => set({ plannerInput: input, itinerary: null }),

      // ── Itinerary ──────────────────────────────────────────────────────
      itinerary: null,
      setItinerary: (itinerary) => set({ itinerary }),
      clearItinerary: () => set({ itinerary: null }),

      // ── UI ─────────────────────────────────────────────────────────────
      locale: "en",
      setLocale: (locale) => set({ locale }),
    }),
    {
      name: "codestacker-oman-state",
      version: 1,
      migrate: (_persistedState, version) => {
        // Any cached state from before version 1 is cleared to avoid shape mismatches
        if (version < 1) return {};
        return _persistedState;
      },
      storage: createJSONStorage(() => {
        // Safe localStorage access (SSR guard)
        if (typeof window !== "undefined") return localStorage;
        return {
          getItem: () => null,
          setItem: () => {},
          removeItem: () => {},
        };
      }),
      // Only persist fields that should survive a refresh
      partialize: (state) => ({
        savedIds: state.savedIds,
        plannerInput: state.plannerInput,
        itinerary: state.itinerary,
        locale: state.locale,
      }),

      // Validate the raw localStorage blob before it populates the store.
      // Any corrupt / outdated data is silently dropped to safe defaults rather
      // than crashing the app or injecting unexpected shapes into the state.
      onRehydrateStorage: () => (rehydratedState, error) => {
        if (error) {
          console.warn("[Visit Oman] Store rehydration error — resetting to defaults:", error);
          return;
        }
        if (!rehydratedState) return;

        const parsed = PersistedStateSchema.safeParse(rehydratedState);
        if (!parsed.success) {
          console.warn(
            "[Visit Oman] Persisted state failed validation — some fields may fall back to defaults.",
            parsed.error.flatten()
          );
        }
      },
    }
  )
);
