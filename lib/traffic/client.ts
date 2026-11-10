import { isCountedEvent, type Batch, type CountedEvent } from "./model";

/**
 * The browser half of the daily counts: a small tally kept in the open page's
 * memory and posted once, when the visitor leaves or switches away. One write
 * per visit rather than one per click keeps the store's request count down,
 * and means nothing is sent while the visitor is still reading.
 *
 * Memory only. No cookie, no localStorage: see lib/attribution.ts for why
 * nothing here is written to the visitor's device. A reload therefore starts a
 * new visit, which is why visit counts run a little high.
 */

const MAX_QUEUED_VIEWS = 20;

let views: string[] = [];
let events: Partial<Record<CountedEvent, number>> = {};
let ref: string | null = null;
let utm: string | null = null;
let landed = false;
let started = false;

function arrival() {
  if (started) return;
  started = true;
  try {
    if (document.referrer) {
      const host = new URL(document.referrer).hostname;
      if (host && host !== window.location.hostname) ref = host.slice(0, 120);
    }
    utm = new URLSearchParams(window.location.search).get("utm_source")?.slice(0, 40) ?? null;
  } catch {
    // A malformed referrer: the visit is counted as direct.
  }
  landed = true;
}

export function flush(): void {
  if (views.length === 0 && Object.keys(events).length === 0) return;
  const body: Batch = { views, ref, utm, landed: landed && views.length > 0, events };
  if (body.landed) landed = false;
  views = [];
  events = {};
  try {
    navigator.sendBeacon?.("/api/m", new Blob([JSON.stringify(body)], { type: "text/plain" }));
  } catch {
    // Counting is best effort and must never affect the page.
  }
}

export function countView(path: string): void {
  arrival();
  if (views[views.length - 1] !== path) views.push(path);
  if (views.length >= MAX_QUEUED_VIEWS) flush();
}

export function countEvent(name: string): void {
  if (!isCountedEvent(name)) return;
  events[name] = (events[name] ?? 0) + 1;
}
