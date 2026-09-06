import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { getContent } from "../../app/content";
import type { ReleaseMetadata } from "../../app/lib/releases/types";
import { DownloadSection } from "../../app/sections/download-section";

const UNAVAILABLE: ReleaseMetadata = { available: false };

const ARM64_URL =
  "https://github.com/jvitorn/puriki/releases/download/v1.0.0/puriki-v1.0.0-arm64-v8a.apk";
const UNIVERSAL_URL =
  "https://github.com/jvitorn/puriki/releases/download/v1.0.0/puriki-v1.0.0-universal.apk";
const ARM32_URL =
  "https://github.com/jvitorn/puriki/releases/download/v1.0.0/puriki-v1.0.0-armeabi-v7a.apk";
const X8664_URL =
  "https://github.com/jvitorn/puriki/releases/download/v1.0.0/puriki-v1.0.0-x86_64.apk";
const X86_URL =
  "https://github.com/jvitorn/puriki/releases/download/v1.0.0/puriki-v1.0.0-x86.apk";

const AVAILABLE_ALL_ARTIFACTS: ReleaseMetadata = {
  available: true,
  version: "1.0.0",
  publishedAt: "2026-08-15T10:00:00Z",
  releaseUrl: "https://github.com/jvitorn/puriki/releases/tag/v1.0.0",
  artifacts: [
    {
      variant: "arm64-v8a",
      fileName: "puriki-v1.0.0-arm64-v8a.apk",
      sizeBytes: 24_300_000,
      downloadUrl: ARM64_URL,
    },
    {
      variant: "universal",
      fileName: "puriki-v1.0.0-universal.apk",
      sizeBytes: 41_800_000,
      downloadUrl: UNIVERSAL_URL,
    },
    {
      variant: "armeabi-v7a",
      fileName: "puriki-v1.0.0-armeabi-v7a.apk",
      sizeBytes: 22_900_000,
      downloadUrl: ARM32_URL,
    },
    {
      variant: "x86_64",
      fileName: "puriki-v1.0.0-x86_64.apk",
      sizeBytes: 25_600_000,
      downloadUrl: X8664_URL,
    },
    {
      variant: "x86",
      fileName: "puriki-v1.0.0-x86.apk",
      sizeBytes: 24_100_000,
      downloadUrl: X86_URL,
    },
  ],
};

const AVAILABLE_REQUIRED_ONLY: ReleaseMetadata = {
  available: true,
  version: "1.0.0",
  publishedAt: "2026-08-15T10:00:00Z",
  releaseUrl: "https://github.com/jvitorn/puriki/releases/tag/v1.0.0",
  artifacts: [
    {
      variant: "arm64-v8a",
      fileName: "puriki-v1.0.0-arm64-v8a.apk",
      sizeBytes: 24_300_000,
      downloadUrl: ARM64_URL,
    },
    {
      variant: "universal",
      fileName: "puriki-v1.0.0-universal.apk",
      sizeBytes: 41_800_000,
      downloadUrl: UNIVERSAL_URL,
    },
  ],
};

describe("DownloadSection — no release", () => {
  it("shows the honest in-preparation state and never renders a version, size or artifact link", () => {
    const content = getContent("pt-BR");
    render(
      <DownloadSection
        content={content.download}
        locale="pt-BR"
        release={UNAVAILABLE}
      />,
    );

    expect(
      screen.getByText(content.download.noRelease.message),
    ).toBeInTheDocument();
    expect(screen.queryByText(/1\.0\.0/)).not.toBeInTheDocument();
    expect(
      screen.queryByRole("link", {
        name: new RegExp(content.download.primaryCta),
      }),
    ).not.toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: content.download.noRelease.cta }),
    ).toHaveAttribute("href", "https://github.com/jvitorn/puriki");
  });
});

describe("DownloadSection — available (all artifacts)", () => {
  it("shows the version, platform and localized publication date", () => {
    const content = getContent("en");
    render(
      <DownloadSection
        content={content.download}
        locale="en"
        release={AVAILABLE_ALL_ARTIFACTS}
      />,
    );

    expect(screen.getByText(/1\.0\.0/)).toBeInTheDocument();
    expect(
      screen.getByText(content.download.releaseLabels.platformLabel),
    ).toBeInTheDocument();
    expect(screen.getByText(/August 15, 2026/)).toBeInTheDocument();
  });

  it("renders ARM64 as the recommended primary CTA pointing at the ARM64 artifact", () => {
    const content = getContent("pt-BR");
    render(
      <DownloadSection
        content={content.download}
        locale="pt-BR"
        release={AVAILABLE_ALL_ARTIFACTS}
      />,
    );

    expect(
      screen.getByText(content.download.current.badge),
    ).toBeInTheDocument();
    expect(screen.getByText(/24[.,]3 MB/)).toBeInTheDocument();

    const arm64Link = screen.getByRole("link", {
      name: new RegExp(content.download.primaryCta),
    });
    expect(arm64Link).toHaveAttribute("href", ARM64_URL);
  });

  it("renders Universal as a distinct, highlighted alternative pointing at the universal artifact", () => {
    const content = getContent("pt-BR");
    render(
      <DownloadSection
        content={content.download}
        locale="pt-BR"
        release={AVAILABLE_ALL_ARTIFACTS}
      />,
    );

    expect(
      screen.getByText(content.download.universal.subtitle),
    ).toBeInTheDocument();
    expect(screen.getByText(/41[.,]8 MB/)).toBeInTheDocument();

    const universalLink = screen.getByRole("link", {
      name: new RegExp(content.download.universal.cta),
    });
    expect(universalLink).toHaveAttribute("href", UNIVERSAL_URL);
  });

  it("keeps the ARM64 card ahead of Universal in document order", () => {
    const content = getContent("pt-BR");
    render(
      <DownloadSection
        content={content.download}
        locale="pt-BR"
        release={AVAILABLE_ALL_ARTIFACTS}
      />,
    );

    const links = screen
      .getAllByRole("link")
      .map((link) => link.getAttribute("href"));
    expect(links.indexOf(ARM64_URL)).toBeLessThan(links.indexOf(UNIVERSAL_URL));
  });

  it("hides the optional artifacts behind a collapsed 'other versions' disclosure until opened", () => {
    const content = getContent("pt-BR");
    render(
      <DownloadSection
        content={content.download}
        locale="pt-BR"
        release={AVAILABLE_ALL_ARTIFACTS}
      />,
    );

    expect(
      screen.queryByRole("link", {
        name: content.download.otherVersions.armeabi_v7a.cta,
      }),
    ).not.toBeInTheDocument();

    fireEvent.click(
      screen.getByRole("button", {
        name: content.download.otherVersions.title,
      }),
    );

    expect(
      screen.getByRole("link", {
        name: content.download.otherVersions.armeabi_v7a.cta,
      }),
    ).toHaveAttribute("href", ARM32_URL);
    expect(
      screen.getByRole("link", {
        name: content.download.otherVersions.x86_64.cta,
      }),
    ).toHaveAttribute("href", X8664_URL);
    expect(
      screen.getByRole("link", {
        name: content.download.otherVersions.x86.cta,
      }),
    ).toHaveAttribute("href", X86_URL);
  });

  it("explains each version non-technically inside the 'which version' disclosure, without depending on icons", () => {
    const content = getContent("en");
    render(
      <DownloadSection
        content={content.download}
        locale="en"
        release={AVAILABLE_ALL_ARTIFACTS}
      />,
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: new RegExp(content.download.chooser.title),
      }),
    );

    expect(
      screen.getByText(content.download.chooser.current.body),
    ).toBeInTheDocument();
    expect(
      screen.getByText(content.download.chooser.universal.body),
    ).toBeInTheDocument();
    expect(
      screen.getByText(content.download.chooser.arm32.body),
    ).toBeInTheDocument();
    expect(
      screen.getByText(content.download.chooser.x86.body),
    ).toBeInTheDocument();
  });

  it("links to the official GitHub release for changelog/technical details", () => {
    const content = getContent("pt-BR");
    render(
      <DownloadSection
        content={content.download}
        locale="pt-BR"
        release={AVAILABLE_ALL_ARTIFACTS}
      />,
    );

    expect(
      screen.getByRole("link", {
        name: content.download.releaseLabels.releaseLinkLabel,
      }),
    ).toHaveAttribute(
      "href",
      "https://github.com/jvitorn/puriki/releases/tag/v1.0.0",
    );
  });

  it("never renders a SHA-256/checksum disclosure", () => {
    const content = getContent("pt-BR");
    render(
      <DownloadSection
        content={content.download}
        locale="pt-BR"
        release={AVAILABLE_ALL_ARTIFACTS}
      />,
    );

    expect(screen.queryByText(/sha-?256/i)).not.toBeInTheDocument();
  });

  it("localizes labels per locale", () => {
    const content = getContent("es");
    render(
      <DownloadSection
        content={content.download}
        locale="es"
        release={AVAILABLE_ALL_ARTIFACTS}
      />,
    );

    expect(screen.getByText(/15 de agosto de 2026/)).toBeInTheDocument();
    expect(
      screen.getByText(content.download.current.badge),
    ).toBeInTheDocument();
  });
});

describe("DownloadSection — available (required artifacts only)", () => {
  it("does not render the 'other versions' disclosure when no optional artifact exists", () => {
    const content = getContent("pt-BR");
    render(
      <DownloadSection
        content={content.download}
        locale="pt-BR"
        release={AVAILABLE_REQUIRED_ONLY}
      />,
    );

    expect(
      screen.queryByRole("button", {
        name: content.download.otherVersions.title,
      }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText(content.download.otherVersions.armeabi_v7a.title),
    ).not.toBeInTheDocument();
  });

  it("still renders the primary ARM64 and Universal cards", () => {
    const content = getContent("pt-BR");
    render(
      <DownloadSection
        content={content.download}
        locale="pt-BR"
        release={AVAILABLE_REQUIRED_ONLY}
      />,
    );

    expect(
      screen.getByRole("link", {
        name: new RegExp(content.download.primaryCta),
      }),
    ).toHaveAttribute("href", ARM64_URL);
    expect(
      screen.getByRole("link", {
        name: new RegExp(content.download.universal.cta),
      }),
    ).toHaveAttribute("href", UNIVERSAL_URL);
  });
});
