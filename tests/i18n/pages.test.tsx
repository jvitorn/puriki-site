import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { getContent } from "../../app/content";
import { HomePage } from "../../app/pages/home-page";
import { PrivacyPage } from "../../app/pages/privacy-page";
import { TermsPage } from "../../app/pages/terms-page";
import { LOCALES } from "../../app/lib/i18n/locales";
import { HOME_ANCHORS } from "../../app/lib/i18n/anchors";

describe("HomePage", () => {
  it("renders one H1 with the locale headline and every required anchor section", () => {
    for (const locale of LOCALES) {
      const { unmount, container } = render(<HomePage locale={locale} />);
      const content = getContent(locale);

      expect(
        screen.getByRole("heading", { level: 1, name: content.hero.headline }),
      ).toBeInTheDocument();

      for (const anchor of HOME_ANCHORS) {
        expect(container.querySelector(`#${anchor}`)).not.toBeNull();
      }

      unmount();
    }
  });
});

describe("PrivacyPage", () => {
  it("renders the localized title and preparation notice", () => {
    for (const locale of LOCALES) {
      const { unmount } = render(<PrivacyPage locale={locale} />);
      const content = getContent(locale);

      expect(
        screen.getByRole("heading", { level: 1, name: content.privacyPage.title }),
      ).toBeInTheDocument();
      expect(
        screen.getByText(content.privacyPage.preparationNotice),
      ).toBeInTheDocument();

      unmount();
    }
  });
});

describe("TermsPage", () => {
  it("renders the localized title and preparation notice", () => {
    for (const locale of LOCALES) {
      const { unmount } = render(<TermsPage locale={locale} />);
      const content = getContent(locale);

      expect(
        screen.getByRole("heading", { level: 1, name: content.termsPage.title }),
      ).toBeInTheDocument();
      expect(
        screen.getByText(content.termsPage.preparationNotice),
      ).toBeInTheDocument();

      unmount();
    }
  });
});
