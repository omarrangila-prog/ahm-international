/**
 * COUNTRY-LEVEL SOURCING CONTEXT
 * ==============================
 *
 * Facts about Pakistan as an origin, each carrying its source. These are not
 * AHM claims and must never be written as if they were: a trade preference
 * belongs to the country, and a buyer's duty position depends on their own
 * classification and origin documentation, not on who made the garment.
 *
 * The bar for entry here is a primary source, and it has already excluded more
 * than it admitted. A cotton production ranking was researched and dropped:
 * secondary sources disagreed by more than half — 10.2 million bales one year
 * against 4.8 million the next — and the USDA report behind them could not be
 * read. A number that moves that much is not a fact about a sourcing origin,
 * it is a fact about one harvest, and publishing it as the former is the kind
 * of thing this site exists not to do.
 *
 * `checkedOn` is the date the source was last read. Trade preferences are
 * reviewed and can be suspended, so a fact of this kind without a date is a
 * fact with an unknown expiry.
 */

export type SourcedFact = {
  id: string;
  claim: string;
  /** Why it matters to someone scoping a program, in commercial terms. */
  relevance: string;
  source: { label: string; url: string };
  checkedOn: string;
};

export const sourcingContext: SourcedFact[] = [
  {
    id: "gsp-plus",
    claim:
      "Pakistan is a GSP+ beneficiary under the EU's Generalised Scheme of Preferences, which reduces tariffs to zero on covered tariff lines.",
    relevance:
      "For a buyer importing into the EU, origin affects landed cost independently of FOB price. Two quotations at the same FOB are not the same delivered cost. Confirm your own classification and origin documentation with your customs broker — the preference belongs to the origin, not to the supplier.",
    source: {
      label: "European Commission — Generalised Scheme of Preferences",
      url: "https://policy.trade.ec.europa.eu/development-and-sustainability/generalised-scheme-preferences_en",
    },
    checkedOn: "2026-09-03",
  },
];

/**
 * The four standard claims, answered.
 *
 * The usual list on supplier profiles from this region. A buyer who has read
 * three other sites will be looking for them, so each gets AHM's position and
 * what the buyer can ask for, stated as an answer rather than a disclaimer.
 * Nothing here may assert more than data/company.ts verifies.
 */
export const notClaimed: { claim: string; position: string }[] = [
  {
    claim: "Vertical integration",
    position:
      "AHM's work is garment manufacturing and export, in its own operations and at partner factories. It does not spin or weave: fabric comes from mills, chosen for each program.",
  },
  {
    claim: "Certification",
    position:
      "A certificate is shown with its number and expiry or not at all, and none is displayed today. If your program requires a specific audit or certificate, name it in the RFQ and get a direct answer before sampling.",
  },
  {
    claim: "Capacity and headcount",
    position:
      "Confirmed against your article, quantity and delivery window, with the reference period stated, rather than printed as a round number that cannot be planned against.",
  },
  {
    claim: "Buyers served",
    position:
      "Buyer relationships stay confidential, so no customer is named and the documented case study is anonymised. Your program is treated the same way.",
  },
];
