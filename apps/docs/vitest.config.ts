import path from "node:path";

import { defineConfig, mergeConfig } from "vitest/config";

import baseConfig from "@patternbase/vitest-config";

export default mergeConfig(
  baseConfig,
  defineConfig({
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
  }),
);
