/**
 * Where a published image or film came from, and what it is labelled.
 *
 * One vocabulary for every place that describes media: the corner mark on an
 * image, the film caption, the footer, the terms and the verification page.
 * The class is never chosen by a component. It is read from the asset
 * manifest, which takes it from two hash-keyed records:
 *
 * - `data/generated-images.json`: made by an image model. "ai-render".
 * - `data/verified-originals.json`: published files paired with the camera
 *   original they were made from (`npm run provenance:pair`). "enhanced" when
 *   the two still match structurally, "representative" when the edit changed
 *   the picture and a reviewer confirmed it still shows the sample.
 *
 * A file in neither list is a photograph, or footage when it is a film.
 */

export type Origin = "photograph" | "enhanced" | "representative" | "ai-render" | "footage" | "enhanced-footage";

type Subject = "product" | "facility" | "other";

/** The short mark printed on the frame, or null when none is needed. */
export function provenanceMark(origin: Origin, subject: Subject = "product"): string | null {
  switch (origin) {
    case "enhanced":
      return subject === "facility" ? "Actual facility · enhanced" : subject === "product" ? "Actual product · enhanced" : "Enhanced photograph";
    case "representative":
      return "Representative render";
    case "ai-render":
      return "AI render";
    case "enhanced-footage":
      return "Actual footage · enhanced";
    default:
      return null;
  }
}

/** The full sentence: the mark's tooltip, and the line under a film. */
export function provenanceSentence(origin: Origin, subject: Subject = "product"): string {
  const thing = subject === "facility" ? "facility" : subject === "product" ? "product" : "subject";
  switch (origin) {
    case "photograph":
      return "Photograph.";
    case "enhanced":
      return `Actual ${thing} — digitally enhanced photography. Compared against the camera original.`;
    case "representative":
      return `Rendered from a photograph of an actual AHM ${thing}. The edit changed the picture, so details may differ from the sample.`;
    case "ai-render":
      return "AI-generated image of the article type, not a photograph of AHM production.";
    case "footage":
      return "Manufacturing footage.";
    case "enhanced-footage":
      return "Actual manufacturing footage — professionally enhanced.";
  }
}

/** True for anything a model produced the picture of. Never evidence of a facility. */
export function isRendered(origin: Origin): boolean {
  return origin === "ai-render" || origin === "representative";
}
