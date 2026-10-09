import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { notClaimed } from "@/data/sourcing-context";

/**
 * Homepage honesty band.
 *
 * The capability marquee says what AHM does. This says what the site refuses to
 * invent — the credibility move most supplier sites skip. Content is derived
 * from `notClaimed` so the homepage and the sourcing-context page cannot drift.
 */
export function HonestyBand() {
  return (
    <Section zone="paper" spacing="md" aria-labelledby="honesty-heading">
      <div className="shell-wide">
        <div className="grid grid-cols-12 gap-y-8 lg:gap-x-12">
          <div className="col-span-12 lg:col-span-4">
            <p className="label text-ink/65">Credibility</p>
            <h2
              id="honesty-heading"
              className="mt-4 font-display text-h2 text-ink"
            >
              What this site does not claim.
            </h2>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-ink/70">
              A short list is more trustworthy than a long one padded with
              numbers nobody can evidence.{" "}
              <Link
                href="/about"
                className="text-ink underline decoration-ink/30 underline-offset-4 hover:decoration-ink"
              >
                See the full record
              </Link>
              .
            </p>
          </div>
          <ul className="col-span-12 grid grid-cols-1 gap-px border border-line bg-line sm:grid-cols-2 lg:col-span-8">
            {notClaimed.map((row) => (
              <li key={row.claim} className="bg-paper p-6">
                <p className="font-display text-sm font-bold tracking-[-0.01em] text-ink">
                  Not claimed: {row.claim}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-ink/65">{row.position}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
