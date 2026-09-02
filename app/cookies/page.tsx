import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/LegalPage";
import { cookieSections } from "@/data/legal";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Cookie Notice",
  description: "This website sets no advertising or tracking cookies and runs no third-party analytics. What is actually stored, and what happens if that changes.",
  path: "/cookies",
});

export default function CookiesPage() {
  return (
    <LegalPage
      eyebrow="Cookies"
      headingLines={[{ text: "Cookies, and" }, { text: "why there's no banner.", className: "text-ink" }]}
      intro="This website sets no advertising or tracking cookies and runs no third-party analytics. What is actually stored, and what happens if that changes."
      path="/cookies"
      sections={cookieSections}
    />
  );
}
