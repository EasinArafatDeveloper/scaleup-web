export interface PricingBundle {
  id: string;
  name: string;
  tagline: string;
  priceBDT: string;
  priceUSD: string;
  timeline: string;
  popular?: boolean;
  support: string;
  features: string[];
  ctaText: string;
  ctaLink: string;
}

export interface PricingRow {
  service: string;
  package: string;
  priceBDT: string;
  priceUSD: string;
  category: string;
}

export const pricingBundles: PricingBundle[] = [
  {
    id: "launch",
    name: "Launch Bundle",
    tagline: "Essential foundation for new businesses launching online.",
    priceBDT: "৳15,000",
    priceUSD: "$199",
    timeline: "3–5 days",
    support: "2 months free support",
    popular: false,
    ctaText: "Get Launch Bundle",
    ctaLink: "/contact?bundle=launch",
    features: [
      "High-converting landing page (Next.js)",
      "Meta Pixel + CAPI server setup",
      "Floating WhatsApp direct chat button",
      "Mobile-optimized design (Lighthouse 95+)",
      "Lead capture form with email notification",
      "Domain & SSL connection setup"
    ]
  },
  {
    id: "grow",
    name: "Grow Bundle",
    tagline: "The complete automated sales engine for Bangladeshi brands.",
    priceBDT: "৳45,000",
    priceUSD: "$650",
    timeline: "14 days",
    popular: true,
    support: "3 months free support",
    ctaText: "Start with Grow Bundle",
    ctaLink: "/contact?bundle=grow",
    features: [
      "Full E-Commerce / Business website",
      "Automated bKash & Nagad payment checkout",
      "Steadfast / Pathao courier automated API",
      "AI Messenger chatbot for automated replies",
      "WhatsApp order confirmation alerts",
      "Full Meta Pixel + CAPI + GA4 tracking",
      "Admin order & inventory dashboard",
      "3 months free priority support & training"
    ]
  },
  {
    id: "scale",
    name: "Scale Enterprise",
    tagline: "Custom architecture, workflow automation, SEO and GEO.",
    priceBDT: "৳95,000+",
    priceUSD: "$1,400+",
    timeline: "3–4 weeks",
    popular: false,
    support: "6 months premium support",
    ctaText: "Book Architecture Call",
    ctaLink: "/contact?bundle=scale",
    features: [
      "Custom business software / CRM / ERP system",
      "Self-hosted n8n automation pipeline",
      "Multi-channel AI agent & team WhatsApp inbox",
      "SEO + GEO setup for Google and AI search",
      "Dedicated server architecture & daily backups",
      "Custom API integrations & database design",
      "Weekly growth strategy consultation",
      "6 months direct engineer support"
    ]
  }
];

export const pricingTable: PricingRow[] = [
  { service: "Landing Page", package: "Starter", priceBDT: "৳8,000 – 15,000", priceUSD: "$99 – 150", category: "Web Development" },
  { service: "Business Website", package: "Standard", priceBDT: "৳18,000 – 40,000", priceUSD: "$250 – 450", category: "Web Development" },
  { service: "E-commerce Website", package: "Growth (bKash + courier)", priceBDT: "৳30,000 – 80,000", priceUSD: "$500 – 1,200", category: "Web Development" },
  { service: "Custom Web App / SaaS", package: "Custom MVP", priceBDT: "from ৳1,00,000", priceUSD: "from $1,500", category: "Web Development" },
  { service: "AI Chatbot (Messenger/Web)", package: "Starter Setup", priceBDT: "৳10,000 setup + ৳2,500/mo", priceUSD: "$150 + $30/mo", category: "AI & Automation" },
  { service: "WhatsApp Automation", package: "Standard Flow", priceBDT: "৳15,000 setup + ৳3,000/mo", priceUSD: "$200 + $40/mo", category: "AI & Automation" },
  { service: "CRM / Lead Automation (n8n)", package: "Pro System", priceBDT: "৳25,000 – 60,000", priceUSD: "$350 – 800", category: "AI & Automation" },
  { service: "AI Agent (Custom)", package: "Custom Architecture", priceBDT: "from ৳50,000", priceUSD: "from $700", category: "AI & Automation" },
  { service: "SEO (Search Engine Optimization)", package: "Project or Monthly", priceBDT: "Custom quote", priceUSD: "Custom quote", category: "SEO, GEO & Tracking" },
  { service: "GEO (AI search optimization)", package: "Project or Monthly", priceBDT: "Custom quote", priceUSD: "Custom quote", category: "SEO, GEO & Tracking" },
  { service: "Pixel + CAPI Tracking Setup", package: "One-time Setup", priceBDT: "৳8,000 – 15,000", priceUSD: "$100 – 200", category: "SEO, GEO & Tracking" },
  { service: "Booking / Inventory System", package: "Custom Build", priceBDT: "৳50,000 – 1,50,000", priceUSD: "$700 – 2,000", category: "Custom Software" },
  { service: "ERP / CRM Software", package: "Enterprise Custom", priceBDT: "from ৳1,50,000", priceUSD: "from $2,000", category: "Custom Software" },
  { service: "Payment Gateway Integration", package: "bKash / Nagad / Stripe", priceBDT: "৳6,000 – 15,000", priceUSD: "$80 – 200", category: "API & Integrations" },
  { service: "Courier / Third-party API", package: "Steadfast / Pathao Sync", priceBDT: "৳6,000 – 20,000", priceUSD: "$80 – 250", category: "API & Integrations" }
];

export const pricingNotes = {
  paymentTerms: "50% advance to start development, 50% upon final delivery & sign-off. Monthly services billed in advance.",
  thirdPartyNotice: "Ad budget, custom domain registration, cloud hosting, and third-party API usage costs (Meta, OpenAI, etc.) are paid directly by the client.",
  guaranteeNotice: "Every project comes with fixed-price clarity before we begin, 2 revision rounds, and free bug-fix warranty support."
};
