import { copyFile, readdir, rename, rm, stat } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const repositoryRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
);
const clientDirectory = path.join(repositoryRoot, "build", "client");
const rawBasePath = process.env.BASE_PATH || process.env.VITE_BASE_PATH || "/";
const normalizedBasePath = `/${rawBasePath}`.replace(/\/{2,}/g, "/");
const baseSegments = normalizedBasePath.split("/").filter(Boolean);

if (baseSegments.some((segment) => segment === "." || segment === "..")) {
  throw new Error(`Unsafe BASE_PATH: ${rawBasePath}`);
}

// GitHub Pages serves a physical 404.html file at the site root for any
// unmatched path. React Router prerenders the /404 route as a regular
// folder (404/index.html); copy it to the root so GitHub Pages finds it.
async function writeGitHubPages404() {
  const prerendered404 = path.join(clientDirectory, "404", "index.html");
  const destination = path.join(clientDirectory, "404.html");

  try {
    await stat(prerendered404);
  } catch (error) {
    throw new Error(
      `Expected the prerendered 404 page at ${prerendered404}.`,
      { cause: error },
    );
  }

  await copyFile(prerendered404, destination);
}

if (baseSegments.length === 0) {
  await writeGitHubPages404();
  process.exit(0);
}

const nestedOutputDirectory = path.join(clientDirectory, ...baseSegments);

try {
  const outputStats = await stat(nestedOutputDirectory);

  if (!outputStats.isDirectory()) {
    throw new Error("The basename output exists but is not a directory.");
  }
} catch (error) {
  throw new Error(
    `React Router did not generate the expected basename output at ${nestedOutputDirectory}.`,
    { cause: error },
  );
}

for (const entry of await readdir(nestedOutputDirectory)) {
  const source = path.join(nestedOutputDirectory, entry);
  const destination = path.join(clientDirectory, entry);

  try {
    await stat(destination);
    throw new Error(`Static output collision at ${destination}.`);
  } catch (error) {
    if (error instanceof Error && error.message.startsWith("Static output")) {
      throw error;
    }
  }

  await rename(source, destination);
}

await rm(nestedOutputDirectory, { recursive: true });
await writeGitHubPages404();
