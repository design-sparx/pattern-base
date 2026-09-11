"use client";

import type { ReactNode } from "react";
import { useState } from "react";

import { AsideProvider, useAside } from "../aside-context";
import { Footer } from "./footer";
import { Header } from "./header";
import { Sidebar } from "./sidebar";

import { ScrollArea } from "@/components/ui/scroll-area";

function ShellContent({ children }: { children: ReactNode }) {
  const { content: asideContent } = useAside();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-col">
      <Header
        onToggleSidebar={() => {
          setSidebarOpen((o) => !o);
        }}
      />
      <div className="flex flex-1">
        <aside
          className={`fixed inset-y-0 left-0 z-40 w-[260px] transform border-r border-gray-200 bg-white transition-transform duration-200 sm:relative sm:translate-x-0 dark:border-gray-800 dark:bg-gray-900 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <ScrollArea className="h-[calc(100vh-60px)]">
            <Sidebar />
          </ScrollArea>
        </aside>
        {sidebarOpen ? (
          <div
            className="fixed inset-0 z-30 bg-black/50 sm:hidden"
            onClick={() => {
              setSidebarOpen(false);
            }}
          />
        ) : null}
        <main
          id="main-content"
          className="flex flex-1 flex-col"
          style={{ minHeight: "calc(100vh - 60px)" }}
        >
          {children}
        </main>
        {asideContent ? (
          <aside className="hidden w-[200px] border-l border-gray-200 p-4 lg:block dark:border-gray-800">
            {asideContent}
          </aside>
        ) : null}
      </div>
      <Footer />
    </div>
  );
}

export function AppShellLayout({ children }: { children: ReactNode }) {
  return (
    <AsideProvider>
      <ShellContent>{children}</ShellContent>
    </AsideProvider>
  );
}
