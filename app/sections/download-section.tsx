import type { DownloadContent } from "../content/types";
import { Section, SectionHeader } from "../components/layout/section";
import { Button } from "../components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../components/ui/collapsible";
import { PURIKUKI_REPO_URL } from "../lib/external-links";

interface DownloadSectionProps {
  content: DownloadContent;
}

// Phase 03 shell only — no GitHub Release integration yet (Phase 04). Only
// the no-release state is real; nothing here fakes a version, size, date,
// or SHA-256.
export function DownloadSection({ content }: DownloadSectionProps) {
  return (
    <Section aria-labelledby="download-heading" id="download">
      <SectionHeader
        eyebrow={content.eyebrow}
        headingId="download-heading"
        title={content.title}
      />
      <p className="mt-4 text-base text-foreground-muted">{content.supportCopy}</p>

      <div className="mt-6 rounded-block border border-border bg-surface p-6 sm:p-8">
        <p className="text-xs font-bold uppercase tracking-[0.13em] text-danger">
          {content.noRelease.statusLabel}
        </p>
        <p className="mt-2 max-w-md text-sm leading-6 text-foreground-muted">
          {content.noRelease.message}
        </p>
        <div className="mt-5">
          <Button asChild size="large" variant="secondary">
            <a href={PURIKUKI_REPO_URL} rel="noreferrer" target="_blank">
              {content.noRelease.cta}
            </a>
          </Button>
        </div>
      </div>
      <p className="mt-4 text-xs text-foreground-subtle">{content.originLine}</p>

      <Collapsible className="mt-8 max-w-xl border-t border-border pt-6">
        <CollapsibleTrigger>{content.installHelp.title}</CollapsibleTrigger>
        <CollapsibleContent>
          <ol className="mt-3 grid gap-2 pl-5 text-sm leading-6 text-foreground-muted [list-style-type:decimal]">
            {content.installHelp.steps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
          <p className="mt-4 rounded-card border border-warning/45 bg-warning/10 p-3 text-xs leading-5 text-warning">
            {content.installHelp.safetyNote}
          </p>
        </CollapsibleContent>
      </Collapsible>
    </Section>
  );
}
