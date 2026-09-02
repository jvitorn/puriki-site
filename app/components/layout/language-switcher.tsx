import { cn } from "../../lib/utils";
import { pageHref } from "../../lib/i18n/links";
import { LOCALES, localeConfig, type Locale } from "../../lib/i18n/locales";
import type { PageKey } from "../../lib/i18n/pages";

interface LanguageSwitcherProps {
  locale: Locale;
  page: PageKey;
  label: string;
  className?: string;
  onNavigate?: () => void;
}

/**
 * Real links for every supported locale, each pointing at the equivalent
 * page the visitor is currently on (e.g. /en/privacy/ -> /es/privacy/).
 * No forced redirect, no JS-only navigation.
 */
export function LanguageSwitcher({
  locale,
  page,
  label,
  className,
  onNavigate,
}: LanguageSwitcherProps) {
  return (
    <nav aria-label={label} className={className}>
      <ul className="flex flex-wrap items-center gap-1">
        {LOCALES.map((targetLocale) => {
          const isCurrent = targetLocale === locale;
          const config = localeConfig[targetLocale];

          return (
            <li key={targetLocale}>
              <a
                aria-current={isCurrent ? "page" : undefined}
                className={cn(
                  "inline-flex min-h-11 items-center rounded-button px-3 text-sm font-semibold no-underline transition-colors",
                  isCurrent
                    ? "bg-surface-raised text-foreground"
                    : "text-foreground-muted hover:bg-surface-hover hover:text-foreground",
                )}
                href={pageHref(targetLocale, page)}
                hrefLang={config.htmlLang}
                lang={config.htmlLang}
                onClick={onNavigate}
              >
                {config.displayName}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
