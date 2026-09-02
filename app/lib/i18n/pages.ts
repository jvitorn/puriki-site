import { localeConfig, type Locale } from "./locales";

export const PAGES = ["home", "privacy", "terms"] as const;

export type PageKey = (typeof PAGES)[number];

/** URL slug for each page, empty string for the locale's index page. */
export const PAGE_SLUGS: Record<PageKey, string> = {
  home: "",
  privacy: "privacy",
  terms: "terms",
};

function getPageSegments(locale: Locale, page: PageKey): string[] {
  const localeSegment = localeConfig[locale].urlSegment;
  const pageSlug = PAGE_SLUGS[page];
  return [localeSegment, pageSlug].filter((segment) => segment.length > 0);
}

/**
 * The single source of truth turning locale + page into a public URL path.
 * Always trailing-slash style (folder convention) except the root itself.
 */
export function getPagePath(locale: Locale, page: PageKey): string {
  const segments = getPageSegments(locale, page);
  return segments.length > 0 ? `/${segments.join("/")}/` : "/";
}

/**
 * The route pattern used to register/prerender the page: no leading or
 * trailing slash, matching the shape expected by `route()`/`prefix()` and
 * by the React Router prerender path matcher.
 */
export function getRoutePattern(locale: Locale, page: PageKey): string {
  return getPageSegments(locale, page).join("/");
}
