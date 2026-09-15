import { Section } from "@/components/ui/Section";
import { MaskedHeading } from "@/components/motion/MaskedHeading";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { SmartImage, SIZES } from "@/components/ui/SmartImage";
import { Button } from "@/components/ui/Button";
import { hasAsset, type AssetKey } from "@/data/assets";

/**
 * Product development lab — editorial split.
 *
 * Sits after the process timeline to answer the follow-up question: the timeline
 * says what happens, this says what it is done with.
 */

const inputs: { title: string; body: string; asset: AssetKey }[] = [
  {
    title: "Fabric library",
    body: "Options presented against the requirement, with the commercial consequence of each attached.",
    asset: "development.swatches",
  },
  {
    title: "Trims & hardware",
    body: "Buttons, zips, drawcords, elastics and labels sourced to an approved reference.",
    asset: "development.trims",
  },
  {
    title: "Patterns & measurements",
    body: "Developed from your size specification or graded from an approved fit sample.",
    asset: "development.pattern",
  },
  {
    title: "Decoration",
    body: "Embroidery digitised and prints struck off, approved before bulk rather than during it.",
    asset: "factory.embroidery",
  },
];

const outputs = [
  "Construction specification",
  "Bill of materials",
  "Measurement chart with tolerance",
  "Approved lab dips",
  "Sealed sample",
  "Packing instruction",
  "Commercial FOB costing",
];

export function DevelopmentLab() {
  return (
    <Section zone="paper" spacing="lg" aria-labelledby="lab-heading">
      <div className="shell-wide">
        <div className="grid grid-cols-12 items-start gap-y-12 lg:gap-x-12">
          {/* Editorial column */}
          <div className="col-span-12 lg:col-span-5 lg:sticky lg:top-28">
            <MaskedHeading
              as="h2"
              id="lab-heading"
              className="mt-6 font-display text-h1 text-ink"
              lines={[{ text: "Development is where" }, { text: "better programs begin." }]}
            />
            <div className="mt-7 space-y-4 text-ink/70">
              <p className="text-lead">
                Most cost problems in apparel are decided before anything is cut.
              </p>
              <p>
                A vague specification gets quoted defensively, sampled twice and corrected in bulk.
                A resolved one gets quoted accurately the first time. Development is where that
                difference is made, and it is the cheapest place to make it.
              </p>
            </div>

            <div className="mt-9 border-t border-line pt-7">
              <p className="label mb-4 text-ink/65">What you receive</p>
              <ul className="flex flex-col gap-2.5">
                {outputs.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-ink/75">
                    <span className="mt-[0.45rem] h-1 w-1 shrink-0 bg-ink" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-9">
              <Button href="/development" variant="lime" size="lg" withArrow>
                Start a Development
              </Button>
            </div>
          </div>

          {/* Visual column */}
          <div className="col-span-12 lg:col-span-7">
            <Reveal>
              {hasAsset("development.techPack") && (
              <div className="aspect-[16/10] w-full overflow-hidden bg-paper">
                <SmartImage
                  asset="development.techPack"
                  sizes={SIZES.half}
                  className="h-full w-full"
                  imageClassName="object-cover"
                />
              </div>
              )}
            </Reveal>

            <RevealGroup className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2" stagger={0.07}>
              {inputs.filter((item) => hasAsset(item.asset)).map((item) => (
                <RevealItem key={item.title}>
                  <article className="group h-full border border-line bg-white">
                    <div className="aspect-[4/3] w-full overflow-hidden bg-paper">
                      <SmartImage
                        asset={item.asset}
                        sizes={SIZES.third}
                        className="h-full w-full"
                        imageClassName="object-cover transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-105"
                        alt=""
                      />
                    </div>
                    <div className="p-5">
                      <h3 className="font-display text-base font-bold tracking-[-0.02em] text-ink">
                        {item.title}
                      </h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-ink/65">{item.body}</p>
                    </div>
                  </article>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>
      </div>
    </Section>
  );
}
