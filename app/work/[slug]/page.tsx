import { pageMetadata } from "@/lib/seo";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { caseStudiesData, getCaseStudyBySlug } from "@/data/caseStudies";
import { PageHero } from "@/components/page/page-hero";
import { Reveal } from "@/components/motion/reveal";
import { CTABannerSection } from "@/components/sections/cta-banner";

export async function generateStaticParams() {
  return caseStudiesData.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);
  if (!study) return { title: "Case Study Not Found" };
  return pageMetadata({
    title: `${study.client} Case Study`,
    description: study.summary,
    path: `/work/${study.slug}`,
    type: "article"
  });
}

export default async function CaseStudyDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);
  if (!study) notFound();

  const currentIndex = caseStudiesData.findIndex((s) => s.slug === study.slug);
  const next = caseStudiesData[(currentIndex + 1) % caseStudiesData.length];

  const facts = [
    { label: "Client", value: study.client },
    { label: "Industry", value: study.industry },
    { label: "Services", value: study.servicesUsed.join(", ") },
    { label: "Stack", value: study.techStack.join(", ") }
  ];

  return (
    <>
      <PageHero
        crumbs={[{ label: "Work", href: "/work" }, { label: study.client }]}
        label={`Case study ${String(currentIndex + 1).padStart(2, "0")}`}
        title={[]}
        accent={study.client}
        size="xl"
        intro={study.title}
      />

      {/* Fact sheet */}
      <section className="border-t border-line">
        <div className="mx-auto grid max-w-7xl grid-cols-2 px-5 sm:px-8 lg:grid-cols-4">
          {facts.map((f, i) => (
            <div
              key={f.label}
              className={`border-b border-line py-7 pr-6 lg:border-b-0 ${i > 0 ? "lg:border-l lg:pl-6" : ""} ${i % 2 === 1 ? "border-l pl-6" : ""}`}
            >
              <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-2">{f.label}</div>
              <div className="mt-2 text-sm leading-relaxed text-fg">{f.value}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Big metrics */}
      <section className="border-t border-line bg-ink-alt">
        <div className="mx-auto grid max-w-7xl grid-cols-1 px-5 sm:px-8 md:grid-cols-3">
          {study.metrics.map((m, i) => (
            <Reveal key={m.label} delay={i * 0.08} className={`py-14 md:px-8 ${i > 0 ? "border-t border-line md:border-l md:border-t-0" : "md:pl-0"}`}>
              <div className="font-display text-[clamp(4rem,8vw,7rem)] font-semibold leading-none tracking-[-0.06em] text-fg">
                {m.value}
              </div>
              <div className="mt-4 text-sm font-medium text-fg">{m.label}</div>
              <div className="mt-1 text-sm text-muted">{m.description}</div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Story */}
      <section className="border-t border-line py-24 sm:py-32">
        <div className="mx-auto max-w-7xl space-y-24 px-5 sm:px-8">
          {[
            { n: "01", label: "The challenge", body: study.problem },
            { n: "02", label: "What we built", body: study.solution }
          ].map((block) => (
            <div key={block.n} className="grid grid-cols-1 gap-8 lg:grid-cols-12">
              <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted lg:col-span-4">
                <span className="text-accent">({block.n})</span> — {block.label}
              </div>
              <Reveal className="lg:col-span-8">
                <p className="font-display text-2xl font-medium leading-[1.35] text-fg sm:text-3xl">{block.body}</p>
              </Reveal>
            </div>
          ))}
        </div>
      </section>

      {/* Pull quote */}
      <section className="px-3 sm:px-5">
        <div className="mx-auto max-w-[1400px] rounded-[2rem] bg-fg px-6 py-20 text-ink sm:rounded-[2.5rem] sm:px-16 sm:py-28">
          <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink/50">
            <span className="text-accent">(03)</span> — In their words
          </div>
          <blockquote className="serif-accent mt-10 max-w-5xl text-[clamp(2rem,4.6vw,4.4rem)] leading-[1.06]">
            <span className="text-accent">“</span>
            {study.testimonialQuote}
            <span className="text-accent">”</span>
          </blockquote>
          <div className="mt-10 border-t border-ink/15 pt-6 text-sm text-ink/70">— {study.testimonialAuthor}</div>
        </div>
      </section>

      {/* Next project */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Link href={`/work/${next.slug}`} className="group block border-y border-line py-12">
            <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
              <span>Next project</span>
              <span>{next.industry}</span>
            </div>
            <div className="mt-6 flex items-end justify-between gap-6">
              <span className="font-display text-[clamp(3rem,9vw,8rem)] font-semibold leading-[0.9] text-muted transition-colors duration-500 group-hover:text-fg">
                {next.client}
              </span>
              <span className="mb-3 flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-accent text-accent-ink transition-transform duration-500 ease-out-expo group-hover:rotate-45 sm:h-20 sm:w-20">
                <ArrowUpRight className="h-7 w-7" />
              </span>
            </div>
          </Link>
        </div>
      </section>

      <CTABannerSection index="04" eyebrow="Want results like these?" />
    </>
  );
}
