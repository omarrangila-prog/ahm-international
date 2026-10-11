/**
 * How long buyer files are kept in the private store.
 *
 * One number, read by the daily job that deletes and by the privacy policy
 * that promises, so the two cannot disagree. Two years by default: long
 * enough to remake a repeat order against the specification a buyer approved,
 * short enough that a tech pack is not kept indefinitely for a buyer who never
 * ordered. `RFQ_FILE_RETENTION_DAYS` changes it; 30 is the floor.
 *
 * Uploads that never became part of an enquiry, because the buyer closed the
 * tab before sending, are deleted after a day.
 */

type Env = Record<string, string | undefined>;

export const DEFAULT_RETENTION_DAYS = 730;
export const UNCLAIMED_UPLOAD_HOURS = 24;

export function fileRetentionDays(env: Env = process.env): number {
  const value = Number(env.RFQ_FILE_RETENTION_DAYS);
  return Number.isInteger(value) && value >= 30 ? value : DEFAULT_RETENTION_DAYS;
}

/** "two years", "18 months", "90 days": how the policy says it. */
export function describeDays(days: number): string {
  if (days % 365 === 0) return days === 365 ? "one year" : `${days / 365} years`;
  if (days >= 60 && days % 30 === 0) return `${days / 30} months`;
  return `${days} days`;
}
