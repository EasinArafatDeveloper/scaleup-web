import { pageMetadata } from "@/lib/seo";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { serviceCategories } from "@/data/services";
import { PageHero } from "@/components/page/page-hero";
import { Reveal } from "@/components/motion/reveal";
import { CTABannerSection } from "@/components/sections/cta-banner";

export const metadata = pageMetadata({
  title: "Services — Web, SaaS, AI, SEO & GEO",
  description:
    "Our 5 core services: Next.js web development, AI chatbots & n8n automation, SEO, GEO & tracking, custom business software, and payment/courier API integrations.",
  path: "/services"
});

export default function ServicesPage() {
  const total = serviceCategories.reduce((n, c) => n + c.services.length, 0);

  return (
    <>
      <PageHero
        label="Services"
        meta={`${serviceCategories.length} disciplines · ${total} services`}
        title={["Everything your", "business needs to"]}
        accent="grow."
        intro="Five disciplines, one team. Every service ships with a fixed price, a clear deadline and support after launch."
      >
        {/* Jump index */}
        <ul className="flex flex-wrap gap-2 md:justify-end">
          {serviceCategories.map((c, i) => (
            <li key={c.slug}>
              <a
                href={`#${c.slug}`}
                className="inline-flex items-center gap-2 rounded-full border border-line-strong px-4 py-2 text-sm text-muted transition-colors hover:border-fg hover:text-fg"
              >
                <span className="font-mono text-[10px] text-accent">0{i + 1}</span>
                {c.title}
              </a>
            </li>
          ))}
        </ul>
      </PageHero>

      {serviceCategories.map((cat, i) => (
        <section
          key={cat.slug}
          id={cat.slug}
          className={`scroll-mt-24 border-t border-line py-24 sm:py-32 ${i % 2 === 1 ? "bg-ink-alt" : ""}`}
        >
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-14 px-5 sm:px-8 lg:grid-cols-12">
            {/* Sticky category header */}
            <div className="lg:col-span-5">
              <div className="lg:sticky lg:top-32">
                <div className="font-display text-[7rem] font-semibold leading-none tracking-[-0.06em] text-line-strong sm:text-[9rem]">
                  0{i + 1}
                </div>
                <h2 className="font-display -mt-4 text-4xl font-semibold text-fg sm:text-5xl">{cat.title}</h2>
                <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-muted">{cat.shortDesc}</p>
                <Link
                  href={`/services/${cat.slug}`}
                  className="group mt-8 inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.16em] text-fg"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-accent-ink transition-transform duration-500 ease-out-expo group-hover:rotate-45">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                  Category overview
                </Link>
              </div>
            </div>

            {/* Service rows */}
            <div className="border-t border-line lg:col-span-7">
              {cat.services.map((s, j) => (
                <Reveal key={s.slug} delay={j * 0.05}>
                  <Link
                    href={`/services/${cat.slug}/${s.slug}`}
                    className="group grid grid-cols-[auto_1fr_auto] items-start gap-x-6 gap-y-3 border-b border-line py-8"
                  >
                    <span className="pt-2 font-mono text-xs text-muted-2 transition-colors group-hover:text-accent">
                      {String(i + 1).padStart(2, "0")}.{j + 1}
                    </span>
                    <div>
                      <h3 className="font-display text-2xl font-semibold text-fg transition-transform duration-500 ease-out-expo group-hover:translate-x-1 sm:text-3xl">
                        {s.title}
                      </h3>
                      <p className="mt-2 max-w-lg text-sm leading-relaxed text-muted">{s.shortPitch}</p>
                      <div className="mt-4 flex flex-wrap gap-x-5 gap-y-1 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-2">
                        <span>
                          {s.startingPriceBDT > 0 ? <>From <span className="text-fg">৳{s.startingPriceBDT.toLocaleString()}</span></> : <span className="text-fg">Custom quote</span>}
                        </span>
                        <span>{s.timeline}</span>
                      </div>
                    </div>
                    <span className="mt-1 flex h-10 w-10 items-center justify-center rounded-full border border-line-strong text-fg transition-all duration-500 ease-out-expo group-hover:rotate-45 group-hover:border-accent group-hover:bg-accent group-hover:text-accent-ink">
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ))}

      <CTABannerSection index="06" eyebrow="Not sure which one you need?" line1="Let’s find" line2="your" accent="fit." />
    </>
  );
}
