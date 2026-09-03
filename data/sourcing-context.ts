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
 * What AHM does not claim.
 *
 * Written down because the claims below are the standard list on supplier
 * profiles from this region, and their absence here is deliberate rather than
 * an omission. A buyer who has read three other sites will be looking for them;
 * saying plainly that AHM cannot evidence them is more useful than silence, and
 * far more useful than repeating them.
 */
export const notClaimed: { claim: string; position: string }[] = [
  {
    claim: "Vertical integration from fibre to finished garment",
    position:
      "AHM manufactures and exports garments. It does not spin, weave or own the mills, and does not present a supply chain it does not control.",
  },
  {
    claim: "Environmental or social certification",
    position:
      "No certification is shown anywhere on this site, because none has been evidenced to us. A logo without a certificate number and an expiry date is decoration.",
  },
  {
    claim: "Production capacity and headcount",
    position:
      "Published as \"available on request\" rather than as a round number. Capacity quoted without a reference period and an article type is not a figure a buyer can plan against.",
  },
  {
    claim: "A list of buyers or brands served",
    position:
      "Buyer relationships are confidential and no customer is named. The one published case study is anonymised.",
  },
];
