import * as React from "react";
import { PageHero } from "@/components/page/page-hero";

export interface LegalSection {
  title: string;
  body: React.ReactNode;
}

/** Shared layout for privacy / terms / refund: sticky contents + numbered prose. */
export function LegalPage({
  title,
  accent,
  updated,
  intro,
  sections
}: {
  title: string;
  accent: string;
  updated: string;
  intro: React.ReactNode;
  sections: LegalSection[];
}) {
  const id = (i: number) => `section-${i + 1}`;

  return (
    <>
      <PageHero label="Legal" meta={updated} title={[title]} accent={accent} size="lg" />

      <section className="border-t border-line py-20 sm:py-28">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-14 px-5 sm:px-8 lg:grid-cols-12">
          <nav aria-label="Contents" className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-2">Contents</div>
              <ol className="mt-5 border-t border-line">
                {sections.map((s, i) => (
                  <li key={s.title}>
                    <a
                      href={`#${id(i)}`}
                      className="flex gap-4 border-b border-line py-3.5 text-sm text-muted transition-colors hover:text-fg"
                    >
                      <span className="font-mono text-xs text-accent">{String(i + 1).padStart(2, "0")}</span>
                      {s.title}
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </nav>

          <div className="lg:col-span-8">
            <div className="text-lg leading-relaxed text-fg">{intro}</div>
            <div className="mt-14 space-y-14">
              {sections.map((s, i) => (
                <article key={s.title} id={id(i)} className="scroll-mt-28 border-t border-line pt-8">
                  <div className="font-mono text-xs text-accent">{String(i + 1).padStart(2, "0")}</div>
                  <h2 className="font-display mt-3 text-3xl font-semibold text-fg">{s.title}</h2>
                  <div className="mt-5 space-y-4 text-[15px] leading-relaxed text-muted [&_a]:text-accent [&_a]:underline [&_strong]:text-fg [&_ul]:space-y-2 [&_ul]:pl-5 [&_ul]:[list-style:disc]">
                    {s.body}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
