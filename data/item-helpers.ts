import type { FaqItem } from "@/components/ui/Faq";
import type { SpecRow } from "./products";

/**
 * Types and constructors for the item pages, kept apart from data/items.ts so
 * the content files can import them without a circular import.
 */

export type Term = { term: string; detail: string };
export type Measurement = { point: string; how: string };

export type ProductItem = {
  slug: string;
  /** Home family slug. The page lives at /products/<family>/<slug>. */
  family: string;
  /** Every article name in the catalogue that opens this page. The first is the article this page draws its image from. */
  names: [string, ...string[]];
  /** H1 and breadcrumb name. */
  title: string;
  intro: string;
  /** The short answer, placed high. */
  summary: string;
  /** Construction choices particular to this garment. */
  features: Term[];
  /** Points of measure a size chart for this garment needs. */
  measurements: Measurement[];
  /** Item-specific rows. Price, quantity, sampling and lead time are appended by the page as "discuss". */
  specification: SpecRow[];
  logoPositions: string[];
  faqs: FaqItem[];
  /**
   * false when the catalogue article's image is not this garment, so the page
   * shows none rather than a different one (the work trouser card uses a
   * pull-on camo jogger).
   */
  image?: false;
  seoTitle: string;
  seoDescription: string;
};

/** Compact constructors for the content files. */
export const t = (term: string, detail: string): Term => ({ term, detail });
export const m = (point: string, how: string): Measurement => ({ point, how });
export const q = (question: string, answer: string): FaqItem => ({ question, answer });
export const s = (label: string, value: string): SpecRow => ({ label, value });
