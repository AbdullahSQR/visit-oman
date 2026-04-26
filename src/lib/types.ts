// ─── Domain Types ────────────────────────────────────────────────────────────

export type Locale = "en" | "ar";

export type Category = "mountain" | "beach" | "culture" | "desert" | "nature" | "food";

export type Region = "muscat" | "dakhiliya" | "sharqiya" | "dhofar" | "batinah" | "dhahira";

export type CrowdLevel = 1 | 2 | 3 | 4 | 5;

export type BudgetTier = "low" | "medium" | "luxury";

export type TravelIntensity = "relaxed" | "balanced" | "packed";

export type Month = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

// ─── Dataset Schema ───────────────────────────────────────────────────────────

export interface Hotel {
  name: string;
  stars: number;
  pricePerNight: number; // OMR
  tier: BudgetTier;
}

export interface Destination {
  id: string;
  name: { en: string; ar: string };
  lat: number;
  lng: number;
  region: { en: Region; ar: string };
  categories: Category[];
  company: { en: string; ar: string };
  avg_visit_duration_minutes: number;
  ticket_cost_omr: number;
  recommended_months: Month[];
  crowd_level: CrowdLevel;
  // Derived / display helpers
  description?: { en: string; ar: string };
  imageUrl?: string;
  hotels?: Hotel[];
}

// ─── Planner Input ────────────────────────────────────────────────────────────

export interface PlannerInput {
  days: number;            // 1–7
  budget: BudgetTier;
  month: Month;
  intensity: TravelIntensity;
  preferredCategories: Category[];
}

// ─── Algorithm Internals ─────────────────────────────────────────────────────

export interface ScoredDestination {
  destination: Destination;
  score: number;
  scoreBreakdown: ScoreBreakdown;
}

export interface ScoreBreakdown {
  interest: number;   // Jaccard component
  season: number;     // SeasonFit component
  crowd: number;      // -crowd penalty (already negated)
  cost: number;       // -cost penalty (already negated)
  detour: number;     // -detour penalty (already negated)
  diversity: number;  // diversity gain
  total: number;
}

// ─── Itinerary Output ─────────────────────────────────────────────────────────

export interface ScheduledStop {
  destination: Destination;
  arrivalTime: string;   // "09:00"
  departureTime: string; // "10:30"
  travelMinutesFromPrev: number;
  travelKmFromPrev: number;
  scoreBreakdown: ScoreBreakdown;
  topReasons: [string, number][];  // top 2 score components with values
}

export interface DayPlan {
  day: number;
  region: Region;
  stops: ScheduledStop[];
  totalKm: number;
  totalMinutes: number;
}

export interface CostBreakdown {
  fuelOmr: number;
  ticketsOmr: number;
  foodOmr: number;
  hotelOmr: number;
  totalOmr: number;
  totalKm: number;
  budgetFeasible: boolean;
  budgetThreshold: number;
}

export interface RegionPlan {
  region: Region;
  daysAssigned: number;
  startDay: number;
  endDay: number;
}

export interface GeneratedItinerary {
  input: PlannerInput;
  regionAllocation: RegionPlan[];
  days: DayPlan[];
  costBreakdown: CostBreakdown;
  generatedAt: number; // timestamp for cache-busting equality check
}
