import type { ReleaseMetadata } from "./types";

/** Thrown for any GitHub release payload that can't be trusted as-is — an
 * ambiguous or missing APK, a draft/prerelease slipping through, or a
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
  digest?: unknown;
}

interface RawGitHubRelease {
  tag_name?: unknown;
  draft?: unknown;
  prerelease?: unknown;
  published_at?: unknown;
  html_url?: unknown;
  assets?: unknown;
}

const SHA256_DIGEST_PATTERN = /^sha256:([0-9a-fA-F]{64})$/;

export function normalizeVersion(tagName: string): string {
  return tagName.startsWith("v") || tagName.startsWith("V")
    ? tagName.slice(1)
    : tagName;
}

export function normalizeSha256(digest: unknown): string | null {
  if (typeof digest !== "string") {
    return null;
  }

  const match = SHA256_DIGEST_PATTERN.exec(digest.trim());
  return match ? match[1].toLowerCase() : null;
}

function isApkAsset(asset: unknown): asset is RawGitHubAsset & { name: string } {
  return (
    typeof asset === "object" &&
    asset !== null &&
    typeof (asset as RawGitHubAsset).name === "string" &&
    ((asset as RawGitHubAsset).name as string).toLowerCase().endsWith(".apk")
  );
}

/**
 * Turns a raw `GET /repos/{owner}/{repo}/releases/latest` response body into
 * the site's `ReleaseMetadata` contract.
 *
 * `raw === null` is the documented "no stable release published" state and
 * is the *only* input that produces `{ available: false }`. The caller
 * (`scripts/fetch-release.ts`) maps that state from a 404 response for the
 * specific, known-public repository this site targets (`jvitorn/purikuki`)
 * — for that endpoint, a 404 means "this repo has no release that is
 * neither a draft nor a prerelease," which is exactly our no-release state.
 * A 404 is never treated as "no release" for any other reason (e.g. it is
 * never used to paper over auth/permission problems against a private or
 * misspelled repo). Every other malformed/ambiguous input throws
 * `ReleaseParseError` instead of guessing.
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
  const expectedFileName = `puriki-${version}-android.apk`;

  const apkAssets = release.assets.filter(isApkAsset);
  const matches = apkAssets.filter((asset) => asset.name === expectedFileName);

  if (matches.length === 0) {
    throw new ReleaseParseError(
      apkAssets.length === 0
        ? `No .apk asset found on release "${release.tag_name}"; expected "${expectedFileName}".`
        : `Release "${release.tag_name}" has ${apkAssets.length} .apk asset(s), but none named "${expectedFileName}" (found: ${apkAssets
            .map((asset) => asset.name)
            .join(", ")}).`,
    );
  }

  if (matches.length > 1) {
    throw new ReleaseParseError(
      `Release "${release.tag_name}" has ${matches.length} assets named "${expectedFileName}"; expected exactly one.`,
    );
  }

  const asset = matches[0];

  if (
    typeof asset.size !== "number" ||
    !Number.isFinite(asset.size) ||
    asset.size <= 0
  ) {
    throw new ReleaseParseError(
      `Asset "${expectedFileName}" has an invalid or missing size.`,
    );
  }

  if (
    typeof asset.browser_download_url !== "string" ||
    asset.browser_download_url.length === 0
  ) {
    throw new ReleaseParseError(
      `Asset "${expectedFileName}" is missing a browser_download_url.`,
    );
  }

  return {
    available: true,
    version,
    publishedAt: release.published_at,
    fileName: expectedFileName,
    sizeBytes: asset.size,
    downloadUrl: asset.browser_download_url,
    releaseUrl: release.html_url,
    sha256: normalizeSha256(asset.digest),
  };
}
