import { describe, expect, it } from "vitest";

import { clampHeight, formatHeightRange, rangesOverlap } from "./catalog";

describe("rangesOverlap", () => {
  it("matches ranges that share a height, including at the edges", () => {
    expect(rangesOverlap({ min: 5, max: 9 }, { min: 4, max: 5 })).toBe(true);
    expect(rangesOverlap({ min: 5, max: 9 }, { min: 9, max: 10 })).toBe(true);
    expect(rangesOverlap({ min: 4, max: 10 }, { min: 6, max: 8 })).toBe(true);
  });

  it("rejects ranges with no height in common", () => {
    expect(rangesOverlap({ min: 6, max: 8 }, { min: 4, max: 5 })).toBe(false);
    expect(rangesOverlap({ min: 6, max: 8 }, { min: 9, max: 10 })).toBe(false);
  });
});

describe("clampHeight", () => {
  it("keeps heights inside the range", () => {
    expect(clampHeight(9, { min: 6, max: 8 })).toBe(8);
    expect(clampHeight(4, { min: 6, max: 8 })).toBe(6);
    expect(clampHeight(7, { min: 6, max: 8 })).toBe(7);
  });
});

describe("formatHeightRange", () => {
  it("formats a span or a single height", () => {
    expect(formatHeightRange({ min: 4, max: 10 })).toBe("4–10 ft");
    expect(formatHeightRange({ min: 6, max: 6 })).toBe("6 ft");
  });
});
