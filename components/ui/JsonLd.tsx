import { serialiseJsonLd } from "@/lib/json-ld";

/**
 * Emits a JSON-LD block.
 *
 * Structured data must describe what is actually on the page. Every schema this
 * site emits is generated from the same data the components render, so the two
 * cannot drift apart — the failure mode where markup claims a price, rating or
 * certification the page does not show is not reachable from here.
 */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serialiseJsonLd(data) }}
    />
  );
}
