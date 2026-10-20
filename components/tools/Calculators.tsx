"use client";

import { useState } from "react";
import {
  UNITS, cartonLoad, chooseDecoration, convertUnit, costSheet, deviationPct, fabricKg, fabricMetres, fabricPrice,
  markerConsumption, splitSizes, toleranceRange, yarnCounts,
  type Colours, type Dimension, type Fabric, type LogoSize, type Run, type YarnSystem,
} from "@/lib/calculators";
import { CalcCard, Hint, Line, NumField, SelectField, fmt, num } from "./CalcKit";

/**
 * The buyer calculators, one section each.
 *
 * Arithmetic lives in lib/calculators.ts and is tested there. A calculator
 * here only reads text boxes, calls it, and prints the answer with its
 * formula and limits. An empty or unreadable box gives no result rather than a
 * result computed from zero.
 */

/* ------------------------------------ units ------------------------------------ */

function UnitConverter() {
  const [dim, setDim] = useState<Dimension>("length");
  const [value, setValue] = useState("");
  const [from, setFrom] = useState("in");
  const units = Object.keys(UNITS[dim]);
  const v = num(value);
  const changeDim = (d: Dimension) => {
    setDim(d);
    setFrom(Object.keys(UNITS[d])[0]);
  };
  return (
    <CalcCard
      id="units"
      title="Unit converter"
      intro="Length, area and mass in the units a specification mixes: millimetres and inches, square metres and square yards, grams and ounces."
      formula="Each unit is converted through the metre, square metre or gram. The inch is exactly 2.54 cm, the yard exactly 0.9144 m and the pound exactly 453.59237 g."
      limits="Exact for the defined units. A measurement taken from a garment still has its own tolerance, and converting it does not remove that."
      onReset={() => { setValue(""); setDim("length"); setFrom("in"); }}
      result={
        Number.isFinite(v) ? (
          units.filter((u) => u !== from).map((u) => <Line key={u} label={u} value={fmt(convertUnit(dim, v, from, u), 4)} />)
        ) : (
          <Hint>Enter a value to see it in every other unit.</Hint>
        )
      }
    >
      <SelectField label="Measuring" value={dim} onChange={changeDim} options={[{ value: "length", label: "Length" }, { value: "area", label: "Area" }, { value: "mass", label: "Mass" }]} />
      <SelectField label="From" value={from} onChange={setFrom} options={units.map((u) => ({ value: u, label: u }))} />
      <NumField label="Value" value={value} onChange={setValue} />
    </CalcCard>
  );
}

/* -------------------------------------- yarn --------------------------------------- */

function YarnCount() {
  const [value, setValue] = useState("");
  const [system, setSystem] = useState<YarnSystem>("ne");
  const r = yarnCounts(num(value), system);
  return (
    <CalcCard
      id="yarn"
      title="Yarn count converter"
      intro="Convert between English cotton count (Ne), metric count (Nm), tex and denier."
      formula="Tex is grams per 1,000 m. Denier = 9 × tex. Nm = 1,000 ÷ tex. Ne = 590.54 ÷ tex, from 840 yards per pound."
      limits="For a single yarn. Ne here is the English cotton system; worsted, linen and other systems use different constants. A plied yarn is not its single count: 20/2 is two 20s, which is coarser than 20."
      onReset={() => { setValue(""); setSystem("ne"); }}
      result={
        r ? (
          <>
            <Line label="Tex" value={fmt(r.tex, 2)} />
            <Line label="Denier" value={fmt(r.denier, 1)} />
            <Line label="Nm" value={fmt(r.nm, 2)} />
            <Line label="Ne (cotton)" value={fmt(r.ne, 2)} />
          </>
        ) : (
          <Hint>Enter a count greater than zero.</Hint>
        )
      }
    >
      <SelectField label="Count system" value={system} onChange={setSystem} options={[{ value: "ne", label: "Ne (English cotton)" }, { value: "nm", label: "Nm (metric)" }, { value: "tex", label: "Tex" }, { value: "denier", label: "Denier" }]} />
      <NumField label="Count" value={value} onChange={setValue} />
    </CalcCard>
  );
}

/* ---------------------------------- weight and length -------------------------------- */

function FabricWeight() {
  const [gsm, setGsm] = useState("");
  const [width, setWidth] = useState("");
  const [metres, setMetres] = useState("");
  const [kg, setKg] = useState("");
  const toKg = fabricKg(num(gsm), num(width) / 100, num(metres));
  const toM = fabricMetres(num(gsm), num(width) / 100, num(kg));
  return (
    <CalcCard
      id="fabric-weight"
      title="Fabric metres and kilograms"
      intro="How much a length of fabric weighs, and how many metres a given weight contains. For freight, for rolls, and for comparing a quotation by the kilo with one by the metre."
      formula="kg = GSM × width (m) × length (m) ÷ 1,000.  metres = kg × 1,000 ÷ (GSM × width in m)."
      limits="Uses the width you enter, which should be the width the weight or price refers to. A roll also weighs its core and wrapping, which this does not include."
      onReset={() => { setGsm(""); setWidth(""); setMetres(""); setKg(""); }}
      result={
        <>
          {toKg !== null ? <Line label={`${fmt(num(metres), 2)} m weighs`} value={`${fmt(toKg, 2)} kg`} strong /> : <Hint>Enter GSM, width and a length for its weight.</Hint>}
          {toM !== null && <Line label={`${fmt(num(kg), 2)} kg is`} value={`${fmt(toM, 1)} m  (${fmt(toM / 0.9144, 1)} yd)`} strong />}
        </>
      }
    >
      <NumField label="Fabric weight" unit="GSM" value={gsm} onChange={setGsm} />
      <NumField label="Fabric width" unit="cm" value={width} onChange={setWidth} />
      <NumField label="Length" unit="m" value={metres} onChange={setMetres} />
      <NumField label="Or a weight" unit="kg" value={kg} onChange={setKg} />
    </CalcCard>
  );
}

/* -------------------------------------- price --------------------------------------- */

function FabricPrice() {
  const [gsm, setGsm] = useState("");
  const [width, setWidth] = useState("");
  const [perKg, setPerKg] = useState("");
  const [perM, setPerM] = useState("");
  const p = fabricPrice({ gsm: num(gsm), widthM: num(width) / 100, pricePerKg: num(perKg), pricePerMetre: num(perM) });
  return (
    <CalcCard
      id="fabric-price"
      title="Fabric price: per kilo, per metre, per yard"
      intro="Mills quote by the kilo; a cutting room plans in metres. Enter either price to see the others, so two quotations can be compared on one basis."
      formula="kg per metre = GSM × width (m) ÷ 1,000.  price per metre = price per kg × kg per metre.  price per yard = price per metre × 0.9144."
      limits="Any currency: the figures are only multiplied. Enter one price. Valid only for the GSM and width entered; a different width or finished weight is a different price."
      onReset={() => { setGsm(""); setWidth(""); setPerKg(""); setPerM(""); }}
      result={
        p ? (
          <>
            <Line label="Price per kg" value={fmt(p.pricePerKg, 3)} />
            <Line label="Price per metre" value={fmt(p.pricePerMetre, 3)} strong />
            <Line label="Price per yard" value={fmt(p.pricePerYard, 3)} />
            <Line label="Metres per kg" value={fmt(p.metresPerKg, 2)} />
          </>
        ) : (
          <Hint>Enter GSM, width and one price.</Hint>
        )
      }
    >
      <NumField label="Fabric weight" unit="GSM" value={gsm} onChange={setGsm} />
      <NumField label="Fabric width" unit="cm" value={width} onChange={setWidth} />
      <NumField label="Price per kg" value={perKg} onChange={(v) => { setPerKg(v); setPerM(""); }} />
      <NumField label="or price per metre" value={perM} onChange={(v) => { setPerM(v); setPerKg(""); }} />
    </CalcCard>
  );
}

/* ------------------------------------- consumption ------------------------------------ */

function Consumption() {
  const [marker, setMarker] = useState("");
  const [garments, setGarments] = useState("");
  const [width, setWidth] = useState("");
  const [qty, setQty] = useState("");
  const [allow, setAllow] = useState("");
  const [area, setArea] = useState("");
  const [gsm, setGsm] = useState("");
  const r = markerConsumption({ markerLengthM: num(marker), garmentsInMarker: num(garments), usableWidthM: num(width) / 100, quantity: num(qty), allowancePct: allow.trim() === "" ? 0 : num(allow), patternAreaM2: num(area), gsm: num(gsm) });
  return (
    <CalcCard
      id="consumption"
      title="Fabric requirement from a marker"
      intro="Fabric per garment and for the whole order, from the length of a real marker. This asks for the marker because consumption comes from the pattern layout, not from the garment type."
      formula="per garment = marker length ÷ garments in the marker.  order total = per garment × quantity × (1 + allowance)."
      limits="The marker length comes from your CAD layout at the width entered, and the allowance for spreading ends and defects from your process: this tool has no default for either and invents none. Efficiency appears only if you give the pattern area. A figure above 100% means the inputs disagree."
      onReset={() => { setMarker(""); setGarments(""); setWidth(""); setQty(""); setAllow(""); setArea(""); setGsm(""); }}
      result={
        r ? (
          <>
            <Line label="Per garment" value={`${fmt(r.perGarmentM, 3)} m`} strong />
            <Line label="Order total" value={`${fmt(r.totalM, 1)} m  (${fmt(r.totalYd, 1)} yd)`} strong />
            {r.totalKg !== null && <Line label="Order weight" value={`${fmt(r.totalKg, 1)} kg`} />}
            {r.efficiency !== null && <Line label="Marker efficiency" value={`${fmt(r.efficiency * 100, 1)}%`} />}
            {r.efficiency !== null && r.efficiency > 1 && <Hint>Efficiency is over 100%: check the pattern area and marker size.</Hint>}
          </>
        ) : (
          <Hint>Enter the marker length, garments in it, usable width and order quantity.</Hint>
        )
      }
    >
      <NumField label="Marker length" unit="m" value={marker} onChange={setMarker} />
      <NumField label="Garments in the marker" value={garments} onChange={setGarments} />
      <NumField label="Usable fabric width" unit="cm" value={width} onChange={setWidth} />
      <NumField label="Order quantity" unit="pieces" value={qty} onChange={setQty} />
      <NumField label="Allowance (ends, defects)" unit="%" value={allow} onChange={setAllow} hint="Your own figure. Left blank it is 0%." />
      <NumField label="Pattern area per garment" unit="m²" value={area} onChange={setArea} hint="Optional, for marker efficiency." />
      <NumField label="Fabric weight" unit="GSM" value={gsm} onChange={setGsm} hint="Optional, for the order weight." />
    </CalcCard>
  );
}

/* ------------------------------------- size run -------------------------------------- */

const DEFAULT_SIZES = ["S", "M", "L", "XL"];

function SizeRun() {
  const [total, setTotal] = useState("");
  const [ratios, setRatios] = useState<Record<string, string>>({});
  const rows = splitSizes(num(total), DEFAULT_SIZES.map((s) => ({ size: s, ratio: num(ratios[s] ?? "") })));
  return (
    <CalcCard
      id="size-run"
      title="Size run splitter"
      intro="Divide an order across sizes from a ratio, in whole garments that add up to the order."
      formula="size quantity = order × size ratio ÷ sum of ratios, rounded so the sizes total the order exactly (largest remainder)."
      limits="The ratio is your decision: this tool does not suggest one, because the right split depends on who wears the garment. Sizes with no ratio are left out."
      onReset={() => { setTotal(""); setRatios({}); }}
      result={
        rows ? (
          <>
            {rows.map((r) => (
              <Line key={r.size} label={`${r.size}  (${fmt(r.percent, 1)}%)`} value={`${fmt(r.qty, 0)} pcs`} />
            ))}
            <Line label="Total" value={`${fmt(rows.reduce((a, r) => a + r.qty, 0), 0)} pcs`} strong />
          </>
        ) : (
          <Hint>Enter a whole-number order quantity and a ratio for at least one size.</Hint>
        )
      }
    >
      <NumField label="Order quantity" unit="pieces" value={total} onChange={setTotal} />
      {DEFAULT_SIZES.map((s) => (
        <NumField key={s} label={`Ratio: ${s}`} value={ratios[s] ?? ""} onChange={(v) => setRatios((p) => ({ ...p, [s]: v }))} />
      ))}
    </CalcCard>
  );
}

/* ------------------------------------- cartons -------------------------------------- */

function Cartons() {
  const [l, setL] = useState("");
  const [w, setW] = useState("");
  const [h, setH] = useState("");
  const [per, setPer] = useState("");
  const [pcs, setPcs] = useState("");
  const [kg, setKg] = useState("");
  const r = cartonLoad({ lengthCm: num(l), widthCm: num(w), heightCm: num(h), piecesPerCarton: num(per), pieces: num(pcs), cartonKg: num(kg) });
  return (
    <CalcCard
      id="cartons"
      title="Carton volume and container share"
      intro="Cartons, cubic metres and how much of a container an order would take, from your carton size and packing."
      formula="CBM per carton = length × width × height (cm) ÷ 1,000,000.  cartons = pieces ÷ pieces per carton, rounded up.  total CBM = cartons × CBM per carton."
      limits="Container volumes are nominal internal figures (20 ft 33.2, 40 ft 67.7, 40 ft high cube 76.3 m³). A real load fills less, depending on carton shape, pallets and stacking, and weight limits apply too. Treat the share as a ceiling, and confirm loading with your forwarder."
      onReset={() => { setL(""); setW(""); setH(""); setPer(""); setPcs(""); setKg(""); }}
      result={
        r ? (
          <>
            <Line label="Cartons" value={`${fmt(r.cartons, 0)} (last holds ${r.lastCarton})`} strong />
            <Line label="CBM per carton" value={fmt(r.cbmPerCarton, 4)} />
            <Line label="Total volume" value={`${fmt(r.totalCbm, 3)} m³`} strong />
            {r.grossKg !== null && <Line label="Gross weight" value={`${fmt(r.grossKg, 1)} kg`} />}
            {r.containers.map((c) => (
              <Line key={c.id} label={`Share of a ${c.label}`} value={`${fmt(c.share * 100, 1)}%`} />
            ))}
          </>
        ) : (
          <Hint>Enter the carton size, pieces per carton (a whole number) and pieces in the order.</Hint>
        )
      }
    >
      <NumField label="Carton length" unit="cm" value={l} onChange={setL} />
      <NumField label="Carton width" unit="cm" value={w} onChange={setW} />
      <NumField label="Carton height" unit="cm" value={h} onChange={setH} />
      <NumField label="Pieces per carton" value={per} onChange={setPer} />
      <NumField label="Pieces in the order" value={pcs} onChange={setPcs} />
      <NumField label="Gross weight per carton" unit="kg" value={kg} onChange={setKg} hint="Optional." />
    </CalcCard>
  );
}

/* --------------------------------------- cost ---------------------------------------- */

const COST_FIELDS = [
  ["fabricPerPiece", "Fabric per piece", "m"],
  ["fabricPricePerM", "Fabric price", "per m"],
  ["fabricWastePct", "Fabric waste", "%"],
  ["make", "Make: cut, sew, finish", "per piece"],
  ["trims", "Trims", "per piece"],
  ["decoration", "Decoration", "per piece"],
  ["packing", "Packing", "per piece"],
  ["testing", "Testing and inspection", "per piece"],
  ["overheadPct", "Overhead", "%"],
  ["marginPct", "Margin", "%"],
  ["quantity", "Order quantity", "pieces"],
] as const;

function CostBuilder() {
  const [v, setV] = useState<Record<string, string>>({});
  const n = (k: string) => (v[k] === undefined || v[k].trim() === "" ? (k.endsWith("Pct") ? 0 : NaN) : num(v[k]));
  const c = costSheet({
    fabricPerPiece: n("fabricPerPiece"), fabricPricePerM: n("fabricPricePerM"), fabricWastePct: n("fabricWastePct"), make: n("make") || 0, trims: n("trims") || 0,
    decoration: n("decoration") || 0, packing: n("packing") || 0, testing: n("testing") || 0, overheadPct: n("overheadPct"), marginPct: n("marginPct"), quantity: n("quantity"),
  });
  return (
    <CalcCard
      id="cost-builder"
      title="FOB cost builder"
      intro="See how the parts of a garment cost add up to an FOB price per piece, from your own numbers. Useful for reading a quotation line by line."
      formula="fabric = per piece × (1 + waste) × price per m.  direct = fabric + make + trims + decoration + packing + testing.  FOB per piece = direct × (1 + overhead) × (1 + margin)."
      limits="Every figure is yours: this tool holds no price, rate or margin for any factory, and the result is arithmetic on your assumptions, not a quotation. Freight, duty and insurance are not part of an FOB price and are not included. Any currency."
      onReset={() => setV({})}
      result={
        c ? (
          <>
            {c.lines.map((l) => (
              <Line key={l.label} label={l.label} value={fmt(l.value, 3)} />
            ))}
            <Line label="FOB per piece" value={fmt(c.perPiece, 3)} strong />
            <Line label="Order total" value={fmt(c.total, 2)} strong />
            <Line label="Fabric as a share of price" value={`${fmt(c.fabricShare * 100, 1)}%`} />
          </>
        ) : (
          <Hint>Enter fabric per piece, fabric price and an order quantity. Blank percentages count as 0.</Hint>
        )
      }
    >
      {COST_FIELDS.map(([key, label, unit]) => (
        <NumField key={key} label={label} unit={unit} value={v[key] ?? ""} onChange={(x) => setV((p) => ({ ...p, [key]: x }))} />
      ))}
    </CalcCard>
  );
}

/* ------------------------------------- tolerance -------------------------------------- */

function Tolerance() {
  const [value, setValue] = useState("");
  const [tol, setTol] = useState("");
  const [mode, setMode] = useState<"percent" | "absolute">("percent");
  const [actual, setActual] = useState("");
  const range = toleranceRange(num(value), num(tol), mode);
  const dev = deviationPct(num(actual), num(value));
  const inside = range && Number.isFinite(num(actual)) ? num(actual) >= range.min && num(actual) <= range.max : null;
  return (
    <CalcCard
      id="tolerance"
      title="Tolerance checker"
      intro="The range a specification allows, and whether a measurement falls inside it. For GSM, garment measurements, shrinkage and weights."
      formula="percentage: range = value ± value × tolerance ÷ 100.  absolute: range = value ± tolerance.  deviation = (actual − specification) ÷ specification."
      limits="You set the tolerance: this tool does not know which is normal for your product, and the figure in a contract governs. Measure the same way every time."
      onReset={() => { setValue(""); setTol(""); setActual(""); setMode("percent"); }}
      result={
        range ? (
          <>
            <Line label="Lowest allowed" value={fmt(range.min, 3)} />
            <Line label="Highest allowed" value={fmt(range.max, 3)} />
            {dev !== null && <Line label="Deviation of the measurement" value={`${fmt(dev, 2)}%`} />}
            {inside !== null && <Line label="Measurement" value={inside ? "Within tolerance" : "Outside tolerance"} strong />}
          </>
        ) : (
          <Hint>Enter a specification and a tolerance greater than zero.</Hint>
        )
      }
    >
      <NumField label="Specification" value={value} onChange={setValue} hint="For example 200 (GSM) or 60 (cm)." />
      <NumField label="Tolerance" value={tol} onChange={setTol} />
      <SelectField label="Tolerance is in" value={mode} onChange={setMode} options={[{ value: "percent", label: "Per cent of the value" }, { value: "absolute", label: "The value's own unit" }]} />
      <NumField label="A measurement to check" value={actual} onChange={setActual} hint="Optional." />
    </CalcCard>
  );
}

/* -------------------------------------- decoration ------------------------------------- */

const FIT_LABEL = { suits: "Usually suits", consider: "Consider with care", avoid: "Usually unsuitable" } as const;

function Decoration() {
  const [fabric, setFabric] = useState<Fabric>("polycotton");
  const [dark, setDark] = useState<"light" | "dark">("light");
  const [size, setSize] = useState<LogoSize>("small");
  const [colours, setColours] = useState<Colours>("few");
  const [run, setRun] = useState<Run>("small");
  const advice = chooseDecoration({ fabric, dark: dark === "dark", size, colours, run });
  return (
    <CalcCard
      id="decoration"
      title="Decoration method chooser"
      intro="Which ways of putting a logo on a garment are usually worth asking about, and why. Preliminary guidance only."
      formula="Rules-based, not a calculation: each method is checked against the fabric, garment colour, logo size, number of colours and run length, using the general properties of each process."
      limits="Prices nothing and promises no wash life. It does not know any factory's equipment, and fabric, finish and artwork can change the answer. Whatever it suggests, ask for a strike-off or sew-out on your real fabric and wash it before approving."
      onReset={() => { setFabric("polycotton"); setDark("light"); setSize("small"); setColours("few"); setRun("small"); }}
      result={
        <ul className="space-y-4">
          {advice.map((a) => (
            <li key={a.method}>
              <p className="flex items-baseline justify-between gap-4">
                <span className="font-display font-bold text-ink">{a.method}</span>
                <span className="label text-ink/70">{FIT_LABEL[a.fit]}</span>
              </p>
              <ul className="mt-1 space-y-1 text-sm leading-relaxed text-ink/75">
                {a.reasons.map((r) => (
                  <li key={r}>{r}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      }
    >
      <SelectField label="Fabric" value={fabric} onChange={setFabric} options={[{ value: "cotton", label: "Cotton" }, { value: "polycotton", label: "Poly-cotton" }, { value: "polyester", label: "Polyester" }, { value: "stretch", label: "Stretch knit" }, { value: "fleece", label: "Fleece" }]} />
      <SelectField label="Garment colour" value={dark} onChange={setDark} options={[{ value: "light", label: "Light or white" }, { value: "dark", label: "Dark" }]} />
      <SelectField label="Logo size" value={size} onChange={setSize} options={[{ value: "small", label: "Small (chest logo)" }, { value: "medium", label: "Medium" }, { value: "large", label: "Large (front or back panel)" }]} />
      <SelectField label="Artwork" value={colours} onChange={setColours} options={[{ value: "few", label: "One or two flat colours" }, { value: "several", label: "Several flat colours" }, { value: "photo", label: "Photographic or gradient" }]} />
      <SelectField label="Run length" value={run} onChange={setRun} options={[{ value: "tiny", label: "Under 50 pieces" }, { value: "small", label: "50 to 500" }, { value: "large", label: "Over 500" }]} />
    </CalcCard>
  );
}

export function Calculators() {
  return (
    <div>
      <FabricWeight />
      <FabricPrice />
      <Consumption />
      <CostBuilder />
      <Cartons />
      <SizeRun />
      <Tolerance />
      <Decoration />
      <YarnCount />
      <UnitConverter />
    </div>
  );
}
