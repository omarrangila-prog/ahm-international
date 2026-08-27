import { ImageResponse } from "next/og";

/**
 * Default Open Graph card.
 *
 * Prerendered at build time rather than shipped as a hand-made file, so the
 * brand treatment lives in one place and stays in sync with the site. Uses only system-safe font stacks — loading a
 * webfont here would add a network dependency to every social preview.
 */

export const alt = "AHM International. Apparel manufacturing and FOB export, Karachi, Pakistan";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#F5F1E8",
          padding: "72px",
          fontFamily: "system-ui, -apple-system, Segoe UI, Helvetica, Arial, sans-serif",
        }}
      >
        {/* Mark + wordmark */}
        <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
          <svg width="46" height="41" viewBox="0 0 100 88" fill="none">
            <path d="M6 84 L50 4 L94 84" stroke="#101315" strokeWidth="9" />
            <path d="M27 84 L40.5 47 L50 62 L59.5 47 L73 84" stroke="#101315" strokeWidth="8" />
          </svg>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: 26, fontWeight: 800, color: "#101315", letterSpacing: "-0.02em" }}>
              AHM
            </span>
            <span style={{ fontSize: 13, fontWeight: 600, color: "#101315", opacity: 0.6, letterSpacing: "0.16em" }}>
              INTERNATIONAL
            </span>
          </div>
        </div>

        {/* Headline */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ fontSize: 82, fontWeight: 800, color: "#101315", lineHeight: 0.95, letterSpacing: "-0.04em" }}>
            YOUR NEXT
          </span>
          <span style={{ fontSize: 82, fontWeight: 800, color: "#2754FF", lineHeight: 0.95, letterSpacing: "-0.04em" }}>
            PAKISTAN
          </span>
          <span style={{ fontSize: 82, fontWeight: 800, color: "#101315", lineHeight: 0.95, letterSpacing: "-0.04em" }}>
            MANUFACTURING PARTNER.
          </span>
        </div>

        {/* Footer strip */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontSize: 20, color: "#101315", opacity: 0.65 }}>
            From tech pack to FOB shipment.
          </span>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", background: "#C8FF3D", padding: "10px 20px" }}>
            <span style={{ fontSize: 15, fontWeight: 700, color: "#101315", letterSpacing: "0.12em" }}>
              FOB • KARACHI, PAKISTAN
            </span>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
