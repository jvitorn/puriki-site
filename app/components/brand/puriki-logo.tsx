import horizontalDark from "../../../assets/brand/svg/puriki-horizontal-dark.svg";
import markDark from "../../../assets/brand/svg/puriki-mark-dark.svg";

// Official brand SVGs, imported through Vite so only what's actually used
// ships (hashed, BASE_PATH-aware asset URLs) — no full `assets/` copy goes
// to production. The "-dark" variants are the ones drawn for a dark
// background (verified by rendering both dark/light variants against
// dark and light backgrounds), matching this site's dark-only theme.
const SOURCES = {
  horizontal: horizontalDark,
  mark: markDark,
} as const;

// Intrinsic aspect ratio (from each SVG's own viewBox), passed through as
// HTML `width`/`height` so the browser can reserve the correct box before
// the stylesheet loads (Lighthouse "Image elements do not have explicit
// width and height") — the actual rendered size still comes entirely from
// the Tailwind classes callers pass (e.g. `h-7 w-auto`), never from these.
const DIMENSIONS = {
  horizontal: { width: 1362, height: 373 },
  mark: { width: 1147, height: 1146 },
} as const;

interface PurikiLogoProps {
  variant?: keyof typeof SOURCES;
  className?: string;
  /**
   * Set to false only when this logo is not already paired with a
   * "Puriki" accessible name from a surrounding element (e.g. a link with
   * its own `aria-label`). Defaults to true (decorative/redundant) since
   * every current usage sits inside such a link.
   */
  decorative?: boolean;
}

export function PurikiLogo({
  variant = "horizontal",
  className,
  decorative = true,
}: PurikiLogoProps) {
  return (
    <img
      alt={decorative ? "" : "Puriki"}
      aria-hidden={decorative ? "true" : undefined}
      className={className}
      src={SOURCES[variant]}
      {...DIMENSIONS[variant]}
    />
  );
}
