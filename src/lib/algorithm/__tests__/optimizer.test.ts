import { describe, it, expect } from "vitest";
import { generateItinerary } from "../optimizer";
import type { PlannerInput } from "@/lib/types";

const BASE: PlannerInput = {
  days: 3,
  budget: "medium",
  month: 10,
  intensity: "balanced",
  preferredCategories: ["culture", "mountain"],
};

describe("generateItinerary", () => {
  it("returns the correct number of days (≤ requested days)", () => {
    const result = generateItinerary(BASE);
    // May be fewer if destinations run out, but never more
    expect(result.days.length).toBeLessThanOrEqual(BASE.days);
    expect(result.days.length).toBeGreaterThan(0);
  });

  it("days are numbered sequentially starting from 1", () => {
    const result = generateItinerary(BASE);
    result.days.forEach((day, idx) => {
      expect(day.day).toBe(idx + 1);
    });
  });

  it("no day has zero stops", () => {
    const result = generateItinerary(BASE);
    for (const day of result.days) {
      expect(day.stops.length).toBeGreaterThan(0);
    }
  });

  it("is deterministic — same input always yields same output", () => {
    const a = generateItinerary(BASE);
    const b = generateItinerary(BASE);
    expect(a.days.map((d) => d.stops.map((s) => s.destination.id))).toEqual(
      b.days.map((d) => d.stops.map((s) => s.destination.id))
    );
  });

  it("no destination appears in more than one day", () => {
    const result = generateItinerary({ ...BASE, days: 5 });
    const allIds = result.days.flatMap((d) => d.stops.map((s) => s.destination.id));
    const uniqueIds = new Set(allIds);
    expect(allIds.length).toBe(uniqueIds.size);
  });

  it("respects intensity cap: packed ≤ 5 stops per day", () => {
    const packed = generateItinerary({ ...BASE, intensity: "packed", days: 2 });
    for (const day of packed.days) {
      expect(day.stops.length).toBeLessThanOrEqual(5);
    }
  });

  it("respects intensity cap: relaxed ≤ 3 stops per day", () => {
    const relaxed = generateItinerary({ ...BASE, intensity: "relaxed", days: 2 });
    for (const day of relaxed.days) {
      expect(day.stops.length).toBeLessThanOrEqual(3);
    }
  });

  it("uses at least 2 regions for a 3-day trip", () => {
    const result = generateItinerary(BASE);
    const regions = new Set(result.days.map((d) => d.region));
    expect(regions.size).toBeGreaterThanOrEqual(2);
  });

  it("costBreakdown.totalOmr > 0 for any non-trivial trip", () => {
    const result = generateItinerary(BASE);
    expect(result.costBreakdown.totalOmr).toBeGreaterThan(0);
  });

  it("arrival time is always before departure time on the same stop", () => {
    const result = generateItinerary(BASE);
    for (const day of result.days) {
      for (const stop of day.stops) {
        const [ah, am] = stop.arrivalTime.split(":").map(Number);
        const [dh, dm] = stop.departureTime.split(":").map(Number);
        const arrivalMins   = ah * 60 + am;
        const departureMins = dh * 60 + dm;
        expect(departureMins).toBeGreaterThan(arrivalMins);
      }
    }
  });

  it("regionAllocation total days matches sum of allocated days", () => {
    const result = generateItinerary(BASE);
    const allocTotal = result.regionAllocation.reduce((s, r) => s + r.daysAssigned, 0);
    expect(allocTotal).toBe(BASE.days);
  });
});
