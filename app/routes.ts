import { index, prefix, route, type RouteConfig } from "@react-router/dev/routes";
import { LOCALES, localeConfig } from "./lib/i18n/locales";
import { PAGES, PAGE_SLUGS } from "./lib/i18n/pages";

function localePageRoutes(locale: string) {
  return PAGES.map((page) => {
    const slug = PAGE_SLUGS[page];
    const file = `routes/pages/${locale}/${page}.tsx`;
    return slug ? route(slug, file) : index(file);
  });
}

export default [
  ...LOCALES.flatMap((locale) => {
    const routesForLocale = localePageRoutes(locale);
    const segment = localeConfig[locale].urlSegment;
    return segment ? prefix(segment, routesForLocale) : routesForLocale;
  }),
  route("foundation", "routes/foundation.tsx"),
  route("404", "routes/not-found.tsx"),
  route("*", "routes/catch-all.tsx"),
] satisfies RouteConfig;
