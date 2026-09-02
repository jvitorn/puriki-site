/**
 * Section ids rendered on the Home page scaffold. Centralized so navigation,
 * footer and content link builders never hand-write a `#fragment` string.
 */
export const HOME_ANCHORS = [
  "providers",
  "benefits",
  "showcases",
  "privacy-summary",
  "open-source",
  "roadmap",
  "download",
  "faq",
] as const;

export type HomeAnchor = (typeof HOME_ANCHORS)[number];
