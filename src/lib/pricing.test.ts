import { describe, expect, it } from "vitest";

import { buildEstimate, deliveryQuote, formatPrice, treePrice } from "./pricing";

const delivery = { baseFee: 25, includedMiles: 5, perMile: 2.5, maxMiles: 25 };
const rules = { roundTo: 5, delivery };

describe("treePrice", () => {
  it("multiplies height by the rate per foot", () => {
    expect(treePrice(5, 14, 5)).toBe(70);
  });

  it("rounds to the nearest $5", () => {
    // 7 ft × $18 = $126, 6 ft × $14 = $84
    expect(treePrice(7, 18, 5)).toBe(125);
    expect(treePrice(6, 14, 5)).toBe(85);
  });

  it("handles fractional rates", () => {
    // 7 ft × $14.50 = $101.50
    expect(treePrice(7, 14.5, 5)).toBe(100);
  });
});

describe("deliveryQuote", () => {
  it("is free for pickup", () => {
    expect(deliveryQuote(null, delivery)).toEqual({ kind: "pickup", fee: 0 });
  });

  it("charges only the base fee within the included miles", () => {
    expect(deliveryQuote(5, delivery)).toEqual({
      kind: "delivery",
      miles: 5,
      extraMiles: 0,
      fee: 25,
    });
  });

  it("adds each extra mile, rounded up", () => {
    expect(deliveryQuote(8, delivery)).toMatchObject({ extraMiles: 3, fee: 32.5 });
    expect(deliveryQuote(5.2, delivery)).toMatchObject({ extraMiles: 1, fee: 27.5 });
  });

  it("prices up to the maximum distance and sends anything further to the phone", () => {
    expect(deliveryQuote(25, delivery)).toMatchObject({ kind: "delivery", fee: 75 });
    expect(deliveryQuote(26, delivery)).toEqual({ kind: "out-of-area", miles: 26 });
  });
});

describe("buildEstimate", () => {
  it("adds the tree, stand and delivery", () => {
    const estimate = buildEstimate(
      { heightFeet: 7, ratePerFoot: 18, standPrice: 45, deliveryMiles: 8 },
      rules,
    );
    expect(estimate).toMatchObject({ tree: 125, stand: 45, total: 202.5 });
  });

  it("counts no stand and pickup as zero", () => {
    const estimate = buildEstimate(
      { heightFeet: 6, ratePerFoot: 14, standPrice: null, deliveryMiles: null },
      rules,
    );
    expect(estimate.total).toBe(85);
  });

  it("leaves an out-of-area delivery out of the total", () => {
    const estimate = buildEstimate(
      { heightFeet: 6, ratePerFoot: 14, standPrice: 30, deliveryMiles: 30 },
      rules,
    );
    expect(estimate.delivery.kind).toBe("out-of-area");
    expect(estimate.total).toBe(115);
  });
});

describe("formatPrice", () => {
  it("drops cents for whole dollars and keeps them otherwise", () => {
    expect(formatPrice(125)).toBe("$125");
    expect(formatPrice(32.5)).toBe("$32.50");
    expect(formatPrice(1250)).toBe("$1,250");
  });
});
