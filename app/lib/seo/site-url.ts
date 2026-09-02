// Pure, environment-independent URL helpers — no `import.meta.env`, no
// `process.env`. Safe to import both from Vite/browser code (via
// `app/lib/config.ts`) and from a plain Node script run outside Vite
// (`scripts/generate-seo-files.ts`), so the two never drift.
//
// `SITE_URL` already represents the full public root of the deployment,
// including any GitHub Pages project-site segment (e.g.
// `https://jvitorn.github.io/puriki-site/`). It must never be combined
// with `BASE_PATH` — that would double the `/puriki-site/` segment. Only
// combine it with a path that's relative to the site's own root, such as
// what `getPagePath()` returns.

export function normalizeSiteUrl(value: string): string {
  return value.endsWith("/") ? value : `${value}/`;
}

/**
 * `buildAbsoluteUrl("https://jvitorn.github.io/puriki-site/", "/en/privacy/")`
 * -> `"https://jvitorn.github.io/puriki-site/en/privacy/"`.
 *
 * `buildAbsoluteUrl("https://jvitorn.github.io/puriki-site/", "/")`
 * -> `"https://jvitorn.github.io/puriki-site/"` (pt-BR home).
 */
export function buildAbsoluteUrl(siteUrl: string, relativePath: string): string {
  const base = normalizeSiteUrl(siteUrl);
  const relative = relativePath.replace(/^\/+/, "");
  return `${base}${relative}`;
}
