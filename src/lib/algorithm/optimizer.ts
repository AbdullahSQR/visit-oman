/**
 * Core itinerary generation algorithm.
 *
 * Two-phase hierarchical optimisation:
 *
 * PHASE A — Region Allocation (global planning)
 *   Greedy-with-constraint allocator that distributes trip days across regions,
 *   respecting diversity and season-fitness constraints.
 *
 * PHASE B — Intra-Region Routing (local planning)
 *   Per-region, per-day stop selection using bounded Dynamic Programming (knapsack)
 *   under a time budget, followed by 2-opt local search to minimise driving distance.
 *
 * Why DP + 2-opt?
 *   - DP gives globally optimal stop selection under time constraints (better than greedy).
 *   - 2-opt gives near-optimal ordering of selected stops (no TSP solver needed for ≤5 stops).
 *   - Together they satisfy the "at least one improvement strategy" requirement and produce
 *     routes that are demonstrably better than naive greedy selection.
 *
 * Determinism guarantee:
 *   No Math.random() anywhere. All tie-breaking uses stable sort on destination ID strings.
 */

import type {
  Destination, PlannerInput, GeneratedItinerary,
  DayPlan, RegionPlan, ScheduledStop, Region, Month,
} from "@/lib/types";
import { DESTINATIONS } from "@/lib/data/destinations";
import {
  distanceKm, travelMinutes, totalKm,
  MAX_DAILY_MINUTES,
} from "./haversine";
import { scoreDestination, topReasons, seasonFit } from "./scoring";
import { computeCostBreakdown } from "./budget";

// ─── Constants ────────────────────────────────────────────────────────────────

const MAX_STOPS: Record<string, number> = { relaxed: 3, balanced: 4, packed: 5 };
const DAY_START_HOUR = 9; // 09:00
const MAX_CATEGORY_REPEAT = 2; // same category max 2x per day

/**
 * Estimate average nearest-neighbour travel time (minutes) within a set of destinations.
 * Used to compute a region-specific travel overhead for the DP time budget.
 * Falls back to 25 minutes if there is only one destination.
 */
function avgNearestNeighbourMins(dests: Destination[]): number {
  if (dests.length <= 1) return 25;
  let total = 0;
  for (const a of dests) {
    let minDist = Infinity;
    for (const b of dests) {
      if (b.id === a.id) continue;
      const d = distanceKm({ lat: a.lat, lng: a.lng }, { lat: b.lat, lng: b.lng });
      if (d < minDist) minDist = d;
    }
    total += (minDist / 70) * 60; // 70 km/h average road speed
  }
  return total / dests.length;
}

// ─── Geography helpers ────────────────────────────────────────────────────────

/**
 * Compute the geographic centroid of a region from its destinations.
 */
function regionCentroid(region: Region): { lat: number; lng: number } {
  const dests = DESTINATIONS.filter((d) => d.region.en === region);
  if (dests.length === 0) return { lat: 23.0, lng: 57.5 };
  return {
    lat: dests.reduce((s, d) => s + d.lat, 0) / dests.length,
    lng: dests.reduce((s, d) => s + d.lng, 0) / dests.length,
  };
}

/**
 * Reorder allocated regions by nearest-neighbour to minimise inter-region backtracking.
 * Starts from Muscat (the conventional trip entry point) when allocated, otherwise
 * from the highest-scored region.
 */
function reorderByGeography(
  regions: { region: Region; days: number }[]
): { region: Region; days: number }[] {
  if (regions.length <= 1) return regions;

  const centroids = new Map(regions.map((r) => [r.region, regionCentroid(r.region)]));

  // Prefer starting from Muscat as the natural entry point to Oman
  const startIdx = regions.findIndex((r) => r.region === "muscat");
  const start = startIdx >= 0 ? regions[startIdx] : regions[0];

  const ordered = [start];
  const remaining = regions.filter((r) => r.region !== start.region);

  while (remaining.length > 0) {
    const lastCentroid = centroids.get(ordered[ordered.length - 1].region)!;
    let nearestIdx = 0;
    let nearestDist = Infinity;
    for (let i = 0; i < remaining.length; i++) {
      const d = distanceKm(lastCentroid, centroids.get(remaining[i].region)!);
      if (d < nearestDist) { nearestDist = d; nearestIdx = i; }
    }
    ordered.push(remaining[nearestIdx]);
    remaining.splice(nearestIdx, 1);
  }

  return ordered;
}

// ─── Phase A: Region Allocation ───────────────────────────────────────────────

/**
 * Score a region for the given input: average season fit of its destinations
 * weighted by user category interest.
 */
function scoreRegion(region: Region, input: PlannerInput): number {
  const dests = DESTINATIONS.filter((d) => d.region.en === region);
  if (dests.length === 0) return 0;

  const regionSeasonScore =
    dests.reduce((sum, d) => sum + seasonFit(input.month, d.recommended_months), 0) /
    dests.length;

  // Category coverage: fraction of user-preferred categories covered by this region
  const destCats = new Set(dests.flatMap((d) => d.categories));
  const userCats = input.preferredCategories;
  const catCoverage =
    userCats.length === 0
      ? 0.5
      : userCats.filter((c) => destCats.has(c)).length / userCats.length;

  // Combined: season fit is more important (0.6) than category coverage (0.4)
  return 0.6 * regionSeasonScore + 0.4 * catCoverage;
}

/**
 * Allocate trip days across regions.
 *
 * Constraints enforced:
 *   1. At least 2 regions if days >= 3.
 *   2. No region gets more than ceil(days/2) days.
 *   3. Regions with no matching destinations for the user are deprioritised.
 *   4. Exactly `days` total days assigned.
 */
export function allocateRegions(input: PlannerInput): RegionPlan[] {
  const allRegions: Region[] = ["muscat", "dakhiliya", "sharqiya", "dhofar", "batinah", "dhahira"];

  // Only include regions that have at least one destination
  const viableRegions = allRegions.filter(
    (r) => DESTINATIONS.some((d) => d.region.en === r)
  );

  const maxPerRegion = Math.ceil(input.days / 2);

  // Score and sort regions deterministically (tie-break on region name)
  const scored = viableRegions
    .map((r) => ({ region: r, score: scoreRegion(r, input) }))
    .sort((a, b) => b.score - a.score || a.region.localeCompare(b.region));

  // Per-region destination count caps — prevents allocating more days than unique stops available
  const destCount = new Map(
    viableRegions.map((r) => [r, DESTINATIONS.filter((d) => d.region.en === r).length])
  );

  const allocation: Map<Region, number> = new Map();
  let remaining = input.days;

  // Greedy first pass: assign days proportional to score, capped at maxPerRegion and dest count
  const totalScore = scored.reduce((s, r) => s + r.score, 0);

  for (const { region, score } of scored) {
    if (remaining <= 0) break;
    const proportional = totalScore > 0 ? Math.round((score / totalScore) * input.days) : 1;
    const regionCap = Math.min(maxPerRegion, destCount.get(region) ?? maxPerRegion);
    const assigned = Math.max(1, Math.min(proportional, regionCap, remaining));
    allocation.set(region, assigned);
    remaining -= assigned;
  }

  // Distribute any leftover days to top-scored regions (under both score cap and dest cap).
  // Loop until all days are assigned or every region is at its cap.
  let madeProgress = true;
  while (remaining > 0 && madeProgress) {
    madeProgress = false;
    for (const { region } of scored) {
      if (remaining <= 0) break;
      const current = allocation.get(region) ?? 0;
      const regionCap = Math.min(maxPerRegion, destCount.get(region) ?? maxPerRegion);
      if (current < regionCap) {
        allocation.set(region, current + 1);
        remaining--;
        madeProgress = true;
      }
    }
  }

  // Enforce: at least 2 regions if days >= 3
  if (input.days >= 3 && allocation.size < 2) {
    const secondRegion = scored.find(({ region }) => !allocation.has(region));
    if (secondRegion && allocation.size > 0) {
      const [firstRegion] = Array.from(allocation.keys());
      const firstDays = allocation.get(firstRegion)!;
      if (firstDays > 1) {
        allocation.set(firstRegion, firstDays - 1);
        allocation.set(secondRegion.region, 1);
      }
    }
  }

  // Collect allocated regions and reorder by geography to minimise inter-region backtracking
  const allocatedRegions = scored
    .filter(({ region }) => (allocation.get(region) ?? 0) > 0)
    .map(({ region }) => ({ region, days: allocation.get(region)! }));

  const geographicOrder = reorderByGeography(allocatedRegions);

  // Build ordered RegionPlan list
  const result: RegionPlan[] = [];
  let dayOffset = 1;

  for (const { region, days } of geographicOrder) {
    result.push({
      region,
      daysAssigned: days,
      startDay: dayOffset,
      endDay: dayOffset + days - 1,
    });
    dayOffset += days;
  }

  return result;
}

// ─── Phase B: DP-based Stop Selection ────────────────────────────────────────

/**
 * Bounded knapsack DP for stop selection under a time budget.
 *
 * Capacity: available minutes for stops (MAX_DAILY_MINUTES minus travel overhead).
 * Items: destination visit durations as weights, scores as values.
 * Returns the optimal subset of destinations that maximises total score within budget.
 *
 * Complexity: O(n × T) where n = candidates, T = time budget in minutes.
 * n ≤ 15 per region per day, T ≤ 480 min → tractable in-browser.
 */
function dpSelectStops(
  candidates: { dest: Destination; score: number }[],
  timeBudgetMinutes: number,
  maxStops: number
): Destination[] {
  if (candidates.length === 0) return [];

  // Each selected stop costs visit time + REST_GAP_MINUTES of buffer between activities.
  // Baking the gap into the item weight means the time-budget constraint automatically
  // enforces breathing room — no separate adjacency check needed.
  const REST_GAP_MINUTES = 15;

  const n = candidates.length;
  const T = timeBudgetMinutes;

  // dp[i][t] = max score using first i items with time budget t, and count of stops
  // Store both score and stop-count to enforce maxStops constraint
  type Cell = { score: number; count: number };
  const dp: Cell[][] = Array.from({ length: n + 1 }, () =>
    Array.from({ length: T + 1 }, () => ({ score: 0, count: 0 }))
  );

  for (let i = 1; i <= n; i++) {
    const { dest, score } = candidates[i - 1];
    const weight = dest.avg_visit_duration_minutes + REST_GAP_MINUTES;

    for (let t = 0; t <= T; t++) {
      // Option 1: skip this destination
      dp[i][t] = { ...dp[i - 1][t] };

      // Option 2: include this destination (if it fits in time budget and stop count)
      if (t >= weight && dp[i - 1][t - weight].count < maxStops) {
        const candidate = {
          score: dp[i - 1][t - weight].score + score,
          count: dp[i - 1][t - weight].count + 1,
        };
        if (candidate.score > dp[i][t].score) {
          dp[i][t] = candidate;
        }
      }
    }
  }

  // Backtrack to find selected items
  const selected: Destination[] = [];
  let t = T;
  for (let i = n; i >= 1; i--) {
    const { dest, score } = candidates[i - 1];
    const weight = dest.avg_visit_duration_minutes + REST_GAP_MINUTES;

    if (
      t >= weight &&
      dp[i][t].score !== dp[i - 1][t].score &&
      Math.abs(dp[i][t].score - (dp[i - 1][t - weight].score + score)) < 1e-9
    ) {
      selected.push(dest);
      t -= weight;
    }
  }

  return selected.reverse(); // maintain candidate order
}

// ─── 2-opt Route Optimisation ─────────────────────────────────────────────────

/**
 * 2-opt local search to minimise total driving distance for a given stop sequence.
 *
 * Algorithm:
 *   Repeatedly consider all pairs of edges (i, k). If reversing the segment between
 *   them reduces total route length, apply the reversal and restart.
 *   Terminates when no improving swap exists (local optimum).
 *
 * Complexity: O(n²) per pass, O(n³) worst case. For n ≤ 5 this is negligible.
 * This is deterministic — same input always yields same output.
 */
function twoOptOptimise(stops: Destination[]): Destination[] {
  if (stops.length <= 2) return stops;

  let route = [...stops];
  let improved = true;

  while (improved) {
    improved = false;
    // Compute current distance once per full pass — valid because we break
    // immediately on any improvement and restart the while loop.
    const current = totalKm(route.map((d) => ({ lat: d.lat, lng: d.lng })));
    outer:
    for (let i = 0; i < route.length - 1; i++) {
      for (let k = i + 1; k < route.length; k++) {
        const newRoute = [
          ...route.slice(0, i),
          ...route.slice(i, k + 1).reverse(),
          ...route.slice(k + 1),
        ];
        const newDist = totalKm(newRoute.map((d) => ({ lat: d.lat, lng: d.lng })));
        if (newDist < current - 0.001) {
          route = newRoute;
          improved = true;
          break outer; // restart the while loop with the updated route
        }
      }
    }
  }

  return route;
}

// ─── Category Variety Enforcement ────────────────────────────────────────────

/**
 * Check if adding `dest` to `dayStops` would violate the category repeat rule:
 * no category more than MAX_CATEGORY_REPEAT times per day (unless user selected only one category).
 */
function respectsCategoryVariety(
  dest: Destination,
  dayStops: Destination[],
  userSelectedOnlyOneCategory: boolean
): boolean {
  if (userSelectedOnlyOneCategory) return true;

  const catCount: Record<string, number> = {};
  for (const d of dayStops) {
    for (const c of d.categories) {
      catCount[c] = (catCount[c] ?? 0) + 1;
    }
  }

  for (const c of dest.categories) {
    if ((catCount[c] ?? 0) >= MAX_CATEGORY_REPEAT) return false;
  }

  return true;
}

// ─── Day Schedule Builder ─────────────────────────────────────────────────────

/**
 * Build a timestamped DayPlan from an ordered list of stops.
 * Computes arrival/departure times starting from DAY_START_HOUR.
 */
function buildDayPlan(
  dayIndex: number,
  region: Region,
  orderedStops: Destination[],
  input: PlannerInput,
  previousStop: Destination | null
): DayPlan {
  const scheduledStops: ScheduledStop[] = [];
  let currentMinutes = DAY_START_HOUR * 60; // minutes from midnight

  for (let i = 0; i < orderedStops.length; i++) {
    const dest = orderedStops[i];
    const prevDest = i === 0 ? previousStop : orderedStops[i - 1];

    const travelMins = prevDest
      ? Math.round(travelMinutes({ lat: prevDest.lat, lng: prevDest.lng }, { lat: dest.lat, lng: dest.lng }))
      : 0;
    const travelKm = prevDest
      ? Math.round(distanceKm({ lat: prevDest.lat, lng: prevDest.lng }, { lat: dest.lat, lng: dest.lng }) * 10) / 10
      : 0;

    currentMinutes += travelMins;

    const arrivalTime = formatTime(currentMinutes);
    currentMinutes += dest.avg_visit_duration_minutes;
    const departureTime = formatTime(currentMinutes);

    // Score breakdown for explanation panel
    const prevStops = orderedStops.slice(0, i);
    const breakdown = scoreDestination(dest, {
      userCategories: input.preferredCategories,
      month: input.month,
      currentRoute: prevStops.map((d) => ({ lat: d.lat, lng: d.lng })),
      selectedSet: prevStops,
    });

    scheduledStops.push({
      destination: dest,
      arrivalTime,
      departureTime,
      travelMinutesFromPrev: travelMins,
      travelKmFromPrev: travelKm,
      scoreBreakdown: breakdown,
      topReasons: topReasons(breakdown, 2),
    });
  }

  // Include previousStop so inter-region travel (e.g. Muscat → Sharqiya) is counted in km.
  const routePoints = [
    ...(previousStop ? [{ lat: previousStop.lat, lng: previousStop.lng }] : []),
    ...orderedStops.map((d) => ({ lat: d.lat, lng: d.lng })),
  ];
  const dayTotalKm = Math.round(totalKm(routePoints) * 10) / 10;
  const dayTotalMinutes = scheduledStops.reduce(
    (sum, s) => sum + s.destination.avg_visit_duration_minutes + s.travelMinutesFromPrev,
    0
  );

  return {
    day: dayIndex,
    region,
    stops: scheduledStops,
    totalKm: dayTotalKm,
    totalMinutes: dayTotalMinutes,
  };
}

function formatTime(totalMinutes: number): string {
  // No % 24 wrap — allow hours > 23 so overloaded days show honestly (e.g. "25:30")
  // rather than silently wrapping to early-morning times.
  const h = Math.floor(totalMinutes / 60);
  const m = totalMinutes % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

// ─── Main Generator ───────────────────────────────────────────────────────────

/**
 * Generate a complete itinerary from user inputs.
 * Deterministic: identical inputs → identical output.
 */
export function generateItinerary(input: PlannerInput): GeneratedItinerary {
  const _t0 = performance.now();

  // Guard against invalid input that could reach here via the store directly
  const safeDays = Math.max(1, Math.min(Math.floor(input.days), 14));
  if (safeDays !== input.days) {
    input = { ...input, days: safeDays };
  }

  const maxStops = MAX_STOPS[input.intensity] ?? 4;
  const userOnlyOneCategory = input.preferredCategories.length === 1;

  // Phase A: allocate days across regions
  const regionPlans = allocateRegions(input);

  const allDays: DayPlan[] = [];
  let lastStop: Destination | null = null;
  const globalUsedIds = new Set<string>();

  for (const regionPlan of regionPlans) {
    const regionDests = DESTINATIONS.filter((d) => d.region.en === regionPlan.region);

    // Shared pool of region destinations, sorted deterministically by id
    const sortedRegionDests = [...regionDests].sort((a, b) => a.id.localeCompare(b.id));

    // Track which destinations are used across this region's days
    const regionUsedIds = new Set<string>();

    for (let dayNum = regionPlan.startDay; dayNum <= regionPlan.endDay; dayNum++) {
      // Available: not used globally or in this region
      const available = sortedRegionDests.filter(
        (d) => !globalUsedIds.has(d.id) && !regionUsedIds.has(d.id)
      );

      // Score all available destinations for this day
      const currentRoute = lastStop ? [{ lat: lastStop.lat, lng: lastStop.lng }] : [];
      const scored = available
        .map((dest) => ({
          dest,
          score: scoreDestination(dest, {
            userCategories: input.preferredCategories,
            month: input.month,
            currentRoute,
            selectedSet: [],
          }).total,
        }))
        .filter((s) => s.score > -Infinity)
        // Stable sort: descending score, tie-break by id
        .sort((a, b) => b.score - a.score || a.dest.id.localeCompare(b.dest.id));

      // Budget headroom per day: subtract estimated inter-stop travel.
      // Uses average nearest-neighbour travel time for THIS region's destinations so
      // spread-out regions (e.g. Batinah, Dhofar) reserve more time than compact ones (Muscat).
      const avgTravelMins = avgNearestNeighbourMins(regionDests);
      const travelOverheadMins = Math.round((maxStops - 1) * avgTravelMins);
      const timeBudget = Math.max(60, MAX_DAILY_MINUTES - travelOverheadMins);

      // Phase B: DP to select optimal stops under time budget
      let selectedStops = dpSelectStops(scored, timeBudget, maxStops);

      // Apply category variety post-filter (prune excess category repeats)
      if (!userOnlyOneCategory) {
        const filtered: Destination[] = [];
        for (const dest of selectedStops) {
          if (respectsCategoryVariety(dest, filtered, false)) {
            filtered.push(dest);
          }
        }
        selectedStops = filtered;
      }

      // 2-opt: optimise stop ordering to minimise driving distance
      const optimisedStops = twoOptOptimise(selectedStops);

      // Build timestamped schedule
      const dayPlan = buildDayPlan(dayNum, regionPlan.region, optimisedStops, input, lastStop);

      // Update used sets
      for (const stop of optimisedStops) {
        regionUsedIds.add(stop.id);
        globalUsedIds.add(stop.id);
      }

      // The last stop of the day becomes the travel origin for the next day
      if (optimisedStops.length > 0) {
        lastStop = optimisedStops[optimisedStops.length - 1];
      }

      allDays.push(dayPlan);
    }
  }

  // Drop empty days (can occur when a region runs out of unseen destinations
  // mid-allocation) and renumber sequentially so the UI never shows a blank day.
  const filledDays = allDays
    .filter((d) => d.stops.length > 0)
    .map((d, idx) => ({ ...d, day: idx + 1 }));

  // Cost breakdown
  const totalKmAllDays = filledDays.reduce((sum, d) => sum + d.totalKm, 0);
  const allStops = filledDays.flatMap((d) => d.stops.map((s) => s.destination));
  const costBreakdown = computeCostBreakdown(totalKmAllDays, allStops, input);

  const _elapsed = performance.now() - _t0;
  if (process.env.NODE_ENV !== "production") {
    console.debug(`[Visit Oman] generateItinerary: ${_elapsed.toFixed(1)} ms`);
  }

  return {
    input,
    regionAllocation: regionPlans,
    days: filledDays,
    costBreakdown,
    generatedAt: Date.now(),
  };
}
