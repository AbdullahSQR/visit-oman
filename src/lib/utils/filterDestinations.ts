import type { Destination, Category, Month } from "@/lib/types";

export interface DestinationFilters {
  category: string;
  region: string;
  season: string;
  sort: string;
}

export function filterDestinations(
  destinations: Destination[],
  filters: DestinationFilters
): Destination[] {
  let r = [...destinations];
  if (filters.category) r = r.filter((d) => d.categories.includes(filters.category as Category));
  if (filters.region)   r = r.filter((d) => d.region.en === filters.region);
  if (filters.season)   r = r.filter((d) => d.recommended_months.includes(parseInt(filters.season) as Month));
  if (filters.sort === "crowd") r.sort((a, b) => a.crowd_level - b.crowd_level);
  if (filters.sort === "cost")  r.sort((a, b) => a.ticket_cost_omr - b.ticket_cost_omr);
  return r;
}
