import { Section, Eyebrow } from "@/components/ui/Section";
import { MaskedHeading } from "@/components/motion/MaskedHeading";
import { ArrowLink } from "@/components/ui/Button";
import { company } from "@/data/company";
import { hybridBenefits } from "@/data/manufacturing-network";

/**
 * Homepage section 02: the manufacturing model.
 *
 * AHM runs its own manufacturing and works with specialist partner factories.
 * The section says both in the same breath because the failure it guards
 * against is the familiar one, where a partner's floor is allowed to read as
 * the supplier's own. The two panels are deliberately equal in weight.
 *
 * The full matrix, the facility facts that are and are not published, and the
 * questions a buyer should ask live on /manufacturing-network.
 */

export function ManufacturingModel() {
  const model = company.manufacturingModel;

  return (
    <Section zone="ink" spacing="lg" tooth aria-labelledby="model-heading">
      <div className="shell-wide relative z-10">
        <div className="grid grid-cols-12 gap-y-8 lg:gap-x-12">
          <div className="col-span-12 lg:col-span-7">
            <Eyebrow>Manufacturing model</Eyebrow>
            <MaskedHeading
              as="h2"
              id="model-heading"
              className="mt-5 font-display text-display text-paper"
              lines={[
                { text: "OWN MANUFACTURING." },
                { text: "SPECIALIST PARTNERS." },
                { text: "ONE PROGRAM.", className: "text-lime" },
              ]}
            />
          </div>
          <p className="col-span-12 max-w-xl text-lead text-paper/70 lg:col-span-5 lg:self-end">
            {model.summary}
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-px border border-paper/15 bg-paper/15 md:grid-cols-2">
          <div className="bg-ink p-8 lg:p-10">
            <p className="label text-lime">01 · Own operations</p>
            <h3 className="mt-4 font-display text-h3 text-paper">AHM-run manufacturing</h3>
            <p className="mt-4 max-w-md text-paper/70">
              Development, production and quality coordination under AHM&apos;s own management.
            </p>
          </div>
          <div className="bg-ink p-8 lg:p-10">
            <p className="label text-lime">02 · Partner factories</p>
            <h3 className="mt-4 font-display text-h3 text-paper">Specialist partners</h3>
            <p className="mt-4 max-w-md text-paper/70">
              Independent factories for products and requirements an operation is better equipped for. Never
              described as AHM&apos;s own.
            </p>
          </div>
        </div>

        <ul className="mt-10 grid grid-cols-1 gap-x-10 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
          {hybridBenefits.map((b) => (
            <li key={b.title} className="border-t border-paper/15 pt-4">
              <p className="font-display text-base font-bold tracking-[-0.015em] text-paper">{b.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-paper/70">{b.body}</p>
            </li>
          ))}
        </ul>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-6 border-t border-paper/15 pt-6">
          <p className="max-w-lg text-sm text-paper/70">
            Which families are made where, and what to ask about your own order.
          </p>
          <ArrowLink href="/manufacturing-network" className="text-paper">
            Explore the manufacturing network
          </ArrowLink>
        </div>
      </div>
    </Section>
  );
}
