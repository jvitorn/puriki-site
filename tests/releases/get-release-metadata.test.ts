import { describe, expect, it } from "vitest";
import { getReleaseMetadata } from "../../app/lib/releases";

describe("getReleaseMetadata", () => {
  it("reads the committed generated/release.json without any network access", () => {
    // This asserts today's real, honest state: jvitorn/purikuki has no
    // stable release yet. If this ever fails because someone hand-edited
    // app/generated/release.json to a fake `available: true`, that is the
    // point of the test — it should fail.
    expect(getReleaseMetadata()).toEqual({ available: false });
  });
});
