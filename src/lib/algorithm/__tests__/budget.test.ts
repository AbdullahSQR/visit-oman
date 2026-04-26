import { describe, it, expect } from "vitest";
import { computeCostBreakdown } from "../budget";
import type { Destination, PlannerInput } from "@/lib/types";

// Minimal destination stub — only ticket_cost_omr matters here
function makeDestination(ticketCost: number): Destination {
  return {
    id: `dest-${ticketCost}`,
    name: { en: "Test", ar: "اختبار" },
    region: { en: "muscat", ar: "مسقط" },
    description: { en: "", ar: "" },
    categories: ["culture"],
    recommended_months: [10, 11, 12],
    crowd_level: 3,
    ticket_cost_omr: ticketCost,
    avg_visit_duration_minutes: 60,
    lat: 23.58,
    lng: 58.38,
    image_url: "",
    highlights: [],
  };
}

const BASE_INPUT: PlannerInput = {
  days: 3,
  budget: "medium",
  month: 10,
  intensity: "balanced",
  preferredCategories: ["culture"],
};

describe("computeCostBreakdown", () => {
  it("hotel nights = days - 1 (not days)", () => {
    const result = computeCostBreakdown(0, [], { ...BASE_INPUT, days: 3 });
    // 3 days → 2 nights × 45 OMR = 90
    expect(result.hotelOmr).toBe(90);
  });

  it("a 1-day trip uses 1 hotel night (minimum 1)", () => {
    const result = computeCostBreakdown(0, [], { ...BASE_INPUT, days: 1 });
    // max(1, 1-1) = 1 night × 45 = 45
    expect(result.hotelOmr).toBe(45);
  });

  it("food cost = 6 OMR × days", () => {
    const result = computeCostBreakdown(0, [], { ...BASE_INPUT, days: 4 });
    expect(result.foodOmr).toBe(24);
  });

  it("fuel formula: km/12 × 0.22", () => {
    const result = computeCostBreakdown(120, [], BASE_INPUT);
    expect(result.fuelOmr).toBeCloseTo((120 / 12) * 0.22, 2);
  });

  it("sums ticket costs from all destinations", () => {
    const dests = [makeDestination(5), makeDestination(3), makeDestination(0)];
    const result = computeCostBreakdown(0, dests, BASE_INPUT);
    expect(result.ticketsOmr).toBe(8);
  });

  it("budgetFeasible=true when within daily threshold", () => {
    // medium: 100 OMR/day × 3 days = 300 threshold
    // 0 km, 0 tickets, food=18, hotel=90 → total=108 < 300
    const result = computeCostBreakdown(0, [], BASE_INPUT);
    expect(result.budgetFeasible).toBe(true);
  });

  it("budgetFeasible=false when over threshold", () => {
    // luxury has 90 OMR/night; low tier allows only 50/day
    // 1000 km of fuel alone: 1000/12*0.22 ≈ 18.3 OMR — but with low budget 50/day×3=150
    // let's just use a ton of destinations with high ticket costs + low budget
    const expensive = Array.from({ length: 10 }, () => makeDestination(20));
    const lowInput: PlannerInput = { ...BASE_INPUT, budget: "low" };
    const result = computeCostBreakdown(500, expensive, lowInput);
    expect(result.budgetFeasible).toBe(false);
  });

  it("rounds to 2 decimal places", () => {
    const result = computeCostBreakdown(37, [], BASE_INPUT);
    // fuel = 37/12*0.22 = 0.678333... should round to 0.68
    expect(result.fuelOmr).toBe(Math.round((37 / 12) * 0.22 * 100) / 100);
  });

  it("totalKm is rounded to 1 decimal place", () => {
    const result = computeCostBreakdown(123.456, [], BASE_INPUT);
    expect(result.totalKm).toBe(123.5);
  });
});
