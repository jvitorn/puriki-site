import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { LanguageSwitcher } from "../../app/components/layout/language-switcher";
import { pageHref } from "../../app/lib/i18n/links";

describe("LanguageSwitcher", () => {
  it("has an accessible name and marks the current locale", () => {
    render(
      <LanguageSwitcher label="Idioma" locale="pt-BR" page="privacy" />,
    );

    const nav = screen.getByRole("navigation", { name: "Idioma" });
    const currentLink = within(nav).getByRole("link", { name: "Português" });
    expect(currentLink).toHaveAttribute("aria-current", "page");
  });

  it("switching from privacy PT-BR to English preserves the Privacy page", () => {
    render(<LanguageSwitcher label="Idioma" locale="pt-BR" page="privacy" />);

    const englishLink = screen.getByRole("link", { name: "English" });
    expect(englishLink).toHaveAttribute("href", pageHref("en", "privacy"));
  });

  it("switching from terms EN to Spanish preserves the Terms page", () => {
    render(<LanguageSwitcher label="Language" locale="en" page="terms" />);

    const spanishLink = screen.getByRole("link", { name: "Español" });
    expect(spanishLink).toHaveAttribute("href", pageHref("es", "terms"));
  });

  it("switching from home ES to Portuguese preserves the Home page", () => {
    render(<LanguageSwitcher label="Idioma" locale="es" page="home" />);

    const ptLink = screen.getByRole("link", { name: "Português" });
    expect(ptLink).toHaveAttribute("href", pageHref("pt-BR", "home"));
  });
});
