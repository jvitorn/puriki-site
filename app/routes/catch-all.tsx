// Client-side fallback for any unmatched path once the app is hydrated.
// The static /404.html served by GitHub Pages is produced from
// routes/not-found.tsx via scripts/prepare-static-output.mjs.
export { default, handle, meta } from "./not-found";
