import { list } from "@vercel/blob";
import { createJson, deleteBlobs, readJson, updateJson } from "../storage/json-store";
import { storageNamespace } from "../storage/namespace";
import { applyChanges, summarise, type Lead, type LeadChanges, type LeadSummary } from "./model";
import { pinDay, pinMatches, PIN_DAILY_LIMIT, type PinDay } from "./pin";

/**
 * The register's reads and writes.
 *
 *   <ns>pipeline/leads/<REF>.json   one document per enquiry, the record
 *   <ns>pipeline/index.json         one row per enquiry, what the board reads
 *   <ns>pipeline/auth/used/<n>.json sign-in links already used
 *   <ns>pipeline/auth/pin/<day>.json PIN attempts counted that UTC day
 *   <ns>pipeline/jobs/<name>.json   the daily job's once-a-day marker
 *
 * The lead document is the truth and the index is derived from it. Every write
 * to a lead is followed by an index update; if that second write ever fails,
 * `rebuildIndex` regenerates it from the documents, so the worst case is a lead
 * missing from the board until an admin presses one button, never a lost lead.
 */

type Index = { version: 1; leads: LeadSummary[] };

export const REFERENCE = /^AHM-\d{6}-[A-Z0-9]{4}$/;

function paths(ns: string = storageNamespace()) {
  return {
    leadsDir: `${ns}pipeline/leads/`,
    lead: (ref: string) => `${ns}pipeline/leads/${ref}.json`,
    index: `${ns}pipeline/index.json`,
    usedDir: `${ns}pipeline/auth/used/`,
    used: (id: string) => `${ns}pipeline/auth/used/${id}.json`,
    pinDir: `${ns}pipeline/auth/pin/`,
    pin: (day: string) => `${ns}pipeline/auth/pin/${day}.json`,
    jobsDir: `${ns}pipeline/jobs/`,
    job: (name: string) => `${ns}pipeline/jobs/${name}.json`,
  };
}

const emptyIndex = (): Index => ({ version: 1, leads: [] });

const newestFirst = (a: LeadSummary, b: LeadSummary) => b.createdAt.localeCompare(a.createdAt);

async function upsertSummary(summary: LeadSummary) {
  await updateJson<Index>(paths().index, emptyIndex, (index) => ({
    version: 1,
    leads: [summary, ...index.leads.filter((l) => l.ref !== summary.ref)].sort(newestFirst),
  }));
}

/** False if a lead with this reference already exists; the caller picks another. */
export async function createLead(lead: Lead): Promise<boolean> {
  if (!(await createJson(paths().lead(lead.ref), lead))) return false;
  await upsertSummary(summarise(lead));
  return true;
}

export async function getLead(ref: string): Promise<Lead | null> {
  if (!REFERENCE.test(ref)) return null;
  const found = await readJson<Lead>(paths().lead(ref));
  return found?.data ?? null;
}

export async function listLeads(): Promise<LeadSummary[]> {
  const index = await readJson<Index>(paths().index);
  return index?.data.leads ?? [];
}

/** Applies staff changes to one lead. Null if the lead does not exist. */
export async function updateLead(ref: string, changes: LeadChanges, by: string, now = new Date()): Promise<Lead | null> {
  if (!REFERENCE.test(ref)) return null;
  let changed = false;
  const result = await updateJson<Lead | null>(paths().lead(ref), () => null, (current) => {
    changed = false;
    if (!current) return null;
    const next = applyChanges(current, changes, by, now);
    if (next === current) return null;
    changed = true;
    return next;
  });
  if (result && changed) await upsertSummary(summarise(result));
  return result;
}

/** Removes the lead, its files and its index row. Admin only, enforced by the caller. */
export async function deleteLead(ref: string): Promise<boolean> {
  const lead = await getLead(ref);
  if (!lead) return false;
  await deleteBlobs([...lead.files.map((f) => f.pathname), paths().lead(ref)]);
  await updateJson<Index>(paths().index, emptyIndex, (index) =>
    index.leads.some((l) => l.ref === ref) ? { version: 1, leads: index.leads.filter((l) => l.ref !== ref) } : null,
  );
  return true;
}

/** Regenerates the index from the lead documents. */
export async function rebuildIndex(): Promise<number> {
  const summaries: LeadSummary[] = [];
  let cursor: string | undefined;
  do {
    const page = await list({ prefix: paths().leadsDir, cursor, limit: 1000 });
    const docs = await Promise.all(page.blobs.map((b) => readJson<Lead>(b.pathname)));
    for (const doc of docs) if (doc) summaries.push(summarise(doc.data));
    cursor = page.hasMore ? page.cursor : undefined;
  } while (cursor);

  await updateJson<Index>(paths().index, emptyIndex, () => ({ version: 1, leads: summaries.sort(newestFirst) }));
  return summaries.length;
}

/**
 * Records that a single-use thing has happened, atomically. Returns false if
 * it had already been recorded: two clicks on one sign-in link race to create
 * the same marker, and the store lets exactly one of them win.
 */
export async function markUsed(id: string): Promise<boolean> {
  if (!/^[A-Za-z0-9_-]{8,64}$/.test(id)) return false;
  return createJson(paths().used(id), { at: new Date().toISOString() });
}

/**
 * One PIN attempt, counted before it is checked. Reserving first is what makes
 * the limit hold under parallel guesses: each request takes a slot with a
 * conditional write before it learns anything, so twenty simultaneous guesses
 * cannot all slip in under a limit of ten. A correct PIN gives its slot back,
 * so the owner signing in does not use up the day.
 */
export async function attemptPin(given: string, expected: string, now = new Date()): Promise<"ok" | "wrong" | "locked"> {
  const pathname = paths().pin(pinDay(now));
  let reserved = false;
  await updateJson<PinDay>(pathname, () => ({ attempts: 0 }), (day) => {
    reserved = day.attempts < PIN_DAILY_LIMIT;
    return reserved ? { attempts: day.attempts + 1 } : null;
  });
  if (!reserved) return "locked";
  if (!pinMatches(given, expected)) return "wrong";

  try {
    await updateJson<PinDay>(pathname, () => ({ attempts: 0 }), (day) => ({ attempts: Math.max(0, day.attempts - 1) }));
  } catch {
    // The slot stays taken. One fewer attempt today is not worth refusing a correct PIN over.
  }
  return "ok";
}

/** Once-per-name marker for scheduled work, e.g. "daily-2026-10-10". */
export async function claimJob(name: string): Promise<boolean> {
  return createJson(paths().job(name), { at: new Date().toISOString() });
}

export const pipelinePaths = paths;
