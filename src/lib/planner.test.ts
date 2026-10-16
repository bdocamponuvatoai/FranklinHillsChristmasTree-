import { describe, expect, it } from "vitest";

import { feetToMetres, formatFeet, maxTreeHeight, treeScale } from "./planner";

describe("maxTreeHeight", () => {
  it("subtracts the stand and topper allowance from the ceiling", () => {
    expect(maxTreeHeight(8, 12)).toBe(7);
    expect(maxTreeHeight(10, 18)).toBe(8.5);
  });

  it("rounds down so the estimate always fits", () => {
    // 8.5 ft − 13 in = 7.4166… ft
    expect(maxTreeHeight(8.5, 13)).toBe(7.4);
  });

  it("is not tripped up by floating point error", () => {
    // 8.2 − 2.4/12 = 7.999999999999999 in IEEE-754
    expect(maxTreeHeight(8.2, 2.4)).toBe(8);
  });

  it("never returns a negative height", () => {
    expect(maxTreeHeight(1, 48)).toBe(0);
  });
});

describe("treeScale", () => {
  it("clamps to a visible minimum and maximum", () => {
    expect(treeScale(0, 8)).toBe(0.15);
    expect(treeScale(20, 8)).toBe(1.05);
    expect(treeScale(5, 0)).toBe(0.15);
  });

  it("scales proportionally between the bounds", () => {
    expect(treeScale(4, 8)).toBeCloseTo(0.57);
  });
});

describe("formatting", () => {
  it("formats feet with at most one decimal", () => {
    expect(formatFeet(7)).toBe("7 ft");
    expect(formatFeet(7.4)).toBe("7.4 ft");
  });

  it("converts feet to metres", () => {
    expect(feetToMetres(7)).toBe(2.13);
  });
});
