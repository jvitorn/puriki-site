import { ArrowRight } from "lucide-react";
import { Section } from "../components/layout/section";
import { Button } from "../components/ui/button";
import { pageHref } from "../lib/i18n/links";
import { DEFAULT_LOCALE } from "../lib/i18n/locales";
import type { RouteHandle } from "../lib/i18n/route-handle";

// The 404 page has no meaningful locale of its own (GitHub Pages serves it
// for any unmatched path). It declares the default locale/home so the
// shell and language switcher render sensibly instead of throwing.
export const handle: RouteHandle = { locale: DEFAULT_LOCALE, page: "home" };

export function meta() {
  return [
    { title: "Página não encontrada — Puriki" },
    {
      name: "description",
      content: "A página que você procura não existe ou foi movida.",
    },
  ];
}

export default function NotFoundRoute() {
  return (
    <Section aria-labelledby="not-found-heading">
      <div className="max-w-xl">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-danger">
          404
        </p>
        <h1 className="mt-4 text-3xl sm:text-4xl" id="not-found-heading">
          Página não encontrada
        </h1>
        <p className="mt-4 text-base leading-7 text-foreground-muted">
          Parece que esse anime não está nesta lista.
        </p>
        <div className="mt-8">
          <Button asChild size="large">
            <a href={pageHref(DEFAULT_LOCALE, "home")}>
              Voltar para o Puriki
              <ArrowRight aria-hidden="true" className="size-4" />
            </a>
          </Button>
        </div>
      </div>
    </Section>
  );
}
