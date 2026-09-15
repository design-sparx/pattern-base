"use client";

import {
  IconBrandGithub,
  IconMoon,
  IconSearch,
  IconSun,
} from "@tabler/icons-react";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";

import { useSpotlight } from "@/components/layout/spotlight-provider";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Kbd, KbdGroup } from "@/components/ui/kbd";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { getCategoryById, getPatternBySlug } from "@/data/patterns";
import { Logo } from "@/components/layout/logo";

function useShellTitle(): ReactNode {
  const pathname = usePathname();
  const parts = pathname.split("/").filter(Boolean);

  if (parts[0] === "patterns" && parts.length === 1) {
    return (
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbPage>All patterns</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    );
  }

  if (parts.length === 2) {
    const category = getCategoryById(parts[1]);
    if (!category) return null;
    return (
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/patterns">All patterns</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{category.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    );
  }

  if (parts.length === 3) {
    const category = getCategoryById(parts[1]);
    const pattern = getPatternBySlug(parts[2]);
    if (!category || !pattern) return null;
    return (
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/patterns">All patterns</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href={`/patterns/${category.id}`}>
              {category.name}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="font-semibold">
              {pattern.name}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    );
  }

  return null;
}

export function Header() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const colorScheme = resolvedTheme === "dark" ? "dark" : "light";
  const { open: openSpotlight } = useSpotlight();
  const title = useShellTitle();

  useEffect(() => {
    setMounted(true);
  }, []);

  let themeIcon: ReactNode = null;
  if (mounted) {
    themeIcon =
      colorScheme === "dark" ? <IconSun key="sun" /> : <IconMoon key="moon" />;
  }

  return (
    <header className="border-border bg-background supports-[backdrop-filter]:bg-background/60 sticky top-2 z-10 grid h-14 shrink-0 grid-cols-[1fr_auto_1fr] items-center gap-2 rounded-2xl border px-4 shadow-sm backdrop-blur-xl md:px-6">
      <div className="flex min-w-0 items-center gap-2">
        <SidebarTrigger className="lg:hidden" />
        <div className="hidden min-w-0 items-center gap-1.5 text-sm sm:flex">
          <Logo size={18} />
        </div>
        {title ? (
          <div className="hidden min-w-0 items-center gap-1.5 text-sm sm:flex">
            {title}
          </div>
        ) : null}
      </div>

      <Button
        variant="ghost"
        size="sm"
        onClick={openSpotlight}
        aria-label="Search patterns"
        className="text-muted-foreground bg-input/50 hover:bg-input/70 w-full max-w-60 justify-start gap-2 whitespace-nowrap md:max-w-72"
      >
        <IconSearch data-icon="inline-start" />
        <span className="flex-1 text-left">Search patterns...</span>
        <KbdGroup>
          <Kbd>Ctrl</Kbd>
          <Kbd>K</Kbd>
        </KbdGroup>
      </Button>

      <div className="flex items-center justify-end gap-0.5">
        <Button
          variant="ghost"
          size="icon-sm"
          aria-label="Toggle color scheme"
          onClick={() => {
            setTheme(colorScheme === "dark" ? "light" : "dark");
          }}
        >
          {themeIcon}
        </Button>
        <Button variant="ghost" size="icon-sm" aria-label="GitHub" asChild>
          <a
            href="https://github.com/kelvink96/pattern-base"
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconBrandGithub />
          </a>
        </Button>
      </div>
    </header>
  );
}
