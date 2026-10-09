/**
 * FABRIC SHRINKAGE ARITHMETIC
 * ===========================
 *
 * Separated from the UI for the same reason as `lib/gsm.ts`: these are numbers
 * a buyer can check on their own calculator, and a wrong formula would be
 * quoted into a tech pack.
 *
 * Shrinkage percent is dimensional change:
 *   (original − final) / original × 100
 *
 * Positive means the cloth got shorter or narrower. Negative means it grew
 * (extension), which some knits show after wash. Zero is exact stability.
 *
 * Nothing here is a claim about AHM, a mill, or an acceptable tolerance. Those
 * belong in the specification against a named test method.
 */

/**
 * Shrinkage as a percentage of the original dimension.
 *
 * Returns null when the original is not a positive finite number, or when the
 * final measurement is not a finite number (including negative — a tape reading
 * cannot be negative).
 */
export function shrinkagePercent(original: number, final: number): number | null {
  if (!(original > 0) || !Number.isFinite(original)) return null;
  if (!Number.isFinite(final) || final < 0) return null;
  return ((original - final) / original) * 100;
}

/** Round for display: one decimal is enough for apparel lab conversation. */
export function formatShrinkagePercent(value: number): string {
  const rounded = Math.round(value * 10) / 10;
  if (Object.is(rounded, -0) || rounded === 0) return "0";
  return rounded.toFixed(1);
}

export type DirectionResult = {
  percent: number;
  /** Human label for whether the cloth contracted, grew, or held. */
  reading: "shrinkage" | "extension" | "stable";
};

export function directionResult(original: number, final: number): DirectionResult | null {
  const percent = shrinkagePercent(original, final);
  if (percent === null) return null;
  const reading =
    Math.abs(percent) < 0.05 ? "stable" : percent > 0 ? "shrinkage" : "extension";
  return { percent, reading };
}
