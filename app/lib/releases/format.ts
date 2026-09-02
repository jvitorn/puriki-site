import { localeConfig, type Locale } from "../i18n/locales";

const DIGITAL_SIZE_UNITS = [
  "byte",
  "kilobyte",
  "megabyte",
  "gigabyte",
] as const;

/** Human-readable file size (e.g. "24.3 MB"), decimal (1000-based) units via `Intl.NumberFormat`. */
export function formatFileSize(sizeBytes: number, locale: Locale): string {
  let value = sizeBytes;
  let unitIndex = 0;

  while (value >= 1000 && unitIndex < DIGITAL_SIZE_UNITS.length - 1) {
    value /= 1000;
    unitIndex += 1;
  }

  return new Intl.NumberFormat(localeConfig[locale].dateLocale, {
    style: "unit",
    unit: DIGITAL_SIZE_UNITS[unitIndex],
    unitDisplay: "short",
    maximumFractionDigits: unitIndex === 0 ? 0 : 1,
  }).format(value);
}

/** Localized long-form publication date (e.g. "August 15, 2026"). */
export function formatReleaseDate(publishedAt: string, locale: Locale): string {
  return new Intl.DateTimeFormat(localeConfig[locale].dateLocale, {
    dateStyle: "long",
  }).format(new Date(publishedAt));
}
