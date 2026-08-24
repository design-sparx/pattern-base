"use client";

import { AppShell, Box } from "@mantine/core";
import type { ReactNode } from "react";

import { AsideProvider, useAside } from "../aside-context";
import { Footer } from "./footer";
import { Header } from "./header";
import { Sidebar } from "./sidebar";

function ShellContent({ children }: Readonly<{ children: ReactNode }>) {
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
      footer={{ height: 60 }}
      padding={0}
    >
      <AppShell.Header>
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
        id="main-content"
        style={{
          display: "flex",
          flexDirection: "column",
          minHeight: "calc(100vh - 60px)",
        }}
      >
        <Box style={{ flex: 1 }}>{children}</Box>
      </AppShell.Main>
      <AppShell.Footer p="md">
        <Footer />
      </AppShell.Footer>
    </AppShell>
  );
}

export function AppShellLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <AsideProvider>
      <ShellContent>{children}</ShellContent>
    </AsideProvider>
  );
}
