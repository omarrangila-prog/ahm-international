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
};

export function getProductFaqs(slug: string): FaqItem[] {
  return productFaqs[slug] ?? [];
}
