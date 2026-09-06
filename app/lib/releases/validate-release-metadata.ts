import { buildArtifactFileName } from "./parse-github-release";
import {
  RECOGNIZED_ARTIFACT_VARIANTS,
  REQUIRED_ARTIFACT_VARIANTS,
  type AndroidArtifactVariant,
  type ReleaseMetadata,
} from "./types";

/**
 * Thrown when `app/generated/release.json` (or any other already-generated
 * metadata this site is about to render from) does not satisfy the
 * `ReleaseMetadata` invariants. This is a stronger, narrower check than
 * `parseGitHubRelease()`: it never talks to a raw GitHub API payload, it
 * only validates the contract the *generated* file must uphold. A broken
 * generated file must fail loudly here — never silently hide the Download
 * section (see `getRequiredReleaseArtifact` in `./index.ts`).
 */
export class ReleaseMetadataValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ReleaseMetadataValidationError";
  }
}

function fail(message: string): never {
  throw new ReleaseMetadataValidationError(
    `app/generated/release.json is invalid: ${message}`,
  );
}

function isRecognizedVariant(value: unknown): value is AndroidArtifactVariant {
  return (
    typeof value === "string" &&
    (RECOGNIZED_ARTIFACT_VARIANTS as readonly string[]).includes(value)
  );
}

/**
 * Validates a plain, already-parsed JSON value against the `ReleaseMetadata`
 * contract required for the generated file. This intentionally re-checks
 * invariants `parseGitHubRelease()` already guarantees for a *fresh* GitHub
 * API response — this validator instead protects the boundary between the
 * committed/generated file on disk and the UI that renders it, in case that
 * file is ever hand-edited or corrupted independently of the fetch script.
 *
 * Throws `ReleaseMetadataValidationError` with an explicit, actionable
 * message on any violation. Never returns a "best effort" partial value.
 */
export function validateReleaseMetadata(value: unknown): ReleaseMetadata {
  if (typeof value !== "object" || value === null) {
    fail(`expected an object, got ${typeof value}.`);
  }

  const record = value as Record<string, unknown>;

  if (record.available === false) {
    return { available: false };
  }

  if (record.available !== true) {
    fail(
      `"available" must be a boolean (true or false), got ${JSON.stringify(record.available)}.`,
    );
  }

  if (typeof record.version !== "string" || record.version.length === 0) {
    fail('"version" must be a non-empty string.');
  }

  if (
    typeof record.publishedAt !== "string" ||
    record.publishedAt.length === 0 ||
    !Number.isFinite(Date.parse(record.publishedAt))
  ) {
    fail(
      `"publishedAt" must be a parseable date string, got ${JSON.stringify(record.publishedAt)}.`,
    );
  }

  if (typeof record.releaseUrl !== "string" || record.releaseUrl.length === 0) {
    fail('"releaseUrl" must be a non-empty string.');
  }

  if (!Array.isArray(record.artifacts)) {
    fail('"artifacts" must be an array.');
  }

  const seenVariants = new Set<AndroidArtifactVariant>();

  for (const [index, rawArtifact] of record.artifacts.entries()) {
    if (typeof rawArtifact !== "object" || rawArtifact === null) {
      fail(`artifacts[${index}] must be an object.`);
    }

    const artifact = rawArtifact as Record<string, unknown>;

    if (!isRecognizedVariant(artifact.variant)) {
      fail(
        `artifacts[${index}].variant is not a recognized artifact variant (got ${JSON.stringify(artifact.variant)}).`,
      );
    }

    if (seenVariants.has(artifact.variant)) {
      fail(`duplicate artifact variant "${artifact.variant}".`);
    }
    seenVariants.add(artifact.variant);

    if (
      typeof artifact.fileName !== "string" ||
      artifact.fileName.length === 0
    ) {
      fail(
        `artifacts[${index}] ("${artifact.variant}") is missing a non-empty fileName.`,
      );
    }

    const expectedFileName = buildArtifactFileName(
      record.version as string,
      artifact.variant,
    );
    if (artifact.fileName !== expectedFileName) {
      fail(
        `artifacts[${index}] ("${artifact.variant}") fileName "${artifact.fileName}" does not match the expected "${expectedFileName}" convention.`,
      );
    }

    if (
      typeof artifact.sizeBytes !== "number" ||
      !Number.isFinite(artifact.sizeBytes) ||
      artifact.sizeBytes <= 0
    ) {
      fail(
        `artifacts[${index}] ("${artifact.variant}") sizeBytes must be a finite number greater than 0.`,
      );
    }

    if (
      typeof artifact.downloadUrl !== "string" ||
      artifact.downloadUrl.length === 0
    ) {
      fail(
        `artifacts[${index}] ("${artifact.variant}") is missing a non-empty downloadUrl.`,
      );
    }
  }

  const missingRequired = REQUIRED_ARTIFACT_VARIANTS.filter(
    (variant) => !seenVariants.has(variant),
  );

  if (missingRequired.length > 0) {
    fail(
      `missing required artifact variant(s): ${missingRequired.join(", ")}.`,
    );
  }

  return record as unknown as ReleaseMetadata;
}
