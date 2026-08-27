/**
 * AHM OS — EVENT CONTRACT
 * =======================
 *
 * Master spec §55. The names AHM OS will receive, and the payload each carries.
 *
 * Defined as a map from event name to payload so the union, the type guard and
 * the publisher signature all derive from one declaration. Adding an event here
 * makes it publishable and type-checked at every call site; there is no second
 * list to keep in step.
 */

import type {
  BenchmarkRequest, Lead, Rfq, Sample, Shipment, StoredDocument,
  Buyer, Inspection, Approval,
} from "./types";

export type AhmOsEventMap = {
  "lead.created": Lead;
  "buyer.created": Buyer;
  "rfq.created": Rfq;
  "benchmark.created": BenchmarkRequest;
  "techpack.uploaded": StoredDocument;
  "sample.created": Sample;
  "sample.revised": Sample;
  "sample.approved": Approval;
  "qc.created": Inspection;
  "qc.failed": Inspection;
  "qc.approved": Inspection;
  "shipment.created": Shipment;
  "shipment.dispatched": Shipment;
};

export type AhmOsEventName = keyof AhmOsEventMap;

export const AHM_OS_EVENTS = [
  "lead.created", "buyer.created", "rfq.created", "benchmark.created",
  "techpack.uploaded", "sample.created", "sample.revised", "sample.approved",
  "qc.created", "qc.failed", "qc.approved", "shipment.created", "shipment.dispatched",
] as const satisfies readonly AhmOsEventName[];

export function isAhmOsEvent(name: string): name is AhmOsEventName {
  return (AHM_OS_EVENTS as readonly string[]).includes(name);
}

/** The envelope AHM OS receives. `idempotencyKey` lets a retry be safe. */
export type AhmOsEnvelope<K extends AhmOsEventName = AhmOsEventName> = {
  event: K;
  payload: AhmOsEventMap[K];
  occurredAt: string;
  idempotencyKey: string;
  source: "website";
};
