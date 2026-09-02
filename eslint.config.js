import eslint from "@eslint/js";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: ["build", ".react-router", "node_modules"] },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["**/*.{ts,tsx}"],
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": "warn",
    },
  },
  {
    files: ["app/root.tsx", "app/routes/**/*.{ts,tsx}"],
    rules: {
      // Route modules conventionally export `handle`/`meta`/`loader`
      // alongside the default component; that's the React Router
      // framework-mode contract, not a Fast Refresh problem.
      "react-refresh/only-export-components": "off",
    },
  },
);
