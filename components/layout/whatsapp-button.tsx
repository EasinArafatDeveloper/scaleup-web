"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { MessageCircle } from "lucide-react";
import { siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";

export function WhatsAppFloatingButton() {
  const pathname = usePathname();
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const message = encodeURIComponent(
    `Hi ScaleUp Web! I am visiting from ${siteConfig.url}${pathname} and would like to discuss a project.`
  );

  return (
    <a
      href={`https://wa.me/${siteConfig.whatsappNumber}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with ScaleUp Web on WhatsApp"
      className={cn(
        "group fixed bottom-5 right-5 z-50 flex h-14 items-center gap-0 overflow-hidden rounded-full bg-[#25D366] pl-4 pr-4 text-sm font-semibold text-[#062b14] shadow-2xl shadow-black/40 transition-all duration-500 ease-out-expo hover:gap-2.5 hover:pr-5",
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"
      )}
    >
      <MessageCircle className="h-6 w-6 shrink-0 fill-current" />
      <span className="max-w-0 overflow-hidden whitespace-nowrap transition-all duration-500 ease-out-expo group-hover:max-w-40">
        Chat on WhatsApp
      </span>
    </a>
  );
}
