"use client";

import {
  IconBrandGithub,
  IconChevronRight,
  IconMoon,
  IconSearch,
  IconSun,
} from "@tabler/icons-react";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import type { ReactNode } from "react";

import { useSpotlight } from "@/components/layout/spotlight-provider";
import { Button } from "@/components/ui/button";
import { Kbd, KbdGroup } from "@/components/ui/kbd";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { getCategoryById, getPatternBySlug } from "@/data/patterns";
import { getCategoryColors } from "@/lib/category-colors";
import { cn } from "@/lib/utils";

function useShellTitle(): ReactNode {
  const pathname = usePathname();
  const parts = pathname.split("/").filter(Boolean);

  if (parts[0] === "patterns" && parts.length === 1) return "All patterns";

  if (parts.length === 2) {
    const category = getCategoryById(parts[1]);
    return category?.name ?? null;
  }

  if (parts.length === 3) {
    const category = getCategoryById(parts[1]);
    const pattern = getPatternBySlug(parts[2]);
    if (!category || !pattern) return null;
    const colors = getCategoryColors(pattern.category);
    return (
      <>
        <span className="min-w-0 truncate font-medium">{category.name}</span>
        <IconChevronRight
          className="text-muted-foreground/50 size-3.5 shrink-0"
          aria-hidden
        />
        <span className={cn("shrink-0 font-semibold", colors.text)}>
          {pattern.name}
        </span>
      </>
    );
  }

  return null;
}

export function Header() {
  const { setTheme, resolvedTheme } = useTheme();
  const colorScheme = resolvedTheme === "dark" ? "dark" : "light";
  const { open: openSpotlight } = useSpotlight();
  const title = useShellTitle();

  return (
    <header className="border-border bg-background supports-[backdrop-filter]:bg-background/60 sticky top-2 z-10 grid h-14 shrink-0 grid-cols-[1fr_auto_1fr] items-center gap-2 rounded-2xl border px-4 shadow-sm backdrop-blur-xl md:px-6">
      <div className="flex min-w-0 items-center gap-2">
        <SidebarTrigger className="lg:hidden" />
        {title ? (
          <h1 className="hidden min-w-0 items-center gap-1.5 text-sm sm:flex">
            {title}
          </h1>
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
          {colorScheme === "dark" ? <IconSun /> : <IconMoon />}
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
