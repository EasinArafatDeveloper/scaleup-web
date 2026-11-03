export interface CaseStudy {
  slug: string;
  title: string;
  client: string;
  industry: string;
  servicesUsed: string[];
  summary: string;
  problem: string;
  solution: string;
  metrics: {
    label: string;
    value: string;
    description: string;
  }[];
  testimonialQuote: string;
  testimonialAuthor: string;
  techStack: string[];
  liveUrl?: string;
  accentColor: string;
}

export const caseStudiesData: CaseStudy[] = [
  {
    slug: "amar-organic-shop",
    title: "Scaling D2C Organic Grocery with 1-Click bKash & Steadfast Courier Integration",
    client: "Amar Organic Shop",
    industry: "E-commerce & Organic Retail",
    servicesUsed: ["E-Commerce Website", "bKash Tokenized API", "Steadfast Courier API", "Meta CAPI"],
    summary: "Transformed a manual Messenger-based organic store into a headless e-commerce powerhouse with automated fulfillment.",
    problem:
      "The client was processing 80+ daily orders manually through Messenger chats. Peak hours resulted in delayed replies, lost carts, address typing errors, and a 22% courier return rate due to unverified orders.",
    solution:
      "Built a custom Next.js storefront with instant search, tokenized bKash checkout, and direct Steadfast API integration that generates courier parcels and shipping labels with one click.",
    metrics: [
      { label: "Order Processing Time", value: "-70%", description: "From 12 minutes per order to under 30 seconds" },
      { label: "Courier Return Rate", value: "8.5%", description: "Down from 22% with automated address validation" },
      { label: "Monthly Revenue", value: "+140%", description: "Grown over 90 days after frictionless mobile checkout" }
    ],
    testimonialQuote:
      "ScaleUp Web gave us an enterprise-grade store that runs reliably even during festive flash sales. Our fulfillment is now completely automated.",
    testimonialAuthor: "Mahmudur Rahman, Founder",
    techStack: ["Next.js 15", "TypeScript", "Tailwind CSS", "bKash API", "Steadfast API", "PostgreSQL"],
    liveUrl: "https://scaleupweb.xyz/work/amar-organic-shop",
    accentColor: "from-emerald-500/20 to-emerald-950/20"
  },
  {
    slug: "the-reform-times",
    title: "High-Traffic Digital News Portal with Sub-Second Page Loads Under Heavy Spikes",
    client: "The Reform Times",
    industry: "Digital Media & Publishing",
    servicesUsed: ["Custom Web Application", "Content Architecture", "Serverless Edge Caching", "Ad Placement"],
    summary: "Engineered an ultra-fast news portal capable of serving 50,000 concurrent readers with zero server crashes.",
    problem:
      "Previous WordPress setup frequently crashed during breaking news cycles when concurrent traffic spiked from Facebook viral posts. Ad revenue was hurt by slow Core Web Vitals.",
    solution:
      "Migrated content architecture to Next.js on edge serverless nodes with ISR (Incremental Static Regeneration), optimizing article load times to under 600ms on 4G mobile networks.",
    metrics: [
      { label: "Page Load Time", value: "0.6s", description: "Lighthouse mobile score increased to 98/100" },
      { label: "Server Downtime", value: "0.0%", description: "Zero crashes across breaking news election traffic" },
      { label: "Ad Viewability", value: "+65%", description: "Higher reader retention and engagement per session" }
    ],
    testimonialQuote:
      "We no longer panic when a breaking news post goes viral. The site is rock solid and lightning fast.",
    testimonialAuthor: "Editorial Board, The Reform Times",
    techStack: ["Next.js", "Edge Caching", "Tailwind CSS", "PostgreSQL", "Cloudflare"],
    liveUrl: "https://scaleupweb.xyz/work/the-reform-times",
    accentColor: "from-blue-500/20 to-indigo-950/20"
  },
  {
    slug: "luxe-modest-wear",
    title: "Tripling Meta Ad ROAS with Server-Side CAPI and Conversion-First Landing Pages",
    client: "Luxe Modest Wear",
    industry: "Fashion & Lifestyle",
    servicesUsed: ["Landing Page", "Pixel + CAPI Tracking", "WhatsApp Bot"],
    summary: "Fixed iOS 14 attribution gaps and built dedicated product funnels that lifted ad return from 2.1x to 4.4x.",
    problem:
      "Facebook Ads Manager was under-reporting purchases by 35% due to browser tracking blockages, causing Meta algorithms to optimize toward low-intent clickers rather than actual buyers.",
    solution:
      "Implemented server-side Conversions API (CAPI) with event deduplication, combined with a bespoke mobile sales funnel featuring 1-click WhatsApp order confirmation.",
    metrics: [
      { label: "Meta Ad ROAS", value: "4.4x", description: "Increased from 2.1x within 6 weeks of launch" },
      { label: "Event Match Quality", value: "8.9/10", description: "Meta CAPI attribution accuracy verified" },
      { label: "Cost Per Acquisition", value: "-38%", description: "Lower ad spend required per confirmed sale" }
    ],
    testimonialQuote:
      "The precision tracking and fast landing pages completely changed our economics. We can now scale our ad budgets with confidence.",
    testimonialAuthor: "Tanvir Hasan, Co-Founder",
    techStack: ["Next.js", "Meta CAPI Server Actions", "WhatsApp Cloud API", "Tailwind CSS"],
    liveUrl: "https://scaleupweb.xyz/work/luxe-modest-wear",
    accentColor: "from-purple-500/20 to-purple-950/20"
  }
];

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return caseStudiesData.find((c) => c.slug === slug);
}
