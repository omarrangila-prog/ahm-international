import {
  dayKey,
  isCountedEvent,
  SEEN_COOKIE,
  SEEN_MAX_AGE,
  SEEN_OFF,
  visitorFromCookie,
  type Batch,
  type CountedEvent,
  type VisitorKind,
} from "./model";

/**
 * The browser half of the daily counts: a small tally kept in the open page's
 * memory and posted once, when the visitor leaves or switches away. One write
 * per visit rather than one per click keeps the store's request count down,
 * and means nothing is sent while the visitor is still reading.
 *
 * The tally lives in memory. The one thing written to the device is the
 * `ahm_seen` cookie, which holds the last day this browser was counted and
 * nothing else (see lib/traffic/model.ts). A visitor can switch it off on the
 * cookie page, and a browser sending Global Privacy Control is treated as
 * having done so: it is still counted as visits, never as a visitor.
 */

const MAX_QUEUED_VIEWS = 20;

let views: string[] = [];
let events: Partial<Record<CountedEvent, number>> = {};
let ref: string | null = null;
let utm: string | null = null;
let landed = false;
let started = false;
let uv: VisitorKind | null = null;

function readSeen(): string | null {
  const match = document.cookie.match(new RegExp(`(?:^|; )${SEEN_COOKIE}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}

function writeSeen(value: string) {
  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${SEEN_COOKIE}=${value}; Max-Age=${SEEN_MAX_AGE}; Path=/; SameSite=Lax${secure}`;
}

/** Whether this browser has opted out of being counted as a visitor. */
export function visitorCountingOff(): boolean {
  const gpc = (navigator as Navigator & { globalPrivacyControl?: boolean }).globalPrivacyControl === true;
  return gpc || readSeen() === SEEN_OFF;
}

/** The cookie page's switch. Off keeps a marker so the choice is remembered; on deletes it. */
export function setVisitorCounting(on: boolean): void {
  if (on) document.cookie = `${SEEN_COOKIE}=; Max-Age=0; Path=/`;
  else writeSeen(SEEN_OFF);
}

function countVisitor() {
  try {
    if (visitorCountingOff()) return;
    const today = dayKey();
    uv = visitorFromCookie(readSeen(), today);
    if (uv) writeSeen(today);
  } catch {
    // Cookies disabled: counted as a visit only.
  }
}

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
  countVisitor();
}

export function flush(): void {
  if (views.length === 0 && Object.keys(events).length === 0) return;
  const body: Batch = { views, ref, utm, landed: landed && views.length > 0, uv: null, events };
  if (body.landed) {
    body.uv = uv;
    landed = false;
    uv = null;
  }
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
