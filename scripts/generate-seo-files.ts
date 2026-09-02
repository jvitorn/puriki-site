import { writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";
import { LOCALES } from "../app/lib/i18n/locales";
import { PAGES, getPagePath } from "../app/lib/i18n/pages";
import { buildAbsoluteUrl, normalizeSiteUrl } from "../app/lib/seo/site-url";

const DEFAULT_SITE_URL = "http://localhost:5173";

function escapeXml(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

/**
 * Exactly the nine public pages, absolute — Foundation and 404 are
 * intentionally excluded (they carry their own `noindex` meta and are
 * never canonical public content).
 */
export function getPublicUrls(siteUrl: string): string[] {
  const normalized = normalizeSiteUrl(siteUrl);
  return LOCALES.flatMap((locale) =>
    PAGES.map((page) => buildAbsoluteUrl(normalized, getPagePath(locale, page))),
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

// NOTE: on GitHub Pages, this repository is a *project site*
// (https://jvitorn.github.io/puriki-site/). This robots.txt only governs
// requests actually served from that path — it has no authority over
// https://jvitorn.github.io/robots.txt (the user/org site root), which
// this repository does not control. Once a custom domain is adopted this
// file naturally becomes the whole origin's robots.txt with no changes
// needed here.
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
