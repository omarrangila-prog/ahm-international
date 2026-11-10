import { m, q, s, t, type ProductItem } from "./item-helpers";

/**
 * Item pages for the core uniform families: workwear, polos and tees, fleece,
 * aprons, woven shirts, bottoms and outerwear. See data/items.ts for the rules.
 */
export const itemsCore: ProductItem[] = [
  /* ----------------------------- Uniform & Workwear ----------------------------- */
  {
    slug: "utility-work-shirt",
    family: "uniform-workwear",
    names: ["Utility Work Shirt"],
    title: "Utility Work Shirt",
    intro:
      "A woven shirt built for a shift of reaching, lifting and laundering: twin chest pockets, strong seams and a fabric chosen for the wash rather than the showroom.",
    summary:
      "A utility work shirt is a woven shirt in poly-cotton or cotton twill with two chest pockets, a work-length body, felled or double-needle seams and a closure the buyer chooses. Its quality is decided at the pockets, the seams and the collar, the places a working day and an industrial laundry reach first.",
    features: [
      t("Twin chest pockets", "Patch pockets with or without flaps, closed by button, press stud or hook and loop; a pen slot in one pocket is common."),
      t("Felled side seams", "A seam that encloses its raw edges in two rows of stitching, so it stays flat and strong through hard laundering."),
      t("Work-length body", "Longer than a dress shirt so it stays tucked when the wearer reaches up; a straight hem suits wearing it out."),
      t("Closure", "Buttons, press studs or a concealed placket. Press studs suit industrial laundries and gloved hands."),
      t("Back yoke and pleats", "A double yoke with a box or side pleats for movement across the shoulders."),
    ],
    measurements: [
      m("Chest", "Measured flat, 2.5 cm below the armhole, side to side, and doubled."),
      m("Body length", "From the high point of the shoulder to the hem at the front."),
      m("Across shoulder", "Shoulder point to shoulder point across the back yoke."),
      m("Sleeve length", "From the shoulder point to the cuff edge, short and long sleeve separately."),
      m("Collar", "Neck size measured along the collar band, button centre to buttonhole end."),
      m("Pocket position", "Top of pocket from the high point of the shoulder, and in from the front edge."),
    ],
    specification: [
      s("Fabric options", "65/35 poly-cotton twill or poplin, 100% cotton twill"),
      s("Typical weight", "150-220 gsm"),
      s("Seams", "Felled or double-needle side and sleeve seams"),
      s("Closure", "Buttons, press studs or concealed placket"),
    ],
    logoPositions: ["Left chest, above the pocket", "On the pocket", "Upper sleeve", "Centre back yoke"],
    faqs: [
      q("Should a work shirt use buttons or press studs?", "Press studs survive industrial laundering, go on quickly and work with gloves; buttons look more formal and are easier to replace. Specify which, and pull-test press studs on the sample."),
      q("How heavy should a work shirt fabric be?", "Most sit around 150-220 gsm. Lighter suits hot climates and indoor work; heavier twill suits outdoor work and abrasion. Choose for the job and the wash."),
      q("Can the logo go on the pocket?", "Yes, embroidered on the pocket before it is sewn on, or above it. Embroidery through a finished pocket is harder to place accurately."),
    ],
    seoTitle: "Utility Work Shirt Manufacturer",
    seoDescription:
      "Utility work shirts with twin chest pockets and felled seams, made to your specification in Karachi. Fabric, closures, measurements and logo positions.",
  },
  {
    slug: "utility-work-jacket",
    family: "uniform-workwear",
    names: ["Utility Work Jacket"],
    title: "Utility Work Jacket",
    intro:
      "The jacket a crew wears on site and off it: four pockets, a full zip, rib cuffs and hem, and a shell heavy enough to take the work.",
    summary:
      "A utility work jacket is a hip-length, full-zip jacket in twill or canvas with chest and hand pockets, a stand or shirt collar, and rib or adjustable cuffs. It is specified by shell fabric and weight, lining, closures, pocket layout and reinforcement, and it is usually the most visible garment a uniform program carries.",
    features: [
      t("Four-pocket front", "Two chest pockets, often one zipped, and two hand pockets, welt or slash, with bar-tacked ends."),
      t("Full-length zip", "A metal or moulded zip, sometimes behind a storm flap with press studs."),
      t("Rib or tab cuffs", "Knitted rib cuffs and hem keep out wind; adjustable tabs suit gloves."),
      t("Collar", "A stand collar, a shirt collar, or a corduroy-faced collar on chore styles."),
      t("Lining", "Unlined, mesh, quilted or fleece-lined, by season."),
    ],
    measurements: [
      m("Chest", "Measured flat, 2.5 cm below the armhole, with the zip closed."),
      m("Body length", "From the high point of the shoulder to the bottom of the hem band."),
      m("Sleeve length", "From the centre back neck to the cuff edge, for raglan and set-in alike."),
      m("Hem width", "Across the hem band, relaxed and stretched where it is rib."),
      m("Cuff opening", "Across the cuff, relaxed."),
      m("Zip length", "The zip's tape length, which fixes the front length."),
    ],
    specification: [
      s("Shell options", "Poly-cotton twill, cotton canvas or duck"),
      s("Typical weight", "220-340 gsm"),
      s("Lining", "Unlined, mesh, quilted or fleece"),
      s("Closures", "Zip, press-stud storm flap, adjustable cuff tabs"),
    ],
    logoPositions: ["Left chest", "Centre back, large", "Upper sleeve", "Right chest name tape"],
    faqs: [
      q("Is a utility work jacket waterproof?", "Not unless it is specified to be. A twill or canvas shell resists wind and light showers; water repellency is a finish and waterproofing needs a coated fabric and sealed seams."),
      q("Which zip should a work jacket use?", "A sturdy metal or moulded plastic zip in a gauge suited to the shell. Name a brand and gauge if your program has one, or ask for options."),
      q("Can the back carry a large logo?", "Yes. A large back print or embroidery is common; on a heavy shell, embroidery is usually done on the back panel before assembly."),
    ],
    seoTitle: "Utility Work Jacket Manufacturer",
    seoDescription:
      "Four-pocket utility work jackets in twill or canvas, made to your specification in Karachi. Shell, lining, closures, measurements and logo positions.",
  },
  {
    slug: "corporate-uniform-tie",
    family: "uniform-workwear",
    names: ["Corporate Uniform Tie"],
    title: "Corporate Uniform Tie",
    intro:
      "The smallest garment in a corporate uniform and the one closest to the face: woven or printed in the program's colours, cut on the bias and lined to hang straight.",
    summary:
      "A uniform tie is specified by its fabric (woven or printed polyester, or silk), its construction (cut on the bias, with an interlining and a tipping at the blade), its length and blade width, and the pattern or logo. Polyester is the usual uniform choice because it wears and cleans well. Clip-on and pre-tied ties suit roles where a tie must release if caught.",
    features: [
      t("Woven or printed", "A woven jacquard carries the pattern in the yarn; a print is cheaper for many colours and short runs."),
      t("Bias cut", "Cutting on the diagonal lets the tie drape and resist twisting."),
      t("Interlining", "Gives the tie body and lets the knot hold its shape."),
      t("Keeper loop", "A loop on the back of the blade to hold the narrow end, often with a woven label."),
      t("Safety styles", "Clip-on or pre-tied with a breakaway fastening, for security and care roles."),
    ],
    measurements: [
      m("Length", "Tip of the blade to tip of the tail, laid flat."),
      m("Blade width", "Across the widest point of the front blade."),
      m("Tail width", "Across the widest point of the narrow end."),
      m("Clip-on drop", "For clip-ons, from the knot to the tip."),
      m("Keeper position", "From the tip of the blade to the keeper loop."),
    ],
    specification: [
      s("Fabric options", "Woven polyester jacquard, printed polyester, silk"),
      s("Construction", "Bias cut, interlined, self or contrast tipping"),
      s("Styles", "Classic, slim, clip-on, pre-tied breakaway"),
      s("Pattern", "Woven or printed to approved artwork and colours"),
    ],
    logoPositions: ["Repeat pattern across the blade", "Single logo low on the blade", "Woven label on the keeper"],
    faqs: [
      q("Woven or printed tie: which should a uniform use?", "A woven jacquard looks richer and the pattern cannot rub off; a printed tie allows more colours and fine detail at lower cost. Both suit uniform programs."),
      q("What length is a standard tie?", "Adult ties are commonly around 145-150 cm long, with longer lengths for tall wearers. Specify length and blade width rather than a style name."),
      q("Why choose a clip-on tie for a uniform?", "A clip-on or breakaway tie releases if pulled, which matters for security, retail and care roles, and it looks the same on every wearer."),
    ],
    seoTitle: "Corporate Uniform Tie Manufacturer",
    seoDescription:
      "Woven and printed corporate uniform ties, including clip-on and breakaway styles, made to your colours. Construction, measurements and logo options.",
  },

  /* ------------------------------ Polos & T-Shirts ------------------------------ */
  {
    slug: "classic-polo",
    family: "polos-tshirts",
    names: ["Classic Short-Sleeve Polo"],
    title: "Classic Short-Sleeve Polo",
    intro:
      "The default uniform top: a knitted collar, a short placket and a pique or jersey body that takes an embroidered logo better than almost anything else.",
    summary:
      "A classic polo is a short-sleeved knit shirt with a collar and a two- or three-button placket. It is specified by its fabric (pique or jersey, cotton, CVC or polyester), weight, collar and cuff construction, placket, hem and decoration. Pique hides creases and takes embroidery well; jersey is smoother and prints better.",
    features: [
      t("Flat-knit collar", "Knitted to shape on a flat machine, with matching cuffs; self-fabric collars are cheaper and less crisp."),
      t("Placket", "Two or three buttons, a plain or reinforced placket, and a box or tape at its base."),
      t("Sleeve finish", "Rib cuffs or a hemmed sleeve."),
      t("Hem", "Straight, or with side vents and a longer back (tennis tail)."),
      t("Neck tape", "Taping inside the back neck to cover the seam and keep it from stretching."),
    ],
    measurements: [
      m("Chest", "Measured flat, 2.5 cm below the armhole, side to side, doubled."),
      m("Body length", "From the high point of the shoulder to the front hem."),
      m("Sleeve length", "From the shoulder point to the sleeve edge."),
      m("Placket length", "From the collar seam to the base of the placket."),
      m("Collar height", "At the centre back, collar band to edge."),
      m("Sleeve opening", "Across the cuff, relaxed."),
    ],
    specification: [
      s("Fabric options", "Cotton pique, CVC pique, polyester performance pique, jersey"),
      s("Typical weight", "180-240 gsm"),
      s("Collar and cuffs", "Flat-knit or self-fabric"),
      s("Placket", "Two or three buttons, length to specification"),
    ],
    logoPositions: ["Left chest", "Right chest", "Upper sleeve", "Back neck below the collar"],
    faqs: [
      q("Pique or jersey for a uniform polo?", "Pique has a textured surface that hides creases and takes embroidery well; jersey is smooth and suits printing. Most uniform polos are pique."),
      q("Why do some polo collars curl?", "Self-fabric collars and poorly knitted flat-knit collars can curl after washing. A properly knitted collar, or a collar stiffener, keeps it flat; check on a washed sample."),
      q("What weight should a polo be?", "Uniform polos usually sit around 180-240 gsm. Heavier pique feels substantial and lasts; lighter suits heat."),
    ],
    seoTitle: "Polo Shirt Manufacturer",
    seoDescription:
      "Short-sleeve pique and jersey polo shirts made to your specification in Karachi: collar, placket, measurements and embroidery positions for uniforms.",
  },
  {
    slug: "long-sleeve-polo",
    family: "polos-tshirts",
    names: ["Long-Sleeve Uniform Polo"],
    title: "Long-Sleeve Uniform Polo",
    intro:
      "The polo for cold stores, early shifts and winter programs: the same collar and placket as the short sleeve, with a rib cuff that has to stay put through washing.",
    summary:
      "A long-sleeve polo is specified like a short-sleeve one, with two more decisions: the cuff, usually knitted rib, and the sleeve length across the size range. Rib cuffs lose their grip if the rib has no recovery, so the rib's composition matters. Long-sleeve polos often use a slightly heavier fabric than the short-sleeve style in the same program.",
    features: [
      t("Rib cuff", "1x1 or 2x2 rib, ideally with elastane so it recovers after washing."),
      t("Matching collar", "Flat-knit to match the cuffs in colour and stripe."),
      t("Side vents", "Short vents at the hem so the polo sits over trousers."),
      t("Sleeve length by size", "Graded through the range, with tall lengths where needed."),
    ],
    measurements: [
      m("Chest", "Measured flat, 2.5 cm below the armhole, doubled."),
      m("Body length", "High point of shoulder to front hem."),
      m("Sleeve length", "Centre back neck to cuff edge, so different shoulder widths compare fairly."),
      m("Cuff height", "Depth of the rib cuff."),
      m("Cuff opening", "Across the cuff, relaxed and stretched."),
      m("Vent length", "Height of the side vents."),
    ],
    specification: [
      s("Fabric options", "Cotton or CVC pique, performance pique"),
      s("Typical weight", "200-260 gsm"),
      s("Cuffs", "Rib with elastane for recovery"),
      s("Hem", "Straight with side vents, or tennis tail"),
    ],
    logoPositions: ["Left chest", "Upper sleeve", "Forearm", "Back neck"],
    faqs: [
      q("Why do long-sleeve polo cuffs stretch out?", "The rib loses its recovery. A rib with a little elastane, and a cuff that is not too loose to begin with, keeps its grip; test on a washed sample."),
      q("Should the long sleeve be heavier than the short sleeve?", "Often slightly, for warmth, but the two can share one fabric if the program needs them to match exactly."),
      q("Can a long-sleeve polo carry a sleeve logo?", "Yes, on the upper arm or the forearm. Forearm logos are placed so they read when the arm hangs."),
    ],
    seoTitle: "Long-Sleeve Polo Manufacturer",
    seoDescription:
      "Long-sleeve uniform polo shirts with rib cuffs, made to your specification in Karachi. Fabric, cuff recovery, measurements and logo positions.",
  },
  {
    slug: "crew-neck-t-shirt",
    family: "polos-tshirts",
    names: ["Crew-Neck Uniform T-Shirt"],
    title: "Crew-Neck Uniform T-Shirt",
    intro:
      "The simplest garment in the range and the easiest to get wrong: a neck that bags, a side seam that twists, a print that cracks. Each is a specification decision.",
    summary:
      "A crew-neck T-shirt is specified by its jersey fabric (cotton, CVC or polyester), weight, yarn (carded, combed or ring-spun), neck rib, shoulder taping, side seams or tubular body, hems and decoration. Twisting side seams and a neck that stretches out are the classic failures, and both are controlled in the fabric and the cutting.",
    features: [
      t("Rib neck", "1x1 rib, usually with elastane, sewn with a coverstitch so it lies flat and recovers."),
      t("Shoulder taping", "Tape across the shoulder seam stops it stretching."),
      t("Side seams or tubular", "Side-seamed bodies twist less and fit better; tubular bodies are cheaper."),
      t("Yarn", "Combed and ring-spun yarns are smoother and stronger than carded open-end yarn, and print better."),
      t("Hems", "Twin-needle coverstitch hems at sleeve and body."),
    ],
    measurements: [
      m("Chest", "Measured flat, 2.5 cm below the armhole, doubled."),
      m("Body length", "High point of shoulder to hem."),
      m("Sleeve length", "Shoulder point to sleeve hem."),
      m("Neck width", "Seam to seam across the neck opening."),
      m("Neck drop", "Front neck depth from the high point of the shoulder."),
      m("Neck rib height", "Depth of the rib band."),
    ],
    specification: [
      s("Fabric options", "Cotton, CVC or polyester single jersey"),
      s("Typical weight", "140-200 gsm"),
      s("Yarn", "Carded, combed or ring-spun, to specification"),
      s("Body", "Side-seamed or tubular"),
    ],
    logoPositions: ["Left chest", "Full front", "Upper back below the neck", "Full back", "Sleeve"],
    faqs: [
      q("Why do T-shirt side seams twist?", "Jersey has a natural spirality from the yarn twist and knitting. Fabric finishing, cutting on grain and side-seamed construction reduce it; check after washing."),
      q("What does combed cotton mean?", "The cotton has been combed to remove short fibres, giving a smoother, stronger yarn that prints better and pills less than carded yarn."),
      q("What weight is a good uniform T-shirt?", "Around 160-200 gsm is common. Lighter is cooler and cheaper; heavier feels better and lasts longer."),
    ],
    seoTitle: "Uniform T-Shirt Manufacturer",
    seoDescription:
      "Crew-neck uniform T-shirts in cotton, CVC or polyester jersey, made to your specification. Neck, seams, yarn, measurements and print positions.",
  },

  /* ---------------------------- Fleece & Sweatshirts ---------------------------- */
  {
    slug: "crewneck-sweatshirt",
    family: "fleece-sweatshirts",
    names: ["Crewneck Sweatshirt"],
    title: "Crewneck Sweatshirt",
    intro:
      "A round-neck sweatshirt with rib at neck, cuff and hem. No hood or zip to hide behind, so the fabric, the rib and the fit carry the whole garment.",
    summary:
      "A crewneck sweatshirt is specified by its fabric (brushed fleece or French terry), weight, sleeve style (set-in or raglan), rib trims and any neck detail such as a V-insert. Because it is plain, rib recovery and shrinkage show more than on a hoodie. It is the easiest fleece garment to decorate across the chest.",
    features: [
      t("Set-in or raglan sleeve", "Raglan sleeves run to the neck and allow more movement; set-in looks tailored."),
      t("Rib trims", "Neck, cuffs and hem in 1x1 or 2x2 rib, ideally with elastane."),
      t("V-insert", "A small V of rib at the front neck, a classic detail that also strengthens the neck."),
      t("Side panels", "Optional rib side panels for stretch in fitted styles."),
    ],
    measurements: [
      m("Chest", "Measured flat, 2.5 cm below the armhole, doubled."),
      m("Body length", "High point of shoulder to the bottom of the hem rib."),
      m("Sleeve length", "Centre back neck to cuff edge."),
      m("Hem rib height", "Depth of the waistband rib."),
      m("Neck width", "Seam to seam across the neck."),
      m("Cuff opening", "Across the cuff, relaxed."),
    ],
    specification: [
      s("Fabric options", "Brushed-back fleece, French terry"),
      s("Typical weight", "260-360 gsm"),
      s("Sleeve", "Set-in or raglan"),
      s("Trims", "1x1 or 2x2 rib with elastane"),
    ],
    logoPositions: ["Full front", "Left chest", "Upper back", "Sleeve"],
    faqs: [
      q("Raglan or set-in sleeve for a sweatshirt?", "Raglan sleeves give more movement and a sporty look; set-in sleeves look neater. Choose for the wearer and the logo, since a raglan seam crosses the upper chest."),
      q("Why does a sweatshirt hem flare after washing?", "The hem rib has lost its recovery. Rib with elastane and a correctly sized rib band prevent it."),
      q("Fleece or French terry for a crewneck?", "Fleece is warmer and softer inside; French terry is lighter and keeps its shape. Both are common."),
    ],
    seoTitle: "Crewneck Sweatshirt Manufacturer",
    seoDescription:
      "Crewneck sweatshirts in brushed fleece or French terry, made to your specification in Karachi. Sleeve, rib trims, measurements and print positions.",
  },
  {
    slug: "pullover-hoodie",
    family: "fleece-sweatshirts",
    names: ["Pullover Hoodie"],
    title: "Pullover Hoodie",
    intro:
      "The most worn garment in most uniform and merchandise programs: a hood, a kangaroo pocket and a fleece body, each with decisions that decide how it looks after a season.",
    summary:
      "A pullover hoodie is specified by fabric and weight, hood construction (two- or three-panel, lined or not, with or without drawcord), the kangaroo pocket, sleeve style and rib trims. The hood is what wearers notice: a lined three-panel hood holds its shape better than a single-layer two-panel one.",
    features: [
      t("Hood", "Two-panel or three-panel, single layer or lined in self or jersey, with cord and eyelets or without."),
      t("Kangaroo pocket", "One front pouch, its opening edges reinforced at the corners."),
      t("Drawcord", "Flat or round cord, with metal or plastic tips or knotted ends. Children's sizes follow drawcord rules."),
      t("Rib trims", "Cuffs and hem in rib with elastane."),
      t("Neck finish", "Taped inside the back neck, sometimes with a hanging loop."),
    ],
    measurements: [
      m("Chest", "Measured flat, 2.5 cm below the armhole, doubled."),
      m("Body length", "High point of shoulder to the bottom of the hem rib."),
      m("Sleeve length", "Centre back neck to cuff edge."),
      m("Hood height", "From the neck seam to the top of the hood, laid flat."),
      m("Hood width", "Across the hood at its widest, laid flat."),
      m("Pocket opening", "Height of each pocket opening, and pocket width at the base."),
    ],
    specification: [
      s("Fabric options", "Brushed-back fleece, French terry"),
      s("Typical weight", "280-380 gsm"),
      s("Hood", "Two or three panel, single or lined"),
      s("Drawcord", "With or without; tips and eyelets to specification"),
    ],
    logoPositions: ["Full front above the pocket", "Left chest", "Full back", "Sleeve", "Hood side"],
    faqs: [
      q("Two-panel or three-panel hood?", "A three-panel hood has a centre strip that gives it a rounder shape and better fit; a two-panel hood is simpler and cheaper."),
      q("Should the hood be lined?", "A lined hood is warmer, holds its shape and looks finished inside. A single layer is lighter and cheaper."),
      q("Can a pullover hoodie be printed across the pocket?", "A print over the pocket edge breaks at the seam. Place the print above the pocket, or decorate the pocket piece before it is sewn on."),
    ],
    seoTitle: "Pullover Hoodie Manufacturer",
    seoDescription:
      "Pullover hoodies in fleece or French terry, made to your specification in Karachi. Hood, pocket, drawcord, measurements and print positions.",
  },
  {
    slug: "full-zip-fleece-jacket",
    family: "fleece-sweatshirts",
    names: ["Full-Zip Fleece Jacket"],
    title: "Full-Zip Fleece Jacket",
    intro:
      "A zip-front fleece, hooded or collared, worn as a layer or as the outer jacket. The zip, the pockets and the fleece's pilling resistance decide its life.",
    summary:
      "A full-zip fleece jacket is specified by fabric (brushed fleece, or polyester polar fleece with an anti-pill finish), weight, hood or collar, zip type and length, pockets and trims. Polar fleece jackets pill fast if the fleece is not anti-pill, and a cheap zip is the first thing to fail.",
    features: [
      t("Centre-front zip", "Moulded plastic or coil zip, with a chin guard at the top so it does not rub the neck."),
      t("Hood or stand collar", "A hood for casual programs, a stand collar for a neater uniform look."),
      t("Zip pockets", "Hand pockets with zips, and sometimes a chest pocket."),
      t("Binding", "Polar fleece edges are often bound rather than ribbed."),
      t("Anti-pill finish", "Essential for polyester polar fleece."),
    ],
    measurements: [
      m("Chest", "Measured flat, 2.5 cm below the armhole, zip closed."),
      m("Body length", "High point of shoulder to hem."),
      m("Sleeve length", "Centre back neck to cuff."),
      m("Collar height", "For a stand collar, at the centre back."),
      m("Zip length", "Tape length of the front zip."),
      m("Pocket zip length", "Tape length of each pocket zip."),
    ],
    specification: [
      s("Fabric options", "Brushed-back fleece, anti-pill polar fleece"),
      s("Typical weight", "200-360 gsm"),
      s("Zip", "Moulded or coil, with chin guard"),
      s("Edges", "Rib, binding or self-fabric"),
    ],
    logoPositions: ["Left chest", "Right chest", "Upper back", "Sleeve"],
    faqs: [
      q("Why does polar fleece pill?", "Polyester fibres are strong, so pills formed by rubbing stay on the surface. An anti-pill finish and a tighter fleece reduce it; check on a washed sample."),
      q("What is a chin guard?", "A small fabric flap at the top of the zip that covers the zip head, so it does not rub the chin or neck."),
      q("Can a fleece jacket be embroidered?", "Yes, on a smooth-faced fleece. Very high-pile fleece can swallow fine embroidery, so use bold designs or a patch."),
    ],
    seoTitle: "Fleece Jacket Manufacturer",
    seoDescription:
      "Full-zip fleece jackets in brushed fleece or anti-pill polar fleece, made to your specification. Zip, pockets, measurements and logo positions.",
  },

  /* ----------------------------------- Aprons ----------------------------------- */
  {
    slug: "bib-apron",
    family: "aprons",
    names: ["Three-Pocket Bib Apron", "Bib Apron"],
    title: "Bib Apron",
    intro:
      "AHM's documented export article: a bib apron with an adjustable neck strap, waist ties and a divided pocket, built for a working kitchen or counter and the laundry after it.",
    summary:
      "A bib apron covers the chest and legs, hangs from a neck strap and ties at the waist. It is specified by finished length and width, bib height, neck strap type and adjustment, tie length, pocket layout, fabric and weight, and reinforcement at the stress points: pocket corners, strap attachments and tie anchors. AHM has documented export of poly-cotton bib aprons to the United States.",
    features: [
      t("Adjustable neck strap", "A slide buckle sets the bib height for each wearer; a fixed loop is simpler and fits fewer."),
      t("Divided patch pocket", "One pocket stitched into two or three compartments, or separate pockets, with bar-tacked corners."),
      t("Waist ties", "Long enough to wrap and tie at the front, anchored with reinforcement."),
      t("Cross-back option", "Straps that cross the back to take the weight off the neck."),
      t("Hemmed edges", "Double-turned hems all round, or binding."),
    ],
    measurements: [
      m("Overall length", "From the top of the bib to the bottom hem, at the centre."),
      m("Hem width", "Across the bottom hem."),
      m("Bib width", "Across the top of the bib."),
      m("Bib height", "From the top of the bib to the waist tie line."),
      m("Neck strap length", "Fully extended and fully shortened, for an adjustable strap."),
      m("Tie length", "From the apron edge to the tip of each tie."),
      m("Pocket size and position", "Pocket width and height, and its top edge from the waist line."),
    ],
    specification: [
      s("Fabric options", "65/35 poly-cotton twill, poly-cotton poplin, cotton canvas"),
      s("Typical weight", "195-280 gsm"),
      s("Strap", "Adjustable with slide buckle, fixed loop or cross-back"),
      s("Reinforcement", "Bar tacks at pocket corners, strap and tie attachments"),
    ],
    logoPositions: ["Centre bib", "Left chest of the bib", "On the pocket", "Lower front"],
    faqs: [
      q("What size is a standard bib apron?", "Many adult bib aprons are around 70-90 cm long and 60-75 cm wide, but specify finished length and width for your wearers rather than a standard."),
      q("How should apron pockets be reinforced?", "Bar tacks at each pocket corner and at the top of every divider, where the pocket takes its load."),
      q("Has AHM exported bib aprons before?", "Yes. AHM has documented FOB export of a poly-cotton bib apron to a United States uniform program."),
    ],
    seoTitle: "Bib Apron Manufacturer",
    seoDescription:
      "Bib aprons with adjustable neck straps and divided pockets, made to your specification in Karachi with documented FOB export to the United States.",
  },
  {
    slug: "waist-apron",
    family: "aprons",
    names: ["Three-Pocket Waist Apron", "Waist Apron"],
    title: "Waist Apron",
    intro:
      "The server's apron: tied at the waist, covering the legs, with pockets set for an order pad, a pen and a phone. Lighter than a bib apron and worn for a whole shift.",
    summary:
      "A waist apron (bistro or server apron) ties at the waist and covers from the waist down. It is specified by length (short server, knee or bistro to the shin), width, waistband and tie length, pocket layout and fabric. Its pockets are the reason it exists, so their size and position for what is carried matter most.",
    features: [
      t("Length", "Short (pocket apron), knee length, or long bistro to the shin."),
      t("Waistband", "A self-fabric band with ties, or webbing with a buckle."),
      t("Pocket layout", "Three or more pockets sized for order pads, pens, phones and card machines."),
      t("Pen slot", "A narrow pocket or divider for pens."),
    ],
    measurements: [
      m("Length", "From the top of the waistband to the hem."),
      m("Width", "Across the apron at the waistband."),
      m("Tie length", "From the apron edge to the tip of each tie."),
      m("Waistband depth", "Height of the band."),
      m("Pocket size and position", "Each pocket's width and height, and its top edge from the waistband."),
    ],
    specification: [
      s("Fabric options", "Poly-cotton twill, cotton canvas, denim"),
      s("Typical weight", "195-300 gsm"),
      s("Length", "Short, knee or bistro"),
      s("Ties", "Self-fabric or webbing, length to specification"),
    ],
    logoPositions: ["Lower front corner", "Centre front below the pockets", "On a pocket"],
    faqs: [
      q("What length should a waist apron be?", "Short pocket aprons suit bars and counters; knee and bistro lengths suit table service. Specify the finished length."),
      q("How many pockets does a server apron need?", "Commonly three: an order pad, a phone and a pen slot. Size each for what goes in it."),
      q("Can waist aprons be made in denim?", "Yes. Denim and canvas waist aprons are common in casual hospitality; they need a wash and shrinkage test like any denim."),
    ],
    seoTitle: "Waist Apron Manufacturer",
    seoDescription:
      "Waist, server and bistro aprons made to your specification in Karachi: length, waistband, ties, pocket layout and logo positions.",
  },

  /* -------------------------------- Woven Shirts -------------------------------- */
  {
    slug: "button-front-uniform-shirt",
    family: "woven-shirts",
    names: ["Button-Front Uniform Shirt"],
    title: "Button-Front Uniform Shirt",
    intro:
      "The corporate shirt: a fused collar, a buttoned front and a poplin or oxford that has to look pressed at the start of the shift and still look it at the end.",
    summary:
      "A button-front uniform shirt is specified by fabric, collar style and interlining, cuffs, placket, pockets, back details, seams, buttons and fit (classic, tailored or slim). Most corporate programs use poly-cotton poplin for crease resistance. The collar and placket carry the shirt's quality.",
    features: [
      t("Fused collar", "Interlining bonded to keep the collar crisp; collar stays for a sharper point."),
      t("Fit options", "Classic, tailored or slim blocks, with darts in the back for a closer fit."),
      t("Placket", "Sewn-on or French front."),
      t("Cuffs", "Barrel cuffs on long sleeves; short sleeves with a turn-up or hem."),
      t("Pocket", "None, one or two chest pockets."),
    ],
    measurements: [
      m("Collar size", "Along the band, button centre to buttonhole end."),
      m("Chest", "Measured flat, 2.5 cm below the armhole, doubled."),
      m("Waist", "At the narrowest point of the body for tailored fits."),
      m("Back length", "Centre back neck to hem."),
      m("Sleeve length", "Centre back neck to cuff edge."),
      m("Cuff circumference", "Buttoned, at the button used."),
    ],
    specification: [
      s("Fabric options", "Poly-cotton poplin, oxford, cotton twill"),
      s("Typical weight", "110-160 gsm"),
      s("Collar", "Fused, point, button-down or spread"),
      s("Fit", "Classic, tailored or slim"),
    ],
    logoPositions: ["Left chest", "On the pocket", "Collar point", "Cuff"],
    faqs: [
      q("Classic or tailored fit for a corporate shirt?", "Classic suits a wide range of wearers; tailored looks sharper but fits fewer. Many programs offer both."),
      q("Why do shirt collars bubble?", "The fused interlining has separated from the fabric, usually from poor fusing or laundering hotter than the fusing allows. Check on a washed sample."),
      q("Should a corporate shirt have a pocket?", "Front-desk and retail shirts often have none for a clean look; work shirts have one or two. It is a style decision."),
    ],
    seoTitle: "Uniform Shirt Manufacturer",
    seoDescription:
      "Button-front corporate and uniform shirts in poplin and oxford, made to your specification. Collar, fit, measurements and logo positions.",
  },

  /* ----------------------------------- Bottoms ---------------------------------- */
  {
    slug: "work-trouser",
    family: "bottoms",
    names: ["Uniform Work Trouser"],
    title: "Uniform Work Trouser",
    intro:
      "A work trouser built for kneeling, climbing and carrying: reinforced pockets, a strong crotch seam and a choice of leg lengths, in a fabric that holds up to the wash.",
    summary:
      "A uniform work trouser is specified by fabric and weight, waistband (fixed, elastic sides or adjustable), fly and closure, pocket layout, reinforcement and a measurement chart with several inseam lengths. Most fail at pocket corners, the crotch and the hem, so those are where the specification is most detailed.",
    features: [
      t("Waistband", "Fixed, with elastic side inserts, or adjustable tabs; belt loops sized for work belts."),
      t("Pockets", "Front slant or straight pockets, back patch or jetted pockets, cargo and rule pockets."),
      t("Reinforced crotch", "A gusset or a chainstitched, bar-tacked crotch seam."),
      t("Leg lengths", "Short, regular and long inseams in each waist size."),
      t("Knee options", "Double knees or knee-pad pockets for kneeling work."),
    ],
    measurements: [
      m("Waist", "Along the top of the waistband, fastened, doubled."),
      m("Hip", "Measured flat at the widest point, doubled."),
      m("Front rise", "From the crotch seam to the top of the waistband at the front."),
      m("Back rise", "From the crotch seam to the top of the waistband at the back."),
      m("Thigh", "Measured flat, 2.5 cm below the crotch."),
      m("Inseam", "From the crotch seam to the hem."),
      m("Leg opening", "Across the hem, doubled."),
    ],
    specification: [
      s("Fabric options", "Poly-cotton twill, cotton drill, canvas, stretch blends"),
      s("Typical weight", "200-320 gsm"),
      s("Waistband", "Fixed, elastic side or adjustable"),
      s("Inseams", "Short, regular and long to specification"),
    ],
    logoPositions: ["Left front thigh", "Back pocket", "Cargo pocket flap", "Back of the waistband"],
    faqs: [
      q("Do work trousers come in different leg lengths?", "They should. Short, regular and long inseams for each waist size are common; specify them in the measurement chart."),
      q("What is a gusset in work trousers?", "A diamond-shaped panel at the crotch that allows movement and takes stress off the seam."),
      q("Where should a logo go on work trousers?", "Most often the left front thigh or a pocket flap, where it stays visible and is not creased."),
    ],
    image: false,
    seoTitle: "Work Trouser Manufacturer",
    seoDescription:
      "Uniform work trousers in poly-cotton twill and drill, made to your specification. Waistband, pockets, reinforcement, inseams and measurements.",
  },
  {
    slug: "work-short",
    family: "bottoms",
    names: ["Uniform Work Short"],
    title: "Uniform Work Short",
    intro:
      "The warm-climate and summer-program partner to the work trouser: the same waistband and pockets, with the inseam and leg opening as the decisions that change.",
    summary:
      "A work short is specified like a work trouser with a short inseam: fabric and weight, waistband, fly, pocket layout and reinforcement, and the inseam length, which is often the question that divides wearers. Cargo and rule pockets are common, and a short often uses a lighter fabric than the trouser in the same program.",
    features: [
      t("Inseam", "From short to knee length; one or two lengths per program."),
      t("Leg opening", "Straight or slightly tapered, with a hem or a turn-up."),
      t("Cargo pockets", "Side pockets with flaps, bar-tacked."),
      t("Waistband", "Fixed, elastic sides or fully elasticated for some roles."),
    ],
    measurements: [
      m("Waist", "Along the top of the waistband, fastened, doubled."),
      m("Hip", "At the widest point, doubled."),
      m("Front rise", "Crotch seam to the top of the waistband at the front."),
      m("Inseam", "Crotch seam to hem."),
      m("Leg opening", "Across the hem, doubled."),
    ],
    specification: [
      s("Fabric options", "Poly-cotton twill, cotton drill, stretch blends"),
      s("Typical weight", "180-280 gsm"),
      s("Inseam", "To specification, one or two lengths"),
      s("Pockets", "Front, back, cargo or rule pockets"),
    ],
    logoPositions: ["Left front leg", "Cargo pocket flap", "Back pocket"],
    faqs: [
      q("What inseam should a work short have?", "It depends on the job and the wearers. Specify the finished inseam in centimetres or inches for each size rather than a name like 'mid-length'."),
      q("Can work shorts match the trousers exactly?", "Yes, cut from the same fabric lot and colour standard; a lighter weight saves cost but must be colour-matched to the trouser."),
      q("Are elasticated waistbands suitable for work shorts?", "For some roles, yes: they fit more wearers and suit active work. Fixed waistbands look smarter."),
    ],
    seoTitle: "Work Shorts Manufacturer",
    seoDescription:
      "Uniform work shorts in poly-cotton twill and drill, made to your specification in Karachi. Inseam, waistband, pockets and measurements.",
  },

  /* ---------------------------------- Outerwear --------------------------------- */
  {
    slug: "reflective-safety-vest",
    family: "outerwear",
    names: ["Reflective Safety Vest"],
    title: "Reflective Safety Vest",
    intro:
      "A vest whose purpose is to be seen. Sold as high-visibility workwear it is a certified product, so the standard is chosen first and everything else follows from it.",
    summary:
      "A reflective safety vest sold as high-visibility workwear must meet a standard such as EN ISO 20471 or ANSI/ISEA 107, which fixes the fluorescent background colour, the retroreflective tape, their areas and placement, and the garment's class. Certification applies to the finished vest. AHM builds the tape configuration to the buyer's nominated standard and qualifies the standard before quoting.",
    features: [
      t("Fluorescent background", "Yellow, orange or red fabric to the colour the standard defines."),
      t("Retroreflective tape", "Certified tape in bands around the body and over the shoulders."),
      t("Closure", "Hook and loop, zip or breakaway for roles near machinery."),
      t("Pockets", "Chest pockets, ID holder, radio loops."),
    ],
    measurements: [
      m("Chest", "Measured flat across the closed vest at the armhole, doubled."),
      m("Body length", "High point of shoulder to hem at front and back."),
      m("Tape width", "Width of each tape band."),
      m("Tape position", "Height of each horizontal band from the hem."),
      m("Armhole depth", "Shoulder to the bottom of the armhole."),
    ],
    specification: [
      s("Standard", "Buyer-nominated, e.g. EN ISO 20471 or ANSI/ISEA 107, qualified before quoting"),
      s("Background", "Fluorescent polyester to the standard's colour"),
      s("Tape", "Certified retroreflective tape"),
      s("Closure", "Hook and loop, zip or breakaway"),
    ],
    logoPositions: ["Left chest, outside the tape", "Back, between the tape bands"],
    faqs: [
      q("Does a safety vest need certification?", "If it is sold as high-visibility workwear, yes. The finished vest is certified to a standard such as EN ISO 20471 or ANSI/ISEA 107."),
      q("Can a logo be printed on a hi-vis vest?", "Yes, within limits: the standard sets the minimum visible area of background and tape, so a logo must not reduce them below it."),
      q("What is a breakaway vest?", "A vest that tears open at the shoulders and sides when pulled, so it does not drag the wearer into machinery."),
    ],
    seoTitle: "Hi-Vis Safety Vest Manufacturer",
    seoDescription:
      "Reflective safety vests built to the buyer's nominated hi-vis standard, such as EN ISO 20471 or ANSI/ISEA 107. Tape, closures, measurements and logos.",
  },
];
