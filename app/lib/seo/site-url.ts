// Helpers de URL puros, independentes de ambiente — sem `import.meta.env`,
// sem `process.env`. Seguro para importar tanto de código Vite/browser
// (via `app/lib/config.ts`) quanto de um script Node puro fora do Vite
// (`scripts/generate-seo-files.ts`), então os dois nunca desalinham.
//
// `SITE_URL` já representa a raiz pública completa do deploy, incluindo
// qualquer segmento de project site do GitHub Pages (ex.:
// `https://jvitorn.github.io/puriki-site/`). Nunca deve ser combinado com
// `BASE_PATH` — isso duplicaria o segmento `/puriki-site/`. Combine só com
// um path relativo à própria raiz do site, como o que `getPagePath()`
// retorna.

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
export function buildAbsoluteUrl(
  siteUrl: string,
  relativePath: string,
): string {
  const base = normalizeSiteUrl(siteUrl);
  const relative = relativePath.replace(/^\/+/, "");
  return `${base}${relative}`;
}
