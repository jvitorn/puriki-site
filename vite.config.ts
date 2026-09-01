import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

export default defineConfig({
  base: process.env.BASE_PATH || process.env.VITE_BASE_PATH || "/",
  plugins: [tailwindcss(), reactRouter()],
});
