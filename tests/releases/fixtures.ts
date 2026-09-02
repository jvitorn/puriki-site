// Raw GitHub `GET /repos/{owner}/{repo}/releases/latest`-shaped fixtures.
// Deliberately not typed against the app's raw-release interfaces — these
// simulate what the live API actually returns (including malformed cases),
// which the parser must handle defensively.

const stableApkAsset = {
  name: "puriki-1.0.0-android.apk",
  size: 24_300_000,
  browser_download_url:
    "https://github.com/jvitorn/purikuki/releases/download/v1.0.0/puriki-1.0.0-android.apk",
  digest:
    "sha256:1f3870be274f6c49b3e31a0c6728957f795ad0ffe3ffed4a1b2c9d9a2c3f5e0e",
};

export const stableReleaseWithDigest = {
  tag_name: "v1.0.0",
  name: "1.0.0",
  draft: false,
  prerelease: false,
  published_at: "2026-08-15T10:00:00Z",
  html_url: "https://github.com/jvitorn/purikuki/releases/tag/v1.0.0",
  assets: [stableApkAsset],
};

export const stableReleaseWithoutDigest = {
  tag_name: "v1.0.0",
  draft: false,
  prerelease: false,
  published_at: "2026-08-15T10:00:00Z",
  html_url: "https://github.com/jvitorn/purikuki/releases/tag/v1.0.0",
  assets: [{ ...stableApkAsset, digest: undefined }],
};

export const stableReleaseTagWithoutV = {
  tag_name: "1.2.3",
  draft: false,
  prerelease: false,
  published_at: "2026-09-01T08:30:00Z",
  html_url: "https://github.com/jvitorn/purikuki/releases/tag/1.2.3",
  assets: [
    {
      name: "puriki-1.2.3-android.apk",
      size: 25_100_000,
      browser_download_url:
        "https://github.com/jvitorn/purikuki/releases/download/1.2.3/puriki-1.2.3-android.apk",
      digest: null,
    },
  ],
};

export const draftRelease = {
  ...stableReleaseWithDigest,
  draft: true,
};

export const prereleaseRelease = {
  ...stableReleaseWithDigest,
  prerelease: true,
};

export const releaseMissingApk = {
  tag_name: "v1.0.0",
  draft: false,
  prerelease: false,
  published_at: "2026-08-15T10:00:00Z",
  html_url: "https://github.com/jvitorn/purikuki/releases/tag/v1.0.0",
  assets: [
    { name: "source.zip", size: 1000, browser_download_url: "https://example.invalid/source.zip" },
  ],
};

export const releaseWithWrongApkName = {
  tag_name: "v1.0.0",
  draft: false,
  prerelease: false,
  published_at: "2026-08-15T10:00:00Z",
  html_url: "https://github.com/jvitorn/purikuki/releases/tag/v1.0.0",
  assets: [
    {
      name: "puriki-android.apk",
      size: 24_300_000,
      browser_download_url: "https://example.invalid/puriki-android.apk",
    },
  ],
};

// Two .apk assets present, but neither exactly matches the expected
// naming convention — ambiguous, the parser must not guess which is
// official.
export const releaseWithTwoApkCandidates = {
  tag_name: "v1.0.0",
  draft: false,
  prerelease: false,
  published_at: "2026-08-15T10:00:00Z",
  html_url: "https://github.com/jvitorn/purikuki/releases/tag/v1.0.0",
  assets: [
    {
      name: "puriki-android-1.0.0.apk",
      size: 24_300_000,
      browser_download_url: "https://example.invalid/a.apk",
    },
    {
      name: "puriki-1.0.0-android-arm64.apk",
      size: 24_100_000,
      browser_download_url: "https://example.invalid/b.apk",
    },
  ],
};

// Defensive/synthetic case: two assets both exactly matching the expected
// filename. GitHub itself enforces unique asset names per release, but the
// parser must still refuse to guess if this ever happened.
export const releaseWithDuplicateExactMatches = {
  tag_name: "v1.0.0",
  draft: false,
  prerelease: false,
  published_at: "2026-08-15T10:00:00Z",
  html_url: "https://github.com/jvitorn/purikuki/releases/tag/v1.0.0",
  assets: [
    {
      name: "puriki-1.0.0-android.apk",
      size: 24_300_000,
      browser_download_url: "https://example.invalid/a.apk",
    },
    {
      name: "puriki-1.0.0-android.apk",
      size: 24_100_000,
      browser_download_url: "https://example.invalid/b.apk",
    },
  ],
};
