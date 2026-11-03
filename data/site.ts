export interface SiteConfig {
  name: string;
  tagline: string;
  description: string;
  url: string;
  contactEmail: string;
  phone: string;
  whatsappNumber: string; // e.g. "8801645650504" (no + for wa.me)
  whatsappDisplay: string; // "+880 1645-650504"
  address: {
    street: string;
    area: string;
    city: string;
    country: string;
    postalCode: string;
  };
  officeHours: string;
  tradeLicense: string;
  socials: {
    facebook: string;
    linkedin: string;
    github?: string;
    twitter?: string;
    googleBusiness?: string;
  };
}

export const siteConfig: SiteConfig = {
  name: "ScaleUp Web",
  tagline: "We build websites and AI systems that bring you more customers.",
  description:
    "ScaleUp Web helps Bangladeshi and international businesses grow with ultra-fast websites, AI chatbots, WhatsApp automation, SEO and GEO that get you found on Google and in AI search, and tracking that counts every sale.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://scaleupweb.xyz",
  contactEmail: process.env.CONTACT_EMAIL || "hello@scaleupweb.xyz",
  phone: "+8801645650504",
  whatsappNumber: "8801645650504",
  whatsappDisplay: "+880 1645-650504",
  address: {
    street: "Tejgaon Commercial Area",
    area: "Tejgaon / Farmgate",
    city: "Dhaka",
    country: "Bangladesh",
    postalCode: "1215",
  },
  officeHours: "Saturday - Thursday: 10:00 AM - 10:00 PM (GMT+6)",
  tradeLicense: "TRAD/DSCC/019482/2024",
  socials: {
    facebook: "https://facebook.com/scaleupweb",
    linkedin: "https://linkedin.com/company/scaleupweb",
    googleBusiness: "https://maps.google.com/?q=ScaleUp+Web+Dhaka",
  },
};

export function getWhatsAppUrl(message?: string) {
  const text = message
    ? encodeURIComponent(message)
    : encodeURIComponent(
        "Hi ScaleUp Web! I am interested in discussing a website / AI automation project for my business."
      );
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${text}`;
}
