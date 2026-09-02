export interface ReleaseUnavailable {
  available: false;
}

export interface ReleaseAvailable {
  available: true;
  version: string;
  publishedAt: string;
  fileName: string;
  sizeBytes: number;
  downloadUrl: string;
  releaseUrl: string;
  sha256: string | null;
}

/**
 * The generated, build-time contract the static site renders from. Never
 * fetched by the browser — see `app/generated/release.json` and
 * `scripts/fetch-release.ts`.
 */
export type ReleaseMetadata = ReleaseUnavailable | ReleaseAvailable;
