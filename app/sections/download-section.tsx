import { Download } from "lucide-react";
import type { DownloadContent } from "../content/types";
import { Section, SectionHeader } from "../components/layout/section";
import { Reveal } from "../components/motion/reveal";
import { Button } from "../components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../components/ui/collapsible";
import { PURIKUKI_REPO_URL } from "../lib/external-links";
import type { Locale } from "../lib/i18n/locales";
import { formatFileSize, formatReleaseDate } from "../lib/releases/format";
import type { ReleaseMetadata } from "../lib/releases/types";
import { ShaDisclosure } from "./sha-disclosure";

interface DownloadSectionProps {
  locale: Locale;
  content: DownloadContent;
  release: ReleaseMetadata;
}

// Release metadata is generated at build time (see app/lib/releases and
// scripts/fetch-release.ts) and passed in as a prop — this component never
// calls GitHub itself. When `release.available` is false (today's real
// state: jvitorn/purikuki has no stable release yet), only the honest
// "in preparation" shell renders; nothing here fakes a version, size,
// date, or SHA-256. A single discreet Reveal (no stagger) covers both
// states so the no-release card never reads like an alert/error.
export function DownloadSection({ locale, content, release }: DownloadSectionProps) {
  return (
    <Section aria-labelledby="download-heading" id="download">
      <SectionHeader
        eyebrow={content.eyebrow}
        headingId="download-heading"
        title={content.title}
      />
      <p className="mt-4 text-base text-foreground-muted">{content.supportCopy}</p>

      <Reveal>
        {release.available ? (
          <div className="mt-6 rounded-block border border-border bg-surface p-6 sm:p-8">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-foreground-muted">
              <span className="font-semibold text-foreground">
                {content.releaseLabels.platformLabel}
              </span>
              <span aria-hidden="true">·</span>
              <span>
                {content.releaseLabels.versionLabel} {release.version}
              </span>
              <span aria-hidden="true">·</span>
              <span>{formatFileSize(release.sizeBytes, locale)}</span>
            </div>
            <p className="mt-1 text-xs text-foreground-subtle">
              {content.releaseLabels.publishedLabel}{" "}
              {formatReleaseDate(release.publishedAt, locale)}
            </p>

            <div className="mt-5 flex flex-wrap gap-3">
              <Button asChild size="large">
                <a href={release.downloadUrl}>
                  {content.primaryCta}
                  <Download aria-hidden="true" className="size-4" />
                </a>
              </Button>
              <Button asChild variant="secondary">
                <a href={release.releaseUrl} rel="noreferrer" target="_blank">
                  {content.releaseLabels.releaseLinkLabel}
                </a>
              </Button>
            </div>

            {release.sha256 ? (
              <ShaDisclosure
                copiedLabel={content.releaseLabels.copiedLabel}
                copyFailedLabel={content.releaseLabels.copyFailedLabel}
                copyLabel={content.releaseLabels.copyLabel}
                label={content.releaseLabels.shaLabel}
                sha256={release.sha256}
              />
            ) : null}
          </div>
        ) : (
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
        )}
      </Reveal>
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
