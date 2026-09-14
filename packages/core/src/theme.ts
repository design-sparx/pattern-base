export interface DesignTokens {
  colors: {
    background: string;
    foreground: string;
    card: string;
    cardForeground: string;
    popover: string;
    popoverForeground: string;
    primary: string;
    primaryForeground: string;
    secondary: string;
    secondaryForeground: string;
    muted: string;
    mutedForeground: string;
    accent: string;
    accentForeground: string;
    destructive: string;
    destructiveForeground: string;
    border: string;
    input: string;
    ring: string;
    chart1: string;
    chart2: string;
    chart3: string;
    chart4: string;
    chart5: string;
  };
  radius: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  fonts: {
    sans: string;
    heading: string;
    mono: string;
  };
}

export const lightTokens: DesignTokens = {
  colors: {
    background: "oklch(1 0 0)",
    foreground: "oklch(0.145 0 0)",
    card: "oklch(1 0 0)",
    cardForeground: "oklch(0.145 0 0)",
    popover: "oklch(1 0 0)",
    popoverForeground: "oklch(0.145 0 0)",
    primary: "oklch(0.841 0.238 128.85)",
    primaryForeground: "oklch(0.21 0.031 131.063)",
    secondary: "oklch(0.967 0.001 286.375)",
    secondaryForeground: "oklch(0.21 0.006 285.885)",
    muted: "oklch(0.97 0 0)",
    mutedForeground: "oklch(0.556 0 0)",
    accent: "oklch(0.97 0 0)",
    accentForeground: "oklch(0.205 0 0)",
    destructive: "oklch(0.577 0.245 27.325)",
    destructiveForeground: "oklch(0.985 0 0)",
    border: "oklch(0.922 0 0)",
    input: "oklch(0.922 0 0)",
    ring: "oklch(0.708 0 0)",
    chart1: "oklch(0.897 0.196 126.665)",
    chart2: "oklch(0.768 0.233 130.85)",
    chart3: "oklch(0.648 0.2 131.684)",
    chart4: "oklch(0.532 0.157 131.589)",
    chart5: "oklch(0.453 0.124 130.933)",
  },
  radius: {
    sm: "calc(0.625rem * 0.6)",
    md: "calc(0.625rem * 0.8)",
    lg: "0.625rem",
    xl: "calc(0.625rem * 1.4)",
  },
  fonts: {
    sans: "var(--font-family)",
    heading: "var(--font-family-heading)",
    mono: "var(--font-family-mono)",
  },
};

export const darkTokens: DesignTokens = {
  colors: {
    background: "oklch(0.145 0 0)",
    foreground: "oklch(0.985 0 0)",
    card: "oklch(0.205 0 0)",
    cardForeground: "oklch(0.985 0 0)",
    popover: "oklch(0.205 0 0)",
    popoverForeground: "oklch(0.985 0 0)",
    primary: "oklch(0.768 0.233 130.85)",
    primaryForeground: "oklch(0.21 0.031 131.063)",
    secondary: "oklch(0.274 0.006 286.033)",
    secondaryForeground: "oklch(0.985 0 0)",
    muted: "oklch(0.269 0 0)",
    mutedForeground: "oklch(0.708 0 0)",
    accent: "oklch(0.269 0 0)",
    accentForeground: "oklch(0.985 0 0)",
    destructive: "oklch(0.704 0.191 22.216)",
    destructiveForeground: "oklch(0.985 0 0)",
    border: "oklch(1 0 0 / 10%)",
    input: "oklch(1 0 0 / 15%)",
    ring: "oklch(0.556 0 0)",
    chart1: "oklch(0.897 0.196 126.665)",
    chart2: "oklch(0.768 0.233 130.85)",
    chart3: "oklch(0.648 0.2 131.684)",
    chart4: "oklch(0.532 0.157 131.589)",
    chart5: "oklch(0.453 0.124 130.933)",
  },
  radius: {
    sm: "calc(0.625rem * 0.6)",
    md: "calc(0.625rem * 0.8)",
    lg: "0.625rem",
    xl: "calc(0.625rem * 1.4)",
  },
  fonts: {
    sans: "var(--font-family)",
    heading: "var(--font-family-heading)",
    mono: "var(--font-family-mono)",
  },
};
