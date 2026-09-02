"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import type { FaqItem } from "./Faq";

/**
 * Buyer FAQ list.
 *
 * The interactive half of `<Faq>`, which wraps this and emits the FAQPage
 * structured data. Kept separate because that schema must be server-rendered
 * and this needs client state.
 *
 * Answers are in the server-rendered HTML and only *visually* collapsed, so the
 * content is available to crawlers and to a reader without JavaScript.
 * Collapsing content that only exists after a click is a real indexing risk;
 * collapsing content already in the document is not.
 *
 * The open/close transition uses `grid-template-rows: 0fr -> 1fr`, which
 * animates to the content's natural height with no measurement and no
 * animation library.
 */

export function FaqList({
  items,
  tone = "light",
  className,
}: {
  items: readonly FaqItem[];
  tone?: "light" | "dark";
  className?: string;
}) {
  const [open, setOpen] = useState<number | null>(0);
  const dark = tone === "dark";

  return (
    <div className={cn("border-t", dark ? "border-current/15" : "border-line", className)}>
      {items.map((item, i) => {
        const expanded = open === i;
        return (
          <div key={item.question} className={cn("border-b", dark ? "border-current/15" : "border-line")}>
            <h3>
              <button
                type="button"
                onClick={() => setOpen(expanded ? null : i)}
                aria-expanded={expanded}
                aria-controls={`faq-panel-${i}`}
                id={`faq-trigger-${i}`}
                className="group flex w-full items-start justify-between gap-6 py-5 text-left"
              >
                <span
                  className={cn(
                    "font-display text-base font-bold tracking-[-0.02em] transition-colors sm:text-lg",
                    dark ? "text-current group-hover:text-lime" : "text-ink group-hover:text-ink",
                  )}
                >
                  {item.question}
                </span>
                <Plus
                  className={cn(
                    "mt-1 h-4 w-4 shrink-0 transition-transform duration-300 ease-[var(--ease-out-expo)]",
                    expanded && "rotate-45",
                    dark ? "text-current/70" : "text-ink/60",
                  )}
                  aria-hidden="true"
                />
              </button>
            </h3>

            <div
              id={`faq-panel-${i}`}
              role="region"
              aria-labelledby={`faq-trigger-${i}`}
              className="collapse-grid"
              data-open={expanded ? "true" : "false"}
            >
              <div>
                <p
                  className={cn(
                    "max-w-3xl pb-6 pr-10 text-[0.9375rem] leading-relaxed",
                    dark ? "text-current/70" : "text-ink/70",
                  )}
                >
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
