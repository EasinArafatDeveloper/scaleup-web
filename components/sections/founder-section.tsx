import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Handshake } from "lucide-react";
import { founderData } from "@/data/team";
import { nextLeaders } from "@/data/partners";
import { FOUNDER_PATH } from "@/lib/seo";
import { Reveal } from "@/components/motion/reveal";

/** Written like a letter, signed in serif — personal, not a "team card". */
/** `showPartner`: the small Next Leaders card under the photo (off on /about, which has its own section). */
export function FounderSection({ showPartner = true }: { showPartner?: boolean } = {}) {
  return (
    <section className="border-t border-line bg-ink-alt py-28 sm:py-36">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 px-5 sm:px-8 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Reveal delay={0.1}>
            <div className="relative aspect-[4/5] max-w-xs overflow-hidden rounded-[1.75rem] border border-line bg-surface">
              <Image
                src={founderData.photo}
                alt={`${founderData.name}, ${founderData.role}`}
                fill
                sizes="320px"
                className="object-cover object-[55%_30%]"
              />
              {/* Darken the bottom so the name bar stays readable */}
              <div aria-hidden className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex items-center justify-between border-t border-line bg-[var(--surface-glass)] px-5 py-4 backdrop-blur-md">
                <Link href={FOUNDER_PATH} className="hover:underline">
                  <div className="text-sm font-medium text-fg">{founderData.name}</div>
                  <div className="text-xs text-muted">{founderData.role}</div>
                </Link>
                <a
                  href={founderData.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${founderData.name} on LinkedIn`}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-line-strong text-fg transition-colors hover:border-accent hover:bg-accent hover:text-accent-ink"
                >
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </Reveal>

          {showPartner && (
            <Reveal delay={0.15}>
              <Link
                href="/about"
                className="group mt-4 flex max-w-xs items-center gap-3 rounded-2xl border border-line bg-surface p-3 transition-colors hover:border-accent/50"
              >
                <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full">
                  <Image
                    src={nextLeaders.personPhoto}
                    alt={nextLeaders.person}
                    fill
                    sizes="56px"
                    className="object-cover"
                  />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-center gap-1.5 text-xs text-accent">
                    <Handshake className="h-3.5 w-3.5" />
                    {nextLeaders.role} of {nextLeaders.company}
                  </span>
                  <span className="mt-0.5 block text-sm leading-snug text-fg">
                    Working with {nextLeaders.person}
                  </span>
                </span>
                <ArrowUpRight className="h-4 w-4 shrink-0 text-muted transition-transform duration-300 group-hover:rotate-45 group-hover:text-accent" />
              </Link>
            </Reveal>
          )}
        </div>

        <div className="lg:col-span-8">
          <Reveal>
            <p className="font-display text-3xl font-medium leading-[1.2] text-fg sm:text-[2.6rem]">
              “I kept watching great Bangladeshi businesses burn lakhs on ads with slow sites, no
              tracking and unanswered inboxes.{" "}
              <span className="serif-accent text-accent">So I started fixing that.</span>”
            </p>
          </Reveal>

          <div className="mt-12 grid grid-cols-1 gap-6 text-[15px] leading-relaxed text-muted md:grid-cols-2">
            {founderData.story.map((p, i) => (
              <Reveal key={i} delay={0.05 * i}>
                <p>{p}</p>
              </Reveal>
            ))}
          </div>

          <div className="mt-12 flex flex-wrap items-end justify-between gap-8 border-t border-line pt-8">
            <div className="flex gap-10">
              {founderData.stats.map((s) => (
                <div key={s.label}>
                  <div className="font-display text-3xl font-semibold text-fg">{s.value}</div>
                  <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-2">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
            <div className="serif-accent text-4xl text-fg">— {founderData.name.split(" ")[0]}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
