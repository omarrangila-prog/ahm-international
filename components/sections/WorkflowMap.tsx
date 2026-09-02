"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import {
  workflowGroups,
  stagesInGroup,
  WORKFLOW_STAGE_COUNT,
  type WorkflowGroup,
} from "@/data/workflow";
import { cn, numeral } from "@/lib/utils";

/**
 * THE 26-STAGE WORKFLOW MAP
 * =========================
 *
 * Master spec §17, including its warning: "Do not show 26 equally-sized cards on
 * one screen."
 *
 * Six phases, one open at a time. The value of the accordion is not tidiness —
 * it is that a buyer mid-program can find the phase they are in and read only
 * that. Twenty-six flat cards make that lookup impossible, which is why the spec
 * forbids them.
 *
 * The three columns inside each stage are the same three every time: what
 * happens, what you provide, what you get. Held constant so the table can be
 * scanned vertically for the column that matters to the reader — and the middle
 * one usually does, because a missing buyer input is the most common reason a
 * program stalls.
 */
export function WorkflowMap() {
  const [open, setOpen] = useState<WorkflowGroup | null>("develop");

  return (
    <div className="divide-y divide-ink/15 border-y border-ink/15">
      {workflowGroups.map((g) => {
        const stages = stagesInGroup(g.id);
        const isOpen = open === g.id;
        const panelId = `workflow-panel-${g.id}`;
        const first = stages[0]?.index ?? 0;
        const last = stages[stages.length - 1]?.index ?? 0;

        return (
          <div key={g.id}>
            <h3>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : g.id)}
                className="group flex w-full items-center gap-4 py-6 text-left transition-colors hover:bg-ink/[0.03] sm:gap-6 sm:px-2"
              >
                <span className="numeral shrink-0 text-2xl leading-none text-ink/60 sm:text-3xl">
                  {numeral(first)}–{numeral(last)}
                </span>
                <span className="flex-1">
                  <span className="block font-display text-xl font-extrabold uppercase leading-none tracking-[-0.02em] text-ink sm:text-2xl">
                    {g.label}
                  </span>
                  <span className="mt-1.5 block text-sm text-ink/60">{g.summary}</span>
                </span>
                <span className="label hidden shrink-0 text-ink/65 sm:block">
                  {stages.length} stages
                </span>
                <ChevronDown
                  className={cn(
                    "h-5 w-5 shrink-0 text-ink/50 transition-transform duration-300",
                    isOpen && "rotate-180",
                  )}
                  aria-hidden="true"
                />
              </button>
            </h3>

            {isOpen && (
              <div id={panelId} className="pb-8 sm:px-2">
                <ol className="space-y-px">
                  {stages.map((s) => (
                    <li
                      key={s.index}
                      className="grid grid-cols-1 gap-x-6 gap-y-3 border-t border-ink/10 py-5 md:grid-cols-12"
                    >
                      <div className="md:col-span-3">
                        <span className="numeral text-sm text-ink">{numeral(s.index)}</span>
                        <p className="mt-1 font-display text-sm font-bold uppercase leading-tight tracking-tight text-ink">
                          {s.name}
                        </p>
                      </div>
                      <p className="text-sm leading-relaxed text-ink/70 md:col-span-4">
                        {s.whatHappens}
                      </p>
                      <div className="md:col-span-2">
                        <span className="label text-ink/65">You provide</span>
                        <p className="mt-1 text-sm leading-relaxed text-ink/70">
                          {s.buyerProvides ?? <span className="text-ink/65">Nothing at this stage</span>}
                        </p>
                      </div>
                      <div className="md:col-span-3">
                        <span className="label text-ink/65">You receive</span>
                        <p className="mt-1 text-sm leading-relaxed text-ink/70">{s.ahmDelivers}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            )}
          </div>
        );
      })}

      <p className="py-6 text-sm text-ink/65">
        {WORKFLOW_STAGE_COUNT} stages, six phases. Every one of them either produces
        something you can inspect or asks you for something — there is no stage where
        the program is simply in progress.
      </p>
    </div>
  );
}
