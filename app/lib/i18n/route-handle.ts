import type { Locale } from "./locales";
import type { PageKey } from "./pages";

/**
 * Data every localized route module exposes through `export const handle`.
 * `root.tsx` reads it (via `useRouteHandle`) to resolve `<html lang>`, and
 * the shell reads it to render the correct locale content.
 */
export interface RouteHandle {
  locale: Locale;
  page: PageKey;
}
