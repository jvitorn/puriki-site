import { describe, expect, it } from "vitest";
import {
  getReleaseArtifact,
  getRequiredReleaseArtifact,
} from "../../app/lib/releases";
import type { ReleaseAvailable } from "../../app/lib/releases/types";

const RELEASE_REQUIRED_ONLY: ReleaseAvailable = {
  available: true,
  version: "1.0.0",
  publishedAt: "2026-08-15T10:00:00Z",
  releaseUrl: "https://github.com/jvitorn/puriki/releases/tag/v1.0.0",
  artifacts: [
    {
      variant: "arm64-v8a",
      fileName: "puriki-v1.0.0-arm64-v8a.apk",
      sizeBytes: 24_300_000,
      downloadUrl: "https://example.invalid/puriki-v1.0.0-arm64-v8a.apk",
    },
    {
      variant: "universal",
      fileName: "puriki-v1.0.0-universal.apk",
      sizeBytes: 41_800_000,
      downloadUrl: "https://example.invalid/puriki-v1.0.0-universal.apk",
    },
  ],
};

describe("getRequiredReleaseArtifact", () => {
  it("finds the arm64-v8a artifact", () => {
    expect(
      getRequiredReleaseArtifact(RELEASE_REQUIRED_ONLY, "arm64-v8a"),
    ).toEqual(RELEASE_REQUIRED_ONLY.artifacts[0]);
  });

  it("finds the universal artifact", () => {
    expect(
      getRequiredReleaseArtifact(RELEASE_REQUIRED_ONLY, "universal"),
    ).toEqual(RELEASE_REQUIRED_ONLY.artifacts[1]);
  });

  it("throws an explicit error instead of returning undefined when a required variant is absent", () => {
    // This deliberately constructs an impossible-in-practice release (one
    // that getReleaseMetadata() would have already rejected) to prove the
    // boundary helper itself never fails silently.
    const brokenRelease: ReleaseAvailable = {
      ...RELEASE_REQUIRED_ONLY,
      artifacts: [RELEASE_REQUIRED_ONLY.artifacts[0]],
    };

    expect(() =>
      getRequiredReleaseArtifact(brokenRelease, "universal"),
    ).toThrow(/Required release artifact "universal" is missing/);
  });
});

describe("getReleaseArtifact (optional lookup)", () => {
  it("returns undefined for an optional variant that isn't present, without throwing", () => {
    expect(
      getReleaseArtifact(RELEASE_REQUIRED_ONLY, "armeabi-v7a"),
    ).toBeUndefined();
  });

  it("returns the artifact when present", () => {
    expect(getReleaseArtifact(RELEASE_REQUIRED_ONLY, "universal")).toEqual(
      RELEASE_REQUIRED_ONLY.artifacts[1],
    );
  });
});
