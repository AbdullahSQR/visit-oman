# Visit Oman — Discover & Plan

**CODESTACKER 2026 Submission** · Full-stack frontend tourism platform built with Next.js 14, TypeScript, and a custom in-browser itinerary optimiser.

---

## Project Setup

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (82 static pages)
npm start        # serve production build
```

Requires Node.js ≥ 18.

---

## Architecture Overview

```
src/
├── app/
│   ├── [locale]/              # SSR pages (en | ar)
│   │   ├── page.tsx           # Landing (SSR)
│   │   ├── destinations/      # Browse (SSR + URL-param filtering)
│   │   │   ├── page.tsx
│   │   │   └── [id]/page.tsx  # Details (statically pre-rendered per destination)
│   │   └── plan/page.tsx      # Planner entry (CSR)
│   └── layout.tsx
├── components/
│   ├── discovery/             # Landing + browse UI
│   ├── planner/               # Itinerary builder + display
│   ├── map/                   # Leaflet route map
│   └── ui/                    # Navbar, SaveInterestButton
└── lib/
    ├── data/destinations.ts   # 38-destination dataset
    ├── i18n/translations.ts   # en + ar strings
    ├── algorithm/             # Core planning engine
    │   ├── haversine.ts       # Distance calculations
    │   ├── scoring.ts         # Multi-objective scoring model
    │   ├── optimizer.ts       # Region allocation + DP + 2-opt
    │   └── budget.ts          # Cost estimation
    └── store/useAppStore.ts   # Zustand global state
```

### Rendering Strategy

| Page | Strategy | Reason |
|------|----------|--------|
| Landing | SSR | Hero content, featured destinations derived server-side from dataset |
| Destinations Browse | SSR + CSR | Server renders initial filter state from URL params; client handles subsequent filter changes |
| Destination Detail | SSG (pre-rendered) | Static at build time — no client-only dependencies for core content |
| Plan Trip | CSR | All itinerary computation runs in the browser; must not touch server |

---

## State Management

**Zustand** with `persist` middleware backed by `localStorage`:

| Slice | Contents | Persisted |
|-------|----------|-----------|
| `savedIds` | User's saved destination IDs | ✅ |
| `plannerInput` | Last planner form values | ✅ |
| `itinerary` | Generated itinerary | ✅ |
| `locale` | Current language | ✅ |

Refresh-safe: all user data survives page reload and navigation.

---

## Itinerary Generation Algorithm

### Overview

The planner implements a **two-phase hierarchical optimiser** that runs entirely in the browser. No external APIs, no random selection.

### Phase A — Region Allocation (Global Planning)

**Goal:** Distribute trip days across Oman's 6 regions, maximising utility while enforcing diversity.

**Region scoring:**
```
regionScore(r) = 0.6 × avg(seasonFit for all dests in r)
               + 0.4 × categoryOverlap(userPreferences, r)
```

**Allocation algorithm:**
1. Score all viable regions (those with ≥1 destination)
2. Proportional greedy allocation: `days[r] ∝ regionScore[r]`
3. Cap per region at `ceil(days / 2)` — prevents monopoly
4. Enforce minimum 2 regions for trips ≥ 3 days
5. Distribute leftover days to top-scored regions under cap
6. Tie-breaking uses lexicographic region ID for determinism

**Output example (5-day trip in April, category: culture + mountain):**
```
Day 1–2: Muscat       (trip origin; cultural breadth)
Day 3–4: Dakhiliya    (high season fit: forts, mountains)
Day 5:   Sharqiya     (beach diversity)
```
Region order is determined by a nearest-neighbour centroid traversal always starting from Muscat, minimising inter-region backtracking.

### Phase B — Intra-Region Stop Selection (DP Knapsack)

For each region block and each day within it:

**Time-bounded knapsack DP:**
- Capacity: `MAX_DAILY_MINUTES (480) − avgNearestNeighbourMins(region)`
- Travel overhead is **region-specific**: computed as the average nearest-neighbour distance between destinations within that region, converted to minutes at 70 km/h. Compact regions like Muscat subtract ~30 min; spread-out regions like Dhofar subtract more.
- Items: destinations, weights = `avg_visit_duration_minutes`, values = composite score
- Max items: `{relaxed: 3, balanced: 4, packed: 5}`

```
dp[i][t] = max score using first i destinations with time budget t
           and stop count ≤ maxStops
```

Backtracking recovers the optimal subset. Complexity: O(n × T) ≤ O(15 × 480) per day — negligible.

**Rest gap constraint:** each destination's DP item weight is `avg_visit_duration_minutes + 15`. The 15-minute buffer is baked into the item cost, so the knapsack budget constraint naturally enforces breathing room between consecutive activities — no separate adjacency check needed.

### 2-opt Route Optimisation

After DP selects stops, their order is optimised to minimise driving distance:

```
while improved:
  for each pair (i, k):
    if reversing segment [i..k] reduces totalKm:
      apply reversal; improved = true
```

For ≤5 stops this converges in 1–2 passes. Guaranteed deterministic (no random restarts).

### Multi-Objective Scoring Model

```
score(dest) =
  0.30 × Jaccard(userCategories, destCategories)   // interest match
+ 0.25 × SeasonFit(month, recommendedMonths)        // seasonal relevance
- 0.15 × Normalize(crowdLevel, 1, 5)                // crowd avoidance
- 0.10 × Normalize(ticketCost, 0, maxCost)          // budget sensitivity
- 0.10 × Normalize(detourKm, 0, 250)                // routing efficiency
+ 0.10 × DiversityGain(dest, selectedSet)           // category variety
```

**Weight rationale:**
- `interest (0.30)`: Primary driver — visitors should see what they came for
- `season (0.25)`: Oman has extreme seasonal variation (Khareef rain, turtle nesting, Jebel Akhdar roses). Visiting out of season significantly degrades experience
- `crowd (0.15)`: Oman Vision 2040 explicitly targets tourist distribution away from Muscat honeypots
- `cost (0.10)`: Soft signal; hard budget enforcement handled separately
- `detour (0.10)`: Encourages routing efficiency; penalises large backtracking
- `diversity (0.10)`: Prevents monotonous single-category days

**All components normalised to [0,1] before weighting.**

### Distance Calculation

Haversine formula (no external APIs):
```typescript
const a = sin²(Δlat/2) + cos(lat₁)·cos(lat₂)·sin²(Δlng/2)
d = 2R · atan2(√a, √(1−a))
```

Travel time: `km / 70 km/h` (average Omani road speed).

### Determinism Guarantee

- No `Math.random()` anywhere in the codebase
- All tie-breaking uses `.localeCompare()` on destination IDs (lexicographic, stable)
- Identical `PlannerInput` always produces identical `GeneratedItinerary`

---

## Budget Estimation — Spec Compliance

The budget formula implements the contest specification exactly:

```
fuel    = totalKm / 12 × 0.22 OMR   (12 km/l, 0.22 OMR/l)
tickets = Σ ticket_cost_omr per destination visited
food    = 6 OMR × days               (fixed — same for all budget tiers, per spec)
hotel   = rate × nights
          low: 20 OMR | medium: 45 OMR | luxury: 90 OMR   (per spec)
```

**Budget thresholds (per-day cap):**
| Tier | Threshold |
|------|-----------|
| Low | 50 OMR/day |
| Medium | 100 OMR/day |
| Luxury | 200 OMR/day |

If total exceeds threshold, the optimizer's DP phase excludes high-cost destinations (via cost penalty weight), keeping category coverage maximal.

### Hotel display vs. formula rate

The "Where to Stay" section on destination detail pages and the hotel recommendations panel in the cost breakdown display **real named hotels** with market-approximate prices (e.g. Grand Hyatt Muscat 135 OMR/night, Anantara Al Jabal Al Akhdar 215 OMR/night, Hilton Salalah 82 OMR/night). These are **illustrative recommendations for the user** — they do not feed into the budget formula. The formula always uses the spec-mandated flat rates (20 / 45 / 90 OMR) for all feasibility and threshold calculations.

### Fuel cost note

Fuel is calculated over the **full trip distance**, including inter-region travel legs between days (e.g. the Muscat → Sharqiya ~200 km drive at the start of day 2 is included). Earlier naive implementations only summed intra-day stop distances, which significantly underestimated fuel for multi-region trips. The cost breakdown displays the km basis and formula inline (`{X} km · 12 km/l · 0.22 OMR/l`) for transparency.

---

## Performance Considerations

- **Static generation**: All 38 destination detail pages (× 2 locales = 76) pre-rendered at build time; 82 static pages total
- **Code splitting**: Leaflet (~150KB) loaded only on pages that need maps via `next/dynamic`
- **Image pipeline**: All destination photos served from Cloudinary CDN with `f_auto,q_auto` — automatic WebP/AVIF selection per browser. `next/image` with `fill` layout handles lazy loading on cards; `priority` prop on detail page heroes preloads the LCP image
- **Zustand**: Minimal re-renders via selector subscriptions
- **Algorithm**: Worst case O(n²) for 2-opt with n≤5 is < 1ms; DP runs in < 5ms per day
- **URL state**: Filter changes use `router.replace` (no scroll, no full navigation)

---

## Known Limitations & Tradeoffs

1. **Haversine vs road distance**: Great-circle distance underestimates actual road distance, particularly in mountainous regions (Jebel Shams). A 1.4× road multiplier could improve accuracy without an API.
2. **Single traveller assumed**: Hotel cost model doesn't account for group travel.
3. **No opening hours**: Visit time feasibility doesn't check business hours (e.g. mosques, souqs).
4. **Region transition days**: When switching regions mid-trip, the first stop of the new region absorbs all inter-region travel time. A dedicated "travel day" could be modelled for distant regions (e.g. Muscat → Salalah by plane).
5. **Dataset size**: 38 destinations is sufficient for demonstration but a production system would need hundreds, requiring pagination and lazy loading of the DP candidates.

---

## Algorithm Documentation (Contest Requirement)

### Why DP + 2-opt?

| Approach | Why chosen | Tradeoff |
|----------|-----------|----------|
| DP knapsack (stop selection) | Optimal under time constraints; avoids greedy suboptimality when a lower-scoring short stop enables a higher-scoring later stop | O(n×T) — bounded, deterministic |
| 2-opt (route ordering) | Near-optimal for small n; simple, deterministic, well-understood | Only locally optimal; TSP-optimal would require exponential time |

A pure greedy approach would select the highest-scoring stop each iteration, missing combinations like "two medium-scored stops that together fit in the time budget better than one high-scored long stop." DP captures this.

A random restart approach (simulated annealing) was considered but rejected because: (a) the contest mandates determinism, and (b) for n≤5 stops per day, 2-opt achieves the global minimum in practice.

---

## i18n

Full Arabic (RTL) and English (LTR) support:
- Locale detection and redirect handled at the **edge via Next.js middleware** (`src/middleware.ts`) — no client-side flash, no server component involvement
- `dir="rtl"` / `lang` set on `<html>` in the root layout, read from a request header forwarded by middleware
- All UI strings in `src/lib/i18n/translations.ts`
- Dataset has `name.ar`, `region.ar`, `company.ar`, `description.ar` for every destination
- Month names, region labels, and UI chrome fully translated
- URL-based locale switching (`/en/...` ↔ `/ar/...`)
