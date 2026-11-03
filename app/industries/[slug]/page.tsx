import { pageMetadata } from "@/lib/seo";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { industriesData, getIndustryBySlug } from "@/data/industries";
import { caseStudiesData, getCaseStudyBySlug } from "@/data/caseStudies";
import { getWhatsAppUrl } from "@/data/site";
import { PageHero } from "@/components/page/page-hero";
import { SectionHead } from "@/components/page/section-head";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { CTABannerSection } from "@/components/sections/cta-banner";

export async function generateStaticParams() {
  return industriesData.map((ind) => ({ slug: ind.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const industry = getIndustryBySlug(slug);
  if (!industry) return { title: "Industry Not Found" };
  return pageMetadata({
    title: `${industry.name} Websites & Automation`,
    description: industry.headline,
    path: `/industries/${industry.slug}`
  });
}

export default async function IndustryDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const industry = getIndustryBySlug(slug);
  if (!industry) notFound();

  const study = industry.caseStudySlug ? getCaseStudyBySlug(industry.caseStudySlug) : caseStudiesData[0];
  const others = industriesData.filter((i) => i.slug !== industry.slug);

  return (
    <>
      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "Industries" }, { label: industry.name }]}
        label={`Built for ${industry.name}`}
        title={[]}
        accent={industry.name}
        intro={industry.headline}
      >
        <div className="flex flex-wrap gap-3">
          <Button href="/free-audit" variant="primary" size="lg">
            Free industry audit <ArrowUpRight className="h-4 w-4" />
          </Button>
          <Button
            href={getWhatsAppUrl(`Hi ScaleUp Web! I run a business in the ${industry.name} sector and want to discuss automation.`)}
            isExternal
            variant="secondary"
            size="lg"
          >
            WhatsApp
          </Button>
        </div>
      </PageHero>

      {/* Before / after split */}
      <section className="border-t border-line">
        <div className="mx-auto grid max-w-7xl grid-cols-1 px-5 sm:px-8 md:grid-cols-2">
          <div className="py-20 md:pr-12">
            <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
              <span className="text-accent">○</span> Today
            </div>
            <h2 className="font-display mt-5 text-3xl font-semibold text-muted sm:text-4xl">What&apos;s holding you back</h2>
            <ul className="mt-10 border-t border-line">
              {industry.painPoints.map((p) => (
                <li key={p} className="border-b border-line py-5 text-lg text-muted line-through decoration-accent/50">
                  {p}
                </li>
              ))}
            </ul>
          </div>
          <div className="border-t border-line py-20 md:border-l md:border-t-0 md:pl-12">
            <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-success">● With ScaleUp</div>
            <h2 className="font-display mt-5 text-3xl font-semibold text-fg sm:text-4xl">What changes</h2>
            <ul className="mt-10 border-t border-line">
              {industry.keyBenefits.map((b) => (
                <li key={b} className="flex gap-4 border-b border-line py-5 text-lg text-fg">
                  <span className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-success" />
                  {b}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Blueprint */}
      <section className="border-t border-line bg-ink-alt py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHead
            index="01"
            label="Blueprint"
            title="Your recommended"
            accent="stack."
            intro={`Suggested package: ${industry.suggestedPackage}`}
          />
          <ol className="mt-14 border-t border-line">
            {industry.recommendedStack.map((item, i) => (
              <Reveal key={item} delay={i * 0.05}>
                <li className="flex items-center gap-6 border-b border-line py-7">
                  <span className="font-mono text-xs text-accent">{String(i + 1).padStart(2, "0")}</span>
                  <span className="font-display text-2xl font-semibold text-fg sm:text-4xl">{item}</span>
                </li>
              </Reveal>
            ))}
          </ol>
          <Link
            href="/pricing"
            className="mt-10 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-fg hover:text-accent"
          >
            See package details <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </section>

      {/* Related proof */}
      {study && (
        <section className="border-t border-line py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <SectionHead index="02" label="Related proof" title="It's worked" accent="before." />
            <Link
              href={`/work/${study.slug}`}
              className="group mt-14 grid grid-cols-1 gap-10 rounded-[2rem] border border-line bg-surface p-8 transition-colors hover:border-line-strong sm:p-12 lg:grid-cols-12"
            >
              <div className="lg:col-span-7">
                <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">{study.client}</div>
                <h3 className="font-display mt-4 text-3xl font-semibold leading-[1.1] text-fg sm:text-4xl">{study.title}</h3>
                <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-muted">{study.summary}</p>
              </div>
              <div className="flex flex-col justify-between gap-8 lg:col-span-5 lg:items-end lg:text-right">
                <div className="font-display text-[clamp(4rem,9vw,7rem)] font-semibold leading-none tracking-[-0.06em] text-fg">
                  {study.metrics[0].value}
                </div>
                <span className="inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.16em] text-fg">
                  Read case study
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-accent-ink transition-transform duration-500 group-hover:rotate-45">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </span>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* Other industries */}
      <section className="border-t border-line bg-ink-alt py-16">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-2">Other industries</div>
          <div className="mt-6 flex flex-wrap gap-2">
            {others.map((o) => (
              <Link
                key={o.slug}
                href={`/industries/${o.slug}`}
                className="rounded-full border border-line-strong px-5 py-2.5 text-sm text-muted transition-colors hover:border-fg hover:text-fg"
              >
                {o.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTABannerSection index="03" eyebrow={`Grow your ${industry.name} business`} />
    </>
  );
}
