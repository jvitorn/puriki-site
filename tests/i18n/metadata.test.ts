import { describe, expect, it } from "vitest";
import { buildPageMeta, getPageMetadataModel } from "../../app/lib/i18n/metadata";
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
