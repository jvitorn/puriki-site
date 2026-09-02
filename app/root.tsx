import type { ReactNode } from "react";
import type { Route } from "./+types/root";
import { getContent } from "./content";
import { SiteShell } from "./components/layout/site-shell";
import { localeConfig } from "./lib/i18n/locales";
import { useRouteHandle } from "./lib/i18n/use-route-handle";
import stylesheet from "./styles/app.css?url";
import { Links, Meta, Outlet, Scripts, ScrollRestoration } from "react-router";

export const links: Route.LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
];

export function Layout({ children }: { children: ReactNode }) {
  const { locale } = useRouteHandle();
  const skipLinkLabel = getContent(locale).common.skipLink;

  return (
    <html lang={localeConfig[locale].htmlLang}>
      <head>
        <Meta />
        <Links />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <a className="skip-link" href="#main-content">
          {skipLinkLabel}
        </a>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  const { locale, page } = useRouteHandle();

  return (
    <SiteShell locale={locale} page={page}>
      <Outlet />
    </SiteShell>
  );
}

export function HydrateFallback() {
  return <p className="sr-only">Carregando Puriki...</p>;
}
