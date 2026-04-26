import { describe, it, expect } from "vitest";
import { distanceKm, totalKm, travelMinutes } from "../haversine";

// Known reference: Muscat (23.5880°N 58.3829°E) to Nizwa (22.9333°N 57.5333°E)
// Haversine ≈ 111 km  (actual road ~165 km but haversine is great-circle)
const MUSCAT = { lat: 23.5880, lng: 58.3829 };
const NIZWA  = { lat: 22.9333, lng: 57.5333 };

describe("distanceKm", () => {
  it("returns 0 for identical points", () => {
    expect(distanceKm(MUSCAT, MUSCAT)).toBeCloseTo(0, 3);
  });

  it("computes Muscat-Nizwa distance within ±5 km of reference", () => {
    const d = distanceKm(MUSCAT, NIZWA);
    expect(d).toBeGreaterThan(100);
    expect(d).toBeLessThan(120);
  });

  it("is symmetric — dist(A,B) === dist(B,A)", () => {
    expect(distanceKm(MUSCAT, NIZWA)).toBeCloseTo(distanceKm(NIZWA, MUSCAT), 6);
  });

  it("increases with greater separation", () => {
    const close = distanceKm({ lat: 0, lng: 0 }, { lat: 0, lng: 1 });
    const far   = distanceKm({ lat: 0, lng: 0 }, { lat: 0, lng: 5 });
    expect(far).toBeGreaterThan(close);
  });
});

describe("totalKm", () => {
  it("returns 0 for a single point", () => {
    expect(totalKm([MUSCAT])).toBe(0);
  });

  it("returns 0 for empty array", () => {
    expect(totalKm([])).toBe(0);
  });

  it("equals distanceKm for exactly two points", () => {
    expect(totalKm([MUSCAT, NIZWA])).toBeCloseTo(distanceKm(MUSCAT, NIZWA), 6);
  });

  it("sums segments for three points", () => {
    const SALALAH = { lat: 17.0151, lng: 54.0924 };
    const expected = distanceKm(MUSCAT, NIZWA) + distanceKm(NIZWA, SALALAH);
    expect(totalKm([MUSCAT, NIZWA, SALALAH])).toBeCloseTo(expected, 6);
  });
});

describe("travelMinutes", () => {
  it("returns 0 for identical points", () => {
    expect(travelMinutes(MUSCAT, MUSCAT)).toBeCloseTo(0, 3);
  });

  it("is proportional to distance at 70 km/h", () => {
    const d = distanceKm(MUSCAT, NIZWA);
    const expectedMins = (d / 70) * 60;
    expect(travelMinutes(MUSCAT, NIZWA)).toBeCloseTo(expectedMins, 4);
  });

  it("takes longer for farther destinations", () => {
    const SALALAH = { lat: 17.0151, lng: 54.0924 };
    expect(travelMinutes(MUSCAT, SALALAH)).toBeGreaterThan(travelMinutes(MUSCAT, NIZWA));
  });
});
