import { randomUUID } from "node:crypto";
import type { AhmOsEnvelope, AhmOsEventMap, AhmOsEventName } from "./events";

/**
 * AHM OS — CLIENT
 * ===============
 *
 * Master spec §55, and its hard constraint: **no fake production calls.**
 *
 * So this client has exactly two states, and it never pretends to be in the one
 * it is not:
 *
 *   configured   — AHM_OS_URL is set; the envelope is POSTed and the real result
 *                  is returned, including failures.
 *   unconfigured — nothing is sent. It returns `{ published: false, reason:
 *                  "not_configured" }` and logs server-side so the enquiry is
 *                  not silently lost.
 *
 * There is no in-memory queue that claims delivery, and no mock success. A
 * caller can therefore trust `published` — which is the whole point, because the
 * RFQ route already reports delivery honestly to the buyer and would be made a
 * liar by a client that resolved optimistically.
 *
 * Server-only: it reads credentials from the environment and is never imported
 * into a client component.
 */

export type PublishResult =
  | { published: true; status: number; idempotencyKey: string }
  | { published: false; reason: "not_configured" | "request_failed" | "bad_status"; status?: number; idempotencyKey: string };

function endpoint(): string | null {
  const url = process.env.AHM_OS_URL?.trim();
  return url ? url : null;
}

export function isConfigured(): boolean {
  return endpoint() !== null;
}

export async function publish<K extends AhmOsEventName>(
  event: K,
  payload: AhmOsEventMap[K],
  options: { idempotencyKey?: string; timeoutMs?: number } = {},
): Promise<PublishResult> {
  const idempotencyKey = options.idempotencyKey ?? randomUUID();
  const url = endpoint();

  const envelope: AhmOsEnvelope<K> = {
    event,
    payload,
    occurredAt: new Date().toISOString(),
    idempotencyKey,
    source: "website",
  };

  if (!url) {
    // Recorded, not delivered. The distinction is reported to the caller.
    console.info("[ahm-os] not configured; event not published", {
      event,
      idempotencyKey,
    });
    return { published: false, reason: "not_configured", idempotencyKey };
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), options.timeoutMs ?? 8000);

  try {
    const res = await fetch(url, {
      method: "POST",
      signal: controller.signal,
      headers: {
        "content-type": "application/json",
        "idempotency-key": idempotencyKey,
        ...(process.env.AHM_OS_TOKEN ? { authorization: `Bearer ${process.env.AHM_OS_TOKEN}` } : {}),
      },
      body: JSON.stringify(envelope),
    });

    if (!res.ok) {
      console.error("[ahm-os] rejected", { event, status: res.status, idempotencyKey });
      return { published: false, reason: "bad_status", status: res.status, idempotencyKey };
    }
    return { published: true, status: res.status, idempotencyKey };
  } catch (err) {
    // Never rethrow into a request handler: a CRM outage must not fail a buyer's
    // submission. The caller decides what to tell them.
    console.error("[ahm-os] request failed", {
      event,
      idempotencyKey,
      error: err instanceof Error ? err.message : String(err),
    });
    return { published: false, reason: "request_failed", idempotencyKey };
  } finally {
    clearTimeout(timer);
  }
}
