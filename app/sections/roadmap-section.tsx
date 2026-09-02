import { Fragment } from "react";
import type { RoadmapContent } from "../content/types";
import { Section, SectionHeader } from "../components/layout/section";
import { Button } from "../components/ui/button";
import { PURIKUKI_ROADMAP_DOC_URL } from "../lib/external-links";

interface RoadmapSectionProps {
  content: RoadmapContent;
}

// Vertical stack on mobile, horizontal progression on desktop — same three
// items either way, connected by a short rule rather than percentages or
// invented dates.
export function RoadmapSection({ content }: RoadmapSectionProps) {
  return (
    <Section aria-labelledby="roadmap-heading" id="roadmap">
      <SectionHeader
        description={<p>{content.intro}</p>}
        eyebrow={content.eyebrow}
        headingId="roadmap-heading"
        title={content.title}
      />
      <ol className="mt-10 flex flex-col sm:flex-row sm:items-stretch">
        {content.items.map((item, index) => (
          <Fragment key={item.version}>
            <li className="flex-1 rounded-card border border-border bg-surface p-5">
              <p className="text-xs font-bold uppercase tracking-[0.13em] text-danger">
                {item.version} · {item.status}
              </p>
              <p className="mt-2 text-lg font-semibold">{item.title}</p>
              <p className="mt-2 text-sm leading-6 text-foreground-muted">
                {item.description}
              </p>
              {item.supporting ? (
                <p className="mt-2 text-xs leading-5 text-foreground-subtle">
                  {item.supporting}
                </p>
              ) : null}
            </li>
            {index < content.items.length - 1 ? (
              <div
                aria-hidden="true"
                className="flex items-center justify-center py-2 sm:px-2 sm:py-0"
              >
                <span className="h-6 w-px bg-border-strong sm:h-px sm:w-6" />
              </div>
            ) : null}
          </Fragment>
        ))}
      </ol>
      <p className="mt-8 text-sm text-foreground-subtle">{content.disclaimer}</p>
      <div className="mt-4">
        <Button asChild variant="secondary">
          <a href={PURIKUKI_ROADMAP_DOC_URL} rel="noreferrer" target="_blank">
            {content.cta}
          </a>
        </Button>
      </div>
    </Section>
  );
}
