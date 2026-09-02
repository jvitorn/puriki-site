export const LOCALES = ["pt-BR", "en", "es"] as const;

export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "pt-BR";

export interface LocaleConfig {
  /** Internal locale code. */
  code: Locale;
  /** Value used for the document `lang` attribute. */
  htmlLang: string;
  /** URL segment used to prefix routes, empty for the default locale. */
  urlSegment: string;
  /** Name presented to the user in the language switcher. */
  displayName: string;
  /** Short label for compact UI, e.g. a badge. */
  shortLabel: string;
  /** Locale used with `Intl.DateTimeFormat` and friends. */
  dateLocale: string;
  /** Locale identifier reserved for future Open Graph metadata. */
  ogLocale: string;
}

export const localeConfig: Record<Locale, LocaleConfig> = {
  "pt-BR": {
    code: "pt-BR",
    htmlLang: "pt-BR",
    urlSegment: "",
    displayName: "Português",
    shortLabel: "PT",
    dateLocale: "pt-BR",
    ogLocale: "pt_BR",
  },
  en: {
    code: "en",
    htmlLang: "en",
    urlSegment: "en",
    displayName: "English",
    shortLabel: "EN",
    dateLocale: "en-US",
    ogLocale: "en_US",
  },
  es: {
    code: "es",
    htmlLang: "es",
    urlSegment: "es",
    displayName: "Español",
    shortLabel: "ES",
    dateLocale: "es-ES",
    ogLocale: "es_ES",
  },
};

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}
