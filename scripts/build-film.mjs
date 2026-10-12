#!/usr/bin/env node
/**
 * Build a manufacturing film for one slot in data/films.ts.
 *
 *   npm run film:build -- <source video> <slot> [--enhanced] [--start 3] [--length 30]
 *
 * --enhanced records it as "Actual footage · enhanced": say so when the source
 * has been graded, stabilised or otherwise edited with AI tools. Without it
 * the film is recorded as plain footage. Either way the source must be footage
 * of the real thing: a file whose content credential says it was generated is
 * refused, and nothing here generates or alters what the frames show. It
 * trims, scales and compresses.
 *
 * Writes, under public/assets/film/:
 *   <slot>.mp4   H.264, no audio track, at most 1280 px wide and 30 fps,
 *                faststart so it plays before it has finished downloading
 *   <slot>.webm  VP9, the same cut, for browsers built without H.264 (some
 *                Linux Chromium builds); listed second, so it is fetched
 *                only where the MP4 cannot play
 *   <slot>.webp  the poster: what loads first, and all that a reduced-motion
 *                or Save-Data visitor sees until they press play
 * records both in data/verified-originals.json, and keeps the source privately
 * in assets-master/originals/film/. Then run `npm run assets`.
 */

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { recordPairing, refuseGenerated } from "./provenance-pair.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SLOTS = ["process", "quality", "aprons"]; // data/films.ts; tests/films.test.ts holds them equal
const BUDGET = 4 * 1024 * 1024;

const argv = process.argv.slice(2);
const value = (name, fallback) => (argv.includes(name) ? argv[argv.indexOf(name) + 1] : fallback);
const [source, slot] = argv.filter((a, i) => !a.startsWith("--") && !["--start", "--length"].includes(argv[i - 1]));

if (!source || !SLOTS.includes(slot)) {
  console.error(`usage: npm run film:build -- <source video> <${SLOTS.join("|")}> [--enhanced] [--start s] [--length s]`);
  process.exit(2);
}
if (!fs.existsSync(source)) throw new Error(`no source at ${source}`);
refuseGenerated(source);

const outDir = path.join(root, "public", "assets", "film");
fs.mkdirSync(outDir, { recursive: true });
const mp4 = path.join(outDir, `${slot}.mp4`);
const webm = path.join(outDir, `${slot}.webm`);
const poster = path.join(outDir, `${slot}.webp`);
const start = value("--start", "0");
const length = value("--length", "40");

execFileSync("ffmpeg", [
  "-v", "error", "-y", "-ss", start, "-t", length, "-i", source,
  "-an",
  "-vf", "scale='min(1280,iw)':-2,fps=30",
  "-c:v", "libx264", "-preset", "slow", "-crf", "26", "-maxrate", "2500k", "-bufsize", "5000k",
  "-pix_fmt", "yuv420p", "-movflags", "+faststart",
  mp4,
], { stdio: "inherit" });

execFileSync("ffmpeg", [
  "-v", "error", "-y", "-i", mp4, "-c:v", "libvpx-vp9", "-crf", "36", "-b:v", "0", "-row-mt", "1", "-deadline", "good", "-cpu-used", "2", webm,
], { stdio: "inherit" });

execFileSync("ffmpeg", [
  "-v", "error", "-y", "-ss", "1", "-i", mp4, "-frames:v", "1", "-c:v", "libwebp", "-q:v", "80", poster,
], { stdio: "inherit" });

const origin = argv.includes("--enhanced") ? "enhanced-footage" : "footage";
const kept = recordPairing(`/assets/film/${slot}.mp4`, source, { origin });
recordPairing(`/assets/film/${slot}.webm`, source, { origin });
recordPairing(`/assets/film/${slot}.webp`, source, { origin, posterOf: `/assets/film/${slot}.mp4` });

const size = fs.statSync(mp4).size;
console.log(`film: ${slot}.mp4 ${(size / 1024 / 1024).toFixed(2)} MB, poster ${(fs.statSync(poster).size / 1024).toFixed(0)} kB, recorded as ${origin}; source kept at ${kept}`);
if (size > BUDGET) console.warn(`film: over the 4 MB budget. Shorten it with --length, or it costs every visitor who scrolls past.`);
console.log("Now run npm run assets.");
