"use client";

import dynamic from "next/dynamic";

import { PreviewSkeleton } from "../preview-skeleton";

import { type Framework } from "@/lib/workbench-params";

export const LazyMantineSlot = dynamic(
  () => import("./mantine-slot").then((m) => ({ default: m.MantineSlot })),
  { loading: () => <PreviewSkeleton /> },
);

export const LazyAntdSlot = dynamic(
  () => import("./antd-slot").then((m) => ({ default: m.AntdSlot })),
  { loading: () => <PreviewSkeleton /> },
);

export const LazyShadcnSlot = dynamic(
  () => import("./shadcn-slot").then((m) => ({ default: m.ShadcnSlot })),
  { loading: () => <PreviewSkeleton /> },
);

/** Fetches the inactive framework chunks during browser idle time. */
export function preloadInactiveSlots(active: Framework) {
  if (typeof window === "undefined") return;
  const targets = [
    { name: "mantine", load: () => import("./mantine-slot") },
    { name: "antd", load: () => import("./antd-slot") },
    { name: "shadcn", load: () => import("./shadcn-slot") },
  ];
  const schedule =
    "requestIdleCallback" in window
      ? window.requestIdleCallback.bind(window)
      : (cb: () => void) => window.setTimeout(cb, 200);

  targets.forEach(({ name, load }) => {
    if (name === active) return;
    schedule(() => void load().catch(() => undefined));
  });
}
