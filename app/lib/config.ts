const DEFAULT_SITE_URL = "http://localhost:5173";
const DEFAULT_BASE_PATH = "/";

function normalizeBasePath(value: string): string {
  const withLeadingSlash = value.startsWith("/") ? value : `/${value}`;
  return withLeadingSlash.endsWith("/")
    ? withLeadingSlash
    : `${withLeadingSlash}/`;
}

export const siteConfig = {
  siteUrl: import.meta.env.VITE_SITE_URL || DEFAULT_SITE_URL,
  basePath: normalizeBasePath(
    import.meta.env.VITE_BASE_PATH || DEFAULT_BASE_PATH,
  ),
} as const;
