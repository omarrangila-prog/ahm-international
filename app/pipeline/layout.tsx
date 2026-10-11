import type { Metadata } from "next";

/**
 * The enquiry register: internal, signed-in, never indexed.
 *
 * robots.txt disallows the path as well, and the public header, footer and
 * call-to-action bars are hidden here (components/layout/PublicChrome.tsx):
 * staff working through enquiries do not need a "Request a quote" button.
 *
 * No auth check here. A layout does not re-run on navigation and does not stop
 * its children rendering, so every page and action checks for itself.
 */
export const metadata: Metadata = {
  title: { default: "Enquiry register", template: "%s | Enquiry register" },
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
};

export default function PipelineLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-[80vh] bg-paper text-ink">{children}</div>;
}
