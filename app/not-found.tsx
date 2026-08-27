import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { SmartImage, SIZES } from "@/components/ui/SmartImage";

/**
 * Without this the 404 inherits the root default title, which duplicated a real
 * sourcing page — two URLs claiming the same title, one of them an error.
 */
export const metadata: Metadata = {
  title: "Page not found",
  description:
    "This page does not exist. Browse products, manufacturing capabilities, materials or send a tech pack for FOB costing.",
  robots: { index: false, follow: true },
};

/**
 * 404.
 *
 * Routes to the pages a lost buyer most likely wanted rather than dumping them
 * on the homepage. Missing URLs are not redirected — a 404 that tells the truth
 * is more useful to both the visitor and the crawler than a redirect that hides
 * a broken link.
 */
export default function NotFound() {
  return (
    <Section zone="cream" spacing="lg">
      <div className="shell-wide grid grid-cols-12 items-center gap-y-12 lg:gap-x-12">
        <div className="col-span-12 lg:col-span-7">
          {/* Not announced. The heading below carries the message, but it is
              still visible, so it meets the large-text contrast threshold rather
              than sitting at a decorative 15%. Scaled down so it stays
              subordinate to the headline at the higher weight. */}
          <p className="numeral text-[clamp(3.5rem,11vw,7rem)] text-ink/55" aria-hidden="true">
            404
          </p>
          <h1 className="mt-4 font-display text-display text-ink">
            This page isn&apos;t
            <span className="block text-cobalt">in the specification.</span>
          </h1>
          <p className="mt-7 max-w-lg text-lead text-ink/70">
            The URL you followed doesn&apos;t exist. Here is where most people are heading.
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <Button href="/products" size="lg" withArrow>
              View Products
            </Button>
            <Button href="/send-tech-pack" variant="outline" size="lg">
              Send Tech Pack
            </Button>
          </div>

          <ul className="mt-10 grid grid-cols-2 gap-x-8 gap-y-3 border-t border-line pt-6 sm:grid-cols-3">
            {[
              { label: "Capabilities", href: "/capabilities" },
              { label: "Manufacturing", href: "/manufacturing" },
              { label: "Materials", href: "/materials" },
              { label: "Quality", href: "/quality" },
              { label: "FOB export", href: "/export" },
              { label: "Contact", href: "/contact" },
            ].map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-sm text-ink/65 underline-offset-4 transition-colors hover:text-cobalt hover:underline">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="col-span-12 lg:col-span-5">
          <div className="aspect-[4/5] w-full bg-ivory text-ink">
            <SmartImage
              asset="products.apron.front"
              sizes={SIZES.half}
              className="h-full w-full"
              imageClassName="object-contain p-8"
              alt="Three-pocket bib apron, studio view"
            />
          </div>
        </div>
      </div>
    </Section>
  );
}
