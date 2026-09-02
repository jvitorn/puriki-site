import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { getContent } from "../app/content";
import { HomePage } from "../app/pages/home-page";
import { PrivacySection } from "../app/sections/privacy-section";
import { pageHref } from "../app/lib/i18n/links";
import { LOCALES } from "../app/lib/i18n/locales";

describe("HomePage composition", () => {
  it("renders exactly one H1 with the approved headline", () => {
    render(<HomePage locale="pt-BR" />);

    const headings = screen.getAllByRole("heading", { level: 1 });
    expect(headings).toHaveLength(1);
    expect(headings[0]).toHaveTextContent(getContent("pt-BR").hero.headline);
  });

  it("Hero primary CTA scrolls to the Download section, not an external link", () => {
    render(<HomePage locale="pt-BR" />);
    const content = getContent("pt-BR");

    const primaryCta = screen.getByRole("link", { name: content.hero.primaryCta });
    expect(primaryCta).toHaveAttribute("href", expect.stringContaining("#download"));
  });

  it("provider relationship never links AniList directly to MyAnimeList", () => {
    const { container } = render(<HomePage locale="pt-BR" />);
    const providersSection = container.querySelector("#providers");
    expect(providersSection).not.toBeNull();

    const links = within(providersSection as HTMLElement).queryAllByRole("link");
    for (const link of links) {
      const href = link.getAttribute("href") ?? "";
      expect(href).not.toMatch(/anilist.*mal|mal.*anilist/i);
    }
  });

  it("keeps only three roadmap items (1.0, 2.0, 3.0)", () => {
    render(<HomePage locale="pt-BR" />);
    const content = getContent("pt-BR");
    expect(content.roadmap.items.map((item) => item.version)).toEqual([
      "1.0",
      "2.0",
      "3.0",
    ]);
  });

  it("renders all eight FAQ questions", () => {
    render(<HomePage locale="pt-BR" />);
    const content = getContent("pt-BR");

    for (const item of content.faq.items) {
      expect(screen.getByText(item.question)).toBeInTheDocument();
    }
  });

  it("the no-release Download state never renders a fake version, size or SHA", () => {
    render(<HomePage locale="pt-BR" />);
    const content = getContent("pt-BR");

    expect(screen.getByText(content.download.noRelease.message)).toBeInTheDocument();
    expect(screen.queryByText(/sha-?256/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/^v?\d+\.\d+\.\d+$/)).not.toBeInTheDocument();
  });
});

describe("PrivacySection", () => {
  it("CTA keeps the current locale's Privacy page", () => {
    for (const locale of LOCALES) {
      const { unmount } = render(
        <PrivacySection content={getContent(locale).privacySummary} locale={locale} />,
      );

      const cta = screen.getByRole("link", {
        name: getContent(locale).privacySummary.cta,
      });
      expect(cta).toHaveAttribute("href", pageHref(locale, "privacy"));

      unmount();
    }
  });
});

// RoadmapSection now requires `release`; its own tests (including the
// roadmap CTA link) live in tests/sections/roadmap-section.test.tsx.
