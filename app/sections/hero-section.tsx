import { ArrowRight, CodeXml } from "lucide-react";
import type { HeroContent } from "../content/types";
import { Container } from "../components/layout/container";
import { Reveal } from "../components/motion/reveal";
import { SmartphoneMockup } from "../components/product/smartphone-mockup";
import { Button } from "../components/ui/button";
import { PURIKUKI_REPO_URL } from "../lib/external-links";
import { homeAnchorHref } from "../lib/i18n/links";
import type { Locale } from "../lib/i18n/locales";

interface HeroSectionProps {
  locale: Locale;
  content: HeroContent;
}

// Abstract, stylized "My List" preview built from design tokens — not a
// real product screenshot. Purely visual (bars/blocks, no literal words) so
// it never leaks Portuguese copy onto the EN/ES pages. Kept simple until
// Phase 03 receives real screenshots (see report: pending asset).
function HeroMockupPreview() {
  return (
    <div className="flex size-full flex-col bg-background px-4 pb-5 pt-10">
      <div className="flex items-center justify-between">
        <div>
          <div className="h-1.5 w-16 rounded-full bg-foreground-subtle/50" />
          <div className="mt-2 h-2.5 w-24 rounded-full bg-foreground/80" />
        </div>
        <span className="size-8 rounded-full border border-border bg-surface-raised" />
      </div>
      <div className="mt-5 h-9 rounded-button border border-border bg-surface" />
      <div className="mt-5 flex items-end justify-between">
        <div>
          <div className="h-1.5 w-14 rounded-full bg-danger/70" />
          <div className="mt-2 h-2.5 w-32 rounded-full bg-foreground/80" />
        </div>
        <div className="h-1.5 w-10 rounded-full bg-foreground-subtle/40" />
      </div>
      <div className="mt-3 grid gap-2.5">
        {["67%", "42%", "25%"].map((progress, index) => (
          <div
            className="grid grid-cols-[3.25rem_1fr] gap-3 rounded-card border border-border bg-surface p-2.5"
            key={progress}
          >
            <div
              className={`rounded-lg ${
                index === 0
                  ? "bg-brand-soft"
                  : index === 1
                    ? "bg-surface-raised"
                    : "bg-surface-hover"
              }`}
            />
            <div className="min-w-0 py-1">
              <div className="h-2 w-[72%] rounded-full bg-foreground/80" />
              <div className="mt-2 h-1.5 w-[44%] rounded-full bg-foreground-subtle/50" />
              <div className="mt-4 h-1 overflow-hidden rounded-full bg-border">
                <div className="h-full rounded-full bg-brand" style={{ width: progress }} />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-auto grid grid-cols-4 gap-3 border-t border-border pt-4">
        {[true, false, false, false].map((active, index) => (
          <span
            className={`mx-auto size-2 rounded-full ${active ? "bg-danger" : "bg-border-strong"}`}
            key={index}
          />
        ))}
      </div>
    </div>
  );
}

export function HeroSection({ locale, content }: HeroSectionProps) {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative overflow-hidden border-b border-border py-18 sm:py-24 lg:py-28"
      id="hero"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-14rem] top-[-12rem] size-[34rem] rounded-full bg-brand/12 blur-[100px]"
      />
      <Container className="relative grid items-center gap-16 lg:grid-cols-[1.08fr_0.92fr] lg:gap-20">
        <Reveal>
          <p className="mb-5 inline-flex items-center rounded-full border border-border-strong bg-surface px-3 py-1.5 text-xs font-bold uppercase tracking-[0.13em] text-foreground-muted">
            {content.eyebrow}
          </p>
          <h1 className="max-w-3xl text-[clamp(2.5rem,6vw,4rem)]" id="hero-heading">
            {content.headline}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-foreground-muted sm:text-xl">
            {content.supporting}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="large">
              <a href={homeAnchorHref(locale, "download")}>
                {content.primaryCta}
                <ArrowRight aria-hidden="true" className="size-4" />
              </a>
            </Button>
            <Button asChild size="large" variant="secondary">
              <a href={PURIKUKI_REPO_URL} rel="noreferrer" target="_blank">
                <CodeXml aria-hidden="true" className="size-4" />
                {content.secondaryCta}
              </a>
            </Button>
          </div>
          <p className="mt-6 text-sm text-foreground-subtle">{content.trustLine}</p>
        </Reveal>

        <Reveal className="relative" delay={100}>
          <div
            aria-hidden="true"
            className="absolute inset-x-[12%] bottom-[-8%] h-[28%] rounded-full bg-brand/20 blur-[70px]"
          />
          <SmartphoneMockup label={content.mockupAlt}>
            <HeroMockupPreview />
          </SmartphoneMockup>
        </Reveal>
      </Container>
    </section>
  );
}
