import type { DesignTokens } from "@patternbase/core";

export interface MantineThemeOptions {
  tokens: DesignTokens;
  colorScheme: "light" | "dark";
}

export function getMantineTheme(options: MantineThemeOptions) {
  const { tokens, colorScheme } = options;
  const isDark = colorScheme === "dark";

  return {
    primaryColor: "brand",
    primaryShade: isDark ? { light: 3, dark: 3 } : { light: 6, dark: 6 },
    fontFamily: tokens.fonts.sans,
    fontFamilyMonospace: tokens.fonts.mono,
    borderRadius: {
      xs: tokens.radius.sm,
      sm: tokens.radius.sm,
      md: tokens.radius.md,
      lg: tokens.radius.lg,
      xl: tokens.radius.xl,
    },
    defaultRadius: tokens.radius.lg,
    colors: {
      brand: [
        tokens.colors.primary,
        tokens.colors.primary,
        tokens.colors.primary,
        tokens.colors.primary,
        tokens.colors.primary,
        tokens.colors.primary,
        tokens.colors.primary,
        tokens.colors.primary,
        tokens.colors.primary,
        tokens.colors.primary,
      ] as const,
    },
  };
}
