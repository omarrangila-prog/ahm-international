import { JsonLd } from "@/components/ui/JsonLd";
import { faqSchema } from "@/lib/seo";
import { FaqList } from "./FaqList";

/**
 * Buyer FAQ.
 *
 * A server component that renders the questions *and* their `FAQPage`
 * structured data together, from the same array.
 *
 * They were separate before, and the two drifted in both directions. Seven
 * pages — export, materials, quality, development, sourcing, sustainability
 * and request-a-quote — showed a buyer FAQ with no schema at all, so none of
 * them was eligible for the rich result. The homepage had the opposite problem:
 * it emitted `FAQPage` for the commercial answers while rendering none of them,
 * which is the case Google's structured data policy explicitly forbids, since
 * the content has to be visible on the page it is claimed for.
 *
 * Binding the two makes both failures unreachable. A page cannot show an FAQ
 * without describing it, and cannot describe one it does not show.
 *
 * `<Faq>` appears at most once per page, so this emits exactly one FAQPage
 * block per document. If a page ever needs two lists, they must be concatenated
 * into one `<Faq>` rather than rendered twice — two FAQPage blocks on one URL
 * is not a supported shape.
 */

export type FaqItem = { question: string; answer: string };

export function Faq({
  items,
  tone = "light",
  className,
}: {
  items: readonly FaqItem[];
  tone?: "light" | "dark";
  className?: string;
}) {
  if (!items.length) return null;

  return (
    <>
      <JsonLd data={faqSchema(items)} />
      <FaqList items={items} tone={tone} className={className} />
    </>
  );
}
