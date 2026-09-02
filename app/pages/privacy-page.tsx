import { getContent } from "../content";
import { Section } from "../components/layout/section";
import { formatIsoDate } from "../lib/i18n/format";
import type { Locale } from "../lib/i18n/locales";

interface LocalePageProps {
  locale: Locale;
}

export function PrivacyPage({ locale }: LocalePageProps) {
  const { privacyPage } = getContent(locale);

  return (
    <Section aria-labelledby="privacy-heading">
      <article>
        <h1 className="text-3xl sm:text-4xl" id="privacy-heading">
          {privacyPage.title}
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-7 text-foreground-muted">
          {privacyPage.intro}
        </p>
        <div className="mt-10 grid gap-6">
          {privacyPage.sections.map((section, index) => {
            const headingId = `privacy-section-${index}`;
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
          {privacyPage.lastUpdatedLabel}:{" "}
          <time dateTime={privacyPage.lastUpdated}>
            {formatIsoDate(privacyPage.lastUpdated, locale)}
          </time>
        </p>
      </article>
    </Section>
  );
}
