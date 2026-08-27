# AHM OS INTEGRATION CONTRACT

Master spec §55. Implemented in `lib/ahm-os/`.

## Status

**The contract is complete; the connection is not made.** `AHM_OS_URL` is unset,
so nothing is published today. This is the designed state, not an omission — the
spec forbids fake production calls, so the client reports honestly rather than
resolving optimistically.

## Files

| File | Role |
|---|---|
| `types.ts` | The §56 domain model — Buyer, Lead, RFQ, Sample, Approval, Inspection, CAPA, Shipment, Document, Showroom, TimelineEvent, … Branded ids so a `ShipmentId` cannot be passed where a `SampleId` belongs. |
| `events.ts` | `AhmOsEventMap` — name → payload. The union, the type guard and the publisher signature all derive from it. |
| `mappers.ts` | Pure functions from website submission to domain record. Unit-tested. |
| `client.ts` | The only file that performs I/O. Server-only. |
| `index.ts` | The barrel. Import from here so the surface stays swappable. |

## Events

`lead.created` · `buyer.created` · `rfq.created` · `benchmark.created` ·
`techpack.uploaded` · `sample.created` · `sample.revised` · `sample.approved` ·
`qc.created` · `qc.failed` · `qc.approved` · `shipment.created` ·
`shipment.dispatched`

Only `lead.created` has a live emitter today (the RFQ route). The rest are
declared so AHM OS can be built against a fixed contract.

## Envelope

```json
{
  "event": "lead.created",
  "payload": { "...": "typed per AhmOsEventMap" },
  "occurredAt": "2026-08-26T09:41:00.000Z",
  "idempotencyKey": "AHM-260826-AB12",
  "source": "website"
}
```

Sent as `POST` with `idempotency-key` header and optional bearer token. For
submissions the idempotency key **is** the buyer's reference, so a retry cannot
create a duplicate lead.

## Turning it on

```bash
AHM_OS_URL=https://os.internal.example/ingest
AHM_OS_TOKEN=...
```

AHM OS must return 2xx to acknowledge, and must treat a repeated
`idempotency-key` as the same event. Non-2xx is logged and reported as
`{ published: false, reason: "bad_status" }`; the buyer's submission still
succeeds. An 8-second timeout applies.

## Deliberate constraints

- **No retry queue.** A queue that survives one process but not a deploy gives
  false confidence. Retry belongs in a durable queue, added when the endpoint exists.
- **No PII to analytics** (§36) — the analytics layer receives event names and
  facet values, never buyer identity.
- **Lead scoring never rejects.** §37 — `Lead.score` exists for internal
  prioritisation and nothing consumes it to decline a buyer.
