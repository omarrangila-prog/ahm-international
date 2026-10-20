import { Reveal } from "@/components/motion/Reveal";
import { numeral } from "@/lib/utils";
import type { ContentBlock } from "@/data/sourcing";

/**
 * Renders the structured content blocks used by the sourcing pillars.
 *
 * Long-form pages are stored as typed blocks rather than as markup so they stay
 * consistent, stay accessible (a table is a real `<table>` with scoped headers)
 * and could be moved into a CMS without rewriting the page.
 */

/** The anchor for a block's heading: stable, readable, and the same on every build. */
export function blockId(heading: string): string {
  return heading
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function ContentBlocks({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <div className="flex flex-col gap-16 lg:gap-20">
      {blocks.map((block, i) => (
        <Reveal key={i} as="section" id={blockId(block.heading)} className="scroll-mt-28">
          {block.type === "prose" && (
            <>
              <h2 className="font-display text-h2 text-ink">{block.heading}</h2>
              <div className="mt-6 max-w-3xl space-y-5 text-[1.0625rem] leading-relaxed text-ink/75">
                {block.body.map((paragraph, j) => (
                  <p key={j}>{paragraph}</p>
                ))}
              </div>
            </>
          )}

          {block.type === "list" && (
            <>
              <h2 className="font-display text-h2 text-ink">{block.heading}</h2>
              {block.intro && <p className="mt-4 max-w-2xl text-ink/70">{block.intro}</p>}
              <dl className="mt-8 border-t border-line">
                {block.items.map((item) => (
                  <div
                    key={item.term}
                    className="grid grid-cols-1 gap-1 border-b border-line py-4 sm:grid-cols-[14rem_1fr] sm:gap-8"
                  >
                    <dt className="font-display text-[0.9375rem] font-bold tracking-[-0.015em] text-ink">
                      {item.term}
                    </dt>
                    <dd className="text-[0.9375rem] leading-relaxed text-ink/70">{item.detail}</dd>
                  </div>
                ))}
              </dl>
            </>
          )}

          {block.type === "steps" && (
            <>
              <h2 className="font-display text-h2 text-ink">{block.heading}</h2>
              {block.intro && <p className="mt-4 max-w-2xl text-ink/70">{block.intro}</p>}
              <ol className="mt-8 border-t border-line">
                {block.steps.map((step, j) => (
                  <li key={step.title} className="grid grid-cols-[3rem_1fr] gap-4 border-b border-line py-5">
                    <span className="numeral text-lg text-ink">{numeral(j + 1)}</span>
                    <div>
                      <h3 className="font-display text-base font-bold tracking-[-0.02em] text-ink">
                        {step.title}
                      </h3>
                      <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-ink/70">{step.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </>
          )}

          {block.type === "table" && (
            <>
              <h2 className="font-display text-h2 text-ink">{block.heading}</h2>
              {block.intro && <p className="mt-4 max-w-2xl text-ink/70">{block.intro}</p>}
              {/* Wide tables scroll inside their own container rather than the page.
                  tabIndex makes that container reachable by keyboard: without it
                  the columns past the right edge cannot be scrolled to at all
                  without a pointer. The heading names the region. */}
              <div
                tabIndex={0}
                role="region"
                aria-label={block.heading}
                className="mt-8 -mx-[--spacing-gutter] overflow-x-auto px-[--spacing-gutter] sm:mx-0 sm:px-0"
              >
                <table className="w-full min-w-[36rem] border-collapse text-left">
                  <thead>
                    <tr className="border-b border-ink/25">
                      {block.columns.map((column, i) => (
                        <th key={column || `col-${i}`} scope="col" className="label py-3 pr-6 align-bottom text-ink/70">
                          {/* A comparison table's first cell is visually blank but
                              still needs a name for row/column association. */}
                          {column || <span className="sr-only">Attribute</span>}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {block.rows.map((row, j) => (
                      <tr key={j} className="border-b border-line align-top">
                        {row.map((cell, k) => (
                          <td
                            key={k}
                            className={
                              k === 0
                                ? "py-3.5 pr-6 font-display text-[0.9375rem] font-semibold tracking-[-0.015em] text-ink"
                                : "py-3.5 pr-6 text-[0.9375rem] leading-relaxed text-ink/70"
                            }
                          >
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {block.type === "formula" && (
            <>
              <h2 className="font-display text-h2 text-ink">{block.heading}</h2>
              {block.intro && <p className="mt-4 max-w-2xl text-ink/70">{block.intro}</p>}
              <p className="mt-8 max-w-3xl border-l-2 border-ink bg-paper-deep px-6 py-5 font-display text-lg font-bold tracking-[-0.01em] text-ink sm:text-xl">
                {block.formula}
              </p>
              {block.terms && (
                <dl className="mt-6 max-w-3xl text-[0.9375rem]">
                  {block.terms.map((t) => (
                    <div key={t.symbol} className="grid grid-cols-[6rem_1fr] gap-4 border-b border-line py-2.5">
                      <dt className="font-display font-bold text-ink">{t.symbol}</dt>
                      <dd className="leading-relaxed text-ink/70">{t.meaning}</dd>
                    </div>
                  ))}
                </dl>
              )}
              <h3 className="label mt-10 text-ink/65">Worked examples</h3>
              <ol className="mt-3 border-t border-line">
                {block.examples.map((e) => (
                  <li key={e.label} className="grid grid-cols-1 gap-1 border-b border-line py-4 sm:grid-cols-[13rem_1fr_auto] sm:items-baseline sm:gap-6">
                    <span className="font-display text-[0.9375rem] font-bold tracking-[-0.015em] text-ink">{e.label}</span>
                    <span className="text-[0.9375rem] leading-relaxed text-ink/70">{e.working}</span>
                    <span className="font-display text-[0.9375rem] font-bold text-ink">{e.result}</span>
                  </li>
                ))}
              </ol>
              {block.limits && <p className="mt-5 max-w-3xl text-sm leading-relaxed text-ink/70">{block.limits}</p>}
            </>
          )}

          {block.type === "callout" && (
            <div className="border-l-2 border-ink bg-paper p-6 lg:p-8">
              <h2 className="font-display text-h3 text-ink">{block.heading}</h2>
              <p className="mt-3 max-w-3xl text-[0.9375rem] leading-relaxed text-ink/75">{block.body}</p>
            </div>
          )}
        </Reveal>
      ))}
    </div>
  );
}
