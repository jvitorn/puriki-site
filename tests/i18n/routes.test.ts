import { describe, expect, it } from "vitest";
import { LOCALES } from "../../app/lib/i18n/locales";
import { getPagePath, getRoutePattern, PAGES } from "../../app/lib/i18n/pages";

const REQUIRED_PAGE_PATHS: Record<string, Record<string, string>> = {
  "pt-BR": {
    home: "/",
    privacy: "/privacy/",
    terms: "/terms/",
  },
  en: {
    home: "/en/",
    privacy: "/en/privacy/",
    terms: "/en/terms/",
  },
  es: {
    home: "/es/",
    privacy: "/es/privacy/",
    terms: "/es/terms/",
  },
};

describe("locale + page -> URL mapping", () => {
  it("produces the exact nine required public paths", () => {
    for (const locale of LOCALES) {
      for (const page of PAGES) {
        expect(getPagePath(locale, page)).toBe(REQUIRED_PAGE_PATHS[locale][page]);
      }
    }
  });

  it("always uses trailing-slash folder style, except the pt-BR root", () => {
    for (const locale of LOCALES) {
      for (const page of PAGES) {
        const path = getPagePath(locale, page);
        expect(path.startsWith("/")).toBe(true);
        if (path !== "/") {
          expect(path.endsWith("/")).toBe(true);
        }
      }
    }
  });

  it("produces route patterns with no leading or trailing slash for router registration", () => {
    expect(getRoutePattern("pt-BR", "home")).toBe("");
    expect(getRoutePattern("pt-BR", "privacy")).toBe("privacy");
    expect(getRoutePattern("en", "home")).toBe("en");
    expect(getRoutePattern("en", "privacy")).toBe("en/privacy");
    expect(getRoutePattern("es", "terms")).toBe("es/terms");
  });

  it("produces 9 unique public paths across all locale/page combinations", () => {
    const allPaths = LOCALES.flatMap((locale) =>
      PAGES.map((page) => getPagePath(locale, page)),
    );

    expect(allPaths).toHaveLength(9);
    expect(new Set(allPaths).size).toBe(9);
  });
});

describe("prerender path list", () => {
  it("includes every required public path plus /foundation and /404", async () => {
    const { default: prerenderConfig } = (await import(
      "../../react-router.config.ts"
    )) as { default: { prerender: string[] } };

    const requiredPaths = LOCALES.flatMap((locale) =>
      PAGES.map((page) => {
        const pattern = getRoutePattern(locale, page);
        return pattern ? `/${pattern}` : "/";
      }),
    );

    for (const path of requiredPaths) {
      expect(prerenderConfig.prerender).toContain(path);
    }

    expect(prerenderConfig.prerender).toContain("/foundation");
    expect(prerenderConfig.prerender).toContain("/404");
  });
});
