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
    />
  );
}
