import { getContent } from "../content";
import { Section } from "../components/layout/section";
import { formatIsoDate } from "../lib/i18n/format";
import type { Locale } from "../lib/i18n/locales";

interface LocalePageProps {
  locale: Locale;
}

export function TermsPage({ locale }: LocalePageProps) {
  const { termsPage } = getContent(locale);

  return (
    <Section aria-labelledby="terms-heading">
      <article>
        <h1 className="text-3xl sm:text-4xl" id="terms-heading">
          {termsPage.title}
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-7 text-foreground-muted">
          {termsPage.intro}
        </p>
        <div className="mt-10 grid gap-6">
          {termsPage.sections.map((section, index) => {
            const headingId = `terms-section-${index}`;
            return (
              <section aria-labelledby={headingId} key={section.heading}>
                <h2 className="text-lg font-semibold" id={headingId}>
                  {section.heading}
                </h2>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-foreground-muted">
                  {section.body}
                </p>
              </section>
            );
          })}
        </div>
        <p className="mt-10 text-xs text-foreground-subtle">
          {termsPage.lastUpdatedLabel}:{" "}
          <time dateTime={termsPage.lastUpdated}>
            {formatIsoDate(termsPage.lastUpdated, locale)}
          </time>
        </p>
      </article>
    </Section>
  );
}
