import type { Material } from "./materials";

/**
 * WHY TWO FABRICS AT THE SAME GSM FEEL DIFFERENT
 * ==============================================
 *
 * GSM says how heavy a square metre of cloth is. It says nothing about how that
 * cloth behaves in the hand, on a body, or after twenty industrial washes — and
 * it is the number buyers anchor on hardest, because it is the one number every
 * supplier quotes.
 *
 * That matters commercially rather than academically. A buyer who specifies
 * "220 gsm pique" and nothing else has specified almost nothing: two mills can
 * both hit 220 and ship fabrics that wear, drape and launder differently. The
 * gap between them is where a program goes wrong at bulk, after the sample was
 * approved.
 *
 * Each factor below names the field on `Material` that actually carries it, so
 * this is not a lecture bolted onto the page — it is a key to the specification
 * table already printed beneath it. If a factor has no field yet, that is a real
 * gap in what AHM publishes, and `factorValue` returning null makes it visible
 * rather than letting the prose imply a completeness the data does not have.
 */

export type HandFeelFactor = {
  id: string;
  name: string;
  /** What this factor changes about the cloth, in a buyer's terms. */
  effect: string;
  /** What a buyer should put in the tech pack so it is not left to the mill. */
  specify: string;
  /** The `Material` field that carries it, where one exists. */
  field: keyof Material | null;
};

export const handFeelFactors: HandFeelFactor[] = [
  {
    id: "fibre",
    name: "Fibre",
    effect:
      "Cotton, polyester, lyocell and their blends absorb moisture, hold heat and recover from creasing differently. Two fabrics of one weight in different fibres are not substitutes for each other.",
    specify: "Composition by percentage, not just the family name.",
    field: "compositions",
  },
  {
    id: "yarn",
    name: "Yarn",
    effect:
      "Count and twist decide whether the same fibre arrives soft or crisp, and how much the surface pills in service. A high-twist yarn wears longer and feels harder; a low-twist one is the reverse.",
    specify: "Yarn count, and whether the yarn is carded, combed or open-end.",
    field: "construction",
  },
  {
    id: "construction",
    name: "Construction",
    effect:
      "Knit or woven, and how densely. Pique, jersey, twill and canvas at one weight behave nothing alike — this is usually the largest single difference between two fabrics a buyer is comparing.",
    specify: "The construction by name, and the stitch or thread density if it matters to you.",
    field: "construction",
  },
  {
    id: "finishing",
    name: "Finishing",
    effect:
      "Washing, brushing, singeing and softening change hand feel after the cloth is already made, and can move it further than a change of yarn would. It is also the step most often left unstated.",
    specify: "The finish you expect, and whether hand feel is being approved on finished cloth.",
    field: "finishOptions",
  },
  {
    id: "drape",
    name: "Drape and recovery",
    effect:
      "How the cloth falls, and whether it returns to shape. Two garments at one weight can hang as a structured panel or as a soft one, which decides whether a uniform looks pressed at the end of a shift.",
    specify: "Whether the garment should hold structure or fall soft, and any stretch requirement.",
    field: "handFeel",
  },
];

/** The value this factor resolves to for a material, or null where unpublished. */
export function factorValue(material: Material, factor: HandFeelFactor): string | null {
  if (!factor.field) return null;
  const raw = material[factor.field];
  if (Array.isArray(raw)) return raw.length ? raw.join(" · ") : null;
  return typeof raw === "string" && raw ? raw : null;
}

export const HAND_FEEL_SUMMARY =
  "GSM tells you how heavy a fabric is. It does not tell you how it feels, drapes or lasts." as const;
