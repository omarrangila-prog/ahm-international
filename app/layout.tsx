import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Instrument_Sans } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { PrintHeader } from "@/components/layout/PrintHeader";
import { RouteTransition } from "@/components/motion/RouteTransition";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { Footer } from "@/components/layout/Footer";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { MobileCtaBar } from "@/components/layout/MobileCtaBar";
import { organizationSchema, websiteSchema, siteConfig } from "@/lib/seo";
import { serialiseJsonLd } from "@/lib/json-ld";
import { company } from "@/data/company";
import "./globals.css";

/* Self-hosted by next/font — no render-blocking request to Google. */
/**
 * Bricolage Grotesque for display, Instrument Sans for text.
 *
 * The previous pairing was Manrope and Inter, which is the default sound of a
 * SaaS landing page: neutral, competent and identical to a thousand other
 * sites. This is a manufacturer of physical goods, and the type should have a
 * hand in it. Bricolage carries real width and a slightly irregular skeleton at
 * display sizes, which reads as made rather than generated; Instrument Sans is
 * plain enough underneath it to keep specification tables legible.
 *
 * Both are variable fonts, so a full weight range costs one file each.
 *
 * `display: "optional"`, not "swap". This page is heading-heavy — the display
 * face sets every large multi-line title site-wide — and "swap" forces a
 * fallback-to-webfont reflow the instant the file arrives, which cascades
 * through a dozen headings and moves everything below them, including the
 * footer, by a large fraction of the page height. Measured on the previous
 * face: that swap alone produced a CLS of 0.284 in production. "optional"
 * renders in the fallback if the font is not ready within the browser's first
 * ~100ms of layout and keeps that choice for the paint — no swap, no reflow.
 */
const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display-face",
  display: "optional",
});

const sans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-sans-face",
  display: "swap",
  // Body copy is never the largest paint; preloading it only competes with the
  // hero image and the display face for early bandwidth.
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(company.siteUrl),
  title: {
    default: "Apparel Manufacturer in Pakistan | AHM International",
    template: "%s | AHM International",
  },
  description: siteConfig.description,
  applicationName: company.name,
  authors: [{ name: company.name }],
  creator: company.name,
  publisher: company.name,
  formatDetection: { telephone: false, address: false, email: false },
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: company.siteUrl,
    siteName: company.name,
    title: "Apparel Manufacturer in Pakistan | AHM International",
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: "Apparel Manufacturer in Pakistan | AHM International",
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
};

export const viewport: Viewport = {
  themeColor: "#101315",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body className="antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-ink focus:px-5 focus:py-3 focus:font-display focus:text-sm focus:font-bold focus:text-paper"
        >
          Skip to content
        </a>

        <SmoothScroll />
        <AnnouncementBar />
        <Header />
        <PrintHeader />

        {/* Bottom padding clears the sticky mobile CTA bar. */}
        <main id="main" className="pb-14 lg:pb-0">
          <RouteTransition>{children}</RouteTransition>
        </main>

        <Footer />
        <MobileCtaBar />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serialiseJsonLd(organizationSchema()) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serialiseJsonLd(websiteSchema()) }}
        />
      </body>
    </html>
  );
}
