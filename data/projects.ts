/**
 * Live projects shown on /work. Each was built end to end by ScaleUp Web:
 * design, full-stack development, SEO, and hosting/launch setup.
 * Screenshots live in /public/work (1440×900, taken from the live sites).
 */
export interface Project {
  slug: string;
  name: string;
  url: string;
  domain: string;
  category: string;
  /** One-line description of what the product is. */
  summary: string;
  /** What we built — taken from the live product. */
  features: string[];
  image: string;
  /** Optional in-depth case study at /work/[caseStudySlug]. */
  caseStudySlug?: string;
}

/** The work we do on every project. */
export const projectScope = ["UI/UX design", "Full-stack development", "SEO setup", "Hosting & launch"];

export const projectsData: Project[] = [
  {
    slug: "fb-lead-finder",
    name: "FB Lead Finder",
    url: "https://specter.monster/",
    domain: "specter.monster",
    category: "SaaS · Lead generation",
    summary:
      "Type a keyword, get every business running Facebook & Instagram ads for it — with the phone, WhatsApp and email they publish.",
    features: [
      "Chrome extension that collects advertisers from the Meta Ad Library",
      "Subscription plans with a credit system",
      "Excel, CSV and live Google Sheets export",
      "Email and phone alerts when a search is done"
    ],
    image: "/work/specter.webp"
  },
  {
    slug: "amar-organic-shop",
    name: "Amar Organic Shop",
    url: "https://amarorganicshop.com/",
    domain: "amarorganicshop.com",
    category: "E-commerce · Organic food",
    summary:
      "An online store for honey, ghee, dates, spices and other organic foods, delivering across Bangladesh.",
    features: [
      "Category-based catalogue with search",
      "Cart, wishlist and customer accounts",
      "Order tracking page",
      "Bangla + English storefront"
    ],
    image: "/work/amar-organic.webp",
    caseStudySlug: "amar-organic-shop"
  },
  {
    slug: "havitall",
    name: "HavItAll",
    url: "https://www.havitall.shop/",
    domain: "havitall.shop",
    category: "E-commerce · Gadgets & lifestyle",
    summary:
      "A gadget and lifestyle shop with curated collections, hot deals and fast delivery across Bangladesh.",
    features: [
      "Admin panel to curate featured products",
      "Discount pricing, coupon codes and deal filters",
      "Order tracking and wishlist",
      "Bilingual SEO titles and product content"
    ],
    image: "/work/havitall.webp"
  },
  {
    slug: "the-reform-times",
    name: "The Reform Times",
    url: "https://www.thereformtimes.com/bn",
    domain: "thereformtimes.com",
    category: "News portal · Bangla & English",
    summary:
      "An advocacy journalism portal publishing national, international, environment and fact-check reporting in two languages.",
    features: [
      "Bangla and English editions",
      "Sections, trending tags and a fact-check desk",
      "Reader subscriptions and push notifications",
      "Dark mode and fast article pages"
    ],
    image: "/work/reform-times.webp",
    caseStudySlug: "the-reform-times"
  },
  {
    slug: "necob",
    name: "NECOB",
    url: "https://necobbd.com/",
    domain: "necobbd.com",
    category: "Community platform · eFootball",
    summary:
      "The home of Bangladesh's national eFootball community — players, clubs and tournaments in one place.",
    features: [
      "Player and club profiles with sign-up",
      "Tournament brackets, matches and rankings",
      "Transfer market between clubs",
      "Live community activity feed"
    ],
    image: "/work/necob.webp"
  },
  {
    slug: "postman",
    name: "Postman",
    url: "https://www.postman.asia/",
    domain: "postman.asia",
    category: "SaaS · SMS marketing",
    summary:
      "Trackable SMS marketing: every recipient gets their own short link, so you see exactly who clicked and who is ready to buy.",
    features: [
      "Unique tracked short link per recipient",
      "Delivery queue with automatic retries",
      "Bot and link-preview clicks filtered out",
      "Hot-lead scoring across campaigns"
    ],
    image: "/work/postman.webp"
  }
];

/** Projects left off the homepage (still listed on /work). */
const notOnHomepage = ["havitall"];

/** Featured on the homepage: SaaS products first, then e-commerce stores. */
export const featuredProjects = [
  ...projectsData.filter((p) => p.category.startsWith("SaaS")),
  ...projectsData.filter((p) => p.category.startsWith("E-commerce"))
].filter((p) => !notOnHomepage.includes(p.slug));
