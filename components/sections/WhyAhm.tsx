import { Section, Eyebrow } from "@/components/ui/Section";
import { MaskedHeading } from "@/components/motion/MaskedHeading";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { whyAhm } from "@/data/capabilities";
import { numeral } from "@/lib/utils";

/**
 * Why AHM.
 *
 * Six positions, each stated as a commercial consequence. Deliberately avoids
 * the "leading manufacturer / best quality / customer satisfaction" register —
 * those phrases carry no information, and a procurement director reads them as
 * an absence of anything specific to say.
 */

export function WhyAhm() {
  return (
    <Section zone="paper" spacing="lg" aria-labelledby="why-heading">
      <div className="shell-wide">
        <div className="max-w-4xl">
          <Eyebrow>Why AHM</Eyebrow>
            <MaskedHeading
              as="h2"
              id="why-heading"
              className="mt-6 font-display text-display text-ink"
              lines={[{ text: "Six reasons" }, { text: "worth one" }, { text: "test order.", className: "text-ink" }]}
            />
          <p className="mt-7 max-w-2xl text-lead text-ink/70">
              None of these are claims about being the biggest or the cheapest. They are the things
              that decide whether a second order follows the first.
            </p>
        </div>

        <RevealGroup
          className="mt-16 grid grid-cols-1 gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3"
          stagger={0.06}
        >
          {whyAhm.map((item) => (
            <RevealItem key={item.index}>
              <article className="group h-full bg-paper p-7 transition-colors duration-300 hover:bg-paper lg:p-8">
                <div className="flex items-baseline gap-4">
                  <span className="numeral text-[2rem] text-ink/65 transition-colors duration-300 group-hover:text-ink">
                    {numeral(item.index)}
                  </span>
                  <span
                    className="h-px flex-1 bg-ink/12 transition-colors duration-300 group-hover:bg-ink/40"
                    aria-hidden="true"
                  />
                </div>
                <h3 className="mt-6 font-display text-lg font-extrabold uppercase tracking-[-0.02em] text-ink">
                  {item.title}
                </h3>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink/65">{item.body}</p>
              </article>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </Section>
  );
}
