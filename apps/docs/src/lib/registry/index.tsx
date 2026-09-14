"use client";

import type * as React from "react";

import { antdRegistry } from "./antd";
import { mantineRegistry } from "./mantine";
import { shadcnRegistry } from "./shadcn";

export interface RegistryEntry {
  mantine: React.ComponentType;
  antd: React.ComponentType;
  shadcn: React.ComponentType;
}

const ids = [
  ...new Set([
    ...Object.keys(mantineRegistry),
    ...Object.keys(antdRegistry),
    ...Object.keys(shadcnRegistry),
  ]),
];

export const componentRegistry: Record<string, RegistryEntry> =
  Object.fromEntries(
    ids.flatMap((id) => {
      const mantine = mantineRegistry[id];
      const antd = antdRegistry[id];
      const shadcn = shadcnRegistry[id];
      return mantine && antd && shadcn ? [[id, { mantine, antd, shadcn }]] : [];
    }),
  );

export const registry = componentRegistry;
