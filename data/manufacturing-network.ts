/**
 * MANUFACTURING NETWORK
 * =====================
 *
 * AHM runs its own manufacturing and works with specialist partner factories
 * (company.manufacturingModel). This file is the capability matrix that
 * /manufacturing-network renders: one row per product family, built from data
 * that is already published, so the matrix cannot say anything the product
 * pages do not.
 *
 * Every column is derived except one. Which families are made in AHM's own
 * operations and which at a partner has not been supplied, so `routes` below
 * is empty, the page hides that column and says the split is not published.
 * Filling it in is the owner's decision and the only edit the page needs: the
 * column appears as soon as one family has a route.
 */

import { productCategories } from "./products";
import { caseStudies } from "./caseStudies";
import { CAPABILITY_LABEL, type CapabilityStatus } from "./verification";
import { company, displayValue, PER_PROJECT } from "./company";

export type ProductionRoute = "own" | "partner" | "own_and_partner";

export const ROUTE_LABEL: Record<ProductionRoute, string> = {
  own: "AHM's own operations",
  partner: "Specialist partner factory",
  own_and_partner: "Own operations and partners",
};

/**
 * Per-family production route, keyed by product slug. OWNER TO SUPPLY.
 *
 * Leave a family out rather than guess: a buyer who is told "own factory" and
 * then finds a partner's label in the carton has been misled about the one
 * thing this page exists to make clear.
 */
export const routes: Partial<Record<string, ProductionRoute>> = {};

export type MatrixRow = {
  slug: string;
  name: string;
  href: string;
  status: CapabilityStatus;
  /** Plain-language track record: documented production, or the capability label. */
  record: string;
  documented: boolean;
  route: string;
  routeKnown: boolean;
  materials: string;
  decoration: string;
  capacity: string;
  minimum: string;
};

function spec(slug: string, label: string): string | null {
  const category = productCategories.find((c) => c.slug === slug);
  const row = category?.specification.find((s) => s.label === label);
  return row?.value ?? null;
}

export const capabilityMatrix: MatrixRow[] = productCategories.map((category) => {
  // Documented means a published case study sits in this family, not that the
  // family is "current capability". The two are different claims.
  const documented = caseStudies.some(
    (cs) => cs.category === category.name || category.subcategories.includes(cs.category),
  );
  const route = routes[category.slug];

  return {
    slug: category.slug,
    name: category.name,
    href: `/products/${category.slug}`,
    status: category.capabilityStatus,
    documented,
    record: documented ? "Documented export production" : CAPABILITY_LABEL[category.capabilityStatus],
    route: route ? ROUTE_LABEL[route] : PER_PROJECT,
    routeKnown: Boolean(route),
    materials: spec(category.slug, "Fabric options") ?? PER_PROJECT,
    decoration: category.decoration.length ? category.decoration.join(", ") : PER_PROJECT,
    // Capacity is per family in practice, but the only figure that exists is
    // the company-level field, and that is unpublished.
    capacity: displayValue(company.monthlyCapacity, "Available after specification review"),
    minimum: spec(category.slug, "Minimum quantity") ?? "Available after specification review",
  };
});

/**
 * What a buyer gets from the model, as the owner stated it. Each is a
 * consequence of having two kinds of production available, not a performance
 * promise: nothing here states a capacity, a quality level or a lead time.
 */
export const hybridBenefits = [
  {
    title: "A broader product range",
    body: "A program that needs aprons, polos and a woven shirt does not have to be split across three suppliers who never talk to each other.",
  },
  {
    title: "Production matched to the product",
    body: "Each article can go to the operation equipped for it, rather than to whichever line has space.",
  },
  {
    title: "Flexible sourcing",
    body: "Fabric, trims and decoration can be sourced for the program rather than limited to what one floor keeps in stock.",
  },
  {
    title: "One development process",
    body: "Specification, sampling and approval run through AHM whichever facility makes the bulk, so the buyer approves one standard, once.",
  },
  {
    title: "One point of contact",
    body: "Questions about any article in the program come to the same commercial team, not to a factory you have no agreement with.",
  },
  {
    title: "Oversight against the agreed specification",
    body: "Production is followed against the requirements agreed at approval: the approved sample, the size specification and the packing instruction.",
  },
] as const;

/**
 * The questions to ask about any order made under this model. Published as
 * questions, not answers: the procedures behind them are confirmed per order,
 * and a buyer is better served by knowing what to ask than by a description
 * of a process nobody can see.
 */
export const buyerQuestions = [
  {
    question: "Which facility will make my order?",
    why: "You are entitled to know whether an article is made in AHM's own operations or at a partner, and to know before the order is placed.",
  },
  {
    question: "Can my inspection agency go there?",
    why: "Third-party inspection is how buyers verify any supplier. Ask for access to the facility that is actually producing.",
  },
  {
    question: "Who holds the approved sample and the specification?",
    why: "The standard the bulk is checked against has to be the one you approved, whichever floor it is made on.",
  },
  {
    question: "Who is accountable if the bulk does not match?",
    why: "Your contract is with AHM. Ask how a deviation is handled and who answers for it.",
  },
] as const;
