import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { teamMembers, type TeamMember } from "@/data/team";
import { SplitReveal } from "@/components/motion/split-reveal";
import { StaggerContainer } from "@/components/motion/reveal";

function PersonCard({
  person,
  badge
}: {
  person: TeamMember;
  badge?: React.ReactNode;
}) {
  const link = person.href ?? person.linkedin;
  const external = !person.href;
  const body = (
    <>
      <div className="relative aspect-[4/5] overflow-hidden rounded-[1.25rem] bg-surface-2">
        <Image
          src={person.photo}
          alt={`${person.name}, ${person.role}`}
          fill
          sizes="(min-width: 1024px) 280px, 50vw"
          className="object-cover object-[55%_25%] transition-transform duration-[1.2s] ease-out-expo group-hover:scale-[1.04]"
        />
        {badge && (
          <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-black/55 px-3 py-1 text-xs text-white backdrop-blur-md">
            {badge}
          </span>
        )}
      </div>
      <div className="flex items-start justify-between gap-3 px-1 pt-4">
        <div>
          <h3 className="font-display text-lg font-semibold text-fg">{person.name}</h3>
          <p className="mt-0.5 text-sm text-muted">{person.role}</p>
        </div>
        {link && (
          <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-muted transition-transform duration-300 group-hover:rotate-45 group-hover:text-accent" />
        )}
      </div>
    </>
  );

  if (!link) return <div className="group">{body}</div>;
  return external ? (
    <a href={link} target="_blank" rel="noopener noreferrer" className="group block">
      {body}
    </a>
  ) : (
    <Link href={link} className="group block">
      {body}
    </Link>
  );
}

/** /about: everyone behind the studio. Members come from data/team.ts. */
export function TeamSection() {
  return (
    <section className="border-t border-line py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid grid-cols-1 items-end gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <SplitReveal
              className="font-display text-5xl font-semibold leading-[0.95] text-fg sm:text-6xl"
              lines={[
                "The people",
                <span key="a">
                  behind the <span className="serif-accent text-accent">work.</span>
                </span>
              ]}
            />
          </div>
          <p className="max-w-sm text-[15px] leading-relaxed text-muted lg:col-span-5 lg:justify-self-end">
            A small, hands-on team. You talk directly to the people designing and building your product.
          </p>
        </div>

        <StaggerContainer className="mt-14 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-4">
          {teamMembers.map((m) => (
            <PersonCard key={m.name} person={m} />
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
