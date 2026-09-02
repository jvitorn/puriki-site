import { useMatches } from "react-router";
import { DEFAULT_LOCALE } from "./locales";
import type { RouteHandle } from "./route-handle";

const FALLBACK_HANDLE: RouteHandle = { locale: DEFAULT_LOCALE, page: "home" };

function isRouteHandle(value: unknown): value is RouteHandle {
  return (
    typeof value === "object" &&
    value !== null &&
    "locale" in value &&
    "page" in value
  );
}

/**
 * The single centralized way to resolve "current locale" and "current
 * page". Every route module that belongs to the localized architecture
 * exports `handle: RouteHandle`; this walks the active matches to find it
 * instead of parsing `window.location` or re-checking `locale === "..."`
 * across components. Falls back to the default locale/home for routes
 * outside the localized set (e.g. the temporary /foundation sandbox).
 */
export function useRouteHandle(): RouteHandle {
  const matches = useMatches();

  for (let index = matches.length - 1; index >= 0; index -= 1) {
    const handle = matches[index]?.handle;

    if (isRouteHandle(handle)) {
      return handle;
    }
  }

  return FALLBACK_HANDLE;
}
