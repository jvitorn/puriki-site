// Raw GitHub `GET /repos/{owner}/{repo}/releases/latest`-shaped fixtures.
// Deliberately not typed against the app's raw-release interfaces — these
// simulate what the live API actually returns (including malformed cases),
// which the parser must handle defensively.

const VERSION = "1.0.0";

function apkAsset(variant: string, size = 24_300_000) {
  return {
    name: `puriki-v${VERSION}-${variant}.apk`,
    size,
    browser_download_url: `https://github.com/jvitorn/puriki/releases/download/v${VERSION}/puriki-v${VERSION}-${variant}.apk`,
  };
}

const arm64Asset = apkAsset("arm64-v8a", 24_300_000);
const universalAsset = apkAsset("universal", 41_800_000);
const arm32Asset = apkAsset("armeabi-v7a", 22_900_000);
const x8664Asset = apkAsset("x86_64", 25_600_000);
const x86Asset = apkAsset("x86", 24_100_000);

const sha256SumsAsset = {
  name: "SHA256SUMS.txt",
  size: 512,
  browser_download_url:
    "https://github.com/jvitorn/puriki/releases/download/v1.0.0/SHA256SUMS.txt",
};

function baseRelease(overrides: Record<string, unknown> = {}) {
  return {
    tag_name: `v${VERSION}`,
    draft: false,
    prerelease: false,
    published_at: "2026-08-15T10:00:00Z",
    html_url: `https://github.com/jvitorn/puriki/releases/tag/v${VERSION}`,
    assets: [arm64Asset, universalAsset, arm32Asset, x8664Asset, x86Asset],
    ...overrides,
  };
}

// All five recognized artifacts, plus the (ignored) SHA256SUMS.txt file.
export const stableReleaseAllArtifacts = baseRelease({
  assets: [
    arm64Asset,
    universalAsset,
    arm32Asset,
    x8664Asset,
    x86Asset,
    sha256SumsAsset,
  ],
});

// Only the two required artifacts — every optional variant absent.
export const stableReleaseRequiredOnly = baseRelease({
  assets: [arm64Asset, universalAsset],
});

export const stableReleaseMissingArm64 = baseRelease({
  assets: [universalAsset, arm32Asset, x8664Asset, x86Asset],
});

export const stableReleaseMissingUniversal = baseRelease({
  assets: [arm64Asset, arm32Asset, x8664Asset, x86Asset],
});

export const stableReleaseMissingArm32 = baseRelease({
  assets: [arm64Asset, universalAsset, x8664Asset, x86Asset],
});

export const stableReleaseMissingX86 = baseRelease({
  assets: [arm64Asset, universalAsset, arm32Asset, x8664Asset],
});

export const stableReleaseMissingX8664 = baseRelease({
  assets: [arm64Asset, universalAsset, arm32Asset, x86Asset],
});

export const stableReleaseTagWithoutV = baseRelease({
  tag_name: VERSION,
  html_url: `https://github.com/jvitorn/puriki/releases/tag/${VERSION}`,
  assets: [
    apkAsset("arm64-v8a", 24_300_000),
    apkAsset("universal", 41_800_000),
  ],
});

export const stableReleaseTagUppercaseV = baseRelease({
  tag_name: `V${VERSION}`,
});

export const releaseWithInvalidPublishedAt = baseRelease({
  published_at: "not-a-real-date",
});

export const draftRelease = baseRelease({ draft: true });

export const prereleaseRelease = baseRelease({ prerelease: true });

// An unrelated .apk asset alongside the two required ones must not break
// parsing — it simply isn't recognized as any known variant.
export const releaseWithUnrelatedApk = baseRelease({
  assets: [
    arm64Asset,
    universalAsset,
    {
      name: "some-other-tool.apk",
      size: 1000,
      browser_download_url: "https://example.invalid/tool.apk",
    },
  ],
});

// A filename close to, but not exactly matching, the arm64-v8a convention
// must not be confused with a valid arm64-v8a artifact.
export const releaseWithIncorrectArtifactName = baseRelease({
  assets: [
    {
      name: `puriki-v${VERSION}-arm64.apk`,
      size: 24_300_000,
      browser_download_url: "https://example.invalid/wrong.apk",
    },
    universalAsset,
  ],
});

export const releaseMissingAllApks = baseRelease({
  assets: [
    {
      name: "source.zip",
      size: 1000,
      browser_download_url: "https://example.invalid/source.zip",
    },
  ],
});

export const releaseWithDuplicateArm64 = baseRelease({
  assets: [
    arm64Asset,
    {
      ...arm64Asset,
      browser_download_url: "https://example.invalid/duplicate.apk",
    },
    universalAsset,
  ],
});

export const releaseWithInvalidArm64Size = baseRelease({
  assets: [{ ...arm64Asset, size: 0 }, universalAsset],
});

export const releaseWithMissingDownloadUrl = baseRelease({
  assets: [{ name: arm64Asset.name, size: arm64Asset.size }, universalAsset],
});
