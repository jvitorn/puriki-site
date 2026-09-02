import type { PrivacySummaryContent } from "../content/types";
import { Section, SectionHeader } from "../components/layout/section";
import { Button } from "../components/ui/button";
import { pageHref } from "../lib/i18n/links";
import type { Locale } from "../lib/i18n/locales";

interface PrivacySectionProps {
  locale: Locale;
  content: PrivacySummaryContent;
}

export function PrivacySection({ locale, content }: PrivacySectionProps) {
  return (
    <Section aria-labelledby="privacy-summary-heading" id="privacy-summary">
      <SectionHeader
        description={<p>{content.intro}</p>}
        eyebrow={content.eyebrow}
        headingId="privacy-summary-heading"
        title={content.title}
      />
      <ul className="mt-8 grid gap-4 sm:grid-cols-3">
        {content.pillars.map((pillar) => (
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
      <p className="mt-6 max-w-2xl text-sm text-foreground-subtle">
        {content.support}
      </p>
      <div className="mt-6">
        <Button asChild variant="secondary">
          <a href={pageHref(locale, "privacy")}>{content.cta}</a>
        </Button>
      </div>
    </Section>
  );
}
