import { m, q, s, t, type ProductItem } from "./item-helpers";

/**
 * Item pages for the second round of families added on 10 November 2026:
 * kitchen textiles, coveralls, knitwear, sportswear, sleepwear, towels and
 * bathrobes, and padded jackets. See data/items.ts for the rules. Protective
 * and children's claims name the standard to qualify rather than claiming it.
 */
export const itemsRange: ProductItem[] = [
  /* -------------------------- Chef Trousers & Kitchen Textiles -------------------------- */
  {
    slug: "chef-trouser",
    family: "kitchen-textiles",
    names: ["Chef Trouser"],
    title: "Chef Trouser",
    intro:
      "A trouser for a hot, crowded kitchen: a waist that adjusts through a shift, a cut that lets the cook crouch at the oven, and a fabric that comes back from the laundry the same colour.",
    summary:
      "A chef trouser is specified by its waistband (elastic, drawcord or both), cut (traditional baggy, straight or slim), pockets, fabric and weight, and colour, including the classic black-and-white check. It is laundered as hard as the chef coat, so the two are chosen for the same wash.",
    features: [
      t("Adjustable waist", "Fully elasticated with an inner drawcord, or a flat front with elastic at the back."),
      t("Cut", "Traditional baggy for airflow, straight, or a slim modern fit."),
      t("Pockets", "Side pockets and a back pocket; a cargo or thermometer pocket on some styles."),
      t("Check or plain", "Classic small check, yarn-dyed or printed, or plain black, navy or grey."),
    ],
    measurements: [
      m("Waist relaxed and stretched", "Across the waistband, doubled, relaxed and fully stretched."),
      m("Hip", "At the widest point, doubled."),
      m("Front rise", "From the crotch seam to the top of the waistband."),
      m("Inseam", "From the crotch seam to the hem."),
      m("Leg opening", "Across the hem, doubled."),
    ],
    specification: [
      s("Fabric options", "Poly-cotton twill, cotton drill, stretch blends"),
      s("Typical weight", "170-240 gsm"),
      s("Waistband", "Elastic with drawcord, or flat front with elastic back"),
      s("Pattern", "Plain or check, yarn-dyed or printed"),
    ],
    logoPositions: ["Left front hip", "Back pocket", "Side of the leg"],
    faqs: [
      q("Why are chef trousers baggy?", "A loose cut lets air move and keeps hot fabric off the skin, and it allows crouching and lifting. Slim cuts are common now for a modern look."),
      q("Printed or yarn-dyed check for chef trousers?", "Yarn-dyed checks are woven in and keep their look through laundering; printed checks cost less but can fade."),
      q("Do chef trousers come in leg lengths?", "They can: regular and long inseams help a kitchen team of different heights. Specify them in the size chart."),
    ],
    seoTitle: "Chef Trouser Manufacturer",
    seoDescription:
      "Chef trousers with elasticated or drawcord waists, in plain or check poly-cotton, made to your specification. Cut, pockets, measurements and logos.",
  },
  {
    slug: "tea-towel",
    family: "kitchen-textiles",
    names: ["Tea Towel"],
    title: "Tea Towel",
    intro:
      "A flat-woven or terry cloth for drying dishes and glasses, printed or woven with a pattern or a brand, where absorbency, lint and size decide whether it does the job.",
    summary:
      "A tea towel is specified by fabric (cotton twill, cotton terry, waffle or linen union), size, weight, hems, hanging loop and design. Linen union dries glass and cutlery without leaving lint; cotton is softer and more absorbent. Retail and promotional tea towels are often printed edge to edge.",
    features: [
      t("Fabric", "Cotton twill, waffle, terry or linen union."),
      t("Hems", "Double-turned hems on all sides, or selvedge on the long edges."),
      t("Hanging loop", "A tape or self-fabric loop at one corner."),
      t("Design", "Printed, yarn-dyed stripes or checks, or a woven jacquard border."),
    ],
    measurements: [
      m("Length", "Finished, hem to hem."),
      m("Width", "Finished, edge to edge."),
      m("Hem width", "Depth of the turned hem."),
      m("Loop length", "Finished length of the hanging loop."),
    ],
    specification: [
      s("Fabric options", "Cotton twill, cotton waffle, cotton terry, linen union"),
      s("Typical weight", "150-300 gsm"),
      s("Finish", "Pre-washed or soft finish for absorbency"),
      s("Design", "Printed, yarn-dyed or jacquard"),
    ],
    logoPositions: ["Woven or printed in a corner", "Full printed design", "Woven border"],
    faqs: [
      q("What size is a tea towel?", "Commonly around 50 x 70 cm, but specify the finished size you want; sizes vary by market."),
      q("Why use linen union for tea towels?", "The linen content dries glass and cutlery without leaving lint, which cotton terry can."),
      q("Should new tea towels be washed before use?", "New towels absorb better after a wash removes finishing agents. A pre-washed or soft finish helps from the start."),
    ],
    seoTitle: "Tea Towel Manufacturer",
    seoDescription:
      "Cotton, waffle and linen-union tea towels, printed or yarn-dyed, made to your specification in Karachi. Size, fabric, hems and design.",
  },
  {
    slug: "oven-glove",
    family: "kitchen-textiles",
    names: ["Oven Glove"],
    title: "Oven Glove",
    intro:
      "A quilted glove or double glove for taking hot dishes out of the oven, where the wadding, the stitching and a tested heat rating are what protect the hand.",
    summary:
      "An oven glove is specified by style (single mitt or double glove), outer fabric, heat-resistant wadding, quilting, binding, hanging loop and size. Because it protects against heat, any heat-resistance claim needs a test to a standard the buyer nominates, and the wadding is chosen for it.",
    features: [
      t("Style", "Single mitt, or a double glove joined by a long middle panel."),
      t("Wadding", "Heat-resistant wadding chosen for the rating required."),
      t("Quilting", "Stitched through to stop the wadding shifting."),
      t("Binding and loop", "Bound edges and a hanging loop."),
    ],
    measurements: [
      m("Mitt length", "Cuff to the tip of the mitt."),
      m("Mitt width", "Across the palm."),
      m("Overall length", "For a double glove, tip to tip."),
      m("Wadding thickness", "Through the quilted layers."),
    ],
    specification: [
      s("Outer fabric", "Cotton or poly-cotton twill or canvas"),
      s("Wadding", "Heat-resistant, to the rating required"),
      s("Heat rating", "Only to a buyer-nominated standard, with test evidence"),
      s("Style", "Single mitt or double glove"),
    ],
    logoPositions: ["Back of the mitt", "Middle panel of a double glove"],
    faqs: [
      q("How hot can an oven glove handle?", "That depends on its wadding and construction and is established by testing to a named standard. No heat figure should be stated without that test."),
      q("Single mitt or double glove?", "A double glove protects both hands for heavy trays; single mitts are easier to use one at a time."),
      q("Can oven gloves be printed?", "Yes, on the outer fabric before quilting, or embroidered on the back."),
    ],
    seoTitle: "Oven Glove Manufacturer",
    seoDescription:
      "Quilted oven gloves and double oven gloves made to your specification, with heat claims only to a tested standard. Fabric, wadding and size.",
  },
  {
    slug: "table-napkin",
    family: "kitchen-textiles",
    names: ["Table Napkin"],
    title: "Table Napkin",
    intro:
      "Woven napkins for restaurants and hotels, folded hundreds of times and washed hot, where the corners, the colour and the hand after laundering tell guests what kind of place it is.",
    summary:
      "A table napkin is specified by fabric (cotton, poly-cotton or a satin-band damask), size, hems and corners (mitred or plain), colour and finish. Poly-cotton keeps its colour and creases less through hotel laundering; cotton feels better. Mitred corners look finished and lie flat.",
    features: [
      t("Mitred corners", "Corners folded on the diagonal so the hem lies flat."),
      t("Hem", "Plain double-turned hem or a hemstitch."),
      t("Weave", "Plain, twill or satin-band damask."),
      t("Colour", "Dyed to the venue's colour, colour-fast to hotel laundering."),
    ],
    measurements: [
      m("Size", "Finished, edge to edge, both directions."),
      m("Hem width", "Depth of the hem."),
      m("Squareness", "Difference between the two diagonals."),
      m("Shrinkage", "Change in size after the stated wash."),
    ],
    specification: [
      s("Fabric options", "Cotton, poly-cotton, satin-band damask"),
      s("Typical weight", "150-250 gsm"),
      s("Corners", "Mitred or plain"),
      s("Laundering", "Colour-fast to commercial wash"),
    ],
    logoPositions: ["Embroidered corner", "Woven in a satin band"],
    faqs: [
      q("Cotton or poly-cotton napkins for a restaurant?", "Poly-cotton keeps colour and creases less through laundering; cotton feels softer and more absorbent. Many venues choose a blend."),
      q("What size is a dinner napkin?", "Commonly around 45-50 cm square, with smaller cocktail napkins. Specify the finished size."),
      q("Why mitred corners?", "They lie flat and look finished, which matters for a folded napkin on a laid table."),
    ],
    seoTitle: "Table Napkin Manufacturer",
    seoDescription:
      "Cotton, poly-cotton and damask table napkins for restaurants and hotels, made to your specification. Size, corners, colour and laundering.",
  },

  /* ------------------------------ Coveralls & Overalls ------------------------------ */
  {
    slug: "work-coverall",
    family: "coveralls",
    names: ["Zip-Front Work Coverall"],
    title: "Zip-Front Work Coverall",
    intro:
      "A one-piece boiler suit with a two-way zip, an elasticated back and pockets where tools are reached for, built to take kneeling, climbing and a hard wash.",
    summary:
      "A work coverall is specified by fabric and weight, front closure (two-way zip, studs or buttons, with a storm flap), back waist and action pleats, pockets, cuffs, reinforcement at crotch and knees, and size by chest and length. Protective coveralls (flame-resistant, anti-static) are certified products made to a nominated standard.",
    features: [
      t("Two-way zip", "Opens from the top and the bottom, under a press-stud storm flap."),
      t("Elasticated back waist", "Gathers the waist for fit without a belt."),
      t("Action back", "Pleats at the shoulders for reaching."),
      t("Tool pockets", "Chest, hip, rule and back pockets, with closures."),
      t("Adjustable cuffs", "Press-stud or hook-and-loop tabs at the wrists."),
    ],
    measurements: [
      m("Chest", "Measured flat, 2.5 cm below the armhole, closed, doubled."),
      m("Back length", "Centre back neck to the crotch."),
      m("Inseam", "From the crotch seam to the hem."),
      m("Sleeve length", "Centre back neck to cuff edge."),
      m("Waist", "Across the back waist, relaxed and stretched."),
    ],
    specification: [
      s("Fabric options", "Poly-cotton twill, cotton drill"),
      s("Typical weight", "210-300 gsm"),
      s("Closure", "Two-way zip with storm flap, or studs"),
      s("Sizes", "By chest, with regular and tall lengths"),
    ],
    logoPositions: ["Left chest", "Centre back", "Upper sleeve"],
    faqs: [
      q("How are coveralls sized?", "By chest size, with regular and tall lengths in each, because coveralls must fit both the chest and the body length."),
      q("Should a coverall have reflective tape?", "Tape helps visibility; a coverall sold as high-visibility workwear must meet a hi-vis standard and be certified."),
      q("Where do coveralls wear out?", "At the crotch, knees, cuffs and pocket corners. Specify reinforcement at each."),
    ],
    seoTitle: "Work Coverall Manufacturer",
    seoDescription:
      "Zip-front work coveralls and boiler suits made to your specification in Karachi. Closures, action back, pockets, sizing and logo positions.",
  },
  {
    slug: "bib-and-brace-overall",
    family: "coveralls",
    names: ["Bib-and-Brace Overall"],
    title: "Bib-and-Brace Overall",
    intro:
      "A trouser with a bib and braces, worn over a shirt or T-shirt: cooler than a coverall, easier to take off, and still covering the clothes underneath from the chest down.",
    summary:
      "A bib-and-brace overall is specified by fabric and weight, bib height and pocket, brace width and adjustment, side openings, waist, pocket layout, knee options and size. Braces that cross at the back stay on the shoulders better; elasticated sections add comfort.",
    features: [
      t("Adjustable braces", "Buckles or clips with elasticated sections for comfort."),
      t("Bib pocket", "A chest pocket with a zip or flap, and pen slots."),
      t("Side openings", "Buttoned or studded openings at the hips for easy on and off."),
      t("Knee-pad pockets", "Optional pockets that hold knee pads."),
    ],
    measurements: [
      m("Waist", "Across the waist, doubled."),
      m("Bib height", "From the waist to the top of the bib."),
      m("Brace length", "Fully extended and shortened."),
      m("Inseam", "From the crotch seam to the hem."),
      m("Hip", "At the widest point, doubled."),
    ],
    specification: [
      s("Fabric options", "Poly-cotton twill, cotton drill, canvas"),
      s("Typical weight", "220-320 gsm"),
      s("Braces", "Adjustable, elasticated, cross-back"),
      s("Knees", "Plain, double or knee-pad pockets"),
    ],
    logoPositions: ["Bib", "Back of the bib", "Leg"],
    faqs: [
      q("Coverall or bib overall?", "Bib overalls are cooler and easier to take off; coveralls protect the arms and upper body too."),
      q("Can bib overalls take knee pads?", "Yes, with knee-pad pockets. The pads themselves are protective products with their own standard."),
      q("Why cross-back braces?", "They stay on the shoulders better when the wearer bends and reaches."),
    ],
    seoTitle: "Bib and Brace Overall Manufacturer",
    seoDescription:
      "Bib-and-brace overalls in poly-cotton and canvas, made to your specification in Karachi. Braces, pockets, knee options and measurements.",
  },

  /* ------------------------------ Knitted Sweaters ------------------------------ */
  {
    slug: "crew-neck-sweater",
    family: "knitwear",
    names: ["Crew-Neck Sweater"],
    title: "Crew-Neck Sweater",
    intro:
      "A knitted round-neck jumper, the corporate and school staple, where yarn, gauge and stitch decide the look, and the rib at neck, cuff and hem decides how it ages.",
    summary:
      "A crew-neck sweater is specified by yarn (cotton, acrylic, wool or a blend), gauge, stitch, construction (fully fashioned or cut and sew), rib trims, colour and pilling resistance. A finer gauge looks smarter; a chunky gauge looks casual. The yarn and its spinning decide how much it pills.",
    features: [
      t("Gauge", "Fine 12-gauge for a smart look; 5 or 7 gauge for a chunky casual knit."),
      t("Rib trims", "1x1 or 2x2 rib at neck, cuffs and hem."),
      t("Fully fashioned", "Panels knitted to shape and linked, for clean edges."),
      t("Elbow patches", "Optional, for a classic look and wear protection."),
    ],
    measurements: [
      m("Chest", "Measured flat, 2.5 cm below the armhole, doubled."),
      m("Body length", "High point of shoulder to the bottom of the hem rib."),
      m("Sleeve length", "Centre back neck to cuff edge."),
      m("Rib heights", "Depth of the neck, cuff and hem rib."),
      m("Neck width", "Seam to seam across the neck."),
    ],
    specification: [
      s("Yarn options", "Cotton, acrylic, wool, wool and cotton blends"),
      s("Gauge", "3 to 16, to specification"),
      s("Construction", "Fully fashioned or cut and sew"),
      s("Pilling", "Tested on the sample"),
    ],
    logoPositions: ["Left chest embroidery", "Knitted-in motif", "Woven badge"],
    faqs: [
      q("Which gauge for a uniform sweater?", "A finer gauge, around 12, looks smart under a jacket; a 7 gauge is warmer and more casual."),
      q("Acrylic or wool for a school sweater?", "Acrylic washes easily and costs less; wool is warmer and more breathable. Blends combine both."),
      q("How do you stop a sweater pilling?", "Choose a long-staple, well-spun yarn and a tighter knit, and test pilling on the sample."),
    ],
    seoTitle: "Knitted Sweater Manufacturer",
    seoDescription:
      "Crew-neck knitted sweaters in cotton, acrylic and wool blends, made to your gauge and stitch specification. Yarn, rib, pilling and logos.",
  },
  {
    slug: "v-neck-cardigan",
    family: "knitwear",
    names: ["V-Neck Cardigan"],
    title: "V-Neck Cardigan",
    intro:
      "A button-front knitted cardigan for front-of-house, care and school uniforms, where the button band has to lie flat and the buttons have to stay on.",
    summary:
      "A cardigan is specified like a sweater (yarn, gauge, stitch, construction) with its front: a V-neck button band, its width and buttonholes, the buttons and their attachment, and any pockets. A button band that waves or gapes is the common fault, fixed in the band's knitting and tension.",
    features: [
      t("Button band", "A rib band knitted or linked on, with reinforced buttonholes."),
      t("Buttons", "Size and material to specification, with a spare where requested."),
      t("Pockets", "Patch or set-in pockets, optional."),
      t("V depth", "How low the V sits, set for wearing over a shirt or a blouse."),
    ],
    measurements: [
      m("Chest", "Measured flat, 2.5 cm below the armhole, buttoned, doubled."),
      m("Body length", "High point of shoulder to hem."),
      m("Sleeve length", "Centre back neck to cuff."),
      m("V-neck depth", "From the high point of the shoulder to the first button."),
      m("Button band width", "Across the band."),
    ],
    specification: [
      s("Yarn options", "Cotton, acrylic, wool blends"),
      s("Gauge", "7 to 14, to specification"),
      s("Front", "V-neck button band, buttons to specification"),
      s("Pockets", "None, patch or set-in"),
    ],
    logoPositions: ["Left chest", "On a pocket"],
    faqs: [
      q("Why does a cardigan button band wave?", "The band is knitted too long or too loose for the body. Correct band length and tension keep it flat."),
      q("How are cardigan buttons kept on?", "Sewn with a shank or a backing button so they take the strain, and checked on the sample."),
      q("Cardigan or sweater for a uniform?", "A cardigan is easier to take on and off through a shift; a sweater looks neater under a jacket."),
    ],
    seoTitle: "Knitted Cardigan Manufacturer",
    seoDescription:
      "V-neck knitted cardigans for uniform and retail programs, made to your specification. Yarn, gauge, button band, pockets and measurements.",
  },
  {
    slug: "knit-vest",
    family: "knitwear",
    names: ["Knit Vest"],
    title: "Knit Vest",
    intro:
      "A sleeveless V-neck pullover, the knitted layer for school and corporate uniforms that adds warmth without bulk at the arms.",
    summary:
      "A knit vest (sleeveless pullover) is specified by yarn, gauge, stitch, V-neck depth, armhole rib, hem rib and any contrast stripe. The armhole rib must hold its shape so the vest does not gape, and school vests often carry a stripe at the neck in the school colour.",
    features: [
      t("Rib armholes", "Rib trims that keep the armholes close."),
      t("V-neck stripe", "A contrast stripe in the neck rib, common for schools."),
      t("Cable option", "A cable stitch panel for a classic look."),
      t("Hem rib", "A rib waistband that holds the vest in place."),
    ],
    measurements: [
      m("Chest", "Measured flat, at the armhole, doubled."),
      m("Body length", "High point of shoulder to hem."),
      m("Armhole depth", "Shoulder to the bottom of the armhole."),
      m("V-neck depth", "From the high point of the shoulder to the bottom of the V."),
    ],
    specification: [
      s("Yarn options", "Acrylic, cotton, wool blends"),
      s("Gauge", "7 to 12, to specification"),
      s("Trims", "Rib armholes and hem, contrast stripe optional"),
      s("Stitch", "Plain, rib or cable"),
    ],
    logoPositions: ["Left chest", "Knitted-in motif"],
    faqs: [
      q("What is a knit vest called in different markets?", "A sleeveless pullover, slipover, sweater vest or tank top, depending on the market. It is the same garment."),
      q("Can a school's colours go in the neck stripe?", "Yes, knitted into the rib in the school's colours."),
      q("Why do vest armholes gape?", "The armhole rib is too loose or too long. A firmer rib and correct length keep it close."),
    ],
    seoTitle: "Knit Vest Manufacturer",
    seoDescription:
      "Knitted vests and sleeveless pullovers for school and corporate uniforms, made to your specification. Yarn, rib trims, stripes and measurements.",
  },

  /* ------------------------------ Sportswear & Team Kits ------------------------------ */
  {
    slug: "team-jersey",
    family: "sportswear",
    names: ["Sublimated Team Jersey"],
    title: "Sublimated Team Jersey",
    intro:
      "A team shirt with the design dyed into the polyester, so stripes, sponsors, names and numbers are part of the fabric and survive every match and every wash.",
    summary:
      "A sublimated team jersey is specified by fabric (polyester interlock or mesh), cut (regular or athletic, men's, women's and youth), collar, the design file, sponsor logos, and a roster of names, numbers and sizes. Sublimation needs polyester and a light base, and colours are approved on a strike-off on the real fabric.",
    features: [
      t("All-over sublimation", "Unlimited colours, no cracking, part of the fibre."),
      t("Names and numbers", "From a roster, sublimated or heat-applied."),
      t("Collar", "Crew, V-neck or polo collar."),
      t("Mesh panels", "Ventilation under the arms and down the sides."),
      t("Cuts", "Men's, women's and youth blocks."),
    ],
    measurements: [
      m("Chest", "Measured flat, 2.5 cm below the armhole, doubled."),
      m("Body length", "High point of shoulder to hem."),
      m("Sleeve length", "Shoulder point to sleeve hem."),
      m("Number height", "Front and back, at each size."),
      m("Sponsor position", "From the high point of the shoulder to the top of the logo."),
    ],
    specification: [
      s("Fabric options", "Polyester interlock, polyester mesh, recycled polyester"),
      s("Typical weight", "130-180 gsm"),
      s("Decoration", "All-over sublimation; heat-transfer or embroidered badge"),
      s("Personalisation", "Names, numbers and sizes from a roster"),
    ],
    logoPositions: ["Club badge on the left chest", "Sponsor across the chest", "Number on the back", "Name above the number", "Sleeve sponsor"],
    faqs: [
      q("Why does sublimation need polyester?", "Sublimation dyes bond with polyester fibres when heated. On cotton they wash out, so cotton kits use other print methods."),
      q("Can each player have a name and number?", "Yes. Send a roster of names, numbers and sizes; each shirt is produced to its line."),
      q("Can we approve the colours first?", "Yes, on a strike-off printed on the actual fabric, since colours vary between fabrics."),
    ],
    seoTitle: "Sublimated Team Jersey Manufacturer",
    seoDescription:
      "Sublimated team jerseys with names, numbers and sponsors, made to your design in Karachi. Fabric, cuts, roster and colour approval.",
  },
  {
    slug: "training-short",
    family: "sportswear",
    names: ["Training Short"],
    title: "Training Short",
    intro:
      "A light sports short with an elastic and drawcord waist, cut for running and training, and printed or sublimated to match the jersey.",
    summary:
      "A training short is specified by fabric (polyester knit, mesh or woven), inseam, waistband, side splits, pockets, an inner brief or liner if needed, and decoration matched to the team kit. The waistband must hold through movement without digging in.",
    features: [
      t("Waistband", "Elastic with an inner drawcord."),
      t("Side splits", "Notched or split hems for running."),
      t("Inner brief", "An optional mesh liner."),
      t("Pockets", "Side or zip pockets, or none for match shorts."),
    ],
    measurements: [
      m("Waist relaxed and stretched", "Across the waistband, doubled."),
      m("Hip", "At the widest point, doubled."),
      m("Inseam", "Crotch seam to hem."),
      m("Leg opening", "Across the hem, doubled."),
    ],
    specification: [
      s("Fabric options", "Polyester knit, mesh, woven polyester"),
      s("Typical weight", "120-180 gsm"),
      s("Waist", "Elastic with drawcord"),
      s("Liner", "Optional mesh brief"),
    ],
    logoPositions: ["Front left leg", "Back leg number", "Side panel"],
    faqs: [
      q("What inseam for training shorts?", "Shorter for running, longer for football and training. Specify the finished inseam for each size."),
      q("Can shorts match a sublimated jersey?", "Yes, sublimated from the same design file on matching fabric."),
      q("Do training shorts need pockets?", "Training shorts often have them; match shorts usually do not."),
    ],
    seoTitle: "Training Shorts Manufacturer",
    seoDescription:
      "Training and match shorts in polyester knit and mesh, sublimated to match your kit. Waistband, inseam, liner and measurements.",
  },
  {
    slug: "track-jacket",
    family: "sportswear",
    names: ["Track Jacket"],
    title: "Track Jacket",
    intro:
      "A full-zip warm-up jacket in tricot or polyester knit, with contrast panels in the club's colours, worn before and after every game.",
    summary:
      "A track jacket is specified by fabric (tricot, polyester knit or a woven), cut, collar (stand or hood), zip, pockets, contrast panels and piping, cuffs and hem. It is often sold with matching track pants as a set, so both are developed together.",
    features: [
      t("Stand collar", "A collar that zips to the chin."),
      t("Contrast panels", "Shoulder and side panels or piping in the club colours."),
      t("Zip pockets", "Hand pockets with zips."),
      t("Cuffs and hem", "Rib, elastic or bound."),
    ],
    measurements: [
      m("Chest", "Measured flat, 2.5 cm below the armhole, closed, doubled."),
      m("Body length", "High point of shoulder to hem."),
      m("Sleeve length", "Centre back neck to cuff."),
      m("Collar height", "At the centre back."),
    ],
    specification: [
      s("Fabric options", "Polyester tricot, polyester knit, woven polyester"),
      s("Typical weight", "180-260 gsm"),
      s("Zip", "Full-length, with chin guard"),
      s("Panels", "Contrast panels and piping to the design"),
    ],
    logoPositions: ["Left chest badge", "Upper back", "Sleeve"],
    faqs: [
      q("What is tricot?", "A warp-knitted polyester fabric with a smooth face, the classic track-jacket material."),
      q("Can track jackets come with matching pants?", "Yes, developed and colour-matched as a set."),
      q("Embroidered or printed badges on track jackets?", "Embroidered badges look premium; heat-transfer badges are lighter and cheaper."),
    ],
    seoTitle: "Track Jacket Manufacturer",
    seoDescription:
      "Track jackets in tricot and polyester knit with contrast panels in your colours, made to your specification. Fabric, zip, panels and logos.",
  },

  /* ------------------------------ Sleepwear & Pyjamas ------------------------------ */
  {
    slug: "woven-pyjama-set",
    family: "sleepwear",
    names: ["Woven Pyjama Set"],
    title: "Woven Pyjama Set",
    intro:
      "The classic pyjama: a notch-collar shirt with contrast piping and a drawcord trouser, in a cotton poplin, voile or flannel that feels right against the skin.",
    summary:
      "A woven pyjama set is specified by fabric (cotton poplin, voile, flannel or a blend), print or check, collar and piping, buttons, pocket, trouser waistband and leg, and sizes. Children's pyjamas must meet the destination's sleepwear flammability rules, which shape fabric and fit.",
    features: [
      t("Notch collar and piping", "A revere collar with contrast piping at edges and cuffs."),
      t("Breast pocket", "A patch pocket, often piped."),
      t("Trouser waist", "Elastic with drawcord, or elastic only."),
      t("Print or check", "Printed or yarn-dyed to approved artwork."),
    ],
    measurements: [
      m("Top chest", "Measured flat, 2.5 cm below the armhole, doubled."),
      m("Top length", "High point of shoulder to hem."),
      m("Trouser waist", "Relaxed and stretched, doubled."),
      m("Trouser inseam", "Crotch seam to hem."),
      m("Sleeve length", "Centre back neck to cuff."),
    ],
    specification: [
      s("Fabric options", "Cotton poplin, voile, flannel, cotton-modal"),
      s("Typical weight", "100-180 gsm"),
      s("Trims", "Piping, buttons and drawcord to specification"),
      s("Children's sizes", "To the market's sleepwear flammability rules"),
    ],
    logoPositions: ["Pocket embroidery", "Woven neck label"],
    faqs: [
      q("Poplin or flannel pyjamas?", "Poplin and voile are cool for summer; brushed flannel is warm for winter."),
      q("Is contrast piping hard to match?", "It is specified like any trim: colour, width and where it runs, and approved on the sample."),
      q("Can children's woven pyjamas be loose-fitting?", "Only if the fabric meets the market's children's sleepwear flammability standard; otherwise children's sleepwear must be tight-fitting."),
    ],
    seoTitle: "Pyjama Set Manufacturer",
    seoDescription:
      "Woven pyjama sets in poplin, voile and flannel with piping and notch collars, made to your specification. Fabric, trims, sizes and rules.",
  },
  {
    slug: "jersey-pyjama-set",
    family: "sleepwear",
    names: ["Jersey Pyjama Set"],
    title: "Jersey Pyjama Set",
    intro:
      "A soft knitted top and bottom in cotton or modal jersey, the comfort set for retail and children's ranges, where stretch and a gentle hand are the point.",
    summary:
      "A jersey pyjama set is specified by fabric (cotton, cotton-modal or brushed jersey), weight, top style, waistband, leg (cuffed or straight), print and size. For children, a close fit to the published dimensions is how jersey sleepwear meets US tight-fitting rules, so fit and size charts are part of compliance.",
    features: [
      t("Soft jersey", "Cotton, modal blends or brushed jersey."),
      t("Cuffed legs", "Rib cuffs at the ankle, or a straight leg."),
      t("Print", "All-over or placement prints."),
      t("Children's tight fit", "For US children's sizes, cut to the tight-fitting dimensions."),
    ],
    measurements: [
      m("Top chest", "Measured flat, 2.5 cm below the armhole, doubled."),
      m("Top length", "High point of shoulder to hem."),
      m("Waist relaxed", "Across the trouser waistband, doubled."),
      m("Inseam", "Crotch seam to hem or cuff."),
      m("Ankle opening", "Across the cuff, relaxed."),
    ],
    specification: [
      s("Fabric options", "Cotton jersey, cotton-modal jersey, brushed jersey"),
      s("Typical weight", "150-220 gsm"),
      s("Leg", "Cuffed or straight"),
      s("Children's sizes", "Tight-fitting to the market's rules, or a compliant fabric"),
    ],
    logoPositions: ["Chest print", "Woven neck label"],
    faqs: [
      q("What does tight-fitting mean for children's pyjamas?", "In the US, children's sleepwear that does not meet the flammability standard must fit close to the body within published maximum dimensions. The size chart is checked against them."),
      q("Cotton or modal jersey pyjamas?", "Modal blends are softer and drape more; cotton is breathable and familiar."),
      q("Can jersey pyjamas be printed all over?", "Yes, by rotary or digital printing on the fabric before cutting."),
    ],
    seoTitle: "Jersey Pyjama Manufacturer",
    seoDescription:
      "Jersey pyjama sets in cotton and modal, including children's sizes cut to the market's rules. Fabric, fit, prints and measurements.",
  },
  {
    slug: "nightshirt",
    family: "sleepwear",
    names: ["Nightshirt"],
    title: "Nightshirt",
    intro:
      "A long woven shirt worn for sleeping, with a short placket and a curved hem, the simplest piece of sleepwear and one of the most comfortable.",
    summary:
      "A nightshirt is specified by fabric (cotton poplin, voile or flannel), length, placket and buttons, collar or collarless neck, sleeve length, pocket and print. It is cut loose, so for children's sizes its fabric must meet the market's sleepwear flammability rules.",
    features: [
      t("Length", "Knee or mid-calf."),
      t("Placket", "A short buttoned placket."),
      t("Neck", "Grandad collarless, or a small shirt collar."),
      t("Curved hem", "Side splits and a curved hem for movement."),
    ],
    measurements: [
      m("Chest", "Measured flat, 2.5 cm below the armhole, doubled."),
      m("Length", "High point of shoulder to hem."),
      m("Sleeve length", "Shoulder point to sleeve hem."),
      m("Placket length", "From the neck to the last button."),
    ],
    specification: [
      s("Fabric options", "Cotton poplin, voile, flannel"),
      s("Typical weight", "100-180 gsm"),
      s("Neck", "Collarless or shirt collar"),
      s("Children's sizes", "Fabric to the market's sleepwear rules"),
    ],
    logoPositions: ["Pocket embroidery", "Woven neck label"],
    faqs: [
      q("How long is a nightshirt?", "Usually knee or mid-calf. Specify the finished length from the shoulder."),
      q("Can a nightshirt be sold in children's sizes?", "Yes, if the fabric meets the market's children's sleepwear flammability standard, because a nightshirt is loose-fitting."),
      q("What is a grandad collar?", "A collarless neck with a narrow band, comfortable for sleeping."),
    ],
    seoTitle: "Nightshirt Manufacturer",
    seoDescription:
      "Woven nightshirts in poplin, voile and flannel, made to your specification in Karachi. Length, neck, placket and children's sleepwear rules.",
  },

  /* ------------------------------ Towels & Bathrobes ------------------------------ */
  {
    slug: "bath-towel",
    family: "towels-bathrobes",
    names: ["Terry Bath Towel"],
    title: "Terry Bath Towel",
    intro:
      "A cotton terry towel specified by its weight, its loop yarn and its border, and judged by how it feels and how much it drinks after the hundredth hotel wash.",
    summary:
      "A bath towel is specified by size, GSM, cotton and loop yarn (ring-spun, combed or zero-twist), pile height, border (plain or dobby), hems, colour and laundering. Heavier towels feel more luxurious but take longer to dry and cost more to launder; hotels choose a weight for both guest and laundry.",
    features: [
      t("Loop yarn", "Ring-spun for durability, zero-twist for softness."),
      t("Dobby border", "A woven flat band near the ends, plain or with a pattern."),
      t("Hems", "Double-stitched ends and selvedges."),
      t("Hanging loop", "Optional for retail."),
    ],
    measurements: [
      m("Size", "Finished length and width."),
      m("GSM", "Weight per square metre, measured on the finished towel."),
      m("Border position", "From the hem to the border."),
      m("Shrinkage", "Change in size after the stated wash."),
    ],
    specification: [
      s("Fabric options", "100% cotton terry, combed, ring-spun or zero-twist loops"),
      s("Typical weight", "400-700 gsm"),
      s("Border", "Plain or dobby"),
      s("Laundering", "Colour and size checked after the stated wash"),
    ],
    logoPositions: ["Embroidered on the border", "Jacquard woven border"],
    faqs: [
      q("What size is a bath towel?", "Commonly around 70 x 140 cm, with bath sheets larger. Specify the finished size."),
      q("Is a heavier towel always better?", "Not always: it feels plusher but dries slower and costs more to launder. Choose for the use."),
      q("Why do new towels shed lint?", "Loose fibres from the loops wash out over the first few washes. Good yarn and finishing reduce it."),
    ],
    seoTitle: "Bath Towel Manufacturer",
    seoDescription:
      "Cotton terry bath towels for hotels, spas and retail, made to your GSM and size. Loop yarn, borders, embroidery and laundering.",
  },
  {
    slug: "terry-bathrobe",
    family: "towels-bathrobes",
    names: ["Shawl-Collar Terry Bathrobe"],
    title: "Shawl-Collar Terry Bathrobe",
    intro:
      "The hotel-room robe: thick cotton terry, a wide shawl collar, a tie belt on loops and two patch pockets, absorbent enough to wear straight from the shower.",
    summary:
      "A terry bathrobe is specified by fabric (terry, or velour outside and terry inside), weight, collar (shawl or kimono), length, sleeve, belt and loops, pockets, sizes and the hotel's logo. One size or S/M and L/XL are common for hotels; retail runs a full size range.",
    features: [
      t("Shawl collar", "A wide rolled collar around the neck and front."),
      t("Belt and loops", "A tie belt held by side loops."),
      t("Patch pockets", "Two hip pockets."),
      t("Velour option", "Sheared velour outside for a smooth look, terry inside."),
    ],
    measurements: [
      m("Length", "Centre back neck to hem."),
      m("Chest", "Measured flat across the closed robe at the armhole, doubled."),
      m("Sleeve length", "Centre back neck to cuff."),
      m("Belt length", "End to end."),
    ],
    specification: [
      s("Fabric options", "Cotton terry, velour and terry"),
      s("Typical weight", "350-500 gsm"),
      s("Collar", "Shawl or kimono"),
      s("Sizes", "One size, two sizes or a full range"),
    ],
    logoPositions: ["Left chest embroidery", "Pocket", "Collar"],
    faqs: [
      q("Terry or velour bathrobe?", "Terry absorbs more; velour looks smoother and more luxurious outside. Velour-terry combines both."),
      q("What size bathrobes do hotels use?", "Often one size or two (S/M and L/XL). Specify length and chest for each."),
      q("Can bathrobes be embroidered with a hotel logo?", "Yes, usually on the left chest or a pocket."),
    ],
    seoTitle: "Terry Bathrobe Manufacturer",
    seoDescription:
      "Shawl-collar terry and velour bathrobes for hotels and spas, made to your specification. Fabric, weight, sizes, belt and embroidery.",
  },
  {
    slug: "waffle-bathrobe",
    family: "towels-bathrobes",
    names: ["Waffle Bathrobe"],
    title: "Waffle Bathrobe",
    intro:
      "A light robe in a waffle weave that dries quickly and packs small, the spa favourite, specified by its weave depth and weight rather than by plushness.",
    summary:
      "A waffle bathrobe is specified by fabric (cotton or poly-cotton waffle), weight, collar (kimono or shawl), length, belt and loops, pockets, sizes and logo. The waffle's honeycomb weave gives absorbency with little weight, so it suits spas and warm climates.",
    features: [
      t("Waffle weave", "A honeycomb weave that holds water in its cells."),
      t("Kimono collar", "A flat band collar, light and simple."),
      t("Light weight", "Dries fast and folds small."),
      t("Belt and pockets", "Tie belt on loops, two patch pockets."),
    ],
    measurements: [
      m("Length", "Centre back neck to hem."),
      m("Chest", "Measured flat across the closed robe, doubled."),
      m("Sleeve length", "Centre back neck to cuff."),
      m("Collar width", "Width of the kimono band."),
    ],
    specification: [
      s("Fabric options", "Cotton waffle, poly-cotton waffle"),
      s("Typical weight", "200-300 gsm"),
      s("Collar", "Kimono or shawl"),
      s("Sizes", "One size, two sizes or a full range"),
    ],
    logoPositions: ["Left chest embroidery", "Pocket"],
    faqs: [
      q("Why do spas use waffle robes?", "They are light, absorbent, dry fast and launder easily."),
      q("Does a waffle robe shrink?", "Cotton waffle can. Specify a pre-shrunk fabric and check size after washing."),
      q("Kimono or shawl collar on a waffle robe?", "Kimono collars suit the light fabric; shawl collars look more like a hotel robe."),
    ],
    seoTitle: "Waffle Bathrobe Manufacturer",
    seoDescription:
      "Waffle-weave bathrobes for spas and hotels, made to your specification in Karachi. Fabric, weight, collar, sizes and embroidery.",
  },

  /* ------------------------------ Puffer & Padded Jackets ------------------------------ */
  {
    slug: "puffer-jacket",
    family: "padded-jackets",
    names: ["Quilted Puffer Jacket"],
    title: "Quilted Puffer Jacket",
    intro:
      "A quilted jacket whose warmth comes from the fill trapped in its channels, specified by fill type and weight, quilting and shell, and judged on whether the fill stays put.",
    summary:
      "A puffer jacket is specified by shell fabric, fill (synthetic by g/m², or down by fill power and ratio with traceable sourcing), quilting (stitch-through or baffle) and channel size, zip, pockets, hood, cuffs and finish. Fill leaking through seams and cold spots along stitch lines are the common faults.",
    features: [
      t("Fill", "Synthetic wadding or traceable down, to the warmth required."),
      t("Channel quilting", "Horizontal or shaped channels, stitch-through or baffle."),
      t("Downproof shell", "A tightly woven or coated shell so down does not leak."),
      t("Packable option", "Folds into its own pocket."),
      t("DWR finish", "Water repellency on the shell."),
    ],
    measurements: [
      m("Chest", "Measured flat, 2.5 cm below the armhole, closed, doubled."),
      m("Body length", "High point of shoulder to hem."),
      m("Sleeve length", "Centre back neck to cuff."),
      m("Channel width", "Width of the quilted channels."),
      m("Fill weight", "Weight of fill per garment or per square metre."),
    ],
    specification: [
      s("Shell options", "Nylon or polyester taffeta, ripstop"),
      s("Fill", "Synthetic g/m², or down by fill power with traceability"),
      s("Quilting", "Stitch-through or baffle"),
      s("Finish", "DWR, confirmed by spray test"),
    ],
    logoPositions: ["Left chest", "Upper sleeve", "Upper back"],
    faqs: [
      q("Why does down leak out of a puffer?", "Through the shell weave or the stitch holes. A downproof shell and fine needles reduce it."),
      q("How warm is a puffer jacket?", "It depends on the fill type and weight and the construction. There is no single figure; warmth is compared on the sample."),
      q("Can a logo be embroidered on a puffer?", "Yes, through the shell before filling, or as a patch, since needles through fill can let it leak."),
    ],
    seoTitle: "Puffer Jacket Manufacturer",
    seoDescription:
      "Quilted puffer jackets with synthetic or traceable down fill, made to your specification in Karachi. Shell, fill, quilting and logos.",
  },
  {
    slug: "padded-gilet",
    family: "padded-jackets",
    names: ["Padded Gilet"],
    title: "Padded Gilet",
    intro:
      "A sleeveless padded layer that keeps the body warm and leaves the arms free, the corporate and outdoor-work favourite that carries a logo on the chest all winter.",
    summary:
      "A padded gilet (body warmer) is specified by shell, fill and weight, quilting, zip, pockets, collar, armhole binding and logo. It is worn over a shirt or fleece, so the armholes are cut generous and bound, and the fill is lighter than in a jacket.",
    features: [
      t("Bound armholes", "Elastic or bound armholes that sit over layers."),
      t("Stand collar", "A collar that zips to the chin."),
      t("Zip pockets", "Hand pockets and an inside pocket."),
      t("Light fill", "Lighter than a jacket, for layering."),
    ],
    measurements: [
      m("Chest", "Measured flat at the armhole, closed, doubled."),
      m("Body length", "High point of shoulder to hem."),
      m("Armhole depth", "Shoulder to the bottom of the armhole."),
      m("Collar height", "At the centre back."),
    ],
    specification: [
      s("Shell options", "Polyester or nylon taffeta, ripstop, softshell"),
      s("Fill", "Synthetic wadding by g/m²"),
      s("Quilting", "Channel or diamond"),
      s("Pockets", "Zip hand pockets, inside pocket"),
    ],
    logoPositions: ["Left chest", "Upper back"],
    faqs: [
      q("Gilet or jacket for a uniform?", "A gilet leaves the arms free for work and layers over shirts and fleece; a jacket gives more warmth."),
      q("Why bind the armholes?", "Binding keeps the edge neat and lets the gilet sit comfortably over sleeves."),
      q("Can a gilet be embroidered?", "Yes, on the chest, ideally before quilting so the fill is not punctured."),
    ],
    seoTitle: "Padded Gilet Manufacturer",
    seoDescription:
      "Padded gilets and body warmers for corporate and outdoor programs, made to your specification. Shell, fill, pockets and logo positions.",
  },
  {
    slug: "padded-work-parka",
    family: "padded-jackets",
    names: ["Padded Work Parka"],
    title: "Padded Work Parka",
    intro:
      "A long padded jacket for cold outdoor work, covering the hips or thighs, with a padded hood and a storm flap, where warmth, water repellency and pockets all matter.",
    summary:
      "A padded work parka is specified by shell (often coated polyester oxford), fill and weight, lining, length, hood, storm flap, cuffs, pockets and any reflective tape. A parka sold as high-visibility or for cold-store work is made to the relevant standard and certified.",
    features: [
      t("Thigh length", "Covers the hips and upper legs."),
      t("Padded hood", "Fixed or detachable, with a drawcord."),
      t("Storm flap", "Over the zip, closed with studs or hook and loop."),
      t("Inner cuffs", "Knitted storm cuffs inside the sleeves."),
      t("Many pockets", "Chest, hand, inside and phone pockets."),
    ],
    measurements: [
      m("Chest", "Measured flat, 2.5 cm below the armhole, closed, doubled."),
      m("Body length", "High point of shoulder to hem."),
      m("Sleeve length", "Centre back neck to cuff."),
      m("Hood height", "Neck seam to top of hood."),
      m("Hem width", "Across the hem, doubled."),
    ],
    specification: [
      s("Shell options", "PU-coated polyester oxford, poly-cotton"),
      s("Fill", "Synthetic wadding by g/m²"),
      s("Hood", "Fixed or detachable, padded"),
      s("Standards", "Hi-vis or cold protection only to a nominated standard, certified"),
    ],
    logoPositions: ["Left chest", "Centre back", "Sleeve"],
    faqs: [
      q("Is a padded parka waterproof?", "Only if its shell is coated or has a membrane and its seams are sealed. A DWR finish alone makes it water-repellent, not waterproof."),
      q("Can a work parka be hi-vis?", "Yes, if it is made to a hi-vis standard such as EN ISO 20471 or ANSI/ISEA 107 and certified."),
      q("Detachable or fixed hood?", "A detachable hood suits changing weather and helmets; a fixed hood is simpler and warmer."),
    ],
    seoTitle: "Padded Work Parka Manufacturer",
    seoDescription:
      "Padded work parkas for cold outdoor work, made to your specification in Karachi. Shell, fill, hood, storm flap, pockets and logos.",
  },
];
