/**
 * WEB IMAGE SPECIFICATION
 * =======================
 *
 * Target dimensions, quality and byte budget per image role.
 *
 * These are the sizes the *source* web derivative is encoded at — the largest
 * version any device will ever be served. next/image then generates the
 * responsive variants below it, so a phone never downloads the desktop file.
 *
 * Quality is per role rather than global: a fabric macro shows compression
 * artefacts in flat tonal areas long before a factory photograph does, so it
 * gets a higher setting and a larger budget.
 */

export type ImageRole =
  | "hero"
  | "productSquare"
  | "productThumb"
  | "modelPortrait"
  | "technicalDetail"
  | "fabricMacro"
  | "industry"
  | "social";

export type RoleSpec = {
  /** Encoded size of the web derivative. */
  width: number;
  height: number;
  /** WebP/AVIF quality, 0–100. */
  quality: number;
  /** Byte budget, used by the audit to flag over-weight files. */
  maxBytes: number;
  /** Warn below this — a file this small usually means it was over-compressed. */
  minBytes: number;
  label: string;
};

const KB = 1024;

export const imageSpec: Record<ImageRole, RoleSpec> = {
  hero: { width: 1920, height: 1080, quality: 82, maxBytes: 350 * KB, minBytes: 60 * KB, label: "Hero / full width" },
  productSquare: { width: 1600, height: 1600, quality: 86, maxBytes: 220 * KB, minBytes: 20 * KB, label: "Product square" },
  productThumb: { width: 800, height: 800, quality: 76, maxBytes: 100 * KB, minBytes: 8 * KB, label: "Product thumbnail" },
  modelPortrait: { width: 1200, height: 1600, quality: 84, maxBytes: 250 * KB, minBytes: 40 * KB, label: "Model portrait" },
  technicalDetail: { width: 1400, height: 933, quality: 84, maxBytes: 180 * KB, minBytes: 12 * KB, label: "Technical detail" },
  fabricMacro: { width: 1200, height: 1200, quality: 88, maxBytes: 200 * KB, minBytes: 20 * KB, label: "Fabric macro" },
  industry: { width: 1600, height: 900, quality: 82, maxBytes: 250 * KB, minBytes: 30 * KB, label: "Industry / factory" },
  social: { width: 1200, height: 630, quality: 82, maxBytes: 250 * KB, minBytes: 20 * KB, label: "OG / social" },
};

/**
 * Hard ceiling for anything served from `public/assets`.
 *
 * Nothing on a page should exceed this. A file over the line is either a master
 * that escaped the archive, or a derivative encoded at the wrong quality.
 */
export const ABSOLUTE_MAX_BYTES = 500 * KB;

/** Above this, a source image is almost certainly an unoptimised master. */
export const MASTER_WIDTH_THRESHOLD = 2400;

/** Infers a role from the asset path, for the optimizer and the audit. */
export function roleForPath(path: string): ImageRole {
  if (path.includes("/hero/")) return "hero";
  if (path.includes("/industries/")) return "modelPortrait";
  if (path.includes("/factory/") || path.includes("/export/") || path.includes("/development/")) return "industry";
  if (path.includes("/fabrics/") || path.includes("fabric-macro")) return "fabricMacro";
  if (path.includes("/details/") || path.includes("-detail")) return "technicalDetail";
  if (path.includes("/products/")) return "productSquare";
  return "productSquare";
}
