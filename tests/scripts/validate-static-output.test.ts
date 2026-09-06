import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { localeConfig, LOCALES, type Locale } from "../../app/lib/i18n/locales";
import { getPagePath, PAGES, type PageKey } from "../../app/lib/i18n/pages";
import { buildAbsoluteUrl } from "../../app/lib/seo/site-url";
import {
  buildRobotsTxt,
  buildSitemapXml,
} from "../../scripts/generate-seo-files";
import {
  checkHtmlDocument,
  containsLocalhost,
  getExpectedPublicFiles,
  hasDuplicatedBasePath,
  runValidation,
} from "../../scripts/validate-static-output";

describe("getExpectedPublicFiles", () => {
  it("derives exactly the nine public routes from the same locale/page source of truth as routing", () => {
    const files = getExpectedPublicFiles();

    expect(files).toHaveLength(9);
    expect(new Set(files.map((f) => f.publicPath)).size).toBe(9);
  });

  it("maps the pt-BR home route to the root index.html", () => {
    const files = getExpectedPublicFiles();
    const home = files.find((f) => f.locale === "pt-BR" && f.page === "home");

    expect(home?.publicPath).toBe("/");
    expect(home?.relativeFilePath).toBe("index.html");
  });

  it("maps a nested locale/page route to its flattened index.html path", () => {
    const files = getExpectedPublicFiles();
    const esPrivacy = files.find(
      (f) => f.locale === "es" && f.page === "privacy",
    );

    expect(esPrivacy?.publicPath).toBe("/es/privacy/");
    expect(esPrivacy?.relativeFilePath).toBe(
      path.join("es", "privacy", "index.html"),
    );
  });
});

describe("containsLocalhost", () => {
  it("detects an http localhost URL", () => {
    expect(containsLocalhost('<a href="http://localhost:5173/">x</a>')).toBe(
      true,
    );
  });

  it("detects an https localhost URL", () => {
    expect(containsLocalhost("https://localhost/")).toBe(true);
  });

  it("returns false for production URLs", () => {
    expect(containsLocalhost("https://jvitorn.github.io/puriki-site/")).toBe(
      false,
    );
  });
});

describe("hasDuplicatedBasePath", () => {
  it("detects a doubled base path segment", () => {
    expect(
      hasDuplicatedBasePath(
        'href="https://jvitorn.github.io/puriki-site/puriki-site/assets/x.js"',
        "/puriki-site/",
      ),
    ).toBe(true);
  });

  it("returns false when the base path appears only once", () => {
    expect(
      hasDuplicatedBasePath(
        'href="https://jvitorn.github.io/puriki-site/assets/x.js"',
        "/puriki-site/",
      ),
    ).toBe(false);
  });

  it("is always false for the root base path", () => {
    expect(hasDuplicatedBasePath("anything//anything", "/")).toBe(false);
  });
});

const SITE_URL = "https://jvitorn.github.io/puriki-site/";
const BASE_PATH = "/puriki-site/";

function buildValidFixtureHtml(
  locale: Locale,
  page: PageKey,
  isHome: boolean,
): string {
  const canonical = buildAbsoluteUrl(SITE_URL, getPagePath(locale, page));
  const alternates = [
    ...LOCALES.map(
      (candidate) =>
        `<link rel="alternate" hreflang="${localeConfig[candidate].htmlLang}" href="${buildAbsoluteUrl(SITE_URL, getPagePath(candidate, page))}"/>`,
    ),
    `<link rel="alternate" hreflang="x-default" href="${buildAbsoluteUrl(SITE_URL, getPagePath("pt-BR", page))}"/>`,
  ].join("");

  return `<!DOCTYPE html><html lang="${localeConfig[locale].htmlLang}"><head>
<title>Puriki</title>
<meta name="description" content="A description"/>
<meta property="og:type" content="website"/>
<meta property="og:site_name" content="Puriki"/>
<meta property="og:title" content="Puriki"/>
<meta property="og:description" content="A description"/>
<meta property="og:url" content="${canonical}"/>
<meta property="og:image" content="${buildAbsoluteUrl(SITE_URL, "seo/og-image.png")}"/>
<meta name="twitter:card" content="summary_large_image"/>
<meta name="twitter:title" content="Puriki"/>
<meta name="twitter:description" content="A description"/>
<meta name="twitter:image" content="${buildAbsoluteUrl(SITE_URL, "seo/og-image.png")}"/>
<link rel="icon" type="image/png" href="${BASE_PATH}favicon.png"/>
<link rel="apple-touch-icon" href="${BASE_PATH}apple-touch-icon.png"/>
<link rel="canonical" href="${canonical}"/>
${alternates}
${isHome ? '<script type="application/ld+json">{"@type":"SoftwareApplication"}</script>' : ""}
<link rel="stylesheet" href="${BASE_PATH}assets/app.css"/>
</head><body>ok</body></html>`;
}

describe("checkHtmlDocument", () => {
  const context = {
    expectedLang: "en",
    expectedCanonical: buildAbsoluteUrl(SITE_URL, "/en/"),
    expectedAlternates: [
      ...LOCALES.map((candidate) => ({
        hrefLang: localeConfig[candidate].htmlLang,
        href: buildAbsoluteUrl(SITE_URL, getPagePath(candidate, "home")),
      })),
      {
        hrefLang: "x-default",
        href: buildAbsoluteUrl(SITE_URL, getPagePath("pt-BR", "home")),
      },
    ],
    isHome: true,
    basePath: BASE_PATH,
    isProduction: true,
  };

  it("finds no issues in a well-formed home document", () => {
    const html = buildValidFixtureHtml("en", "home", true);
    expect(checkHtmlDocument(html, context)).toEqual([]);
  });

  it("flags a wrong <html lang>", () => {
    const html = buildValidFixtureHtml("en", "home", true).replace(
      'lang="en"',
      'lang="pt-BR"',
    );
    const issues = checkHtmlDocument(html, context);
    expect(issues.some((issue) => issue.includes("<html lang>"))).toBe(true);
  });

  it("flags a missing canonical link", () => {
    const html = buildValidFixtureHtml("en", "home", true).replace(
      /<link rel="canonical"[^>]*>/,
      "",
    );
    const issues = checkHtmlDocument(html, context);
    expect(issues.some((issue) => issue.includes("canonical"))).toBe(true);
  });

  it("flags a missing hreflang alternate", () => {
    const html = buildValidFixtureHtml("en", "home", true).replace(
      /<link rel="alternate" hreflang="es"[^>]*>/,
      "",
    );
    const issues = checkHtmlDocument(html, context);
    expect(issues.some((issue) => issue.includes('hrefLang="es"'))).toBe(true);
  });

  it("flags a home page missing SoftwareApplication JSON-LD", () => {
    const html = buildValidFixtureHtml("en", "home", false);
    const issues = checkHtmlDocument(html, context);
    expect(issues.some((issue) => issue.includes("SoftwareApplication"))).toBe(
      true,
    );
  });

  it("flags a non-home page that unexpectedly renders SoftwareApplication JSON-LD", () => {
    const html = buildValidFixtureHtml("en", "privacy", true);
    const issues = checkHtmlDocument(html, { ...context, isHome: false });
    expect(
      issues.some((issue) =>
        issue.includes("unexpectedly renders SoftwareApplication"),
      ),
    ).toBe(true);
  });

  it("flags an asset reference rooted at /assets/ instead of the base path", () => {
    const html = buildValidFixtureHtml("en", "home", true).replace(
      `${BASE_PATH}assets/app.css`,
      "/assets/app.css",
    );
    const issues = checkHtmlDocument(html, context);
    expect(issues.some((issue) => issue.includes('rooted at "/assets/"'))).toBe(
      true,
    );
  });

  it("flags a localhost URL in a production document", () => {
    const html = buildValidFixtureHtml("en", "home", true).replaceAll(
      SITE_URL,
      "http://localhost:5173/",
    );
    const issues = checkHtmlDocument(html, context);
    expect(issues.some((issue) => issue.includes("localhost"))).toBe(true);
  });

  it("does not flag localhost when the build itself targets localhost", () => {
    const html = buildValidFixtureHtml("en", "home", true).replaceAll(
      SITE_URL,
      "http://localhost:5173/",
    );
    const localContext = {
      ...context,
      expectedCanonical: buildAbsoluteUrl("http://localhost:5173/", "/en/"),
      expectedAlternates: context.expectedAlternates.map((alt) => ({
        ...alt,
        href: alt.href.replaceAll(SITE_URL, "http://localhost:5173/"),
      })),
      isProduction: false,
    };
    const issues = checkHtmlDocument(html, localContext);
    expect(issues).toEqual([]);
  });
});

describe("runValidation — full fixture build", () => {
  let tmpDir: string;

  afterEach(async () => {
    if (tmpDir) {
      await rm(tmpDir, { recursive: true, force: true });
    }
  });

  async function buildFixture(): Promise<string> {
    const dir = await mkdtemp(path.join(os.tmpdir(), "puriki-static-fixture-"));

    for (const locale of LOCALES) {
      for (const page of PAGES) {
        const publicPath = getPagePath(locale, page);
        const trimmed = publicPath.replace(/^\/+|\/+$/g, "");
        const relativeFilePath =
          trimmed.length > 0 ? path.join(trimmed, "index.html") : "index.html";
        const filePath = path.join(dir, relativeFilePath);
        await mkdir(path.dirname(filePath), { recursive: true });
        await writeFile(
          filePath,
          buildValidFixtureHtml(locale, page, page === "home"),
          "utf8",
        );
      }
    }

    await writeFile(
      path.join(dir, "404.html"),
      "<html><body>404</body></html>",
      "utf8",
    );
    await writeFile(
      path.join(dir, "sitemap.xml"),
      buildSitemapXml(SITE_URL),
      "utf8",
    );
    await writeFile(
      path.join(dir, "robots.txt"),
      buildRobotsTxt(SITE_URL),
      "utf8",
    );
    await mkdir(path.join(dir, "seo"), { recursive: true });
    await writeFile(path.join(dir, "seo", "og-image.png"), "fake-png", "utf8");
    await writeFile(path.join(dir, "favicon.png"), "fake-png", "utf8");
    await writeFile(path.join(dir, "apple-touch-icon.png"), "fake-png", "utf8");

    return dir;
  }

  it("reports zero errors for a fully valid fixture", async () => {
    tmpDir = await buildFixture();

    const result = await runValidation({
      clientDir: tmpDir,
      siteUrl: SITE_URL,
      basePath: BASE_PATH,
    });

    expect(result.errors).toEqual([]);
  });

  it("reports a clear error when a required route file is missing", async () => {
    tmpDir = await buildFixture();
    await rm(path.join(tmpDir, "en", "terms", "index.html"));

    const result = await runValidation({
      clientDir: tmpDir,
      siteUrl: SITE_URL,
      basePath: BASE_PATH,
    });

    expect(
      result.errors.some((error) =>
        error.includes("missing expected output file for /en/terms/"),
      ),
    ).toBe(true);
  });

  it("reports an error when an .apk file is present in the output", async () => {
    tmpDir = await buildFixture();
    await writeFile(
      path.join(tmpDir, "puriki-v1.0.0-arm64-v8a.apk"),
      "fake-apk",
      "utf8",
    );

    const result = await runValidation({
      clientDir: tmpDir,
      siteUrl: SITE_URL,
      basePath: BASE_PATH,
    });

    expect(
      result.errors.some((error) => error.includes("forbidden artifact")),
    ).toBe(true);
  });

  it("reports an error when 404.html is missing", async () => {
    tmpDir = await buildFixture();
    await rm(path.join(tmpDir, "404.html"));

    const result = await runValidation({
      clientDir: tmpDir,
      siteUrl: SITE_URL,
      basePath: BASE_PATH,
    });

    expect(result.errors.some((error) => error.includes("404.html"))).toBe(
      true,
    );
  });

  it("reports an error for a client directory that doesn't exist at all", async () => {
    const result = await runValidation({
      clientDir: path.join(os.tmpdir(), "does-not-exist-puriki-fixture"),
      siteUrl: SITE_URL,
      basePath: BASE_PATH,
    });

    expect(result.errors).toHaveLength(1);
    expect(result.errors[0]).toContain("Run `pnpm build`");
  });
});
