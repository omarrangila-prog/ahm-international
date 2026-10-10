import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/LegalPage";
import { ConsentReset } from "@/components/analytics/Measurement";
import { cookieSections } from "@/data/legal";
import { measurementEnabled } from "@/lib/measurement";
import { pageMetadata } from "@/lib/seo";

// The page's own headline makes the same claim as its sections, so it follows
// the same switch: with no measurement ID there is genuinely no banner.
const intro = measurementEnabled
  ? "This website sets no advertising cookies. Analytics load only if you allow them, and you can change that choice here at any time."
  : "This website sets no advertising or tracking cookies and runs no third-party analytics. What is actually stored, and what happens if that changes.";

export const metadata: Metadata = pageMetadata({
  title: "Cookie Notice",
  description: intro,
  path: "/cookies",
});

export default function CookiesPage() {
  return (
    <LegalPage
      eyebrow="Cookies"
      headingLines={
        measurementEnabled
          ? [{ text: "Cookies, and" }, { text: "your choice.", className: "text-ink" }]
          : [{ text: "Cookies, and" }, { text: "why there's no banner.", className: "text-ink" }]
      }
      intro={intro}
      path="/cookies"
      sections={cookieSections}
    >
      <ConsentReset />
    </LegalPage>
  );
}
