"use client";

import * as React from "react";
import { ArrowUpRight, Plus } from "lucide-react";
import { homeFAQList } from "@/data/faq";
import { getWhatsAppUrl } from "@/data/site";
import { SplitReveal } from "@/components/motion/split-reveal";
import { cn } from "@/lib/utils";

export function FAQSection() {
  const [open, setOpen] = React.useState<string | null>(homeFAQList[0]?.id ?? null);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: homeFAQList.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer }
    }))
  };

  return (
    <section className="py-28 sm:py-36">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 px-5 sm:px-8 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-32">
            <SplitReveal
              className="font-display text-5xl font-semibold leading-[0.95] text-fg sm:text-6xl"
              lines={[
                "Questions,",
                <>
                  <span className="serif-accent text-accent">answered.</span>
                </>
              ]}
            />
            <div className="mt-10 rounded-3xl border border-line bg-surface p-6">
              <p className="text-sm text-muted">Something we didn&apos;t cover?</p>
              <a
                href={getWhatsAppUrl("Hi ScaleUp Web! I have a question before starting a project.")}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-3 flex items-center justify-between font-display text-xl font-semibold text-fg"
              >
                Ask us on WhatsApp
                <ArrowUpRight className="h-5 w-5 text-accent transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-line lg:col-span-8">
          {homeFAQList.map((item, i) => {
            const isOpen = open === item.id;
            return (
              <div key={item.id} className="border-b border-line">
                <button
                  onClick={() => setOpen(isOpen ? null : item.id)}
                  aria-expanded={isOpen}
                  className="group flex w-full items-start gap-6 py-7 text-left"
                >
                  <span className="pt-1.5 font-mono text-xs text-muted-2">{String(i + 1).padStart(2, "0")}</span>
                  <span
                    className={cn(
                      "flex-1 font-display text-xl font-semibold transition-colors sm:text-2xl",
                      isOpen ? "text-fg" : "text-muted group-hover:text-fg"
                    )}
                  >
                    {item.question}
                  </span>
                  <Plus
                    className={cn(
                      "mt-1.5 h-5 w-5 shrink-0 transition-transform duration-500 ease-out-expo",
                      isOpen ? "rotate-45 text-accent" : "text-muted"
                    )}
                  />
                </button>
                <div
                  className={cn(
                    "grid transition-[grid-template-rows,opacity] duration-500 ease-out-expo",
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  )}
                >
                  <div className="overflow-hidden">
                    <p className="max-w-2xl pb-8 pl-[2.6rem] text-[15px] leading-relaxed text-muted">{item.answer}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
