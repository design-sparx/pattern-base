"use client";

import { IconInfoCircle, IconSparkles } from "@tabler/icons-react";
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
} from "@/components/ui/sidebar";

function ShellContent({ children }: Readonly<{ children: ReactNode }>) {
  const pathname = usePathname();

  return (
    <SidebarProvider className="app-canvas">
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
        <SidebarFooter>
          <SidebarMenu>
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
      </Sidebar>
      <SidebarInset
        id="main-content"
        className="gap-2 bg-transparent p-2 md:pl-0"
      >
        <Header />
        <div className="border-border bg-background supports-[backdrop-filter]:bg-background/60 flex flex-1 flex-col rounded-2xl border shadow-sm backdrop-blur-xl">
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
