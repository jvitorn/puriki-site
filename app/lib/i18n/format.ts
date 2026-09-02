import { localeConfig, type Locale } from "./locales";

/** Localized long-form date (e.g. "September 2, 2026") from an ISO `YYYY-MM-DD` string. */
export function formatIsoDate(iso: string, locale: Locale): string {
  return new Intl.DateTimeFormat(localeConfig[locale].dateLocale, {
    dateStyle: "long",
    timeZone: "UTC",
  }).format(new Date(`${iso}T00:00:00Z`));
}
