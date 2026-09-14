"use client";

import { MantineProvider } from "@mantine/core";
import { useTheme } from "next-themes";

import { mantineRegistry } from "@/lib/registry/mantine";

interface SlotProps {
  patternId: string;
}

export function MantineSlot({ patternId }: SlotProps) {
  const { resolvedTheme } = useTheme();
  const colorScheme = resolvedTheme === "dark" ? "dark" : "light";
  const Component = mantineRegistry[patternId];
  if (!Component) return null;

  return (
    <MantineProvider defaultColorScheme={colorScheme}>
      <Component />
    </MantineProvider>
  );
}
