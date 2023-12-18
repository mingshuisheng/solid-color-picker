import { defineConfig } from "vite";
import solid from "vite-plugin-solid";
import typescript from "@rollup/plugin-typescript";

export default defineConfig({
  plugins: [solid()],
  build: {
    target: "esnext",
    lib: {
      entry: "./src/libs.ts",
      formats: ["es"],
      name: "libs",
      fileName: "libs",
    },
    rollupOptions: {
      external: ["solid-js", "solid-js/web"],
      output: {
        globals: {
          "solid-js": "solid-js",
          "solid-js/web": "solid-js/web",
        },
      },
      plugins: [
        typescript({
          rootDir: "./src",
          exclude: ["index.tsx", "pages/*.tsx"],
        }),
      ],
    },
  },
});
