import { Section, type ZoneName } from "@/components/ui/Section";
import { MaskedHeading } from "@/components/motion/MaskedHeading";
import { Button } from "@/components/ui/Button";

/**
 * Closing call to action.
 *
 * Every route ends with a specific next step rather than "contact us" — the
 * label names the action the page has been arguing for, so the ask matches what
 * the reader has just been persuaded of.
 */
export function CtaBand({
  headingLines,
  body,
  primary,
  secondary,
  zone = "ink",
}: {
  headingLines: (string | { text: string; className?: string })[];
  body: string;
  primary: { label: string; href: string };
  secondary?: { label: string; href: string };
  zone?: ZoneName;
}) {
  const dark = ["ink", "ink", "ink", "ink", "ink"].includes(zone);

  return (
    <Section data-print="hide" zone={zone} spacing="md" tooth>
      <div className="shell-wide relative z-10 grid grid-cols-12 items-end gap-y-8 lg:gap-x-12">
        <div className="col-span-12 lg:col-span-7">
          <MaskedHeading
            as="h2"
            className="font-display text-display"
            lines={headingLines}
          />
        </div>
        <div className="col-span-12 lg:col-span-5">
          <p className={dark ? "text-current/80" : "text-ink/85"}>{body}</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Button href={primary.href} variant={dark ? "lime" : "solid"} size="lg" withArrow>
              {primary.label}
            </Button>
            {secondary && (
              <Button href={secondary.href} variant={dark ? "invert" : "outline"} size="lg">
                {secondary.label}
              </Button>
            )}
          </div>
        </div>
      </div>
    </Section>
  );
}
