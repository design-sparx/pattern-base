import { defineConfig, mergeConfig } from "vitest/config";
import baseConfig from "@ai-ui/vitest-config";

export default mergeConfig(
  baseConfig,
  defineConfig({
    test: {
      environment: "jsdom",
      setupFiles: [require.resolve("@ai-ui/vitest-config/setup")],
    },
  }),
);
