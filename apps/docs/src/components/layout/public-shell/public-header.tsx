"use client";

import {
  IconBrandGithub,
  IconMoon,
  IconSearch,
  IconSparkles,
  IconSun,
} from "@tabler/icons-react";
import Link from "next/link";
import { useTheme } from "next-themes";

import { MainNav } from "./main-nav";
import { MobileNav } from "./mobile-nav";

import { useSpotlight } from "@/components/layout/spotlight-provider";
import { Button } from "@/components/ui/button";

export function PublicHeader() {
  const { setTheme, resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const { open: openSpotlight } = useSpotlight();

  return (
    <header className="border-border bg-background/80 sticky top-0 z-40 border-b backdrop-blur">
      <div className="app-container flex h-14 items-center gap-6">
        <div className="flex items-center gap-2">
          <MobileNav />
          <Link
            href="/"
            aria-label="PatternBase home"
            className="text-foreground flex items-center gap-2"
          >
            <IconSparkles
              size={22}
              className="text-primary"
              aria-hidden="true"
            />
            <span className="text-lg font-bold">PatternBase</span>
          </Link>
        </div>

        <MainNav />

        <div className="ml-auto flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={openSpotlight}
            aria-label="Search patterns"
            className="text-muted-foreground"
          >
            <IconSearch className="size-[18px]" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            aria-label={
              isDark ? "Switch to light theme" : "Switch to dark theme"
            }
            onClick={() => {
              setTheme(isDark ? "light" : "dark");
            }}
            className="text-muted-foreground"
          >
            {isDark ? (
              <IconSun className="size-[18px]" />
            ) : (
              <IconMoon className="size-[18px]" />
            )}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            asChild
            aria-label="GitHub"
            className="text-muted-foreground"
          >
            <a
              href="https://github.com/kelvink96/pattern-base"
              target="_blank"
              rel="noopener noreferrer"
            >
              <IconBrandGithub className="size-[18px]" />
            </a>
          </Button>
        </div>
      </div>
    </header>
  );
}
