import { describe, expect, it } from "vitest";
import { formatFileSize, formatReleaseDate } from "../../app/lib/releases/format";

describe("formatFileSize", () => {
  it("formats megabyte-scale sizes with one decimal", () => {
    expect(formatFileSize(24_300_000, "en")).toBe("24.3 MB");
  });

  it("formats byte-scale sizes with no decimals", () => {
    expect(formatFileSize(500, "en")).toBe("500 byte");
  });

  it("formats gigabyte-scale sizes", () => {
    expect(formatFileSize(2_500_000_000, "en")).toBe("2.5 GB");
  });

  it("uses the locale's number formatting conventions", () => {
    // pt-BR uses a comma as the decimal separator.
    expect(formatFileSize(24_300_000, "pt-BR")).toBe("24,3 MB");
  });
});

describe("formatReleaseDate", () => {
  it("formats a date in long form per locale", () => {
    expect(formatReleaseDate("2026-08-15T10:00:00Z", "en")).toBe(
      "August 15, 2026",
    );
    expect(formatReleaseDate("2026-08-15T10:00:00Z", "pt-BR")).toBe(
      "15 de agosto de 2026",
    );
    expect(formatReleaseDate("2026-08-15T10:00:00Z", "es")).toBe(
      "15 de agosto de 2026",
    );
  });
});
