import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
    setupFiles: ["./tests/setup.ts"],
    // axe-core over a full rendered page (see tests/a11y/axe-smoke.test.tsx)
    // is CPU-heavy and can exceed the 5s default under full-suite parallel
    // load (e.g. shared CI runners), even though it runs in ~1.3s in
    // isolation. A more generous timeout keeps that suite reliable without
    // masking a real hang.
    testTimeout: 15_000,
  },
});
