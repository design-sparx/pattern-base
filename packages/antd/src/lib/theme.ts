import type { ThemeConfig } from "antd";

import type { DesignTokens } from "@patternbase/core";

export interface AntdThemeOptions {
  tokens: DesignTokens;
  colorScheme: "light" | "dark";
}

export function getAntdTheme(options: AntdThemeOptions): ThemeConfig {
  const { tokens, colorScheme } = options;
  const isDark = colorScheme === "dark";

  return {
    token: {
      colorPrimary: "var(--primary)",
      colorPrimaryHover: isDark
        ? "var(--primary)"
        : "color-mix(in oklab, var(--primary) 88%, transparent)",
      colorPrimaryActive: isDark
        ? "var(--primary)"
        : "color-mix(in oklab, var(--primary) 78%, transparent)",
      colorPrimaryText: "var(--primary-foreground)",
      colorSuccess: "var(--chart-2)",
      colorWarning: "var(--chart-3)",
      colorError: "var(--destructive)",
      colorInfo: "var(--chart-1)",
      colorBgLayout: "var(--background)",
      colorBgContainer: "var(--card)",
      colorBgElevated: "var(--popover)",
      colorText: "var(--foreground)",
      colorTextSecondary: "var(--muted-foreground)",
      colorTextTertiary: "var(--muted-foreground)",
      colorTextQuaternary: "var(--muted-foreground)",
      colorBorder: "var(--border)",
      colorBorderSecondary: "var(--border)",
      colorFillTertiary: "var(--muted)",
      borderRadius: 10,
      borderRadiusSM: 6,
      borderRadiusLG: 10,
      borderRadiusXL: 14,
      fontFamily: tokens.fonts.sans,
    },
    algorithm: isDark ? "darkAlgorithm" : "defaultAlgorithm",
  } as unknown as ThemeConfig;
}
