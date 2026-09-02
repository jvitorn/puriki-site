import type { Config } from "@react-router/dev/config";

function normalizeBasePath(value: string): string {
  const withLeadingSlash = value.startsWith("/") ? value : `/${value}`;
  return withLeadingSlash.endsWith("/")
    ? withLeadingSlash
    : `${withLeadingSlash}/`;
}

const basePath = normalizeBasePath(
  process.env.BASE_PATH || process.env.VITE_BASE_PATH || "/",
);

export default {
  basename: basePath,
  ssr: false,
  prerender: true,
} satisfies Config;
