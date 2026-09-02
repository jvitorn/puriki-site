import type { ReactNode } from "react";
import type { Locale } from "../../lib/i18n/locales";
import type { PageKey } from "../../lib/i18n/pages";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";

interface SiteShellProps {
  locale: Locale;
  page: PageKey;
  children: ReactNode;
}

export function SiteShell({ locale, page, children }: SiteShellProps) {
  return (
    <>
      <SiteHeader locale={locale} page={page} />
      <main id="main-content" tabIndex={-1}>
        {children}
      </main>
      <SiteFooter locale={locale} />
    </>
  );
}
