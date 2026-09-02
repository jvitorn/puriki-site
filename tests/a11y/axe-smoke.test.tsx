import { render } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { axe, type AxeCore } from "vitest-axe";
import { SiteShell } from "../../app/components/layout/site-shell";
import { localeConfig } from "../../app/lib/i18n/locales";
import type { ReleaseMetadata } from "../../app/lib/releases/types";
import { DownloadSection } from "../../app/sections/download-section";
import { getContent } from "../../app/content";
import { HomePage } from "../../app/pages/home-page";
import { PrivacyPage } from "../../app/pages/privacy-page";
import { TermsPage } from "../../app/pages/terms-page";

// Asserting on `results.violations` directly (rather than the
// `toHaveNoViolations` custom matcher some vitest-axe examples use) avoids
// depending on that package's ambient type augmentation matching this
// project's vitest version — same rigor, no type-augmentation coupling.
function formatViolations(violations: AxeCore.Result[]): string {
  return violations
    .map((v) => `${v.id}: ${v.help} (${v.nodes.length} node(s))`)
    .join("\n");
}

// jsdom has no rendering/paint pipeline, so axe's color-contrast rule
// cannot evaluate real computed styles here — that's covered separately
// by the numeric WCAG contrast audit against the actual design tokens
// (see the Phase 05 report), not by this DOM-structure smoke check.
const AXE_OPTIONS = { rules: { "color-contrast": { enabled: false } } };

const originalLang = document.documentElement.lang;

afterEach(() => {
  document.documentElement.lang = originalLang;
});

const AVAILABLE_RELEASE: ReleaseMetadata = {
  available: true,
  version: "1.0.0",
  publishedAt: "2026-08-15T10:00:00Z",
  fileName: "puriki-1.0.0-android.apk",
  sizeBytes: 24_300_000,
  downloadUrl: "https://example.invalid/puriki-1.0.0-android.apk",
  releaseUrl: "https://example.invalid/releases/tag/v1.0.0",
  sha256: "1f3870be274f6c49b3e31a0c6728957f795ad0ffe3ffed4a1b2c9d9a2c3f5e0e",
};

describe("axe smoke — full page composition", () => {
  it("Home (pt-BR) has no detectable accessibility violations", async () => {
    document.documentElement.lang = localeConfig["pt-BR"].htmlLang;
    const { container } = render(
      <SiteShell locale="pt-BR" page="home">
        <HomePage locale="pt-BR" />
      </SiteShell>,
    );

    const results = await axe(container, AXE_OPTIONS);
    expect(results.violations, formatViolations(results.violations)).toHaveLength(0);
  });

  it("Privacy (en) has no detectable accessibility violations", async () => {
    document.documentElement.lang = localeConfig.en.htmlLang;
    const { container } = render(
      <SiteShell locale="en" page="privacy">
        <PrivacyPage locale="en" />
      </SiteShell>,
    );

    const results = await axe(container, AXE_OPTIONS);
    expect(results.violations, formatViolations(results.violations)).toHaveLength(0);
  });

  it("Terms (es) has no detectable accessibility violations", async () => {
    document.documentElement.lang = localeConfig.es.htmlLang;
    const { container } = render(
      <SiteShell locale="es" page="terms">
        <TermsPage locale="es" />
      </SiteShell>,
    );

    const results = await axe(container, AXE_OPTIONS);
    expect(results.violations, formatViolations(results.violations)).toHaveLength(0);
  });
});

describe("axe smoke — Download states", () => {
  it("no-release state has no detectable accessibility violations", async () => {
    const content = getContent("pt-BR");
    const { container } = render(
      <DownloadSection
        content={content.download}
        locale="pt-BR"
        release={{ available: false }}
      />,
    );

    const results = await axe(container, AXE_OPTIONS);
    expect(results.violations, formatViolations(results.violations)).toHaveLength(0);
  });

  it("available-release state (with SHA disclosure) has no detectable accessibility violations", async () => {
    const content = getContent("en");
    const { container } = render(
      <DownloadSection content={content.download} locale="en" release={AVAILABLE_RELEASE} />,
    );

    const results = await axe(container, AXE_OPTIONS);
    expect(results.violations, formatViolations(results.violations)).toHaveLength(0);
  });
});
