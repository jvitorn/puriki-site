import { describe, expect, it } from "vitest";
import { content } from "../../app/content";
import { LOCALES } from "../../app/lib/i18n/locales";
import { PAGES } from "../../app/lib/i18n/pages";

function collectShapeKeys(value: unknown, prefix = ""): string[] {
  if (Array.isArray(value)) {
    return [`${prefix}[]`, ...collectShapeKeys(value[0], `${prefix}[]`)];
  }

  if (value !== null && typeof value === "object") {
    return Object.keys(value as Record<string, unknown>)
      .sort()
      .flatMap((key) =>
        collectShapeKeys(
          (value as Record<string, unknown>)[key],
          prefix ? `${prefix}.${key}` : key,
        ),
      );
  }

  return [prefix];
}

function assertNoEmptyStrings(value: unknown, locale: string, path = "content") {
  if (Array.isArray(value)) {
    value.forEach((entry, index) => assertNoEmptyStrings(entry, locale, `${path}[${index}]`));
    return;
  }

  if (value !== null && typeof value === "object") {
    for (const [key, entry] of Object.entries(value as Record<string, unknown>)) {
      assertNoEmptyStrings(entry, locale, `${path}.${key}`);
    }
    return;
  }

  if (typeof value === "string") {
    expect(value.trim().length, `${locale} -> ${path} is empty`).toBeGreaterThan(0);
  }
}

describe("locale content", () => {
  it("provides all three required locales", () => {
    expect(Object.keys(content).sort()).toEqual([...LOCALES].sort());
  });

  it("every locale exposes the same content shape", () => {
    const [firstLocale, ...restLocales] = LOCALES;
    const referenceShape = collectShapeKeys(content[firstLocale]);

    for (const locale of restLocales) {
      expect(collectShapeKeys(content[locale])).toEqual(referenceShape);
    }
  });

  it("no locale has an empty required string field", () => {
    for (const locale of LOCALES) {
      assertNoEmptyStrings(content[locale], locale);
    }
  });

  it("defines seo title and description for every page", () => {
    for (const locale of LOCALES) {
      for (const page of PAGES) {
        const seo = content[locale].seo[page];
        expect(seo.title.length).toBeGreaterThan(0);
        expect(seo.description.length).toBeGreaterThan(0);
      }
    }
  });

  it("has exactly four benefit pillars, three showcases, three roadmap items and eight FAQ items per locale", () => {
    for (const locale of LOCALES) {
      expect(content[locale].benefits.items).toHaveLength(4);
      expect(content[locale].showcases.items).toHaveLength(3);
      expect(content[locale].roadmap.items).toHaveLength(3);
      expect(content[locale].faq.items).toHaveLength(8);
    }
  });

  it("does not translate the Puriki, AniList or MyAnimeList product names", () => {
    for (const locale of LOCALES) {
      expect(content[locale].common.brandName).toBe("Puriki");
      expect(content[locale].providers.anilistLabel).toBe("AniList");
      expect(content[locale].providers.malLabel).toBe("MyAnimeList");
    }
  });

  it("titles differ across locales for the same page", () => {
    for (const page of PAGES) {
      const titles = LOCALES.map((locale) => content[locale].seo[page].title);
      expect(new Set(titles).size).toBe(LOCALES.length);
    }
  });

  // DECISIONS.md: never claim data never leaves the device, never claim
  // "100% private"/"totally secure", never claim nothing is collected.
  // Checked against the actual body text so a future edit can't
  // reintroduce an absolute claim unnoticed.
  const FORBIDDEN_ABSOLUTE_CLAIM_PATTERNS: RegExp[] = [
    /nunca sai(m)? do (seu )?dispositivo/i,
    /never leaves? (your |the )?device/i,
    /nunca (sale|salen) del dispositivo/i,
    /100%\s*(privad|priv|secur)/i,
    /totally secure/i,
    /totalmente segur/i,
    /não coletamos? (nenhum )?dado/i,
    /we (don't|do not) collect any data/i,
    /no recopilamos ningún dato/i,
  ];

  it("privacyPage never makes an absolute privacy/security claim", () => {
    for (const locale of LOCALES) {
      const text = [
        content[locale].privacyPage.intro,
        ...content[locale].privacyPage.sections.map((section) => section.body),
      ].join("\n");

      for (const pattern of FORBIDDEN_ABSOLUTE_CLAIM_PATTERNS) {
        expect(text, `${locale} privacyPage matched forbidden pattern ${pattern}`).not.toMatch(
          pattern,
        );
      }
    }
  });

  it("privacyPage and termsPage carry a fixed ISO lastUpdated date and label", () => {
    for (const locale of LOCALES) {
      expect(content[locale].privacyPage.lastUpdated).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(content[locale].termsPage.lastUpdated).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    }
  });
});
