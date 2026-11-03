import Image from "next/image";
import { ArrowUpRight, Handshake } from "lucide-react";
import { nextLeaders } from "@/data/partners";
import { SplitReveal } from "@/components/motion/split-reveal";
import { StaggerContainer } from "@/components/motion/reveal";

/** About page: our tech partnership with Next Leaders, with photos. */
export function PartnerSection() {
  return (
    <section className="border-t border-line py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid grid-cols-1 items-end gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-line-strong px-4 py-1.5 text-sm text-fg">
              <Handshake className="h-4 w-4 text-accent" />
              {nextLeaders.role} · {nextLeaders.company}
            </div>
            <SplitReveal
              className="font-display mt-8 text-5xl font-semibold leading-[0.95] text-fg sm:text-6xl"
              lines={[
                "Building with",
                <span key="a" className="serif-accent text-accent">
                  {nextLeaders.company}.
                </span>
              ]}
            />
          </div>
          <div className="lg:col-span-5 lg:justify-self-end">
            <p className="max-w-sm text-[15px] leading-relaxed text-muted">{nextLeaders.summary}</p>
            <a
              href={nextLeaders.personLinkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${nextLeaders.person} on LinkedIn`}
              className="group mt-6 inline-flex items-center gap-3 rounded-full border border-line py-1.5 pl-1.5 pr-4 transition-colors hover:border-accent"
            >
              <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full">
                <Image src={nextLeaders.personPhoto} alt={nextLeaders.person} fill sizes="48px" className="object-cover" />
              </span>
              <span>
                <span className="block text-sm font-medium text-fg">{nextLeaders.person}</span>
                <span className="block text-xs text-muted">{nextLeaders.company} · LinkedIn</span>
              </span>
              <ArrowUpRight className="h-4 w-4 text-muted transition-transform duration-300 group-hover:rotate-45 group-hover:text-accent" />
            </a>
          </div>
        </div>

        <StaggerContainer className="mt-14 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {nextLeaders.photos.map((p) => (
            <figure key={p.src} className="group relative aspect-[3/4] overflow-hidden rounded-[1.5rem] border border-line bg-surface">
              <Image
                src={p.src}
                alt={p.alt}
                fill
                sizes="(min-width: 1024px) 300px, 50vw"
                className="object-cover transition-transform duration-[1.2s] ease-out-expo group-hover:scale-[1.04]"
              />
            </figure>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
