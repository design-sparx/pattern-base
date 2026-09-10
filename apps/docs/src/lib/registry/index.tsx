"use client";

import type * as React from "react";

import { antdRegistry } from "./antd";
import { bootstrapRegistry } from "./bootstrap";
import { mantineRegistry } from "./mantine";
import { shadcnRegistry } from "./shadcn";

export interface RegistryEntry {
  bootstrap: React.ComponentType;
  antd: React.ComponentType;
  mantine: React.ComponentType;
  shadcn: React.ComponentType;
}

const ids = [
  ...new Set([
    ...Object.keys(bootstrapRegistry),
    ...Object.keys(antdRegistry),
    ...Object.keys(mantineRegistry),
    ...Object.keys(shadcnRegistry),
  ]),
];

export const componentRegistry: Record<string, RegistryEntry> =
  Object.fromEntries(
    ids.flatMap((id) => {
      const bootstrap = bootstrapRegistry[id];
      const antd = antdRegistry[id];
      const mantine = mantineRegistry[id];
      const shadcn = shadcnRegistry[id];
      return bootstrap && antd && mantine && shadcn
        ? [[id, { bootstrap, antd, mantine, shadcn }]]
        : [];
    }),
  );
