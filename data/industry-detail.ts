import type { FaqItem } from "@/components/ui/Faq";

/**
 * INDUSTRY DETAIL
 * ===============
 *
 * The content that justifies an industry page existing at all.
 *
 * The SEO value of these pages is a by-product; the test each one has to pass is
 * whether a uniform program manager in that sector learns something. So every
 * entry is written from the specific pressure that environment puts on a garment
 * — a grocery apron and a corporate shirt fail in different ways, and the pages
 * say how.
 *
 * No claim here implies that any organisation in these sectors is a customer.
 */

export type IndustryDetail = {
  headline: string;
  /** Who wears the program. */
  roles: string[];
  /** The core argument for this sector, 2–3 paragraphs. */
  overview: string[];
  fabricGuidance: string;
  durability: string;
  comfort: string;
  decoration: string;
  sizing: string;
  replenishment: string;
  packing: string;
  /** Product category slugs most relevant to this sector. */
  relatedCategories: string[];
  faqs: FaqItem[];
  seoTitle: string;
  seoDescription: string;
};

export const industryDetail: Record<string, IndustryDetail> = {
  grocery: {
    headline: "Grocery uniform\nprograms.",
    roles: ["Checkout and front end", "Deli and bakery counters", "Produce and stocking", "Butchery and fish", "Store management"],
    overview: [
      "A grocery program is worn by more people, in more roles, in more locations than almost any other uniform category, and every one of those stores has to look like the same brand. That makes consistency across reorders the defining requirement, not any single garment feature.",
      "The second requirement is staining. Deli, bakery, produce and butchery generate different soils, and a program that looks acceptable on day one but greys after forty industrial washes creates a replacement cost nobody budgeted for.",
      "The practical consequence is that fabric and colour decisions matter far more than construction novelty. A well-chosen poly-cotton in an approved shade, produced consistently, outperforms a more interesting garment that drifts between deliveries.",
    ],
    fabricGuidance:
      "Poly-cotton twill for aprons, typically a 65/35 blend where a stain-release finish is required. Cotton or poly-cotton pique for polos, chosen for structure rather than softness. Polyester-rich blends hold colour better through high wash frequency; cotton-rich blends feel better but grey sooner.",
    durability:
      "Bar tacks at apron pocket mouths and strap attachments, which is where grocery aprons fail first. Stitch density and thread specified for industrial laundering rather than domestic washing.",
    comfort:
      "Weight matters more than it appears. A store worker is in the garment for a full shift, often moving between chilled and ambient areas. Breathable constructions and a fit that allows reaching and lifting reduce the number of staff who modify or abandon the garment.",
    decoration:
      "Embroidery for logos on polos and aprons where durability matters most. Screen print where a larger graphic or a departmental identifier is needed. Both approved on the bulk substrate, since apron twill and polo pique take decoration differently.",
    sizing:
      "Wide, inclusive size ranges with separate men's and women's blocks where the program requires them. Adjustable neck hardware on aprons reduces the number of sizes a store has to hold.",
    replenishment:
      "Grocery programs reorder continuously as staff turn over. That makes shade continuity across production lots the single most important quality attribute. A new starter should not be visibly wearing a different colour.",
    packing:
      "Usually solid-packed by size for distribution centre allocation, polybagged individually, with carton marking to the retailer's requirement. Ratio packs where stores order directly.",
    relatedCategories: ["aprons", "polos-tshirts", "woven-shirts", "fleece-sweatshirts"],
    faqs: [
      {
        question: "How do you keep colour consistent across repeat grocery orders?",
        answer:
          "Colour is approved once as a lab dip and retained as the standard. Incoming fabric is checked for shade against it, and cut panels are bundled by shade lot so a variation never reaches the sewing floor. Across reorders, the original approved standard remains the reference rather than the last delivery.",
      },
      {
        question: "Which garments usually make up a grocery program?",
        answer:
          "Most commonly bib and waist aprons, uniform polos, woven work shirts for some departments, and a fleece or sweatshirt layer for chilled areas. Developing them together keeps colour and decoration consistent across the whole program.",
      },
      {
        question: "Can a program mix department colours?",
        answer:
          "Yes: departmental colour coding is common. Where multiple shades run in one program, each is approved as its own lab dip and the whole set is confirmed together so they read as a family.",
      },
    ],
    seoTitle: "Grocery Uniform Manufacturing",
    seoDescription:
      "Stain-managed aprons, uniform polos and work shirts developed for high wash frequency and shade consistency across reorders.",
  },

  hospitality: {
    headline: "Hospitality uniform\nprograms.",
    roles: ["Front of house and service", "Bar and beverage", "Housekeeping", "Concierge and reception", "Events and banqueting"],
    overview: [
      "Hospitality uniforms are judged the way the venue is judged, by how they look at the end of a shift, not the start. Presentation held over eight hours is the requirement, and it is largely a fabric and finishing question rather than a construction one.",
      "Hospitality programs also mix article types more than most: a waist apron, a woven shirt, a knit polo and a tie may all need to read as the same colour despite being made from four different fabrics.",
      "That cross-article colour matching is the part that most often goes wrong, and it is decided at development rather than at inspection.",
    ],
    fabricGuidance:
      "Poly-cotton poplin and twill for service shirting, chosen for crease recovery. Poly-cotton twill for aprons. Pique for polos where a more relaxed service look is wanted. Polyester-rich blends hold press better through a shift.",
    durability:
      "Reinforcement at apron strap and pocket points, and secure closures on shirting. Hospitality laundering is frequent and often industrial, so shrinkage control matters as much as abrasion resistance.",
    comfort:
      "Breathability in warm service environments, and a cut that allows carrying and reaching. Where staff move between kitchen heat and air-conditioned dining, the layer weight has to work in both.",
    decoration:
      "Usually restrained: embroidered logos on chest or apron bib, woven badges, or a tonal mark. Placement is specified per article so the logo sits identically whether the garment is a shirt, a polo or an apron.",
    sizing:
      "Separate men's and women's blocks are common in front of house, where fit is part of presentation. Adjustable apron hardware widens the fit range without adding sizes.",
    replenishment:
      "High staff turnover means frequent partial reorders. Programs are specified so a small repeat can be produced to the same standard as the original run.",
    packing:
      "Folded with collar support for shirting, or hung where presentation matters on arrival. Polybagged individually, cartoned to the venue's or group's packing instruction.",
    relatedCategories: ["aprons", "woven-shirts", "polos-tshirts", "bottoms"],
    faqs: [
      {
        question: "How do you match colour across shirts, aprons and polos?",
        answer:
          "By approving them against each other, not separately against the standard. Woven and knit fabrics take dye differently, so a program mixing both is cross-approved at lab dip stage. Otherwise the polo and the shirt read as two different colours under venue lighting.",
      },
      {
        question: "Can you produce different uniforms for different roles in one program?",
        answer:
          "Yes, and it is usually more efficient to develop them together. Shared fabric and a single colour approval across bar, service and housekeeping articles keeps the whole program consistent and simplifies reordering.",
      },
      {
        question: "What keeps a service shirt looking pressed through a shift?",
        answer:
          "Fabric choice and finishing more than construction. A polyester-rich poplin with an easy-care finish holds its press considerably longer than a cotton-rich equivalent, at the cost of some breathability, which is the trade-off worth deciding deliberately.",
      },
    ],
    seoTitle: "Hospitality Uniform Manufacturing",
    seoDescription:
      "Service shirting, waist aprons, uniform polos and bottoms developed to hold presentation across a full shift.",
  },

  "food-service": {
    headline: "Food service and\nkitchen uniforms.",
    roles: ["Kitchen and line cooks", "Head chefs", "Prep and dish", "Counter service", "Catering teams"],
    overview: [
      "Kitchen garments face heat, grease, frequent industrial laundering and, in many operations, bleach. That combination degrades fabric faster than any other uniform environment, and it makes fabric selection the dominant decision.",
      "Chef wear also carries safety requirements that ordinary uniforms do not: coverage, closure type and the ability to remove a garment quickly all matter on a hot line.",
      "The commercial consequence is that cost per wear, not unit price, is the right measure. A cheaper coat that greys and thins in six months costs more than a heavier one that lasts two years.",
    ],
    fabricGuidance:
      "Poly-cotton blends for chef coats, weighted for durability against laundering rather than for softness. Poly-cotton twill for aprons, with stain-release finishing where the operation justifies it. Whiteness retention through industrial washing is a specific fabric property worth confirming by testing.",
    durability:
      "Reinforcement at closures, pocket mouths and apron strap attachments. Stitch and thread specified for high-temperature industrial laundering, which degrades thread faster than domestic washing.",
    comfort:
      "Ventilation matters more here than anywhere else in uniform. Vented backs and underarms, and constructions that allow heat to escape, materially affect whether kitchen staff keep the garment on and buttoned.",
    decoration:
      "Embroidery on chef coats and aprons, usually restrained and positioned to survive laundering. Heat transfer is generally a poor fit for kitchen laundering cycles and is worth avoiding unless tested.",
    sizing:
      "Inclusive ranges with generous movement allowance. Chef coats in particular need room across the back and shoulder without becoming loose at the front.",
    replenishment:
      "Kitchen garments are replaced on condition rather than on a schedule, so programs need to support frequent small reorders to the same standard.",
    packing:
      "Folded and polybagged, solid-packed by size for kitchen allocation. Carton marking to the operator's requirement.",
    relatedCategories: ["aprons", "uniform-workwear", "polos-tshirts", "bottoms"],
    faqs: [
      {
        question: "What fabric weight suits a chef coat?",
        answer:
          "It depends on the laundering method and how hot the kitchen runs. Heavier poly-cotton survives industrial washing longer and holds whiteness better; lighter constructions are more comfortable on a hot line but wear out faster. The right answer follows the actual wash cycle, so it is worth telling us what that is.",
      },
      {
        question: "Do stain-release finishes survive kitchen laundering?",
        answer:
          "Their durability varies by finish and by wash cycle, which is why we confirm it by testing against the program's actual laundering rather than treating it as permanent. A finish that performs well domestically may not survive high-temperature industrial washing.",
      },
      {
        question: "Can you produce vented chef coats?",
        answer:
          "Yes. Back and underarm venting, mesh panels and closure type are all specified during development. In hot kitchens ventilation is the feature staff notice most.",
      },
    ],
    seoTitle: "Chef Wear & Food Service Uniforms",
    seoDescription:
      "Chef coats, kitchen aprons and food service uniforms developed for heat, grease and industrial laundering. Supplied FOB.",
  },

  retail: {
    headline: "Retail uniform\nprograms.",
    roles: ["Shop floor and sales", "Fitting room and service", "Stockroom", "Store management", "Seasonal and events staff"],
    overview: [
      "Retail uniforms are brand assets. Colour accuracy and decoration quality are judged against the brand standard by people who look at that standard every day, which sets a higher bar than most uniform environments.",
      "Retail programs also refresh more often than industrial ones. Seasonal changes, campaigns and rebrands mean the same supplier may run several variants a year.",
      "That makes development speed and colour repeatability more valuable than maximum durability. The garment needs to look right and be reproducible, not last a decade.",
    ],
    fabricGuidance:
      "Pique and jersey for knit programs, poplin and oxford for woven. Where the brand colour is distinctive, fabric choice is partly a dyeing question. Some shades are considerably harder to hold consistently on some constructions.",
    durability:
      "Moderate by uniform standards, but appearance retention matters: pilling, colour fade and collar deformation are more damaging to a retail program than seam failure.",
    comfort:
      "Staff are on the floor for full shifts and often interacting with customers, so hand feel and fit have a direct effect on how the uniform is worn and how it presents.",
    decoration:
      "Brand-accurate above all. Embroidery for durability, screen print or transfer for larger graphics, with colour matched to the brand standard and approved on the bulk substrate before production.",
    sizing:
      "Inclusive ranges, and separate men's and women's blocks where fit is part of the brand presentation. Size sets are approved before bulk.",
    replenishment:
      "Frequent partial reorders across a store estate, plus seasonal variants. Programs are specified so a repeat matches the original rather than the previous repeat.",
    packing:
      "Ratio-packed for store allocation or solid-packed for a distribution centre, individually polybagged, with retailer-specific labelling and carton marking where required.",
    relatedCategories: ["polos-tshirts", "woven-shirts", "fleece-sweatshirts", "aprons"],
    faqs: [
      {
        question: "How closely can you match a brand colour?",
        answer:
          "Colour is approved as a lab dip against your physical or numeric standard before bulk fabric is committed. Some shades are harder to hold on some constructions than others, where that is the case we say so during development rather than after the first delivery.",
      },
      {
        question: "Can you handle seasonal variants of the same program?",
        answer:
          "Yes. Once the base article is developed and the block is approved, seasonal colour and decoration variants are considerably faster to produce than a new development.",
      },
      {
        question: "Do you supply retailer-specific labelling and packing?",
        answer:
          "Yes, worked to the requirement you supply. Retailer packing specifications often affect carton sizing and therefore freight cost, so they are worth sharing at development rather than at packing.",
      },
    ],
    seoTitle: "Retail Uniform Manufacturing",
    seoDescription:
      "Uniform polos, woven shirts and knitwear produced to your brand colour and decoration standards. Made in Karachi, supplied FOB.",
  },

  facilities: {
    headline: "Facilities management\nworkwear.",
    roles: ["Cleaning and janitorial", "Maintenance and engineering", "Grounds and external", "Security", "Site supervision"],
    overview: [
      "Facilities teams work across indoor and outdoor conditions in the same shift, often on multiple client sites, and are frequently the only visible representation of their employer on a customer's premises.",
      "That produces two competing requirements: the program must be hard-wearing enough for physical work and presentable enough for a client-facing environment.",
      "Layering is usually the answer. A durable base garment with a jacket or fleece that carries the identification, so the presentable layer is the one that gets replaced when it wears.",
    ],
    fabricGuidance:
      "Poly-cotton twill and canvas for shirts and trousers. Polar fleece or softshell for the outer layer. Where the work moves outdoors, a water-repellent finish is worth specifying on the outer layer only rather than throughout.",
    durability:
      "Reinforcement at knees, pocket mouths and seat. Bar tacks at stress points and a gusset where the work involves climbing or kneeling.",
    comfort:
      "Movement range and temperature regulation across indoor and outdoor work. Stretch woven fabrics are worth considering where the work is physically active.",
    decoration:
      "Embroidery or applied patches for company identification, plus reflective tape where the work involves vehicles or low light. Identification usually goes on the outer layer so it stays visible.",
    sizing:
      "Inclusive ranges with generous movement allowance, and part-elasticated waistbands to widen fit across a mixed workforce.",
    replenishment:
      "Programs are replaced by condition, with the outer layer usually turning over faster than the base. Specifying them as one program keeps the identification consistent.",
    packing:
      "Folded and polybagged, solid-packed by size, cartoned and marked to the employer's or contractor's instruction.",
    relatedCategories: ["uniform-workwear", "bottoms", "outerwear", "fleece-sweatshirts"],
    faqs: [
      {
        question: "How should a facilities program handle indoor and outdoor work?",
        answer:
          "By layering. A base shirt and trouser specified for durability, plus a fleece or softshell that carries the identification. That way the outer layer is what gets replaced as it wears, and the identification stays consistent.",
      },
      {
        question: "Can you add reflective tape to facilities workwear?",
        answer:
          "Yes, to the configuration you specify. Where a program has to conform to a visibility standard, that standard must be nominated by the buyer and confirmed through approved testing. We do not claim conformity we cannot evidence.",
      },
      {
        question: "Where do facilities trousers usually fail?",
        answer:
          "At the knee, the pocket mouth and the crotch seam. Reinforcement at those three points extends service life more effectively than raising the fabric weight across the whole garment.",
      },
    ],
    seoTitle: "Facilities Management Workwear",
    seoDescription:
      "Durable work shirts, trousers, fleece and outerwear developed for mixed indoor and outdoor facilities work.",
  },

  industrial: {
    headline: "Industrial\nworkwear.",
    roles: ["Production and assembly", "Warehouse and logistics", "Maintenance and engineering", "Yard and external operations", "Supervision"],
    overview: [
      "Industrial workwear is specified against a hazard and a wear pattern rather than against an aesthetic. Abrasion, snagging, heat and visibility requirements vary by site, and the program has to be built for the specific one.",
      "Visibility requirements in particular are governed by standards that vary by market, and conformity is a testing question rather than a manufacturing claim.",
      "The most useful thing a buyer can supply here is the standard the program has to meet, plus a worn-out example of the garment being replaced. The failure points on that garment say more than a specification usually does.",
    ],
    fabricGuidance:
      "Heavier poly-cotton twill, canvas and ripstop for shells. Where visibility is required, fluorescent base fabric and reflective tape to the nominated standard. Stretch woven where the work is physically demanding.",
    durability:
      "The primary requirement. Double-layer or reinforced knees, gussets, bar tacks, heavier thread and higher stitch density at stress points, specified against the actual wear pattern.",
    comfort:
      "Heavier fabrics reduce movement, so panelling and gussets matter more as weight increases. Breathability declines with density, which is a trade-off worth making deliberately rather than by default.",
    decoration:
      "Applied patches and embroidery for identification, reflective tape to the specified configuration. Decoration placement has to avoid interfering with reflective tape coverage.",
    sizing:
      "Inclusive ranges with allowance for base layers underneath in colder sites. Part-elasticated waistbands widen fit across a mixed workforce.",
    replenishment:
      "Replaced on condition, often frequently. Consistency across reorders keeps a site's workforce looking uniform even as garments are replaced individually.",
    packing:
      "Solid-packed by size, polybagged, cartoned and marked to the site or contractor requirement.",
    relatedCategories: ["uniform-workwear", "bottoms", "outerwear", "woven-shirts"],
    faqs: [
      {
        question: "Can you produce certified hi-vis workwear?",
        answer:
          "We produce garments with fluorescent fabric and reflective tape to the configuration a buyer specifies. Conformity to a visibility standard depends on the fabric, the tape and approved testing, and must be nominated and confirmed by the buyer. We do not state conformity we cannot evidence.",
      },
      {
        question: "What is the most useful thing to send with an industrial RFQ?",
        answer:
          "A worn-out example of the garment being replaced. Where it failed tells us more about the real requirement than a specification usually does, and it lets us target reinforcement where it will actually extend service life.",
      },
      {
        question: "How heavy should industrial fabric be?",
        answer:
          "Heavy enough for the wear pattern and no heavier. Weight beyond what the hazard requires reduces movement, reduces breathability and raises freight cost without extending useful life.",
      },
    ],
    seoTitle: "Industrial Workwear Manufacturing",
    seoDescription:
      "Reinforced work shirts, trousers, jackets and hi-vis garments developed against your site's actual wear pattern.",
  },

  corporate: {
    headline: "Corporate uniform\nprograms.",
    roles: ["Reception and front desk", "Client-facing and sales", "Branch and office teams", "Transport and driver-facing roles", "Management"],
    overview: [
      "Corporate uniforms are worn by people who did not ask to wear a uniform. Fit and comfort therefore determine adoption more than any other factor. A program staff dislike is quietly abandoned regardless of how it looks on the specification.",
      "Presentation must also hold across a very wide range of body types, which makes inclusive sizing and separate blocks a functional requirement rather than a courtesy.",
      "Programs typically mix woven shirting, knitwear and a soft outer layer, all needing to read as one colour family.",
    ],
    fabricGuidance:
      "Poly-cotton poplin and oxford for shirting with easy-care finishing. Pique for polos. Softshell or bonded knit for the outer layer. Crease recovery matters more than weight in most corporate settings.",
    durability:
      "Moderate. Collar and cuff construction, fusing quality and colour retention matter more than abrasion resistance. A corporate shirt fails by looking tired, not by tearing.",
    comfort:
      "The deciding factor for adoption. Breathable constructions, stretch where movement is involved, and a fit that is neither restrictive nor shapeless.",
    decoration:
      "Restrained: embroidered logo on chest or cuff, woven badges, or a tonal mark. Placement specified per article so it sits identically across the program.",
    sizing:
      "Inclusive ranges and separate men's and women's blocks, developed as separate patterns rather than graded from one another. Size sets approved before bulk.",
    replenishment:
      "Steady low-volume reorders as staff join. Shade continuity across lots keeps a new starter from standing out.",
    packing:
      "Folded with collar support or hung, individually polybagged, packed by name or by size to the employer's instruction.",
    relatedCategories: ["woven-shirts", "polos-tshirts", "outerwear", "fleece-sweatshirts"],
    faqs: [
      {
        question: "Why develop separate men's and women's blocks?",
        answer:
          "Because a shirt scaled from one block rather than re-blocked fits poorly across the chest and shoulder. In corporate programs, where fit drives whether staff actually wear the uniform, that difference decides adoption.",
      },
      {
        question: "What makes a corporate shirt look tired quickly?",
        answer:
          "Poor fusing that bubbles after washing, collar deformation, and colour fade. All three are fabric and construction decisions made at development, and none of them show up in the first sample. They show up in the field.",
      },
      {
        question: "Can knitwear and shirting match in the same program?",
        answer:
          "Yes, with cross-approval at lab dip stage. Woven and knit fabrics take dye differently, so they are approved against each other rather than separately against the standard.",
      },
    ],
    seoTitle: "Corporate Uniform Manufacturing",
    seoDescription:
      "Easy-care shirting, uniform polos and soft outer layers with inclusive sizing and restrained branding.",
  },

  events: {
    headline: "Event and\ncampaign apparel.",
    roles: ["Event and venue staff", "Brand ambassadors", "Volunteers and crew", "Hospitality and catering teams", "Security and marshals"],
    overview: [
      "Event apparel is defined by a fixed date. The garment has to be brand-accurate and delivered before the event, and no amount of quality compensates for arriving after it.",
      "That changes the development priority: simplicity and fabric availability matter more than construction sophistication, because both are what protect the date.",
      "Volumes are often large but single-run, so decisions that would be amortised across a long program (bespoke fabric development, complex trims) are usually the wrong trade here.",
    ],
    fabricGuidance:
      "Single jersey and pique for tees and polos, standard fleece for layers. Widely available constructions in achievable colours protect the schedule; a bespoke fabric development does the opposite.",
    durability:
      "Lower requirement than a wear-daily program. Appearance on the day and through a handful of washes is usually the realistic standard, and over-specifying durability adds cost without benefit.",
    comfort:
      "Long shifts, often outdoors and standing. Breathability and weight are worth more than premium hand feel.",
    decoration:
      "Usually the point of the garment. Screen print for large graphics and volume, embroidery where a more permanent look is wanted, with colour matched to the brand standard and approved before production.",
    sizing:
      "Broad unisex ranges keep allocation simple where staff sizes are not known in advance. Where they are, ratio packing by size is more efficient.",
    replenishment:
      "Typically none: a single run against a date. Which is exactly why the specification should be locked early.",
    packing:
      "Ratio-packed by size for on-site distribution, or solid-packed where the client allocates centrally. Carton marking to the event or venue requirement.",
    relatedCategories: ["polos-tshirts", "fleece-sweatshirts", "uniform-workwear", "outerwear"],
    faqs: [
      {
        question: "What protects an event delivery date?",
        answer:
          "Locking the specification early, choosing a fabric that is available rather than one that has to be developed, and keeping decoration to routes that do not need extended approval. Most missed event dates are caused by late specification changes, not by production.",
      },
      {
        question: "Is it worth specifying a durable fabric for a one-off event?",
        answer:
          "Usually not. Event apparel is typically worn a handful of times, so specifying for multi-year durability adds cost and weight, and weight adds freight, without any benefit the client will see.",
      },
      {
        question: "Can you produce large single-run volumes?",
        answer:
          "Feasibility against a fixed date depends on the article, the fabric and the decoration. We confirm it against your specification and schedule during commercial discussion rather than publishing a capacity figure.",
      },
    ],
    seoTitle: "Event Staff Uniform Manufacturing",
    seoDescription:
      "Printed tees, polos and layers produced to a fixed date and brand standard for event and campaign teams.",
  },
};

export function getIndustryDetail(slug: string) {
  return industryDetail[slug];
}
