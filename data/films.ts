import { assetManifest } from "./asset-manifest";
import type { Origin } from "../lib/provenance";

/**
 * Manufacturing films: one slot per place a film is wanted.
 *
 * A slot plays only when three things are true: the film and its poster are
 * in public/assets/film/, and the film has a record in
 * data/verified-originals.json saying it is footage. `npm run film:build`
 * writes all three from the owner's source file, after checking the source is
 * not a generated clip. Anything else dropped into the folder (a stock clip, a
 * generated "factory" scene) never renders, so a picture of operations cannot
 * appear on the site without being footage of them.
 *
 * Until then each slot renders nothing at all, not an empty player.
 */

export type FilmSlot = {
  id: string;
  title: string;
  /** What it should show. Listed in assets-needed.md as the shot list. */
  brief: string;
};

export const filmSlots = [
  {
    id: "process",
    title: "From cut to carton",
    brief: "20-40 s: spreading, cutting, sewing lines, finishing and packing at AHM's own operation. No customer labels in frame.",
  },
  {
    id: "quality",
    title: "Inspection on the floor",
    brief: "15-30 s: inline and final inspection, measurement against the spec sheet, needle and trims control.",
  },
  {
    id: "aprons",
    title: "Apron construction",
    brief: "15-30 s: pocket setting, bar-tacking, strap and tie attachment on a bib apron. Unbranded or with the mark out of frame.",
  },
] as const satisfies readonly FilmSlot[];

export type FilmId = (typeof filmSlots)[number]["id"];

export type ResolvedFilm = {
  title: string;
  src: string;
  /** VP9 fallback, when built. */
  webm?: string;
  poster: string;
  width: number;
  height: number;
  duration: number;
  origin: Extract<Origin, "footage" | "enhanced-footage">;
};

export const filmPath = (id: FilmId) => ({
  src: `/assets/film/${id}.mp4`,
  webm: `/assets/film/${id}.webm`,
  poster: `/assets/film/${id}.webp`,
});

/** The film for a slot, or null while the slot is empty or unverified. */
export function resolveFilm(id: FilmId): ResolvedFilm | null {
  const slot = filmSlots.find((s) => s.id === id)!;
  const { src, webm, poster } = filmPath(id);
  const film = assetManifest[src];
  const still = assetManifest[poster];
  if (!film?.width || !still?.width) return null;
  if (film.origin !== "footage" && film.origin !== "enhanced-footage") return null;
  const fallback = assetManifest[webm]?.origin === film.origin ? webm : undefined;
  return { title: slot.title, src, webm: fallback, poster, width: film.width, height: film.height, duration: film.duration ?? 0, origin: film.origin };
}
