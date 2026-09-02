import { withBasePath } from "../config";
import type { HomeAnchor } from "./anchors";
import type { Locale } from "./locales";
import { getPagePath, type PageKey } from "./pages";

/**
 * The only place allowed to turn locale + page into a browser-facing href.
 * Every component (Header, Footer, language switcher, pages) must go
 * through this instead of concatenating URL segments manually.
 */
export function pageHref(locale: Locale, page: PageKey): string {
  return withBasePath(getPagePath(locale, page));
}

/**
 * Links to a section on the Home page of the given locale. Always targets
 * the Home page explicitly, so it resolves correctly even when the current
 * page is Privacy or Terms (e.g. `/en/privacy/` -> `/en/#roadmap`).
 */
export function homeAnchorHref(locale: Locale, anchor: HomeAnchor): string {
  return `${pageHref(locale, "home")}#${anchor}`;
}
