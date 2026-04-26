/**
 * Zod schemas for validating persisted localStorage state.
 *
 * localStorage data can be corrupted or stale (from an older schema version,
 * user edits, browser extensions, etc.). Zod lets us safely parse the raw
 * JSON and discard anything that doesn't match the expected shape rather than
 * crashing the whole app.
 *
 * Only the persisted slices need validation — transient UI state is fine.
 */

import { z } from "zod";

// ── Primitive enums ──────────────────────────────────────────────────────────

const LocaleSchema = z.enum(["en", "ar"]);

const BudgetTierSchema = z.enum(["low", "medium", "luxury"]);

const TravelIntensitySchema = z.enum(["relaxed", "balanced", "packed"]);

const CategorySchema = z.enum(["mountain", "beach", "culture", "desert", "nature", "food"]);

const MonthSchema = z.number().int().min(1).max(12);

const RegionSchema = z.enum(["muscat", "dakhiliya", "sharqiya", "dhofar", "batinah", "dhahira"]);

// ── PlannerInput ─────────────────────────────────────────────────────────────

export const PlannerInputSchema = z.object({
  days:                 z.number().int().min(1).max(14),
  budget:               BudgetTierSchema,
  month:                MonthSchema,
  intensity:            TravelIntensitySchema,
  preferredCategories:  z.array(CategorySchema),
});

// ── Destination (stored inline in itinerary) ──────────────────────────────────

const BilingualSchema = z.object({ en: z.string(), ar: z.string() });

const DestinationSchema = z.object({
  id:                         z.string(),
  name:                       BilingualSchema,
  lat:                        z.number(),
  lng:                        z.number(),
  region:                     z.object({ en: RegionSchema, ar: z.string() }),
  categories:                 z.array(CategorySchema),
  avg_visit_duration_minutes: z.number(),
  ticket_cost_omr:            z.number(),
  recommended_months:         z.array(MonthSchema),
  crowd_level:                z.number().int().min(1).max(5),
  description:                BilingualSchema.optional(),
  imageUrl:                   z.string().optional(),
});

// ── ScoreBreakdown ────────────────────────────────────────────────────────────

const ScoreBreakdownSchema = z.object({
  interest:  z.number(),
  season:    z.number(),
  crowd:     z.number(),
  cost:      z.number(),
  detour:    z.number(),
  diversity: z.number(),
  total:     z.number(),
});

// ── ScheduledStop ─────────────────────────────────────────────────────────────

const ScheduledStopSchema = z.object({
  destination:           DestinationSchema,
  arrivalTime:           z.string(),
  departureTime:         z.string(),
  travelMinutesFromPrev: z.number(),
  travelKmFromPrev:      z.number(),
  scoreBreakdown:        ScoreBreakdownSchema,
  topReasons:            z.array(z.tuple([z.string(), z.number()])),
});

// ── DayPlan ───────────────────────────────────────────────────────────────────

const DayPlanSchema = z.object({
  day:          z.number().int().positive(),
  region:       RegionSchema,
  stops:        z.array(ScheduledStopSchema),
  totalKm:      z.number(),
  totalMinutes: z.number(),
});

// ── CostBreakdown ─────────────────────────────────────────────────────────────

const CostBreakdownSchema = z.object({
  fuelOmr:        z.number(),
  ticketsOmr:     z.number(),
  foodOmr:        z.number(),
  hotelOmr:       z.number(),
  totalOmr:       z.number(),
  totalKm:        z.number(),
  budgetFeasible: z.boolean(),
  budgetThreshold: z.number(),
});

// ── RegionPlan ────────────────────────────────────────────────────────────────

const RegionPlanSchema = z.object({
  region:        RegionSchema,
  daysAssigned:  z.number().int().positive(),
  startDay:      z.number().int().positive(),
  endDay:        z.number().int().positive(),
});

// ── GeneratedItinerary ────────────────────────────────────────────────────────

export const GeneratedItinerarySchema = z.object({
  input:            PlannerInputSchema,
  regionAllocation: z.array(RegionPlanSchema),
  days:             z.array(DayPlanSchema),
  costBreakdown:    CostBreakdownSchema,
  generatedAt:      z.number(),
});

// ── Persisted store slice ─────────────────────────────────────────────────────

/**
 * The schema for the slice that Zustand writes to localStorage.
 * All fields are optional — a missing field means "use the store default".
 */
export const PersistedStateSchema = z.object({
  savedIds:     z.array(z.string()).optional().default([]),
  plannerInput: PlannerInputSchema.nullable().optional().default(null),
  itinerary:    GeneratedItinerarySchema.nullable().optional().default(null),
  locale:       LocaleSchema.optional().default("en"),
});

export type PersistedState = z.infer<typeof PersistedStateSchema>;
