import { copyFileSync } from "node:fs";
import { resolve } from "node:path";
import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["cjs", "esm"],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  external: ["react", "react-dom"],
  alias: { "@": resolve(__dirname, "src") },
  onSuccess: () => copyFileSync("src/styles.css", "dist/styles.css"),
});
