import { pageMetadata } from "@/lib/seo";
import Link from "next/link";
import { ArrowUpRight, Check, Code2, Globe, PenTool, Search } from "lucide-react";
import { projectScope, projectsData, type Project } from "@/data/projects";
import { PageHero } from "@/components/page/page-hero";
import { Reveal, StaggerContainer } from "@/components/motion/reveal";
import { CTABannerSection } from "@/components/sections/cta-banner";
import { BrowserFrame } from "@/components/work/browser-frame";
import { cn } from "@/lib/utils";

export const metadata = pageMetadata({
  title: "Our Work — Live Websites, Stores & SaaS",
  description:
    "Live projects built end to end by ScaleUp Web: SaaS products, e-commerce stores, a bilingual news portal and a community platform — design, full-stack development, SEO and launch.",
  path: "/work"
});

const scopeIcons = [PenTool, Code2, Search, Globe];

function ProjectRow({ project, index }: { project: Project; index: number }) {
  const flip = index % 2 === 1;
  return (
    <Reveal>
      <article className="group grid grid-cols-1 items-center gap-10 border-b border-line py-16 sm:py-24 lg:grid-cols-12 lg:gap-16">
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open ${project.name} (live site)`}
          className={cn("block lg:col-span-7", flip && "lg:order-2")}
        >
          <BrowserFrame project={project} priority={index === 0} />
        </a>

        <div className={cn("lg:col-span-5", flip && "lg:order-1")}>
          <div className="flex items-center gap-3 text-sm">
            <span className="font-mono text-accent">{String(index + 1).padStart(2, "0")}</span>
            <span className="h-px w-8 bg-line-strong" />
            <span className="text-muted">{project.category}</span>
          </div>

          <h2 className="font-display mt-5 text-4xl font-semibold leading-[1.02] text-fg sm:text-5xl">{project.name}</h2>
          <p className="mt-5 text-[15px] leading-relaxed text-muted">{project.summary}</p>

          <ul className="mt-7 space-y-2.5">
            {project.features.map((f) => (
              <li key={f} className="flex gap-3 text-sm text-fg">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                {f}
              </li>
            ))}
          </ul>

          <div className="mt-7 flex flex-wrap gap-2">
            {projectScope.map((s) => (
              <span key={s} className="rounded-full border border-line-strong px-3 py-1 text-xs text-muted">
                {s}
              </span>
            ))}
          </div>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group/v inline-flex items-center gap-3 rounded-full bg-fg py-1.5 pl-5 pr-1.5 text-sm font-medium text-ink transition-colors hover:bg-accent hover:text-accent-ink"
            >
              Visit live site
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-ink text-fg transition-transform duration-500 ease-out-expo group-hover/v:rotate-45">
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </a>
            {project.caseStudySlug && (
              <Link
                href={`/work/${project.caseStudySlug}`}
                className="inline-flex items-center gap-2 rounded-full border border-line-strong px-5 py-3 text-sm text-fg transition-colors hover:border-accent hover:text-accent"
              >
                Read the case study
              </Link>
            )}
          </div>
        </div>
      </article>
    </Reveal>
  );
}

export default function WorkPage() {
  return (
    <>
      <PageHero
        label="Our work"
        meta={`${projectsData.length} live projects`}
        title={["Built, launched", "and"]}
        accent="live."
        intro="SaaS products, online stores, a news portal and a community platform — each one designed, built, optimised for search and launched by us."
      />

      {/* What every project includes */}
      <section className="border-t border-line">
        <StaggerContainer className="mx-auto grid max-w-7xl grid-cols-2 px-5 sm:px-8 lg:grid-cols-4">
          {projectScope.map((s, i) => {
            const Icon = scopeIcons[i];
            return (
              <div
                key={s}
                className={cn(
                  "flex items-center gap-3 py-6 text-sm text-fg",
                  i % 2 === 1 && "pl-5 sm:pl-8",
                  i > 1 && "border-t border-line lg:border-t-0",
                  i > 0 && "lg:border-l lg:border-line lg:pl-8"
                )}
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-accent/15 text-accent">
                  <Icon className="h-4 w-4" />
                </span>
                {s}
              </div>
            );
          })}
        </StaggerContainer>
      </section>

      <section className="border-t border-line">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          {projectsData.map((p, i) => (
            <ProjectRow key={p.slug} project={p} index={i} />
          ))}
        </div>
      </section>

      <CTABannerSection line1="Let’s make" line2="the next" accent="one." />
    </>
  );
}
