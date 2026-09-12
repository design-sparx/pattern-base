"use client";

import {
  IconBrandGithub,
  IconMoon,
  IconSearch,
  IconSun,
} from "@tabler/icons-react";
import { useTheme } from "next-themes";

import { useSpotlight } from "@/components/layout/spotlight-provider";
import { Button } from "@/components/ui/button";
import { Kbd, KbdGroup } from "@/components/ui/kbd";
import { SidebarTrigger } from "@/components/ui/sidebar";

export function Header() {
  const { setTheme, resolvedTheme } = useTheme();
  const colorScheme = resolvedTheme === "dark" ? "dark" : "light";
  const { open: openSpotlight } = useSpotlight();

  return (
    <header className="border-border bg-background sticky top-0 z-10 flex h-14 shrink-0 items-center gap-2 border-b px-4 md:px-6">
      <SidebarTrigger />
      <Button
        variant="ghost"
        size="sm"
        onClick={openSpotlight}
        aria-label="Search patterns"
        className="text-muted-foreground w-full max-w-60 justify-start gap-2 md:max-w-72"
      >
        <IconSearch data-icon="inline-start" />
        <span className="flex-1 text-left">Search patterns...</span>
        <KbdGroup>
          <Kbd>Ctrl</Kbd>
          <Kbd>K</Kbd>
        </KbdGroup>
      </Button>

      <div className="ml-auto flex items-center gap-0.5">
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
