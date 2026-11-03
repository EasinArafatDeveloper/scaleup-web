"use client";

import * as React from "react";
import { AnimatePresence, motion } from "motion/react";
import { pricingTable, pricingNotes } from "@/data/pricing";
import { PageHero } from "@/components/page/page-hero";
import { SectionHead } from "@/components/page/section-head";
import { Accordion } from "@/components/ui/accordion";
import { BundleGrid, CurrencyToggle, type Currency } from "@/components/sections/pricing-preview";
import { CTABannerSection } from "@/components/sections/cta-banner";
import { cn } from "@/lib/utils";

const categories = Array.from(new Set(pricingTable.map((r) => r.category)));

const pricingFaq = [
  { question: "How do payments work?", answer: pricingNotes.paymentTerms },
  { question: "What isn't included in the price?", answer: pricingNotes.thirdPartyNotice },
  { question: "What do you guarantee?", answer: pricingNotes.guaranteeNotice },
  {
    question: "Can I get a custom quote?",
    answer:
      "Yes. Tell us what you need and we'll send a written, fixed-price proposal within 24 hours — no obligation."
  }
];

export default function PricingPage() {
  const [currency, setCurrency] = React.useState<Currency>("BDT");
  const [tab, setTab] = React.useState(categories[0]);
  const rows = pricingTable.filter((r) => r.category === tab);

  return (
    <>
      <PageHero
        label="Pricing"
        meta="Fixed price · No hidden fees"
        title={["Clear prices.", "Zero"]}
        accent="surprises."
        intro="Pick an all-in bundle, or a single service from the rate card. Every number below is a real starting price."
      >
        <CurrencyToggle currency={currency} onChange={setCurrency} />
      </PageHero>

      {/* Bundles */}
      <section className="border-t border-line bg-ink-alt py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHead index="01" label="Bundles" title="All-in" accent="bundles." />
          <div className="mt-16">
            <BundleGrid currency={currency} />
          </div>
        </div>
      </section>

      {/* Rate card */}
      <section className="border-t border-line py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHead
            index="02"
            label="Rate card"
            title="Or pick"
            accent="à la carte."
            intro="Need just one landing page or a single integration? Here are our starting rates."
          />

          {/* Category tabs */}
          <div className="mt-14 flex gap-2 overflow-x-auto pb-2 [scrollbar-width:none]">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setTab(c)}
                className={cn(
                  "relative shrink-0 rounded-full px-5 py-2.5 text-sm transition-colors",
                  tab === c ? "text-ink" : "text-muted hover:text-fg"
                )}
              >
                {tab === c && (
                  <motion.span
                    layoutId="rate-tab"
                    className="absolute inset-0 rounded-full bg-fg"
                    transition={{ type: "spring", stiffness: 400, damping: 34 }}
                  />
                )}
                <span className="relative">{c}</span>
              </button>
            ))}
          </div>

          <div className="mt-8 border-t border-line">
            <AnimatePresence mode="wait">
              <motion.div
                key={tab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                {rows.map((row) => (
                  <div
                    key={row.service}
                    className="group grid grid-cols-1 gap-2 border-b border-line py-6 sm:grid-cols-12 sm:items-baseline sm:gap-6"
                  >
                    <div className="font-display text-2xl font-semibold text-fg sm:col-span-5">{row.service}</div>
                    <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-2 sm:col-span-3">
                      {row.package}
                    </div>
                    <div className="font-display text-xl font-semibold text-accent sm:col-span-4 sm:text-right">
                      {currency === "BDT" ? row.priceBDT : row.priceUSD}
                    </div>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Fine print */}
      <section className="border-t border-line bg-ink-alt py-24 sm:py-32">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-14 px-5 sm:px-8 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHead index="03" label="The fine print" title="No small" accent="print." stacked />
          </div>
          <div className="lg:col-span-8">
            <Accordion items={pricingFaq} />
          </div>
        </div>
      </section>

      <CTABannerSection index="04" eyebrow="Need a tailored scope?" line1="Get a quote" line2="in" accent="24 hours." />
    </>
  );
}
