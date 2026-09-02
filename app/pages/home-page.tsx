import { getContent } from "../content";
import type { Locale } from "../lib/i18n/locales";
import { getReleaseMetadata } from "../lib/releases";
import { BenefitsSection } from "../sections/benefits-section";
import { DownloadSection } from "../sections/download-section";
import { FaqSection } from "../sections/faq-section";
import { HeroSection } from "../sections/hero-section";
import { OpenSourceSection } from "../sections/open-source-section";
import { PrivacySection } from "../sections/privacy-section";
import { ProvidersSection } from "../sections/providers-section";
import { RoadmapSection } from "../sections/roadmap-section";
import { ShowcasesSection } from "../sections/showcases-section";

interface LocalePageProps {
  locale: Locale;
}

export function HomePage({ locale }: LocalePageProps) {
  const content = getContent(locale);
  const release = getReleaseMetadata();

  return (
    <>
      <HeroSection content={content.hero} locale={locale} />
      <ProvidersSection content={content.providers} />
      <BenefitsSection content={content.benefits} />
      <ShowcasesSection content={content.showcases} />
      <PrivacySection content={content.privacySummary} locale={locale} />
      <OpenSourceSection content={content.openSource} />
      <RoadmapSection content={content.roadmap} />
      <DownloadSection content={content.download} locale={locale} release={release} />
      <FaqSection content={content.faq} />
    </>
  );
}
