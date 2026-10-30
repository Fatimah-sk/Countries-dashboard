import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  base: "/Countries-dashboard/",

  build: {
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, "index.html"),
        details: resolve(import.meta.dirname, "details.html"),
      },
    },
  },
});