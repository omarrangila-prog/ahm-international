export type NavLink = { label: string; href: string; description?: string };

export type MegaMenuGroup = {
  title: string;
  /** Category route this group heads, when it maps to one. */
  href?: string;
  links: NavLink[];
};

/** Primary desktop navigation, in the order a buyer needs it. */
export const primaryNav: NavLink[] = [
  { label: "Capabilities", href: "/capabilities" },
  { label: "Products", href: "/products" },
  { label: "Development", href: "/development" },
  { label: "Quality", href: "/quality" },
  { label: "About", href: "/about" },
];

/** Products mega menu — grouped the way a sourcing manager thinks, not by our sitemap. */
export const megaMenu: MegaMenuGroup[] = [
  {
    title: "Uniform & Workwear",
    href: "/products/uniform-workwear",
    links: [
      { label: "Aprons", href: "/products/aprons" },
      { label: "Work Shirts", href: "/products/woven-shirts" },
      { label: "Uniform Tops", href: "/products/polos-tshirts" },
      { label: "Work Bottoms", href: "/products/bottoms" },
      { label: "Service Apparel", href: "/products/uniform-workwear" },
    ],
  },
  {
    title: "Knits",
    href: "/products/polos-tshirts",
    links: [
      { label: "Polos", href: "/products/polos-tshirts" },
      { label: "T-Shirts", href: "/products/polos-tshirts" },
      { label: "Sweatshirts", href: "/products/fleece-sweatshirts" },
      { label: "Hoodies", href: "/products/fleece-sweatshirts" },
      { label: "Fleece", href: "/products/fleece-sweatshirts" },
    ],
  },
  {
    title: "Wovens",
    href: "/products/woven-shirts",
    links: [
      { label: "Shirts", href: "/products/woven-shirts" },
      { label: "Pants", href: "/products/bottoms" },
      { label: "Shorts", href: "/products/bottoms" },
    ],
  },
  {
    title: "Outerwear",
    href: "/products/outerwear",
    links: [
      { label: "Fleece Jackets", href: "/products/fleece-sweatshirts" },
      { label: "Softshell", href: "/products/outerwear" },
      { label: "Lightweight Jackets", href: "/products/outerwear" },
      { label: "Vests", href: "/products/outerwear" },
    ],
  },
];

/** Footer columns. */
export const footerNav: { title: string; links: NavLink[] }[] = [
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Capabilities", href: "/capabilities" },
      { label: "Manufacturing", href: "/manufacturing" },
      { label: "Quality", href: "/quality" },
      { label: "Sustainability", href: "/sustainability" },
    ],
  },
  {
    title: "Products",
    links: [
      { label: "Uniform & Workwear", href: "/products/uniform-workwear" },
      { label: "Polos & T-Shirts", href: "/products/polos-tshirts" },
      { label: "Fleece & Sweatshirts", href: "/products/fleece-sweatshirts" },
      { label: "Aprons", href: "/products/aprons" },
      { label: "All products", href: "/products" },
    ],
  },
  {
    title: "Sourcing",
    links: [
      { label: "Benchmark a Style", href: "/benchmark-a-style" },
      { label: "Send a Tech Pack", href: "/send-tech-pack" },
      { label: "Request a Quote", href: "/request-a-quote" },
      { label: "Product Development", href: "/development" },
      { label: "Materials", href: "/materials" },
      { label: "FOB Export", href: "/export" },
      { label: "Case Studies", href: "/case-studies" },
    ],
  },
];
