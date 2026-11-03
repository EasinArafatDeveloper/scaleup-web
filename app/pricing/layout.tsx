import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata({
  title: "Pricing — Fixed-Price Bundles & Rate Card",
  description:
    "Transparent, fixed-price bundles and a service-by-service rate card in BDT and USD for websites, AI automation, SEO, GEO, tracking and integrations.",
  path: "/pricing"
});

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return children;
}
