import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { getContent } from "../../app/content";
import type { ReleaseMetadata } from "../../app/lib/releases/types";
import { RoadmapSection } from "../../app/sections/roadmap-section";

const UNAVAILABLE: ReleaseMetadata = { available: false };
const AVAILABLE: ReleaseMetadata = {
  available: true,
  version: "1.0.0",
  publishedAt: "2026-08-15T10:00:00Z",
  fileName: "puriki-1.0.0-android.apk",
  sizeBytes: 24_300_000,
  downloadUrl: "https://example.invalid/puriki-1.0.0-android.apk",
  releaseUrl: "https://example.invalid/releases/tag/v1.0.0",
  sha256: null,
};

describe("RoadmapSection — 1.0 status derived from release state", () => {
  it("shows the in-preparation status before a stable release exists", () => {
    const content = getContent("pt-BR");
    render(<RoadmapSection content={content.roadmap} release={UNAVAILABLE} />);

    expect(screen.getByText(new RegExp(content.roadmap.items[0].status))).toBeInTheDocument();
    expect(
      screen.queryByText(new RegExp(content.roadmap.foundationAvailableStatus)),
    ).not.toBeInTheDocument();
  });

  it("shows the available status once a stable release exists", () => {
    const content = getContent("en");
    render(<RoadmapSection content={content.roadmap} release={AVAILABLE} />);

    expect(
      screen.getByText(new RegExp(content.roadmap.foundationAvailableStatus)),
    ).toBeInTheDocument();
  });

  it("never derives the 2.0 or 3.0 status from release state", () => {
    const content = getContent("es");
    render(<RoadmapSection content={content.roadmap} release={AVAILABLE} />);

    expect(screen.getByText(new RegExp(content.roadmap.items[1].status))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(content.roadmap.items[2].status))).toBeInTheDocument();
  });

  it("keeps exactly three roadmap list items", () => {
    const content = getContent("pt-BR");
    render(<RoadmapSection content={content.roadmap} release={UNAVAILABLE} />);

    expect(screen.getAllByRole("listitem")).toHaveLength(3);
  });

  it("links to the real product/engineering roadmap document, not a repo anchor", () => {
    const content = getContent("pt-BR");
    render(<RoadmapSection content={content.roadmap} release={UNAVAILABLE} />);

    const cta = screen.getByRole("link", { name: content.roadmap.cta });
    expect(cta).toHaveAttribute(
      "href",
      "https://github.com/jvitorn/purikuki/blob/master/PURIKI_PRODUCT_ENGINEERING_ROADMAP.md",
    );
  });
});
