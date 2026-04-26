/**
 * Multi-objective scoring model.
 *
 * score(i) =
 *   w_interest  * Jaccard(user_categories, dest_categories)    [0.30]
 * + w_season    * SeasonFit(month, recommended_months_i)       [0.25]
 * - w_crowd     * Normalize(crowd_level_i, 1, 5)               [0.15]
 * - w_cost      * Normalize(ticket_cost_omr_i, 0, MAX_COST)    [0.10]
 * - w_detour    * Normalize(detour_km, 0, MAX_DAILY_KM)        [0.10]
 * + w_diversity * DiversityGain(i, selected_set)               [0.10]
 *
 * Weight rationale:
 *   interest  (0.30) — Primary driver: the trip must match what the visitor wants to see.
 *   season    (0.25) — Oman has highly variable seasonal attractions (Khareef, turtle nesting,
 *                      mountain heat); visiting out of season degrades the experience significantly.
 *   crowd     (0.15) — Distribution of tourists away from honeypots is a stated Oman 2040 goal.
 *   cost      (0.10) — Soft budget signal; hard budget enforcement is handled separately.
 *   detour    (0.10) — Encourages routing efficiency; penalises large detours.
 *   diversity (0.10) — Prevents single-category days; encourages a richer experience.
 *
 * All components are normalised to [0,1] before weighting.
 * Pure functions only — no side effects, no randomness.
 */

import type { Category, Destination, ScoreBreakdown } from "@/lib/types";
import { distanceKm, MAX_DAILY_KM } from "./haversine";
import { MAX_TICKET_COST } from "@/lib/data/destinations";

// ─── Weights ─────────────────────────────────────────────────────────────────

const W_INTEREST  = 0.30;
const W_SEASON    = 0.25;
const W_CROWD     = 0.15;
const W_COST      = 0.10;
const W_DETOUR    = 0.10;
const W_DIVERSITY = 0.10;

// ─── Component functions ──────────────────────────────────────────────────────

/**
 * Jaccard similarity between user-preferred categories and destination categories.
 * |A ∩ B| / |A ∪ B|
 * Returns 0.5 if the user has no category preferences (neutral, not penalising).
 */
export function jaccardInterest(userCats: Category[], destCats: Category[]): number {
  if (userCats.length === 0) return 0.5;
  const userSet = new Set(userCats);
  const destSet = new Set(destCats);
  const intersection = Array.from(userSet).filter((c) => destSet.has(c)).length;
  const unionSet = new Set(Array.from(userSet).concat(Array.from(destSet)));
  const union = unionSet.size;
  return union === 0 ? 0 : intersection / union;
}

/**
 * Season fit score ∈ [0,1].
 * - Month is in recommended_months → 1.0
 * - Otherwise: decays linearly by the closest calendar distance to a recommended month.
 *   Distance is computed with wrap-around (circular calendar).
 *   Max possible distance = 6 months → score = 0.
 */
// Module-level cache — keyed on "month:m1,m2,..." (recommended months are
// dataset-defined constants so the join is stable across calls).
const _seasonFitCache = new Map<string, number>();

export function seasonFit(month: number, recommendedMonths: number[]): number {
  const key = `${month}:${recommendedMonths.join(",")}`;
  const cached = _seasonFitCache.get(key);
  if (cached !== undefined) return cached;

  let result: number;
  if (recommendedMonths.length === 0) {
    result = 0.5;
  } else if (recommendedMonths.includes(month)) {
    result = 1.0;
  } else {
    const minCircularDist = Math.min(
      ...recommendedMonths.map((m) => {
        const diff = Math.abs(month - m);
        return Math.min(diff, 12 - diff); // circular wrap
      })
    );
    // Linear decay: 1 month off = 0.83, 3 months off = 0.5, 6 months off = 0
    result = Math.max(0, 1 - minCircularDist / 6);
  }

  _seasonFitCache.set(key, result);
  return result;
}

/**
 * Crowd normalisation: maps crowd_level ∈ {1..5} to [0,1].
 * Used as a PENALTY — higher crowd = higher penalty.
 */
export function normalizeCrowd(crowdLevel: number): number {
  return (crowdLevel - 1) / 4;
}

/**
 * Cost normalisation: maps ticket_cost_omr ∈ [0, MAX] to [0,1].
 * Used as a PENALTY.
 */
export function normalizeCost(cost: number): number {
  if (MAX_TICKET_COST === 0) return 0;
  return Math.min(1, cost / MAX_TICKET_COST);
}

/**
 * Detour penalty ∈ [0,1].
 * How far off the current route does this destination take us?
 * Normalised against MAX_DAILY_KM.
 */
export function normalizeDetour(currentRoute: { lat: number; lng: number }[], dest: Destination): number {
  if (currentRoute.length === 0) return 0;
  const last = currentRoute[currentRoute.length - 1];
  return Math.min(1, distanceKm(last, dest) / MAX_DAILY_KM);
}

/**
 * Diversity gain ∈ [0,1].
 * Fraction of destination's categories NOT already covered in the selected set.
 * Encourages visiting new category types each day.
 */
export function diversityGain(dest: Destination, selectedSet: Destination[]): number {
  if (dest.categories.length === 0) return 0;
  const coveredCategories = new Set(selectedSet.flatMap((d) => d.categories));
  const newCategories = dest.categories.filter((c) => !coveredCategories.has(c));
  return newCategories.length / dest.categories.length;
}

// ─── Composite score ─────────────────────────────────────────────────────────

export interface ScoreParams {
  userCategories: Category[];
  month: number;
  currentRoute: { lat: number; lng: number }[];
  selectedSet: Destination[];
}

/**
 * Compute the full weighted score for a destination.
 * Returns both the total and a component-wise breakdown for the explanation panel.
 */
export function scoreDestination(dest: Destination, params: ScoreParams): ScoreBreakdown {
  const interest  = jaccardInterest(params.userCategories, dest.categories);
  const season    = seasonFit(params.month, dest.recommended_months);
  const crowd     = normalizeCrowd(dest.crowd_level);
  const cost      = normalizeCost(dest.ticket_cost_omr);
  const detour    = normalizeDetour(params.currentRoute, dest);
  const diversity = diversityGain(dest, params.selectedSet);

  const total =
    W_INTEREST  * interest  +
    W_SEASON    * season    -
    W_CROWD     * crowd     -
    W_COST      * cost      -
    W_DETOUR    * detour    +
    W_DIVERSITY * diversity;

  // Note: crowd and cost are stored as their raw normalised values (penalties applied in total)
  return { interest, season, crowd, cost, detour, diversity, total };
}

/**
 * Extract the top N contributing score components as labelled pairs.
 * Uses the weighted contribution to determine "why this stop was chosen".
 * Penalties are reported as positive contributions when they are LOW (i.e., low crowd = good).
 */
export function topReasons(breakdown: ScoreBreakdown, n = 2): [string, number][] {
  const contributions: [string, number][] = [
    ["interest",  W_INTEREST  *  breakdown.interest],
    ["season",    W_SEASON    *  breakdown.season],
    ["crowd",     W_CROWD     * (1 - breakdown.crowd)],    // inverted: low crowd = good
    ["cost",      W_COST      * (1 - breakdown.cost)],     // inverted: low cost = good
    ["detour",    W_DETOUR    * (1 - breakdown.detour)],   // inverted: low detour = good
    ["diversity", W_DIVERSITY *  breakdown.diversity],
  ];

  return contributions
    .sort((a, b) => b[1] - a[1])
    .slice(0, n);
}
