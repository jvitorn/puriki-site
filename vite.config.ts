import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

function normalizeBasePath(value: string): string {
  const withLeadingSlash = value.startsWith("/") ? value : `/${value}`;
  return withLeadingSlash.endsWith("/")
    ? withLeadingSlash
    : `${withLeadingSlash}/`;
}

const basePath = normalizeBasePath(
  process.env.BASE_PATH || process.env.VITE_BASE_PATH || "/",
);
const siteUrl = process.env.SITE_URL || process.env.VITE_SITE_URL;

export default defineConfig({
  base: basePath,
  define: siteUrl
    ? { "import.meta.env.VITE_SITE_URL": JSON.stringify(siteUrl) }
    : undefined,
  plugins: [tailwindcss(), reactRouter()],
});
