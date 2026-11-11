import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/LegalPage";
import { ConsentReset } from "@/components/analytics/Measurement";
import { VisitorCountingSwitch } from "@/components/analytics/VisitorCountingSwitch";
import { cookieSections } from "@/data/legal";
import { storageEnabled } from "@/lib/storage/namespace";
import { measurementEnabled } from "@/lib/measurement";
import { pageMetadata } from "@/lib/seo";

// The page's own headline makes the same claim as its sections, so it follows
// the same switches: the measurement ID, and the store the visit counter
// writes to (no store, no counter, no cookie).
const counting = storageEnabled();
const intro = measurementEnabled
  ? "This website sets no advertising cookies. Analytics load only if you allow them, and you can change that choice here at any time."
  : counting
    ? "No advertising cookies and no third-party analytics. One cookie of our own holds a date to count visitors, and you can switch it off here."
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
          : counting
            ? [{ text: "Cookies, and" }, { text: "the one we set.", className: "text-ink" }]
            : [{ text: "Cookies, and" }, { text: "why there's no banner.", className: "text-ink" }]
      }
      intro={intro}
      path="/cookies"
      sections={cookieSections}
    >
      <ConsentReset />
      {counting && <VisitorCountingSwitch />}
    </LegalPage>
  );
}
