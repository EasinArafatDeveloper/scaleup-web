"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { featuredProjects, type Project } from "@/data/projects";
import { SplitReveal } from "@/components/motion/split-reveal";
import { gsap, MOTION_OK, useGSAP } from "@/components/motion/gsap";
import { BrowserFrame } from "@/components/work/browser-frame";

// Each card gets its own tint so the stack reads as distinct projects.
const tints = ["rgba(59,107,255,0.18)", "rgba(120,160,255,0.14)", "rgba(111,214,168,0.12)"];

function StackCard({ project, index }: { project: Project; index: number }) {
  return (
    <div
      className="mb-6 flex items-start justify-center lg:sticky lg:top-24 lg:mb-0 lg:h-[88vh]"
      style={{ paddingTop: `calc(3vh + ${index * 28}px)` }}
    >
      <article className="case-card group relative w-full origin-top overflow-hidden rounded-[2rem] border border-line bg-surface">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{ background: `radial-gradient(120% 90% at 100% 0%, ${tints[index % tints.length]}, transparent 60%)` }}
        />

        <div className="relative grid grid-cols-1 items-center gap-10 p-7 sm:p-10 lg:grid-cols-12 lg:p-12">
          <div className="flex flex-col lg:col-span-5">
            <div className="flex items-center gap-3 text-sm">
              <span className="font-mono text-accent">{String(index + 1).padStart(2, "0")}</span>
              <span className="h-px w-8 bg-line-strong" />
              <span className="text-muted">{project.category}</span>
            </div>
            <h3 className="font-display mt-5 text-4xl font-semibold leading-[1.02] text-fg sm:text-5xl">{project.name}</h3>
            <p className="mt-4 text-[15px] leading-relaxed text-muted">{project.summary}</p>

            <ul className="mt-6 space-y-2.5">
              {project.features.map((f) => (
                <li key={f} className="flex gap-3 text-sm text-fg">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  {f}
                </li>
              ))}
            </ul>

            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group/v mt-8 inline-flex items-center gap-3 self-start rounded-full bg-fg py-1.5 pl-5 pr-1.5 text-sm font-medium text-ink transition-colors hover:bg-accent hover:text-accent-ink"
            >
              Visit {project.domain}
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-ink text-fg transition-transform duration-500 ease-out-expo group-hover/v:rotate-45">
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </a>
          </div>

          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open ${project.name} (live site)`}
            className="block lg:col-span-7"
          >
            <BrowserFrame project={project} />
          </a>
        </div>
      </article>
    </div>
  );
}

/** Homepage "Selected work": our SaaS products and online stores, stacked as you scroll. */
export function FeaturedCaseStudiesSection() {
  const ref = React.useRef<HTMLDivElement>(null);
  const total = featuredProjects.length;

  // Desktop: cards underneath shrink slightly as later cards slide over them.
  useGSAP(
    () => {
      gsap.matchMedia().add(`${MOTION_OK} and (min-width: 1024px)`, () => {
        const cards = gsap.utils.toArray<HTMLElement>(".case-card");
        const tl = gsap.timeline({
          scrollTrigger: { trigger: ref.current, start: "top top", end: "bottom bottom", scrub: true }
        });
        cards.forEach((card, i) => {
          const start = i / total;
          tl.to(card, { scale: 1 - (total - i) * 0.04, ease: "none", duration: 1 - start }, start);
        });
      });
    },
    { scope: ref }
  );

  return (
    <section className="relative bg-ink-alt pt-28 sm:pt-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <SplitReveal
            className="font-display text-5xl font-semibold leading-[0.95] text-fg sm:text-7xl"
            lines={[
              "SaaS & stores",
              <>
                we&apos;ve <span className="serif-accent text-accent">shipped.</span>
              </>
            ]}
          />
          <Link href="/work" className="inline-flex items-center gap-2 text-sm text-muted hover:text-fg">
            See all our work <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div ref={ref} className="mt-10 pb-16">
          {featuredProjects.map((p, i) => (
            <StackCard key={p.slug} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
