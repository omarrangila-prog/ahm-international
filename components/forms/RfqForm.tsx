"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import { TextField, TextAreaField, SelectField, CheckChip, CheckboxField, Honeypot } from "./Fields";
import { FileDrop, formatBytes } from "./FileDrop";
import { SubmissionOutcome } from "./SubmissionOutcome";
import { rfqSchema, RFQ_STEPS, FIELD_STEP, type RfqInput } from "@/lib/rfq-schema";
import type { FieldErrors } from "react-hook-form";
import { uploadLimits, sanitiseFilename, type UploadMode } from "@/lib/upload-policy";
import { uploadDirect } from "@/lib/uploads/direct-client";
import { readAttribution } from "@/lib/attribution";
import { productCategories } from "@/data/products";
import { materials } from "@/data/materials";
import { track } from "@/lib/analytics";
import { submitRfq, type RejectedFile } from "@/lib/rfq-client";
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

type Status = "idle" | "uploading" | "upload_failed" | "submitting" | "success" | "error";

type UploadState = { status: "uploading" | "done" | "failed"; progress: number; reason?: string };

/** Stable identity for a selected file across renders and retries. */
const fileKey = (file: File) => `${file.name}:${file.size}:${file.lastModified}`;

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

/**
 * `uploadMode` and `storageNamespace` come from the page, which reads the
 * deployment's configuration at build time. In "direct" mode files go from the
 * browser to private storage before the form is sent, so they are not bound by
 * the 4 MB function-body ceiling; the form then sends only their pathnames.
 */
export function RfqForm({ uploadMode = "form", storageNamespace = "" }: { uploadMode?: UploadMode; storageNamespace?: string }) {
  const direct = uploadMode === "direct";
  const limits = uploadLimits(uploadMode);
  const [step, setStep] = useState(0);
  const [files, setFiles] = useState<File[]>([]);
  const [uploadStates, setUploadStates] = useState<Record<string, UploadState>>({});
  // Completed uploads survive a retry, so only the failed ones are sent again.
  const uploaded = useRef(new Map<string, { pathname: string; name: string }>());
  // Read after the uploads settle, so a ref rather than state from the render that started them.
  const failures = useRef(new Map<string, string>());
  const uploadId = useRef<string | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [reference, setReference] = useState<string | null>(null);
  const [delivered, setDelivered] = useState(true);
  const [rejectedFiles, setRejectedFiles] = useState<RejectedFile[]>([]);
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

  /*
   * Carry benchmark selections through from the homepage.
   *
   * Read from `window.location.search` rather than `useSearchParams()`.
   * That hook opts its subtree out of static prerendering: it requires a
   * Suspense boundary, and at build time the boundary emits its fallback
   * instead of the form. The served HTML for /request-a-quote therefore
   * contained zero <form> and zero <input> elements — the words "Loading the
   * quote form" and nothing else — so the entire lead-capture path existed
   * only after hydration.
   *
   * Preselecting a category is an enhancement, not the page. Reading it on
   * mount costs nothing that matters and lets the form render on the server,
   * where it is visible to a buyer whose JavaScript is slow, blocked, or
   * broken.
   */
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const map: [string, keyof RfqInput][] = [
      ["category", "category"],
      ["fabric", "fabric"],
      // Carried by the GSM calculator on /materials, so a buyer who has just
      // worked out a weight does not retype it into the field below.
      ["weight", "weight"],
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
  }, [setValue]);

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

  /**
   * A submit that fails validation must never look like nothing happened.
   * Go to the earliest step with a problem, where the field shows its error.
   */
  function onInvalid(fieldErrors: FieldErrors<RfqInput>) {
    const steps = Object.keys(fieldErrors)
      .map((field) => FIELD_STEP[field])
      .filter((n): n is number => n !== undefined);
    if (steps.length) setStep(Math.min(...steps));
    setServerError("Something needs attention before this can be sent. We have taken you to it.");
    setStatus("error");
    track("rfq_submit_error", { variant: "full", reason: "client_validation" });
  }

  const submit = (sendWithoutFailed = false) => handleSubmit((v) => onSubmit(v, sendWithoutFailed), onInvalid);

  /** Uploads every selected file not already uploaded. True when all are in. */
  async function uploadPending(): Promise<boolean> {
    uploadId.current ??= crypto.randomUUID();
    const id = uploadId.current;
    const pending = files.filter((f) => !uploaded.current.has(fileKey(f)));
    if (!pending.length) return true;

    const set = (key: string, state: UploadState) => setUploadStates((s) => ({ ...s, [key]: state }));
    for (const f of pending) set(fileKey(f), { status: "uploading", progress: 0 });

    const results = await Promise.all(
      pending.map(async (file) => {
        const key = fileKey(file);
        const result = await uploadDirect(file, {
          namespace: storageNamespace,
          uploadId: id,
          onProgress: (progress) => set(key, { status: "uploading", progress }),
        });
        if (result.ok) {
          uploaded.current.set(key, { pathname: result.pathname, name: result.name });
          failures.current.delete(key);
          set(key, { status: "done", progress: 100 });
        } else {
          failures.current.set(key, result.reason);
          set(key, { status: "failed", progress: 0, reason: result.reason });
        }
        return result.ok;
      }),
    );
    return results.every(Boolean);
  }

  async function onSubmit(values: RfqInput, sendWithoutFailed = false) {
    setServerError(null);
    track("rfq_submit", { variant: "full", files: files.length });

    if (direct && files.length) {
      setStatus("uploading");
      const allIn = await uploadPending();
      if (allIn) {
        track("techpack_upload_complete", { count: files.length, mode: "direct" });
      } else if (!sendWithoutFailed) {
        // Stop before sending: the buyer chooses between retrying and sending
        // without the file, and nothing they typed is lost either way.
        setStatus("upload_failed");
        track("techpack_upload_error", { reason: "upload" });
        return;
      }
    }

    setStatus("submitting");
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

    // Files that never reached storage are reported on the outcome screen
    // with the rest, so the buyer knows exactly what to email.
    const notUploaded: RejectedFile[] = [];
    if (direct) {
      const done = files.flatMap((f) => uploaded.current.get(fileKey(f)) ?? []);
      for (const f of files) {
        if (!uploaded.current.has(fileKey(f))) {
          notUploaded.push({ name: sanitiseFilename(f.name), reason: failures.current.get(fileKey(f)) ?? "the upload did not complete" });
        }
      }
      if (done.length && uploadId.current) {
        body.append("uploadId", uploadId.current);
        body.append("uploads", JSON.stringify(done));
      }
    } else {
      for (const file of files) body.append("files", file);
    }

    const arrival = readAttribution();
    if (arrival) body.append("attribution", arrival);

    const result = await submitRfq(body);

    if (result.kind === "invalid" || result.kind === "error") {
      const fieldNotes = result.kind === "invalid" ? Object.values(result.fieldErrors) : [];
      setServerError(fieldNotes.length ? `${result.error} ${fieldNotes.join(". ")}.` : result.error);
      setStatus("error");
      track("rfq_submit_error", { variant: "full", reason: result.kind });
      return;
    }

    setReference(result.reference);
    setDelivered(result.kind === "delivered");
    setRejectedFiles([...notUploaded, ...result.rejectedFiles]);
    setStatus("success");
    // Only a delivered request is a completion. An undelivered one is still
    // a buyer who needs to act, and counting it would flatter the funnel.
    if (result.kind === "delivered") {
      track("rfq_completed", { variant: "full", files: Math.max(0, files.length - notUploaded.length - result.rejectedFiles.length) });
    } else {
      track("rfq_submit_error", { variant: "full", reason: "undelivered" });
    }
  }

  /* ------------------------------ Success ------------------------------ */
  if (status === "success") {
    return (
      <SubmissionOutcome kind={delivered ? "delivered" : "undelivered"} reference={reference} rejectedFiles={rejectedFiles}>
        <div className="mt-9 flex flex-wrap gap-3">
          <Link
            href="/products"
            className="inline-flex h-12 items-center gap-2 border border-ink/25 px-6 font-display text-xs font-bold uppercase tracking-[0.08em] text-ink transition-colors hover:bg-lime hover:text-ink"
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
      </SubmissionOutcome>
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
          <p className="label text-ink/65">
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

      <form onSubmit={submit()} onFocus={begin} noValidate className="relative border border-ink/15 bg-paper p-6 sm:p-8 lg:p-10">
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
                  {direct &&
                    " Files go to private storage when you press send, are checked on our server, and can be opened only by our commercial team."}
                </p>
                <div className="mt-8">
                  <FileDrop files={files} onChange={setFiles} limits={limits} />
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
                        <dt className="label text-ink/65">{row.label}</dt>
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

        {direct && (status === "uploading" || status === "upload_failed") && files.length > 0 && (
          <div className="mt-6 border border-ink/15 p-4 sm:p-5">
            <p className="text-sm font-medium text-ink" role={status === "upload_failed" ? "alert" : "status"}>
              {status === "uploading"
                ? `Uploading ${files.length === 1 ? "your file" : `${files.length} files`} to private storage…`
                : "Not every file uploaded. Your details are still in the form."}
            </p>
            <ul className="mt-3 flex flex-col gap-2.5">
              {files.map((file) => {
                const state = uploadStates[fileKey(file)];
                const name = sanitiseFilename(file.name);
                return (
                  <li key={fileKey(file)} className="text-sm">
                    <span className="flex items-baseline justify-between gap-3">
                      <span className="min-w-0 truncate text-ink">{name}</span>
                      <span className="shrink-0 text-xs text-ink/70">
                        {state?.status === "done"
                          ? "Uploaded"
                          : state?.status === "failed"
                            ? "Failed"
                            : `${Math.round(state?.progress ?? 0)}% of ${formatBytes(file.size)}`}
                      </span>
                    </span>
                    {state?.status === "failed" ? (
                      <span className="mt-0.5 block text-xs text-ink/75">{state.reason}</span>
                    ) : (
                      <span
                        className="mt-1.5 block h-1 bg-ink/12"
                        role="progressbar"
                        aria-label={`Upload of ${name}`}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-valuenow={Math.round(state?.progress ?? 0)}
                      >
                        <span className="block h-full bg-ink transition-[width] duration-200" style={{ width: `${state?.progress ?? 0}%` }} />
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>
            {status === "upload_failed" && (
              <div className="mt-4 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => void submit()()}
                  className="inline-flex h-11 items-center bg-ink px-5 font-display text-xs font-bold uppercase tracking-[0.08em] text-paper hover:bg-lime hover:text-ink"
                >
                  Try again
                </button>
                <button
                  type="button"
                  onClick={() => void submit(true)()}
                  className="inline-flex h-11 items-center border border-ink/25 px-5 font-display text-xs font-bold uppercase tracking-[0.08em] text-ink hover:border-ink"
                >
                  Send without {files.filter((f) => !uploaded.current.has(fileKey(f))).length === 1 ? "it" : "them"}
                </button>
              </div>
            )}
          </div>
        )}

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
            className="inline-flex h-12 items-center gap-2 px-2 font-display text-xs font-bold uppercase tracking-[0.08em] text-ink/65 transition-colors hover:text-ink disabled:pointer-events-none disabled:opacity-0"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back
          </button>

          {/* Distinct keys, so the two are different elements. Without them
              React reused one <button> and flipped its type during the click
              on "Continue" from the Files step; the browser then took that
              same click as a submit, and the form was sent before the buyer
              ever saw the review step. */}
          {isLast ? (
            <button
              key="submit"
              type="submit"
              disabled={status === "submitting" || status === "uploading"}
              className="group inline-flex h-14 items-center justify-center gap-2.5 bg-ink px-8 font-display text-[0.8125rem] font-bold uppercase tracking-[0.08em] text-white transition-colors duration-300 hover:bg-lime hover:text-ink disabled:opacity-60"
            >
              {status === "submitting" || status === "uploading" ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                  {status === "uploading" ? "Uploading" : "Submitting"}
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
              key="continue"
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
