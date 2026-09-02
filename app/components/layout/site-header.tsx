import { CodeXml, Download, Menu } from "lucide-react";
import { useState } from "react";
import { getContent } from "../../content";
import { PURIKUKI_REPO_URL } from "../../lib/external-links";
import { homeAnchorHref, pageHref } from "../../lib/i18n/links";
import type { Locale } from "../../lib/i18n/locales";
import type { PageKey } from "../../lib/i18n/pages";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Container } from "./container";
import { LanguageSwitcher } from "./language-switcher";

interface SiteHeaderProps {
  locale: Locale;
  page: PageKey;
}

function Wordmark({ locale, brandName }: { locale: Locale; brandName: string }) {
  return (
    <a
      aria-label={`${brandName} — página inicial`}
      className="inline-flex min-h-11 items-center gap-3 rounded-button no-underline"
      href={pageHref(locale, "home")}
    >
      <span
        aria-hidden="true"
        className="grid size-8 place-items-center rounded-[0.55rem] bg-brand text-sm font-black text-brand-foreground shadow-[0_6px_20px_var(--brand-shadow)]"
      >
        ピ
      </span>
      <span className="text-lg font-bold tracking-[-0.025em]">{brandName}</span>
    </a>
  );
}

export function SiteHeader({ locale, page }: SiteHeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const content = getContent(locale);
  const { navigation, common } = content;

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95">
      <Container className="flex h-[var(--header-height)] items-center justify-between gap-5">
        <Wordmark brandName={common.brandName} locale={locale} />

        <nav aria-label={navigation.primaryNavLabel} className="hidden items-center gap-1 lg:flex">
          {navigation.items.map((item) => (
            <a
              className="inline-flex min-h-11 items-center rounded-button px-3 text-sm font-medium text-foreground-muted no-underline transition-colors hover:bg-surface-hover hover:text-foreground"
              href={homeAnchorHref(locale, item.anchor)}
              key={item.anchor}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <LanguageSwitcher label={navigation.languageLabel} locale={locale} page={page} />
          <Button asChild variant="secondary">
            <a href={PURIKUKI_REPO_URL} rel="noreferrer" target="_blank">
              <CodeXml aria-hidden="true" className="size-4" />
              {navigation.githubLabel}
            </a>
          </Button>
          <Button asChild>
            <a href={homeAnchorHref(locale, "download")}>
              <Download aria-hidden="true" className="size-4" />
              {navigation.downloadLabel}
            </a>
          </Button>
        </div>

        <div className="lg:hidden">
          <Sheet onOpenChange={setIsOpen} open={isOpen}>
            <SheetTrigger asChild>
              <Button aria-label={navigation.menuButtonLabel} size="icon" variant="ghost">
                <Menu aria-hidden="true" className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>{navigation.menuTitle}</SheetTitle>
                <SheetDescription>{navigation.menuDescription}</SheetDescription>
              </SheetHeader>

              <nav aria-label={navigation.mobileNavLabel} className="mt-8 flex flex-col gap-1">
                {navigation.items.map((item) => (
                  <a
                    className="flex min-h-12 items-center rounded-button px-3 font-semibold text-foreground-muted no-underline transition-colors hover:bg-surface-hover hover:text-foreground"
                    href={homeAnchorHref(locale, item.anchor)}
                    key={item.anchor}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </a>
                ))}
              </nav>

              <div className="mt-6 border-t border-border pt-6">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-foreground-subtle">
                  {navigation.languageLabel}
                </p>
                <LanguageSwitcher
                  className="mt-2"
                  label={navigation.languageLabel}
                  locale={locale}
                  onNavigate={() => setIsOpen(false)}
                  page={page}
                />
              </div>

              <div className="mt-auto grid gap-3 pt-8">
                <Button asChild variant="secondary">
                  <a
                    href={PURIKUKI_REPO_URL}
                    onClick={() => setIsOpen(false)}
                    rel="noreferrer"
                    target="_blank"
                  >
                    <CodeXml aria-hidden="true" className="size-4" />
                    {navigation.githubLabel}
                  </a>
                </Button>
                <Button asChild size="large">
                  <a
                    href={homeAnchorHref(locale, "download")}
                    onClick={() => setIsOpen(false)}
                  >
                    <Download aria-hidden="true" className="size-4" />
                    {navigation.downloadLabel}
                  </a>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </Container>
    </header>
  );
}
