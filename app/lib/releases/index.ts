import releaseJson from "../../generated/release.json";
import { RECOGNIZED_ARTIFACT_VARIANTS } from "./types";
import type {
  AndroidArtifactVariant,
  AndroidReleaseArtifact,
  ReleaseAvailable,
  ReleaseMetadata,
} from "./types";

function isAndroidReleaseArtifact(
  value: unknown,
): value is AndroidReleaseArtifact {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const record = value as Record<string, unknown>;

  return (
    typeof record.variant === "string" &&
    (RECOGNIZED_ARTIFACT_VARIANTS as readonly string[]).includes(
      record.variant,
    ) &&
    typeof record.fileName === "string" &&
    typeof record.sizeBytes === "number" &&
    typeof record.downloadUrl === "string"
  );
}

function isReleaseMetadata(value: unknown): value is ReleaseMetadata {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const record = value as Record<string, unknown>;

  if (record.available === false) {
    return true;
  }

  return (
    record.available === true &&
    typeof record.version === "string" &&
    typeof record.publishedAt === "string" &&
    typeof record.releaseUrl === "string" &&
    Array.isArray(record.artifacts) &&
    record.artifacts.every(isAndroidReleaseArtifact)
  );
}

/**
 * Reads the build-time generated release metadata. This is a plain JSON
 * import — no network call, no token, safe to run on every page render
 * (including at prerender time).
 */
export function getReleaseMetadata(): ReleaseMetadata {
  if (!isReleaseMetadata(releaseJson)) {
    throw new Error(
      "app/generated/release.json does not match the ReleaseMetadata contract. " +
        'Run `pnpm release:fetch` or restore the committed `{ "available": false }` baseline.',
    );
  }

  return releaseJson;
}

/** Looks up one artifact by variant on an available release, or `undefined` if that variant wasn't found on this release (only ever expected for optional variants — required ones are guaranteed by the parser). */
export function getReleaseArtifact(
  release: ReleaseAvailable,
  variant: AndroidArtifactVariant,
): AndroidReleaseArtifact | undefined {
  return release.artifacts.find((artifact) => artifact.variant === variant);
}

export type {
  AndroidArtifactVariant,
  AndroidReleaseArtifact,
  ReleaseAvailable,
  ReleaseMetadata,
  ReleaseUnavailable,
} from "./types";
