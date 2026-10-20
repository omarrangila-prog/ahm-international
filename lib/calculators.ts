/**
 * BUYER CALCULATORS: the arithmetic.
 *
 * Every function here is either a defined unit conversion or plain arithmetic
 * on numbers the visitor supplies. None of them contains a rate, a price, a
 * yield or a rule of thumb for any factory, mill or freight lane: a tool that
 * needs one asks for it as an input. That is the line between a calculator and
 * a made-up quotation, and tests/calculators.test.ts holds both sides of it.
 *
 * Separated from the UI so each can be tested against a worked example.
 * Fabric-weight conversions (gsm and oz/yd²) live in lib/gsm.ts.
 */

const finite = (n: number) => Number.isFinite(n);
const pos = (n: number) => finite(n) && n > 0;

/* ------------------------------ unit conversion ----------------------------- */

/**
 * Units by dimension, each as its size in the base unit (metre, square metre,
 * gram). Every factor is exact by definition: the inch has been 2.54 cm, the
 * yard 0.9144 m and the pound 453.59237 g since 1959.
 */
export const UNITS = {
  length: { mm: 0.001, cm: 0.01, m: 1, in: 0.0254, ft: 0.3048, yd: 0.9144 },
  area: { "cm²": 0.0001, "m²": 1, "in²": 0.0254 ** 2, "ft²": 0.3048 ** 2, "yd²": 0.9144 ** 2 },
  mass: { g: 1, kg: 1000, oz: 28.349523125, lb: 453.59237 },
} as const;

export type Dimension = keyof typeof UNITS;

export function convertUnit(dimension: Dimension, value: number, from: string, to: string): number | null {
  const table = UNITS[dimension] as Record<string, number>;
  if (!finite(value) || !(from in table) || !(to in table)) return null;
  return (value * table[from]) / table[to];
}

/* -------------------------------- yarn count -------------------------------- */

/**
 * Yarn count systems. Tex is grams per 1,000 m (direct: higher is coarser);
 * denier is grams per 9,000 m; Nm is metres per gram and Ne (English cotton
 * count) is 840-yard hanks per pound (both indirect: higher is finer).
 *
 * Ne to tex is 453.59237 g / (840 yd = 768.096 m) per km = 590.5412 tex. The
 * constant is derived, not remembered.
 */
const TEX_PER_NE = (453.59237 / (840 * 0.9144)) * 1000; // 590.5412...

export type YarnSystem = "tex" | "denier" | "nm" | "ne";

export function yarnCounts(value: number, system: YarnSystem): Record<YarnSystem, number> | null {
  if (!pos(value)) return null;
  const tex = system === "tex" ? value : system === "denier" ? value / 9 : system === "nm" ? 1000 / value : TEX_PER_NE / value;
  return { tex, denier: tex * 9, nm: 1000 / tex, ne: TEX_PER_NE / tex };
}

/* ------------------------------ fabric, by weight ----------------------------- */

/** Kilograms in a length of fabric, from its weight per area and width. */
export function fabricKg(gsm: number, widthM: number, lengthM: number): number | null {
  if (!pos(gsm) || !pos(widthM) || !pos(lengthM)) return null;
  return (gsm * widthM * lengthM) / 1000;
}

/** Metres of fabric in a mass, the inverse of the above. */
export function fabricMetres(gsm: number, widthM: number, kg: number): number | null {
  if (!pos(gsm) || !pos(widthM) || !pos(kg)) return null;
  return (kg * 1000) / (gsm * widthM);
}

/**
 * Fabric priced per kilogram, per metre and per yard.
 *
 * Mills often quote per kg and cutting rooms plan in metres, so a quotation
 * can only be compared once both are on one basis. Uses the width the price
 * refers to; a price per kg on cuttable width is a different number.
 */
export function fabricPrice(input: { gsm: number; widthM: number; pricePerKg?: number; pricePerMetre?: number }) {
  const { gsm, widthM } = input;
  if (!pos(gsm) || !pos(widthM)) return null;
  const kgPerMetre = (gsm * widthM) / 1000;
  const pricePerKg = pos(input.pricePerKg ?? NaN) ? input.pricePerKg! : pos(input.pricePerMetre ?? NaN) ? input.pricePerMetre! / kgPerMetre : null;
  if (pricePerKg === null) return null;
  const pricePerMetre = pricePerKg * kgPerMetre;
  return { kgPerMetre, pricePerKg, pricePerMetre, pricePerYard: pricePerMetre * 0.9144, metresPerKg: 1 / kgPerMetre };
}

/* ------------------------------ marker consumption ---------------------------- */

/**
 * Fabric from a real marker.
 *
 * Consumption per garment is the marker's length divided by the garments in it.
 * It cannot be derived from a weight or guessed from a garment type, which is
 * why this asks for the marker: the number it needs comes from the buyer's own
 * pattern layout, and the allowance for spreading ends and defects from their
 * own process. `efficiency` is shown only when the pattern area is given.
 */
export function markerConsumption(input: {
  markerLengthM: number;
  garmentsInMarker: number;
  usableWidthM: number;
  quantity: number;
  allowancePct: number;
  patternAreaM2?: number;
  gsm?: number;
}) {
  const { markerLengthM, garmentsInMarker, usableWidthM, quantity, allowancePct } = input;
  if (!pos(markerLengthM) || !pos(garmentsInMarker) || !pos(usableWidthM) || !pos(quantity)) return null;
  if (!finite(allowancePct) || allowancePct < 0) return null;
  const perGarmentM = markerLengthM / garmentsInMarker;
  const totalM = perGarmentM * quantity * (1 + allowancePct / 100);
  const efficiency = pos(input.patternAreaM2 ?? NaN) ? (input.patternAreaM2! * garmentsInMarker) / (markerLengthM * usableWidthM) : null;
  return {
    perGarmentM,
    totalM,
    totalYd: totalM / 0.9144,
    totalKg: pos(input.gsm ?? NaN) ? fabricKg(input.gsm!, usableWidthM, totalM) : null,
    /** 0..1, or null when the pattern area was not given. Above 1 means the inputs disagree. */
    efficiency,
  };
}

/* ----------------------------------- size runs ---------------------------------- */

/**
 * Splits an order across sizes in proportion to a ratio, in whole garments.
 *
 * Largest-remainder rounding, so the sizes always add up to the order and no
 * size is more than one garment from its exact share.
 */
export function splitSizes(total: number, ratios: { size: string; ratio: number }[]) {
  const live = ratios.filter((r) => finite(r.ratio) && r.ratio > 0);
  const sum = live.reduce((a, r) => a + r.ratio, 0);
  if (!Number.isInteger(total) || total <= 0 || sum <= 0) return null;
  const exact = live.map((r) => ({ size: r.size, share: (total * r.ratio) / sum }));
  const rows = exact.map((e) => ({ size: e.size, qty: Math.floor(e.share), remainder: e.share - Math.floor(e.share) }));
  let left = total - rows.reduce((a, r) => a + r.qty, 0);
  for (const r of [...rows].sort((a, b) => b.remainder - a.remainder)) {
    if (left <= 0) break;
    r.qty += 1;
    left -= 1;
  }
  return rows.map((r) => ({ size: r.size, qty: r.qty, percent: (r.qty / total) * 100 }));
}

/* ------------------------------ cartons and containers ------------------------------ */

/**
 * Nominal internal volumes of standard containers, in cubic metres. These are
 * the usual published figures; a real load fills less, depending on carton
 * dimensions, pallets and how the cartons stack, so a result is a ceiling on
 * what could fit and not a booking.
 */
export const CONTAINERS = [
  { id: "20GP", label: "20 ft", nominalCbm: 33.2 },
  { id: "40GP", label: "40 ft", nominalCbm: 67.7 },
  { id: "40HC", label: "40 ft high cube", nominalCbm: 76.3 },
] as const;

export function cartonLoad(input: { lengthCm: number; widthCm: number; heightCm: number; piecesPerCarton: number; pieces: number; cartonKg?: number }) {
  const { lengthCm, widthCm, heightCm, piecesPerCarton, pieces } = input;
  if (![lengthCm, widthCm, heightCm, piecesPerCarton, pieces].every(pos) || !Number.isInteger(piecesPerCarton) || !Number.isInteger(pieces)) return null;
  const cbmPerCarton = (lengthCm * widthCm * heightCm) / 1_000_000;
  const cartons = Math.ceil(pieces / piecesPerCarton);
  const totalCbm = cbmPerCarton * cartons;
  return {
    cbmPerCarton,
    cartons,
    /** Pieces in the last carton, when it is not full. */
    lastCarton: pieces % piecesPerCarton || piecesPerCarton,
    totalCbm,
    grossKg: pos(input.cartonKg ?? NaN) ? input.cartonKg! * cartons : null,
    containers: CONTAINERS.map((c) => ({ ...c, share: totalCbm / c.nominalCbm })),
  };
}

/* --------------------------------- cost, as the buyer enters it --------------------------------- */

/**
 * A cost sheet built from the visitor's own numbers.
 *
 * Nothing here is a rate: fabric price, make cost, trims and the rest are all
 * inputs. It shows how the parts add up to an FOB figure per piece, which is
 * what a buyer needs in order to compare two quotations line by line. It is
 * arithmetic on assumptions, not a quotation, and the page says so.
 */
export type CostInput = {
  fabricPerPiece: number; // metres
  fabricPricePerM: number;
  fabricWastePct: number;
  make: number;
  trims: number;
  decoration: number;
  packing: number;
  testing: number;
  overheadPct: number;
  marginPct: number;
  quantity: number;
};

export function costSheet(c: CostInput) {
  const values = [c.fabricPerPiece, c.fabricPricePerM, c.fabricWastePct, c.make, c.trims, c.decoration, c.packing, c.testing, c.overheadPct, c.marginPct];
  if (!values.every((v) => finite(v) && v >= 0) || !(c.quantity > 0)) return null;
  const fabric = c.fabricPerPiece * (1 + c.fabricWastePct / 100) * c.fabricPricePerM;
  const direct = fabric + c.make + c.trims + c.decoration + c.packing + c.testing;
  const overhead = direct * (c.overheadPct / 100);
  const subtotal = direct + overhead;
  const margin = subtotal * (c.marginPct / 100);
  const perPiece = subtotal + margin;
  return {
    lines: [
      { label: "Fabric (with waste)", value: fabric },
      { label: "Make (cut, sew, finish)", value: c.make },
      { label: "Trims", value: c.trims },
      { label: "Decoration", value: c.decoration },
      { label: "Packing", value: c.packing },
      { label: "Testing and inspection", value: c.testing },
      { label: "Overhead", value: overhead },
      { label: "Margin", value: margin },
    ],
    perPiece,
    total: perPiece * c.quantity,
    fabricShare: perPiece > 0 ? fabric / perPiece : 0,
  };
}

/* ---------------------------------------- tolerance ---------------------------------------- */

/** The range a value may sit in, for a tolerance given in per cent or in the value's own unit. */
export function toleranceRange(value: number, tolerance: number, mode: "percent" | "absolute") {
  if (!finite(value) || !pos(tolerance)) return null;
  const delta = mode === "percent" ? (value * tolerance) / 100 : tolerance;
  return { min: value - delta, max: value + delta, delta };
}

/** Per cent difference of a measurement from its specification. */
export function deviationPct(actual: number, spec: number): number | null {
  if (!finite(actual) || !pos(spec)) return null;
  return ((actual - spec) / spec) * 100;
}

/* ----------------------------------- decoration chooser ----------------------------------- */

export type Fabric = "cotton" | "polycotton" | "polyester" | "stretch" | "fleece";
export type LogoSize = "small" | "medium" | "large";
export type Colours = "few" | "several" | "photo";
export type Run = "tiny" | "small" | "large";

export type DecorationInput = { fabric: Fabric; dark: boolean; size: LogoSize; colours: Colours; run: Run };
export type Fit = "suits" | "consider" | "avoid";
export type DecorationAdvice = { method: string; fit: Fit; reasons: string[] };

/**
 * Preliminary guidance on decoration methods from general, widely documented
 * properties of each process. It says which methods are usually worth asking
 * about and why; it prices nothing, promises no wash life and knows nothing
 * about any factory's equipment. Every result ends in the same instruction: get
 * a strike-off or sew-out on the real fabric and wash it.
 */
export function chooseDecoration(i: DecorationInput): DecorationAdvice[] {
  const out: DecorationAdvice[] = [];
  const rank = { suits: 0, consider: 1, avoid: 2 } as const;
  /** The more cautious of two verdicts: a method is only as suitable as its worst limit. */
  const worse = (a: Fit, b: Fit): Fit => (rank[a] >= rank[b] ? a : b);

  // Machine embroidery
  {
    const reasons: string[] = [];
    let fit: Fit = "suits";
    if (i.colours === "photo") {
      fit = "avoid";
      reasons.push("Photographic or gradient artwork cannot be stitched faithfully.");
    }
    if (i.size === "large") {
      fit = worse(fit, "consider");
      reasons.push("Large stitched areas are heavy, stiff and carry a high stitch count, which drives cost.");
    }
    if (i.fabric === "stretch" || i.fabric === "polyester") {
      fit = worse(fit, "consider");
      reasons.push("Light or stretchy knits can pucker under dense stitching; the backing and stitch density matter.");
    }
    if (i.fabric === "fleece") reasons.push("Pile can swallow fine detail; a topping film is often used.");
    if (reasons.length === 0) reasons.push("Small to medium logos on structured fabric are what embroidery does best, and it is the most durable look on polos, aprons and jackets.");
    out.push({ method: "Machine embroidery", fit, reasons });
  }

  // Screen printing
  {
    const reasons: string[] = [];
    let fit: Fit = "suits";
    if (i.colours === "photo") {
      fit = "avoid";
      reasons.push("Photographic artwork needs a halftone or digital method.");
    }
    if (i.colours === "several" && i.run === "tiny") {
      fit = worse(fit, "consider");
      reasons.push("Each colour needs its own screen, so several colours on a very small run is costly per piece.");
    } else if (i.run === "tiny") {
      fit = worse(fit, "consider");
      reasons.push("Screen set-up is a fixed cost that is hard to spread over a very small run.");
    }
    if (i.dark) reasons.push("On a dark garment, light inks need a white underbase, which adds a layer.");
    if (i.fabric === "polyester" || i.fabric === "stretch") reasons.push("Polyester can pass its dye into plastisol ink (dye migration); ask for a low-bleed ink and test it.");
    if (reasons.length === 0) reasons.push("Simple artwork in a few flat colours on a medium or large run is where screen printing is most economical.");
    out.push({ method: "Screen printing", fit, reasons });
  }

  // DTF
  {
    const reasons: string[] = [];
    let fit: Fit = "suits";
    if (i.run === "large" && i.colours === "few") {
      fit = worse(fit, "consider");
      reasons.push("On a large run of a simple design, screen printing or embroidery usually costs less per piece.");
    }
    if (i.size === "large") reasons.push("Large transfers can feel plasticky and less breathable.");
    reasons.push("Handles many colours, fine detail and gradients on cotton, blends and polyester, and needs no screen per colour.");
    out.push({ method: "DTF (direct-to-film) transfer", fit, reasons });
  }

  // Heat transfer vinyl
  {
    const reasons: string[] = [];
    let fit: Fit = "consider";
    if (i.colours !== "few") {
      fit = "avoid";
      reasons.push("Vinyl is cut in solid colours, so it suits one or two colours, names and numbers, not complex artwork.");
    } else if (i.run === "tiny" && i.size !== "large") {
      fit = "suits";
      reasons.push("Good for very short runs and simple one or two colour marks, with no screen set-up.");
    }
    if (i.size === "large") {
      fit = "avoid";
      reasons.push("A large vinyl area is heavy and does not breathe.");
    }
    if (i.fabric === "stretch") reasons.push("Vinyl can crack on a high-stretch fabric unless it is a stretch-rated film.");
    if (reasons.length === 0) reasons.push("Suitable for simple marks on short runs.");
    out.push({ method: "Heat transfer vinyl", fit, reasons });
  }

  // Sublimation
  {
    const reasons: string[] = [];
    let fit: Fit = "suits";
    if (i.fabric === "cotton" || i.fabric === "polycotton" || i.fabric === "fleece") {
      fit = "avoid";
      reasons.push("Sublimation dyes bond to polyester, so a cotton or blended garment will not hold the print.");
    }
    if (i.dark) {
      fit = "avoid";
      reasons.push("It prints with transparent dyes, so it works on white or very light polyester, not on dark cloth.");
    }
    if (fit === "suits") reasons.push("Full-colour, all-over or large designs on white or light polyester, with no added layer or change of hand.");
    out.push({ method: "Sublimation", fit, reasons });
  }

  return out.sort((a, b) => rank[a.fit] - rank[b.fit]);
}
