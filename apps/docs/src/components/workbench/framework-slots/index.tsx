"use client";

import dynamic from "next/dynamic";

import { PreviewSkeleton } from "../preview-skeleton";

export const LazyBootstrapSlot = dynamic(
  () => import("./bootstrap-slot").then((m) => ({ default: m.BootstrapSlot })),
  { loading: () => <PreviewSkeleton /> },
);

export const LazyAntdSlot = dynamic(
  () => import("./antd-slot").then((m) => ({ default: m.AntdSlot })),
  { loading: () => <PreviewSkeleton /> },
);

export const LazyMantineSlot = dynamic(
  () => import("./mantine-slot").then((m) => ({ default: m.MantineSlot })),
  { loading: () => <PreviewSkeleton /> },
);

/** Fetches the inactive framework chunks during browser idle time. */
export function preloadInactiveSlots(active: "bootstrap" | "antd" | "mantine") {
  const targets = [
    { name: "bootstrap", load: () => import("./bootstrap-slot") },
    { name: "antd", load: () => import("./antd-slot") },
    { name: "mantine", load: () => import("./mantine-slot") },
  ];
  const schedule =
    typeof window !== "undefined" && "requestIdleCallback" in window
      ? window.requestIdleCallback.bind(window)
      : (cb: () => void) => window.setTimeout(cb, 200);

  targets.forEach(({ name, load }) => {
    if (name === active) return;
    schedule(() => void load());
  });
}
