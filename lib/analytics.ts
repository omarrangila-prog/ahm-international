/**
 * Analytics event layer.
 *
 * Events are pushed to `window.dataLayer` and mirrored to `gtag` when either is
 * present. Nothing is loaded or sent by this module on its own — if no analytics
 * provider has been installed the calls are silent no-ops. That keeps the site
 * shippable before a GA4 property exists, and keeps consent handling in one place.
 */

export type AnalyticsEvent =
  | "hero_rfq_click"
  | "product_view"
  | "techpack_upload_start"
  | "techpack_upload_complete"
  | "techpack_upload_error"
  | "rfq_start"
  | "rfq_step_complete"
  | "rfq_submit"
  | "rfq_submit_error"
  | "email_click"
  | "phone_click"
  | "book_call_click"
  | "mega_menu_open"
  | "benchmark_start"
  // Spec §36 — buyer-intent events
  | "product_filtered"
  | "industry_viewed"
  | "case_study_viewed"
  | "material_viewed"
  | "quality_process_viewed"
  | "export_process_viewed"
  | "benchmark_completed"
  | "rfq_completed"
  | "contact_clicked"
  // Private showroom (§27) — emitted once the showroom ships
  | "showroom_opened"
  | "showroom_style_selected";

type Payload = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function track(event: AnalyticsEvent, payload: Payload = {}) {
  if (typeof window === "undefined") return;

  const detail = { event, ...payload };

  if (Array.isArray(window.dataLayer)) {
    window.dataLayer.push(detail);
  }

  if (typeof window.gtag === "function") {
    window.gtag("event", event, payload);
  }

  if (process.env.NODE_ENV === "development") {
    // Surfaces the event stream while building, without shipping a provider.
    console.debug("[analytics]", event, payload);
  }
}
