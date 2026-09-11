"use client";

import type { ReactNode } from "react";
import { PublicHeader } from "./public-header";

export function PublicShellLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <PublicHeader />
      <main className="flex-1">{children}</main>
    </div>
  );
}
