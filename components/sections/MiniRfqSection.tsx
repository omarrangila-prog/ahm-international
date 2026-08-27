import { Section } from "@/components/ui/Section";
import { MaskedHeading } from "@/components/motion/MaskedHeading";
import { MiniRfqForm } from "@/components/forms/MiniRfqForm";
import { commercialAnswers } from "@/data/company";

/**
 * Homepage RFQ block.
 *
 * Pairs the form with the four questions buyers ask before sending one. Each
 * answer is specific about what the price depends on rather than deflecting —
 * which is what makes "it depends" read as expertise instead of evasion.
 */

export function MiniRfqSection() {
  return (
    <Section zone="ivory" spacing="lg" id="rfq" aria-labelledby="rfq-heading">
      <div className="shell-wide grid grid-cols-12 gap-y-12 lg:gap-x-12">
        <div className="col-span-12 lg:col-span-5">
          <MaskedHeading
            as="h2"
            id="rfq-heading"
            className="mt-6 font-display text-h1 text-ink"
            lines={[{ text: "Let's cost your" }, { text: "next program." }]}
          />
          <p className="mt-6 max-w-md text-ink/70">
            Six fields to start. Send the tech pack now if you have one, or send it after we have
            spoken: either works.
          </p>

          <dl className="mt-10 flex flex-col divide-y divide-ink/10 border-t border-ink/10">
            {commercialAnswers.slice(0, 4).map((item) => (
              <div key={item.question} className="py-4">
                <dt className="font-display text-[0.9375rem] font-bold tracking-[-0.015em] text-ink">
                  {item.question}
                </dt>
                <dd className="mt-1.5 text-sm leading-relaxed text-ink/60">{item.answer}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="col-span-12 lg:col-span-7">
          <MiniRfqForm />
        </div>
      </div>
    </Section>
  );
}
