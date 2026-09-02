import { writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";
import { parseGitHubRelease } from "../app/lib/releases/parse-github-release";
import type { ReleaseMetadata } from "../app/lib/releases/types";

const REPO_OWNER = "jvitorn";
const REPO_NAME = "purikuki";
const LATEST_RELEASE_API_URL = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/releases/latest`;
const REQUEST_TIMEOUT_MS = 15_000;

const outputPath = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
  "app/generated/release.json",
);

/**
 * `GET /releases/latest` already excludes drafts and prereleases and
 * returns 404 when the repository has no such release — exactly the
 * semantics of our "no stable release" state. Anything else that goes
 * wrong (timeout, unexpected status, invalid JSON) throws, so this script
 * — and the workflow step running it — fails loudly instead of silently
 * writing `{ available: false }` over a technical error.
 */
async function fetchLatestRelease(): Promise<unknown> {
  // Server/build-side only: GITHUB_TOKEN (Actions) or a developer-local,
  // non-Vite env var. Never a VITE_*-prefixed variable — this must never
  // reach the browser bundle.
  const token = process.env.GITHUB_TOKEN || process.env.RELEASE_FETCH_TOKEN;

  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  let response: Response;
  try {
    response = await fetch(LATEST_RELEASE_API_URL, {
      headers,
      signal: controller.signal,
    });
  } catch (error) {
    throw new Error(
      `Failed to reach the GitHub API (${LATEST_RELEASE_API_URL}): ${
        error instanceof Error ? error.message : String(error)
      }`,
      { cause: error },
    );
  } finally {
    clearTimeout(timeout);
  }

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error(
      `GitHub API returned an unexpected status: ${response.status} ${response.statusText}`,
    );
  }

  try {
    return await response.json();
  } catch (error) {
    throw new Error("GitHub API response was not valid JSON.", { cause: error });
  }
}

async function main() {
  const raw = await fetchLatestRelease();
  const metadata: ReleaseMetadata = parseGitHubRelease(raw);

  await writeFile(outputPath, `${JSON.stringify(metadata, null, 2)}\n`, "utf8");

  if (metadata.available) {
    console.log(
      `release:fetch — wrote v${metadata.version} (${metadata.fileName}, ${metadata.sizeBytes} bytes).`,
    );
  } else {
    console.log(
      "release:fetch — no stable release published yet; wrote { available: false }.",
    );
  }
}

main().catch((error: unknown) => {
  console.error(
    "release:fetch failed:",
    error instanceof Error ? error.message : error,
  );
  process.exitCode = 1;
});
