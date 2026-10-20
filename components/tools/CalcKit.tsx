"use client";

import { useId } from "react";

/**
 * Shared parts for the buyer calculators.
 *
 * Every calculator shows the same four things in the same order: the inputs,
 * the result, the formula and what it assumes. A result nobody can check is a
 * claim, and these are only worth having as arithmetic a reader can repeat.
 */

/** A number from a text box. Empty, partial or unreadable input is `NaN`, never zero. */
export const num = (s: string): number => (s.trim() === "" ? NaN : Number(s.trim().replace(",", ".")));

/** Fixed digits, with thousands separators, and no false precision on large numbers. */
export const fmt = (n: number | null | undefined, digits = 2): string =>
  n === null || n === undefined || !Number.isFinite(n) ? "n/a" : n.toLocaleString("en-US", { maximumFractionDigits: digits, minimumFractionDigits: 0 });

export function CalcCard({
  id,
  title,
  intro,
  formula,
  limits,
  onReset,
  result,
  children,
}: {
  id: string;
  title: string;
  intro: string;
  formula: string;
  limits: string;
  onReset: () => void;
  result: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-28 border-t border-ink/20 py-12">
      <h2 id={`${id}-title`} className="font-display text-h2 text-ink">
        {title}
      </h2>
      <p className="mt-4 max-w-2xl text-ink/70">{intro}</p>
      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12">
        <form className="lg:col-span-6" onSubmit={(e) => e.preventDefault()} aria-label={`${title}: inputs`}>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">{children}</div>
          <button type="button" onClick={onReset} className="mt-6 inline-flex min-h-11 items-center border border-ink/30 px-4 text-sm font-medium text-ink hover:border-ink">
            Reset
          </button>
        </form>
        <div className="lg:col-span-6">
          <div role="status" aria-live="polite" className="min-h-[7rem] border-l-2 border-ink bg-paper-deep px-6 py-5">
            {result}
          </div>
          <dl className="mt-6 space-y-4 text-sm leading-relaxed">
            <div>
              <dt className="label text-ink/65">Formula</dt>
              <dd className="mt-1 text-ink/80">{formula}</dd>
            </div>
            <div>
              <dt className="label text-ink/65">Assumptions and limits</dt>
              <dd className="mt-1 text-ink/70">{limits}</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}

const control = "min-h-11 w-full border border-ink/25 bg-white px-3 text-base text-ink";

export function NumField({ label, value, onChange, unit, hint }: { label: string; value: string; onChange: (v: string) => void; unit?: string; hint?: string }) {
  const id = useId();
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="label text-ink/75">
        {label}
        {unit && <span className="ml-1 normal-case tracking-[0.05em] text-ink/65">({unit})</span>}
      </label>
      <input id={id} type="text" inputMode="decimal" autoComplete="off" value={value} onChange={(e) => onChange(e.target.value)} aria-describedby={hint ? `${id}-h` : undefined} className={control} />
      {hint && (
        <p id={`${id}-h`} className="text-xs text-ink/65">
          {hint}
        </p>
      )}
    </div>
  );
}

export function SelectField<T extends string>({ label, value, onChange, options }: { label: string; value: T; onChange: (v: T) => void; options: { value: T; label: string }[] }) {
  const id = useId();
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="label text-ink/75">
        {label}
      </label>
      <select id={id} value={value} onChange={(e) => onChange(e.target.value as T)} className={control}>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}

/** One line of a result: a label and a figure. */
export function Line({ label, value, strong }: { label: string; value: string; strong?: boolean }) {
  return (
    <p className="flex items-baseline justify-between gap-4 border-b border-line py-1.5 last:border-0">
      <span className="text-sm text-ink/70">{label}</span>
      <span className={strong ? "font-display text-lg font-bold text-ink" : "font-display font-semibold text-ink"}>{value}</span>
    </p>
  );
}

export const Hint = ({ children }: { children: React.ReactNode }) => <p className="text-sm leading-relaxed text-ink/70">{children}</p>;
