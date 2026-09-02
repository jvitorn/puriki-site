import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { getContent } from "../../app/content";
import type { ReleaseMetadata } from "../../app/lib/releases/types";
import { DownloadSection } from "../../app/sections/download-section";

const UNAVAILABLE: ReleaseMetadata = { available: false };

const AVAILABLE: ReleaseMetadata = {
  available: true,
  version: "1.0.0",
  publishedAt: "2026-08-15T10:00:00Z",
  fileName: "puriki-1.0.0-android.apk",
  sizeBytes: 24_300_000,
  downloadUrl:
    "https://github.com/jvitorn/purikuki/releases/download/v1.0.0/puriki-1.0.0-android.apk",
  releaseUrl: "https://github.com/jvitorn/purikuki/releases/tag/v1.0.0",
  sha256: "1f3870be274f6c49b3e31a0c6728957f795ad0ffe3ffed4a1b2c9d9a2c3f5e0e",
};

const AVAILABLE_NO_DIGEST: ReleaseMetadata = { ...AVAILABLE, sha256: null };

describe("DownloadSection — no release", () => {
  it("shows the honest in-preparation state and never renders a version, size or SHA", () => {
    const content = getContent("pt-BR");
    render(
      <DownloadSection content={content.download} locale="pt-BR" release={UNAVAILABLE} />,
    );

    expect(screen.getByText(content.download.noRelease.message)).toBeInTheDocument();
    expect(screen.queryByText(/1\.0\.0/)).not.toBeInTheDocument();
    expect(screen.queryByText(/sha-?256/i)).not.toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: content.download.noRelease.cta }),
    ).toHaveAttribute("href", "https://github.com/jvitorn/purikuki");
  });
});

describe("DownloadSection — available", () => {
  it("renders version, platform, size, localized date and the direct download link", () => {
    const content = getContent("en");
    render(<DownloadSection content={content.download} locale="en" release={AVAILABLE} />);

    expect(screen.getByText(/1\.0\.0/)).toBeInTheDocument();
    expect(screen.getByText(content.download.releaseLabels.platformLabel)).toBeInTheDocument();
    expect(screen.getByText(/24\.3 MB/)).toBeInTheDocument();
    expect(screen.getByText(/August 15, 2026/)).toBeInTheDocument();

    const downloadLink = screen.getByRole("link", { name: new RegExp(content.download.primaryCta) });
    expect(downloadLink).toHaveAttribute("href", AVAILABLE.available ? AVAILABLE.downloadUrl : "");

    const releaseLink = screen.getByRole("link", {
      name: content.download.releaseLabels.releaseLinkLabel,
    });
    expect(releaseLink).toHaveAttribute(
      "href",
      "https://github.com/jvitorn/purikuki/releases/tag/v1.0.0",
    );
  });

  it("shows the SHA-256 disclosure with a working copy action when a digest exists", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    vi.stubGlobal("navigator", {
      ...globalThis.navigator,
      clipboard: { writeText },
    });

    const content = getContent("pt-BR");
    render(<DownloadSection content={content.download} locale="pt-BR" release={AVAILABLE} />);

    expect(
      screen.getByText(AVAILABLE.available ? AVAILABLE.sha256! : ""),
    ).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: content.download.releaseLabels.copyLabel }));

    expect(writeText).toHaveBeenCalledWith(AVAILABLE.available ? AVAILABLE.sha256 : "");
    await waitFor(() =>
      expect(screen.getByRole("status")).toHaveTextContent(
        content.download.releaseLabels.copiedLabel,
      ),
    );

    vi.unstubAllGlobals();
  });

  it("does not render a SHA disclosure when the digest is unavailable", () => {
    const content = getContent("es");
    render(
      <DownloadSection content={content.download} locale="es" release={AVAILABLE_NO_DIGEST} />,
    );

    expect(screen.queryByText(content.download.releaseLabels.shaLabel)).not.toBeInTheDocument();
  });

  it("localizes labels per locale", () => {
    const content = getContent("es");
    render(<DownloadSection content={content.download} locale="es" release={AVAILABLE} />);

    expect(screen.getByText(new RegExp(content.download.releaseLabels.versionLabel))).toBeInTheDocument();
    expect(screen.getByText(/15 de agosto de 2026/)).toBeInTheDocument();
  });
});
