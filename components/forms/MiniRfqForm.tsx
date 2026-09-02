"use client";

import { useState } from "react";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import Link from "next/link";
import { TextField, SelectField } from "./Fields";
import { productCategories } from "@/data/products";
import { track } from "@/lib/analytics";

/**
 * Homepage mini RFQ.
 *
 * Six fields — the minimum needed to reply usefully.
 *
 * Validation here is hand-written rather than schema-driven, and that is a
 * deliberate performance decision: importing the shared zod schema pulled a
 * 78 kB validator into the homepage bundle to check six fields, which was the
 * single largest item in it. The full multi-step form on /request-a-quote still
 * uses the shared schema — that route is worth the weight; the homepage is not.
 *
 * The server re-validates every submission against the real schema regardless,
 * so nothing here is a security boundary.
 */

const QUANTITIES = [
  "Under 500 pcs",
  "500-1,000 pcs",
  "1,000-5,000 pcs",
  "5,000-10,000 pcs",
  "10,000-25,000 pcs",
  "25,000+ pcs",
  "Not confirmed yet",
];

type Fields = {
  name: string;
  company: string;
  email: string;
  country: string;
  category: string;
  quantity: string;
};

type Errors = Partial<Record<keyof Fields, string>>;
type Status = "idle" | "submitting" | "success" | "error";

const EMPTY: Fields = { name: "", company: "", email: "", country: "", category: "", quantity: "" };

/** Mirrors the required-field rules the server enforces with the full schema. */
function validate(values: Fields): Errors {
  const errors: Errors = {};
  if (!values.name.trim()) errors.name = "Your name is required";
  if (!values.company.trim()) errors.company = "Company name is required";

  const email = values.email.trim();
  if (!email) errors.email = "Business email is required";
  // Intentionally permissive: the server is the authority, and an over-strict
  // pattern here would reject valid addresses and lose the enquiry.
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) errors.email = "Enter a valid email address";

  if (!values.country.trim()) errors.country = "Country is required";
  if (!values.category) errors.category = "Product category is required";
  if (!values.quantity) errors.quantity = "Estimated quantity is required";
  return errors;
}

export function MiniRfqForm() {
  const [values, setValues] = useState<Fields>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [reference, setReference] = useState<string | null>(null);
  const [delivered, setDelivered] = useState(true);
  const [serverError, setServerError] = useState<string | null>(null);
  const [started, setStarted] = useState(false);

  function update(field: keyof Fields) {
    return (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setValues((v) => ({ ...v, [field]: event.target.value }));
      // Clear the error as soon as the field is touched again.
      setErrors((e) => (e[field] ? { ...e, [field]: undefined } : e));
    };
  }

  function begin() {
    if (started) return;
    setStarted(true);
    track("rfq_start", { variant: "mini" });
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const found = validate(values);
    if (Object.keys(found).length > 0) {
      setErrors(found);
      // Move focus to the first problem so keyboard and screen reader users
      // are not left hunting for it.
      const first = Object.keys(found)[0];
      document.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }

    setStatus("submitting");
    setServerError(null);
    track("rfq_submit", { variant: "mini" });

    try {
      const body = new FormData(event.currentTarget);
      body.append("variant", "mini");
      body.append("source", "homepage_mini");

      const response = await fetch("/api/rfq", { method: "POST", body });
      const data = await response.json();

      if (!response.ok || !data.ok) {
        setServerError(data.error ?? "Something went wrong. Please try again.");
        setStatus("error");
        track("rfq_submit_error", { variant: "mini" });
        return;
      }

      setReference(data.reference ?? null);
      setDelivered(data.delivered !== false);
      setStatus("success");
      setValues(EMPTY);
    } catch {
      setServerError("We could not reach the server. Please check your connection and try again.");
      setStatus("error");
      track("rfq_submit_error", { variant: "mini" });
    }
  }

  if (status === "success") {
    return (
      <div
        className="enter flex flex-col items-start gap-5 border border-ink/15 bg-paper p-8 lg:p-10"
        role="status"
      >
        <span className="flex h-12 w-12 items-center justify-center bg-lime text-ink">
          <Check className="h-6 w-6" aria-hidden="true" />
        </span>
        <div>
          <h3 className="font-display text-2xl font-extrabold tracking-[-0.03em] text-ink">RFQ received.</h3>
          <p className="mt-3 max-w-md text-ink/70">
            Thank you. Our commercial team will review your requirements.
            {reference && (
              <>
                {" "}
                Your reference is <span className="font-mono font-semibold text-ink">{reference}</span>.
              </>
            )}
          </p>
          {!delivered && (
            <p className="mt-4 max-w-md border-l-2 border-ink pl-3 text-sm text-ink/70">
              Your request has been recorded. Email delivery is not yet configured on this
              installation: please also reach us through the contact page to be certain it lands.
            </p>
          )}
        </div>
        <Link
          href="/request-a-quote"
          className="group inline-flex items-center gap-2 text-sm font-medium text-ink underline-offset-4 hover:underline"
        >
          Add a tech pack and full specification
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
        </Link>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      onFocus={begin}
      noValidate
      className="relative border border-ink/15 bg-paper p-6 sm:p-8 lg:p-10"
    >
      {/* Honeypot: invisible to people, filled only by bots. */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-px w-px overflow-hidden">
        <label htmlFor="mini-fax">Fax number</label>
        <input id="mini-fax" name="faxNumber" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
        <TextField
          label="Your name"
          name="name"
          required
          autoComplete="name"
          value={values.name}
          onChange={update("name")}
          error={errors.name}
        />
        <TextField
          label="Company"
          name="company"
          required
          autoComplete="organization"
          value={values.company}
          onChange={update("company")}
          error={errors.company}
        />
        <TextField
          label="Business email"
          name="email"
          type="email"
          required
          autoComplete="email"
          value={values.email}
          onChange={update("email")}
          error={errors.email}
        />
        <TextField
          label="Country"
          name="country"
          required
          autoComplete="country-name"
          value={values.country}
          onChange={update("country")}
          error={errors.country}
        />
        <SelectField
          label="Product"
          name="category"
          required
          placeholder="Select a category"
          options={[...productCategories.map((c) => c.name), "Something else"]}
          value={values.category}
          onChange={update("category")}
          error={errors.category}
        />
        <SelectField
          label="Estimated quantity"
          name="quantity"
          required
          placeholder="Select a range"
          options={QUANTITIES}
          value={values.quantity}
          onChange={update("quantity")}
          error={errors.quantity}
        />
      </div>

      {serverError && (
        <p role="alert" className="mt-5 border-l-2 border-ink pl-3 text-sm text-ink">
          {serverError}
        </p>
      )}

      <div className="mt-8 flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="group inline-flex h-14 items-center justify-center gap-2.5 bg-ink px-8 font-display text-[0.8125rem] font-bold uppercase tracking-[0.08em] text-white transition-colors duration-300 hover:bg-lime hover:text-ink disabled:opacity-60"
        >
          {status === "submitting" ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              Sending
            </>
          ) : (
            <>
              Start My FOB Quote
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
            </>
          )}
        </button>

        <Link
          href="/request-a-quote#files"
          onClick={() => track("techpack_upload_start", { location: "mini_form" })}
          className="text-sm text-ink/70 underline-offset-4 transition-colors hover:text-ink hover:underline"
        >
          Or send a full tech pack →
        </Link>
      </div>

      <p className="mt-5 text-xs text-ink/70">
        We use your details only to respond to this enquiry. Specifications you share are treated as
        confidential: see our{" "}
        <Link href="/privacy" className="text-ink underline underline-offset-4">
          privacy policy
        </Link>
        .
      </p>
    </form>
  );
}
