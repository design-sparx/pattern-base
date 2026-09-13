"use client";

import {
  IconInfoCircle,
  IconLayoutSidebar,
  IconSparkles,
} from "@tabler/icons-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

import { Footer } from "./footer";
import { Header } from "./header";
import { SidebarNav } from "./sidebar";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  useSidebar,
} from "@/components/ui/sidebar";

function ShellSidebarFooter() {
  const pathname = usePathname();
  const { toggleSidebar } = useSidebar();

  return (
    <SidebarFooter>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton
            onClick={toggleSidebar}
            tooltip="Collapse sidebar"
            className="hidden lg:inline-flex"
          >
            <IconLayoutSidebar />
            <span>Collapse</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <SidebarMenuButton
            asChild
            isActive={pathname === "/about"}
            tooltip="About"
          >
            <Link href="/about">
              <IconInfoCircle />
              <span>About</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  );
}

function ShellContent({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <SidebarProvider className="app-canvas h-svh overflow-hidden">
      <Sidebar collapsible="icon" variant="floating">
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" asChild>
                <Link href="/" aria-label="PatternBase home">
                  <IconSparkles className="text-sidebar-primary" />
                  <span className="font-semibold">PatternBase</span>
                  <span className="text-muted-foreground ml-auto font-mono text-xs">
                    v0.1.0
                  </span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <SidebarNav />
        </SidebarContent>
        <ShellSidebarFooter />
      </Sidebar>
      <SidebarInset
        id="main-content"
        className="gap-2 bg-transparent p-2 md:pl-0"
      >
        <Header />
        <div className="border-border supports-[backdrop-filter]:bg-background/60 bg-background flex min-h-0 flex-1 flex-col overflow-y-auto rounded-2xl border p-4 shadow-sm backdrop-blur-xl">
          {children}
        </div>
        <Footer />
      </SidebarInset>
    </SidebarProvider>
  );
}

export function AppShellLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return <ShellContent>{children}</ShellContent>;
}
