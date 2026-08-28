"use client";

import { mantineRegistry } from "@/lib/registry/mantine";

interface SlotProps {
  patternId: string;
}

export function MantineSlot({ patternId }: SlotProps) {
  const Component = mantineRegistry[patternId];
  if (!Component) return null;
  return <Component />;
}
