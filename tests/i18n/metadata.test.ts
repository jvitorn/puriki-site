import { describe, expect, it } from "vitest";
import {
  buildPageLinks,
  buildPageMeta,
  getPageMetadataModel,
} from "../../app/lib/i18n/metadata";
import { absoluteSiteUrl } from "../../app/lib/config";
import { localeConfig, LOCALES } from "../../app/lib/i18n/locales";
import { getPagePath, PAGES } from "../../app/lib/i18n/pages";

describe("page metadata", () => {
  it("returns a title and description for every locale/page combination", () => {
    for (const locale of LOCALES) {
      for (const page of PAGES) {
        const meta = buildPageMeta(locale, page);

        const titleEntry = meta.find(
          (entry): entry is { title: string } => "title" in entry,
        );
        const descriptionEntry = meta.find(
          (entry) => "name" in entry && entry.name === "description",
        );

        expect(titleEntry?.title.length).toBeGreaterThan(0);
        expect(descriptionEntry).toBeDefined();
      }
    }
  });

  it("produces a different title per locale for the same page", () => {
    for (const page of PAGES) {
      const titles = LOCALES.map((locale) => {
        const meta = buildPageMeta(locale, page);
        const titleEntry = meta.find(
          (entry): entry is { title: string } => "title" in entry,
        );
        return titleEntry?.title;
      });

      expect(new Set(titles).size).toBe(LOCALES.length);
    }
  });
});

describe("page metadata model", () => {
  it("prepares canonical path and Open Graph locale for every page, data-only this phase", () => {
    for (const locale of LOCALES) {
      for (const page of PAGES) {
        const model = getPageMetadataModel(locale, page);

        expect(model.canonicalPath).toBe(getPagePath(locale, page));
        expect(model.ogLocale).toBe(localeConfig[locale].ogLocale);
        expect(model.ogTitle).toBe(model.title);
        expect(model.ogDescription).toBe(model.description);
      }
    }
  });
});

interface LinkEntry {
  rel: string;
  href: string;
  hrefLang?: string;
}

describe("buildPageLinks — canonical and hreflang", () => {
  it("emits a canonical link built from the page's own path, for every locale/page", () => {
    for (const locale of LOCALES) {
      for (const page of PAGES) {
        const links = buildPageLinks(locale, page) as LinkEntry[];
        const canonical = links.find((link) => link.rel === "canonical");

        expect(canonical?.href).toBe(
          absoluteSiteUrl(getPagePath(locale, page)),
        );
      }
    }
  });

  it("emits exactly one hreflang alternate per locale plus x-default, for every page", () => {
    for (const page of PAGES) {
      const links = buildPageLinks("pt-BR", page) as LinkEntry[];
      const alternates = links.filter((link) => link.rel === "alternate");

      expect(alternates).toHaveLength(LOCALES.length + 1);

      for (const locale of LOCALES) {
        expect(
          alternates.some(
            (link) => link.hrefLang === localeConfig[locale].htmlLang,
          ),
        ).toBe(true);
      }
      expect(alternates.some((link) => link.hrefLang === "x-default")).toBe(
        true,
      );
    }
  });

  it("points x-default at the pt-BR equivalent page", () => {
    for (const page of PAGES) {
      const links = buildPageLinks("en", page) as LinkEntry[];
      const xDefault = links.find((link) => link.hrefLang === "x-default");
      const ptBrHome = links.find(
        (link) => link.hrefLang === localeConfig["pt-BR"].htmlLang,
      );

      expect(xDefault?.href).toBe(ptBrHome?.href);
    }
  });

  it("Privacy/Terms hreflang alternates point at Privacy/Terms in each locale, never Home", () => {
    for (const page of ["privacy", "terms"] as const) {
      const links = buildPageLinks("pt-BR", page) as LinkEntry[];
      const alternates = links.filter((link) => link.rel === "alternate");

      for (const link of alternates) {
        expect(link.href).toMatch(new RegExp(`/${page}/$`));
      }
    }
  });
});
