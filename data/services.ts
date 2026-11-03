export interface ServicePackage {
  name: string;
  priceBDT: number | string;
  priceUSD: number | string;
  duration: string;
  features: string[];
  popular?: boolean;
}

export interface ServiceFAQ {
  question: string;
  answer: string;
}

export interface SubService {
  slug: string;
  categorySlug: string;
  category: string;
  title: string;
  shortPitch: string;
  problem: string;
  whoItsFor: string[];
  deliverables: string[];
  process: string[];
  techStack: string[];
  timeline: string;
  startingPriceBDT: number;
  startingPriceUSD: number;
  packages: ServicePackage[];
  faq: ServiceFAQ[];
  icon: string;
}

export interface ServiceCategory {
  slug: string;
  title: string;
  shortDesc: string;
  icon: string;
  services: SubService[];
}

/** A starting price of 0 means the service is quoted per project. */
export function formatStartingPrice(amount: number, symbol: "৳" | "$" = "৳") {
  return amount > 0 ? `${symbol}${amount.toLocaleString()}` : "Custom quote";
}

/** Lowest fixed starting price in a list of services (0 if every one is quoted). */
export function lowestStartingPriceBDT(services: SubService[]) {
  const prices = services.map((s) => s.startingPriceBDT).filter((p) => p > 0);
  return prices.length ? Math.min(...prices) : 0;
}

export const serviceCategories: ServiceCategory[] = [
  {
    slug: "web-development",
    title: "Web Development",
    shortDesc: "High-speed, SEO-optimized websites built to convert visitors into paying clients.",
    icon: "Globe",
    services: [
      {
        slug: "landing-page",
        categorySlug: "web-development",
        category: "Web Development",
        title: "High-Converting Landing Page",
        shortPitch: "Single-page sales funnels engineered for high conversion rates from ads.",
        problem: "Sending expensive paid traffic to slow, confusing pages where visitors bounce without buying.",
        whoItsFor: [
          "Direct-to-consumer (D2C) brands running Meta/Google ads",
          "Course creators and service providers launching a single offer",
          "B2B agencies needing dedicated campaign landing pages",
          "Companies launching new products or events"
        ],
        deliverables: [
          "Custom conversion-first UI/UX design (Figma)",
          "Next.js / Tailwind CSS ultra-fast code (<1.5s load)",
          "Meta Pixel + CAPI + GA4 tracking integrated",
          "Direct WhatsApp & lead capture forms",
          "Mobile responsive at 375px, 768px and 1440px",
          "Copywriting optimization and speed pass"
        ],
        process: [
          "Offer and target audience breakdown",
          "Wireframe and high-converting copy structure",
          "Figma UI design and client review",
          "Fast Next.js build & analytics setup",
          "Live launch and A/B test readiness"
        ],
        techStack: ["Next.js", "React", "Tailwind CSS", "Motion", "Vercel"],
        timeline: "3–5 days",
        startingPriceBDT: 8000,
        startingPriceUSD: 99,
        packages: [
          {
            name: "Starter Funnel",
            priceBDT: 8000,
            priceUSD: 99,
            duration: "3 days",
            features: [
              "Single page up to 5 sections",
              "Mobile-first responsive design",
              "WhatsApp & Lead capture form",
              "Meta Pixel tracking setup",
              "1 month free bug support"
            ]
          },
          {
            name: "Pro Conversion Funnel",
            priceBDT: 15000,
            priceUSD: 150,
            duration: "5 days",
            popular: true,
            features: [
              "Up to 8 high-impact sections",
              "Custom copywriting framework",
              "Meta Pixel + CAPI + GA4 setup",
              "bKash/Nagad checkout or n8n webhook",
              "Motion micro-animations",
              "3 months free support"
            ]
          }
        ],
        faq: [
          {
            question: "How fast will the landing page load?",
            answer: "Under 1.5 seconds on 4G connections. We score 95+ on Google Lighthouse by optimizing assets and code."
          },
          {
            question: "Can I connect my own domain and hosting?",
            answer: "Yes! We deploy to Vercel and connect your domain (or help you buy one) with full SSL security."
          }
        ],
        icon: "FileCode"
      },
      {
        slug: "business-website",
        categorySlug: "web-development",
        category: "Web Development",
        title: "Company & Corporate Website",
        shortPitch: "Authority-building multi-page business websites that build trust and close deals.",
        problem: "Relying solely on Facebook pages makes your business look informal to enterprise clients and international buyers.",
        whoItsFor: [
          "Corporate agencies, consulting firms and export companies",
          "Manufacturers, healthcare centers, and educational institutes",
          "Local businesses looking for professional market authority"
        ],
        deliverables: [
          "5 to 10 custom pages (Home, About, Services, Case Studies, Contact)",
          "SEO foundation with JSON-LD Organization schema",
          "Interactive contact forms with email & WhatsApp routing",
          "CMS / dynamic data file structure for easy edits",
          "Performance score 95+ on mobile and desktop"
        ],
        process: [
          "Discovery call and sitemap architecture",
          "Figma design system aligned with brand identity",
          "Frontend development and CMS integration",
          "SEO meta tags and tracking deployment",
          "Handover training and 3-month support"
        ],
        techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Motion"],
        timeline: "7–14 days",
        startingPriceBDT: 18000,
        startingPriceUSD: 250,
        packages: [
          {
            name: "Standard Business",
            priceBDT: 18000,
            priceUSD: 250,
            duration: "7 days",
            features: [
              "Up to 5 pages",
              "Modern responsive UI",
              "Contact form + WhatsApp button",
              "Basic SEO & Google indexing",
              "2 months support"
            ]
          },
          {
            name: "Growth Corporate",
            priceBDT: 40000,
            priceUSD: 450,
            duration: "14 days",
            popular: true,
            features: [
              "Up to 10 pages + Blog/MDX",
              "Custom interactive components",
              "Speed optimization & SEO schema",
              "Lead capture with email alerts",
              "3 months support + team training"
            ]
          }
        ],
        faq: [
          {
            question: "Can I update photos and texts myself later?",
            answer: "Yes, we structure content in typed files or MDX so you or your team can edit without code knowledge."
          }
        ],
        icon: "Building"
      },
      {
        slug: "ecommerce-website",
        categorySlug: "web-development",
        category: "Web Development",
        title: "E-Commerce Website (bKash + Courier)",
        shortPitch: "Custom headless or Next.js storefronts with automatic bKash checkout and Pathao/Steadfast courier sync.",
        problem: "Managing hundreds of orders manually in Messenger inbox leads to missed orders, fake orders, and wasted courier fees.",
        whoItsFor: [
          "Clothing, cosmetics, and gadget brands selling online in Bangladesh",
          "Wholesalers and D2C brands transitioning away from slow WooCommerce"
        ],
        deliverables: [
          "Fast product catalog with search, filter, and variations",
          "Automated one-click bKash / Nagad / Card payment integration",
          "Automated Steadfast / Pathao courier order creation",
          "Customer order tracking & SMS / WhatsApp notification",
          "Admin dashboard for inventory & order status"
        ],
        process: [
          "Product catalog structure & payment gateway approval",
          "UI/UX tailored for Bangladeshi shoppers (1-click checkout)",
          "Payment gateway & courier API integration",
          "Testing end-to-end sandbox orders",
          "Launch and staff workflow training"
        ],
        techStack: ["Next.js", "Node.js", "PostgreSQL / Supabase", "bKash API", "Steadfast API"],
        timeline: "14–21 days",
        startingPriceBDT: 30000,
        startingPriceUSD: 500,
        packages: [
          {
            name: "E-Commerce Growth",
            priceBDT: 30000,
            priceUSD: 500,
            duration: "14 days",
            popular: true,
            features: [
              "Full store up to 50 products",
              "bKash & Nagad automated payment",
              "Steadfast / Pathao courier API",
              "Meta Pixel & CAPI catalog tracking",
              "3 months free technical support"
            ]
          },
          {
            name: "Custom Enterprise Store",
            priceBDT: 80000,
            priceUSD: 1200,
            duration: "25 days",
            features: [
              "Unlimited products & categories",
              "Custom inventory & multi-branch support",
              "Automated courier + SMS notifications",
              "Wholesale / B2B tier pricing",
              "6 months premium support"
            ]
          }
        ],
        faq: [
          {
            question: "Do you help with bKash merchant API setup?",
            answer: "Yes, we guide you through the merchant account process and handle all technical API integration."
          }
        ],
        icon: "ShoppingCart"
      },
      {
        slug: "custom-web-application",
        categorySlug: "web-development",
        category: "Web Development",
        title: "Custom Web Application & SaaS",
        shortPitch: "Scalable web platforms, customer portals, and SaaS MVPs with robust databases and authentication.",
        problem: "Off-the-shelf software doesn't fit your unique business operations or charges expensive monthly subscriptions per user.",
        whoItsFor: [
          "Startups launching a software-as-a-service (SaaS)",
          "Businesses needing custom client/partner portals"
        ],
        deliverables: [
          "Full-stack Next.js / Node.js application",
          "Role-based access control (RBAC)",
          "Secure database schema (PostgreSQL)",
          "Subscription billing / invoicing integration",
          "API documentation and automated deployment"
        ],
        process: ["SRS & Architecture", "Database design", "Sprint development", "QA & Penetration testing", "Production deployment"],
        techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Prisma / Drizzle", "PostgreSQL", "Auth0 / Supabase"],
        timeline: "3–6 weeks",
        startingPriceBDT: 100000,
        startingPriceUSD: 1500,
        packages: [
          {
            name: "SaaS MVP",
            priceBDT: 100000,
            priceUSD: 1500,
            duration: "4 weeks",
            popular: true,
            features: [
              "Core MVP features",
              "User auth & roles",
              "Stripe / bKash recurring billing",
              "PostgreSQL database",
              "3 months maintenance"
            ]
          }
        ],
        faq: [{ question: "Do we own the full source code?", answer: "100% yes. All code and repositories are transferred directly to your account." }],
        icon: "Layers"
      }
    ]
  },
  {
    slug: "ai-automation",
    title: "AI & Business Automation",
    shortDesc: "Automate repetitive customer support, lead qualification, and order processing 24/7.",
    icon: "Bot",
    services: [
      {
        slug: "ai-chatbot",
        categorySlug: "ai-automation",
        category: "AI & Business Automation",
        title: "AI Chatbot (Messenger & Website)",
        shortPitch: "Intelligent chatbot trained on your business data to answer questions and take orders 24/7 in Bangla & English.",
        problem: "Human agents take 30+ minutes to reply during peak hours or sleep at night, resulting in lost sales to competitors.",
        whoItsFor: [
          "Facebook page sellers and e-commerce stores",
          "Clinics, diagnostic centers and service companies",
          "Educational consultancies handling repetitive student inquiries"
        ],
        deliverables: [
          "Custom knowledge base trained on your products, FAQ and pricing",
          "Natural handling of Banglish, phonetic Bangla, and English",
          "Instant lead capture (Name, Phone, Address)",
          "Live human takeover option when needed",
          "Direct integration into Facebook Messenger & Website widget"
        ],
        process: [
          "Collection of FAQ, product sheets, and customer transcripts",
          "Prompt engineering and system instruction fine-tuning",
          "Messenger webhook / widget connection",
          "Live testing on 100+ edge-case questions",
          "Deployment with weekly accuracy monitoring"
        ],
        techStack: ["OpenAI / Claude API", "n8n", "Meta Messenger API", "Node.js"],
        timeline: "4–7 days",
        startingPriceBDT: 10000,
        startingPriceUSD: 150,
        packages: [
          {
            name: "Starter Chatbot",
            priceBDT: "৳10,000 setup + ৳2,500/mo",
            priceUSD: "$150 setup + $30/mo",
            duration: "5 days",
            popular: true,
            features: [
              "Trained on up to 50 products/services",
              "Banglish and English comprehension",
              "Lead capture & order collection",
              "Facebook Messenger integration",
              "Monthly maintenance & prompt tuning"
            ]
          }
        ],
        faq: [
          {
            question: "Can it understand Banglish (e.g. 'dam koto', 'delivery charge koto')?",
            answer: "Yes! It is specifically engineered with local colloquial prompts to understand Banglish, formal Bangla, and English."
          }
        ],
        icon: "MessageSquareCode"
      },
      {
        slug: "whatsapp-automation",
        categorySlug: "ai-automation",
        category: "AI & Business Automation",
        title: "WhatsApp Business API Automation",
        shortPitch: "Automated order confirmation, courier tracking alerts, and cart recovery via WhatsApp API.",
        problem: "SMS messages are ignored, but WhatsApp has a 98% open rate in Bangladesh.",
        whoItsFor: ["E-commerce stores wanting to reduce order cancellation and courier return rate"],
        deliverables: [
          "WhatsApp Cloud API verification & setup",
          "Automated order confirmation message with 1-click confirm/cancel",
          "Courier dispatched & tracking link alerts",
          "Abandoned checkout recovery messages",
          "Shared team inbox setup"
        ],
        process: ["Meta Business verification", "Template message approval", "Webhook integration with store", "Test message flows", "Go live"],
        techStack: ["WhatsApp Cloud API", "n8n", "Webhook", "PostgreSQL"],
        timeline: "5–8 days",
        startingPriceBDT: 15000,
        startingPriceUSD: 200,
        packages: [
          {
            name: "Standard WhatsApp Flow",
            priceBDT: "৳15,000 setup + ৳3,000/mo",
            priceUSD: "$200 setup + $40/mo",
            duration: "7 days",
            popular: true,
            features: [
              "WhatsApp Cloud API setup",
              "Automated order confirmation buttons",
              "Tracking status updates",
              "Cart recovery trigger",
              "Monthly server maintenance"
            ]
          }
        ],
        faq: [{ question: "Do Meta messaging fees apply?", answer: "Meta provides 1,000 free service conversations per month; paid marketing templates have small standard Meta fees." }],
        icon: "PhoneCall"
      },
      {
        slug: "crm-lead-automation",
        categorySlug: "ai-automation",
        category: "AI & Business Automation",
        title: "CRM & Lead Automation (n8n)",
        shortPitch: "Connect Facebook Lead Ads, Google Sheets, WhatsApp, and CRM without expensive monthly Zapier bills.",
        problem: "Sales leads sit uncalled for hours because someone forgot to manually download the Excel sheet from Facebook Ads Manager.",
        whoItsFor: ["Real estate developers, clinics, agencies, and B2B sales teams"],
        deliverables: [
          "Instant lead notification to sales team via WhatsApp / Telegram in <10 seconds",
          "Self-hosted n8n automation server (no per-task fees)",
          "Google Sheets / CRM two-way real-time synchronization",
          "Automated follow-up drip sequence"
        ],
        process: ["Lead funnel audit", "n8n workflow architecture", "CRM / Sheet mapping", "End-to-end testing", "Staff training"],
        techStack: ["n8n", "Docker", "Meta Graph API", "Google Sheets API", "WhatsApp API"],
        timeline: "5–10 days",
        startingPriceBDT: 25000,
        startingPriceUSD: 350,
        packages: [
          {
            name: "Pro Automation",
            priceBDT: 25000,
            priceUSD: 350,
            duration: "7 days",
            popular: true,
            features: [
              "Self-hosted n8n instance setup",
              "Facebook Ads to WhatsApp & CRM instant sync",
              "Automated lead assignment to sales reps",
              "Error monitoring & auto-retry",
              "3 months free workflow support"
            ]
          }
        ],
        faq: [{ question: "Why n8n instead of Zapier?", answer: "Zapier charges high monthly fees as tasks grow. n8n is self-hosted with unlimited tasks and zero per-run fees." }],
        icon: "Workflow"
      }
    ]
  },
  {
    slug: "seo-geo-tracking",
    title: "SEO, GEO & Tracking",
    shortDesc: "Get found on Google and in AI answers like ChatGPT — and track every conversion with Pixel + CAPI.",
    icon: "Search",
    services: [
      {
        slug: "tracking-pixel-capi",
        categorySlug: "seo-geo-tracking",
        category: "SEO, GEO & Tracking",
        title: "Pixel + CAPI Tracking Setup",
        shortPitch: "Bypass iOS ad blockers and Safari cookie restrictions with server-side Conversions API.",
        problem: "Browser-only Meta Pixel loses 25% to 40% of conversion data due to iOS 14+ privacy and ad blockers, resulting in poor AI ad optimization.",
        whoItsFor: ["Any business running Facebook ads with a website or landing page"],
        deliverables: [
          "Meta Conversions API (CAPI) server-side tracking",
          "Event deduplication with unique event IDs",
          "Standard events: PageView, ViewContent, AddToCart, InitiateCheckout, Purchase, Lead",
          "Google Tag Manager & GA4 setup",
          "Event Match Quality (EMQ) score 8.0+"
        ],
        process: ["Pixel audit", "Server endpoint deployment", "Event mapping & dedup verification", "Test event validation in Events Manager"],
        techStack: ["Next.js Server Actions", "Meta Graph CAPI", "Google Tag Manager", "GA4"],
        timeline: "2–3 days",
        startingPriceBDT: 8000,
        startingPriceUSD: 100,
        packages: [
          {
            name: "Complete CAPI Setup",
            priceBDT: 8000,
            priceUSD: 100,
            duration: "2 days",
            popular: true,
            features: [
              "Meta CAPI server integration",
              "Pixel event deduplication",
              "High Event Match Quality (EMQ)",
              "GA4 lead/purchase tracking",
              "Lifetime setup guarantee"
            ]
          }
        ],
        faq: [{ question: "How does CAPI improve my ad results?", answer: "Meta's algorithm gets accurate purchase signals directly from your server instead of a browser pixel that ad blockers and iOS privacy rules cut off." }],
        icon: "Cpu"
      },
      {
        slug: "seo",
        categorySlug: "seo-geo-tracking",
        category: "SEO, GEO & Tracking",
        title: "SEO (Search Engine Optimization)",
        shortPitch: "Rank on Google for the searches your customers already make — and turn that traffic into orders.",
        problem: "Most local business sites are invisible on Google: slow pages, missing meta tags, no structured data and no plan for the keywords buyers actually type.",
        whoItsFor: [
          "E-commerce stores that want free traffic instead of only paid ads",
          "Local service businesses (clinics, consultants, agencies)",
          "New websites that need a clean technical SEO foundation"
        ],
        deliverables: [
          "Technical SEO audit (speed, Core Web Vitals, indexing, crawl errors)",
          "Keyword research in Bangla and English",
          "On-page SEO: titles, meta descriptions, headings, internal links",
          "Schema / JSON-LD structured data",
          "Google Search Console & sitemap setup",
          "Google Business Profile optimization for local search"
        ],
        process: ["SEO audit", "Keyword & competitor research", "Technical fixes", "On-page optimization", "Monitoring & reporting"],
        techStack: ["Google Search Console", "Google Analytics 4", "Ahrefs / Semrush", "Schema.org", "Next.js Metadata API"],
        timeline: "Project or monthly",
        startingPriceBDT: 0,
        startingPriceUSD: 0,
        packages: [
          {
            name: "SEO Setup & Growth",
            priceBDT: "Custom quote",
            priceUSD: "Custom quote",
            duration: "Based on your site",
            popular: true,
            features: [
              "Full technical SEO audit",
              "Bangla + English keyword plan",
              "On-page optimization of key pages",
              "Structured data & sitemap",
              "Search Console setup and reporting"
            ]
          }
        ],
        faq: [
          {
            question: "How long does SEO take to show results?",
            answer: "Technical fixes help right away, but rankings usually take a few months to build. We report progress from Search Console so you can see it move."
          }
        ],
        icon: "Search"
      },
      {
        slug: "geo",
        categorySlug: "seo-geo-tracking",
        category: "SEO, GEO & Tracking",
        title: "GEO (Generative Engine Optimization)",
        shortPitch: "Get your brand recommended in AI answers — ChatGPT, Gemini, Perplexity and Google AI Overviews.",
        problem: "Buyers now ask AI assistants for recommendations instead of scrolling Google. If your brand isn't in the sources these tools read, you're not in the answer.",
        whoItsFor: [
          "Brands that want to show up when customers ask AI for recommendations",
          "Businesses already doing SEO that want to stay visible as search shifts to AI",
          "Service providers and SaaS products competing on expertise"
        ],
        deliverables: [
          "AI visibility audit: how ChatGPT, Gemini and Perplexity describe your brand today",
          "Content structured for AI answers (clear Q&A, facts, comparisons)",
          "Entity and brand signals: schema, About and author pages, consistent profiles",
          "llms.txt and crawler access for AI bots",
          "Monitoring of brand mentions in AI answers"
        ],
        process: ["AI visibility audit", "Entity & content gap analysis", "Content and schema updates", "AI crawler setup", "Answer monitoring"],
        techStack: ["Schema.org", "llms.txt", "Google Search Console", "ChatGPT / Gemini / Perplexity testing"],
        timeline: "Project or monthly",
        startingPriceBDT: 0,
        startingPriceUSD: 0,
        packages: [
          {
            name: "GEO Setup",
            priceBDT: "Custom quote",
            priceUSD: "Custom quote",
            duration: "Based on your brand",
            popular: true,
            features: [
              "AI visibility audit",
              "AI-ready content structure",
              "Brand entity & schema setup",
              "llms.txt and AI crawler access",
              "Mention monitoring"
            ]
          }
        ],
        faq: [
          {
            question: "Is GEO different from SEO?",
            answer: "They overlap. SEO gets you ranked in Google's links; GEO makes your brand easy for AI tools to understand, trust and quote in their answers. They work best together."
          }
        ],
        icon: "Sparkles"
      }
    ]
  },
  {
    slug: "custom-software",
    title: "Custom Business Software",
    shortDesc: "Tailored ERP, inventory, and booking systems built around your company's exact workflow.",
    icon: "Database",
    services: [
      {
        slug: "erp-crm-systems",
        categorySlug: "custom-software",
        category: "Custom Business Software",
        title: "Custom ERP & CRM Software",
        shortPitch: "Unified operating software for customer management, invoicing, staff tasks, and accounts.",
        problem: "Managing business operations across 10 different spreadsheets causes errors, misplaced files, and zero visibility for directors.",
        whoItsFor: ["Trading houses, distributors, service agencies, and growing companies with 5+ staff"],
        deliverables: [
          "Custom database architecture built for your workflow",
          "User permissions (Admin, Manager, Staff, Accountant)",
          "Customer relationship and pipeline tracking",
          "Invoicing, payment collection, and expense logs",
          "Real-time executive analytics dashboard"
        ],
        process: ["Workflow mapping", "Wireframing & database schema", "Modular development sprints", "Staff onboarding & testing", "Cloud deployment"],
        techStack: ["Next.js", "TypeScript", "PostgreSQL", "Tailwind CSS", "Prisma"],
        timeline: "4–8 weeks",
        startingPriceBDT: 150000,
        startingPriceUSD: 2000,
        packages: [
          {
            name: "Custom Build",
            priceBDT: "from ৳1,50,000",
            priceUSD: "from $2,000",
            duration: "6 weeks",
            popular: true,
            features: [
              "Tailored to your exact business workflow",
              "Unlimited staff seats (no per-user subscription)",
              "Full source code ownership",
              "Cloud deployment with automated backups",
              "6 months free support & updates"
            ]
          }
        ],
        faq: [{ question: "Do you charge monthly user subscription fees?", answer: "No! You own the software and host it on your own cloud. There are no per-seat monthly software charges." }],
        icon: "LayoutDashboard"
      },
      {
        slug: "inventory-booking-systems",
        categorySlug: "custom-software",
        category: "Custom Business Software",
        title: "Inventory & Booking Management",
        shortPitch: "Live stock tracking across multiple warehouses or appointment booking with SMS confirmation.",
        problem: "Overselling stock that is actually out of inventory, or double-booking client appointments.",
        whoItsFor: ["Retail chains, clinics, diagnostic centers, salons, and rental services"],
        deliverables: [
          "Barcode scanner & stock inward/outward module",
          "Low-stock alert triggers via WhatsApp/email",
          "Appointment scheduling calendar with automated reminders",
          "Sales receipt & invoice printing"
        ],
        process: ["Requirements review", "Sprint development", "Hardware / barcode integration", "Staff training"],
        techStack: ["Next.js", "Node.js", "PostgreSQL", "Tailwind CSS"],
        timeline: "3–5 weeks",
        startingPriceBDT: 50000,
        startingPriceUSD: 700,
        packages: [
          {
            name: "Standard System",
            priceBDT: 50000,
            priceUSD: 700,
            duration: "3 weeks",
            popular: true,
            features: [
              "Multi-item inventory or booking calendar",
              "Automated WhatsApp / SMS reminders",
              "Invoice generation",
              "3 months technical support"
            ]
          }
        ],
        faq: [{ question: "Can it work on mobile and tablet?", answer: "Yes, the interface is completely responsive and works on phones, tablets, POS terminals and PCs." }],
        icon: "CalendarCheck"
      }
    ]
  },
  {
    slug: "api-integrations",
    title: "API & Integrations",
    shortDesc: "Connect payment gateways, courier logistics, and external APIs seamlessly into your tech stack.",
    icon: "Network",
    services: [
      {
        slug: "payment-gateway-integration",
        categorySlug: "api-integrations",
        category: "API & Integrations",
        title: "Payment Gateway Integration (bKash, Nagad, Stripe)",
        shortPitch: "Secure, automated payment checkout with instant webhook callbacks for verified order status.",
        problem: "Customers abandoning orders because they have to send money manually and wait hours for verification.",
        whoItsFor: ["Websites and apps needing automated payment processing in BDT and USD"],
        deliverables: [
          "bKash Tokenized Checkout (Grant Token, Create, Execute)",
          "Nagad Checkout / SSLCommerz / Aamarpay integration",
          "Stripe checkout for international cards",
          "Instant webhook validation & database status update",
          "Refund and transaction query tools"
        ],
        process: ["Merchant credentials verification", "Sandbox test suite", "Live key activation and checkout testing"],
        techStack: ["bKash API", "Nagad API", "SSLCommerz", "Stripe", "Next.js Route Handlers"],
        timeline: "2–4 days",
        startingPriceBDT: 6000,
        startingPriceUSD: 80,
        packages: [
          {
            name: "Single Gateway",
            priceBDT: 6000,
            priceUSD: 80,
            duration: "2 days",
            features: ["bKash or Nagad tokenized checkout", "Webhook callback handling", "30 days support"]
          },
          {
            name: "All-in-One Gateway",
            priceBDT: 15000,
            priceUSD: 200,
            duration: "4 days",
            popular: true,
            features: ["bKash + Nagad + SSLCommerz + Stripe", "Unified payment modal", "Automatic failover", "60 days support"]
          }
        ],
        faq: [{ question: "Do you support bKash Tokenized checkout?", answer: "Yes! We implement the modern tokenized API which allows one-click customer payment without leaving the page." }],
        icon: "CreditCard"
      },
      {
        slug: "courier-api-integration",
        categorySlug: "api-integrations",
        category: "API & Integrations",
        title: "Courier API Integration (Steadfast, Pathao, RedX)",
        shortPitch: "One-click consignment creation, tracking sync, and delivery status updates for Bangladesh logistics.",
        problem: "Entering 50 customer addresses manually into the courier portal every single day takes hours and creates spelling mistakes.",
        whoItsFor: ["E-commerce stores and distributors shipping packages across Bangladesh"],
        deliverables: [
          "One-click consignment creation directly from store admin",
          "Automatic consignment ID and tracking code assignment",
          "Real-time webhook for delivery status (Delivered, Returned, In Transit)",
          "Printable shipping invoice label generation"
        ],
        process: ["Courier merchant API connection", "Order mapping", "Automated webhook setup", "Test shipment dispatch"],
        techStack: ["Steadfast API", "Pathao Courier API", "RedX API", "Node.js"],
        timeline: "2–4 days",
        startingPriceBDT: 6000,
        startingPriceUSD: 80,
        packages: [
          {
            name: "Steadfast / Pathao Sync",
            priceBDT: 8000,
            priceUSD: 100,
            duration: "3 days",
            popular: true,
            features: [
              "Automated parcel creation",
              "Real-time delivery status sync",
              "Printable courier slip generator",
              "30 days support"
            ]
          }
        ],
        faq: [{ question: "Which courier APIs do you support?", answer: "We support Steadfast, Pathao Courier, RedX, eCourier, and Paperfly." }],
        icon: "Truck"
      }
    ]
  }
];

export function getAllServices(): SubService[] {
  return serviceCategories.flatMap((cat) => cat.services);
}

export function getServiceBySlug(slug: string): SubService | undefined {
  return getAllServices().find((s) => s.slug === slug);
}

export function getCategoryBySlug(slug: string): ServiceCategory | undefined {
  return serviceCategories.find((c) => c.slug === slug);
}
