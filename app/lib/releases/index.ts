import releaseJson from "../../generated/release.json";
import { validateReleaseMetadata } from "./validate-release-metadata";
import type {
  AndroidArtifactVariant,
  AndroidReleaseArtifact,
  ReleaseAvailable,
  ReleaseMetadata,
} from "./types";

/**
 * Reads the build-time generated release metadata. This is a plain JSON
 * import — no network call, no token, safe to run on every page render
 * (including at prerender time). The generated file is validated against
 * the full `ReleaseMetadata` contract (see `validate-release-metadata.ts`)
 * on every read — a corrupted or hand-edited file throws an explicit error
 * instead of silently rendering an incomplete Download section.
 */
export function getReleaseMetadata(): ReleaseMetadata {
  try {
    return validateReleaseMetadata(releaseJson);
  } catch (error) {
    throw new Error(
      "app/generated/release.json does not match the ReleaseMetadata contract. " +
        'Run `pnpm release:fetch` or restore the committed `{ "available": false }` baseline. ' +
        `Details: ${error instanceof Error ? error.message : String(error)}`,
      { cause: error },
    );
  }
}

/** Looks up one artifact by variant on an available release, or `undefined` if that variant wasn't found on this release. Use this only for artifacts that are genuinely optional — for a variant `REQUIRED_ARTIFACT_VARIANTS` guarantees, use `getRequiredReleaseArtifact` instead. */
export function getReleaseArtifact(
  release: ReleaseAvailable,
  variant: AndroidArtifactVariant,
): AndroidReleaseArtifact | undefined {
  return release.artifacts.find((artifact) => artifact.variant === variant);
}

/**
 * Looks up a required artifact (`arm64-v8a`/`universal`) on an available
 * release and throws instead of returning `undefined` if it's missing.
 * `getReleaseMetadata()` already guarantees both are present on any valid
 * generated file, so a missing required artifact here means that
 * invariant was violated — this must fail loudly (at build/test time)
 * rather than let the Download section silently disappear.
 */
export function getRequiredReleaseArtifact(
  release: ReleaseAvailable,
  variant: AndroidArtifactVariant,
): AndroidReleaseArtifact {
  const artifact = getReleaseArtifact(release, variant);

  if (!artifact) {
    throw new Error(
      `Required release artifact "${variant}" is missing from release v${release.version}. ` +
        "This should be impossible for a release that passed getReleaseMetadata()'s validation.",
    );
  }

  return artifact;
}

export type {
  AndroidArtifactVariant,
  AndroidReleaseArtifact,
  ReleaseAvailable,
  ReleaseMetadata,
  ReleaseUnavailable,
} from "./types";
