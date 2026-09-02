import { ArrowRight } from "lucide-react";
import type { ProvidersContent } from "../content/types";
import { Section, SectionHeader } from "../components/layout/section";
import { Reveal } from "../components/motion/reveal";

interface ProvidersSectionProps {
  content: ProvidersContent;
}

// AniList -> Puriki <- MyAnimeList. Both connectors always point at Puriki —
// never AniList -> Puriki -> MyAnimeList, which would imply List Sync in 1.0.
// Works with provider names alone; DOM order (AniList, connector, Puriki,
// connector, MyAnimeList) never changes, only the CSS direction of the
// arrows and the flex axis flip between mobile (vertical) and desktop
// (horizontal).
export function ProvidersSection({ content }: ProvidersSectionProps) {
  return (
    <Section aria-labelledby="providers-heading" id="providers">
      <Reveal>
        <SectionHeader
          description={<p>{content.body}</p>}
          eyebrow={content.eyebrow}
          headingId="providers-heading"
          title={content.title}
        />
        <p className="mt-6 max-w-2xl text-base font-semibold text-foreground">
          {content.highlight}
        </p>
      </Reveal>
      <Reveal className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center" delay={90}>
        <span className="rounded-full border border-border-strong bg-surface px-5 py-2.5 text-sm font-semibold text-foreground-muted">
          {content.anilistLabel}
        </span>
        <ArrowRight
          aria-hidden="true"
          className="size-5 rotate-90 text-danger sm:rotate-0"
        />
        <span className="rounded-full border border-border-strong bg-brand-soft px-5 py-2.5 text-sm font-bold text-foreground">
          {content.purikiLabel}
        </span>
        <ArrowRight
          aria-hidden="true"
          className="size-5 -rotate-90 text-danger sm:rotate-180"
        />
        <span className="rounded-full border border-border-strong bg-surface px-5 py-2.5 text-sm font-semibold text-foreground-muted">
          {content.malLabel}
        </span>
      </Reveal>
    </Section>
  );
}
