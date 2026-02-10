"use client";

import { AppShell, Box } from "@mantine/core";
import type { ReactNode } from "react";

import { AsideProvider, useAside } from "./aside-context";
import { Footer } from "./footer";
import { Header } from "./header";
import { Sidebar } from "./sidebar";

function ShellContent({ children }: { children: ReactNode }) {
  const { content: asideContent } = useAside();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 260, breakpoint: "sm" }}
      aside={{
        width: 200,
        breakpoint: "lg",
        collapsed: { desktop: !asideContent, mobile: true },
      }}
      padding={0}
    >
      <AppShell.Header
        style={{
          borderBottom: "1px solid var(--mantine-color-default-border)",
        }}
      >
        <Header />
      </AppShell.Header>

      <AppShell.Navbar>
        <Sidebar />
      </AppShell.Navbar>

      {asideContent ? (
        <AppShell.Aside p="md" pt="xl">
          {asideContent}
        </AppShell.Aside>
      ) : null}

      <AppShell.Main
        style={{
          display: "flex",
          flexDirection: "column",
          minHeight: "calc(100vh - 60px)",
        }}
      >
        <Box style={{ flex: 1 }}>{children}</Box>
        <Footer />
      </AppShell.Main>
    </AppShell>
  );
}

export function AppShellLayout({ children }: { children: ReactNode }) {
  return (
    <AsideProvider>
      <ShellContent>{children}</ShellContent>
    </AsideProvider>
  );
}
