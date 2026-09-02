import type { Config } from "@react-router/dev/config";
import { LOCALES } from "./app/lib/i18n/locales";
import { PAGES, getRoutePattern } from "./app/lib/i18n/pages";

function normalizeBasePath(value: string): string {
  const withLeadingSlash = value.startsWith("/") ? value : `/${value}`;
  return withLeadingSlash.endsWith("/")
    ? withLeadingSlash
    : `${withLeadingSlash}/`;
}

const basePath = normalizeBasePath(
  process.env.BASE_PATH || process.env.VITE_BASE_PATH || "/",
);

// The nine public localized pages, derived from the same locale/page model
// the routes and content use, plus the temporary /foundation sandbox and
// the /404 page needed for GitHub Pages. Explicit list instead of
// `prerender: true` now that the public route surface is fixed and small.
const publicRoutePaths = LOCALES.flatMap((locale) =>
  PAGES.map((page) => {
    const pattern = getRoutePattern(locale, page);
    return pattern ? `/${pattern}` : "/";
  }),
);

export default {
  basename: basePath,
  ssr: false,
  prerender: [...publicRoutePaths, "/foundation", "/404"],
} satisfies Config;
