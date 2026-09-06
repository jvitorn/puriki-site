/**
 * The Android artifact variants the site knows how to present. This list
 * (and its order) is the single source of truth for both the required/
 * optional split and the display order the Download UX follows — ARM64
 * first, then Universal, then the optional legacy/emulator variants.
 */
export const RECOGNIZED_ARTIFACT_VARIANTS = [
  "arm64-v8a",
  "universal",
  "armeabi-v7a",
  "x86_64",
  "x86",
] as const;

export type AndroidArtifactVariant =
  (typeof RECOGNIZED_ARTIFACT_VARIANTS)[number];

/**
 * A stable release destined for the landing must contain exactly one valid
 * asset for each of these — see `parseGitHubRelease`. Every other
 * recognized variant is optional: its absence never fails the build, the
 * UI simply omits that option.
 */
export const REQUIRED_ARTIFACT_VARIANTS: readonly AndroidArtifactVariant[] = [
  "arm64-v8a",
  "universal",
];

export interface AndroidReleaseArtifact {
  variant: AndroidArtifactVariant;
  fileName: string;
  sizeBytes: number;
  downloadUrl: string;
}

export interface ReleaseUnavailable {
  available: false;
}

export interface ReleaseAvailable {
  available: true;
  version: string;
  publishedAt: string;
  releaseUrl: string;
  /** Ordered per `RECOGNIZED_ARTIFACT_VARIANTS`; only variants actually found on the release are present. */
  artifacts: AndroidReleaseArtifact[];
}

/**
 * The generated, build-time contract the static site renders from. Never
 * fetched by the browser — see `app/generated/release.json` and
 * `scripts/fetch-release.ts`.
 */
export type ReleaseMetadata = ReleaseUnavailable | ReleaseAvailable;
