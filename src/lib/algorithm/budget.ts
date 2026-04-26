/**
 * Budget estimation and feasibility check.
 *
 * Formulae (from contest spec):
 *   fuel    = total_km / 12 * 0.22  (OMR per litre at 12 km/l and 0.22 OMR/l)
 *   tickets = sum(ticket_cost_omr)
 *   food    = 6 OMR × days
 *   hotel   = low: 20, medium: 45, luxury: 90 (per night)
 *
 * Budget thresholds per tier (total trip cost):
 *   low:     ≤ 50 OMR/day × days
 *   medium:  ≤ 100 OMR/day × days
 *   luxury:  ≤ 200 OMR/day × days
 *
 * If the cost exceeds the threshold, the function returns budgetFeasible=false
 * and the caller (optimizer) will have already substituted cheaper alternatives.
 */

import type { BudgetTier, CostBreakdown, Destination, PlannerInput } from "@/lib/types";

const FUEL_PRICE = 0.22;          // OMR per litre
const FUEL_KM_PER_LITRE = 12;
const FOOD_PER_DAY = 6;           // OMR/day — fixed per contest spec

const HOTEL_RATES: Record<BudgetTier, number> = {
  low: 20,
  medium: 45,
  luxury: 90,
};

const DAILY_BUDGET_THRESHOLD: Record<BudgetTier, number> = {
  low: 50,
  medium: 100,
  luxury: 200,
};

export function computeCostBreakdown(
  totalKm: number,
  destinations: Destination[],
  input: PlannerInput
): CostBreakdown {
  const nights = Math.max(1, input.days - 1); // a 3-day trip needs 2 nights, not 3

  const fuelOmr = (totalKm / FUEL_KM_PER_LITRE) * FUEL_PRICE;
  const ticketsOmr = destinations.reduce((sum, d) => sum + d.ticket_cost_omr, 0);
  const foodOmr = FOOD_PER_DAY * input.days;
  const hotelOmr = HOTEL_RATES[input.budget] * nights;
  const totalOmr = fuelOmr + ticketsOmr + foodOmr + hotelOmr;

  const budgetThreshold = DAILY_BUDGET_THRESHOLD[input.budget] * input.days;
  const budgetFeasible = totalOmr <= budgetThreshold;

  return {
    fuelOmr: Math.round(fuelOmr * 100) / 100,
    ticketsOmr: Math.round(ticketsOmr * 100) / 100,
    foodOmr: Math.round(foodOmr * 100) / 100,
    hotelOmr: Math.round(hotelOmr * 100) / 100,
    totalOmr: Math.round(totalOmr * 100) / 100,
    totalKm: Math.round(totalKm * 10) / 10,
    budgetFeasible,
    budgetThreshold,
  };
}

