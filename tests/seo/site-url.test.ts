import { describe, expect, it } from "vitest";
import { buildAbsoluteUrl, normalizeSiteUrl } from "../../app/lib/seo/site-url";

describe("normalizeSiteUrl", () => {
  it("adds a trailing slash when missing", () => {
    expect(normalizeSiteUrl("https://jvitorn.github.io/puriki-site")).toBe(
      "https://jvitorn.github.io/puriki-site/",
    );
  });

  it("leaves an already-trailing-slash URL unchanged", () => {
    expect(normalizeSiteUrl("https://jvitorn.github.io/puriki-site/")).toBe(
      "https://jvitorn.github.io/puriki-site/",
    );
  });
});

describe("buildAbsoluteUrl — GitHub Pages project site", () => {
  const siteUrl = "https://jvitorn.github.io/puriki-site/";

  it("does not duplicate the /puriki-site/ segment for pt-BR home", () => {
    expect(buildAbsoluteUrl(siteUrl, "/")).toBe(
      "https://jvitorn.github.io/puriki-site/",
    );
  });

  it("builds the EN home URL correctly", () => {
    expect(buildAbsoluteUrl(siteUrl, "/en/")).toBe(
      "https://jvitorn.github.io/puriki-site/en/",
    );
  });

  it("builds the ES privacy URL correctly", () => {
    expect(buildAbsoluteUrl(siteUrl, "/es/privacy/")).toBe(
      "https://jvitorn.github.io/puriki-site/es/privacy/",
    );
  });

  it("a leading slash on the relative path never strips the /puriki-site/ base", () => {
    // This is the exact failure mode the phase spec warns about: naively
    // doing `new URL(relativePath, siteUrl)` with an absolute-looking
    // relativePath silently drops the /puriki-site/ segment. This helper
    // must not do that.
    const result = buildAbsoluteUrl(siteUrl, "/en/privacy/");
    expect(result.startsWith("https://jvitorn.github.io/puriki-site/")).toBe(true);
    expect(result).not.toBe("https://jvitorn.github.io/en/privacy/");
  });
});

describe("buildAbsoluteUrl — future custom domain", () => {
  it("produces clean URLs with an empty base path", () => {
    const siteUrl = "https://puriki.app/";
    expect(buildAbsoluteUrl(siteUrl, "/")).toBe("https://puriki.app/");
    expect(buildAbsoluteUrl(siteUrl, "/en/")).toBe("https://puriki.app/en/");
  });
});
