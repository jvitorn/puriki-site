import type { MetaDescriptor } from "react-router";
import { getContent } from "../../content";
import { localeConfig, type Locale } from "./locales";
import { getPagePath, type PageKey } from "./pages";

/**
 * The full per-locale/per-page metadata model: title, description,
 * canonical path, and the Open Graph fields Phase 05 will render. Derived
 * rather than duplicated in content — canonical path and OG locale come
 * from the same locale/page source of truth as routing, and OG title/
 * description default to the SEO copy unless a page needs to diverge.
 *
 * Only `title`/`description` are actually rendered this phase (see
 * `buildPageMeta`); the rest stays data-only until Phase 05 wires up
 * canonical/hreflang/Open Graph/JSON-LD.
 */
export interface PageMetadataModel {
  title: string;
  description: string;
  canonicalPath: string;
  ogTitle: string;
  ogDescription: string;
  ogLocale: string;
  /** Reserved for a future social share image; unset until one exists. */
  socialImage?: string;
}

export function getPageMetadataModel(
  locale: Locale,
  page: PageKey,
): PageMetadataModel {
  const seo = getContent(locale).seo[page];

  return {
    title: seo.title,
    description: seo.description,
    canonicalPath: getPagePath(locale, page),
    ogTitle: seo.title,
    ogDescription: seo.description,
    ogLocale: localeConfig[locale].ogLocale,
  };
}

/**
 * Title/description for a locale + page, rendered through React Router's
 * `<Meta />`. Canonical/hreflang/Open Graph tags stay data-only for now —
 * emitting them belongs to Phase 05.
 */
export function buildPageMeta(locale: Locale, page: PageKey): MetaDescriptor[] {
  const metadata = getPageMetadataModel(locale, page);

  return [
    { title: metadata.title },
    { name: "description", content: metadata.description },
  ];
}
