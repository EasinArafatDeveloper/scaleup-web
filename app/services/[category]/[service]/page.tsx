import { pageMetadata } from "@/lib/seo";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { serviceCategories, getServiceBySlug, getCategoryBySlug, formatStartingPrice } from "@/data/services";
import { getWhatsAppUrl, siteConfig } from "@/data/site";
import { PageHero } from "@/components/page/page-hero";
import { SectionHead } from "@/components/page/section-head";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { Accordion } from "@/components/ui/accordion";
import { CTABannerSection } from "@/components/sections/cta-banner";
import { cn } from "@/lib/utils";

export async function generateStaticParams() {
  return serviceCategories.flatMap((cat) =>
    cat.services.map((sub) => ({ category: cat.slug, service: sub.slug }))
  );
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ category: string; service: string }>;
}) {
  const { service: slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return { title: "Service Not Found" };
  return pageMetadata({
    title: service.title,
    description: service.shortPitch,
    path: `/services/${service.categorySlug}/${service.slug}`
  });
}

function formatPrice(p: number | string, prefix: string) {
  return typeof p === "number" ? `${prefix}${p.toLocaleString()}` : p;
}

export default async function ServiceDetailPage({
  params
}: {
  params: Promise<{ category: string; service: string }>;
}) {
  const resolved = await params;
  const service = getServiceBySlug(resolved.service);
  const category = getCategoryBySlug(resolved.category);
  if (!service || !category) notFound();

  const siblings = category.services.filter((s) => s.slug !== service.slug);
  // "AI Chatbot (Messenger & Website)" → plain "AI Chatbot" + serif "Messenger & Website"
  const paren = service.title.match(/^(.*?)\s*\((.+)\)\s*$/);
  const words = paren ? [paren[1]] : service.title.split(" ");
  const accent = paren ? paren[2] : words.pop();

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.shortPitch,
    provider: {
      "@type": "LocalBusiness",
      name: siteConfig.name,
      telephone: siteConfig.phone,
      address: {
        "@type": "PostalAddress",
        streetAddress: siteConfig.address.street,
        addressLocality: siteConfig.address.area,
        addressRegion: siteConfig.address.city,
        addressCountry: "BD"
      }
    },
    areaServed: { "@type": "Country", name: "Bangladesh" },
    // Quoted-per-project services have no fixed price to publish.
    ...(service.startingPriceBDT > 0 && {
      offers: { "@type": "Offer", price: service.startingPriceBDT, priceCurrency: "BDT" }
    })
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />

      <PageHero
        crumbs={[
          { label: "Services", href: "/services" },
          { label: category.title, href: `/services/${category.slug}` },
          { label: service.title }
        ]}
        label={category.title}
        title={words.length ? [words.join(" ")] : []}
        accent={accent}
        size="lg"
        intro={service.shortPitch}
      >
        <div className="flex flex-col gap-6 md:items-end">
          <div className="flex gap-10">
            <div>
              <div className="font-display text-4xl font-semibold tracking-[-0.04em] text-fg">
                {formatStartingPrice(service.startingPriceBDT)}
              </div>
              <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-2">
                {service.startingPriceUSD > 0 ? `From · $${service.startingPriceUSD}` : "Priced per project"}
              </div>
            </div>
            <div>
              <div className="font-display text-4xl font-semibold tracking-[-0.04em] text-fg">{service.timeline}</div>
              <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-2">Timeline</div>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button href="/free-audit" variant="primary" size="lg">
              Free audit &amp; proposal <ArrowUpRight className="h-4 w-4" />
            </Button>
            <Button
              href={getWhatsAppUrl(`Hi ScaleUp Web! I am interested in ${service.title}.`)}
              isExternal
              variant="secondary"
              size="lg"
            >
              WhatsApp
            </Button>
          </div>
        </div>
      </PageHero>

      {/* The problem — pull quote */}
      <section className="border-t border-line py-24 sm:py-32">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-5 sm:px-8 lg:grid-cols-12">
          <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted lg:col-span-3">
            <span className="text-accent">(01)</span> — The problem
          </div>
          <Reveal className="lg:col-span-9">
            <p className="serif-accent text-[clamp(1.9rem,4vw,3.6rem)] leading-[1.1] text-fg">
              <span className="text-accent">“</span>
              {service.problem}
              <span className="text-accent">”</span>
            </p>
          </Reveal>
        </div>
      </section>

      {/* Who it's for */}
      <section className="border-t border-line bg-ink-alt py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHead index="02" label="Who it's for" title="Built for" accent="you, if…" />
          <div className="mt-14 grid grid-cols-1 border-t border-line md:grid-cols-2">
            {service.whoItsFor.map((w, i) => (
              <Reveal
                key={w}
                delay={i * 0.05}
                className={cn("flex gap-6 border-b border-line py-7", i % 2 === 0 ? "md:pr-10" : "md:border-l md:pl-10")}
              >
                <span className="font-display text-3xl font-semibold text-muted-2">{String(i + 1).padStart(2, "0")}</span>
                <p className="pt-1.5 text-lg leading-snug text-fg">{w}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Deliverables */}
      <section className="border-t border-line py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHead
            index="03"
            label="Scope of work"
            title="What's in"
            accent="the box."
            intro="Every build is tested on real devices, documented, and handed over with full ownership."
          />
          <div className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-[1.75rem] border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {service.deliverables.map((d, i) => (
              <Reveal key={d} delay={i * 0.04} className="bg-ink">
                <div className="flex h-full min-h-[170px] flex-col justify-between p-7 transition-colors duration-500 hover:bg-surface">
                  <span className="font-mono text-[11px] text-accent">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="font-display mt-8 text-xl font-semibold leading-snug text-fg">{d}</h3>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="border-t border-line bg-ink-alt py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHead index="04" label="Process" title="Idea to" accent="launch." />
          <ol className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-5 lg:gap-0">
            {service.process.map((step, i) => (
              <Reveal key={step} delay={i * 0.07}>
                <li className="relative lg:pr-6">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-accent font-mono text-xs text-accent">
                      {i + 1}
                    </span>
                    {i < service.process.length - 1 && <span className="hidden h-px flex-1 bg-line-strong lg:block" />}
                  </div>
                  <p className="mt-5 text-[15px] leading-relaxed text-fg">{step}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Packages */}
      <section className="border-t border-line py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHead
            index="05"
            label="Packages"
            title="Fixed-price"
            accent="tiers."
            intro="Pick a tier, or ask for a custom scope. The price you see is the price you pay."
          />
          <div className="mx-auto mt-14 grid max-w-5xl grid-cols-1 gap-4 md:grid-cols-2">
            {service.packages.map((pkg) => {
              const popular = !!pkg.popular;
              return (
                <div
                  key={pkg.name}
                  className={cn(
                    "flex flex-col rounded-[1.75rem] p-8 sm:p-10",
                    popular ? "bg-fg text-ink" : "border border-line bg-surface text-fg"
                  )}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-display text-2xl font-semibold">{pkg.name}</h3>
                    {popular && (
                      <span className="rounded-full bg-accent px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-accent-ink">
                        Most chosen
                      </span>
                    )}
                  </div>
                  <div
                    className={cn(
                      "font-display mt-8 font-semibold leading-tight tracking-[-0.04em]",
                      formatPrice(pkg.priceBDT, "৳").length > 10 ? "text-3xl" : "text-5xl"
                    )}
                  >
                    {formatPrice(pkg.priceBDT, "৳")}
                  </div>
                  <div className={cn("mt-2 font-mono text-[11px] uppercase tracking-[0.14em]", popular ? "text-ink/50" : "text-muted-2")}>
                    {formatPrice(pkg.priceUSD, "$")} · {pkg.duration}
                  </div>
                  <ul className={cn("mt-8 flex-1 space-y-3 border-t pt-8 text-sm", popular ? "border-ink/15" : "border-line")}>
                    {pkg.features.map((f) => (
                      <li key={f} className="flex gap-3">
                        <span className="mt-[0.55em] h-1 w-1 shrink-0 rounded-full bg-accent" />
                        <span className={popular ? "text-ink/80" : "text-muted"}>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    href={`/contact?service=${service.slug}&package=${encodeURIComponent(pkg.name)}`}
                    variant={popular ? "primary" : "secondary"}
                    size="lg"
                    className={cn("mt-10 w-full", popular && "before:bg-ink hover:text-fg")}
                  >
                    Get started <ArrowUpRight className="h-4 w-4" />
                  </Button>
                </div>
              );
            })}
          </div>

          {/* Stack */}
          <div className="mt-20 flex flex-col gap-5 border-t border-line pt-8 md:flex-row md:items-center">
            <span className="shrink-0 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-2">Built with</span>
            <div className="flex flex-wrap gap-2">
              {service.techStack.map((t) => (
                <span key={t} className="rounded-full border border-line-strong px-4 py-1.5 text-sm text-fg">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      {service.faq?.length > 0 && (
        <section className="border-t border-line bg-ink-alt py-24 sm:py-32">
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-14 px-5 sm:px-8 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <SectionHead index="06" label="FAQ" title="Good" accent="questions." stacked />
            </div>
            <div className="lg:col-span-8">
              <Accordion items={service.faq} />
            </div>
          </div>
        </section>
      )}

      {/* Related */}
      {siblings.length > 0 && (
        <section className="border-t border-line py-16">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-2">
              More in {category.title}
            </div>
            <div className="mt-4">
              {siblings.map((s) => (
                <Link
                  key={s.slug}
                  href={`/services/${category.slug}/${s.slug}`}
                  className="group flex items-center justify-between border-b border-line py-5"
                >
                  <span className="font-display text-2xl font-semibold text-muted transition-colors group-hover:text-fg sm:text-3xl">
                    {s.title}
                  </span>
                  <span className="flex items-center gap-4">
                    <span className="hidden font-mono text-[11px] uppercase tracking-[0.14em] text-muted-2 sm:inline">
                      {s.startingPriceBDT > 0 ? `From ৳${s.startingPriceBDT.toLocaleString()}` : "Custom quote"}
                    </span>
                    <ArrowUpRight className="h-5 w-5 text-muted-2 transition-all group-hover:rotate-45 group-hover:text-accent" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTABannerSection index="07" eyebrow={`Ready for ${service.title}?`} line1="Let’s ship" line2="it" accent="together." />
    </>
  );
}
