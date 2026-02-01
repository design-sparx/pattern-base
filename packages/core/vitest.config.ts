import { defineConfig, mergeConfig } from "vitest/config";
import baseConfig from "@ai-ui/vitest-config";

export default mergeConfig(
  baseConfig,
  defineConfig({
    test: {
      environment: "node",
    },
  }),
);
