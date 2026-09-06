import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";
import { LOCALES, localeConfig, type Locale } from "../app/lib/i18n/locales";
import { getPagePath, PAGES, type PageKey } from "../app/lib/i18n/pages";
import { buildAbsoluteUrl, normalizeSiteUrl } from "../app/lib/seo/site-url";
import { buildRobotsTxt, buildSitemapXml } from "./generate-seo-files";

// Mesmos defaults que `pnpm build`/`generate-seo-files.ts` usam, para que
// `pnpm build && pnpm validate:static` funcione sem env vars, para
// iteração local, offline e fora de produção.
const DEFAULT_SITE_URL = "http://localhost:5173";
const DEFAULT_BASE_PATH = "/";

const REPO_ROOT = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
);
const CLIENT_DIR = path.join(REPO_ROOT, "build", "client");

// Extensões de texto que vale a pena varrer em busca de um segredo/
// localhost perdido ou (para esse pequeno conjunto de extensões) conteúdo
// de rota. Assets binários (png/woff2) são ignorados — não há nada
// textual para encontrar ali.
const TEXT_EXTENSIONS = new Set([
  ".html",
  ".js",
  ".css",
  ".xml",
  ".txt",
  ".json",
  ".map",
]);

// Extensões/nomes de arquivo que nunca podem ir para o artifact estático
// público — APKs e checksums são responsabilidade só da GitHub Release
// (ver docs/planos/PHASE_04R_MULTI_ABI_RELEASES.md), nunca algo que este
// site hospeda ou espelha.
const FORBIDDEN_ARTIFACT_PATTERNS: RegExp[] = [
  /\.apk$/i,
  /\.keystore$/i,
  /\.jks$/i,
  /^sha256sums\.txt$/i,
];

// Identificadores que nunca deveriam aparecer em um bundle de cliente
// estático: este site nunca envia um token do GitHub, um token local de
// release-fetch, ou um segredo Android/EAS para o navegador (ver
// docs/planos/DECISIONS.md — sem dependência runtime da API do GitHub,
// sem segredo com prefixo VITE_*). A mera presença textual desses nomes
// no output de build é a checagem de sanidade, não um scanner completo de
// segredos.
const SECRET_PATTERNS: RegExp[] = [
  /ghp_[A-Za-z0-9]{20,}/,
  /github_pat_[A-Za-z0-9_]{20,}/,
  /RELEASE_FETCH_TOKEN/,
  /GITHUB_TOKEN/,
  /EAS_TOKEN/,
];

function normalizeBasePath(value: string): string {
  const withLeadingSlash = value.startsWith("/") ? value : `/${value}`;
  return withLeadingSlash.endsWith("/")
    ? withLeadingSlash
    : `${withLeadingSlash}/`;
}

/** True if `text` contains a literal `http(s)://localhost` reference. */
export function containsLocalhost(text: string): boolean {
  return /https?:\/\/localhost/i.test(text);
}

/**
 * True if `basePath` (e.g. `/puriki-site/`) appears doubled back-to-back in
 * `text` — the exact `/puriki-site/puriki-site/` failure mode a naive
 * URL-join can produce. Meaningless (always false) for the root base path.
 */
export function hasDuplicatedBasePath(text: string, basePath: string): boolean {
  if (basePath === "/") {
    return false;
  }
  const segment = basePath.replace(/^\/|\/$/g, "");
  return text.includes(`/${segment}/${segment}/`);
}

export interface ExpectedPublicFile {
  locale: Locale;
  page: PageKey;
  publicPath: string;
  relativeFilePath: string;
}

/**
 * The nine public routes, derived from the same `LOCALES`/`PAGES`/
 * `getPagePath` source of truth routing and the sitemap use — never a
 * separately hand-written list — mapped to the flattened output file
 * `prepare-static-output.mjs` produces (basePath directory un-nested back
 * to `build/client/<route>/index.html`).
 */
export function getExpectedPublicFiles(): ExpectedPublicFile[] {
  return LOCALES.flatMap((locale) =>
    PAGES.map((page) => {
      const publicPath = getPagePath(locale, page);
      const trimmed = publicPath.replace(/^\/+|\/+$/g, "");
      const relativeFilePath =
        trimmed.length > 0 ? path.join(trimmed, "index.html") : "index.html";
      return { locale, page, publicPath, relativeFilePath };
    }),
  );
}

function extractTags(html: string, tagRegex: RegExp): string[] {
  return [...html.matchAll(tagRegex)].map((match) => match[0]);
}

function getAttr(tag: string, name: string): string | undefined {
  const match = tag.match(new RegExp(`${name}\\s*=\\s*"([^"]*)"`, "i"));
  return match?.[1];
}

function getMetaContent(
  tags: string[],
  attrName: "property" | "name",
  value: string,
): string | undefined {
  const tag = tags.find((candidate) =>
    new RegExp(`${attrName}\\s*=\\s*"${value}"`, "i").test(candidate),
  );
  return tag ? getAttr(tag, "content") : undefined;
}

interface HtmlAlternate {
  hrefLang?: string;
  href?: string;
}

export interface HtmlCheckContext {
  expectedLang: string;
  expectedCanonical: string;
  expectedAlternates: HtmlAlternate[];
  isHome: boolean;
  basePath: string;
  isProduction: boolean;
}

/**
 * Validates one rendered page's HTML text against the SEO/accessibility
 * invariants this project already relies on (title, description, canonical,
 * hreflang + x-default, Open Graph, Twitter Card, `lang`, JSON-LD placement,
 * base-path-correct asset references). Pure and file-system-free so it can
 * be exercised directly in tests. Returns an empty array when everything
 * checks out.
 */
export function checkHtmlDocument(
  html: string,
  ctx: HtmlCheckContext,
): string[] {
  const issues: string[] = [];

  const htmlTag = html.match(/<html\b[^>]*>/i)?.[0] ?? "";
  const lang = getAttr(htmlTag, "lang");
  if (lang !== ctx.expectedLang) {
    issues.push(`<html lang> is "${lang}", expected "${ctx.expectedLang}".`);
  }

  const title = html.match(/<title>([^<]*)<\/title>/i)?.[1];
  if (!title || title.trim().length === 0) {
    issues.push("missing or empty <title>.");
  }

  const metaTags = extractTags(html, /<meta\b[^>]*>/gi);
  const description = getMetaContent(metaTags, "name", "description");
  if (!description || description.trim().length === 0) {
    issues.push("missing or empty meta description.");
  }

  const linkTags = extractTags(html, /<link\b[^>]*>/gi);
  const canonicalTag = linkTags.find((tag) =>
    /rel\s*=\s*"canonical"/i.test(tag),
  );
  const canonicalHref = canonicalTag
    ? getAttr(canonicalTag, "href")
    : undefined;
  if (canonicalHref !== ctx.expectedCanonical) {
    issues.push(
      `canonical href is "${canonicalHref}", expected "${ctx.expectedCanonical}".`,
    );
  }

  const alternateTags = linkTags.filter((tag) =>
    /rel\s*=\s*"alternate"/i.test(tag),
  );
  const alternates = alternateTags.map((tag) => ({
    hrefLang: getAttr(tag, "hreflang"),
    href: getAttr(tag, "href"),
  }));

  if (alternates.length !== ctx.expectedAlternates.length) {
    issues.push(
      `found ${alternates.length} hreflang alternate(s), expected ${ctx.expectedAlternates.length}.`,
    );
  }

  for (const expected of ctx.expectedAlternates) {
    const match = alternates.find(
      (candidate) =>
        candidate.hrefLang === expected.hrefLang &&
        candidate.href === expected.href,
    );
    if (!match) {
      issues.push(
        `missing hreflang alternate hrefLang="${expected.hrefLang}" href="${expected.href}".`,
      );
    }
  }

  const ogChecks: Array<["property", string]> = [
    ["property", "og:type"],
    ["property", "og:site_name"],
    ["property", "og:title"],
    ["property", "og:description"],
    ["property", "og:url"],
    ["property", "og:image"],
  ];
  for (const [attr, value] of ogChecks) {
    const content = getMetaContent(metaTags, attr, value);
    if (!content || content.trim().length === 0) {
      issues.push(`missing or empty ${value} meta tag.`);
    }
  }
  const ogUrl = getMetaContent(metaTags, "property", "og:url");
  if (ogUrl !== ctx.expectedCanonical) {
    issues.push(`og:url is "${ogUrl}", expected "${ctx.expectedCanonical}".`);
  }

  const twitterChecks = [
    "twitter:card",
    "twitter:title",
    "twitter:description",
    "twitter:image",
  ];
  for (const value of twitterChecks) {
    const content = getMetaContent(metaTags, "name", value);
    if (!content || content.trim().length === 0) {
      issues.push(`missing or empty ${value} meta tag.`);
    }
  }

  const hasSoftwareApplicationJsonLd =
    /<script[^>]*type="application\/ld\+json"[^>]*>[\s\S]*?SoftwareApplication[\s\S]*?<\/script>/i.test(
      html,
    );
  if (ctx.isHome && !hasSoftwareApplicationJsonLd) {
    issues.push("home page is missing the SoftwareApplication JSON-LD script.");
  }
  if (!ctx.isHome && hasSoftwareApplicationJsonLd) {
    issues.push(
      "non-home page unexpectedly renders SoftwareApplication JSON-LD.",
    );
  }

  const faviconTag = linkTags.find((tag) => /rel\s*=\s*"icon"/i.test(tag));
  const appleTouchTag = linkTags.find((tag) =>
    /rel\s*=\s*"apple-touch-icon"/i.test(tag),
  );
  const stylesheetTag = linkTags.find((tag) =>
    /rel\s*=\s*"stylesheet"/i.test(tag),
  );

  for (const [label, tag] of [
    ["favicon", faviconTag],
    ["apple-touch-icon", appleTouchTag],
    ["stylesheet", stylesheetTag],
  ] as const) {
    const href = tag ? getAttr(tag, "href") : undefined;
    if (!href) {
      issues.push(`missing <link> for ${label}.`);
    } else if (ctx.basePath !== "/" && !href.startsWith(ctx.basePath)) {
      issues.push(
        `${label} href "${href}" does not start with base path "${ctx.basePath}".`,
      );
    }
  }

  if (ctx.basePath !== "/" && html.includes('"/assets/')) {
    issues.push(
      `found an asset reference rooted at "/assets/" instead of "${ctx.basePath}assets/" — base path was dropped somewhere.`,
    );
  }

  if (hasDuplicatedBasePath(html, ctx.basePath)) {
    issues.push(
      `base path "${ctx.basePath}" appears duplicated in the document.`,
    );
  }

  if (ctx.isProduction && containsLocalhost(html)) {
    issues.push("document contains a localhost URL in a production build.");
  }

  return issues;
}

async function pathExists(target: string): Promise<boolean> {
  try {
    await stat(target);
    return true;
  } catch {
    return false;
  }
}

async function findForbiddenArtifacts(rootDir: string): Promise<string[]> {
  const found: string[] = [];

  async function walk(dir: string) {
    for (const entry of await readdir(dir, { withFileTypes: true })) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        await walk(fullPath);
      } else if (
        FORBIDDEN_ARTIFACT_PATTERNS.some((pattern) => pattern.test(entry.name))
      ) {
        found.push(path.relative(rootDir, fullPath));
      }
    }
  }

  await walk(rootDir);
  return found;
}

interface SecretMatch {
  file: string;
  pattern: string;
}

async function scanForSecretPatterns(rootDir: string): Promise<SecretMatch[]> {
  const matches: SecretMatch[] = [];

  async function walk(dir: string) {
    for (const entry of await readdir(dir, { withFileTypes: true })) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        await walk(fullPath);
        continue;
      }
      if (!TEXT_EXTENSIONS.has(path.extname(entry.name).toLowerCase())) {
        continue;
      }
      const content = await readFile(fullPath, "utf8");
      for (const pattern of SECRET_PATTERNS) {
        if (pattern.test(content)) {
          matches.push({
            file: path.relative(rootDir, fullPath),
            pattern: pattern.source,
          });
        }
      }
    }
  }

  await walk(rootDir);
  return matches;
}

interface RunValidationOptions {
  clientDir: string;
  siteUrl: string;
  basePath: string;
}

export interface RunValidationResult {
  errors: string[];
}

/**
 * Runs every Phase 06 static-output check against an already-built
 * `build/client` directory and returns the list of problems found (empty =
 * pass). Never throws for an expected validation failure — only for a
 * genuinely unexpected I/O error — so callers can print every problem at
 * once instead of stopping at the first one.
 */
export async function runValidation({
  clientDir,
  siteUrl,
  basePath,
}: RunValidationOptions): Promise<RunValidationResult> {
  const errors: string[] = [];
  const normalizedSiteUrl = normalizeSiteUrl(siteUrl);
  const isProduction = !normalizedSiteUrl.includes("localhost");

  if (!(await pathExists(clientDir))) {
    return {
      errors: [
        `${clientDir} does not exist. Run \`pnpm build\` before \`pnpm validate:static\`.`,
      ],
    };
  }

  for (const expected of getExpectedPublicFiles()) {
    const filePath = path.join(clientDir, expected.relativeFilePath);
    if (!(await pathExists(filePath))) {
      errors.push(
        `missing expected output file for ${expected.publicPath}: ${filePath}`,
      );
      continue;
    }

    const html = await readFile(filePath, "utf8");
    const expectedCanonical = buildAbsoluteUrl(
      normalizedSiteUrl,
      expected.publicPath,
    );
    const expectedAlternates: HtmlAlternate[] = [
      ...LOCALES.map((locale) => ({
        hrefLang: localeConfig[locale].htmlLang,
        href: buildAbsoluteUrl(
          normalizedSiteUrl,
          getPagePath(locale, expected.page),
        ),
      })),
      {
        hrefLang: "x-default",
        href: buildAbsoluteUrl(
          normalizedSiteUrl,
          getPagePath("pt-BR", expected.page),
        ),
      },
    ];

    const issues = checkHtmlDocument(html, {
      expectedLang: localeConfig[expected.locale].htmlLang,
      expectedCanonical,
      expectedAlternates,
      isHome: expected.page === "home",
      basePath,
      isProduction,
    });

    for (const issue of issues) {
      errors.push(
        `${expected.publicPath} (${expected.relativeFilePath}): ${issue}`,
      );
    }
  }

  const notFoundHtml404 = path.join(clientDir, "404.html");
  if (!(await pathExists(notFoundHtml404))) {
    errors.push(`missing GitHub Pages 404.html at ${notFoundHtml404}.`);
  }

  const sitemapPath = path.join(clientDir, "sitemap.xml");
  if (!(await pathExists(sitemapPath))) {
    errors.push(`missing ${sitemapPath}.`);
  } else {
    const actualSitemap = await readFile(sitemapPath, "utf8");
    const expectedSitemap = buildSitemapXml(normalizedSiteUrl);
    if (actualSitemap !== expectedSitemap) {
      errors.push(
        "sitemap.xml does not match the expected nine-URL sitemap for the configured SITE_URL " +
          "(check for a stale build, a missing locale/page, or an unexpected extra entry).",
      );
    }
  }

  const robotsPath = path.join(clientDir, "robots.txt");
  if (!(await pathExists(robotsPath))) {
    errors.push(`missing ${robotsPath}.`);
  } else {
    const actualRobots = await readFile(robotsPath, "utf8");
    const expectedRobots = buildRobotsTxt(normalizedSiteUrl);
    if (actualRobots !== expectedRobots) {
      errors.push(
        "robots.txt does not match the expected content for the configured SITE_URL.",
      );
    }
  }

  for (const requiredAsset of [
    "seo/og-image.png",
    "favicon.png",
    "apple-touch-icon.png",
  ]) {
    if (!(await pathExists(path.join(clientDir, requiredAsset)))) {
      errors.push(`missing required public asset: ${requiredAsset}.`);
    }
  }

  const forbiddenArtifacts = await findForbiddenArtifacts(clientDir);
  for (const artifact of forbiddenArtifacts) {
    errors.push(
      `forbidden artifact found in static output: ${artifact} (APKs/checksums must only exist on the jvitorn/puriki GitHub Release, never in this site's artifact).`,
    );
  }

  const secretMatches = await scanForSecretPatterns(clientDir);
  for (const match of secretMatches) {
    errors.push(
      `possible secret-like pattern "${match.pattern}" found in ${match.file} — this must never ship in the static bundle.`,
    );
  }

  if (
    isProduction &&
    containsLocalhost(await readFile(sitemapPath, "utf8").catch(() => ""))
  ) {
    errors.push("sitemap.xml contains a localhost URL in a production build.");
  }
  if (
    isProduction &&
    containsLocalhost(await readFile(robotsPath, "utf8").catch(() => ""))
  ) {
    errors.push("robots.txt contains a localhost URL in a production build.");
  }

  return { errors };
}

async function main() {
  const siteUrl =
    process.env.SITE_URL || process.env.VITE_SITE_URL || DEFAULT_SITE_URL;
  const basePath = normalizeBasePath(
    process.env.BASE_PATH || process.env.VITE_BASE_PATH || DEFAULT_BASE_PATH,
  );

  const { errors } = await runValidation({
    clientDir: CLIENT_DIR,
    siteUrl,
    basePath,
  });

  if (errors.length > 0) {
    console.error(`validate:static failed with ${errors.length} problem(s):\n`);
    for (const error of errors) {
      console.error(`  - ${error}`);
    }
    process.exitCode = 1;
    return;
  }

  console.log(
    `validate:static — build/client OK (${getExpectedPublicFiles().length} public routes, sitemap, robots, 404, brand assets, no forbidden artifacts).`,
  );
}

const isMainModule = process.argv[1] === fileURLToPath(import.meta.url);

if (isMainModule) {
  main().catch((error: unknown) => {
    console.error(
      "validate:static failed:",
      error instanceof Error ? error.message : error,
    );
    process.exitCode = 1;
  });
}
