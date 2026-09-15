import type { ThemeConfig } from "antd";

import type { DesignTokens } from "@patternbase/core";

export interface AntdThemeOptions {
  tokens: DesignTokens;
  colorScheme: "light" | "dark";
}

export function getAntdTheme(options: AntdThemeOptions): ThemeConfig {
  const { tokens, colorScheme } = options;
  const isDark = colorScheme === "dark";
  const primary = tokens.colors.primary;
  const primaryForeground = tokens.colors.primaryForeground;

  return {
    token: {
      colorPrimary: primary,
      colorPrimaryHover: isDark
        ? primary
        : `color-mix(in oklab, ${primary} 88%, transparent)`,
      colorPrimaryActive: isDark
        ? primary
        : `color-mix(in oklab, ${primary} 78%, transparent)`,
      colorPrimaryText: primaryForeground,
      colorSuccess: tokens.colors.chart2,
      colorWarning: tokens.colors.chart3,
      colorError: tokens.colors.destructive,
      colorInfo: tokens.colors.chart1,
      colorBgLayout: tokens.colors.background,
      colorBgContainer: tokens.colors.card,
      colorBgElevated: tokens.colors.popover,
      colorText: tokens.colors.foreground,
      colorTextSecondary: tokens.colors.mutedForeground,
      colorTextTertiary: tokens.colors.mutedForeground,
      colorTextQuaternary: tokens.colors.mutedForeground,
      colorBorder: tokens.colors.border,
      colorBorderSecondary: tokens.colors.border,
      colorFillTertiary: tokens.colors.muted,
      borderRadius: 10,
      borderRadiusSM: 6,
      borderRadiusLG: 10,
      borderRadiusXL: 14,
      fontFamily: tokens.fonts.sans,
    },
    algorithm: isDark ? "darkAlgorithm" : "defaultAlgorithm",
  } as unknown as ThemeConfig;
}
