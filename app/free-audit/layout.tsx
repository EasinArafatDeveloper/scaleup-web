import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata({
  title: "Free Website & Funnel Audit",
  description:
    "Get a free, no-pressure video audit of your website speed, SEO, tracking and checkout — delivered within 24 hours.",
  path: "/free-audit"
});

export default function FreeAuditLayout({ children }: { children: React.ReactNode }) {
  return children;
}
