export type Silhouette = "full" | "slim";

export const plannerLimits = {
  ceiling: { min: 6, max: 20, step: 0.5, initial: 8 },
  allowance: { min: 6, max: 48, step: 1, initial: 12 },
} as const;

const INCHES_PER_FOOT = 12;
const METRES_PER_FOOT = 0.3048;

/**
 * Tallest tree (in feet, rounded down to 0.1 ft) that fits beneath the ceiling
 * once the stand and topper allowance is subtracted. Never rounds up, so the
 * estimate errs on the side of a tree that fits.
 */
export function maxTreeHeight(ceilingFeet: number, allowanceInches: number): number {
  const feet = ceilingFeet - allowanceInches / INCHES_PER_FOOT;
  // The epsilon guards against binary float error (e.g. 7.999… flooring to 7.9).
  return Math.max(0, Math.floor(feet * 10 + 1e-9) / 10);
}

/** Visual scale for the illustrated tree relative to the drawn room. */
export function treeScale(treeFeet: number, ceilingFeet: number): number {
  if (ceilingFeet <= 0) return 0.15;
  return Math.min(1.05, Math.max(0.15, (treeFeet / ceilingFeet) * 1.14));
}

export function feetToMetres(feet: number): number {
  return Math.round(feet * METRES_PER_FOOT * 100) / 100;
}

const feetFormat = new Intl.NumberFormat("en-US", { maximumFractionDigits: 1 });

export function formatFeet(feet: number): string {
  return `${feetFormat.format(feet)} ft`;
}
