/**
 * SOURCING GLOSSARY
 * =================
 *
 * Master spec §7 and §39. Reference content, written for the person on the buying
 * side who has to use these terms correctly in a specification.
 *
 * Definitions are of *industry terms*, not of AHM's services, so nothing here
 * requires verification against AHM's operations. Where a term is commonly used
 * loosely, the entry says so — that is the part a buyer cannot get from a
 * dictionary, and it is what stops a specification meaning two things.
 */

export type GlossaryTerm = {
  term: string;
  /** Grouping for the index. */
  group: "Specification" | "Materials" | "Sampling" | "Quality" | "Commercial" | "Export";
  definition: string;
  /** The distinction people get wrong. Optional, and only where one exists. */
  confusedWith?: string;
  seeAlso?: string[];
};

export const glossary: GlossaryTerm[] = [
  { term: "Tech Pack", group: "Specification",
    definition: "The complete specification for a garment: technical sketch, bill of materials, measurement chart with tolerances, construction detail, artwork placement and packing instruction.",
    confusedWith: "A sketch or a reference photo. Those are inputs to a tech pack, not a tech pack — neither states a tolerance, and tolerance is what a factory is held to.",
    seeAlso: ["Bill of Materials", "Points of Measure", "Tolerance"] },
  { term: "Bill of Materials", group: "Specification",
    definition: "The itemised list of every fabric, trim, thread, label and packaging component in a garment, with placement and consumption.",
    seeAlso: ["Tech Pack", "Trim Card"] },
  { term: "Points of Measure", group: "Specification",
    definition: "The named locations on a garment where it is measured — chest, body length, sleeve length and so on — each with a specified value per size.",
    seeAlso: ["Grading", "Tolerance"] },
  { term: "Tolerance", group: "Specification",
    definition: "The permitted variance either side of a specified measurement. A garment measuring within tolerance is correct, not lucky.",
    confusedWith: "Being treated as slack. A tolerance is a limit that has been agreed, so a consistent bias to one edge of it is a process problem even though nothing has technically failed.",
    seeAlso: ["Points of Measure"] },
  { term: "Grading", group: "Specification",
    definition: "The rules by which a base-size pattern is scaled up and down a size range.",
    confusedWith: "Scaling a garment uniformly. Body measurements do not grow evenly, so a correctly graded range changes some points more than others.",
    seeAlso: ["Points of Measure", "Block"] },
  { term: "Block", group: "Specification",
    definition: "The foundation pattern a style is developed from, carrying the fit intent before styling is added.",
    confusedWith: "A men's block scaled down for women. A women's block is a different pattern, not a smaller one." },

  { term: "GSM", group: "Materials",
    definition: "Grams per square metre. The standard weight measure for knitted fabric, and increasingly for woven.",
    confusedWith: "Quality. A heavier fabric is not a better one — it is a heavier one. Weight is chosen against use, laundering and climate.",
    seeAlso: ["Ounce Weight"] },
  { term: "Ounce Weight", group: "Materials",
    definition: "Weight per square yard, used mainly for denim and canvas. Roughly 34 gsm per ounce.",
    seeAlso: ["GSM"] },
  { term: "Pique", group: "Materials",
    definition: "A weft knit with a raised, textured surface, the standard construction for uniform polo shirts because it holds shape through repeated laundering.",
    confusedWith: "Jersey, which is smooth-faced, lighter and drapes rather than holds structure.",
    seeAlso: ["Jersey", "Interlock"] },
  { term: "Jersey", group: "Materials",
    definition: "A plain weft knit with a smooth face and looped reverse. Light, fluid, the standard t-shirt construction.",
    seeAlso: ["Pique", "Interlock"] },
  { term: "Interlock", group: "Materials",
    definition: "A double knit that is identical on both faces, more stable and heavier than single jersey.",
    seeAlso: ["Jersey"] },
  { term: "CVC", group: "Materials",
    definition: "Chief Value Cotton — a cotton-rich blend, typically 60/40 cotton to polyester.",
    confusedWith: "Poly-cotton generally. CVC specifically means cotton is the majority by value.",
    seeAlso: ["Poly-Cotton"] },
  { term: "Poly-Cotton", group: "Materials",
    definition: "A polyester and cotton blend. 65/35 polyester-cotton is the workwear standard because it resists shrinkage and holds colour through industrial laundering.",
    seeAlso: ["CVC", "GSM"] },
  { term: "Lab Dip", group: "Materials",
    definition: "A small dyed swatch submitted for colour approval before bulk dyeing.",
    confusedWith: "A strike-off, which approves printed artwork rather than dyed colour.",
    seeAlso: ["Strike-Off"] },
  { term: "Sanforisation", group: "Materials",
    definition: "A mechanical pre-shrinking treatment applied to woven fabric so the finished garment shrinks predictably.",
    seeAlso: ["Shrinkage"] },

  { term: "Strike-Off", group: "Sampling",
    definition: "A test print of artwork on the actual fabric, approved before bulk decoration.",
    seeAlso: ["Sew-Out", "Lab Dip"] },
  { term: "Sew-Out", group: "Sampling",
    definition: "A test embroidery run on the actual fabric, approved before bulk.",
    seeAlso: ["Strike-Off"] },
  { term: "Fit Sample", group: "Sampling",
    definition: "A sample made to assess fit and measurement, usually in available fabric rather than bulk.",
    seeAlso: ["PP Sample", "Sealed Sample"] },
  { term: "PP Sample", group: "Sampling",
    definition: "Pre-production sample. Made on bulk fabric and trims, on the production line, and approved before cutting begins.",
    confusedWith: "A fit sample. A PP sample proves the bulk materials and the line, not just the pattern.",
    seeAlso: ["Fit Sample", "Sealed Sample"] },
  { term: "Sealed Sample", group: "Sampling",
    definition: "The approved sample both sides sign and retain. It is the reference the bulk is judged against.",
    seeAlso: ["PP Sample"] },

  { term: "AQL", group: "Quality",
    definition: "Acceptable Quality Limit. A statistical sampling standard defining how many defects in an inspected sample allow a lot to be accepted.",
    confusedWith: "A promise of zero defects. AQL defines an accepted level of defect, which is why the level itself is a commercial decision.",
    seeAlso: ["Inline Inspection", "Final Inspection"] },
  { term: "Inline Inspection", group: "Quality",
    definition: "Checks carried out during assembly, so a fault is caught at the operation that caused it.",
    confusedWith: "Final inspection, which happens after everything is made and can only reject, not correct.",
    seeAlso: ["Final Inspection"] },
  { term: "Final Inspection", group: "Quality",
    definition: "Inspection of finished, packed goods against the sealed sample and the agreed acceptance standard.",
    seeAlso: ["AQL", "Inline Inspection"] },
  { term: "CAPA", group: "Quality",
    definition: "Corrective and Preventive Action. The record of what went wrong, why, what was fixed, and what stops it recurring.",
    confusedWith: "A corrective action alone. Without the preventive half, the same defect returns on the next order." },
  { term: "Shrinkage", group: "Quality",
    definition: "Dimensional change after laundering, tested at development and specified as a permitted percentage.",
    seeAlso: ["Sanforisation", "Tolerance"] },

  { term: "FOB", group: "Commercial",
    definition: "Free On Board. The seller delivers the goods onto the vessel at the named port of loading; risk and cost transfer to the buyer at that point.",
    confusedWith: "A price that includes freight. It does not — the buyer arranges and pays for carriage from the port onward.",
    seeAlso: ["CIF", "Incoterms"] },
  { term: "CIF", group: "Commercial",
    definition: "Cost, Insurance and Freight. The seller pays carriage and insurance to the named destination port.",
    confusedWith: "FOB. A CIF figure is always higher than the FOB figure for the same goods, because it contains freight.",
    seeAlso: ["FOB"] },
  { term: "Incoterms", group: "Commercial",
    definition: "The standard international trade terms defining where cost and risk pass between seller and buyer.",
    seeAlso: ["FOB", "CIF"] },
  { term: "MOQ", group: "Commercial",
    definition: "Minimum Order Quantity. Usually driven by fabric mill minimums rather than by sewing capacity.",
    confusedWith: "An arbitrary factory rule. Where a minimum is fabric-driven, changing the fabric changes the minimum." },
  { term: "Landed Cost", group: "Commercial",
    definition: "The total cost of a garment delivered to the buyer's warehouse: FOB price plus freight, duty, insurance and handling.",
    confusedWith: "FOB price, which is only the first component. Two FOB prices from different countries are not comparable until duty is applied.",
    seeAlso: ["FOB"] },

  { term: "Carton Marking", group: "Export",
    definition: "The printed marks on a shipping carton identifying contents, quantity, style, destination and carton number.",
    seeAlso: ["Packing List"] },
  { term: "Packing List", group: "Export",
    definition: "The document stating what is in each carton, with quantities, sizes, colours and weights.",
    seeAlso: ["Carton Marking"] },
  { term: "Solid Pack", group: "Export",
    definition: "A carton containing one size and one colour.",
    confusedWith: "Ratio pack, which contains a pre-set size run in one carton. Which one you need depends on how the goods are distributed at the other end." },
  { term: "Ratio Pack", group: "Export",
    definition: "A carton packed to a fixed size ratio, so each carton is a ready distribution unit.",
    seeAlso: ["Solid Pack"] },
];

export const glossaryGroups = [...new Set(glossary.map((g) => g.group))];
