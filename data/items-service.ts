import { m, q, s, t, type ProductItem } from "./item-helpers";

/**
 * Item pages for hospitality, denim, athleisure and womenswear. See
 * data/items.ts for the rules.
 */
export const itemsService: ProductItem[] = [
  /* ------------------------- Hospitality & Food Service ------------------------- */
  {
    slug: "chef-coat",
    family: "hospitality-food-service",
    names: ["Double-Breasted Chef Coat"],
    title: "Double-Breasted Chef Coat",
    intro:
      "The kitchen's signature garment: a reversible double-breasted front, a mandarin collar and a fabric that has to breathe at the stove and survive the laundry every day.",
    summary:
      "A double-breasted chef coat crosses over at the front so it can be buttoned either way and a stain hidden. It is specified by fabric (cotton or poly-cotton drill or twill), closures (knot buttons, press studs or removable studs), collar, sleeve length and cuff, pockets, ventilation and the cook's name and logo. An ordinary chef coat is not flame-resistant clothing.",
    features: [
      t("Reversible front", "Two rows of closures so the front can be switched to hide a stain."),
      t("Closures", "Cloth knot buttons, press studs or removable studs held by rings."),
      t("Mandarin collar", "A stand collar, plain or piped in a contrast colour."),
      t("Sleeve pocket", "A thermometer and pen pocket on the upper sleeve."),
      t("Ventilation", "Mesh back yoke or underarm panels for hot kitchens."),
    ],
    measurements: [
      m("Chest", "Measured flat, 2.5 cm below the armhole, fastened, doubled."),
      m("Body length", "High point of shoulder to hem at the front."),
      m("Sleeve length", "Centre back neck to cuff edge, with the cuff turned down."),
      m("Collar height", "At the centre back."),
      m("Front overlap", "Width of the double-breasted overlap, closure to closure."),
      m("Closure spacing", "Distance between rows and between closures."),
    ],
    specification: [
      s("Fabric options", "100% cotton drill or twill, poly-cotton 65/35 or cotton-rich 35/65"),
      s("Typical weight", "170-250 gsm"),
      s("Closures", "Knot buttons, press studs or removable studs"),
      s("Ventilation", "Mesh yoke or underarm panels, optional"),
    ],
    logoPositions: ["Left chest", "Name above the logo or opposite it", "Upper sleeve", "Collar"],
    faqs: [
      q("Knot buttons or press studs on a chef coat?", "Knot buttons are traditional and survive laundering; press studs are quicker to fasten; removable studs look smart but get lost in the wash. Choose with your laundry."),
      q("Can each chef's name be embroidered?", "Yes. Names are added per garment from a list, usually on the left chest above or beside the logo."),
      q("Is a mesh back worth it?", "In a hot kitchen, yes: a mesh yoke or underarm panels let heat out. It adds a seam and a second fabric to specify."),
    ],
    seoTitle: "Chef Coat Manufacturer",
    seoDescription:
      "Double-breasted chef coats in cotton and poly-cotton, made to your specification in Karachi. Closures, ventilation, measurements and name embroidery.",
  },
  {
    slug: "service-polo",
    family: "hospitality-food-service",
    names: ["Service Polo"],
    title: "Service Polo",
    intro:
      "The polo front-of-house staff wear through spills, service and commercial laundering. A soil-release finish and a colour that holds are worth more here than a premium hand.",
    summary:
      "A service polo is a uniform polo specified for hospitality: a pique or performance fabric that releases food soil, colour-fastness to frequent hot washing, a durable collar, and the venue's logo in a size guests can read. Soil-release finishes are confirmed by testing after a stated number of washes.",
    features: [
      t("Soil-release finish", "Helps oily stains wash out; its life is measured after a number of washes."),
      t("Performance pique", "Polyester or poly-blend pique that dries fast and holds colour."),
      t("Collar", "Flat-knit with a stiffener so it stays flat through laundering."),
      t("Colour matching", "Matched to aprons and shirts in the same program."),
    ],
    measurements: [
      m("Chest", "Measured flat, 2.5 cm below the armhole, doubled."),
      m("Body length", "High point of shoulder to front hem."),
      m("Sleeve length", "Shoulder point to sleeve edge."),
      m("Hem", "Front and back length difference for a tennis tail, if any."),
      m("Collar point", "Length of the collar point at the front."),
    ],
    specification: [
      s("Fabric options", "Polyester or poly-cotton pique, CVC pique"),
      s("Typical weight", "170-220 gsm"),
      s("Finish", "Soil-release subject to fabric and testing"),
      s("Laundering", "Colour-fastness to the venue's wash process"),
    ],
    logoPositions: ["Left chest", "Right chest, name or role", "Back neck", "Sleeve"],
    faqs: [
      q("What does soil release do?", "It helps oily food stains wash out instead of setting. It weakens with washing, so ask what the test measures and after how many washes."),
      q("Cotton or polyester for a service polo?", "Polyester and poly-blend pique dry faster, hold colour and release soil better; cotton is more breathable. Most hospitality programs use a blend."),
      q("Can service polos match the aprons?", "Yes, if colour is approved across both. A knit polo and a woven apron take dye differently, so they are approved side by side."),
    ],
    seoTitle: "Hospitality Polo Shirt Manufacturer",
    seoDescription:
      "Service polos for hospitality and food service with soil-release options, made to your specification. Fabric, laundering, measurements and logos.",
  },
  {
    slug: "front-desk-shirt",
    family: "hospitality-food-service",
    names: ["Front Desk Woven Shirt"],
    title: "Front Desk Woven Shirt",
    intro:
      "The shirt a guest sees first: a clean collar, an easy-care fabric that stays pressed through a long shift, and a cut that fits a team of different builds.",
    summary:
      "A front desk shirt is a woven uniform shirt chosen for appearance and easy care. It is specified by an easy-care poplin or twill, a fused collar, the fit (tailored or relaxed), sleeve length, pocket or no pocket, and a discreet logo. Tailored and relaxed blocks, and men's and women's cuts, let a whole team look consistent.",
    features: [
      t("Easy-care fabric", "Poly-cotton or a resin-finished cotton that resists creasing through a shift."),
      t("No pocket", "A clean front, common at reception and concierge desks."),
      t("Tailored or relaxed block", "Two fits so one shirt suits the whole team."),
      t("Contrast details", "Inner collar band or cuff lining in the brand colour."),
    ],
    measurements: [
      m("Collar size", "Along the band, button centre to buttonhole end."),
      m("Chest", "Measured flat, 2.5 cm below the armhole, doubled."),
      m("Waist", "At the narrowest point, for the tailored block."),
      m("Back length", "Centre back neck to hem."),
      m("Sleeve length", "Centre back neck to cuff edge."),
    ],
    specification: [
      s("Fabric options", "Easy-care poly-cotton poplin, cotton twill"),
      s("Typical weight", "110-150 gsm"),
      s("Fit", "Tailored and relaxed; men's and women's blocks"),
      s("Finish", "Easy-care, with tear strength checked after finishing"),
    ],
    logoPositions: ["Left chest, small", "Collar point", "Cuff"],
    faqs: [
      q("What makes a shirt easy-care?", "A poly-cotton blend, or cotton with a resin finish, so it creases less and needs little ironing. Resin finishes reduce cotton's strength, so check it."),
      q("Should front-desk shirts have a pocket?", "Usually not: a clean front looks smarter. Add one if staff need it for pens or cards."),
      q("Can the brand colour be added discreetly?", "Yes: contrast inner collar bands, cuff linings or buttonhole thread add colour without changing the shirt."),
    ],
    seoTitle: "Front Desk Uniform Shirt Maker",
    seoDescription:
      "Easy-care front desk and reception shirts for hotels and hospitality, made to your specification. Fabric, fit, measurements and discreet branding.",
  },

  /* ------------------------------------ Denim ----------------------------------- */
  {
    slug: "denim-work-shirt",
    family: "denim",
    names: ["Denim Work Shirt"],
    title: "Denim Work Shirt",
    intro:
      "A denim shirt that works: a lighter denim or chambray, twin chest pockets and felled seams, washed so it is soft from the first wear and does not shrink after it.",
    summary:
      "A denim work shirt is specified by its denim weight (usually light, around 6-8 oz per square yard) or a chambray, the wash, shrinkage after washing, pockets, closures, seams and topstitching thread. Indigo rubs off when new, so rub fastness matters for a shirt worn against lighter garments.",
    features: [
      t("Light denim or chambray", "Denim is a twill; chambray is a lighter plain weave with the same look."),
      t("Twin flap pockets", "With button or press-stud closures."),
      t("Felled seams", "Strong, flat seams with contrast or tonal topstitching."),
      t("Wash", "Rinse or enzyme wash so it is soft and pre-shrunk."),
      t("Snaps or buttons", "Pearl snaps for a western style, buttons for a classic one."),
    ],
    measurements: [
      m("Chest", "Measured flat, 2.5 cm below the armhole, doubled, after washing."),
      m("Body length", "High point of shoulder to hem."),
      m("Sleeve length", "Centre back neck to cuff edge."),
      m("Collar size", "Along the band."),
      m("Shrinkage", "Length and width change after the stated wash, measured on the garment."),
    ],
    specification: [
      s("Fabric options", "Light denim, chambray"),
      s("Typical weight", "5-8 oz/yd² (about 170-270 gsm)"),
      s("Wash", "Rinse or enzyme, against an approved reference"),
      s("Seams", "Felled, with topstitching thread to specification"),
    ],
    logoPositions: ["Left chest above the pocket", "On the pocket flap", "Centre back yoke"],
    faqs: [
      q("Denim or chambray for a work shirt?", "Denim is a twill and more durable; chambray is a lighter plain weave that looks similar and is cooler. Both suit uniform shirts."),
      q("Will a denim shirt stain other clothes?", "New indigo can rub off. A wash removes much of the loose dye; agree a rub fastness grade and test it."),
      q("Does a denim shirt shrink?", "Unwashed denim can. Sanforised fabric and a garment wash set the shrinkage before the shirt is measured and approved."),
    ],
    seoTitle: "Denim Work Shirt Manufacturer",
    seoDescription:
      "Denim and chambray work shirts made to your specification in Karachi. Weight, wash, shrinkage, pockets, measurements and logo positions.",
  },
  {
    slug: "denim-utility-jacket",
    family: "denim",
    names: ["Denim Utility Jacket"],
    title: "Denim Utility Jacket",
    intro:
      "A heavier denim jacket with a work jacket's pockets and a denim jacket's wash, where the hardware has to go through the wash with the fabric and come out intact.",
    summary:
      "A denim utility jacket is specified by denim weight (mid-weight, around 10-14 oz), the wash, shrinkage, pocket layout, zip or button front, hardware and its finish, collar, cuffs and lining. Washing is hard on zips, rivets and snaps, so hardware is approved after it has been through the wash on the sample.",
    features: [
      t("Mid-weight denim", "Heavy enough to protect and hold its shape, light enough to wear all day."),
      t("Hardware", "Zips, rivets and snaps chosen to survive the wash without rusting or marking the denim."),
      t("Panel seams", "Vertical seams with topstitching that define the jacket's look."),
      t("Rib or button cuffs", "Rib for a bomber style, buttoned cuffs for a trucker style."),
      t("Lining", "Unlined, blanket-lined or quilted."),
    ],
    measurements: [
      m("Chest", "Measured flat, 2.5 cm below the armhole, closed, after washing."),
      m("Body length", "High point of shoulder to hem."),
      m("Sleeve length", "Centre back neck to cuff."),
      m("Hem width", "Across the hem band."),
      m("Shrinkage", "Length and width change after the stated wash."),
    ],
    specification: [
      s("Fabric options", "Rigid or stretch denim, right-hand or broken twill"),
      s("Typical weight", "10-14 oz/yd² (about 340-475 gsm)"),
      s("Wash", "Rinse, enzyme or stone, against an approved reference"),
      s("Hardware", "Buyer-nominated, tested through the wash"),
    ],
    logoPositions: ["Left chest", "Centre back, large", "Sleeve", "Leather or woven patch"],
    faqs: [
      q("Why test hardware through the wash?", "Stone and enzyme washes abrade and can corrode metal, and metal can stain denim. Approve the hardware on a washed sample."),
      q("Can a denim jacket be embroidered after washing?", "Yes, and that is usual for logos, so the wash does not distort the embroidery. Large back designs are often done on the panel before assembly."),
      q("What denim weight suits a jacket?", "Around 10-14 oz per square yard is common. Heavier is tougher and stiffer; lighter is easier to wear."),
    ],
    seoTitle: "Denim Jacket Manufacturer",
    seoDescription:
      "Denim utility and trucker jackets made to your specification in Karachi. Denim weight, wash, hardware, measurements and logo positions.",
  },
  {
    slug: "denim-work-trouser",
    family: "denim",
    names: ["Denim Work Trouser"],
    title: "Denim Work Trouser",
    intro:
      "Work jeans and carpenter trousers: heavier denim, triple-needle seams, bar-tacked pockets and, often, a hammer loop and a rule pocket for the people who use them.",
    summary:
      "A denim work trouser is specified by denim weight (often 12-14 oz), stretch content, wash, shrinkage and leg twist, waistband and fly, pocket layout including tool pockets, seams and rivets, and inseam lengths. Shrinkage and twist are measured after the wash, and the pattern is adjusted for them.",
    features: [
      t("Heavy denim", "12-14 oz for durability, with or without a little stretch."),
      t("Triple-needle seams", "On the seat and inseam for strength."),
      t("Tool pockets", "Rule pocket and hammer loop on carpenter styles."),
      t("Rivets and bar tacks", "At pocket corners and stress points."),
      t("Leg twist control", "Broken twill or correct cutting so the side seam stays straight."),
    ],
    measurements: [
      m("Waist", "Along the top of the waistband, fastened, after washing."),
      m("Hip", "At the widest point, doubled."),
      m("Front and back rise", "From the crotch seam to the top of the waistband."),
      m("Thigh", "2.5 cm below the crotch."),
      m("Inseam", "Crotch seam to hem."),
      m("Leg twist", "How far the side seam moves round the leg after washing."),
    ],
    specification: [
      s("Fabric options", "Rigid or stretch denim"),
      s("Typical weight", "12-14 oz/yd² (about 405-475 gsm)"),
      s("Seams", "Chainstitch or triple-needle, felled inseam"),
      s("Hardware", "Shank button, rivets, zip fly"),
    ],
    logoPositions: ["Back pocket", "Waistband patch", "Front coin pocket"],
    faqs: [
      q("Rigid or stretch denim for work trousers?", "Rigid denim lasts longer; a little stretch makes kneeling and climbing easier but loses some recovery over many washes."),
      q("What is leg twist?", "The side seam rotating round the leg after washing, caused by the twill and yarn twist. Broken twill and correct cutting reduce it."),
      q("Do work jeans need rivets?", "Rivets reinforce pocket corners on traditional jeans. Bar tacks do the same job without metal, which some workplaces prefer."),
    ],
    seoTitle: "Denim Work Trouser Manufacturer",
    seoDescription:
      "Denim work trousers and carpenter jeans made to your specification. Weight, stretch, wash, shrinkage, tool pockets and measurements.",
  },

  /* --------------------------------- Athleisure --------------------------------- */
  {
    slug: "fleece-jogger",
    family: "athleisure",
    names: ["Fleece Jogger"],
    title: "Fleece Jogger",
    intro:
      "A tapered fleece trouser with cuffs at the ankle and elastic at the waist: simple to describe, and judged entirely on how the fabric and the waistband feel after washing.",
    summary:
      "A fleece jogger is specified by fabric (brushed fleece or French terry), weight, waistband (encased elastic with or without drawcord), pockets, leg taper and cuff, and seams. Knees bagging and waistbands twisting are the common complaints, and both are controlled through fabric, elastic and construction.",
    features: [
      t("Elastic waistband", "Encased elastic, sometimes stitched through so it does not roll, with an inner drawcord."),
      t("Rib ankle cuffs", "Rib with elastane, or an elastic channel."),
      t("Taper", "The leg narrows to the ankle; how much is a fit decision."),
      t("Pockets", "Side-seam or slant pockets, and a back or zip pocket."),
      t("Gusset", "A crotch gusset for movement in active styles."),
    ],
    measurements: [
      m("Waist relaxed", "Across the waistband, unstretched, doubled."),
      m("Waist stretched", "Across the waistband, fully stretched, doubled."),
      m("Hip", "At the widest point, doubled."),
      m("Front rise", "Crotch seam to the top of the waistband."),
      m("Inseam", "Crotch seam to the bottom of the cuff."),
      m("Ankle opening", "Across the cuff, relaxed."),
    ],
    specification: [
      s("Fabric options", "Brushed fleece, French terry"),
      s("Typical weight", "260-340 gsm"),
      s("Waistband", "Encased elastic, drawcord optional"),
      s("Cuffs", "Rib with elastane, or elastic channel"),
    ],
    logoPositions: ["Left thigh", "Down the side of the leg", "Back pocket", "Waistband"],
    faqs: [
      q("Why do joggers bag at the knee?", "The fabric stretches and does not recover. A heavier fabric, a tighter knit and a little elastane help; check a washed sample."),
      q("Why does a jogger waistband twist?", "Elastic rolls inside its channel. Stitching through the elastic, or a wider elastic, stops it."),
      q("Fleece or French terry for joggers?", "Fleece is warmer and softer inside; French terry is lighter for warmer weather."),
    ],
    seoTitle: "Fleece Jogger Manufacturer",
    seoDescription:
      "Fleece and French terry joggers made to your specification in Karachi. Waistband, cuffs, taper, measurements and print positions.",
  },
  {
    slug: "lounge-pant",
    family: "athleisure",
    names: ["Lounge Pant"],
    title: "Lounge Pant",
    intro:
      "A relaxed, wide-leg trouser for home and leisure, in a soft knit or a printed or yarn-dyed check, where the drape and the hand feel are the specification.",
    summary:
      "A lounge pant is specified by fabric (jersey, interlock, brushed knit, or a woven such as flannel), pattern (printed or yarn-dyed), weight, waistband and drawcord, leg shape and pockets. A printed check is cheaper; a yarn-dyed check is woven or knitted in, wears better and costs more.",
    features: [
      t("Wide straight leg", "A relaxed leg with a plain hem."),
      t("Knitted waistband", "A wide soft band with elastic inside and a drawcord."),
      t("Printed or yarn-dyed pattern", "Printed is cheaper and flexible; yarn-dyed lasts and looks the same inside."),
      t("Side-seam pockets", "Hidden pockets in the side seams."),
    ],
    measurements: [
      m("Waist relaxed", "Across the waistband, unstretched, doubled."),
      m("Waist stretched", "Fully stretched, doubled."),
      m("Hip", "At the widest point, doubled."),
      m("Inseam", "Crotch seam to hem."),
      m("Leg opening", "Across the hem, doubled."),
    ],
    specification: [
      s("Fabric options", "Jersey, interlock, brushed knit, cotton flannel"),
      s("Typical weight", "180-280 gsm"),
      s("Pattern", "Printed or yarn-dyed to approved artwork"),
      s("Waistband", "Knitted band with elastic and drawcord"),
    ],
    logoPositions: ["Left hip", "Waistband", "Woven label at the hem"],
    faqs: [
      q("Printed or yarn-dyed check for lounge pants?", "A printed check is cheaper and allows any design; a yarn-dyed check is built into the fabric and keeps its look as it wears."),
      q("Knit or woven for lounge pants?", "Knits stretch and feel soft; woven flannel looks classic and does not stretch. Both are common."),
      q("How is pattern matching handled at seams?", "Checks can be matched at the side and centre seams when cutting, which uses more fabric. Specify whether matching is required."),
    ],
    seoTitle: "Lounge Pant Manufacturer",
    seoDescription:
      "Lounge pants in soft knits and flannel, printed or yarn-dyed, made to your specification. Waistband, leg, measurements and pattern matching.",
  },
  {
    slug: "performance-hoodie",
    family: "athleisure",
    names: ["Performance Hoodie"],
    title: "Performance Hoodie",
    intro:
      "A hoodie for training and active wear: a lighter polyester or blended knit with stretch, flat seams and features like thumbholes, where the claims on the label need tests behind them.",
    summary:
      "A performance hoodie is specified by its knit (polyester or blend, often with elastane), weight, seam type (flatlock against the skin), hood fit, zip or pullover, and any performance claim such as moisture-wicking, which needs a test. It is lighter and closer fitting than a fleece hoodie.",
    features: [
      t("Performance knit", "Polyester or poly-blend with elastane for stretch and quick drying."),
      t("Flatlock seams", "Flat seams that do not rub during movement."),
      t("Fitted hood", "Scuba-style or close-fitting so it stays on while moving."),
      t("Thumbholes", "Extended cuffs with thumbholes."),
      t("Reflective details", "Small reflective prints for running in low light, not a hi-vis claim."),
    ],
    measurements: [
      m("Chest", "Measured flat, 2.5 cm below the armhole, doubled."),
      m("Body length", "High point of shoulder to hem."),
      m("Sleeve length", "Centre back neck to cuff, including any thumbhole extension."),
      m("Hood opening", "Around the face opening, laid flat."),
      m("Hem width", "Across the hem, relaxed."),
    ],
    specification: [
      s("Fabric options", "Polyester or poly-blend knit with elastane, brushed-back performance knit"),
      s("Typical weight", "200-300 gsm"),
      s("Seams", "Flatlock or overlock with coverstitch"),
      s("Claims", "Moisture management only with a test result, e.g. AATCC 195"),
    ],
    logoPositions: ["Left chest", "Upper back", "Sleeve", "Hood side"],
    faqs: [
      q("What makes a hoodie a performance hoodie?", "A polyester-rich stretch knit that dries fast, flat seams and an active fit. Claims such as moisture-wicking need a test result."),
      q("Can a performance hoodie be sublimated?", "Yes, if the fabric is high in polyester and light in colour. Sublimation dyes the fibre and does not crack."),
      q("Why use flatlock seams?", "They are flat on both sides, so they do not rub skin during movement."),
    ],
    seoTitle: "Performance Hoodie Manufacturer",
    seoDescription:
      "Performance hoodies in stretch polyester knits with flatlock seams, made to your specification. Fabric, fit, claims, measurements and logos.",
  },
  {
    slug: "sleeveless-hoodie",
    family: "athleisure",
    names: ["Sleeveless Hoodie"],
    title: "Sleeveless Hoodie",
    intro:
      "A hoodie with the sleeves cut away for gym and summer wear, where the armhole finish decides whether it looks deliberate or looks cut off.",
    summary:
      "A sleeveless hoodie is specified by fabric and weight, armhole cut (regular or dropped) and finish (bound, ribbed or raw-cut), hood, pocket and hem. The armhole is the defining detail: a bound or ribbed armhole holds its shape, while a raw cut is a style choice that curls.",
    features: [
      t("Armhole finish", "Bound with self fabric, finished with rib, or raw cut."),
      t("Dropped armhole", "A deep armhole for a gym look."),
      t("Hood", "Single layer for a light feel, with or without cord."),
      t("Kangaroo pocket", "Optional front pouch."),
    ],
    measurements: [
      m("Chest", "Measured flat, 2.5 cm below the armhole, doubled."),
      m("Body length", "High point of shoulder to hem."),
      m("Armhole depth", "From the shoulder seam to the bottom of the armhole, straight down."),
      m("Shoulder width", "Across the shoulder strap at the seam."),
      m("Hood height", "Neck seam to the top of the hood."),
    ],
    specification: [
      s("Fabric options", "French terry, light fleece, jersey"),
      s("Typical weight", "200-300 gsm"),
      s("Armhole", "Bound, ribbed or raw cut; regular or dropped"),
      s("Hood", "Single layer, cord optional"),
    ],
    logoPositions: ["Full front", "Left chest", "Full back"],
    faqs: [
      q("How should a sleeveless hoodie armhole be finished?", "Binding or rib keeps the edge from stretching and curling; a raw cut is a deliberate style that will curl."),
      q("What fabric suits a sleeveless hoodie?", "Lighter French terry or jersey, since it is worn in warm conditions."),
      q("How deep should the armhole be?", "A regular armhole looks neat; a dropped one gives a gym look. Specify the depth in the measurement chart."),
    ],
    seoTitle: "Sleeveless Hoodie Manufacturer",
    seoDescription:
      "Sleeveless hoodies for gym and summer programs, made to your specification. Armhole finish, fabric, hood, measurements and print positions.",
  },

  /* --------------------------------- Womenswear --------------------------------- */
  {
    slug: "womens-polo",
    family: "womenswear",
    names: ["Women's Polo"],
    title: "Women's Polo",
    intro:
      "A polo cut on a women's block: shaped through the side seam, with a shorter sleeve, a narrower shoulder and a placket made to sit properly, rather than a smaller men's polo.",
    summary:
      "A women's polo is specified with its own pattern and measurement chart: shaped side seams, a narrower shoulder and shorter sleeve, a placket that may be shorter or open, and often a curved or vented hem. It matches the men's polo in fabric, colour and logo, but not in cut.",
    features: [
      t("Shaped side seams", "Curved in at the waist rather than straight."),
      t("Placket", "Shorter, with fewer or smaller buttons, or an open V placket."),
      t("Cap or short sleeve", "A shorter sleeve with a narrower opening."),
      t("Hem", "Curved or with side vents to sit at the hip."),
    ],
    measurements: [
      m("Bust", "Measured flat, 2.5 cm below the armhole, doubled."),
      m("Waist", "At the narrowest point of the shaping, doubled."),
      m("Hip", "At the hem or widest point, doubled."),
      m("Body length", "High point of shoulder to front hem."),
      m("Across shoulder", "Shoulder point to shoulder point."),
      m("Sleeve length", "Shoulder point to sleeve edge."),
    ],
    specification: [
      s("Fabric options", "Cotton or CVC pique, performance pique, with or without elastane"),
      s("Typical weight", "170-220 gsm"),
      s("Block", "Women's pattern with its own grading"),
      s("Placket", "Short button placket or open V"),
    ],
    logoPositions: ["Left chest, placed higher than on a men's polo", "Sleeve", "Back neck"],
    faqs: [
      q("Why is the logo placed differently on a women's polo?", "A left-chest logo placed for a men's polo can sit too low on a women's one. Position is measured from the shoulder on each block."),
      q("Should a women's polo have stretch?", "A little elastane in the pique helps a shaped polo fit and move. It is optional and should be tested for recovery."),
      q("Can men's and women's polos match?", "In fabric, colour and logo, yes. The cut differs by design."),
    ],
    seoTitle: "Women's Polo Shirt Manufacturer",
    seoDescription:
      "Women's polo shirts cut on a women's block, made to your specification in Karachi. Shaping, placket, measurements and logo placement.",
  },
  {
    slug: "womens-tee",
    family: "womenswear",
    names: ["Women's Tee"],
    title: "Women's Tee",
    intro:
      "A T-shirt shaped for women: a fitted or relaxed body, a scoop, crew or V neck, and a sleeve that suits the cut, in a jersey soft enough to wear all day.",
    summary:
      "A women's tee is specified by jersey fabric and weight, fit (fitted, regular or relaxed), neckline (crew, scoop or V), sleeve (short, cap or long), shaping and hem. Elastane in the jersey helps a fitted tee keep its shape; a relaxed tee usually does without.",
    features: [
      t("Neckline", "Crew, scoop or V, each with its own rib or binding."),
      t("Fit", "Fitted with side shaping, regular, or relaxed and boxy."),
      t("Sleeve", "Cap, short or long, set-in or raglan."),
      t("Elastane", "Single jersey with elastane for a fitted shape."),
    ],
    measurements: [
      m("Bust", "Measured flat, 2.5 cm below the armhole, doubled."),
      m("Waist", "At the narrowest point, for fitted styles."),
      m("Body length", "High point of shoulder to hem."),
      m("Neck width", "Seam to seam across the neck."),
      m("Front neck drop", "Depth of the neckline from the high point of the shoulder."),
      m("Sleeve length", "Shoulder point to sleeve hem."),
    ],
    specification: [
      s("Fabric options", "Cotton or blended single jersey, with or without elastane"),
      s("Typical weight", "140-190 gsm"),
      s("Neckline", "Crew, scoop or V"),
      s("Fit", "Fitted, regular or relaxed"),
    ],
    logoPositions: ["Left chest", "Centre front", "Upper back", "Sleeve"],
    faqs: [
      q("Fitted or relaxed for a women's uniform tee?", "Many programs offer both, so wearers can choose. A relaxed fit suits more body shapes with one pattern."),
      q("Does a women's tee need elastane?", "A fitted tee keeps its shape better with a little elastane; a relaxed tee does not need it."),
      q("Which neckline suits a uniform tee?", "Crew necks are the most practical and modest; scoop and V necks are more casual. Choose for the role."),
    ],
    seoTitle: "Women's T-Shirt Manufacturer",
    seoDescription:
      "Women's T-shirts in fitted, regular and relaxed cuts, made to your specification. Jersey, neckline, sleeve, measurements and print positions.",
  },
  {
    slug: "womens-hoodie",
    family: "womenswear",
    names: ["Women's Hoodie"],
    title: "Women's Hoodie",
    intro:
      "A hoodie cut for women: a shorter body or a cropped option, a narrower shoulder and sleeve, and a hood sized in proportion, so it fits rather than swamps.",
    summary:
      "A women's hoodie is specified on a women's block with its own chest, length, shoulder and sleeve, and a hood scaled to it. Fit options run from regular to cropped and oversized. Fabric, weight and trims are chosen as for any hoodie, and matched to the men's style in colour and logo.",
    features: [
      t("Women's block", "Narrower shoulder, shorter sleeve and a shaped or straight body."),
      t("Length options", "Regular, cropped or longline."),
      t("Hood in proportion", "Hood height and width scaled to the block."),
      t("Rib waist or open hem", "Rib waistband, or an open hem with a drawcord."),
    ],
    measurements: [
      m("Bust", "Measured flat, 2.5 cm below the armhole, doubled."),
      m("Body length", "High point of shoulder to hem; cropped styles measured the same way."),
      m("Across shoulder", "Shoulder point to shoulder point."),
      m("Sleeve length", "Centre back neck to cuff."),
      m("Hood height", "Neck seam to top of hood."),
      m("Hem width", "Across the hem, relaxed."),
    ],
    specification: [
      s("Fabric options", "Brushed fleece, French terry"),
      s("Typical weight", "260-340 gsm"),
      s("Fit", "Regular, cropped or oversized"),
      s("Hood", "Scaled to the women's block"),
    ],
    logoPositions: ["Full front", "Left chest", "Upper back", "Sleeve"],
    faqs: [
      q("Is a women's hoodie just a smaller men's hoodie?", "It should not be. A women's block changes the shoulder, sleeve and body proportions, not just the size."),
      q("Can a women's hoodie be cropped?", "Yes, as a separate length option. Logo placement is checked so it sits above the cropped hem."),
      q("Should men's and women's hoodies use the same fabric?", "Usually yes, so the colour and handle match across the program."),
    ],
    seoTitle: "Women's Hoodie Manufacturer",
    seoDescription:
      "Women's hoodies on a women's block, regular, cropped or oversized, made to your specification. Fabric, fit, measurements and print positions.",
  },
  {
    slug: "womens-woven-shirt",
    family: "womenswear",
    names: ["Women's Woven Shirt"],
    title: "Women's Woven Shirt",
    intro:
      "A woven shirt or blouse with darts or princess seams that shape it to the body, buttons on the women's side, and a collar and sleeve chosen for the role.",
    summary:
      "A women's woven shirt is specified on a women's block with bust darts or princess seams, a waist, a collar (shirt, open or stand), sleeve length, button side and fabric. Gaping between buttons at the bust is the classic fault; button spacing and the bust measurement fix it.",
    features: [
      t("Darts or princess seams", "Shape the shirt through the bust and waist."),
      t("Button side", "Conventionally right over left, buttons on the wearer's left."),
      t("Button spacing", "A button at the bust line to stop gaping."),
      t("Collar", "Shirt collar, open revere collar or stand collar."),
      t("Sleeve", "Long with cuffs, three-quarter or short."),
    ],
    measurements: [
      m("Bust", "Measured flat across the bust point, doubled."),
      m("Waist", "At the narrowest point, doubled."),
      m("Hip", "At the hem or widest point, doubled."),
      m("Back length", "Centre back neck to hem."),
      m("Across shoulder", "Shoulder point to shoulder point."),
      m("Sleeve length", "Shoulder point to cuff edge."),
    ],
    specification: [
      s("Fabric options", "Poly-cotton poplin, stretch poplin, twill"),
      s("Typical weight", "100-150 gsm"),
      s("Shaping", "Bust darts, waist darts or princess seams"),
      s("Collar", "Shirt, open revere or stand"),
    ],
    logoPositions: ["Left chest, measured for the women's block", "Collar", "Cuff"],
    faqs: [
      q("Why do women's shirts gape at the bust?", "The bust measurement or button spacing is wrong. A button placed at the bust line and enough ease across the bust prevent it."),
      q("Darts or princess seams?", "Both shape the shirt. Princess seams run from the shoulder or armhole and give a closer fit; darts are simpler."),
      q("Does a women's shirt need stretch?", "A little elastane in the poplin helps a fitted shirt move. It is optional."),
    ],
    seoTitle: "Women's Uniform Shirt Manufacturer",
    seoDescription:
      "Women's woven uniform shirts and blouses with darts or princess seams, made to your specification. Fabric, fit, measurements and logos.",
  },
];
