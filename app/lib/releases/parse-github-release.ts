import {
  RECOGNIZED_ARTIFACT_VARIANTS,
  REQUIRED_ARTIFACT_VARIANTS,
  type AndroidArtifactVariant,
  type AndroidReleaseArtifact,
  type ReleaseMetadata,
} from "./types";

/** Thrown for any GitHub release payload that can't be trusted as-is — a
 * missing required artifact, a draft/prerelease slipping through, or a
 * malformed response. Callers (the fetch script) must let this fail the
 * build/workflow rather than silently falling back to "no release". */
export class ReleaseParseError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ReleaseParseError";
  }
}

interface RawGitHubAsset {
  name?: unknown;
  size?: unknown;
  browser_download_url?: unknown;
}

interface RawGitHubRelease {
  tag_name?: unknown;
  draft?: unknown;
  prerelease?: unknown;
  published_at?: unknown;
  html_url?: unknown;
  assets?: unknown;
}

export function normalizeVersion(tagName: string): string {
  return tagName.startsWith("v") || tagName.startsWith("V")
    ? tagName.slice(1)
    : tagName;
}

/**
 * The one place the `puriki-v{version}-{variant}.apk` naming convention is
 * spelled out — never duplicate this template in UI/components.
 */
export function buildArtifactFileName(
  version: string,
  variant: AndroidArtifactVariant,
): string {
  return `puriki-v${version}-${variant}.apk`;
}

function isApkAsset(
  asset: unknown,
): asset is RawGitHubAsset & { name: string } {
  return (
    typeof asset === "object" &&
    asset !== null &&
    typeof (asset as RawGitHubAsset).name === "string" &&
    ((asset as RawGitHubAsset).name as string).toLowerCase().endsWith(".apk")
  );
}

function parseArtifact(
  asset: RawGitHubAsset & { name: string },
  variant: AndroidArtifactVariant,
): AndroidReleaseArtifact {
  if (
    typeof asset.size !== "number" ||
    !Number.isFinite(asset.size) ||
    asset.size <= 0
  ) {
    throw new ReleaseParseError(
      `Asset "${asset.name}" (variant "${variant}") has an invalid or missing size.`,
    );
  }

  if (
    typeof asset.browser_download_url !== "string" ||
    asset.browser_download_url.length === 0
  ) {
    throw new ReleaseParseError(
      `Asset "${asset.name}" (variant "${variant}") is missing a browser_download_url.`,
    );
  }

  return {
    variant,
    fileName: asset.name,
    sizeBytes: asset.size,
    downloadUrl: asset.browser_download_url,
  };
}

/**
 * Turns a raw `GET /repos/{owner}/{repo}/releases/latest` response body into
 * the site's `ReleaseMetadata` contract.
 *
 * `raw === null` is the documented "no stable release published" state and
 * is the *only* input that produces `{ available: false }`. The caller
 * (`scripts/fetch-release.ts`) maps that state from a 404 response for the
 * specific, known-public repository this site targets (`jvitorn/puriki`)
 * — for that endpoint, a 404 means "this repo has no release that is
 * neither a draft nor a prerelease," which is exactly our no-release state.
 * A 404 is never treated as "no release" for any other reason (e.g. it is
 * never used to paper over auth/permission problems against a private or
 * misspelled repo). Every other malformed/ambiguous input throws
 * `ReleaseParseError` instead of guessing.
 *
 * The release is expected to carry one Android APK per architecture
 * variant (`puriki-v{version}-{variant}.apk`) rather than a single
 * universal APK. `arm64-v8a` and `universal` are required — a stable
 * release destined for the landing must contain exactly one valid asset
 * for each, or this throws. `armeabi-v7a`, `x86_64` and `x86` are optional:
 * if a future release drops one, the parser simply omits it from
 * `artifacts` instead of failing. Any other `.apk` asset (an unrecognized
 * variant, a stray build artifact) is ignored rather than treated as
 * ambiguous, as is `SHA256SUMS.txt` (checksums are a GitHub Release
 * concern, not part of this site's contract — see PHASE_04R).
 */
export function parseGitHubRelease(raw: unknown): ReleaseMetadata {
  if (raw === null) {
    return { available: false };
  }

  if (typeof raw !== "object") {
    throw new ReleaseParseError(
      `Unexpected GitHub release payload: expected an object, got ${typeof raw}.`,
    );
  }

  const release = raw as RawGitHubRelease;

  if (release.draft === true) {
    throw new ReleaseParseError(
      "The resolved release is a draft; refusing to publish it as the stable release.",
    );
  }

  if (release.prerelease === true) {
    throw new ReleaseParseError(
      "The resolved release is a prerelease; refusing to use it as the primary stable download.",
    );
  }

  if (typeof release.tag_name !== "string" || release.tag_name.length === 0) {
    throw new ReleaseParseError("Release is missing a usable tag_name.");
  }

  if (
    typeof release.published_at !== "string" ||
    release.published_at.length === 0 ||
    !Number.isFinite(Date.parse(release.published_at))
  ) {
    throw new ReleaseParseError(
      `Release is missing a valid published_at (got: ${JSON.stringify(release.published_at)}).`,
    );
  }

  if (typeof release.html_url !== "string" || release.html_url.length === 0) {
    throw new ReleaseParseError("Release is missing html_url.");
  }

  if (!Array.isArray(release.assets)) {
    throw new ReleaseParseError("Release is missing an assets array.");
  }

  const version = normalizeVersion(release.tag_name);
  const apkAssets = release.assets.filter(isApkAsset);

  const artifactsByVariant = new Map<
    AndroidArtifactVariant,
    AndroidReleaseArtifact
  >();

  for (const variant of RECOGNIZED_ARTIFACT_VARIANTS) {
    const expectedFileName = buildArtifactFileName(version, variant);
    const matches = apkAssets.filter(
      (asset) => asset.name === expectedFileName,
    );

    if (matches.length > 1) {
      throw new ReleaseParseError(
        `Release "${release.tag_name}" has ${matches.length} assets named "${expectedFileName}"; expected at most one.`,
      );
    }

    if (matches.length === 0) {
      continue;
    }

    artifactsByVariant.set(variant, parseArtifact(matches[0], variant));
  }

  const missingRequired = REQUIRED_ARTIFACT_VARIANTS.filter(
    (variant) => !artifactsByVariant.has(variant),
  );

  if (missingRequired.length > 0) {
    throw new ReleaseParseError(
      `Release "${release.tag_name}" is missing required Android artifact(s): ${missingRequired
        .map((variant) => `"${buildArtifactFileName(version, variant)}"`)
        .join(", ")}.`,
    );
  }

  const artifacts = RECOGNIZED_ARTIFACT_VARIANTS.filter((variant) =>
    artifactsByVariant.has(variant),
  ).map((variant) => artifactsByVariant.get(variant)!);

  return {
    available: true,
    version,
    publishedAt: release.published_at,
    releaseUrl: release.html_url,
    artifacts,
  };
}
