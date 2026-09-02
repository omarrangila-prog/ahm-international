import type { Metadata, Viewport } from "next";
import { Archivo, Instrument_Sans } from "next/font/google";
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
 * Archivo for display, Instrument Sans for text.
 *
 * Manrope and Inter, the original pairing, are the default sound of a SaaS
 * landing page: competent and identical to a thousand other sites. Bricolage
 * Grotesque replaced them and was better, but at the size these headlines run
 * its humanist wobble reads as design-school rather than as a factory.
 *
 * Archivo descends from industrial and newspaper grotesques and was drawn for
 * headlines. Set large and uppercase it reads like signage on a building, which
 * is the right voice for a manufacturer who ships under FOB terms. Its `wdth`
 * axis is loaded and used: the display scale runs slightly expanded, which is
 * where the character is and what keeps it from being another neutral grotesque.
 *
 * Instrument Sans stays underneath — plain enough to keep specification tables
 * legible, which is most of this site.
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
const display = Archivo({
  subsets: ["latin"],
  variable: "--font-display-face",
  display: "optional",
  axes: ["wdth"],
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
