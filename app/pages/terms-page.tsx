import { getContent } from "../content";
import { Section } from "../components/layout/section";
import type { Locale } from "../lib/i18n/locales";

interface LocalePageProps {
  locale: Locale;
}

export function TermsPage({ locale }: LocalePageProps) {
  const { termsPage } = getContent(locale);

  return (
    <Section aria-labelledby="terms-heading">
      <h1 className="text-3xl sm:text-4xl" id="terms-heading">
        {termsPage.title}
      </h1>
      <p
        className="mt-4 inline-block rounded-full border border-warning/45 bg-warning/10 px-3 py-1 text-xs font-bold text-warning"
        role="note"
      >
        {termsPage.preparationNotice}
      </p>
      <p className="mt-6 max-w-2xl text-base leading-7 text-foreground-muted">
        {termsPage.intro}
      </p>
      <div className="mt-10 grid gap-6">
        {termsPage.sections.map((section) => (
          <div key={section.heading}>
            <h2 className="text-lg font-semibold">{section.heading}</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-foreground-muted">
              {section.body}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}
