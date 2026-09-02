import { buildAbsoluteUrl, normalizeSiteUrl } from "./seo/site-url";

const DEFAULT_SITE_URL = "http://localhost:5173";
const DEFAULT_BASE_PATH = "/";

function normalizeBasePath(value: string): string {
  const withLeadingSlash = value.startsWith("/") ? value : `/${value}`;
  return withLeadingSlash.endsWith("/")
    ? withLeadingSlash
    : `${withLeadingSlash}/`;
}

export const siteConfig = {
  siteUrl: normalizeSiteUrl(import.meta.env.VITE_SITE_URL || DEFAULT_SITE_URL),
  basePath: normalizeBasePath(import.meta.env.BASE_URL || DEFAULT_BASE_PATH),
} as const;

export function withBasePath(path = ""): string {
  if (!path) {
    return siteConfig.basePath;
  }

  if (path.startsWith("#")) {
    return `${siteConfig.basePath}${path}`;
  }

  return `${siteConfig.basePath}${path.replace(/^\/+/, "")}`;
}

/**
 * `SITE_URL` + a path relative to the site's own root (e.g. what
 * `getPagePath()` returns). Never combine `SITE_URL` with `BASE_PATH` —
 * `SITE_URL` already includes the public root, GitHub Pages project
 * segment included. See `app/lib/seo/site-url.ts`.
 */
export function absoluteSiteUrl(relativePath: string): string {
  return buildAbsoluteUrl(siteConfig.siteUrl, relativePath);
}
