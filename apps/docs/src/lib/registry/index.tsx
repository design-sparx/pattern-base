"use client";

import type * as React from "react";

import { antdRegistry } from "./antd";
import { bootstrapRegistry } from "./bootstrap";
import { mantineRegistry } from "./mantine";

export interface RegistryEntry {
  bootstrap: React.ComponentType;
  antd: React.ComponentType;
  mantine: React.ComponentType;
}

const ids = [
  ...new Set([
    ...Object.keys(bootstrapRegistry),
    ...Object.keys(antdRegistry),
    ...Object.keys(mantineRegistry),
  ]),
];

export const componentRegistry: Record<string, RegistryEntry> =
  Object.fromEntries(
    ids.flatMap((id) => {
      const bootstrap = bootstrapRegistry[id];
      const antd = antdRegistry[id];
      const mantine = mantineRegistry[id];
      return bootstrap && antd && mantine
        ? [[id, { bootstrap, antd, mantine }]]
        : [];
    }),
  );
