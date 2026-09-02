import type { ReactElement } from "react";
import type { LinksFunction, MetaFunction } from "react-router";
import { HomePage } from "../../pages/home-page";
import { PrivacyPage } from "../../pages/privacy-page";
import { TermsPage } from "../../pages/terms-page";
import type { Locale } from "./locales";
import { buildPageLinks, buildPageMeta } from "./metadata";
import type { PageKey } from "./pages";
import type { RouteHandle } from "./route-handle";

const pageComponents: Record<
  PageKey,
  (props: { locale: Locale }) => ReactElement
> = {
  home: HomePage,
  privacy: PrivacyPage,
  terms: TermsPage,
};

/**
 * Binds a locale + page to its shared component. Every route wrapper file
 * under `app/routes/pages/<locale>/<page>.tsx` is a thin re-export of this,
 * so the localized architecture never copies a page's JSX per locale.
 */
export function createLocalePageRoute(locale: Locale, page: PageKey) {
  const PageComponent = pageComponents[page];
  const handle: RouteHandle = { locale, page };
  const meta: MetaFunction = () => buildPageMeta(locale, page);
  const links: LinksFunction = () => buildPageLinks(locale, page);

  function RouteComponent() {
    return <PageComponent locale={locale} />;
  }

  return { Component: RouteComponent, handle, meta, links };
}
