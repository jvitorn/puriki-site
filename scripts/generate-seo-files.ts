import { writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";
import { LOCALES } from "../app/lib/i18n/locales";
import { PAGES, getPagePath } from "../app/lib/i18n/pages";
import { buildAbsoluteUrl, normalizeSiteUrl } from "../app/lib/seo/site-url";

const DEFAULT_SITE_URL = "http://localhost:5173";

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/**
 * Exactly the nine public pages, absolute — the 404 page is intentionally
 * excluded (it carries its own `noindex` meta and is never canonical
 * public content).
 */
export function getPublicUrls(siteUrl: string): string[] {
  const normalized = normalizeSiteUrl(siteUrl);
  return LOCALES.flatMap((locale) =>
    PAGES.map((page) =>
      buildAbsoluteUrl(normalized, getPagePath(locale, page)),
    ),
  );
}

export function buildSitemapXml(siteUrl: string): string {
  const urls = getPublicUrls(siteUrl);
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((url) => `  <url>\n    <loc>${escapeXml(url)}</loc>\n  </url>`).join("\n")}
</urlset>
`;
}

// NOTA: no GitHub Pages, este repositório é um *project site*
// (https://jvitorn.github.io/puriki-site/). Este robots.txt só governa
// requisições de fato servidas a partir desse path — não tem autoridade
// sobre https://jvitorn.github.io/robots.txt (a raiz do site do usuário/
// organização), que este repositório não controla. Quando um domínio
// próprio for adotado, este arquivo naturalmente passa a ser o
// robots.txt da origem inteira, sem precisar de mudança aqui.
export function buildRobotsTxt(siteUrl: string): string {
  return `User-agent: *
Allow: /

Sitemap: ${buildAbsoluteUrl(siteUrl, "sitemap.xml")}
`;
}

async function main() {
  const clientDirectory = path.resolve(
    path.dirname(fileURLToPath(import.meta.url)),
    "..",
    "build",
    "client",
  );
  const siteUrl = normalizeSiteUrl(
    process.env.SITE_URL || process.env.VITE_SITE_URL || DEFAULT_SITE_URL,
  );

  await writeFile(
    path.join(clientDirectory, "sitemap.xml"),
    buildSitemapXml(siteUrl),
    "utf8",
  );
  await writeFile(
    path.join(clientDirectory, "robots.txt"),
    buildRobotsTxt(siteUrl),
    "utf8",
  );

  console.log(
    `generate-seo-files — wrote sitemap.xml (${getPublicUrls(siteUrl).length} URLs) and robots.txt for ${siteUrl}`,
  );
}

const isMainModule = process.argv[1] === fileURLToPath(import.meta.url);

if (isMainModule) {
  main().catch((error: unknown) => {
    console.error(
      "generate-seo-files failed:",
      error instanceof Error ? error.message : error,
    );
    process.exitCode = 1;
  });
}
