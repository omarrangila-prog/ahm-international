import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/LegalPage";
import { termsSections } from "@/data/legal";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Website Terms",
  description: "What the product information on this site means, what a quotation request is, and what is governed by a signed contract instead.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="Terms"
      headingLines={[{ text: "Terms of" }, { text: "using this site.", className: "text-ink" }]}
      intro="What the product information on this site means, what a quotation request is, and what is governed by a signed contract instead."
      path="/terms"
      sections={termsSections}
    />
  );
}
