"use client";

import { MantineProvider } from "@mantine/core";
import { useTheme } from "next-themes";

import { darkTokens, lightTokens } from "@patternbase/core";
import { getMantineTheme } from "@patternbase/mantine";

import { mantineRegistry } from "@/lib/registry/mantine";

interface SlotProps {
  patternId: string;
}

export function MantineSlot({ patternId }: SlotProps) {
  const { resolvedTheme } = useTheme();
  const colorScheme = resolvedTheme === "dark" ? "dark" : "light";
  const Component = mantineRegistry[patternId];
  if (!Component) return null;
  const tokens = colorScheme === "dark" ? darkTokens : lightTokens;

  return (
    <MantineProvider
      defaultColorScheme={colorScheme}
      theme={
        getMantineTheme({ tokens, colorScheme }) as Parameters<
          typeof MantineProvider
        >[0]["theme"]
      }
    >
      <Component />
    </MantineProvider>
  );
}
