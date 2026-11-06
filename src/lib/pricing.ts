/**
 * Pricing maths for trees, stands and delivery. The rates themselves live in
 * `pricing` in content/site.ts; everything here is pure so it can be unit tested.
 */

export type DeliveryRules = {
  /** Flat fee that covers the first `includedMiles`. */
  baseFee: number;
  includedMiles: number;
  /** Charged for each mile beyond `includedMiles`, rounded up to whole miles. */
  perMile: number;
  /** Furthest delivery priced on the site; anything beyond is arranged by phone. */
  maxMiles: number;
};

export type PricingRules = {
  /** Tree prices are rounded to the nearest multiple of this amount. */
  roundTo: number;
  delivery: DeliveryRules;
};

export type DeliveryQuote =
  | { kind: "pickup"; fee: 0 }
  | { kind: "delivery"; miles: number; extraMiles: number; fee: number }
  | { kind: "out-of-area"; miles: number };

export type Estimate = {
  tree: number;
  stand: number;
  delivery: DeliveryQuote;
  total: number;
};

/** Height × the profile's rate per foot, rounded to the nearest `roundTo` dollars. */
export function treePrice(heightFeet: number, ratePerFoot: number, roundTo: number): number {
  // The epsilon keeps binary float error from flipping an exact half-way value.
  return Math.round((heightFeet * ratePerFoot) / roundTo + 1e-9) * roundTo;
}

/** Pickup is free; delivery is the base fee plus each extra mile, up to `maxMiles`. */
export function deliveryQuote(miles: number | null, rules: DeliveryRules): DeliveryQuote {
  if (miles === null) return { kind: "pickup", fee: 0 };
  if (miles > rules.maxMiles) return { kind: "out-of-area", miles };
  const extraMiles = Math.max(0, Math.ceil(miles - rules.includedMiles - 1e-9));
  return { kind: "delivery", miles, extraMiles, fee: rules.baseFee + extraMiles * rules.perMile };
}

/**
 * Line-by-line estimate. An out-of-area delivery adds nothing to the total,
 * because that trip is priced by phone.
 */
export function buildEstimate(
  input: {
    heightFeet: number;
    ratePerFoot: number;
    standPrice: number | null;
    deliveryMiles: number | null;
  },
  rules: PricingRules,
): Estimate {
  const tree = treePrice(input.heightFeet, input.ratePerFoot, rules.roundTo);
  const stand = input.standPrice ?? 0;
  const delivery = deliveryQuote(input.deliveryMiles, rules.delivery);
  const deliveryFee = delivery.kind === "delivery" ? delivery.fee : 0;
  return { tree, stand, delivery, total: tree + stand + deliveryFee };
}

const wholeDollars = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});
const dollarsAndCents = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
});

/** "$125" for whole dollars, "$32.50" otherwise. */
export function formatPrice(amount: number): string {
  return Number.isInteger(amount) ? wholeDollars.format(amount) : dollarsAndCents.format(amount);
}
