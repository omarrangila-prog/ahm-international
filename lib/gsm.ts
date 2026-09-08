/**
 * FABRIC WEIGHT ARITHMETIC
 * ========================
 *
 * Separated from the UI because these are the only numbers on this site a
 * visitor can check against their own calculator, and a wrong constant here
 * would be quoted back to a mill.
 *
 * Everything below is either a defined unit conversion or division. Nothing is
 * a claim about AHM, a mill, or a fabric: `ozPerYd2ToGsm` is exact by the
 * definition of the ounce and the yard, and `swatchGsm` is mass over area.
 *
 * What is deliberately absent is fabric consumption per garment. That is the
 * number a buyer most wants, and it cannot be computed from a weight: it comes
 * from the marker, which depends on the pattern, the size ratio, the fabric
 * width and the nap. Publishing a rule of thumb for it would be inventing a
 * figure a buyer would cost against.
 */

/* The international avoirdupois ounce and the international yard, both exact
   by definition since 1959. Written out rather than pre-multiplied so the
   derivation is checkable. */
const GRAMS_PER_OUNCE = 28.349523125;
const METRES_PER_YARD = 0.9144;
const SQ_METRES_PER_SQ_YARD = METRES_PER_YARD * METRES_PER_YARD; // 0.83612736

/**
 * 1 oz/yd² in g/m² — about 33.9057.
 *
 * This is the conversion that costs real money in apparel sourcing: buyers in
 * the US and UK specify ounces per square yard, mills across Asia quote grams
 * per square metre, and a garment ordered at "7 oz" against a mill reading it
 * as 7 gsm is not a rounding error.
 */
export const GSM_PER_OZ_PER_SQ_YARD = GRAMS_PER_OUNCE / SQ_METRES_PER_SQ_YARD;

export const ozPerSqYardToGsm = (oz: number) => oz * GSM_PER_OZ_PER_SQ_YARD;
export const gsmToOzPerSqYard = (gsm: number) => gsm / GSM_PER_OZ_PER_SQ_YARD;

/**
 * GSM from a weighed swatch.
 *
 * `areaCm2` rather than a fixed cutter size, because a hand-cut rectangle is
 * what most people actually have. A standard round GSM cutter takes exactly
 * 100 cm², which is why the shortcut of "multiply the grams by 100" works —
 * and why it silently gives the wrong answer for any other swatch.
 */
export function swatchGsm(weightGrams: number, areaCm2: number): number | null {
  if (!(weightGrams > 0) || !(areaCm2 > 0)) return null;
  return weightGrams / (areaCm2 / 10_000);
}

/** Area of a round cutter swatch, for a given diameter in centimetres. */
export const circleAreaCm2 = (diameterCm: number) => Math.PI * (diameterCm / 2) ** 2;

/** The standard round GSM cutter: 100 cm², about 112.8 mm across. */
export const GSM_CUTTER_AREA_CM2 = 100;

/** Fabric mass for a known area — grams. */
export function fabricWeightGrams(gsm: number, areaSqMetres: number): number | null {
  if (!(gsm > 0) || !(areaSqMetres > 0)) return null;
  return gsm * areaSqMetres;
}

/**
 * Area of a fabric roll, from its length and usable width.
 *
 * Usable width, not full width: the selvedge is not cuttable, and a buyer
 * comparing two mill quotations on price per kilo needs the same basis on both.
 */
export function rollAreaSqMetres(lengthMetres: number, widthCm: number): number | null {
  if (!(lengthMetres > 0) || !(widthCm > 0)) return null;
  return lengthMetres * (widthCm / 100);
}

/** A published `typicalWeight` string — "180-220 gsm" — as numbers. */
export function parseWeightRange(typicalWeight: string): { min: number; max: number } | null {
  const match = typicalWeight.match(/(\d+)\s*[-–]\s*(\d+)/);
  if (!match) return null;
  const [min, max] = [Number(match[1]), Number(match[2])];
  return Number.isFinite(min) && Number.isFinite(max) ? { min, max } : null;
}

/** Whether a published weight range covers a given GSM. */
export function rangeCovers(typicalWeight: string, gsm: number): boolean {
  const range = parseWeightRange(typicalWeight);
  return range ? gsm >= range.min && gsm <= range.max : false;
}
