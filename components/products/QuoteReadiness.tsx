"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, Copy } from "lucide-react";
import { rfqInputs } from "@/data/rfq-inputs";
import { cn } from "@/lib/utils";

/**
 * QUOTE READINESS
 * ===============
 *
 * The same ten inputs that were here as a static table, made countable.
 *
 * The reason is a specific one. A buyer scoping a program is rarely the person
 * holding all the answers — the fabric requirement sits with technical, the
 * ratio with merchandising, the artwork with brand. A printed list tells them
 * what is needed; a checklist tells them what to go and ask for, and the copy
 * button hands them that request already written.
 *
 * It is not a gate and must never read as one. The page says to send what you
 * have, so the call to action stays live at zero ticked and the outstanding
 * items are framed as what AHM will come back and ask, not as a blocked form.
 *
 * Nothing is submitted, stored or transmitted: the state lives in this component
 * for as long as the tab is open. That is worth being exact about, because a
 * form that looks like it is collecting a specification is one a buyer would
 * reasonably expect to have reached us.
 */
export function QuoteReadiness() {
  const [have, setHave] = useState<Set<string>>(new Set());
  const [copied, setCopied] = useState<"idle" | "done" | "failed">("idle");

  const outstanding = rfqInputs.filter((input) => !have.has(input.id));
  const ready = rfqInputs.length - outstanding.length;

  function toggle(id: string) {
    setHave((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
    setCopied("idle");
  }

  const outstandingText = outstanding.map((i) => `- ${i.label}: ${i.detail}`).join("\n");

  async function copyOutstanding() {
    try {
      await navigator.clipboard.writeText(
        `Still to confirm before the RFQ goes to AHM International:\n\n${outstandingText}`,
      );
      setCopied("done");
    } catch {
      // Clipboard access is refused in insecure contexts and by some policies.
      // Falling back to showing the text is the difference between "copy" doing
      // nothing at all and the reader being able to select it themselves.
      setCopied("failed");
    }
  }

  return (
    <div>
      <ul className="border-t border-line">
        {rfqInputs.map((input) => {
          const checked = have.has(input.id);
          return (
            <li key={input.id} className="border-b border-line">
              <label className="flex cursor-pointer items-start gap-4 py-4">
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => toggle(input.id)}
                  className="peer sr-only"
                />
                <span
                  aria-hidden="true"
                  className={cn(
                    "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center border transition-colors duration-200 motion-reduce:transition-none",
                    // The real control is `sr-only`, so keyboard focus would
                    // otherwise land on an element with nothing to show for it.
                    "peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-ink",
                    checked ? "border-ink bg-ink text-white" : "border-ink/30 bg-white",
                  )}
                >
                  {checked && <Check className="h-3.5 w-3.5" strokeWidth={3} />}
                </span>
                <span className="min-w-0">
                  <span
                    className={cn(
                      "block font-display text-sm font-bold uppercase tracking-[0.02em] transition-colors duration-200 motion-reduce:transition-none",
                      checked ? "text-ink/50" : "text-ink",
                    )}
                  >
                    {input.label}
                  </span>
                  <span className="mt-1 block text-sm leading-relaxed text-ink/70">
                    {input.detail}
                  </span>
                </span>
              </label>
            </li>
          );
        })}
      </ul>

      <div className="mt-8 border border-line bg-white p-6">
        <p aria-live="polite" className="font-display text-base font-bold tracking-[-0.02em] text-ink">
          {ready} of {rfqInputs.length} ready
          {outstanding.length > 0 && (
            <span className="font-normal text-ink/70">
              {" "}
              — send it anyway, and we will come back on the rest.
            </span>
          )}
        </p>

        {/* A bar, not a score. It never turns red and there is no failing value. */}
        <div className="mt-4 h-1 w-full bg-ink/10">
          <div
            className="h-full bg-ink transition-[width] duration-500 ease-[var(--ease-out-expo)] motion-reduce:transition-none"
            style={{ width: `${(ready / rfqInputs.length) * 100}%` }}
          />
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-4">
          <Link
            href="/request-a-quote"
            className="group inline-flex items-center gap-2 border border-ink bg-ink px-5 py-3 font-display text-sm font-bold uppercase tracking-[0.08em] text-paper transition-colors duration-300 hover:border-lime hover:bg-lime hover:text-ink motion-reduce:transition-none"
          >
            Request FOB quote
            <ArrowRight
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none"
              aria-hidden="true"
            />
          </Link>

          {outstanding.length > 0 && (
            <button
              type="button"
              onClick={copyOutstanding}
              className="inline-flex items-center gap-2 border border-ink/25 px-5 py-3 font-display text-sm font-bold uppercase tracking-[0.08em] text-ink transition-colors duration-300 hover:border-ink motion-reduce:transition-none"
            >
              <Copy className="h-4 w-4" aria-hidden="true" />
              {copied === "done" ? "Copied" : `Copy the ${outstanding.length} outstanding`}
            </button>
          )}
        </div>

        {copied === "failed" && (
          <div className="mt-5">
            <p className="text-sm text-ink/70">
              Your browser would not let the page write to the clipboard. The list is here to
              copy by hand.
            </p>
            <pre className="mt-3 overflow-x-auto whitespace-pre-wrap border border-line bg-paper p-4 text-xs leading-relaxed text-ink/80">
              {outstandingText}
            </pre>
          </div>
        )}

        <p className="mt-5 text-xs leading-relaxed text-ink/70">
          Nothing here is sent to us or saved. It is a checklist for your own use while you
          gather the brief.
        </p>
      </div>
    </div>
  );
}
