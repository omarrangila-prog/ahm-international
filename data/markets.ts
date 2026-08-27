/**
 * Buyer markets.
 *
 * These are markets AHM *supplies*, not places it has an office. Every record
 * carries `localOffice: false` and the UI states manufacturing location
 * explicitly, so a buyer is never left to infer a presence that does not exist.
 */

export type Market = {
  name: string;
  code: string;
  /** Documented shipment history to this market. */
  documentedExport: boolean;
  localOffice: false;
  /** Representative port/city for the market. */
  hub: string;
  /**
   * Label placement offsets. US/CA and GB/EU sit close enough on an
   * equirectangular projection that their labels collide without them.
   */
  label: { dx: number; dy: number; anchor: "start" | "middle" | "end" };
  /**
   * Position on an equirectangular projection, as a percentage of the viewBox.
   * Derived from real coordinates: x = (lon + 180) / 360, y = (90 - lat) / 180.
   */
  position: { x: number; y: number };
};

/** Karachi: 24.86N, 67.01E. */
export const ORIGIN = {
  name: "Karachi",
  port: "Port Qasim",
  country: "Pakistan",
  position: { x: 68.61, y: 36.19 },
} as const;

export const markets: Market[] = [
  { name: "United States", code: "US", hub: "New York", label: { dx: -6, dy: 22, anchor: "end" }, documentedExport: true, localOffice: false, position: { x: 29.44, y: 27.39 } },
  { name: "Canada", code: "CA", hub: "Toronto", label: { dx: -8, dy: -12, anchor: "end" }, documentedExport: false, localOffice: false, position: { x: 27.95, y: 25.75 } },
  { name: "United Kingdom", code: "GB", hub: "Felixstowe", label: { dx: -8, dy: -12, anchor: "end" }, documentedExport: false, localOffice: false, position: { x: 50.38, y: 21.42 } },
  { name: "European Union", code: "EU", hub: "Rotterdam", label: { dx: 10, dy: 20, anchor: "start" }, documentedExport: false, localOffice: false, position: { x: 51.24, y: 21.14 } },
  { name: "Australia", code: "AU", hub: "Sydney", label: { dx: -10, dy: 6, anchor: "end" }, documentedExport: false, localOffice: false, position: { x: 92.0, y: 68.82 } },
];

export const MARKET_STATEMENT =
  "AHM International manufactures in Pakistan and supplies buyers internationally. We do not operate a local office in these markets." as const;

export const EXPORT_STATEMENT =
  "AHM International has documented FOB apparel export experience from Port Qasim, Karachi to the United States." as const;

/** What FOB actually covers, so a buyer knows where responsibility transfers. */
export const fobScope = [
  { title: "Commercial documentation", body: "Commercial invoice, packing list and the export documents required for the shipment." },
  { title: "Export packing", body: "Cartons packed and sealed to your packing instruction, with dimensions and weights recorded." },
  { title: "Carton marking", body: "Shipping marks, carton labelling and any retailer-specific marking applied to your artwork." },
  { title: "Shipping coordination", body: "Booking coordinated with your nominated forwarder and the documents released against instruction." },
  { title: "FOB handover", body: "Goods delivered and cleared for export, with responsibility transferring on board at Port Qasim." },
] as const;
