#!/usr/bin/env node
/**
 * Pair a published image or film with the camera original it was made from.
 *
 *   npm run provenance:pair -- <original> <published path> [--against <file>]
 *   npm run provenance:pair -- <original> <published path> --representative --reviewer "Name"
 *   npm run provenance:pair -- <original> <published film> --film [--enhanced]
 *
 * <published path> is the file under public/, e.g.
 * /assets/products/photography/navy-polo.webp.
 *
 * An enhanced photograph is labelled "Actual product · enhanced", which is a
 * claim that the picture still shows the garment the camera saw. So the label
 * is earned by measurement, not asserted:
 *
 * 1. The original must not itself be a generated file. A signed content
 *    credential naming `trainedAlgorithmicMedia` (what OpenAI, Google and
 *    Adobe write into generated images) refuses it. This is not hypothetical:
 *    the 28 masters in assets-master/product-photography-original/ carry
 *    exactly that credential, despite the folder name.
 * 2. The published file is compared with the original by structural
 *    similarity (SSIM, luma, at 256px, centre-cropped to the same aspect).
 *    Retouching, denoising, upscaling, colour and background clean-up keep it
 *    high. A model that re-drew the garment does not, because seams, folds and
 *    pockets move. At or above THRESHOLD the file is recorded as "enhanced".
 * 3. Below it the script refuses, and says why. If a reviewer has compared the
 *    two side by side and the garment is the same article, --representative
 *    --reviewer records it as "Representative render", with their name.
 *
 * The original is copied into assets-master/originals/ (gitignored, never
 * deployed), so the evidence stays with the business and out of the public
 * repository. Then run `npm run assets` to apply the label.
 *
 * Films skip the comparison (frames move) and are recorded as "footage" or,
 * with --enhanced, "enhanced-footage". The credential check still applies.
 */

import { execFileSync, spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const recordFile = path.join(root, "data", "verified-originals.json");
/**
 * Calibrated on 11 October 2026 against the 24 published garment images: a
 * retouched copy (contrast, saturation, sharpening, denoise) scored 0.975; the
 * same image re-framed and mirrored 0.577; the closest two *different*
 * garments 0.775 (two navy henleys). Two crops of one hoodie scored 0.965,
 * which is correct, they are the same picture. White studio grounds lift every
 * score, which is why the bar is well above the 0.6 that seems natural.
 * Replacing a photograph's background lowers it too; that case goes to a
 * reviewer, below.
 */
export const THRESHOLD = 0.85;

/** What a file's embedded content credential says about how it was made, if anything. */
export function credential(buf) {
  if (!buf.includes("c2pa")) return null;
  const text = buf.toString("latin1");
  return {
    generated: /digitalsourcetype\/trainedAlgorithmicMedia/.test(text),
    agent: (text.match(/gpt-image|DALL.E|Imagen|Firefly|Midjourney|Gemini/) ?? [null])[0],
  };
}

/** SSIM of two images' luma, `a` centre-cropped to `b`'s aspect, both at 256px wide. */
export function ssim(a, b) {
  const [w, h] = execFileSync("ffprobe", ["-v", "error", "-select_streams", "v:0", "-show_entries", "stream=width,height", "-of", "csv=p=0:s=x", b], { encoding: "utf8" })
    .trim()
    .split("x")
    .map(Number);
  const graph =
    `[0:v]crop='min(iw,ih*${w}/${h})':'min(ih,iw*${h}/${w})',scale=256:${Math.round((256 * h) / w)},format=gray[a];` +
    `[1:v]scale=256:${Math.round((256 * h) / w)},format=gray[b];[a][b]ssim`;
  // ffmpeg reports the score on stderr.
  const { stderr } = spawnSync("ffmpeg", ["-v", "info", "-nostats", "-i", a, "-i", b, "-lavfi", graph, "-f", "null", "-"], { encoding: "utf8" });
  const m = stderr.match(/All:([0-9.]+)/);
  if (!m) throw new Error(`could not compare ${a} with ${b}`);
  return Number(m[1]);
}

const sha = (buf) => createHash("sha256").update(buf).digest("hex");

/**
 * Write one pairing: record the published file's hash and origin, and keep the
 * original privately under assets-master/originals/.
 */
export function recordPairing(published, original, fields) {
  const originalBuf = fs.readFileSync(original);
  const record = { files: {}, ...JSON.parse(fs.existsSync(recordFile) ? fs.readFileSync(recordFile, "utf8") : "{}") };
  const keep = path.join(root, "assets-master", "originals", published.replace(/^\/assets\//, "").replace(/\.[^.]+$/, "") + path.extname(original).toLowerCase());
  fs.mkdirSync(path.dirname(keep), { recursive: true });
  if (path.resolve(original) !== keep) fs.copyFileSync(original, keep);
  record.files[published] = {
    sha256: sha(fs.readFileSync(path.join(root, "public", published))),
    ...fields,
    original: { name: path.basename(original), sha256: sha(originalBuf), exif: originalBuf.includes("Exif\0\0") },
    recordedOn: new Date().toISOString().slice(0, 10),
  };
  fs.writeFileSync(recordFile, JSON.stringify(record, null, 2) + "\n");
  return path.relative(root, keep);
}

/** Refuses, and exits, when the supplied "original" says it was generated. */
export function refuseGenerated(original) {
  const cred = credential(fs.readFileSync(original));
  if (!cred?.generated) return;
  console.error(
    `refused: ${original} carries a content credential saying it was generated` +
      (cred.agent ? ` (${cred.agent})` : "") +
      ". It is not a camera original. Supply the file the camera or phone wrote.",
  );
  process.exit(1);
}

function main(argv) {
  const flags = new Set(argv.filter((a) => a.startsWith("--")));
  const value = (name) => (argv.includes(name) ? argv[argv.indexOf(name) + 1] : undefined);
  const positional = argv.filter((a, i) => !a.startsWith("--") && !["--against", "--reviewer"].includes(argv[i - 1]));
  const [original, published] = positional;
  if (!original || !published?.startsWith("/assets/")) {
    console.error("usage: npm run provenance:pair -- <original> </assets/... published path> [--against <file>] [--representative --reviewer <name>] [--film [--enhanced]]");
    process.exit(2);
  }
  const publishedFile = path.join(root, "public", published);
  if (!fs.existsSync(original)) throw new Error(`no original at ${original}`);
  if (!fs.existsSync(publishedFile)) throw new Error(`nothing published at ${published}`);
  refuseGenerated(original);

  const entry = {};
  if (flags.has("--film")) {
    entry.origin = flags.has("--enhanced") ? "enhanced-footage" : "footage";
  } else {
    const score = ssim(original, value("--against") ?? publishedFile);
    entry.ssim = Math.round(score * 1000) / 1000;
    if (score >= THRESHOLD) {
      entry.origin = "enhanced";
    } else if (flags.has("--representative") && value("--reviewer")) {
      Object.assign(entry, { origin: "representative", reviewedBy: value("--reviewer") });
    } else {
      console.error(
        `not paired: similarity ${entry.ssim} is under ${THRESHOLD}. The published image no longer matches the photograph closely ` +
          `enough to be called the same picture, so it keeps its "AI render" label.\n` +
          `A replaced background also lowers the score. If you have compared them side by side and it is the same article, run again with --representative --reviewer "<your name>".` +
          (value("--against") ? "" : `\nIf the published file was cropped differently from the original, pass the full-size enhanced file with --against.`),
      );
      process.exit(1);
    }
  }

  const kept = recordPairing(published, original, entry);
  console.log(`${published}: recorded as ${entry.origin}${entry.ssim !== undefined ? ` (similarity ${entry.ssim})` : ""}. Original kept privately at ${kept}. Now run npm run assets.`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) main(process.argv.slice(2));
