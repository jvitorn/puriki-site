import { PurikiLogo } from "../brand/puriki-logo";
import { getContent } from "../../content";
import type { FooterLinkTarget } from "../../content/types";
import { homeAnchorHref, pageHref } from "../../lib/i18n/links";
import type { Locale } from "../../lib/i18n/locales";
import { Container } from "./container";

interface SiteFooterProps {
  locale: Locale;
}

function resolveHref(locale: Locale, target: FooterLinkTarget): string {
  if (target.kind === "external") {
    return target.href;
  }

  return homeAnchorHref(locale, target.anchor);
}

export function SiteFooter({ locale }: SiteFooterProps) {
  const { footer, common } = getContent(locale);

  return (
    <footer className="border-t border-border bg-surface">
      <Container className="grid gap-12 py-14 sm:grid-cols-2 lg:grid-cols-[1.4fr_0.7fr_0.7fr_0.7fr] lg:py-18">
        <div className="max-w-sm">
          <p className="flex items-center gap-2">
            <PurikiLogo className="size-6" variant="mark" />
            <span className="text-lg font-bold tracking-tight">
              {common.brandName}
            </span>
          </p>
          <p className="mt-4 text-sm leading-6 text-foreground-muted">
            {footer.tagline}
          </p>
          <p className="mt-5 text-xs leading-5 text-foreground-subtle">
            {footer.disclaimer}
          </p>
        </div>

        {footer.columns.map((column) => (
          <div key={column.title}>
            <h2 className="text-sm font-bold tracking-normal">{column.title}</h2>
            <ul className="mt-4 space-y-3 text-sm text-foreground-muted">
              {column.links.map((link) => {
                const isExternal = link.target.kind === "external";

                return (
                  <li key={link.label}>
                    <a
                      className="rounded-sm no-underline transition-colors hover:text-foreground"
                      href={resolveHref(locale, link.target)}
                      rel={isExternal ? "noreferrer" : undefined}
                      target={isExternal ? "_blank" : undefined}
                    >
                      {link.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}

        <div>
          <h2 className="text-sm font-bold tracking-normal">{footer.legal.title}</h2>
          <ul className="mt-4 space-y-3 text-sm text-foreground-muted">
            <li>
              <a
                className="rounded-sm no-underline transition-colors hover:text-foreground"
                href={pageHref(locale, "privacy")}
              >
                {footer.legal.privacyLabel}
              </a>
            </li>
            <li>
              <a
                className="rounded-sm no-underline transition-colors hover:text-foreground"
                href={pageHref(locale, "terms")}
              >
                {footer.legal.termsLabel}
              </a>
            </li>
          </ul>
        </div>
      </Container>
      <div className="border-t border-border">
        <Container className="flex flex-col gap-2 py-5 text-xs text-foreground-subtle sm:flex-row sm:items-center sm:justify-between">
          <p>{footer.copyright}</p>
        </Container>
      </div>
    </footer>
  );
}
