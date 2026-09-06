import { describe, expect, it, vi } from "vitest";

vi.mock("../../app/lib/releases", async (importOriginal) => {
  const actual =
    await importOriginal<typeof import("../../app/lib/releases")>();
  return {
    ...actual,
    getReleaseMetadata: vi.fn(),
  };
});

import { buildPageMeta } from "../../app/lib/i18n/metadata";
import { getReleaseMetadata } from "../../app/lib/releases";

function getJsonLd(
  meta: ReturnType<typeof buildPageMeta>,
): Record<string, unknown> | undefined {
  const entry = meta.find(
    (candidate): candidate is { "script:ld+json": Record<string, unknown> } =>
      "script:ld+json" in candidate,
  );
  return entry?.["script:ld+json"];
}

describe("home page SoftwareApplication JSON-LD", () => {
  it("omits softwareVersion and downloadUrl when no release is available", () => {
    vi.mocked(getReleaseMetadata).mockReturnValue({ available: false });

    const jsonLd = getJsonLd(buildPageMeta("pt-BR", "home"));

    expect(jsonLd).toBeDefined();
    expect(jsonLd).not.toHaveProperty("softwareVersion");
    expect(jsonLd).not.toHaveProperty("downloadUrl");
  });

  it("uses the arm64-v8a artifact's downloadUrl, never universal's, once a release is available", () => {
    vi.mocked(getReleaseMetadata).mockReturnValue({
      available: true,
      version: "1.0.0",
      publishedAt: "2026-08-15T10:00:00Z",
      releaseUrl: "https://github.com/jvitorn/puriki/releases/tag/v1.0.0",
      artifacts: [
        {
          variant: "universal",
          fileName: "puriki-v1.0.0-universal.apk",
          sizeBytes: 41_800_000,
          downloadUrl: "https://example.invalid/universal.apk",
        },
        {
          variant: "arm64-v8a",
          fileName: "puriki-v1.0.0-arm64-v8a.apk",
          sizeBytes: 24_300_000,
          downloadUrl: "https://example.invalid/arm64.apk",
        },
      ],
    });

    const jsonLd = getJsonLd(buildPageMeta("en", "home"));

    expect(jsonLd?.softwareVersion).toBe("1.0.0");
    expect(jsonLd?.downloadUrl).toBe("https://example.invalid/arm64.apk");
  });

  it("is only emitted on the home page", () => {
    vi.mocked(getReleaseMetadata).mockReturnValue({ available: false });

    expect(getJsonLd(buildPageMeta("pt-BR", "privacy"))).toBeUndefined();
    expect(getJsonLd(buildPageMeta("pt-BR", "terms"))).toBeUndefined();
  });
});
