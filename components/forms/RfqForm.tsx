"use client";

import { useEffect, useMemo, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, Loader2 } from "lucide-react";
import { TextField, TextAreaField, SelectField, CheckChip, CheckboxField, Honeypot } from "./Fields";
import { FileDrop } from "./FileDrop";
import { rfqSchema, RFQ_STEPS, type RfqInput } from "@/lib/rfq-schema";
import { productCategories } from "@/data/products";
import { materials } from "@/data/materials";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";

/**
 * MULTI-STEP RFQ
 * ==============
 *
 * Seven steps, one form state. Steps are validated as the buyer advances so an
 * error surfaces next to the field that caused it rather than at the end.
 *
 * Only six fields across the whole form are required. That is deliberate: a
 * sourcing manager scoping a program often cannot answer "target FOB price" or
 * "GSM" yet, and blocking them on it loses the enquiry we most want. Everything
 * else is optional and clearly marked.
 *
 * Selections made in the homepage benchmark module arrive as query parameters
 * and pre-fill the form, so configuring a style there is not thrown away here.
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

const GENDERS = ["Unisex", "Men's", "Women's", "Both men's and women's", "Not sure yet"] as const;
const DECORATIONS = ["Embroidery", "Screen print", "Heat transfer", "Woven badges", "Applied patches", "Printed labels", "Reflective tape", "None"];
const REPEAT = ["Yes", "No", "Not sure yet"] as const;

type Status = "idle" | "submitting" | "success" | "error";

/** Fields validated before each step is allowed to advance. */
const stepFields: Record<number, (keyof RfqInput)[]> = {
  0: ["company", "name", "email", "country"],
  1: ["category", "quantity"],
  2: [],
  3: [],
  4: [],
  5: [],
  6: [],
};

export function RfqForm() {
  const searchParams = useSearchParams();
  const [step, setStep] = useState(0);
  const [files, setFiles] = useState<File[]>([]);
  const [status, setStatus] = useState<Status>("idle");
  const [reference, setReference] = useState<string | null>(null);
  const [delivered, setDelivered] = useState(true);
  const [serverError, setServerError] = useState<string | null>(null);
  const [started, setStarted] = useState(false);

  const {
    register,
    handleSubmit,
    trigger,
    control,
    getValues,
    watch,
    setValue,
    formState: { errors },
  } = useForm<RfqInput>({
    resolver: zodResolver(rfqSchema),
    mode: "onBlur",
    defaultValues: { decoration: [], source: "rfq_page" },
  });

  /** Carry benchmark selections through from the homepage. */
  useEffect(() => {
    const map: [string, keyof RfqInput][] = [
      ["category", "category"],
      ["fabric", "fabric"],
      ["quantity", "quantity"],
      ["destination", "destinationPort"],
      ["delivery", "targetDelivery"],
      ["source", "source"],
    ];
    for (const [param, field] of map) {
      const value = searchParams.get(param);
      if (value) setValue(field, value as never);
    }
    const decoration = searchParams.get("decoration");
    if (decoration && decoration !== "None" && decoration !== "To be confirmed") {
      setValue("decoration", [decoration]);
    }
  }, [searchParams, setValue]);

  // react-hook-form's watch() returns a function the compiler cannot safely
  // memoize (it is not a pure read — it re-subscribes). This is a library
  // limitation, not a bug in this component: the compiler falls back to
  // skipping memoization here and RfqForm still behaves correctly.
  // eslint-disable-next-line react-hooks/incompatible-library
  const decoration = watch("decoration") ?? [];
  const needsRecommendation = watch("needsRecommendation");

  const categoryNames = useMemo(() => [...productCategories.map((c) => c.name), "Something else"], []);
  const fabricNames = useMemo(() => [...materials.map((m) => m.name), "Not sure. Recommend options"], []);

  function begin() {
    if (started) return;
    setStarted(true);
    track("rfq_start", { variant: "full" });
  }

  async function next() {
    const fields = stepFields[step];
    const valid = fields.length === 0 || (await trigger(fields));
    if (!valid) return;
    track("rfq_step_complete", { step: RFQ_STEPS[step].id, index: step + 1 });
    setStep((s) => Math.min(s + 1, RFQ_STEPS.length - 1));
    document.getElementById("rfq-top")?.scrollIntoView({ block: "start" });
  }

  function back() {
    setStep((s) => Math.max(s - 1, 0));
    document.getElementById("rfq-top")?.scrollIntoView({ block: "start" });
  }

  async function onSubmit(values: RfqInput) {
    setStatus("submitting");
    setServerError(null);
    track("rfq_submit", { variant: "full", files: files.length });

    try {
      const body = new FormData();
      body.append("variant", "full");

      for (const [key, value] of Object.entries(values)) {
        if (value === undefined || value === null || value === "") continue;
        if (Array.isArray(value)) {
          for (const entry of value) body.append(key, String(entry));
        } else {
          body.append(key, String(value));
        }
      }
      for (const file of files) body.append("files", file);

      const response = await fetch("/api/rfq", { method: "POST", body });
      const data = await response.json();

      if (!response.ok || !data.ok) {
        setServerError(data.error ?? "Something went wrong. Please try again.");
        setStatus("error");
        track("rfq_submit_error", { variant: "full" });
        return;
      }

      setReference(data.reference ?? null);
      setDelivered(data.delivered !== false);
      setStatus("success");
      track("rfq_completed", { variant: "full", files: files.length });
    } catch {
      setServerError("We could not reach the server. Please check your connection and try again.");
      setStatus("error");
      track("rfq_submit_error", { variant: "full" });
    }
  }

  /* ------------------------------ Success ------------------------------ */
  if (status === "success") {
    return (
      <div className="enter border border-ink/15 bg-paper p-8 lg:p-12" role="status">
        <span className="flex h-14 w-14 items-center justify-center bg-lime text-ink">
          <Check className="h-7 w-7" aria-hidden="true" />
        </span>
        <h2 className="mt-7 font-display text-display text-ink">RFQ received.</h2>
        <p className="mt-5 max-w-xl text-lead text-ink/75">
          Thank you. Our commercial team will review your requirements.
        </p>
        {reference && (
          <p className="mt-5 text-ink/70">
            Your reference is <span className="font-mono font-semibold text-ink">{reference}</span>.
            Quote it in any follow-up and we will find your enquiry.
          </p>
        )}
        {!delivered && (
          <p className="mt-5 max-w-xl border-l-2 border-ink pl-4 text-sm text-ink/65">
            Your request has been recorded. Email delivery is not yet configured on this
            installation, so please also reach us through the contact page to be certain it lands.
          </p>
        )}
        <div className="mt-9 flex flex-wrap gap-3">
          <Link
            href="/products"
            className="inline-flex h-12 items-center gap-2 border border-ink/25 px-6 font-display text-xs font-bold uppercase tracking-[0.08em] text-ink transition-colors hover:bg-lime hover:text-ink hover:text-paper"
          >
            Browse products
          </Link>
          <Link
            href="/"
            className="inline-flex h-12 items-center gap-2 px-2 font-display text-xs font-bold uppercase tracking-[0.08em] text-ink"
          >
            Back to home
          </Link>
        </div>
      </div>
    );
  }

  const current = RFQ_STEPS[step];
  const isLast = step === RFQ_STEPS.length - 1;
  const values = getValues();

  return (
    <div id="rfq-top" className="scroll-mt-28">
      {/* Progress */}
      <div className="mb-8">
        <div className="flex items-baseline justify-between gap-4">
          <p className="label text-ink/60">
            Step {step + 1} of {RFQ_STEPS.length}. {current.title}
          </p>
          <p className="label text-ink/70 hidden sm:block">{current.description}</p>
        </div>

        <div className="mt-3 flex gap-1" role="progressbar" aria-valuemin={1} aria-valuemax={RFQ_STEPS.length} aria-valuenow={step + 1} aria-label="Quote request progress">
          {RFQ_STEPS.map((s, i) => (
            <span
              key={s.id}
              className={cn(
                "h-1 flex-1 transition-colors duration-300",
                i < step ? "bg-ink" : i === step ? "bg-ink" : "bg-ink/12",
              )}
            />
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} onFocus={begin} noValidate className="relative border border-ink/15 bg-paper p-6 sm:p-8 lg:p-10">
        <Honeypot register={register("faxNumber")} />
        <input type="hidden" {...register("source")} />

        {/* `key` remounts on step change, replaying the CSS entrance. */}
        <div key={current.id} className="enter">
            {/* ---------------- 1. About you ---------------- */}
            {step === 0 && (
              <fieldset>
                <legend className="font-display text-h2 text-ink">Who should we reply to?</legend>
                <p className="mt-3 max-w-lg text-ink/65">
                  Four required fields. Everything after this step is optional.
                </p>
                <div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
                  <TextField label="Company" required autoComplete="organization" error={errors.company?.message} {...register("company")} />
                  <TextField label="Your name" required autoComplete="name" error={errors.name?.message} {...register("name")} />
                  <TextField label="Job title" autoComplete="organization-title" error={errors.jobTitle?.message} {...register("jobTitle")} />
                  <TextField label="Business email" type="email" required autoComplete="email" error={errors.email?.message} {...register("email")} />
                  <TextField label="Phone" type="tel" autoComplete="tel" error={errors.phone?.message} {...register("phone")} />
                  <TextField label="Country" required autoComplete="country-name" error={errors.country?.message} {...register("country")} />
                  <TextField label="Website" placeholder="https://" error={errors.website?.message} wrapperClassName="sm:col-span-2" {...register("website")} />
                </div>
              </fieldset>
            )}

            {/* ---------------- 2. Product ---------------- */}
            {step === 1 && (
              <fieldset>
                <legend className="font-display text-h2 text-ink">What do you want made?</legend>
                <p className="mt-3 max-w-lg text-ink/65">
                  Category and an approximate quantity are enough to start.
                </p>
                <div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
                  <SelectField label="Product category" required placeholder="Select a category" options={categoryNames} error={errors.category?.message} {...register("category")} />
                  <TextField label="Style name or reference" error={errors.styleName?.message} {...register("styleName")} />
                  <SelectField label="Gender" placeholder="Select" options={GENDERS} error={errors.gender?.message} {...register("gender")} />
                  <SelectField label="Estimated quantity" required placeholder="Select a range" options={QUANTITIES} error={errors.quantity?.message} {...register("quantity")} />
                  <TextField label="Size range" placeholder="e.g. XS-4XL, or your size chart" error={errors.sizeRange?.message} {...register("sizeRange")} />
                  <TextField label="Number of colours" placeholder="e.g. 3 colourways" error={errors.colours?.message} {...register("colours")} />
                </div>
              </fieldset>
            )}

            {/* ---------------- 3. Material ---------------- */}
            {step === 2 && (
              <fieldset>
                <legend className="font-display text-h2 text-ink">Fabric direction</legend>
                <p className="mt-3 max-w-lg text-ink/65">
                  If you already know, tell us. If not, tick the box below and we will recommend
                  options against the requirement.
                </p>

                <div className="mt-7">
                  <Controller
                    name="needsRecommendation"
                    control={control}
                    render={({ field }) => (
                      <CheckboxField
                        name="needsRecommendation"
                        label="Not sure. Recommend options"
                        description="We will present fabric options against how the garment is worn and washed."
                        checked={Boolean(field.value)}
                        onChange={field.onChange}
                      />
                    )}
                  />
                </div>

                <div className={cn("mt-8 grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2", needsRecommendation && "opacity-55")}>
                  <SelectField label="Fabric" placeholder="Select or describe below" options={fabricNames} error={errors.fabric?.message} {...register("fabric")} />
                  <TextField label="Composition" placeholder="e.g. 65% polyester / 35% cotton" error={errors.composition?.message} {...register("composition")} />
                  <TextField label="Weight / GSM" placeholder="e.g. 200 gsm" error={errors.weight?.message} {...register("weight")} />
                  <TextField label="Finish" placeholder="e.g. stain release, easy care" error={errors.finish?.message} {...register("finish")} />
                  <TextAreaField
                    label="Performance requirement"
                    rows={3}
                    placeholder="How is the garment worn and washed? Industrial laundering, outdoor use, stretch requirement…"
                    error={errors.performance?.message}
                    wrapperClassName="sm:col-span-2"
                    {...register("performance")}
                  />
                </div>
              </fieldset>
            )}

            {/* ---------------- 4. Decoration ---------------- */}
            {step === 3 && (
              <fieldset>
                <legend className="font-display text-h2 text-ink">How does your brand go on?</legend>
                <p className="mt-3 max-w-lg text-ink/65">Select everything that applies.</p>

                <Controller
                  name="decoration"
                  control={control}
                  render={({ field }) => (
                    <div className="mt-8 flex flex-wrap gap-2.5">
                      {DECORATIONS.map((option) => {
                        const selected = (field.value ?? []).includes(option);
                        return (
                          <CheckChip
                            key={option}
                            name="decoration"
                            label={option}
                            checked={selected}
                            onChange={(checked) => {
                              const current = field.value ?? [];
                              field.onChange(
                                checked ? [...current, option] : current.filter((v) => v !== option),
                              );
                            }}
                          />
                        );
                      })}
                    </div>
                  )}
                />

                <div className="mt-7">
                  <TextAreaField
                    label="Decoration notes"
                    rows={4}
                    placeholder="Placement, size, colour count, and whether you have vector artwork."
                    error={errors.decorationNotes?.message}
                    {...register("decorationNotes")}
                  />
                </div>
              </fieldset>
            )}

            {/* ---------------- 5. Commercial ---------------- */}
            {step === 4 && (
              <fieldset>
                <legend className="font-display text-h2 text-ink">Commercial</legend>
                <p className="mt-3 max-w-lg text-ink/65">
                  A target price is genuinely useful and is not used against you. It tells us which
                  fabric and construction options are worth presenting.
                </p>
                <div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
                  <TextField label="Target FOB price" placeholder="e.g. USD 4.20 / pc" error={errors.targetPrice?.message} {...register("targetPrice")} />
                  <TextField label="Target delivery" placeholder="e.g. within 90 days" error={errors.targetDelivery?.message} {...register("targetDelivery")} />
                  <TextField label="Destination port" placeholder="e.g. New York" error={errors.destinationPort?.message} {...register("destinationPort")} />
                  <SelectField label="Repeat program?" placeholder="Select" options={REPEAT} error={errors.repeatProgram?.message} {...register("repeatProgram")} />
                  <TextField label="Expected annual quantity" placeholder="If this is a program" error={errors.annualQuantity?.message} wrapperClassName="sm:col-span-2" {...register("annualQuantity")} />
                </div>
              </fieldset>
            )}

            {/* ---------------- 6. Files ---------------- */}
            {step === 5 && (
              <fieldset id="files">
                <legend className="font-display text-h2 text-ink">Files</legend>
                <p className="mt-3 max-w-lg text-ink/65">
                  Tech pack, sketch, reference images, bill of materials, size specification or an
                  existing quotation. Everything you send is treated as confidential.
                </p>
                <div className="mt-8">
                  <FileDrop files={files} onChange={setFiles} />
                </div>
              </fieldset>
            )}

            {/* ---------------- 7. Review ---------------- */}
            {step === 6 && (
              <fieldset>
                <legend className="font-display text-h2 text-ink">Review and send</legend>
                <p className="mt-3 max-w-lg text-ink/65">Check the essentials before submitting.</p>

                <dl className="mt-8 border-t border-line">
                  {[
                    { label: "Company", value: values.company },
                    { label: "Contact", value: [values.name, values.email].filter(Boolean).join(" · ") },
                    { label: "Country", value: values.country },
                    { label: "Product", value: values.category },
                    { label: "Quantity", value: values.quantity },
                    { label: "Fabric", value: values.needsRecommendation ? "Recommendations requested" : values.fabric },
                    { label: "Decoration", value: decoration.length ? decoration.join(", ") : undefined },
                    { label: "Target FOB", value: values.targetPrice },
                    { label: "Destination", value: values.destinationPort },
                    { label: "Files", value: files.length ? `${files.length} attached` : "None attached" },
                  ]
                    .filter((row) => row.value)
                    .map((row) => (
                      <div key={row.label} className="grid grid-cols-[8rem_1fr] gap-4 border-b border-line py-3">
                        <dt className="label text-ink/60">{row.label}</dt>
                        <dd className="text-sm text-ink/80">{row.value}</dd>
                      </div>
                    ))}
                </dl>

                <div className="mt-8">
                  <TextAreaField
                    label="Additional notes"
                    rows={4}
                    placeholder="Anything else we should know before quoting."
                    error={errors.notes?.message}
                    {...register("notes")}
                  />
                </div>

                <div className="mt-6">
                  <Controller
                    name="openToAlternatives"
                    control={control}
                    render={({ field }) => (
                      <CheckboxField
                        name="openToAlternatives"
                        label="I am open to alternative material and cost-engineering suggestions."
                        description="We will present alternatives alongside your specification rather than instead of it."
                        checked={Boolean(field.value)}
                        onChange={field.onChange}
                      />
                    )}
                  />
                </div>

                <p className="mt-6 text-xs text-ink/70">
                  We use your details only to respond to this enquiry. Specifications and files you
                  share are treated as confidential. See our{" "}
                  <Link href="/privacy" className="text-ink underline underline-offset-4">
                    privacy policy
                  </Link>
                  .
                </p>
              </fieldset>
            )}
        </div>

        {serverError && (
          <p role="alert" className="mt-6 border-l-2 border-ink pl-3 text-sm text-ink">
            {serverError}
          </p>
        )}

        {/* Navigation */}
        <div className="mt-9 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-7">
          <button
            type="button"
            onClick={back}
            disabled={step === 0}
            className="inline-flex h-12 items-center gap-2 px-2 font-display text-xs font-bold uppercase tracking-[0.08em] text-ink/60 transition-colors hover:text-ink disabled:pointer-events-none disabled:opacity-0"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back
          </button>

          {isLast ? (
            <button
              type="submit"
              disabled={status === "submitting"}
              className="group inline-flex h-14 items-center justify-center gap-2.5 bg-ink px-8 font-display text-[0.8125rem] font-bold uppercase tracking-[0.08em] text-white transition-colors duration-300 hover:bg-lime hover:text-ink disabled:opacity-60"
            >
              {status === "submitting" ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                  Submitting
                </>
              ) : (
                <>
                  Submit for Review
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                </>
              )}
            </button>
          ) : (
            <button
              type="button"
              onClick={next}
              className="group inline-flex h-14 items-center justify-center gap-2.5 bg-ink px-8 font-display text-[0.8125rem] font-bold uppercase tracking-[0.08em] text-paper transition-colors duration-300 hover:bg-lime hover:text-ink"
            >
              Continue
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
