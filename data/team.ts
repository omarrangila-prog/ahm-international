/**
 * THE TEAM
 * ========
 *
 * The organisation behind /team, drawn as a tree of thread. Asked for by the
 * owner on 11 November 2026 ("a team hierarchy ... of all 200+ team").
 *
 * Rule 1 applies to people more than to anything else on the site:
 *
 * - Nothing here is invented. Departments, sub-teams and headcounts come from
 *   the owner, and `source` says who supplied them and when. A department
 *   without a headcount shows no number; the page total is the sum of the
 *   numbers given, never an estimate.
 * - A named person has agreed to be named. `consent` is the literal `true`
 *   so a person cannot be added without it being written down, and a photo
 *   must be a photograph of that person (data/assets.ts), never a render.
 * - Own staff and partner-factory staff are never mixed. A partner's people
 *   are not AHM's team, so `partnerFactories` is a separate, optional count
 *   with its own label, shown only if the owner supplies it.
 *
 * While `departments` is empty, /team returns 404, is noindex and is out of
 * the sitemap, and nothing links to it (the /our-work pattern). Filling this
 * file in is the only step needed to publish it.
 */

export type Person = {
  name: string;
  title: string;
  /** The person agreed to appear by name on the public website. */
  consent: true;
};

export type Unit = {
  id: string;
  name: string;
  /** One sentence on what the unit does. */
  role?: string;
  lead?: Person;
  /** People in this unit, not counting its sub-units. */
  headcount?: number;
  children?: Unit[];
};

export type Organisation = {
  /** Who supplied the structure and when, e.g. "Owner, 11 November 2026". */
  source: string | null;
  /** Date the numbers are true for, ISO. */
  asOf: string | null;
  leadership: Person[];
  departments: Unit[];
  /** People at partner factories working on AHM programs, if the owner gives a figure. Never added to the team total. */
  partnerFactories?: { headcount: number; note: string };
};

export const organisation: Organisation = {
  source: null,
  asOf: null,
  leadership: [],
  departments: [],
};

/** People in a unit including every sub-unit, counting only figures that were given. */
export function unitTotal(unit: Unit): number {
  return (unit.headcount ?? 0) + (unit.children ?? []).reduce((n, c) => n + unitTotal(c), 0);
}

/** Does any figure exist in this unit or below? A unit with none shows no number at all. */
export function hasFigure(unit: Unit): boolean {
  return unit.headcount !== undefined || (unit.children ?? []).some(hasFigure);
}

/** The team total: own staff only, from the figures given. */
export function teamTotal(org: Organisation = organisation): number {
  return org.leadership.length + org.departments.reduce((n, d) => n + unitTotal(d), 0);
}

/** The page exists only once a real structure, with its source, has been supplied. */
export function teamPublished(org: Organisation = organisation): boolean {
  return org.departments.length > 0 && Boolean(org.source);
}
