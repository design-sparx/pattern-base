import { resolve } from "node:path";
import { defineConfig, mergeConfig } from "vitest/config";
import baseConfig from "@patternbase/vitest-config";

export default mergeConfig(
  baseConfig,
  defineConfig({
    test: {
      environment: "jsdom",
      setupFiles: [
        require.resolve("@patternbase/vitest-config/setup"),
        resolve(__dirname, "src", "test", "setup.ts"),
      ],
      passWithNoTests: true,
    },
    resolve: {
      alias: { "@": resolve(__dirname, "src") },
    },
  }),
);
