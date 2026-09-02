"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { ORIGIN, markets } from "@/data/markets";

const World = dynamic(() => import("@/components/ui/globe").then((m) => m.World), {
  ssr: false,
  loading: () => null,
});

/**
 * EXPORT GLOBE
 * ============
 *
 * The demo this came from plots forty arcs across every continent. That would be
 * fabricated export presence, which every brief on this project forbids and
 * which a sourcing director checks first. AHM has one documented lane, so the
 * globe draws one arc.
 *
 * Arc data is derived from `data/markets.ts` rather than written here, so a
 * market cannot appear on the globe without also carrying its `documentedExport`
 * flag. Target markets are named in the list beside it; they are deliberately
 * not drawn, because a line between two points reads as a route whatever the
 * caption says.
 *
 * Three costs are paid down here rather than left to the demo's defaults:
 *
 *   1. The WebGL stack is the largest dependency on the site. It loads with
 *      `ssr: false` and only once the section is near the viewport, so it is
 *      absent from first paint and from every other route.
 *   2. A react-three-fiber canvas renders forever by default. This one suspends
 *      its loop when scrolled out of view.
 *   3. Under `prefers-reduced-motion` the globe does not spin and the arc does
 *      not crawl — it renders once, on demand, and holds still.
 *
 * The canvas is `aria-hidden`. Everything it shows is stated in text in the
 * market list, so a screen reader gets the facts, not a description of a sphere.
 */

/** markets.ts stores positions as percentages; convert back to coordinates. */
function toLatLng(p: { x: number; y: number }) {
  return { lat: 90 - (p.y / 100) * 180, lng: (p.x / 100) * 360 - 180 };
}

const origin = toLatLng(ORIGIN.position);

const ARC_ALTITUDE = 0.5;

/**
 * Each documented lane is drawn twice: once as a standing route, once as a
 * pulse travelling it in the direction the goods travel. One arc alone is
 * either always on, which is inert, or dashed, which leaves the lane missing
 * for most of every cycle.
 */
function lanes(animated: boolean) {
  return markets
    .filter((m) => m.documentedExport)
    .flatMap((m, i) => {
      const dest = toLatLng(m.position);
      const lane = {
        order: i + 1,
        startLat: origin.lat,
        startLng: origin.lng,
        endLat: dest.lat,
        endLng: dest.lng,
        arcAlt: ARC_ALTITUDE,
      };
      const route = { ...lane, color: "rgba(200,255,61,0.55)", dashLength: 1, dashGap: 0, dashInitialGap: 0, dashAnimateTime: 0 };
      if (!animated) return [{ ...lane, color: "#c8ff3d" }];
      return [route, { ...lane, color: "#c8ff3d", dashLength: 0.3, dashGap: 0.7, dashInitialGap: 0, dashAnimateTime: 3400 }];
    });
}

const animatedLanes = lanes(true);
const staticLanes = lanes(false);

const globeConfig = {
  pointSize: 3,
  // Ink, the zone this sits in, so the sphere reads as depth in the section
  // rather than as a ball dropped onto it. The emissive lifts it just clear of
  // the ground: a Phong sphere with one key light is half shadow, and shadow on
  // this ground is a hole.
  globeColor: "#101010",
  emissive: "#242424",
  emissiveIntensity: 0.75,
  shininess: 0.6,
  showAtmosphere: true,
  atmosphereColor: "#c8ff3d",
  atmosphereAltitude: 0.14,
  polygonColor: "rgba(247,245,240,0.8)",
  ambientLight: "#f7f5f0",
  directionalLeftLight: "#f7f5f0",
  directionalTopLight: "#f7f5f0",
  pointLight: "#f7f5f0",
  arcTime: 2600,
  arcLength: 0.6,
  rings: 1,
  maxRings: 3,
  initialPosition: origin,
  // The globe does not spin.
  //
  // A rotating sphere carries the lane out of sight for most of every turn,
  // which makes the one thing worth showing the thing you mostly cannot see.
  // Held still and leaned north, the whole Karachi-to-US arc stays in frame,
  // and the only motion left is the dash travelling along it in the direction
  // the goods travel. That is the site's rule everywhere else: motion earns its
  // place by carrying meaning, or it does not run.
  autoRotate: false,
  // Puts the great-circle midpoint of the lane (about 62N, 11E) near the centre
  // of the frame without tipping the view so far north that the sphere stops
  // reading as a globe.
  tilt: 0.78,
};

export function ExportGlobe() {
  const ref = useRef<HTMLDivElement>(null);
  /** Mounts once and stays mounted; tearing a WebGL context down on scroll is worse than pausing it. */
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [motionOk, setMotionOk] = useState(true);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setMotionOk(!query.matches);
    apply();
    query.addEventListener("change", apply);
    return () => query.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === "undefined") {
      setMounted(true);
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
        if (entry.isIntersecting) setMounted(true);
      },
      // Starts loading a screen early so the globe is drawn by the time it is read.
      { rootMargin: "600px 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      // Reserves the square before the canvas arrives, so nothing shifts.
      className="relative mx-auto aspect-square w-full max-w-[34rem]"
      aria-hidden="true"
    >
      {/* Holds the frame while the stack downloads, and stands in for it if WebGL is unavailable. */}
      <div
        className="absolute inset-[8%] rounded-full"
        style={{ background: "radial-gradient(circle at 38% 32%, rgba(200,255,61,0.12), transparent 62%)" }}
      />
      {mounted ? (
        <div className="absolute inset-0">
          <World
            data={motionOk ? animatedLanes : staticLanes}
            globeConfig={{ ...globeConfig, animateArcs: motionOk }}
            frameloop={!motionOk ? "demand" : visible ? "always" : "never"}
          />
        </div>
      ) : null}
    </div>
  );
}
