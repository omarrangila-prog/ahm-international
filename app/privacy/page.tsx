import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/LegalPage";
import { privacySections } from "@/data/legal";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy",
  description: "How AHM International handles enquiry data, tech packs and uploaded files. What is collected, why, how long it is kept, and how to have it deleted.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="Privacy"
      headingLines={[{ text: "What we collect," }, { text: "and what we don't.", className: "text-ink" }]}
      intro="How AHM International handles enquiry data, tech packs and uploaded files. What is collected, why, how long it is kept, and how to have it deleted."
      path="/privacy"
      sections={privacySections}
    />
  );
}
