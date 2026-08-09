import { defineConfig, mergeConfig } from "vitest/config";
import baseConfig from "@patternbase/vitest-config";

export default mergeConfig(
  baseConfig,
  defineConfig({
    test: {
      environment: "jsdom",
      setupFiles: [require.resolve("@patternbase/vitest-config/setup")],
    },
  }),
);
