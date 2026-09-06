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
import { PURIKI_REPO_URL } from "../lib/external-links";
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

// Os cards ARM64 (recomendado) e Universal compartilham este layout —
// `primary` só muda a ênfase de borda/elevação/barra de destaque, nunca é
// o único sinal de que um é recomendado (isso é o badge textual, pela
// WCAG 1.4.1). Os dois cards esticam para a mesma altura (ver
// `items-stretch` no grid) e empurram o CTA para a base via `mt-auto`,
// para que os dois se leiam como uma única escolha guiada, não dois
// blocos soltos.
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
  // arm64-v8a e universal são invariantes obrigatórios, garantidos pela
  // validação de getReleaseMetadata() (ver
  // app/lib/releases/validate-release-metadata.ts) para toda release
  // `available: true`. getRequiredReleaseArtifact() lança um erro em vez
  // de esconder a seção de Download silenciosamente caso esse invariante
  // seja violado — um build/teste assim precisa falhar de forma clara,
  // nunca publicar algo incompleto quietamente.
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
      {/* Uma moldura compartilhada de "escolha guiada" ao redor dos
          metadados da release e dos dois cards primários, para que ARM64
          + Universal se leiam como um único bloco de decisão em vez de
          dois cards soltos na seção. O raio aninhado (rounded-block por
          fora, rounded-card em cada card) segue a mesma convenção já
          usada em outros lugares do design system (ex.: o bloco de
          sem-release abaixo). */}
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

// Os metadados de release são gerados em build time (ver app/lib/releases
// e scripts/fetch-release.ts) e chegam como prop — este componente nunca
// chama o GitHub diretamente, e nunca tenta detectar a arquitetura de CPU
// do visitante (userAgent/UA-CH/heurísticas são deliberadamente evitados —
// ver PHASE_04R_MULTI_ABI_RELEASES.md). Quando `release.available` é
// false, só o shell honesto de "em preparação" é renderizado; nada aqui
// inventa versão, tamanho ou data. Detalhes de SHA-256/checksum são
// intencionalmente não exibidos aqui — permanecem uma responsabilidade da
// GitHub Release (`releaseUrl`).
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
                <a href={PURIKI_REPO_URL} rel="noreferrer" target="_blank">
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
