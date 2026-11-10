import { m, q, s, t, type ProductItem } from "./item-helpers";

/**
 * Item pages for kidswear, medical scrubs, caps and headwear, and bags and
 * totes. See data/items.ts for the rules. Children's items name the safety
 * questions rather than answering them for every market: the destination
 * decides, and the infant articles carry a qualification status.
 */
export const itemsSpecialist: ProductItem[] = [
  /* ---------------------------------- Kidswear ---------------------------------- */
  {
    slug: "infant-bodysuit",
    family: "kidswear",
    names: ["Infant Bodysuit"],
    title: "Infant Bodysuit",
    intro:
      "The first garment most babies wear: a soft jersey bodysuit with an envelope neck and press studs at the crotch, where every fastening is a safety question before it is a design one.",
    summary:
      "An infant bodysuit is specified by its fabric (soft cotton jersey or interlock, often rib), the envelope or lap shoulder neck that lets it go over a baby's head, the crotch fastening (press studs), sleeve length, sizes by age and weight, and labels. Press studs are small parts, so their material and attachment strength are tested to the destination market's requirements.",
    features: [
      t("Envelope neck", "Overlapping shoulder panels so the neck opens wide over the head."),
      t("Crotch press studs", "Nickel-free studs, attached to pass a pull test."),
      t("Soft seams", "Flat or coverstitched seams that do not rub."),
      t("Printed labels", "Tagless printed labels where the market's labelling rules allow."),
      t("Sizes by age", "Newborn to 24 months, with weight and height on the size chart."),
    ],
    measurements: [
      m("Chest", "Measured flat under the arms, doubled."),
      m("Body length", "High point of shoulder to the crotch edge."),
      m("Neck opening stretched", "Around the neck fully stretched, to check it passes over the head."),
      m("Leg opening", "Around each leg opening, relaxed and stretched."),
      m("Sleeve length", "Shoulder point to sleeve hem."),
      m("Press stud pull strength", "Tested to the method the destination market sets."),
    ],
    specification: [
      s("Fabric options", "Cotton jersey, interlock or rib"),
      s("Typical weight", "160-220 gsm"),
      s("Fastening", "Nickel-free press studs, pull-tested"),
      s("Safety", "Qualified against the destination market's requirements before development"),
    ],
    logoPositions: ["Centre front print", "Small chest print", "Printed neck label"],
    faqs: [
      q("Why do infant bodysuits have an envelope neck?", "The overlapping shoulders let the neck stretch wide enough to pass over a baby's head without pulling."),
      q("Are press studs safe on baby clothes?", "They are small parts, so they must be firmly attached and free of harmful metals. They are pull-tested to the method the market requires, on samples and production."),
      q("What sizes do infant bodysuits come in?", "Usually by age from newborn to 24 months, with weight and height ranges given on the size chart because ages vary."),
    ],
    seoTitle: "Infant Bodysuit Manufacturer",
    seoDescription:
      "Infant bodysuits in soft cotton jersey with envelope necks and press studs, developed against your market's safety requirements. Specification and sizes.",
  },
  {
    slug: "printed-bodysuit",
    family: "kidswear",
    names: ["Printed Bodysuit"],
    title: "Printed Bodysuit",
    intro:
      "A bodysuit carrying a print or a message, where the ink matters as much as the design: it sits against a baby's skin and is often in a baby's mouth.",
    summary:
      "A printed bodysuit is specified like a plain one, with the print added: its method (water-based screen print, plastisol or transfer), size and position, and the ink system's compliance with the market's limits on lead and restricted substances. A soft, flexible print that does not crack or peel matters on a garment stretched over a head.",
    features: [
      t("Water-based inks", "Soft prints that become part of the fabric's surface."),
      t("Print size and stretch", "Kept clear of the neck opening, so stretching does not crack it."),
      t("Ink compliance", "Inks chosen for lead and restricted-substance limits, with test evidence."),
      t("Wash durability", "Tested for cracking and fading after washing."),
    ],
    measurements: [
      m("Print width and height", "At the base size, with how it scales by size."),
      m("Print position", "From the high point of the shoulder to the top of the print."),
      m("Neck opening stretched", "Fully stretched, with the print checked for cracking."),
      m("Body length", "High point of shoulder to crotch edge."),
      m("Chest", "Measured flat under the arms, doubled."),
    ],
    specification: [
      s("Fabric options", "Cotton jersey or interlock"),
      s("Print method", "Water-based screen print or soft transfer"),
      s("Ink", "Tested for lead and restricted substances for the market"),
      s("Safety", "Qualified against the destination market's requirements before development"),
    ],
    logoPositions: ["Centre front", "Back", "Small chest print"],
    faqs: [
      q("Which print method suits baby clothes?", "Water-based screen printing gives a soft print; soft transfers also work. Thick, heavy prints are less suitable on infant wear."),
      q("Do baby clothes prints need testing?", "Yes. In the US, children's products are tested for lead in surface coatings, and other markets restrict substances in inks. Ask for the evidence."),
      q("Why keep prints away from the neck?", "The neck stretches widely when the bodysuit goes over the head, which can crack a print near it."),
    ],
    seoTitle: "Printed Baby Bodysuit Manufacturer",
    seoDescription:
      "Printed baby bodysuits with soft, tested inks, developed against your market's safety requirements. Print method, placement and specification.",
  },
  {
    slug: "kids-tee",
    family: "kidswear",
    names: ["Kids' Tee"],
    title: "Kids' Tee",
    intro:
      "A children's T-shirt sized by age, made to be pulled on and off by small hands and washed constantly, with a neck that opens wide enough and stays in shape.",
    summary:
      "A kids' tee is specified by jersey fabric and weight, sizes by age, a neck opening large enough to pass over the head, rib neck with recovery, seams and hems, prints and labels, and the destination market's children's product requirements. Kids' sizes need their own size chart, not a scaled-down adult one.",
    features: [
      t("Neck opening", "Wide enough to pass over the head when stretched, with a lap or rib neck."),
      t("Sizes by age", "Toddler and youth ranges, with height and chest on the chart."),
      t("Durable print", "Soft, tested inks that survive washing."),
      t("Printed labels", "Tagless where allowed, with tracking marks where required."),
    ],
    measurements: [
      m("Chest", "Measured flat, 2.5 cm below the armhole, doubled."),
      m("Body length", "High point of shoulder to hem."),
      m("Sleeve length", "Shoulder point to sleeve hem."),
      m("Neck opening stretched", "Fully stretched, to check it passes over the head."),
      m("Neck rib height", "Depth of the rib band."),
    ],
    specification: [
      s("Fabric options", "Cotton or CVC single jersey"),
      s("Typical weight", "140-180 gsm"),
      s("Sizes", "By age, from toddler to youth, to the buyer's chart"),
      s("Safety", "To the destination market's children's product requirements"),
    ],
    logoPositions: ["Centre front", "Left chest", "Back", "Sleeve"],
    faqs: [
      q("How are kids' T-shirts sized?", "By age, with height and chest measurements on the chart, because children of one age vary. Use a kids' chart, not a scaled adult one."),
      q("Do kids' T-shirts need safety testing?", "In the US, children's products need third-party testing and a Children's Product Certificate. Other markets have their own rules."),
      q("What weight suits a kids' tee?", "Around 140-180 gsm is common: light enough to be comfortable, heavy enough to last."),
    ],
    seoTitle: "Kids T-Shirt Manufacturer",
    seoDescription:
      "Children's T-shirts sized by age, made to your specification against your market's children's product rules. Fabric, neck, sizing and prints.",
  },

  /* ------------------------------- Medical Scrubs ------------------------------- */
  {
    slug: "scrub-top",
    family: "medical-scrubs",
    names: ["V-Neck Scrub Top"],
    title: "V-Neck Scrub Top",
    intro:
      "The working half of a scrub set: a V-neck top with pockets placed for pens, a phone and a stethoscope, in a fabric that comes back from a hot wash in the same colour.",
    summary:
      "A scrub top is specified by fabric and weight, neckline (V-neck or mock wrap), sleeve (set-in or raglan), pocket layout, side vents, fit, sizes and colour. Pockets are what wearers judge it by, and colour-fastness to the hospital's wash is what the buyer judges it by.",
    features: [
      t("V-neck", "Bound or faced V-neck; a mock wrap is a common women's style."),
      t("Pockets", "Chest pocket with pen slots, lower patch pockets, and sometimes a sleeve pocket."),
      t("Side vents", "Short vents for movement and to sit over trousers."),
      t("Badge loop", "A loop or tab for an ID badge."),
    ],
    measurements: [
      m("Chest", "Measured flat, 2.5 cm below the armhole, doubled."),
      m("Body length", "High point of shoulder to hem."),
      m("Sleeve length", "Shoulder point to sleeve hem."),
      m("V-neck depth", "From the high point of the shoulder to the bottom of the V."),
      m("Pocket position", "Top of each pocket from the high point of the shoulder."),
      m("Vent length", "Height of each side vent."),
    ],
    specification: [
      s("Fabric options", "Poly-cotton, polyester-viscose with elastane, cotton"),
      s("Typical weight", "130-200 gsm"),
      s("Neckline", "V-neck or mock wrap"),
      s("Pockets", "Chest, lower and sleeve pockets to specification"),
    ],
    logoPositions: ["Left chest", "Name and role above the pocket", "Sleeve"],
    faqs: [
      q("How many pockets should a scrub top have?", "Commonly a chest pocket with pen slots and one or two lower pockets. Ask wearers what they carry and size the pockets for it."),
      q("V-neck or mock wrap?", "A V-neck is the classic unisex style; a mock wrap gives a shaped women's look. Many programs offer both."),
      q("Can names be embroidered on scrub tops?", "Yes, per garment from a list, usually on the left chest."),
    ],
    seoTitle: "Scrub Top Manufacturer",
    seoDescription:
      "V-neck and mock-wrap scrub tops made to your specification in Karachi. Fabric for hospital laundering, pockets, measurements and embroidery.",
  },
  {
    slug: "scrub-trouser",
    family: "medical-scrubs",
    names: ["Drawcord Scrub Trouser"],
    title: "Drawcord Scrub Trouser",
    intro:
      "Scrub trousers in petite, regular and tall lengths, with a drawcord or elastic waist and a cargo pocket, built to stand, kneel and bend all shift.",
    summary:
      "A scrub trouser is specified by fabric and weight, waistband (drawcord, elastic or both), leg (straight or jogger), pockets, crotch reinforcement, and sizes in several inseam lengths. Inseam options matter more than for most trousers, because scrubs are worn by a wide range of heights from one program.",
    features: [
      t("Waistband", "Drawcord, elastic or a combination, sometimes with a yoke."),
      t("Leg", "Straight leg or jogger with cuffs."),
      t("Cargo pocket", "On one or both legs, with pen and phone sections."),
      t("Three inseams", "Petite, regular and tall."),
    ],
    measurements: [
      m("Waist relaxed", "Across the waistband, relaxed, doubled."),
      m("Hip", "At the widest point, doubled."),
      m("Front rise", "Crotch seam to top of waistband."),
      m("Inseam", "Crotch seam to hem, for each length."),
      m("Leg opening", "Across the hem, doubled."),
    ],
    specification: [
      s("Fabric options", "Poly-cotton, polyester-viscose with elastane"),
      s("Typical weight", "130-200 gsm"),
      s("Waistband", "Drawcord, elastic or combination"),
      s("Lengths", "Petite, regular and tall inseams"),
    ],
    logoPositions: ["Left thigh", "Cargo pocket", "Back waistband"],
    faqs: [
      q("Why do scrub trousers come in petite and tall?", "Scrubs are worn by everyone in a department from one program, so three inseams let one size fit a much wider range of heights."),
      q("Drawcord or elastic waist?", "Drawcords adjust precisely; elastic is quicker. Many styles combine both."),
      q("Straight leg or jogger scrubs?", "Straight legs are traditional; joggers with cuffs keep hems off the floor. It is a style choice."),
    ],
    seoTitle: "Scrub Trouser Manufacturer",
    seoDescription:
      "Scrub trousers with drawcord or elastic waists in petite, regular and tall lengths, made to your specification. Fabric, pockets and measurements.",
  },
  {
    slug: "lab-coat",
    family: "medical-scrubs",
    names: ["Lab Coat"],
    title: "Lab Coat",
    intro:
      "A knee-length white or coloured coat for clinics, laboratories and pharmacies: a notched collar, a button or press-stud front and pockets for the instruments of the job.",
    summary:
      "A lab coat is specified by fabric (poly-cotton twill or poplin), length, collar, closure, pockets, back vent or belt, and laundering. A lab coat is general workwear; one that must resist chemicals or fluids is protective equipment with its own standard, and is specified and tested as such.",
    features: [
      t("Notched collar", "A tailored collar and lapels."),
      t("Closure", "Buttons or press studs; press studs suit hot laundering."),
      t("Three pockets", "A chest pocket and two lower pockets, sometimes with an inner pocket."),
      t("Back vent or half belt", "For movement and a tailored back."),
      t("Knit cuffs option", "Rib cuffs inside the sleeve for lab work."),
    ],
    measurements: [
      m("Chest", "Measured flat, 2.5 cm below the armhole, closed, doubled."),
      m("Back length", "Centre back neck to hem."),
      m("Sleeve length", "Centre back neck to cuff."),
      m("Across shoulder", "Shoulder point to shoulder point."),
      m("Pocket positions", "Top of each pocket from the high point of the shoulder."),
    ],
    specification: [
      s("Fabric options", "Poly-cotton twill or poplin, cotton twill"),
      s("Typical weight", "150-220 gsm"),
      s("Length", "Hip, thigh or knee"),
      s("Protection", "Only to a buyer-nominated standard, with test evidence"),
    ],
    logoPositions: ["Left chest", "Name above the pocket", "Sleeve"],
    faqs: [
      q("Is a lab coat protective clothing?", "A standard lab coat is workwear. One that must resist chemicals or fluids is protective equipment, made and tested to a named standard."),
      q("Buttons or press studs on a lab coat?", "Press studs survive hot laundering and let the coat open quickly; buttons look more traditional."),
      q("What length should a lab coat be?", "Knee length is traditional for labs and clinics; shorter consultation coats are common too. Specify the back length."),
    ],
    seoTitle: "Lab Coat Manufacturer",
    seoDescription:
      "Lab coats for clinics, laboratories and pharmacies, made to your specification in Karachi. Fabric, length, closures, pockets and measurements.",
  },

  /* ------------------------------ Caps & Headwear ------------------------------- */
  {
    slug: "six-panel-cap",
    family: "caps-headwear",
    names: ["Structured Six-Panel Cap", "Structured Uniform Cap"],
    title: "Structured Six-Panel Cap",
    intro:
      "The uniform baseball cap: six panels, a buckram-backed front that holds a logo upright, a curved peak and an adjustable back that fits most heads in one size.",
    summary:
      "A structured six-panel cap is specified by fabric, profile and crown height, buckram front, peak shape and stiffener, closure, sweatband, eyelets and decoration. The structured front gives embroidery a firm, upright surface, which is why it is the standard uniform cap.",
    features: [
      t("Buckram front", "A stiff lining behind the two front panels."),
      t("Profile", "High, mid or low crown."),
      t("Pre-curved peak", "With a stiffener that survives washing."),
      t("Adjustable back", "Strap and buckle, hook and loop or snapback."),
      t("Sewn eyelets", "Six eyelets for ventilation."),
    ],
    measurements: [
      m("Crown height", "From the peak seam to the top button, at the front."),
      m("Peak length", "From the crown seam to the tip of the peak."),
      m("Peak width", "Across the peak at the crown seam."),
      m("Head circumference", "Inside the sweatband, at the smallest and largest setting."),
      m("Front panel height", "Height of the front panels at the centre seam."),
    ],
    specification: [
      s("Fabric options", "Cotton twill, brushed cotton, poly-cotton"),
      s("Crown", "Structured with buckram; high, mid or low profile"),
      s("Closure", "Strap and buckle, hook and loop or snapback"),
      s("Sweatband", "Cotton or performance"),
    ],
    logoPositions: ["Centre front", "Side panel", "Back above the closure", "Under the peak"],
    faqs: [
      q("Why are uniform caps structured?", "The buckram front holds the crown upright, so an embroidered logo stays flat and visible."),
      q("What head size does a one-size cap fit?", "An adjustable cap covers a range of head circumferences; state the range at the smallest and largest setting in the specification."),
      q("Can the back of the cap be embroidered too?", "Yes, above the closure, along with side panels and under the peak."),
    ],
    seoTitle: "Six-Panel Cap Manufacturer",
    seoDescription:
      "Structured six-panel uniform caps with embroidery-ready fronts, made to your specification in Karachi. Profile, peak, closure and logo positions.",
  },
  {
    slug: "trucker-cap",
    family: "caps-headwear",
    names: ["Trucker Cap"],
    title: "Trucker Cap",
    intro:
      "A cap with a foam or fabric front and breathable mesh behind it: cooler than a full-fabric cap, with a tall front that suits a patch or a bold logo.",
    summary:
      "A trucker cap is specified by its front (foam or fabric, usually high profile), mesh back panels, peak, snapback closure, sweatband and decoration. The mesh keeps it cool; the front panels are the decoration area, and a patch or bold embroidery suits them best.",
    features: [
      t("Mesh back", "Polyester mesh panels for ventilation."),
      t("Front panels", "Foam front for a classic look, or twill for a structured one."),
      t("Snapback", "Plastic snap closure."),
      t("High profile", "A tall crown that shows the logo."),
    ],
    measurements: [
      m("Crown height", "Peak seam to top button, at the front."),
      m("Peak length", "Crown seam to the tip of the peak."),
      m("Head circumference", "Inside the sweatband at each snap setting."),
      m("Front panel width", "Across both front panels at the base."),
    ],
    specification: [
      s("Fabric options", "Foam or cotton twill front, polyester mesh back"),
      s("Crown", "High or mid profile"),
      s("Closure", "Snapback"),
      s("Peak", "Pre-curved or flat"),
    ],
    logoPositions: ["Centre front", "Front patch", "Side mesh label"],
    faqs: [
      q("Foam or fabric front for a trucker cap?", "Foam is the classic look and prints well; a twill front is more structured and embroiders better."),
      q("Is a trucker cap good for hot climates?", "Yes: the mesh back lets heat out, which is why it suits outdoor work."),
      q("What logo suits a trucker cap?", "A patch or bold embroidery on the tall front panels. Fine detail is better printed."),
    ],
    seoTitle: "Trucker Cap Manufacturer",
    seoDescription:
      "Trucker caps with mesh backs and foam or twill fronts, made to your specification. Profile, closure, measurements and patch or logo options.",
  },
  {
    slug: "bucket-hat",
    family: "caps-headwear",
    names: ["Bucket Hat"],
    title: "Bucket Hat",
    intro:
      "A brimmed hat that shades all round, with rows of stitching that stiffen the brim, for outdoor work, events and retail programs.",
    summary:
      "A bucket hat is specified by fabric, crown height, brim width and angle, brim stitching rows, eyelets, sizes and any chin cord. Rows of stitching on the brim give it body; brim width decides how much shade it gives.",
    features: [
      t("Stitched brim", "Several rows of stitching to stiffen the brim."),
      t("Brim width and angle", "Wider and more downward for shade."),
      t("Eyelets", "Metal or embroidered eyelets for ventilation."),
      t("Sizes", "Fitted sizes or one size with an inner drawcord."),
      t("Chin cord", "Optional, with a toggle."),
    ],
    measurements: [
      m("Head circumference", "Inside the hat at the crown seam."),
      m("Crown height", "From the brim seam to the top."),
      m("Brim width", "From the crown seam to the brim edge."),
      m("Top diameter", "Across the top panel."),
    ],
    specification: [
      s("Fabric options", "Cotton twill, canvas, poly-cotton, nylon"),
      s("Brim", "Width and stitching rows to specification"),
      s("Sizes", "Fitted sizes or one size with drawcord"),
      s("Options", "Eyelets, chin cord, reversible"),
    ],
    logoPositions: ["Front of the crown", "Side of the crown", "Brim"],
    faqs: [
      q("How wide should a bucket hat brim be?", "Wider brims give more shade; specify the width from the crown seam to the edge."),
      q("Do bucket hats come in sizes?", "Either in fitted sizes or as one size with an inner drawcord. Specify which."),
      q("Can a bucket hat be reversible?", "Yes, with a different fabric or colour inside. Decoration is then placed so it does not show through."),
    ],
    seoTitle: "Bucket Hat Manufacturer",
    seoDescription:
      "Bucket hats in cotton twill, canvas and nylon, made to your specification in Karachi. Brim, crown, sizes, measurements and logo positions.",
  },
  {
    slug: "chef-skull-cap",
    family: "caps-headwear",
    names: ["Chef Skull Cap", "Chef Beanie"],
    title: "Chef Skull Cap",
    intro:
      "A close-fitting cap that keeps hair contained in the kitchen and takes daily laundering, with an elastic or tie back that fits every cook in the brigade.",
    summary:
      "A chef skull cap or beanie is specified by fabric (cotton, poly-cotton or a mesh top for ventilation), its back (elastic or ties), sizes, and logo. It is made to be washed with the chef coats, so the fabric and colour are chosen for the same laundry.",
    features: [
      t("Elastic or tie back", "Elastic for a quick fit, ties for adjustment."),
      t("Mesh top", "A mesh crown for ventilation in hot kitchens."),
      t("Laundry-stable fabric", "Washed with the chef coats without shrinking or fading."),
      t("Colour match", "Matched to the coats and aprons."),
    ],
    measurements: [
      m("Head circumference", "Relaxed and stretched, for an elastic back."),
      m("Crown height", "From the band to the top."),
      m("Band depth", "Height of the forehead band."),
      m("Tie length", "From the cap to the tip of each tie, for tie backs."),
    ],
    specification: [
      s("Fabric options", "Cotton or poly-cotton twill, mesh top"),
      s("Back", "Elastic or ties"),
      s("Sizes", "One size or small and large"),
      s("Laundering", "Matched to the chef coat's wash"),
    ],
    logoPositions: ["Front band", "Side"],
    faqs: [
      q("Elastic or tie back for a chef cap?", "Elastic is quicker and fits most heads; ties adjust more precisely. Both survive laundering."),
      q("Should a chef cap have a mesh top?", "In hot kitchens, yes: a mesh crown lets heat escape."),
      q("Can chef caps match the chef coats?", "Yes, colour-approved with the coats and aprons and washed the same way."),
    ],
    seoTitle: "Chef Skull Cap Manufacturer",
    seoDescription:
      "Chef skull caps and kitchen beanies with elastic or tie backs, made to your specification. Fabric, ventilation, sizes and logo positions.",
  },

  /* -------------------------------- Bags & Totes -------------------------------- */
  {
    slug: "canvas-tote",
    family: "bags-totes",
    names: ["Canvas Tote"],
    title: "Canvas Tote",
    intro:
      "A canvas tote built to be reused: a fabric heavy enough to hold its shape, handles anchored to carry a full load, and a print area large enough for the brand.",
    summary:
      "A canvas tote is specified by canvas weight, dimensions and gusset, handle type, length and anchoring, seams, closure, pockets and the print area. Handles fail at their anchors, so a box-and-cross stitch through a reinforced hem is the detail to check first.",
    features: [
      t("Handle anchoring", "Box-and-cross stitch or bar tacks through a reinforced top hem."),
      t("Gusset", "A bottom gusset so it stands and carries bulky items."),
      t("Inside seams", "Overlocked, bound or French seams so edges do not fray."),
      t("Print area", "Front and back, sized to the bag."),
      t("Inside pocket", "Optional, for keys and a phone."),
    ],
    measurements: [
      m("Width", "Across the bag at the top, laid flat."),
      m("Height", "From the base to the top edge."),
      m("Gusset", "Depth of the bottom or side gusset."),
      m("Handle length", "Total length of each handle, and the drop from the top edge."),
      m("Handle width", "Width of each handle."),
    ],
    specification: [
      s("Fabric options", "Cotton canvas, duck, recycled cotton blends"),
      s("Typical weight", "8-16 oz/yd² (about 270-540 gsm)"),
      s("Handles", "Self-fabric or webbing, anchored with box-and-cross stitching"),
      s("Body", "Flat or bottom gusset"),
    ],
    logoPositions: ["Front centre", "Back centre", "Gusset", "Handle label"],
    faqs: [
      q("What canvas weight suits a tote bag?", "Around 8-12 oz suits most reusable totes; 12-16 oz suits heavy shopping and tool use."),
      q("How should tote handles be attached?", "With a box-and-cross stitch or bar tacks through a reinforced top hem, so the load spreads across the stitching."),
      q("How big can the print be?", "Most of the front and back, leaving a margin from the seams and the handles. Specify the print area on the drawing."),
    ],
    seoTitle: "Canvas Tote Bag Manufacturer",
    seoDescription:
      "Canvas tote bags with reinforced handles and gussets, made to your specification in Karachi. Weight, dimensions, handles and print area.",
  },
  {
    slug: "drawstring-bag",
    family: "bags-totes",
    names: ["Drawstring Bag"],
    title: "Drawstring Bag",
    intro:
      "A light bag closed by a cord that doubles as shoulder straps: the giveaway, gym and event bag, where the cord channel and the corner reinforcement decide how long it lasts.",
    summary:
      "A drawstring bag is specified by fabric (polyester, nylon or cotton), dimensions, cord type and length, the cord channel at the top, and the corner reinforcement where the cord exits. Corners tear first, so reinforced corners and eyelets are the detail to check.",
    features: [
      t("Cord channel", "A folded top hem that carries the cord."),
      t("Reinforced corners", "Patches or eyelets where the cord exits at the bottom corners."),
      t("Cord", "Round or flat cord, colour-matched or contrast."),
      t("Zip pocket", "Optional front zip pocket."),
    ],
    measurements: [
      m("Width", "Across the bag, laid flat."),
      m("Height", "From the base to the top of the channel."),
      m("Cord length", "Total length of each cord."),
      m("Channel depth", "Height of the cord channel."),
    ],
    specification: [
      s("Fabric options", "Polyester, nylon, cotton, recycled polyester"),
      s("Typical weight", "Light fabrics, to the use"),
      s("Corners", "Reinforced patches or eyelets"),
      s("Cord", "Round or flat, length to specification"),
    ],
    logoPositions: ["Front centre", "Back", "Zip pocket"],
    faqs: [
      q("Where do drawstring bags fail?", "At the bottom corners where the cord exits. Reinforcement patches or eyelets stop them tearing."),
      q("Which fabric suits a drawstring bag?", "Polyester or nylon for light, strong, water-resistant bags; cotton for a natural look and easy printing."),
      q("Can drawstring bags be printed all over?", "Yes, by sublimation on light polyester, or by screen print in panels."),
    ],
    seoTitle: "Drawstring Bag Manufacturer",
    seoDescription:
      "Drawstring bags in polyester, nylon and cotton with reinforced corners, made to your specification. Dimensions, cord and print options.",
  },
  {
    slug: "tool-bag",
    family: "bags-totes",
    names: ["Tool Bag"],
    title: "Tool Bag",
    intro:
      "An open or zipped bag in heavy canvas with pockets round the outside, a stiffened base and webbing handles, built to carry weight with sharp edges inside it.",
    summary:
      "A tool bag is specified by heavy canvas or duck, dimensions, base (stiffened or reinforced), the number and size of inside and outside pockets, handles and any shoulder strap, closure, and the load it must carry. Heavy loads and sharp tools make the base, the handle anchors and the seams the detail to specify.",
    features: [
      t("Heavy canvas", "Duck or heavy canvas, often 12 oz and above."),
      t("Stiffened base", "A reinforced or inserted base that keeps the bag open and resists wear."),
      t("Pockets", "Outside pockets in several sizes, and inside sleeves."),
      t("Webbing handles", "Wrapped round the body and anchored, with an optional shoulder strap."),
      t("Bound seams", "Bound inside seams for strength and a clean finish."),
    ],
    measurements: [
      m("Length", "Across the base, end to end."),
      m("Width", "Across the base, front to back."),
      m("Height", "From the base to the top edge."),
      m("Pocket sizes", "Width and height of each pocket."),
      m("Handle drop", "From the top edge to the top of the handle."),
    ],
    specification: [
      s("Fabric options", "Heavy cotton canvas or duck, polyester canvas"),
      s("Typical weight", "12-16 oz/yd² (about 405-540 gsm)"),
      s("Base", "Reinforced or stiffened insert"),
      s("Load", "Stated by the buyer and checked on the sample"),
    ],
    logoPositions: ["Front panel", "End panel", "Woven label on the handle"],
    faqs: [
      q("What canvas is best for a tool bag?", "Heavy cotton duck or canvas, often 12 oz and above, or polyester canvas for water resistance."),
      q("How much weight can a tool bag carry?", "As much as its base, handles and seams are built for. State the load and check it on a sample."),
      q("Why bind the inside seams?", "Binding covers raw edges so they do not fray, and adds strength where tools rub."),
    ],
    seoTitle: "Canvas Tool Bag Manufacturer",
    seoDescription:
      "Heavy canvas tool bags with pockets, stiffened bases and webbing handles, made to your specification in Karachi. Weight, pockets and load.",
  },
];
