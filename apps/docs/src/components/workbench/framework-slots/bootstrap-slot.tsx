"use client";

import { useTheme } from "next-themes";

import { bootstrapRegistry } from "@/lib/registry/bootstrap";

interface SlotProps {
  patternId: string;
}

export function BootstrapSlot({ patternId }: SlotProps) {
  const { resolvedTheme } = useTheme();
  const colorScheme = resolvedTheme === "dark" ? "dark" : "light";
  const Component = bootstrapRegistry[patternId];
  if (!Component) return null;
  return (
    <div data-bs-theme={colorScheme}>
      <Component />
    </div>
  );
}
