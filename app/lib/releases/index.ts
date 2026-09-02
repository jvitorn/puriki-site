import releaseJson from "../../generated/release.json";
import type { ReleaseMetadata } from "./types";

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
    typeof record.fileName === "string" &&
    typeof record.sizeBytes === "number" &&
    typeof record.downloadUrl === "string" &&
    typeof record.releaseUrl === "string" &&
    (record.sha256 === null || typeof record.sha256 === "string")
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
        "Run `pnpm release:fetch` or restore the committed `{ \"available\": false }` baseline.",
    );
  }

  return releaseJson;
}

export type {
  ReleaseAvailable,
  ReleaseMetadata,
  ReleaseUnavailable,
} from "./types";
