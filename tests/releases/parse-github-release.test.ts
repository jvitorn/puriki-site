import { describe, expect, it } from "vitest";
import {
  buildArtifactFileName,
  normalizeVersion,
  parseGitHubRelease,
  ReleaseParseError,
} from "../../app/lib/releases/parse-github-release";
import {
  draftRelease,
  prereleaseRelease,
  releaseMissingAllApks,
  releaseWithDuplicateArm64,
  releaseWithIncorrectArtifactName,
  releaseWithInvalidArm64Size,
  releaseWithInvalidPublishedAt,
  releaseWithMissingDownloadUrl,
  releaseWithUnrelatedApk,
  stableReleaseAllArtifacts,
  stableReleaseMissingArm32,
  stableReleaseMissingArm64,
  stableReleaseMissingUniversal,
  stableReleaseMissingX86,
  stableReleaseMissingX8664,
  stableReleaseRequiredOnly,
  stableReleaseTagUppercaseV,
  stableReleaseTagWithoutV,
} from "./fixtures";

describe("parseGitHubRelease", () => {
  it("returns { available: false } for no stable release (404 -> null)", () => {
    expect(parseGitHubRelease(null)).toEqual({ available: false });
  });

  it("parses a stable release with all five recognized artifacts (SHA256SUMS.txt ignored)", () => {
    const result = parseGitHubRelease(stableReleaseAllArtifacts);

    expect(result).toEqual({
      available: true,
      version: "1.0.0",
      publishedAt: "2026-08-15T10:00:00Z",
      releaseUrl: "https://github.com/jvitorn/puriki/releases/tag/v1.0.0",
      artifacts: [
        {
          variant: "arm64-v8a",
          fileName: "puriki-v1.0.0-arm64-v8a.apk",
          sizeBytes: 24_300_000,
          downloadUrl:
            "https://github.com/jvitorn/puriki/releases/download/v1.0.0/puriki-v1.0.0-arm64-v8a.apk",
        },
        {
          variant: "universal",
          fileName: "puriki-v1.0.0-universal.apk",
          sizeBytes: 41_800_000,
          downloadUrl:
            "https://github.com/jvitorn/puriki/releases/download/v1.0.0/puriki-v1.0.0-universal.apk",
        },
        {
          variant: "armeabi-v7a",
          fileName: "puriki-v1.0.0-armeabi-v7a.apk",
          sizeBytes: 22_900_000,
          downloadUrl:
            "https://github.com/jvitorn/puriki/releases/download/v1.0.0/puriki-v1.0.0-armeabi-v7a.apk",
        },
        {
          variant: "x86_64",
          fileName: "puriki-v1.0.0-x86_64.apk",
          sizeBytes: 25_600_000,
          downloadUrl:
            "https://github.com/jvitorn/puriki/releases/download/v1.0.0/puriki-v1.0.0-x86_64.apk",
        },
        {
          variant: "x86",
          fileName: "puriki-v1.0.0-x86.apk",
          sizeBytes: 24_100_000,
          downloadUrl:
            "https://github.com/jvitorn/puriki/releases/download/v1.0.0/puriki-v1.0.0-x86.apk",
        },
      ],
    });
  });

  it("parses a stable release with only the two required artifacts", () => {
    const result = parseGitHubRelease(stableReleaseRequiredOnly);

    expect(result).toMatchObject({ available: true });
    if (result.available) {
      expect(result.artifacts.map((a) => a.variant)).toEqual([
        "arm64-v8a",
        "universal",
      ]);
    }
  });

  it("throws when the required arm64-v8a artifact is missing", () => {
    expect(() => parseGitHubRelease(stableReleaseMissingArm64)).toThrow(
      /arm64-v8a/,
    );
  });

  it("throws when the required universal artifact is missing", () => {
    expect(() => parseGitHubRelease(stableReleaseMissingUniversal)).toThrow(
      /universal/,
    );
  });

  it("does not fail when the optional armeabi-v7a artifact is missing", () => {
    const result = parseGitHubRelease(stableReleaseMissingArm32);
    expect(result).toMatchObject({ available: true });
    if (result.available) {
      expect(result.artifacts.some((a) => a.variant === "armeabi-v7a")).toBe(
        false,
      );
    }
  });

  it("does not fail when the optional x86 artifact is missing", () => {
    const result = parseGitHubRelease(stableReleaseMissingX86);
    expect(result).toMatchObject({ available: true });
    if (result.available) {
      expect(result.artifacts.some((a) => a.variant === "x86")).toBe(false);
    }
  });

  it("does not fail when the optional x86_64 artifact is missing", () => {
    const result = parseGitHubRelease(stableReleaseMissingX8664);
    expect(result).toMatchObject({ available: true });
    if (result.available) {
      expect(result.artifacts.some((a) => a.variant === "x86_64")).toBe(false);
    }
  });

  it("normalizes a tag without a leading v", () => {
    const result = parseGitHubRelease(stableReleaseTagWithoutV);
    expect(result).toMatchObject({ available: true, version: "1.0.0" });
    if (result.available) {
      expect(result.artifacts.map((a) => a.fileName)).toEqual([
        "puriki-v1.0.0-arm64-v8a.apk",
        "puriki-v1.0.0-universal.apk",
      ]);
    }
  });

  it("normalizes a tag with an uppercase leading V", () => {
    const result = parseGitHubRelease(stableReleaseTagUppercaseV);
    expect(result).toMatchObject({ available: true, version: "1.0.0" });
  });

  it("throws when published_at is not a valid date", () => {
    expect(() => parseGitHubRelease(releaseWithInvalidPublishedAt)).toThrow(
      /valid published_at/,
    );
  });

  it("rejects a draft release", () => {
    expect(() => parseGitHubRelease(draftRelease)).toThrow(ReleaseParseError);
  });

  it("rejects a prerelease", () => {
    expect(() => parseGitHubRelease(prereleaseRelease)).toThrow(
      ReleaseParseError,
    );
  });

  it("throws when no APK asset is present at all", () => {
    expect(() => parseGitHubRelease(releaseMissingAllApks)).toThrow(
      ReleaseParseError,
    );
  });

  it("ignores an unrelated .apk asset that doesn't match any recognized variant", () => {
    const result = parseGitHubRelease(releaseWithUnrelatedApk);
    expect(result).toMatchObject({ available: true });
    if (result.available) {
      expect(result.artifacts.map((a) => a.variant)).toEqual([
        "arm64-v8a",
        "universal",
      ]);
    }
  });

  it("does not confuse an incorrectly named asset with a valid arm64-v8a artifact", () => {
    expect(() => parseGitHubRelease(releaseWithIncorrectArtifactName)).toThrow(
      /arm64-v8a/,
    );
  });

  it("throws when two assets both exactly match the expected arm64-v8a filename", () => {
    expect(() => parseGitHubRelease(releaseWithDuplicateArm64)).toThrow(
      /expected at most one/,
    );
  });

  it("throws when an artifact has an invalid size", () => {
    expect(() => parseGitHubRelease(releaseWithInvalidArm64Size)).toThrow(
      /invalid or missing size/,
    );
  });

  it("throws when an artifact is missing a browser_download_url", () => {
    expect(() => parseGitHubRelease(releaseWithMissingDownloadUrl)).toThrow(
      /browser_download_url/,
    );
  });

  it("throws on a malformed payload instead of guessing", () => {
    expect(() => parseGitHubRelease("not an object")).toThrow(
      ReleaseParseError,
    );
    expect(() => parseGitHubRelease({})).toThrow(ReleaseParseError);
    expect(() =>
      parseGitHubRelease({ draft: false, prerelease: false }),
    ).toThrow(ReleaseParseError);
  });
});

describe("normalizeVersion", () => {
  it("strips a leading v", () => {
    expect(normalizeVersion("v1.0.0")).toBe("1.0.0");
    expect(normalizeVersion("V1.0.0")).toBe("1.0.0");
  });

  it("leaves a version without a leading v unchanged", () => {
    expect(normalizeVersion("1.0.0")).toBe("1.0.0");
  });
});

describe("buildArtifactFileName", () => {
  it("builds the puriki-v{version}-{variant}.apk convention", () => {
    expect(buildArtifactFileName("1.0.0", "arm64-v8a")).toBe(
      "puriki-v1.0.0-arm64-v8a.apk",
    );
    expect(buildArtifactFileName("1.0.0", "universal")).toBe(
      "puriki-v1.0.0-universal.apk",
    );
  });
});
