"use client";

import { createTheme, rem } from "@mantine/core";

export const theme = createTheme({
  primaryColor: "violet",
  primaryShade: { light: 6, dark: 5 },
  fontFamily:
    'var(--font-geist), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  fontFamilyMonospace:
    "var(--font-geist-mono), ui-monospace, SFMono-Regular, monospace",
  headings: {
    fontFamily:
      'var(--font-space-grotesk), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontWeight: "700",
  },
  defaultRadius: "md",
  colors: {
    violet: [
      "#f3f0ff",
      "#e5dbff",
      "#d0bfff",
      "#b197fc",
      "#9775fa",
      "#845ef7",
      "#7048e8",
      "#6741d9",
      "#5f3dc4",
      "#5235ab",
    ],
  },
  focusRing: "auto",
  components: {
    Button: {
      defaultProps: {
        radius: "md",
      },
    },
    Paper: {
      defaultProps: {
        radius: "md",
      },
    },
    Badge: {
      defaultProps: {
        radius: "sm",
      },
    },
    Tabs: {
      styles: {
        tab: {
          fontWeight: 500,
          fontSize: rem(14),
        },
      },
    },
    ActionIcon: {
      defaultProps: {
        radius: "md",
      },
    },
  },
});
