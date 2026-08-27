"use client";

import { forwardRef, useId } from "react";
import { cn } from "@/lib/utils";

/**
 * Form field primitives.
 *
 * Shared by the mini form and the full RFQ so validation styling, label
 * association and error announcement behave identically in both. Every control
 * gets a real `<label>` with `htmlFor`, and errors are wired through
 * `aria-describedby` with `role="alert"` so a screen reader hears the problem
 * rather than only seeing a red border.
 */

const controlBase =
  "w-full border bg-transparent px-3.5 py-3 text-[0.9375rem] text-current outline-none transition-colors duration-200 placeholder:text-current/35";

function controlTone(invalid?: boolean, tone: "light" | "dark" = "light") {
  if (invalid) return "border-orange-deep focus:border-orange-deep";
  return tone === "dark"
    ? "border-current/25 hover:border-current/45 focus:border-lime"
    : "border-ink/20 hover:border-ink/40 focus:border-cobalt";
}

type FieldShellProps = {
  label: string;
  htmlFor: string;
  error?: string;
  hint?: string;
  required?: boolean;
  className?: string;
  children: React.ReactNode;
};

export function FieldShell({
  label,
  htmlFor,
  error,
  hint,
  required,
  className,
  children,
}: FieldShellProps) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label htmlFor={htmlFor} className="label text-current/75">
        {label}
        {required && (
          <span className="ml-1 text-orange" aria-hidden="true">
            *
          </span>
        )}
        {!required && <span className="ml-2 font-normal normal-case tracking-normal">Optional</span>}
      </label>
      {children}
      {hint && !error && <p className="text-xs text-current/70">{hint}</p>}
      {error && (
        <p id={`${htmlFor}-error`} role="alert" className="text-xs font-medium text-orange-deep">
          {error}
        </p>
      )}
    </div>
  );
}

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
  hint?: string;
  tone?: "light" | "dark";
  wrapperClassName?: string;
};

export const TextField = forwardRef<HTMLInputElement, InputProps>(function TextField(
  { label, error, hint, tone = "light", required, className, wrapperClassName, id, ...rest },
  ref,
) {
  const generated = useId();
  const fieldId = id ?? generated;

  return (
    <FieldShell
      label={label}
      htmlFor={fieldId}
      error={error}
      hint={hint}
      required={required}
      className={wrapperClassName}
    >
      <input
        ref={ref}
        id={fieldId}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${fieldId}-error` : undefined}
        className={cn(controlBase, controlTone(Boolean(error), tone), className)}
        {...rest}
      />
    </FieldShell>
  );
});

type TextAreaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  error?: string;
  hint?: string;
  tone?: "light" | "dark";
  wrapperClassName?: string;
};

export const TextAreaField = forwardRef<HTMLTextAreaElement, TextAreaProps>(function TextAreaField(
  { label, error, hint, tone = "light", required, className, wrapperClassName, id, ...rest },
  ref,
) {
  const generated = useId();
  const fieldId = id ?? generated;

  return (
    <FieldShell
      label={label}
      htmlFor={fieldId}
      error={error}
      hint={hint}
      required={required}
      className={wrapperClassName}
    >
      <textarea
        ref={ref}
        id={fieldId}
        required={required}
        rows={5}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${fieldId}-error` : undefined}
        className={cn(controlBase, "resize-y", controlTone(Boolean(error), tone), className)}
        {...rest}
      />
    </FieldShell>
  );
});

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  error?: string;
  hint?: string;
  tone?: "light" | "dark";
  options: readonly string[];
  placeholder?: string;
  wrapperClassName?: string;
};

export const SelectField = forwardRef<HTMLSelectElement, SelectProps>(function SelectField(
  {
    label,
    error,
    hint,
    tone = "light",
    options,
    placeholder,
    required,
    className,
    wrapperClassName,
    id,
    ...rest
  },
  ref,
) {
  const generated = useId();
  const fieldId = id ?? generated;

  return (
    <FieldShell
      label={label}
      htmlFor={fieldId}
      error={error}
      hint={hint}
      required={required}
      className={wrapperClassName}
    >
      <div className="relative">
        <select
          ref={ref}
          id={fieldId}
          required={required}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${fieldId}-error` : undefined}
          className={cn(
            controlBase,
            "cursor-pointer appearance-none pr-9",
            controlTone(Boolean(error), tone),
            className,
          )}
          {...rest}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <svg
          className="pointer-events-none absolute right-3.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 opacity-45"
          viewBox="0 0 12 12"
          fill="none"
          aria-hidden="true"
        >
          <path d="M2.5 4.5 L6 8 L9.5 4.5" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </div>
    </FieldShell>
  );
});

/** Checkbox rendered as a selectable chip. Used for decoration routes. */
export function CheckChip({
  label,
  checked,
  onChange,
  name,
}: {
  label: string;
  checked: boolean;
  onChange: (next: boolean) => void;
  name: string;
}) {
  const id = useId();
  return (
    <label
      htmlFor={id}
      className={cn(
        "inline-flex cursor-pointer select-none items-center gap-2.5 border px-4 py-2.5 text-sm transition-colors duration-200",
        checked
          ? "border-cobalt bg-cobalt text-white"
          : "border-ink/20 text-ink/75 hover:border-ink/45",
      )}
    >
      <input
        id={id}
        type="checkbox"
        name={name}
        value={label}
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="sr-only"
      />
      <span
        aria-hidden="true"
        className={cn(
          "flex h-3.5 w-3.5 shrink-0 items-center justify-center border",
          checked ? "border-white bg-white" : "border-current/40",
        )}
      >
        {checked && (
          <svg viewBox="0 0 10 10" className="h-2.5 w-2.5 text-cobalt" aria-hidden="true">
            <path d="M1.5 5.2 L4 7.5 L8.5 2.5" stroke="currentColor" strokeWidth="1.8" fill="none" />
          </svg>
        )}
      </span>
      {label}
    </label>
  );
}

/** Standalone checkbox with descriptive copy. */
export function CheckboxField({
  label,
  description,
  checked,
  onChange,
  name,
}: {
  label: string;
  description?: string;
  checked: boolean;
  onChange: (next: boolean) => void;
  name: string;
}) {
  const id = useId();
  return (
    <div className="flex items-start gap-3">
      <input
        id={id}
        name={name}
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="mt-0.5 h-4 w-4 shrink-0 accent-cobalt"
      />
      <label htmlFor={id} className="cursor-pointer text-sm text-current/80">
        {label}
        {description && <span className="mt-0.5 block text-xs text-current/70">{description}</span>}
      </label>
    </div>
  );
}

/**
 * Honeypot.
 *
 * Hidden from sight and from assistive technology, and excluded from tab order,
 * so no real user can fill it in. Any value on the server means a bot.
 */
export function Honeypot({ register }: { register?: Record<string, unknown> }) {
  return (
    <div aria-hidden="true" className="absolute left-[-9999px] h-px w-px overflow-hidden">
      <label htmlFor="fax-number">Fax number</label>
      <input
        id="fax-number"
        name="faxNumber"
        type="text"
        tabIndex={-1}
        autoComplete="off"
        {...register}
      />
    </div>
  );
}
