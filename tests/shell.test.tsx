import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { getContent } from "../app/content";
import { SiteFooter } from "../app/components/layout/site-footer";
import { SiteHeader } from "../app/components/layout/site-header";
import { SiteShell } from "../app/components/layout/site-shell";
import { LOCALES, localeConfig } from "../app/lib/i18n/locales";
import { pageHref } from "../app/lib/i18n/links";

describe("SiteShell", () => {
  it("renders the shared layout landmarks", () => {
    render(
      <SiteShell locale="pt-BR" page="home">
        <h1>Page content</h1>
      </SiteShell>,
    );

    expect(screen.getByRole("banner")).toBeInTheDocument();
    expect(screen.getByRole("main")).toHaveAttribute("id", "main-content");
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
  });
});

describe("SiteHeader", () => {
  it("renders the primary navigation using the given locale's content", () => {
    const content = getContent("en");
    render(<SiteHeader locale="en" page="home" />);

    for (const item of content.navigation.items) {
      expect(screen.getByRole("link", { name: item.label })).toBeInTheDocument();
    }
    expect(
      screen.getAllByRole("link", { name: content.navigation.downloadLabel }).length,
    ).toBeGreaterThan(0);
  });

  it("opens the mobile Sheet and closes it after navigation", async () => {
    const content = getContent("pt-BR");
    render(<SiteHeader locale="pt-BR" page="home" />);

    fireEvent.click(
      screen.getByRole("button", { name: content.navigation.menuButtonLabel }),
    );
    const dialog = screen.getByRole("dialog", { name: content.navigation.menuTitle });
    expect(dialog).toBeInTheDocument();

    fireEvent.click(
      within(dialog).getByRole("link", { name: content.navigation.items[0].label }),
    );

    await waitFor(() =>
      expect(
        screen.queryByRole("dialog", { name: content.navigation.menuTitle }),
      ).not.toBeInTheDocument(),
    );
  });

  it("exposes an accessible language switcher with human-readable names", () => {
    render(<SiteHeader locale="es" page="privacy" />);

    const switcherNav = screen.getByRole("navigation", {
      name: getContent("es").navigation.languageLabel,
    });

    for (const locale of LOCALES) {
      expect(
        within(switcherNav).getByRole("link", {
          name: localeConfig[locale].displayName,
        }),
      ).toBeInTheDocument();
    }
  });

  it("closes the mobile menu on Escape", async () => {
    const content = getContent("pt-BR");
    render(<SiteHeader locale="pt-BR" page="home" />);

    fireEvent.click(
      screen.getByRole("button", { name: content.navigation.menuButtonLabel }),
    );
    const dialog = screen.getByRole("dialog", { name: content.navigation.menuTitle });

    fireEvent.keyDown(dialog, { key: "Escape" });

    await waitFor(() =>
      expect(
        screen.queryByRole("dialog", { name: content.navigation.menuTitle }),
      ).not.toBeInTheDocument(),
    );
  });
});

describe("SiteFooter", () => {
  it("renders localized disclaimer, copyright and legal links", () => {
    const content = getContent("en");
    render(<SiteFooter locale="en" />);

    expect(screen.getByText(content.footer.disclaimer)).toBeInTheDocument();
    expect(screen.getByText(content.footer.copyright)).toBeInTheDocument();

    const privacyLink = screen.getByRole("link", {
      name: content.footer.legal.privacyLabel,
    });
    expect(privacyLink).toHaveAttribute("href", pageHref("en", "privacy"));

    const termsLink = screen.getByRole("link", {
      name: content.footer.legal.termsLabel,
    });
    expect(termsLink).toHaveAttribute("href", pageHref("en", "terms"));
  });

  it("switches locale content across pt-BR, en and es", () => {
    for (const locale of LOCALES) {
      const { unmount } = render(<SiteFooter locale={locale} />);
      expect(
        screen.getByText(getContent(locale).footer.copyright),
      ).toBeInTheDocument();
      unmount();
    }
  });
});
