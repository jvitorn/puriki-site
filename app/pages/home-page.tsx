import { ArrowRight, CodeXml } from "lucide-react";
import { getContent } from "../content";
import { Section, SectionHeader } from "../components/layout/section";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";
import { Button } from "../components/ui/button";
import { homeAnchorHref, pageHref } from "../lib/i18n/links";
import type { Locale } from "../lib/i18n/locales";

const GITHUB_URL = "https://github.com/jvitorn/purikuki";
const GITHUB_ROADMAP_URL = "https://github.com/jvitorn/purikuki#roadmap";

interface LocalePageProps {
  locale: Locale;
}

/**
 * Content/routing scaffold for Phase 02. Structure, locale content and
 * anchors are real; the final visual design belongs to Phase 03.
 */
export function HomePage({ locale }: LocalePageProps) {
  const content = getContent(locale);
  const {
    hero,
    providers,
    benefits,
    showcases,
    privacySummary,
    openSource,
    roadmap,
    download,
    faq,
  } = content;

  return (
    <>
      <Section aria-labelledby="hero-heading" id="hero">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-danger">
          {hero.eyebrow}
        </p>
        <h1 className="mt-4 max-w-3xl text-[clamp(2.5rem,6vw,4rem)]" id="hero-heading">
          {hero.headline}
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-foreground-muted sm:text-xl">
          {hero.supporting}
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button asChild size="large">
            <a href={homeAnchorHref(locale, "download")}>
              {hero.primaryCta}
              <ArrowRight aria-hidden="true" className="size-4" />
            </a>
          </Button>
          <Button asChild size="large" variant="secondary">
            <a href={GITHUB_URL} rel="noreferrer" target="_blank">
              <CodeXml aria-hidden="true" className="size-4" />
              {hero.secondaryCta}
            </a>
          </Button>
        </div>
        <p className="mt-6 text-sm text-foreground-subtle">{hero.trustLine}</p>
      </Section>

      <Section aria-labelledby="providers-heading" id="providers">
        <SectionHeader
          description={<p>{providers.body}</p>}
          eyebrow={providers.eyebrow}
          headingId="providers-heading"
          title={providers.title}
        />
        <p className="mt-6 max-w-2xl text-base font-semibold text-foreground">
          {providers.highlight}
        </p>
        <div
          aria-hidden="true"
          className="mt-8 flex flex-wrap items-center gap-3 text-sm font-semibold text-foreground-muted"
        >
          <span className="rounded-full border border-border-strong bg-surface px-4 py-2">
            {providers.anilistLabel}
          </span>
          <ArrowRight className="size-4 text-danger" />
          <span className="rounded-full border border-border-strong bg-brand-soft px-4 py-2 text-foreground">
            {providers.puriklLabel}
          </span>
          <ArrowRight className="size-4 rotate-180 text-danger" />
          <span className="rounded-full border border-border-strong bg-surface px-4 py-2">
            {providers.malLabel}
          </span>
        </div>
      </Section>

      <Section aria-labelledby="benefits-heading" id="benefits">
        <SectionHeader
          eyebrow={benefits.eyebrow}
          headingId="benefits-heading"
          title={benefits.title}
        />
        <ul className="mt-10 grid gap-4 sm:grid-cols-2">
          {benefits.items.map((item) => (
            <li
              className="rounded-card border border-border bg-surface p-5"
              key={item.title}
            >
              <p className="text-base font-semibold">{item.title}</p>
              <p className="mt-2 text-sm leading-6 text-foreground-muted">
                {item.body}
              </p>
            </li>
          ))}
        </ul>
      </Section>

      <Section aria-labelledby="showcases-heading" id="showcases">
        <SectionHeader
          eyebrow={showcases.eyebrow}
          headingId="showcases-heading"
          title={showcases.title}
        />
        <ol className="mt-10 grid gap-4 lg:grid-cols-3">
          {showcases.items.map((item) => (
            <li
              className="rounded-card border border-border bg-surface p-5"
              key={item.id}
            >
              <p className="text-base font-semibold">{item.title}</p>
              <p className="mt-2 text-sm leading-6 text-foreground-muted">
                {item.body}
              </p>
            </li>
          ))}
        </ol>
      </Section>

      <Section aria-labelledby="privacy-summary-heading" id="privacy-summary">
        <SectionHeader
          description={<p>{privacySummary.intro}</p>}
          eyebrow={privacySummary.eyebrow}
          headingId="privacy-summary-heading"
          title={privacySummary.title}
        />
        <ul className="mt-8 grid gap-4 sm:grid-cols-3">
          {privacySummary.pillars.map((pillar) => (
            <li
              className="rounded-card border border-border bg-surface p-5"
              key={pillar.title}
            >
              <p className="text-sm font-semibold">{pillar.title}</p>
              <p className="mt-2 text-sm leading-6 text-foreground-muted">
                {pillar.body}
              </p>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-sm text-foreground-subtle">
          {privacySummary.support}
        </p>
        <div className="mt-6">
          <Button asChild variant="secondary">
            <a href={pageHref(locale, "privacy")}>{privacySummary.cta}</a>
          </Button>
        </div>
      </Section>

      <Section aria-labelledby="open-source-heading" id="open-source">
        <SectionHeader
          description={<p>{openSource.body}</p>}
          eyebrow={openSource.eyebrow}
          headingId="open-source-heading"
          title={openSource.title}
        />
        <div className="mt-6">
          <Button asChild variant="secondary">
            <a href={GITHUB_URL} rel="noreferrer" target="_blank">
              <CodeXml aria-hidden="true" className="size-4" />
              {openSource.cta}
            </a>
          </Button>
        </div>
      </Section>

      <Section aria-labelledby="roadmap-heading" id="roadmap">
        <SectionHeader
          description={<p>{roadmap.intro}</p>}
          eyebrow={roadmap.eyebrow}
          headingId="roadmap-heading"
          title={roadmap.title}
        />
        <ol className="mt-8 grid gap-4 sm:grid-cols-3">
          {roadmap.items.map((item) => (
            <li
              className="rounded-card border border-border bg-surface p-5"
              key={item.version}
            >
              <p className="text-xs font-bold uppercase tracking-[0.13em] text-danger">
                {item.version} · {item.status}
              </p>
              <p className="mt-2 text-base font-semibold">{item.title}</p>
              <p className="mt-2 text-sm leading-6 text-foreground-muted">
                {item.description}
              </p>
              {item.supporting ? (
                <p className="mt-2 text-xs leading-5 text-foreground-subtle">
                  {item.supporting}
                </p>
              ) : null}
            </li>
          ))}
        </ol>
        <p className="mt-6 text-sm text-foreground-subtle">
          {roadmap.disclaimer}
        </p>
        <div className="mt-4">
          <Button asChild variant="secondary">
            <a href={GITHUB_ROADMAP_URL} rel="noreferrer" target="_blank">
              {roadmap.cta}
            </a>
          </Button>
        </div>
      </Section>

      <Section aria-labelledby="download-heading" id="download">
        <SectionHeader
          eyebrow={download.eyebrow}
          headingId="download-heading"
          title={download.title}
        />
        <p className="mt-4 text-base text-foreground-muted">
          {download.supportCopy}
        </p>
        <div className="mt-6 rounded-card border border-border bg-surface p-5">
          <p className="text-xs font-bold uppercase tracking-[0.13em] text-danger">
            {download.noRelease.statusLabel}
          </p>
          <p className="mt-2 text-sm leading-6 text-foreground-muted">
            {download.noRelease.message}
          </p>
          <div className="mt-4">
            <Button asChild size="large" variant="secondary">
              <a href={GITHUB_URL} rel="noreferrer" target="_blank">
                {download.noRelease.cta}
              </a>
            </Button>
          </div>
        </div>
        <p className="mt-4 text-xs text-foreground-subtle">
          {download.originLine}
        </p>
      </Section>

      <Section aria-labelledby="faq-heading" id="faq">
        <SectionHeader
          eyebrow={faq.eyebrow}
          headingId="faq-heading"
          title={faq.title}
        />
        <div className="mt-8 rounded-block border border-border bg-surface-raised px-5 sm:px-7">
          <Accordion collapsible type="single">
            {faq.items.map((item) => (
              <AccordionItem key={item.question} value={item.question}>
                <AccordionTrigger>{item.question}</AccordionTrigger>
                <AccordionContent>{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </Section>
    </>
  );
}
