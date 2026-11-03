import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata({
  title: "Contact — Book a Call or Message Us",
  description:
    "Talk to ScaleUp Web on WhatsApp, phone or email, or send a project inquiry. We reply within 2 hours, 10am–10pm Dhaka time.",
  path: "/contact"
});

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
