export interface IndustryItem {
  slug: string;
  name: string;
  headline: string;
  painPoints: string[];
  recommendedStack: string[];
  keyBenefits: string[];
  suggestedPackage: string;
  caseStudySlug?: string;
  icon: string;
}

export const industriesData: IndustryItem[] = [
  {
    slug: "fashion-clothing",
    name: "Fashion & Clothing",
    headline: "Stop losing clothing sales in messy Messenger chats and fake orders",
    painPoints: [
      "Customers ask for size charts and color availability repeatedly",
      "Manual address collection leads to courier return losses",
      "Expensive Meta ads without pixel tracking waste budget"
    ],
    recommendedStack: [
      "Custom E-Commerce Store with Size Guide",
      "bKash & Nagad 1-Click Checkout",
      "Steadfast / Pathao Courier API Auto-dispatch",
      "Meta Pixel + CAPI Ad Tracking"
    ],
    keyBenefits: [
      "70% reduction in customer response time",
      "Zero manual courier address entry",
      "Accurate pixel data for retargeting shoppers"
    ],
    suggestedPackage: "Grow Bundle (৳45,000)",
    icon: "Shirt"
  },
  {
    slug: "beauty-cosmetics",
    name: "Beauty & Cosmetics",
    headline: "High-trust digital storefronts with verified authenticity and fast checkout",
    painPoints: [
      "Customers hesitate to buy skincare without authenticity proof",
      "Heavy cart abandonment on slow, complicated checkout forms",
      "High competition on Facebook ad auctions"
    ],
    recommendedStack: [
      "Fast Visual Landing Pages",
      "Video Reviews & Trust Badges",
      "WhatsApp Cart Recovery Sequence",
      "Meta CAPI Conversion Funnel"
    ],
    keyBenefits: [
      "Higher conversion rate on impulse beauty purchases",
      "Automated follow-ups on abandoned orders",
      "Detailed customer lifetime value tracking"
    ],
    suggestedPackage: "Launch or Grow Bundle",
    icon: "Sparkles"
  },
  {
    slug: "clinics-doctors",
    name: "Clinics & Doctors",
    headline: "Automate patient appointments and reminders without a crowded reception desk",
    painPoints: [
      "Patients calling after clinic hours get no response",
      "High patient no-show rate for confirmed appointments",
      "Paper-based patient logs and scheduling conflicts"
    ],
    recommendedStack: [
      "Doctor Booking Portal",
      "24/7 WhatsApp AI Appointment Bot",
      "Automated SMS/WhatsApp Reminders 2 hours before visit",
      "Google Business Profile & Local SEO"
    ],
    keyBenefits: [
      "Book appointments even at 2 AM automatically",
      "60% drop in patient appointment no-shows",
      "Professional medical brand authority online"
    ],
    suggestedPackage: "Custom Booking System (৳50,000+)",
    icon: "Stethoscope"
  },
  {
    slug: "education-consultancy",
    name: "Education & Study Abroad",
    headline: "Qualify student visa leads instantly and assign them to counselors in seconds",
    painPoints: [
      "Facebook lead ads generate hundreds of unqualified contacts",
      "Students wait days for a callback and choose rival agencies",
      "Counselors forget to follow up with pending applications"
    ],
    recommendedStack: [
      "Lead Qualification Funnel",
      "n8n Lead Routing to Counselor WhatsApp in <10 seconds",
      "Automated Country & Scholarship Assessment Quiz",
      "Meta Lead Ads CAPI Integration"
    ],
    keyBenefits: [
      "Contact hot student leads while they are still on Facebook",
      "Filter out unqualified inquiries automatically",
      "Full visibility into counselor closing rates"
    ],
    suggestedPackage: "CRM / Lead Automation (৳35,000)",
    icon: "GraduationCap"
  },
  {
    slug: "real-estate",
    name: "Real Estate & Developers",
    headline: "Showcase luxury properties with interactive floor plans and VIP lead capture",
    painPoints: [
      "Generic property brochures get lost in email spam",
      "High ad cost per lead without proper buyer budget qualification",
      "No direct way to track which advertising channel brought the buyer"
    ],
    recommendedStack: [
      "Interactive Property Showcase Website",
      "Virtual Tour / Video Embed Galleries",
      "High-Net-Worth Buyer Qualification Form",
      "Direct VIP WhatsApp Concierge Button"
    ],
    keyBenefits: [
      "Pre-qualify buyers by budget and location preferences",
      "Instant notification to senior sales executives",
      "Unmatched premium visual brand presence"
    ],
    suggestedPackage: "Growth Corporate Website (৳40,000+)",
    icon: "Home"
  },
  {
    slug: "restaurants-food",
    name: "Restaurants & Food Chains",
    headline: "Direct online food ordering without paying 25% commissions to food apps",
    painPoints: [
      "Third-party food delivery apps eat 20%–30% of profit margins",
      "No customer phone number or data to run retargeting deals",
      "Order miscommunications during busy dinner rush hours"
    ],
    recommendedStack: [
      "Direct Digital Menu & Ordering System",
      "bKash & Cash on Delivery Options",
      "Kitchen Printer / Admin Alert Webhook",
      "Customer Database for SMS/WhatsApp offers"
    ],
    keyBenefits: [
      "Keep 100% of your food order margins",
      "Build a loyal customer database you actually own",
      "Instant kitchen order dispatch"
    ],
    suggestedPackage: "Grow Bundle or Custom Food Portal",
    icon: "Utensils"
  },
  {
    slug: "ecommerce-retail",
    name: "E-Commerce & Retail",
    headline: "Scale your retail brand with lightning-fast checkout and automated logistics",
    painPoints: [
      "Laggy websites losing mobile shoppers on 4G connections",
      "Courier reconciliation and tracking headaches",
      "Lost sales from unengaged website visitors"
    ],
    recommendedStack: [
      "Headless Next.js Storefront (<1.5s load)",
      "bKash Tokenized + Nagad + Card Gateways",
      "Steadfast / Pathao Automated API",
      "AI Messenger Chatbot for Customer Support"
    ],
    keyBenefits: [
      "Sub-second page navigation and instant search",
      "Automatic parcel generation with 1-click",
      "24/7 AI answering customer queries"
    ],
    suggestedPackage: "Grow Bundle (৳45,000)",
    caseStudySlug: "amar-organic-shop",
    icon: "ShoppingBag"
  }
];

export function getIndustryBySlug(slug: string): IndustryItem | undefined {
  return industriesData.find((i) => i.slug === slug);
}
