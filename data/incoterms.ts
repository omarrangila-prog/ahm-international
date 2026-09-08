/**
 * INCOTERMS® 2020 — WHO CARRIES WHAT
 * ==================================
 *
 * A description of the published ICC rules, not a statement of AHM's terms.
 * AHM quotes FOB Karachi; anything else is a commercial agreement, and the
 * component that renders this says so rather than letting the table imply a
 * service AHM has not offered.
 *
 * The reason this exists at all is the one thing buyers most often get wrong,
 * and it costs them money: under CFR and CIF the seller pays the freight, so
 * the cost line runs all the way to the destination port — but **risk still
 * passes when the goods are on board at origin**. A container lost mid-ocean on
 * CIF terms is the buyer's loss, claimed on a policy the seller bought. Cost
 * and risk are two different lines, and a single "who pays" table hides that,
 * which is why `riskPassesAfter` is modelled separately from `carriedBy`.
 *
 * DAP is deliberately non-contiguous: the seller carries the goods past the
 * destination terminal and on to the door, while import clearance and duty
 * remain the buyer's. Rendering it as one unbroken bar would be tidier and
 * wrong.
 *
 * Nothing here is a quotation, a duty rate, or a cost. Which party bears a step
 * is the rule; what it costs is a matter for the freight forwarder and the
 * buyer's own broker.
 */

export type Party = "seller" | "buyer";

/** One link in the chain from the factory floor to the buyer's door. */
export type ShipmentStep = {
  index: number;
  /** Short label, for the chart. */
  label: string;
  /** What actually happens, in a buyer's terms. */
  detail: string;
};

export const shipmentSteps: ShipmentStep[] = [
  { index: 1, label: "Export packing", detail: "Cartons, marking and shipping marks to the buyer's packing instruction." },
  { index: 2, label: "Loading at the factory", detail: "Goods loaded onto the collecting vehicle." },
  { index: 3, label: "Inland carriage", detail: "Road movement from the factory to the port of loading." },
  { index: 4, label: "Export clearance", detail: "Export declaration, licences and origin documentation." },
  { index: 5, label: "Terminal and loading", detail: "Origin terminal handling, and the goods placed on board." },
  { index: 6, label: "Sea freight", detail: "Main carriage from the port of loading to the port of discharge." },
  { index: 7, label: "Marine insurance", detail: "Cover for the goods while they are in transit." },
  { index: 8, label: "Destination terminal", detail: "Discharge and terminal handling at the port of arrival." },
  { index: 9, label: "Import clearance and duty", detail: "Import declaration, duty and any taxes payable on entry." },
  { index: 10, label: "Delivery to the door", detail: "Onward carriage from the port to the buyer's warehouse." },
];

export type Incoterm = {
  code: string;
  name: string;
  /** One line on what the term means for a buyer. */
  summary: string;
  /** Which party bears each step, indexed 1-10 to match `shipmentSteps`. */
  carriedBy: Record<number, Party>;
  /**
   * The last step for which the seller carries the risk of loss or damage.
   * Under CFR and CIF this is deliberately earlier than the last step the
   * seller pays for — that gap is the whole point of the chart.
   */
  riskPassesAfter: number;
  /** Where the named place goes in the contract, since the term alone is not enough. */
  namedPlace: string;
};

const allTo = (lastSellerStep: number, extraSeller: number[] = []): Record<number, Party> =>
  Object.fromEntries(
    shipmentSteps.map((s) => [
      s.index,
      s.index <= lastSellerStep || extraSeller.includes(s.index) ? "seller" : "buyer",
    ]),
  );

export const incoterms: Incoterm[] = [
  {
    code: "EXW",
    name: "Ex Works",
    summary:
      "The buyer collects from the factory and carries everything from the gate onwards, including export clearance.",
    carriedBy: allTo(1),
    riskPassesAfter: 1,
    namedPlace: "the seller's premises",
  },
  {
    code: "FCA",
    name: "Free Carrier",
    summary:
      "The seller clears the goods for export and hands them to the buyer's carrier. Main carriage is the buyer's from there.",
    carriedBy: allTo(4),
    riskPassesAfter: 4,
    namedPlace: "the place of delivery to the carrier",
  },
  {
    code: "FOB",
    name: "Free On Board",
    summary:
      "The seller delivers the goods on board at the port of loading. The buyer books and pays the main carriage.",
    carriedBy: allTo(5),
    riskPassesAfter: 5,
    namedPlace: "the port of loading",
  },
  {
    code: "CFR",
    name: "Cost and Freight",
    summary:
      "The seller pays the sea freight to the destination port — but risk still passes when the goods are on board at origin.",
    carriedBy: allTo(6),
    riskPassesAfter: 5,
    namedPlace: "the port of destination",
  },
  {
    code: "CIF",
    name: "Cost, Insurance and Freight",
    summary:
      "As CFR, and the seller buys insurance — at the minimum cover the rule requires. Risk still passes on board at origin.",
    carriedBy: allTo(7),
    riskPassesAfter: 5,
    namedPlace: "the port of destination",
  },
  {
    code: "DAP",
    name: "Delivered at Place",
    summary:
      "The seller carries the goods to the named place. Import clearance and duty stay with the buyer.",
    carriedBy: allTo(8, [10]),
    /*
     * Ten, not eight. The seller bears risk until the goods are delivered at
     * the named place, which is the door — the buyer's obligation at step 9 is
     * import clearance, a formality it performs while the goods are still at
     * the seller's risk. Modelled as an eight it made DAP look like CIF, with
     * the buyer owning a loss it does not own.
     */
    riskPassesAfter: 10,
    namedPlace: "the place of destination",
  },
  {
    code: "DDP",
    name: "Delivered Duty Paid",
    summary:
      "The seller carries everything to the buyer's door, import duty included. The heaviest obligation of the eleven rules.",
    carriedBy: allTo(10),
    riskPassesAfter: 10,
    namedPlace: "the place of destination",
  },
];

/** The term AHM actually quotes. Everything else on the chart is context. */
export const AHM_DEFAULT_TERM = "FOB";

export const INCOTERMS_NOTE =
  "Incoterms® is a trademark of the International Chamber of Commerce. This summarises the allocation of obligations under the 2020 rules; the rules themselves, and the named place, belong in your contract. It is not a quotation and carries no cost or duty figure.";
