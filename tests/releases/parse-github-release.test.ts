import { describe, expect, it } from "vitest";
import {
  normalizeSha256,
  normalizeVersion,
  parseGitHubRelease,
  ReleaseParseError,
} from "../../app/lib/releases/parse-github-release";
import {
  draftRelease,
  prereleaseRelease,
  releaseMissingApk,
  releaseWithDuplicateExactMatches,
  releaseWithInvalidPublishedAt,
  releaseWithTwoApkCandidates,
  releaseWithWrongApkName,
  stableReleaseTagWithoutV,
  stableReleaseWithDigest,
  stableReleaseWithoutDigest,
} from "./fixtures";

describe("parseGitHubRelease", () => {
  it("returns { available: false } for no stable release (404 -> null)", () => {
    expect(parseGitHubRelease(null)).toEqual({ available: false });
  });

  it("parses a stable release with a digest", () => {
    const result = parseGitHubRelease(stableReleaseWithDigest);

    expect(result).toEqual({
      available: true,
      version: "1.0.0",
      publishedAt: "2026-08-15T10:00:00Z",
      fileName: "puriki-1.0.0-android.apk",
      sizeBytes: 24_300_000,
      downloadUrl:
        "https://github.com/jvitorn/purikuki/releases/download/v1.0.0/puriki-1.0.0-android.apk",
      releaseUrl: "https://github.com/jvitorn/purikuki/releases/tag/v1.0.0",
      sha256:
        "1f3870be274f6c49b3e31a0c6728957f795ad0ffe3ffed4a1b2c9d9a2c3f5e0e",
    });
  });

  it("parses a stable release without a digest as sha256: null", () => {
    const result = parseGitHubRelease(stableReleaseWithoutDigest);
    expect(result).toMatchObject({ available: true, sha256: null });
  });

  it("normalizes a tag without a leading v", () => {
    const result = parseGitHubRelease(stableReleaseTagWithoutV);
    expect(result).toMatchObject({
      available: true,
      version: "1.2.3",
      fileName: "puriki-1.2.3-android.apk",
    });
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

  it("throws when no APK asset is present", () => {
    expect(() => parseGitHubRelease(releaseMissingApk)).toThrow(
      /No \.apk asset found/,
    );
  });

  it("throws when the only APK asset has the wrong filename", () => {
    expect(() => parseGitHubRelease(releaseWithWrongApkName)).toThrow(
      /none named/,
    );
  });

  it("throws when there are two ambiguous, non-matching APK candidates", () => {
    expect(() => parseGitHubRelease(releaseWithTwoApkCandidates)).toThrow(
      ReleaseParseError,
    );
  });

  it("throws when two assets both exactly match the expected filename", () => {
    expect(() => parseGitHubRelease(releaseWithDuplicateExactMatches)).toThrow(
      /expected exactly one/,
    );
  });

  it("throws on a malformed payload instead of guessing", () => {
    expect(() => parseGitHubRelease("not an object")).toThrow(
      ReleaseParseError,
    );
    expect(() => parseGitHubRelease({})).toThrow(ReleaseParseError);
    expect(() => parseGitHubRelease({ draft: false, prerelease: false })).toThrow(
      ReleaseParseError,
    );
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

describe("normalizeSha256", () => {
  it("extracts and lowercases the hex digest from a sha256: prefix", () => {
    expect(
      normalizeSha256(
        "sha256:1F3870BE274F6C49B3E31A0C6728957F795AD0FFE3FFED4A1B2C9D9A2C3F5E0E",
      ),
    ).toBe("1f3870be274f6c49b3e31a0c6728957f795ad0ffe3ffed4a1b2c9d9a2c3f5e0e");
  });

  it("returns null for a missing or non-sha256 digest", () => {
    expect(normalizeSha256(undefined)).toBeNull();
    expect(normalizeSha256(null)).toBeNull();
    expect(normalizeSha256("sha1:abc123")).toBeNull();
    expect(normalizeSha256("not-a-digest")).toBeNull();
  });
});
