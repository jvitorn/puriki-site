import { describe, expect, it } from "vitest";
import { getReleaseMetadata } from "../../app/lib/releases";

describe("getReleaseMetadata", () => {
  it("reads the committed generated/release.json without any network access", () => {
    // jvitorn/puriki does have a real stable release (v1.0.0+), but the
    // committed baseline here is deliberately `{ "available": false }` —
    // this is a build-time input, not a live mirror of GitHub. It exists
    // so `pnpm build`/`pnpm test` run fully offline and deterministically
    // (no GitHub API call, no rate limit, no flake from an external
    // outage). The production deploy workflow always runs
    // `pnpm release:fetch` before building, which overwrites this file
    // with the real latest release; this baseline is restored afterward.
    // `available: true` behavior is covered separately by fixtures — see
    // validate-release-metadata.test.ts and get-required-release-artifact.test.ts.
    // If this test ever fails because someone hand-edited
    // app/generated/release.json to a fake `available: true` and committed
    // it, that is the point of the test — it should fail.
    expect(getReleaseMetadata()).toEqual({ available: false });
  });
});
