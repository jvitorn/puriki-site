import { describe, expect, it } from "vitest";
import {
  buildRobotsTxt,
  buildSitemapXml,
  getPublicUrls,
} from "../../scripts/generate-seo-files";

const SITE_URL = "https://jvitorn.github.io/puriki-site/";

describe("getPublicUrls", () => {
  it("returns exactly the nine public page URLs", () => {
    const urls = getPublicUrls(SITE_URL);

    expect(urls).toHaveLength(9);
    expect(new Set(urls).size).toBe(9);
    expect(urls).toEqual(
      expect.arrayContaining([
        "https://jvitorn.github.io/puriki-site/",
        "https://jvitorn.github.io/puriki-site/privacy/",
        "https://jvitorn.github.io/puriki-site/terms/",
        "https://jvitorn.github.io/puriki-site/en/",
        "https://jvitorn.github.io/puriki-site/en/privacy/",
        "https://jvitorn.github.io/puriki-site/en/terms/",
        "https://jvitorn.github.io/puriki-site/es/",
        "https://jvitorn.github.io/puriki-site/es/privacy/",
        "https://jvitorn.github.io/puriki-site/es/terms/",
      ]),
    );
  });

  it("never includes /foundation/ or /404", () => {
    const urls = getPublicUrls(SITE_URL);

    for (const url of urls) {
      expect(url).not.toMatch(/foundation/);
      expect(url).not.toMatch(/404/);
    }
  });
});

describe("buildSitemapXml", () => {
  it("contains exactly nine <url> entries with absolute <loc> values", () => {
    const xml = buildSitemapXml(SITE_URL);
    const locMatches = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);

    expect(locMatches).toHaveLength(9);
    for (const loc of locMatches) {
      expect(loc.startsWith(SITE_URL)).toBe(true);
    }
  });
});

describe("buildRobotsTxt", () => {
  it("allows indexing and references the sitemap absolute URL", () => {
    const robots = buildRobotsTxt(SITE_URL);

    expect(robots).toContain("Allow: /");
    expect(robots).not.toMatch(/^Disallow:/m);
    expect(robots).toContain(
      "Sitemap: https://jvitorn.github.io/puriki-site/sitemap.xml",
    );
  });
});
