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
  /** People in this unit, including its lead, not counting its sub-units. */
  headcount?: number;
  /** The figure is a floor the owner gave as "N+", shown with a plus. */
  plus?: boolean;
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
  partnerFactories?: { headcount: number; plus?: boolean; note: string };
};

/*
 * Supplied by the owner on 11 November 2026: about 200 employees in cutting
 * and stitching, more in the other teams (no figure given), and more than
 * 1,000 workers across the partner factories AHM works with ("hybrid"). The
 * other teams are named by the functions the site already describes AHM
 * performing (company.manufacturingModel), not by invented departments, and
 * carry no number until the owner gives one.
 */
export const organisation: Organisation = {
  source: "AHM International (owner)",
  asOf: "2026-11-11",
  leadership: [],
  departments: [
    {
      id: "production",
      name: "Cutting & Stitching",
      role: "AHM's own production floor: the cutting room and the sewing lines.",
      headcount: 200,
    },
    {
      id: "office",
      name: "Development, Quality & Export",
      role: "Product development and sampling, buyer communication, quality coordination and FOB export from Karachi.",
    },
  ],
  partnerFactories: {
    headcount: 1000,
    plus: true,
    note: "Workers across the partner factories AHM produces with. They are the partners' own staff, not AHM's.",
  },
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

/** Whether the team total is a floor: some unit has no figure, or a figure given as "N+". */
export function totalIsFloor(org: Organisation = organisation): boolean {
  const walk = (u: Unit): boolean => u.plus === true || u.headcount === undefined && !(u.children ?? []).some(hasFigure) || (u.children ?? []).some(walk);
  return org.departments.some(walk);
}

/** "200+", "1,000+", "48": a figure as the page prints it. */
export const formatCount = (n: number, plus = false) => `${n.toLocaleString("en-GB")}${plus ? "+" : ""}`;

/** The page exists only once a real structure, with its source, has been supplied. */
export function teamPublished(org: Organisation = organisation): boolean {
  return org.departments.length > 0 && Boolean(org.source);
}
