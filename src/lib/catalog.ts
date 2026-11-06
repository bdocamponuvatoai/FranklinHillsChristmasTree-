/** Catalog helpers for tree height ranges and stand fit. Pure, so they can be unit tested. */

export type HeightRange = { min: number; max: number };

/** True when two inclusive height ranges share at least one height. */
export function rangesOverlap(a: HeightRange, b: HeightRange): boolean {
  return a.min <= b.max && b.min <= a.max;
}

/** Keeps a height inside a tree's available range. */
export function clampHeight(heightFeet: number, range: HeightRange): number {
  return Math.min(range.max, Math.max(range.min, heightFeet));
}

/** "4–10 ft", or "6 ft" when the range is a single height. */
export function formatHeightRange({ min, max }: HeightRange): string {
  return min === max ? `${min} ft` : `${min}–${max} ft`;
}
