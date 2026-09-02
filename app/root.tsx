import type { ReactNode } from "react";
import type { Route } from "./+types/root";
import { SiteShell } from "./components/layout/site-shell";
import stylesheet from "./styles/app.css?url";
import { Links, Meta, Outlet, Scripts, ScrollRestoration } from "react-router";

export const links: Route.LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
];

export function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <Meta />
        <Links />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Puriki</title>
      </head>
      <body>
        <a className="skip-link" href="#main-content">
          Pular para o conteúdo
        </a>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <SiteShell>
      <Outlet />
    </SiteShell>
  );
}

export function HydrateFallback() {
  return <p className="sr-only">Carregando Puriki...</p>;
}
