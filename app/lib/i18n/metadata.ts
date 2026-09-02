import type { LinksFunction, MetaDescriptor } from "react-router";
import { getContent } from "../../content";
import { absoluteSiteUrl } from "../config";
import { getReleaseMetadata } from "../releases";
import { LOCALES, localeConfig, type Locale } from "./locales";
import { getPagePath, PAGES, type PageKey } from "./pages";

const SITE_NAME = "Puriki";
const SOCIAL_IMAGE_WIDTH = 1200;
const SOCIAL_IMAGE_HEIGHT = 630;

/**
 * The full per-locale/per-page metadata model: title, description,
 * canonical path, and the Open Graph fields rendered through `<Meta />`/
 * `<Links />`. Canonical path and OG locale are derived from the same
 * locale/page source of truth as routing, not duplicated as content.
 */
export interface PageMetadataModel {
  title: string;
  description: string;
  canonicalPath: string;
  canonicalUrl: string;
  ogTitle: string;
  ogDescription: string;
  ogLocale: string;
  socialImageUrl: string;
}

export function getPageMetadataModel(
  locale: Locale,
  page: PageKey,
): PageMetadataModel {
  const seo = getContent(locale).seo[page];
  const canonicalPath = getPagePath(locale, page);

  return {
    title: seo.title,
    description: seo.description,
    canonicalPath,
    canonicalUrl: absoluteSiteUrl(canonicalPath),
    ogTitle: seo.title,
    ogDescription: seo.description,
    ogLocale: localeConfig[locale].ogLocale,
    socialImageUrl: absoluteSiteUrl("seo/og-image.png"),
  };
}

/**
 * `SoftwareApplication` over `MobileApplication`: it's the schema.org type
 * most consistently recognized by structured-data validators/rich-result
 * tooling for a mobile app landing page; `operatingSystem: "Android"`
 * already narrows it correctly. Only truthful fields — no rating, review,
 * download count, Play Store URL, or organization facts we haven't
 * defined. `softwareVersion`/`downloadUrl` are included only once a
 * stable release actually exists.
 */
function buildSoftwareApplicationJsonLd(locale: Locale) {
  const release = getReleaseMetadata();
  const home = getPageMetadataModel(locale, "home");

  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: SITE_NAME,
    applicationCategory: "EntertainmentApplication",
    operatingSystem: "Android",
    url: home.canonicalUrl,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    ...(release.available
      ? { softwareVersion: release.version, downloadUrl: release.downloadUrl }
      : {}),
  };
}

/**
 * Title, description, canonical, Open Graph, Twitter Card, and (home
 * page only) JSON-LD — everything `<Meta />` renders for a locale/page.
 * hreflang/canonical `<link>` tags are emitted separately via
 * `buildPageLinks` (route modules export both from the same factory).
 */
export function buildPageMeta(locale: Locale, page: PageKey): MetaDescriptor[] {
  const metadata = getPageMetadataModel(locale, page);

  const descriptors: MetaDescriptor[] = [
    { title: metadata.title },
    { name: "description", content: metadata.description },
    { property: "og:type", content: "website" },
    { property: "og:site_name", content: SITE_NAME },
    { property: "og:title", content: metadata.ogTitle },
    { property: "og:description", content: metadata.ogDescription },
    { property: "og:url", content: metadata.canonicalUrl },
    { property: "og:image", content: metadata.socialImageUrl },
    { property: "og:image:width", content: String(SOCIAL_IMAGE_WIDTH) },
    { property: "og:image:height", content: String(SOCIAL_IMAGE_HEIGHT) },
    { property: "og:locale", content: metadata.ogLocale },
    ...LOCALES.filter((candidate) => candidate !== locale).map((candidate) => ({
      property: "og:locale:alternate",
      content: localeConfig[candidate].ogLocale,
    })),
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: metadata.ogTitle },
    { name: "twitter:description", content: metadata.ogDescription },
    { name: "twitter:image", content: metadata.socialImageUrl },
  ];

  if (page === "home") {
    descriptors.push({
      "script:ld+json": buildSoftwareApplicationJsonLd(locale),
    });
  }

  return descriptors;
}

/**
 * Canonical + hreflang (including x-default -> pt-BR) `<link>` tags for a
 * locale/page. Privacy/Terms hreflang alternates point at the equivalent
 * Privacy/Terms page in each locale — never at Home.
 */
export function buildPageLinks(
  locale: Locale,
  page: PageKey,
): ReturnType<LinksFunction> {
  const canonicalUrl = absoluteSiteUrl(getPagePath(locale, page));

  const alternates = LOCALES.map((candidate) => ({
    rel: "alternate" as const,
    hrefLang: localeConfig[candidate].htmlLang,
    href: absoluteSiteUrl(getPagePath(candidate, page)),
  }));

  const xDefault = {
    rel: "alternate" as const,
    hrefLang: "x-default",
    href: absoluteSiteUrl(getPagePath("pt-BR", page)),
  };

  return [
    { rel: "canonical", href: canonicalUrl },
    ...alternates,
    xDefault,
  ];
}

/** Every canonical URL for the nine public pages — used by the sitemap. */
export function getAllPublicCanonicalUrls(): string[] {
  return LOCALES.flatMap((locale) =>
    PAGES.map((page) => absoluteSiteUrl(getPagePath(locale, page))),
  );
}

/** noindex meta for non-public routes (Foundation sandbox, 404). */
export function buildNoIndexMeta(title: string, description: string): MetaDescriptor[] {
  return [
    { title },
    { name: "description", content: description },
    { name: "robots", content: "noindex, nofollow" },
  ];
}
