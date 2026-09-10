"use client";

import { shadcnRegistry } from "@/lib/registry/shadcn";

interface SlotProps {
  patternId: string;
}

export function ShadcnSlot({ patternId }: SlotProps) {
  const Component = shadcnRegistry[patternId];
  if (!Component) return null;
  return <Component />;
}
