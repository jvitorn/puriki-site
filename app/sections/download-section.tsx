import {
  Boxes,
  CircleHelp,
  Download,
  Monitor,
  Smartphone,
  type LucideIcon,
} from "lucide-react";
import type { DownloadContent } from "../content/types";
import { Section, SectionHeader } from "../components/layout/section";
import { Reveal } from "../components/motion/reveal";
import { Button } from "../components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../components/ui/collapsible";
import { cn } from "../lib/utils";
import { PURIKUKI_REPO_URL } from "../lib/external-links";
import type { Locale } from "../lib/i18n/locales";
import {
  getReleaseArtifact,
  getRequiredReleaseArtifact,
} from "../lib/releases";
import { formatFileSize, formatReleaseDate } from "../lib/releases/format";
import type {
  AndroidReleaseArtifact,
  ReleaseAvailable,
  ReleaseMetadata,
} from "../lib/releases/types";

interface DownloadSectionProps {
  locale: Locale;
  content: DownloadContent;
  release: ReleaseMetadata;
}

interface PrimaryCardProps {
  icon: LucideIcon;
  title: string;
  note?: string;
  description: string;
  sizeLabel: string;
  ctaLabel: string;
  href: string;
  badge?: string;
  subtitle?: string;
  primary?: boolean;
}

// The recommended (ARM64) and Universal cards share this layout — `primary`
// only changes the border/elevation/accent-bar emphasis, never the only
// signal that one is recommended (that's the textual `badge`, per WCAG
// 1.4.1). Both cards stretch to the same height (see the grid's
// `items-stretch`) and push their CTA to the bottom via `mt-auto`, so the
// two read as one guided choice rather than two unrelated blocks.
function PrimaryCard({
  icon: Icon,
  title,
  note,
  description,
  sizeLabel,
  ctaLabel,
  href,
  badge,
  subtitle,
  primary,
}: PrimaryCardProps) {
  return (
    <div
      className={cn(
        "relative flex h-full flex-col overflow-hidden rounded-card border p-6",
        primary
          ? "border-brand/60 bg-surface-raised shadow-[0_8px_28px_var(--brand-shadow)]"
          : "border-border bg-surface",
      )}
    >
      {primary ? (
        <span
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-1 bg-brand"
        />
      ) : null}
      <div className="flex items-center justify-between gap-3">
        <span
          className={cn(
            "grid size-10 place-items-center rounded-[0.7rem] border",
            primary
              ? "border-brand/40 bg-brand-soft"
              : "border-border-strong bg-surface-raised",
          )}
        >
          <Icon
            aria-hidden="true"
            className={cn(
              "size-5",
              primary ? "text-danger" : "text-foreground-subtle",
            )}
          />
        </span>
        {badge ? (
          <span className="rounded-full border border-border-strong bg-brand-soft px-3 py-1 text-xs font-bold uppercase tracking-[0.08em] text-foreground">
            {badge}
          </span>
        ) : null}
      </div>
      <h3 className="mt-4 text-lg font-semibold text-foreground">
        {title}
        {note ? (
          <>
            {" "}
            <span className="text-xs font-normal uppercase tracking-[0.08em] text-foreground-subtle">
              {note}
            </span>
          </>
        ) : null}
      </h3>
      {subtitle ? (
        <p className="mt-1 text-sm font-semibold text-foreground-muted">
          {subtitle}
        </p>
      ) : null}
      <p className="mt-2 text-sm leading-6 text-foreground-muted">
        {description}
      </p>
      <p className="mt-3 text-xs font-medium text-foreground-subtle">
        {sizeLabel}
      </p>
      <div className="mt-5 pt-1 md:mt-auto">
        <Button
          asChild
          className="w-full"
          size="large"
          variant={primary ? "primary" : "secondary"}
        >
          <a href={href}>
            {ctaLabel}
            <Download aria-hidden="true" className="size-4" />
          </a>
        </Button>
      </div>
    </div>
  );
}

interface OptionalRowProps {
  icon: LucideIcon;
  title: string;
  note: string;
  description: string;
  sizeLabel: string;
  ctaLabel: string;
  href: string;
}

function OptionalRow({
  icon: Icon,
  title,
  note,
  description,
  sizeLabel,
  ctaLabel,
  href,
}: OptionalRowProps) {
  return (
    <div className="flex flex-col gap-3 border-t border-border py-4 first:border-t-0 first:pt-0 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-start gap-3">
        <Icon
          aria-hidden="true"
          className="mt-0.5 size-5 shrink-0 text-foreground-subtle"
        />
        <div>
          <p className="text-sm font-semibold text-foreground">
            {title}{" "}
            <span className="text-xs font-normal uppercase tracking-[0.08em] text-foreground-subtle">
              {note}
            </span>
          </p>
          <p className="mt-1 text-xs leading-5 text-foreground-muted">
            {description}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-3 pl-8 sm:pl-0">
        <span className="text-xs text-foreground-subtle">{sizeLabel}</span>
        <Button asChild variant="secondary">
          <a href={href}>{ctaLabel}</a>
        </Button>
      </div>
    </div>
  );
}

interface AvailableReleaseViewProps {
  locale: Locale;
  content: DownloadContent;
  release: ReleaseAvailable;
}

function AvailableReleaseView({
  locale,
  content,
  release,
}: AvailableReleaseViewProps) {
  // arm64-v8a and universal are required invariants enforced by
  // getReleaseMetadata()'s validation (see
  // app/lib/releases/validate-release-metadata.ts) for every
  // `available: true` release. getRequiredReleaseArtifact() throws instead
  // of silently hiding the Download section if that invariant is ever
  // violated — such a build/test must fail loudly, not ship quietly
  // incomplete.
  const arm64 = getRequiredReleaseArtifact(release, "arm64-v8a");
  const universal = getRequiredReleaseArtifact(release, "universal");
  const arm32 = getReleaseArtifact(release, "armeabi-v7a");
  const x8664 = getReleaseArtifact(release, "x86_64");
  const x86 = getReleaseArtifact(release, "x86");

  const optionalArtifacts: Array<{
    artifact: AndroidReleaseArtifact;
    icon: LucideIcon;
  }> = [
    ...(arm32 ? [{ artifact: arm32, icon: Smartphone }] : []),
    ...(x8664 ? [{ artifact: x8664, icon: Monitor }] : []),
    ...(x86 ? [{ artifact: x86, icon: Monitor }] : []),
  ];

  return (
    <>
      {/* One shared "guided choice" frame around the release metadata and
          the two primary cards, so ARM64 + Universal read as a single
          decision block instead of two unrelated cards floating in the
          section. Nested radius (rounded-block outside, rounded-card on
          each card) follows the same convention already used elsewhere
          in the design system (e.g. the no-release block below). */}
      <div className="mt-6 rounded-block border border-border bg-surface/60 p-4 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
          <div>
            <p className="text-xl font-bold text-foreground sm:text-2xl">
              Puriki v{release.version}
            </p>
            <p className="mt-1 text-xs text-foreground-subtle">
              {content.releaseLabels.publishedLabel}{" "}
              {formatReleaseDate(release.publishedAt, locale)}
              {" · "}
              {content.releaseLabels.latestLabel}
            </p>
          </div>
          <span className="rounded-full border border-border-strong bg-surface-raised px-3 py-1 text-xs font-semibold text-foreground-muted">
            {content.releaseLabels.platformLabel}
          </span>
        </div>

        <Reveal
          className="mt-5 grid items-stretch gap-4 md:grid-cols-2"
          staggerChildren={90}
        >
          <PrimaryCard
            badge={content.current.badge}
            ctaLabel={content.primaryCta}
            description={content.current.description}
            href={arm64.downloadUrl}
            icon={Smartphone}
            note={content.current.note}
            primary
            sizeLabel={formatFileSize(arm64.sizeBytes, locale)}
            title={content.current.title}
          />
          <PrimaryCard
            ctaLabel={content.universal.cta}
            description={content.universal.description}
            href={universal.downloadUrl}
            icon={Boxes}
            sizeLabel={formatFileSize(universal.sizeBytes, locale)}
            subtitle={content.universal.subtitle}
            title={content.universal.title}
          />
        </Reveal>
      </div>

      {optionalArtifacts.length > 0 ? (
        <Collapsible className="mt-8 max-w-2xl border-t border-border pt-6">
          <CollapsibleTrigger>{content.otherVersions.title}</CollapsibleTrigger>
          <CollapsibleContent>
            <div className="mt-2">
              {arm32 ? (
                <OptionalRow
                  ctaLabel={content.otherVersions.armeabi_v7a.cta}
                  description={content.otherVersions.armeabi_v7a.description}
                  href={arm32.downloadUrl}
                  icon={Smartphone}
                  note={content.otherVersions.armeabi_v7a.note}
                  sizeLabel={formatFileSize(arm32.sizeBytes, locale)}
                  title={content.otherVersions.armeabi_v7a.title}
                />
              ) : null}
              {x8664 ? (
                <OptionalRow
                  ctaLabel={content.otherVersions.x86_64.cta}
                  description={content.otherVersions.x86_64.description}
                  href={x8664.downloadUrl}
                  icon={Monitor}
                  note={content.otherVersions.x86_64.note}
                  sizeLabel={formatFileSize(x8664.sizeBytes, locale)}
                  title={content.otherVersions.x86_64.title}
                />
              ) : null}
              {x86 ? (
                <OptionalRow
                  ctaLabel={content.otherVersions.x86.cta}
                  description={content.otherVersions.x86.description}
                  href={x86.downloadUrl}
                  icon={Monitor}
                  note={content.otherVersions.x86.note}
                  sizeLabel={formatFileSize(x86.sizeBytes, locale)}
                  title={content.otherVersions.x86.title}
                />
              ) : null}
            </div>
          </CollapsibleContent>
        </Collapsible>
      ) : null}

      <Collapsible className="mt-6 max-w-2xl border-t border-border pt-6">
        <CollapsibleTrigger>
          <span className="inline-flex items-center gap-2">
            <CircleHelp aria-hidden="true" className="size-4 shrink-0" />
            {content.chooser.title}
          </span>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <dl className="mt-2 grid gap-4 text-sm leading-6">
            <div>
              <dt className="font-semibold text-foreground">
                {content.chooser.current.title}
              </dt>
              <dd className="mt-1 text-foreground-muted">
                {content.chooser.current.body}
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-foreground">
                {content.chooser.universal.title}
              </dt>
              <dd className="mt-1 text-foreground-muted">
                {content.chooser.universal.body}
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-foreground">
                {content.chooser.arm32.title}
              </dt>
              <dd className="mt-1 text-foreground-muted">
                {content.chooser.arm32.body}
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-foreground">
                {content.chooser.x86.title}
              </dt>
              <dd className="mt-1 text-foreground-muted">
                {content.chooser.x86.body}
              </dd>
            </div>
          </dl>
        </CollapsibleContent>
      </Collapsible>

      <div className="mt-6">
        <Button asChild variant="secondary">
          <a href={release.releaseUrl} rel="noreferrer" target="_blank">
            {content.releaseLabels.releaseLinkLabel}
          </a>
        </Button>
      </div>
    </>
  );
}

// Release metadata is generated at build time (see app/lib/releases and
// scripts/fetch-release.ts) and passed in as a prop — this component never
// calls GitHub itself, and never tries to detect the visitor's CPU
// architecture (userAgent/UA-CH/heuristics are all deliberately avoided —
// see PHASE_04R_MULTI_ABI_RELEASES.md). When `release.available` is false,
// only the honest "in preparation" shell renders; nothing here fakes a
// version, size, or date. SHA-256/checksum details are intentionally not
// surfaced here — they remain a GitHub Release concern (`releaseUrl`).
export function DownloadSection({
  locale,
  content,
  release,
}: DownloadSectionProps) {
  return (
    <Section aria-labelledby="download-heading" id="download">
      <SectionHeader
        eyebrow={content.eyebrow}
        headingId="download-heading"
        title={content.title}
      />
      <p className="mt-4 text-base text-foreground-muted">
        {content.supportCopy}
      </p>

      {release.available ? (
        <AvailableReleaseView
          content={content}
          locale={locale}
          release={release}
        />
      ) : (
        <Reveal>
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
        </Reveal>
      )}

      <p className="mt-4 text-xs text-foreground-subtle">
        {content.originLine}
      </p>

      <Collapsible className="mt-8 max-w-xl border-t border-border pt-6">
        <CollapsibleTrigger>{content.installHelp.title}</CollapsibleTrigger>
        <CollapsibleContent>
          <ol className="mt-3 grid list-decimal gap-2 pl-5 text-sm leading-6 text-foreground-muted">
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
