import { describe, it, expect } from "vitest";
import { jaccardInterest, seasonFit } from "../scoring";

describe("jaccardInterest", () => {
  it("returns 0.5 when user has no preferences", () => {
    expect(jaccardInterest([], ["mountain", "beach"])).toBe(0.5);
  });

  it("returns 1.0 when sets are identical", () => {
    expect(jaccardInterest(["beach", "culture"], ["beach", "culture"])).toBe(1.0);
  });

  it("returns 0 when sets are disjoint", () => {
    expect(jaccardInterest(["mountain"], ["beach"])).toBe(0);
  });

  it("computes Jaccard correctly for partial overlap", () => {
    // |{beach} ∩ {beach, culture}| / |{beach, culture}| = 1/2
    expect(jaccardInterest(["beach"], ["beach", "culture"])).toBeCloseTo(1 / 2);
  });

  it("is symmetric", () => {
    const a = jaccardInterest(["mountain", "desert"], ["desert", "nature"]);
    const b = jaccardInterest(["desert", "nature"], ["mountain", "desert"]);
    expect(a).toBeCloseTo(b);
  });
});

describe("seasonFit", () => {
  it("returns 1.0 when month is in recommended list", () => {
    expect(seasonFit(10, [9, 10, 11])).toBe(1.0);
  });

  it("returns 0.5 when recommended list is empty", () => {
    expect(seasonFit(5, [])).toBe(0.5);
  });

  it("returns 0 when 6 months away (max distance)", () => {
    // month=1, closest recommended=7 → circular dist = min(6, 6) = 6 → 1 - 6/6 = 0
    expect(seasonFit(1, [7])).toBe(0);
  });

  it("handles circular wrap-around correctly", () => {
    // month=12, recommended=[1] → diff=11, circular=min(11,1)=1 → 1-1/6 ≈ 0.833
    expect(seasonFit(12, [1])).toBeCloseTo(1 - 1 / 6);
  });

  it("handles month=1 wrapping to month=12", () => {
    // month=1, recommended=[12] → diff=11, circular=min(11,1)=1 → 1-1/6
    expect(seasonFit(1, [12])).toBeCloseTo(1 - 1 / 6);
  });

  it("returns the same value on repeated calls (cache hit)", () => {
    const first  = seasonFit(3, [3, 4, 5]);
    const second = seasonFit(3, [3, 4, 5]);
    expect(first).toBe(second);
  });

  it("decays linearly — 3 months off = 0.5", () => {
    // month=4, recommended=[7] → dist=3 → 1-3/6=0.5
    expect(seasonFit(4, [7])).toBeCloseTo(0.5);
  });

  it("picks the closest recommended month when multiple exist", () => {
    // month=5, recommended=[2,8] → dists = min(3,9)=3, min(3,9)=3 → 0.5
    expect(seasonFit(5, [2, 8])).toBeCloseTo(0.5);
  });
});
