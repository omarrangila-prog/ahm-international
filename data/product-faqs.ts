import type { FaqItem } from "@/components/ui/Faq";

/**
 * Category FAQs.
 *
 * Written per category rather than templated. Seven pages carrying the same five
 * questions with the noun swapped is near-duplicate content, and it also fails
 * the more important test: a buyer reading the apron page has different
 * questions from one reading the outerwear page.
 *
 * Nothing here states a price, MOQ or lead time. Where the honest answer is "it
 * depends", the answer says what it depends on.
 */

export const productFaqs: Record<string, FaqItem[]> = {
  "uniform-workwear": [
    {
      question: "Can you match an existing uniform we already run?",
      answer:
        "Yes. Send a current garment and we will measure it, identify the construction and propose a fabric match. Matching an incumbent article is usually more accurate than working from a written description, because the sample answers questions a specification often leaves open.",
    },
    {
      question: "How do you keep colour consistent across different article types?",
      answer:
        "Colour is approved once as a lab dip and then applied across the program. Knit and woven fabrics take dye differently, so where a polo and a work shirt must match, we approve them against each other rather than against the standard separately.",
    },
    {
      question: "Do you produce hi-vis and reflective workwear?",
      answer:
        "We produce garments with reflective tape to the configuration a buyer specifies. Where a program requires certification to a visibility standard, that standard has to be nominated by the buyer and confirmed through approved testing. We do not claim conformity we cannot evidence.",
    },
    {
      question: "Can a uniform program include several garment types on one order?",
      answer:
        "Yes, and it is usually the better way to run one. Shared fabric across articles improves consumption, and a single development cycle keeps colour, labelling and packing consistent across the whole program.",
    },
    {
      question: "What sizing do you work to?",
      answer:
        "Your size specification. Where you do not have one, we develop a size chart and confirm it with a size set before bulk. Extended and separate men's and women's blocks are handled at development, not retrofitted afterwards.",
    },
  ],

  "polos-tshirts": [
    {
      question: "What is the difference between pique and jersey for a uniform polo?",
      answer:
        "Pique is a textured knit that holds structure and hides light soiling, which is why most uniform polos use it. Jersey is smoother and softer but shows creasing and wear sooner in a high-wash program. Pique is the safer default for a program; jersey suits shorter-life event apparel.",
    },
    {
      question: "How do you stop collars losing shape after washing?",
      answer:
        "Collar recovery is a function of the rib construction, the yarn and the finishing, not of the stitching. We approve the collar as part of the sample and, where a program is laundered industrially, recommend testing it against that wash cycle before bulk.",
    },
    {
      question: "Can you produce performance polos with moisture management?",
      answer:
        "Yes, using performance polyester or a poly-blend with a wicking finish. The performance level depends on the fabric selected and is confirmed by testing. We do not print a performance claim on a label that has not been tested.",
    },
    {
      question: "Do you offer a printed neck label instead of a sewn label?",
      answer:
        "Yes. Printed neck labels, sewn main labels, woven and satin labels are all available. The choice affects comfort and cost, and is confirmed during development along with care and origin labelling.",
    },
    {
      question: "Can polos and T-shirts share the same fabric across a program?",
      answer:
        "Often, yes: a single jersey or CVC can serve both, which simplifies colour matching and improves fabric consumption. Where the polo needs pique and the tee needs jersey, we approve the two against each other for shade.",
    },
  ],

  "fleece-sweatshirts": [
    {
      question: "What fleece weight should we specify?",
      answer:
        "It depends on how the garment is worn. Lighter brushed fleece suits an indoor layer worn most of the day; heavier weights suit outdoor or cold-store work. Weight also drives freight cost, so it is worth deciding against the actual wear pattern rather than defaulting to the heaviest option.",
    },
    {
      question: "How do you prevent pilling?",
      answer:
        "By selecting an anti-pill fabric and confirming it through testing rather than by adjusting construction. Pilling is a fabric property; if the program will be laundered hard, that should drive the fabric decision at development.",
    },
    {
      question: "Can you produce both pullover and full-zip versions of one style?",
      answer:
        "Yes. They share the body pattern and fabric, so developing them together is more efficient than treating them as separate styles, and it keeps the two consistent in the program.",
    },
    {
      question: "What is the difference between French terry and brushed fleece?",
      answer:
        "Both are loopback knits. French terry leaves the loops unbrushed, giving a lighter, smoother garment. Brushed fleece raises the loops into a soft pile, which is warmer and bulkier. Terry suits transitional layers; brushed fleece suits warmth.",
    },
    {
      question: "How is embroidery handled on fleece?",
      answer:
        "With backing selected for the pile, and a sew-out approved on the actual bulk fabric before production. Embroidery that looks correct on a woven swatch can sink or pucker on fleece, so it is approved on the real substrate.",
    },
  ],

  aprons: [
    {
      question: "What fabric is normally used for a uniform apron?",
      answer:
        "Poly-cotton twill is the common choice. Most often a 65/35 blend, which balances durability, shrinkage control and the ability to take a stain-release finish. Cotton canvas suits heavier utility aprons where abrasion matters more than laundering.",
    },
    {
      question: "How does a stain-release finish actually work?",
      answer:
        "It is a chemical finish applied to the fabric that reduces how readily soil bonds to the fibre, so more of it lifts during washing. It is a fabric property, not a construction one, and its durability across wash cycles should be confirmed by testing before it is relied on in a program.",
    },
    {
      question: "Can you match an apron we already buy?",
      answer:
        "Yes. Send a current apron and we will measure it, identify the construction, pocket configuration and hardware, and propose a fabric match. This is the fastest route to a comparable quotation.",
    },
    {
      question: "What reinforcement should a working apron have?",
      answer:
        "Bar tacks at the pocket mouth and at strap attachment points, which are where failures start. Pocket bags and strap webbing carry the load, so specification there matters more than overall fabric weight.",
    },
    {
      question: "Can straps be adjustable?",
      answer:
        "Yes: self-fabric ties, webbing with a slider, buckles, D-rings or press studs. Adjustable neck hardware is common where one apron has to fit a wide range of wearers, and it is specified at development along with the hardware reference.",
    },
  ],

  "woven-shirts": [
    {
      question: "Should the collar be fused or unfused?",
      answer:
        "Fused collars hold a crisper shape and suit corporate and front-of-house programs. Unfused collars are softer and more forgiving. The interlining quality matters more than the choice itself. Poor fusing bubbles after repeated washing, which is a defect that only appears in the field.",
    },
    {
      question: "What is the difference between poplin, twill and oxford?",
      answer:
        "Poplin is a fine plain weave, light and crisp. Twill has a diagonal structure, is heavier and drapes softer while resisting creasing better. Oxford is a basket-type weave, more textured and durable. Poplin suits corporate shirting, twill and oxford suit harder-wearing uniform and utility shirts.",
    },
    {
      question: "Do you produce both men's and women's blocks?",
      answer:
        "Yes. They are developed as separate patterns rather than graded from one another, because a shirt scaled rather than re-blocked fits poorly across the chest and shoulder. Both are confirmed with a fit sample.",
    },
    {
      question: "Can you produce easy-care or wrinkle-resistant shirting?",
      answer:
        "Yes, subject to the fabric selected. Easy-care performance is a finish applied to the fabric, and its durability across the program's wash cycle should be confirmed by testing before it is claimed on a label.",
    },
    {
      question: "How are shirts packed for a retail or DC delivery?",
      answer:
        "Folded with collar support and a polybag, or on hangers, to your packing instruction. Carton contents, ratio and marking are specified before production because rework at the packing stage is the most avoidable delay in a shipment.",
    },
  ],

  bottoms: [
    {
      question: "What drives the real cost of a work trouser?",
      answer:
        "Pocket construction, reinforcement and closure hardware, not the shell fabric alone. A trouser with cargo pockets, bar tacks, a gusset and branded hardware carries considerably more labour than a plain uniform pant in the same cloth.",
    },
    {
      question: "Where do work trousers usually fail?",
      answer:
        "At the crotch seam, the pocket mouth and the knee. Reinforcement at those three points. A gusset, bar tacks and a double layer or heavier fabric at the knee. Extends service life more than raising the fabric weight everywhere.",
    },
    {
      question: "Can you produce a stretch work trouser?",
      answer:
        "Yes, using a mechanical stretch weave or an elastane blend. Elastane improves movement but affects laundering behaviour and shrinkage, so it should be confirmed against the program's wash process at development.",
    },
    {
      question: "Do you offer part-elasticated waistbands?",
      answer:
        "Yes. Fixed, fully elasticated and part-elasticated waistbands are all workable. Part-elasticated is common in uniform programs because it widens the fit range and reduces the number of sizes a site has to hold.",
    },
    {
      question: "Can shorts and trousers be developed together?",
      answer:
        "Yes, and it is usually more efficient. They share the front and back blocks and the same fabric, so one development cycle covers both and keeps the pair consistent.",
    },
  ],

  outerwear: [
    {
      question: "What information do you need to quote a jacket?",
      answer:
        "Outerwear has the most components of any category, so the specification matters most here: shell fabric, lining, zip brand and gauge, pocket configuration, hood, cuff and hem treatment, and any water-resistance requirement. A tech pack with those resolved gets an accurate first quotation rather than a defensive one.",
    },
    {
      question: "What is the difference between softshell and a lined jacket?",
      answer:
        "Softshell is a bonded fabric (a wind-resistant face laminated to a fleece or knit backing), so warmth is built into the cloth. A lined jacket uses a separate shell and lining, which allows different weights and finishes but adds construction. Softshell is lighter to make and to ship.",
    },
    {
      question: "Can you produce water-resistant outerwear?",
      answer:
        "Water resistance depends on the fabric finish and, at higher levels, on seam treatment. We can supply a water-repellent finish and taped or bonded seams where the fabric allows, with performance confirmed by approved testing. We do not state a hydrostatic head figure without a test report.",
    },
    {
      question: "Do zips have to come from a nominated supplier?",
      answer:
        "Not necessarily. Where your program nominates a zip brand we work to it; where it is open, we present options against the requirement. Zip choice on outerwear affects both cost and perceived quality more than most buyers expect.",
    },
    {
      question: "How are jackets packed for export?",
      answer:
        "Folded and polybagged, or hanging, to your packing instruction. Outerwear is bulky, so carton configuration has a real effect on freight cost and is worth confirming before production rather than at dispatch.",
    },
  ],
  "hospitality-food-service": [
    {
      question: "Which fabric is best for chef coats?",
      answer:
        "Most chef coats are poly-cotton or 100% cotton twill or drill. Poly-cotton dries faster, creases less and keeps its colour through industrial laundering; cotton breathes better and is often preferred near heat. The right choice depends on the kitchen and on who launders the coats, so tell us both.",
    },
    {
      question: "Can front-of-house and back-of-house uniforms match?",
      answer:
        "Yes, if colour is approved across the program rather than garment by garment. A knit polo, a woven shirt and a twill apron take dye differently, so the lab dips for each are approved against each other as well as against your standard.",
    },
    {
      question: "Do you offer stain-release or soil-release finishes?",
      answer:
        "They are available subject to the fabric selected, and their performance after laundering is confirmed by testing you approve. A finish weakens with washing, so ask what the test measures and after how many washes, rather than accepting a description.",
    },
    {
      question: "Can chef coats have press studs instead of knot buttons?",
      answer:
        "Yes. Closure is a specification decision: knot buttons, press studs or removable studs. Press studs are worth a pull test on the sample, and removable studs need a plan for losses in the laundry.",
    },
    {
      question: "Do you make chef hats and skull caps?",
      answer:
        "Chef skull caps and beanies are part of the range, and are listed with our caps and headwear as well. Like the rest of chef wear, they are built for the laundry they will face.",
    },
  ],

  denim: [
    {
      question: "What weight of denim should a work garment use?",
      answer:
        "Work shirts commonly sit around 6 to 8 oz per square yard, jackets and work trousers higher, often 10 to 14 oz. The weight is a balance between durability and comfort in the climate the wearer works in, and it is confirmed on a swatch and a sample, not from the number alone.",
    },
    {
      question: "How much will a denim garment shrink?",
      answer:
        "That depends on whether the fabric is sanforised and on the wash. Shrinkage is measured on the fabric and on the washed garment at development, and the pattern is adjusted for it, which is why the wash is fixed before the pattern is finalised.",
    },
    {
      question: "Can you match an existing wash?",
      answer:
        "We develop a wash against a physical reference you approve. Washes vary from lot to lot by nature, so agree a tolerance band, ideally a light and a dark limit sample, before bulk.",
    },
    {
      question: "Who supplies rivets, buttons and zips?",
      answer:
        "Hardware can be nominated by you or proposed against your requirement. Denim washes are hard on hardware, so whatever is chosen should go through the wash on the sample before it is approved.",
    },
    {
      question: "Is stretch denim suitable for workwear?",
      answer:
        "A small percentage of elastane improves comfort and movement, at some cost to durability and to recovery over many washes. For heavy-duty work, rigid denim or a low stretch content is the usual choice; test recovery on the sample.",
    },
  ],

  athleisure: [
    {
      question: "What fabrics are used for joggers and lounge pants?",
      answer:
        "Usually brushed-back fleece or French terry for joggers, and jersey, interlock or a woven for lounge pants. Weight, hand feel and stretch decide how the garment wears, so they are confirmed on a physical sample rather than from a specification sheet.",
    },
    {
      question: "How do you control stretch and recovery?",
      answer:
        "Through the fabric: elastane content, knit construction and finishing. Recovery is checked on the development sample after washing, because a fabric that recovers well new can bag at the knee after a few washes.",
    },
    {
      question: "Can athleisure carry printed or sublimated designs?",
      answer:
        "Yes, with the method chosen for the fabric. Sublimation needs a high polyester content and a light ground; screen printing and heat transfer suit cotton-rich fabrics. The method and the fabric are decided together.",
    },
    {
      question: "Do you make both joggers and matching tops?",
      answer:
        "Yes. Where a set must match, the fabrics are developed and colour-approved together, since a top and a bottom in different constructions take dye differently.",
    },
    {
      question: "What sizes can you produce?",
      answer:
        "Your size specification, graded from an approved base size. Athleisure fits vary widely, so a size set is checked on fit models before bulk.",
    },
  ],

  womenswear: [
    {
      question: "Why not grade a women's size from the men's pattern?",
      answer:
        "Because the proportions differ: bust, waist, hip and shoulder do not scale together. A women's garment cut from a scaled men's pattern fits badly across the bust and hip. A separate block, developed and fitted on its own, is what makes a women's uniform fit.",
    },
    {
      question: "Can men's and women's uniforms match exactly?",
      answer:
        "In colour, fabric and branding, yes, by approving them as one program. The cut differs by design: placket direction, darts, sleeve length and hem shape are set for each block.",
    },
    {
      question: "Do you produce extended and inclusive size ranges?",
      answer:
        "We work to your size specification, including extended ranges. Larger sizes are graded and fitted, not just enlarged, so tell us the full range at development.",
    },
    {
      question: "What garments are in a women's uniform range?",
      answer:
        "Typically polos, T-shirts, woven shirts and blouses, knit layers and outerwear, cut on women's blocks. Send the articles you run today and we will review them as a set.",
    },
    {
      question: "Is maternity wear available?",
      answer:
        "Maternity uniform is a specialist block with its own fit requirements. Ask us about your requirement and we will tell you what can be developed for it, rather than adapting a standard pattern.",
    },
  ],

  kidswear: [
    {
      question: "Which safety rules apply to children's clothing?",
      answer:
        "They are set by the destination market. In the United States the Consumer Product Safety Improvement Act requires third-party testing and a Children's Product Certificate, with rules on lead, small parts and flammability; drawstrings on children's upper outerwear are restricted. In the UK and EU, EN 14682 covers cords and drawstrings. Name your markets at the start so the requirements are set before development.",
    },
    {
      question: "Who is responsible for the certificate?",
      answer:
        "Under US rules the importer or the domestic manufacturer issues the Children's Product Certificate, based on tests by an accepted third-party laboratory. We work to the requirement you nominate and support the testing; the certificate itself is the importer's.",
    },
    {
      question: "Are press studs on baby wear safe?",
      answer:
        "Press studs are small parts, so attachment strength matters. They are specified nickel-free where skin contact applies, and pull-tested to the standard your market requires, on the sample and in production.",
    },
    {
      question: "Can children's garments be printed?",
      answer:
        "Yes, with print chemistry chosen for the market's restricted-substance limits. Ask for the ink system and its test evidence, especially for infant wear, which is often mouthed.",
    },
    {
      question: "Do you make school uniform?",
      answer:
        "School uniform is part of the kidswear range: polos, shirts, trousers and knit layers made to the school's specification and colours. Send the current garments or the school's specification for review.",
    },
  ],

  "medical-scrubs": [
    {
      question: "Which fabric is best for scrubs?",
      answer:
        "Poly-cotton is the long-standing choice: durable, quick-drying and colour-fast under hot laundering. Polyester-viscose with elastane gives stretch and a softer hand and is common in modern fits; 100% cotton is cooler but shrinks and fades more. The choice follows the laundry the scrubs will go through.",
    },
    {
      question: "Can scrubs be antimicrobial or fluid-repellent?",
      answer:
        "Finishes exist for both, but a claim needs evidence. We apply a functional finish only to a standard you nominate, with test results, and do not describe a garment as antimicrobial or fluid-repellent without them. In some markets antimicrobial claims are also regulated, so check yours.",
    },
    {
      question: "Are scrubs medical devices or PPE?",
      answer:
        "Standard scrubs are workwear. Garments sold as protection against infection or fluids, such as surgical gowns, fall under medical device or personal protective equipment rules and need certification. Tell us what the garment will be sold as, and we will tell you whether it is something we can make.",
    },
    {
      question: "Can you match a hospital's colour codes?",
      answer:
        "Yes. Colours are dyed to an approved lab dip, so a department's colour can be matched to your reference and held across reorders.",
    },
    {
      question: "What sizes and fits do scrubs come in?",
      answer:
        "Whatever your size specification sets: unisex or cut-for-gender, with regular, petite and tall lengths where the range needs them. A size set is checked before bulk.",
    },
  ],

  "caps-headwear": [
    {
      question: "What is the difference between a structured and an unstructured cap?",
      answer:
        "A structured cap has a stiff buckram lining behind the front panels, so the crown holds its shape and gives a flat surface for a logo. An unstructured cap has no backing and sits lower and softer on the head. Choose structured for crisp embroidery, unstructured for a relaxed look.",
    },
    {
      question: "Which closure should a uniform cap use?",
      answer:
        "Adjustable closures (snapback, strap and buckle, or hook and loop) let one size fit most heads, which simplifies a uniform program. Fitted caps look neater but need a size run. The choice goes in the specification.",
    },
    {
      question: "Can the logo be 3D embroidery?",
      answer:
        "3D puff embroidery raises the design over a foam underlay and suits bold, simple shapes on a structured front. Fine detail and small text work better flat. Send the artwork and we will advise on the method.",
    },
    {
      question: "How are caps packed for export?",
      answer:
        "Nested in stacks or individually bagged, in cartons sized so the crowns are not crushed. The packing instruction is worth fixing early, because it affects both the condition of the caps on arrival and the freight.",
    },
    {
      question: "Do you make headwear for kitchens?",
      answer:
        "Yes: chef skull caps and beanies built for repeated laundering, with elastic or tie backs. They appear in our hospitality range too.",
    },
  ],

  "bags-totes": [
    {
      question: "What fabric weight should a tote bag use?",
      answer:
        "It depends on the load and the use. Light promotional totes use lighter cotton or polyester; reusable shopping and tool bags use heavier canvas, often quoted as 10 to 16 oz per square yard. Tell us what the bag must carry and we will propose a fabric to sample.",
    },
    {
      question: "How strong are the handles?",
      answer:
        "As strong as their anchoring. Handles are usually anchored with a box-and-cross stitch or bar tacks, and their length, width and fabric are set in the specification. State the load the bag must carry, and check it on the sample.",
    },
    {
      question: "What is a gusset and do I need one?",
      answer:
        "A gusset is a panel that gives a bag depth, at the bottom or around the sides. A flat tote is cheapest and folds flat; a gusseted bag carries boxes and bulky items better. Specify its width.",
    },
    {
      question: "Can bags be printed all over?",
      answer:
        "Screen printing suits logos and spot designs on canvas; heat transfer and sublimation suit full-colour designs on suitable fabrics, sublimation needing polyester. The method follows the artwork and the fabric.",
    },
    {
      question: "Can you make bags from recycled fabric?",
      answer:
        "Recycled polyester and recycled cotton blends are available fabric options. If the bag will carry a recycled-content claim, the claim needs certification such as GRS from the fabric supply chain; ask for the evidence before you print it.",
    },
  ],
};

export function getProductFaqs(slug: string): FaqItem[] {
  return productFaqs[slug] ?? [];
}
