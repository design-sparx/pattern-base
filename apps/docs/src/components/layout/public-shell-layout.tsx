"use client";

import { AppShell, Box } from "@mantine/core";
import type { ReactNode } from "react";

import { AsideProvider, useAside } from "./aside-context";
import { PublicHeader } from "./public-header";

function PublicShellContent({ children }: Readonly<{ children: ReactNode }>) {
  const { content: asideContent } = useAside();

  return (
    <AppShell
      header={{ height: 60 }}
      aside={{
        width: 200,
        breakpoint: "lg",
        collapsed: { desktop: !asideContent, mobile: true },
      }}
      padding={0}
    >
      <AppShell.Header>
        <PublicHeader />
      </AppShell.Header>

      {asideContent ? (
        <AppShell.Aside p="md" pt="xl">
          {asideContent}
        </AppShell.Aside>
      ) : null}

      <AppShell.Main
        id="main-content"
        style={{
          display: "flex",
          flexDirection: "column",
          minHeight: "calc(100vh - 60px)",
        }}
      >
        <Box style={{ flex: 1 }}>{children}</Box>
      </AppShell.Main>
    </AppShell>
  );
}

export function PublicShellLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <AsideProvider>
      <PublicShellContent>{children}</PublicShellContent>
    </AsideProvider>
  );
}
