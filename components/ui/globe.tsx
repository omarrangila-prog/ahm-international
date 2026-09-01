"use client";

import { useEffect, useRef, useState } from "react";
import { Color, Scene, Fog, Vector3 } from "three";
import ThreeGlobe from "three-globe";
import { useThree, useFrame, Canvas, extend } from "@react-three/fiber";
import countries from "@/data/globe.json";

declare module "@react-three/fiber" {
  interface ThreeElements {
    threeGlobe: ThreeElements["mesh"] & { new (): ThreeGlobe };
  }
}

extend({ ThreeGlobe });

const RING_PROPAGATION_SPEED = 3;
/**
 * Camera distance. The demo's 300 fills the frame with the sphere, which is
 * right when the arcs hug the surface. A lane lifted half a radius clear of the
 * globe needs the extra room, or its apex is cropped by the canvas instead of
 * by the near plane.
 */
const cameraZ = 310;

/**
 * Default tilt, in radians, applied to the sphere as a whole.
 *
 * three-globe puts longitude 0 at the camera and latitude 0 on the horizon, so
 * an untilted globe centres the equator and pushes northern-hemisphere routes
 * to the rim, where the sphere itself hides most of them. Leaning the north
 * pole forward brings them into the middle of the frame. Callers override it
 * through `globeConfig.tilt` to frame their own lane.
 */
const DEFAULT_TILT = 0.34;

/**
 * When to ask for a repaint after the data changes, in milliseconds.
 *
 * Under `frameloop="demand"` nothing renders unless something asks it to, and a
 * single `invalidate()` after setting the data paints an empty sphere: three-globe
 * builds its hex grid and arc tubes across later ticks of its own scheduler, so
 * the geometry does not exist yet at the moment we ask. These repaints trail the
 * build until it has settled — about thirty frames in total, against the ~500 a
 * render loop would have spent covering the same eight seconds.
 */
const REPAINT_SCHEDULE = [0, 60, 150, 300, 600, 1000, 1500, 2200, 3200, 4500, 6000, 8000];

export type Position = {
  order: number;
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  arcAlt: number;
  color: string;
  /**
   * Per-arc dash pattern, as a fraction of the arc's own length.
   *
   * The upstream demo sets one pattern for all forty of its arcs — a 0.9 dash
   * against a gap of 15, so any given arc is drawn for under 4% of its cycle
   * and the globe stays busy because something else is always lit. Drawn once,
   * that same pattern is a line that is almost never there. Per-arc control
   * lets a route be laid down solid and a pulse run along it.
   */
  dashLength?: number;
  dashGap?: number;
  dashAnimateTime?: number;
  /**
   * Where the dash starts, as a fraction of the pattern. Defaults to `order`,
   * which is what staggers the demo's arcs. An arc meant to stand still needs
   * its own value: offsetting a solid dash by a whole period pushes it off the
   * end of the arc and the line vanishes.
   */
  dashInitialGap?: number;
};

export type GlobeConfig = {
  pointSize?: number;
  globeColor?: string;
  showAtmosphere?: boolean;
  atmosphereColor?: string;
  atmosphereAltitude?: number;
  emissive?: string;
  emissiveIntensity?: number;
  shininess?: number;
  polygonColor?: string;
  ambientLight?: string;
  directionalLeftLight?: string;
  directionalTopLight?: string;
  pointLight?: string;
  arcTime?: number;
  arcLength?: number;
  rings?: number;
  maxRings?: number;
  initialPosition?: { lat: number; lng: number };
  autoRotate?: boolean;
  autoRotateSpeed?: number;
  /** Radians of forward lean. Raise it to bring northern latitudes to centre. */
  tilt?: number;
  /**
   * When false the arcs are drawn solid and still, and the origin stops
   * pulsing. Set from `prefers-reduced-motion`: a dashed line crawling around a
   * sphere forever is exactly the kind of unstoppable motion that setting
   * exists to switch off, and the arc carries the same meaning without it.
   */
  animateArcs?: boolean;
};

interface WorldProps {
  globeConfig: GlobeConfig;
  data: Position[];
  /**
   * "always" renders every frame, "demand" only when something changes, "never"
   * suspends the loop. WebGL does not stop when it scrolls out of view, so the
   * caller drives this from visibility rather than letting a globe nobody can
   * see keep a GPU awake.
   */
  frameloop?: "always" | "demand" | "never";
}

export function Globe({ globeConfig, data }: WorldProps) {
  const globeRef = useRef<ThreeGlobe | null>(null);
  const groupRef = useRef<import("three").Group>(null);
  const spinRef = useRef<import("three").Group>(null);
  const [ready, setReady] = useState(false);
  // Needed because three-globe mutates the scene imperatively: under "demand"
  // there is no React state change to tell the renderer a frame is now stale.
  const invalidate = useThree((s) => s.invalidate);

  const props = {
    pointSize: 1,
    atmosphereColor: "#ffffff",
    showAtmosphere: true,
    atmosphereAltitude: 0.1,
    polygonColor: "rgba(255,255,255,0.7)",
    globeColor: "#1d072e",
    emissive: "#000000",
    emissiveIntensity: 0.1,
    shininess: 0.9,
    arcTime: 2000,
    arcLength: 0.9,
    rings: 1,
    maxRings: 3,
    animateArcs: true,
    ...globeConfig,
  };

  useEffect(() => {
    if (!globeRef.current && groupRef.current) {
      globeRef.current = new ThreeGlobe();
      groupRef.current.add(globeRef.current);
      setReady(true);
    }
  }, []);

  useEffect(() => {
    if (!globeRef.current || !ready) return;
    const m = globeRef.current.globeMaterial() as unknown as {
      color: Color; emissive: Color; emissiveIntensity: number; shininess: number;
    };
    m.color = new Color(props.globeColor);
    m.emissive = new Color(props.emissive);
    m.emissiveIntensity = props.emissiveIntensity;
    m.shininess = props.shininess;
    invalidate();
  }, [ready, invalidate, props.globeColor, props.emissive, props.emissiveIntensity, props.shininess]);

  useEffect(() => {
    if (!globeRef.current || !ready || !data) return;

    const points = data.flatMap((arc) => [
      { size: props.pointSize, order: arc.order, color: arc.color, lat: arc.startLat, lng: arc.startLng },
      { size: props.pointSize, order: arc.order, color: arc.color, lat: arc.endLat, lng: arc.endLng },
    ]);
    const unique = points.filter(
      (v, i, a) => a.findIndex((o) => o.lat === v.lat && o.lng === v.lng) === i,
    );

    globeRef.current
      .hexPolygonsData((countries as { features: object[] }).features)
      .hexPolygonResolution(3)
      .hexPolygonMargin(0.7)
      .showAtmosphere(props.showAtmosphere)
      .atmosphereColor(props.atmosphereColor)
      .atmosphereAltitude(props.atmosphereAltitude)
      .hexPolygonColor(() => props.polygonColor);

    const arcs = globeRef.current
      .arcsData(data)
      .arcStartLat((d: object) => (d as Position).startLat)
      .arcStartLng((d: object) => (d as Position).startLng)
      .arcEndLat((d: object) => (d as Position).endLat)
      .arcEndLng((d: object) => (d as Position).endLng)
      .arcColor((d: object) => (d as Position).color)
      .arcAltitude((d: object) => (d as Position).arcAlt)
      // Fixed rather than randomised per arc: a stroke that changes on every
      // render is noise, and this globe carries few enough arcs to read cleanly.
      .arcStroke(() => 0.9);

    if (props.animateArcs) {
      arcs
        .arcDashLength((d: object) => (d as Position).dashLength ?? props.arcLength)
        .arcDashGap((d: object) => (d as Position).dashGap ?? 15)
        .arcDashInitialGap((d: object) => (d as Position).dashInitialGap ?? (d as Position).order)
        .arcDashAnimateTime((d: object) => (d as Position).dashAnimateTime ?? props.arcTime);
    } else {
      arcs.arcDashLength(1).arcDashInitialGap(0).arcDashGap(0).arcDashAnimateTime(0);
    }

    globeRef.current
      .pointsData(unique)
      .pointColor((d: object) => (d as { color: string }).color)
      .pointsMerge(true)
      .pointAltitude(0)
      .pointRadius(2);

    globeRef.current
      .ringsData([])
      .ringColor(() => props.polygonColor)
      .ringMaxRadius(props.maxRings)
      .ringPropagationSpeed(RING_PROPAGATION_SPEED)
      .ringRepeatPeriod((props.arcTime * props.arcLength) / props.rings);

    // Trails three-globe's own build; see REPAINT_SCHEDULE.
    const timers = REPAINT_SCHEDULE.map((ms) => setTimeout(invalidate, ms));
    return () => timers.forEach(clearTimeout);
  }, [ready, data, invalidate, props.pointSize, props.showAtmosphere, props.atmosphereColor,
      props.atmosphereAltitude, props.polygonColor, props.arcLength, props.arcTime,
      props.rings, props.maxRings, props.animateArcs]);

  useEffect(() => {
    if (!globeRef.current || !ready || !data.length || !props.animateArcs) return;
    // Rings pulse from the origin only. The original picked random arcs each
    // tick; with a small, meaningful arc set that reads as flicker.
    const id = setInterval(() => {
      globeRef.current?.ringsData(
        data.slice(0, 1).map((d) => ({ lat: d.startLat, lng: d.startLng, color: d.color })),
      );
    }, 2000);
    return () => clearInterval(id);
  }, [ready, data, props.animateArcs]);

  // Rotation lives here rather than in OrbitControls. The canvas is decorative
  // and `aria-hidden`, so it needs no drag handling, no zoom and no damping.
  // Dropping @react-three/drei for one line saved only ~3 KB gzipped — it
  // tree-shakes well — but it also removed a dependency the site needs for
  // nothing else. Speed keeps drei's unit, revolutions per minute, so motion is
  // unchanged. Under "demand" this callback never runs, which is what holds the
  // globe still for reduced motion.
  useFrame((_, delta) => {
    if (!spinRef.current || props.autoRotate === false) return;
    spinRef.current.rotation.y += delta * ((props.autoRotateSpeed ?? 0.5) * ((2 * Math.PI) / 60));
  });

  return (
    <group rotation-x={props.tilt ?? DEFAULT_TILT}>
      <group ref={spinRef}>
        <group ref={groupRef} />
      </group>
    </group>
  );
}

export function WebGLRendererConfig() {
  const { gl, size } = useThree();
  useEffect(() => {
    // Capped at 2: on a 3x phone this halves the pixels the GPU fills for no
    // visible gain on a globe of this size.
    gl.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    gl.setSize(size.width, size.height);
    gl.setClearColor(0x000000, 0);
  }, [gl, size]);
  return null;
}

export function World(props: WorldProps) {
  const { globeConfig, frameloop = "always" } = props;
  const scene = new Scene();
  scene.fog = new Fog(0xffffff, 400, 2000);

  return (
    <Canvas
      scene={scene}
      // Two fixes to the upstream camera.
      //
      // Position: the demo builds a camera at the origin and lets OrbitControls'
      // min/max distance push it out to `cameraZ`. With the controls gone the
      // camera has to be placed, or it sits inside the sphere and renders black.
      //
      // Near plane: the demo sets it to 180. The camera sits at 300 and the
      // globe has radius 100, so everything nearer than z = 120 is clipped —
      // which is precisely where an arc's apex sits when it faces the viewer.
      // Any arc of altitude above ~0.2 loses its middle and renders as two
      // stubs at the coasts. At 100 an arc can rise a full radius and stay
      // whole; the sphere is nowhere near close enough for depth precision to
      // care.
      camera={{ fov: 50, near: 100, far: 1800, position: [0, 0, cameraZ] }}
      frameloop={frameloop}
    >
      <WebGLRendererConfig />
      <ambientLight color={globeConfig.ambientLight} intensity={1.1} />
      <directionalLight color={globeConfig.directionalLeftLight} position={new Vector3(-400, 100, 400)} />
      <directionalLight color={globeConfig.directionalTopLight} position={new Vector3(-200, 500, 200)} />
      <pointLight color={globeConfig.pointLight} position={new Vector3(-200, 500, 200)} intensity={0.8} />
      <Globe {...props} />
    </Canvas>
  );
}
