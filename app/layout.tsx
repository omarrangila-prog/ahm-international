import type { Metadata, Viewport } from "next";
import { Manrope, Inter } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { RouteTransition } from "@/components/motion/RouteTransition";
import { Footer } from "@/components/layout/Footer";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { MobileCtaBar } from "@/components/layout/MobileCtaBar";
import { organizationSchema, websiteSchema, siteConfig } from "@/lib/seo";
import { serialiseJsonLd } from "@/lib/json-ld";
import { company } from "@/data/company";
import "./globals.css";

/* Self-hosted by next/font — no render-blocking request to Google. */
/**
 * Loaded as a variable font rather than as static instances.
 *
 * Three static Manrope weights cost ~48 kB; the variable file covers the whole
 * range in roughly half that — and since the display type is the largest text
 * on the page, the font is what LCP waits on.
 *
 * `display: "optional"`, not "swap". This page is heading-heavy — Manrope sets
 * every large multi-line title site-wide — and "swap" forces a fallback-to-web-
 * font reflow the instant the file arrives, which cascades through a dozen
 * headings and moves everything below them, including the footer, by a large
 * fraction of the page height. Measured: that swap alone produced a CLS of
 * 0.284 in production. "optional" renders in the fallback face if the font is
 * not ready within the browser's first ~100ms of layout and simply keeps that
 * choice for the rest of the paint — no swap, no reflow. The font is
 * self-hosted and preloaded, so on anything but a very slow first load it is
 * ready in time anyway; the small remaining risk is a fallback-face read on a
 * cold, slow connection, in exchange for the site never being visibly unstable.
 */
const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "optional",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
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
    <html lang="en" className={`${manrope.variable} ${inter.variable}`}>
      <body className="antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-ink focus:px-5 focus:py-3 focus:font-display focus:text-sm focus:font-bold focus:text-cream"
        >
          Skip to content
        </a>

        <AnnouncementBar />
        <Header />

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
