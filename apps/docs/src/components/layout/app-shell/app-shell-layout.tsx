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
    <SidebarProvider>
      <Sidebar collapsible="icon">
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
      <SidebarInset>
        <Header />
        <main id="main-content" className="flex flex-1 flex-col">
          {children}
        </main>
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
