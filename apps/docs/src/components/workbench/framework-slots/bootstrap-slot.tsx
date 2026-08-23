"use client";

import { useMantineColorScheme } from "@mantine/core";

import { bootstrapRegistry } from "@/lib/registry/bootstrap";

interface SlotProps {
  patternId: string;
}

export function BootstrapSlot({ patternId }: SlotProps) {
  const { colorScheme } = useMantineColorScheme();
  const Component = bootstrapRegistry[patternId];
  if (!Component) return null;
  return (
    <div data-bs-theme={colorScheme}>
      <Component />
    </div>
  );
}
