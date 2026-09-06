import { describe, expect, it } from "vitest";
import {
  ReleaseMetadataValidationError,
  validateReleaseMetadata,
} from "../../app/lib/releases/validate-release-metadata";

const VALID_AVAILABLE = {
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
  ],
};

describe("validateReleaseMetadata — valid inputs", () => {
  it("accepts the { available: false } baseline", () => {
    expect(validateReleaseMetadata({ available: false })).toEqual({
      available: false,
    });
  });

  it("accepts a valid available:true release with only the required artifacts", () => {
    expect(validateReleaseMetadata(VALID_AVAILABLE)).toEqual(VALID_AVAILABLE);
  });

  it("accepts a valid available:true release with every optional artifact too", () => {
    const withOptional = {
      ...VALID_AVAILABLE,
      artifacts: [
        ...VALID_AVAILABLE.artifacts,
        {
          variant: "armeabi-v7a",
          fileName: "puriki-v1.0.0-armeabi-v7a.apk",
          sizeBytes: 22_900_000,
          downloadUrl: "https://example.invalid/puriki-v1.0.0-armeabi-v7a.apk",
        },
        {
          variant: "x86_64",
          fileName: "puriki-v1.0.0-x86_64.apk",
          sizeBytes: 25_600_000,
          downloadUrl: "https://example.invalid/puriki-v1.0.0-x86_64.apk",
        },
        {
          variant: "x86",
          fileName: "puriki-v1.0.0-x86.apk",
          sizeBytes: 24_100_000,
          downloadUrl: "https://example.invalid/puriki-v1.0.0-x86.apk",
        },
      ],
    };

    expect(() => validateReleaseMetadata(withOptional)).not.toThrow();
  });
});

describe("validateReleaseMetadata — invalid inputs", () => {
  it("rejects a non-object value", () => {
    expect(() => validateReleaseMetadata(null)).toThrow(
      ReleaseMetadataValidationError,
    );
    expect(() => validateReleaseMetadata("nope")).toThrow(
      ReleaseMetadataValidationError,
    );
  });

  it("rejects available:true missing the required arm64-v8a artifact", () => {
    const withoutArm64 = {
      ...VALID_AVAILABLE,
      artifacts: VALID_AVAILABLE.artifacts.filter(
        (artifact) => artifact.variant !== "arm64-v8a",
      ),
    };

    expect(() => validateReleaseMetadata(withoutArm64)).toThrow(/arm64-v8a/);
  });

  it("rejects available:true missing the required universal artifact", () => {
    const withoutUniversal = {
      ...VALID_AVAILABLE,
      artifacts: VALID_AVAILABLE.artifacts.filter(
        (artifact) => artifact.variant !== "universal",
      ),
    };

    expect(() => validateReleaseMetadata(withoutUniversal)).toThrow(
      /universal/,
    );
  });

  it("rejects a duplicate artifact variant", () => {
    const withDuplicate = {
      ...VALID_AVAILABLE,
      artifacts: [...VALID_AVAILABLE.artifacts, VALID_AVAILABLE.artifacts[0]],
    };

    expect(() => validateReleaseMetadata(withDuplicate)).toThrow(
      /duplicate artifact variant/,
    );
  });

  it("rejects sizeBytes <= 0", () => {
    const withZeroSize = {
      ...VALID_AVAILABLE,
      artifacts: [
        { ...VALID_AVAILABLE.artifacts[0], sizeBytes: 0 },
        VALID_AVAILABLE.artifacts[1],
      ],
    };

    expect(() => validateReleaseMetadata(withZeroSize)).toThrow(
      /sizeBytes must be a finite number greater than 0/,
    );
  });

  it("rejects a non-finite sizeBytes", () => {
    const withInfiniteSize = {
      ...VALID_AVAILABLE,
      artifacts: [
        { ...VALID_AVAILABLE.artifacts[0], sizeBytes: Infinity },
        VALID_AVAILABLE.artifacts[1],
      ],
    };

    expect(() => validateReleaseMetadata(withInfiniteSize)).toThrow(
      /sizeBytes must be a finite number greater than 0/,
    );
  });

  it("rejects an empty downloadUrl", () => {
    const withEmptyUrl = {
      ...VALID_AVAILABLE,
      artifacts: [
        { ...VALID_AVAILABLE.artifacts[0], downloadUrl: "" },
        VALID_AVAILABLE.artifacts[1],
      ],
    };

    expect(() => validateReleaseMetadata(withEmptyUrl)).toThrow(/downloadUrl/);
  });

  it("rejects an invalid publishedAt", () => {
    const withBadDate = { ...VALID_AVAILABLE, publishedAt: "not-a-date" };

    expect(() => validateReleaseMetadata(withBadDate)).toThrow(/publishedAt/);
  });

  it("rejects an empty version string", () => {
    expect(() =>
      validateReleaseMetadata({ ...VALID_AVAILABLE, version: "" }),
    ).toThrow(/version/);
  });

  it("rejects an empty releaseUrl", () => {
    expect(() =>
      validateReleaseMetadata({ ...VALID_AVAILABLE, releaseUrl: "" }),
    ).toThrow(/releaseUrl/);
  });

  it("rejects an unrecognized artifact variant", () => {
    const withUnknownVariant = {
      ...VALID_AVAILABLE,
      artifacts: [
        ...VALID_AVAILABLE.artifacts,
        {
          variant: "risc-v",
          fileName: "puriki-v1.0.0-risc-v.apk",
          sizeBytes: 1000,
          downloadUrl: "https://example.invalid/puriki-v1.0.0-risc-v.apk",
        },
      ],
    };

    expect(() => validateReleaseMetadata(withUnknownVariant)).toThrow(
      /not a recognized artifact variant/,
    );
  });

  it("rejects a fileName that doesn't match the puriki-v{version}-{variant}.apk convention", () => {
    const withWrongFileName = {
      ...VALID_AVAILABLE,
      artifacts: [
        { ...VALID_AVAILABLE.artifacts[0], fileName: "puriki-arm64.apk" },
        VALID_AVAILABLE.artifacts[1],
      ],
    };

    expect(() => validateReleaseMetadata(withWrongFileName)).toThrow(
      /does not match the expected/,
    );
  });

  it("rejects a malformed artifact (not an object)", () => {
    const withMalformedArtifact = {
      ...VALID_AVAILABLE,
      artifacts: [...VALID_AVAILABLE.artifacts, "not-an-artifact"],
    };

    expect(() => validateReleaseMetadata(withMalformedArtifact)).toThrow(
      /must be an object/,
    );
  });

  it("rejects artifacts that is not an array", () => {
    expect(() =>
      validateReleaseMetadata({ ...VALID_AVAILABLE, artifacts: {} }),
    ).toThrow(/"artifacts" must be an array/);
  });

  it("rejects available as a non-boolean value", () => {
    expect(() =>
      validateReleaseMetadata({ ...VALID_AVAILABLE, available: "true" }),
    ).toThrow(/"available" must be a boolean/);
  });
});
