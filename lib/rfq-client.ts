/**
 * Browser side of an RFQ submission.
 *
 * Both forms post through this, so they read the server the same way. The
 * important case is the one that is not JSON: Vercel answers an oversized body
 * with plain text before the route runs, and a form that only knows how to
 * parse JSON reported that as "check your connection" — sending the buyer to
 * retry a request that could never succeed.
 */

export type RejectedFile = { name: string; reason: string };

export type RfqResult =
  | { kind: "delivered" | "undelivered"; reference: string | null; rejectedFiles: RejectedFile[] }
  | { kind: "invalid"; error: string; fieldErrors: Record<string, string> }
  | { kind: "error"; error: string };

const UNREACHABLE = "We could not reach the server. Your details are still in the form: check your connection and try again.";
const TOO_LARGE =
  "The attachments are too large to send through the form. Remove them and submit again: you will get a reference to email the files with.";

export async function submitRfq(body: FormData): Promise<RfqResult> {
  let response: Response;
  try {
    response = await fetch("/api/rfq", { method: "POST", body });
  } catch {
    return { kind: "error", error: UNREACHABLE };
  }

  if (response.status === 413) return { kind: "error", error: TOO_LARGE };

  let data: Record<string, unknown> | null = null;
  try {
    data = (await response.json()) as Record<string, unknown>;
  } catch {
    data = null;
  }

  if (!data) {
    return {
      kind: "error",
      error: `The server sent an unexpected response (${response.status}). Your details are still in the form, so you can try again.`,
    };
  }

  if (!response.ok || data.ok !== true) {
    const error = typeof data.error === "string" ? data.error : "Something went wrong. Please try again.";
    if (response.status === 422) {
      return { kind: "invalid", error, fieldErrors: (data.fieldErrors as Record<string, string>) ?? {} };
    }
    return { kind: "error", error };
  }

  return {
    kind: data.delivered === true ? "delivered" : "undelivered",
    reference: typeof data.reference === "string" ? data.reference : null,
    rejectedFiles: Array.isArray(data.rejectedFiles) ? (data.rejectedFiles as RejectedFile[]) : [],
  };
}
