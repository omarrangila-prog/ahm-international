import { z } from "zod";

/**
 * RFQ VALIDATION
 * ==============
 *
 * One schema, used by both the client form and the API route. Sharing it is the
 * point: client-side validation is a convenience for the buyer, and the server
 * re-validates the same shape because anything posted to `/api/rfq` may not have
 * come from the form at all.
 *
 * Required fields are kept to the minimum needed to reply usefully. Every extra
 * mandatory field costs conversions, and a sourcing manager who cannot yet
 * answer "target FOB price" should still be able to send the enquiry.
 */

/* ----------------------------- File policy ----------------------------- */

/**
 * Re-exported for server-side use. The definitions live in `lib/upload-policy`
 * so the upload widget can import them without pulling zod into a page bundle.
 */
export {
  MAX_FILE_BYTES,
  MAX_TOTAL_BYTES,
  MAX_FILES,
  ACCEPTED_UPLOADS,
  ACCEPT_ATTRIBUTE,
  sanitiseFilename,
  extensionOf,
  isAcceptedUpload,
} from "./upload-policy";

/* ------------------------------- Schema -------------------------------- */

const requiredText = (field: string, max = 200) =>
  z.string().trim().min(1, `${field} is required`).max(max, `${field} is too long`);

const optionalText = (max = 400) =>
  z.string().trim().max(max, "This is too long").optional().or(z.literal(""));

export const stepOneSchema = z.object({
  company: requiredText("Company name"),
  name: requiredText("Your name", 120),
  jobTitle: optionalText(120),
  email: z
    .string()
    .trim()
    .min(1, "Business email is required")
    .email("Enter a valid email address")
    .max(200),
  phone: optionalText(60),
  country: requiredText("Country", 90),
  website: optionalText(200),
});

export const stepTwoSchema = z.object({
  category: requiredText("Product category", 120),
  styleName: optionalText(160),
  gender: z.enum(["Unisex", "Men's", "Women's", "Both men's and women's", "Not sure yet"]).optional(),
  quantity: requiredText("Estimated quantity", 80),
  sizeRange: optionalText(160),
  colours: optionalText(160),
});

export const stepThreeSchema = z.object({
  fabric: optionalText(160),
  composition: optionalText(160),
  weight: optionalText(80),
  finish: optionalText(200),
  performance: optionalText(400),
  /** Buyer explicitly wants recommendations rather than specifying material. */
  needsRecommendation: z.boolean().optional(),
});

export const stepFourSchema = z.object({
  decoration: z.array(z.string().max(60)).max(10).optional(),
  decorationNotes: optionalText(400),
});

export const stepFiveSchema = z.object({
  targetPrice: optionalText(80),
  targetDelivery: optionalText(120),
  destinationPort: optionalText(120),
  repeatProgram: z.enum(["Yes", "No", "Not sure yet"]).optional(),
  annualQuantity: optionalText(80),
});

export const stepSevenSchema = z.object({
  notes: optionalText(3000),
  openToAlternatives: z.boolean().optional(),
});

/** Full submission. Files are validated separately — they arrive as FormData. */
export const rfqSchema = stepOneSchema
  .merge(stepTwoSchema)
  .merge(stepThreeSchema)
  .merge(stepFourSchema)
  .merge(stepFiveSchema)
  .merge(stepSevenSchema)
  .extend({
    /**
     * Honeypot. Real users never see this field, so any value at all indicates a
     * bot. Named plausibly, because scrapers skip fields called "honeypot".
     */
    faxNumber: z.string().max(0, "Rejected").optional(),
    /** Where the submission came from, for attribution. */
    source: optionalText(80),
  });

export type RfqInput = z.infer<typeof rfqSchema>;

/**
 * Short form embedded on the homepage.
 *
 * Used by the API route only. The client-side mini form validates with a small
 * hand-written check instead — shipping a 78 kB validator to the homepage to
 * check six fields was the single largest item in that bundle.
 */
export const miniRfqSchema = z.object({
  name: requiredText("Your name", 120),
  company: requiredText("Company name"),
  email: z.string().trim().min(1, "Business email is required").email("Enter a valid email address").max(200),
  country: requiredText("Country", 90),
  category: requiredText("Product", 120),
  quantity: requiredText("Estimated quantity", 80),
  faxNumber: z.string().max(0).optional(),
  source: optionalText(80),
});

export type MiniRfqInput = z.infer<typeof miniRfqSchema>;

/** Step order, used by the form and by progress reporting. */
export const RFQ_STEPS = [
  { id: "about", title: "About you", description: "Who we should reply to." },
  { id: "product", title: "Product", description: "What you want made." },
  { id: "material", title: "Material", description: "Fabric direction, if you have one." },
  { id: "decoration", title: "Decoration", description: "How your brand goes on." },
  { id: "commercial", title: "Commercial", description: "Quantity, timing and destination." },
  { id: "files", title: "Files", description: "Tech pack, sketches, references." },
  { id: "review", title: "Review", description: "Check and send." },
] as const;

export type RfqStepId = (typeof RFQ_STEPS)[number]["id"];
