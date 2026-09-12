"use client";

import { IconBrandGithub, IconMenu2 } from "@tabler/icons-react";
import { cn } from "cn";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  getNavCategories,
  isHomePath,
  isPatternsPath,
} from "@/lib/public-shell";

const navItem =
  "flex items-center justify-between gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors";
const navActive = "bg-muted text-foreground";
const navIdle = "text-muted-foreground hover:bg-muted hover:text-foreground";

export function MobileNav() {
  const pathname = usePathname();
  const categories = getNavCategories();
  const [open, setOpen] = useState(false);

  const linkClass = (active: boolean) =>
    cn(navItem, active ? navActive : navIdle);

  return (
    <div className="md:hidden">
      <Drawer open={open} onOpenChange={setOpen} direction="left">
        <DrawerTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground"
            aria-label="Open navigation"
          >
            <IconMenu2 className="size-5" />
          </Button>
        </DrawerTrigger>
        <DrawerContent className="w-72 p-3">
          <DrawerHeader className="gap-0.5 px-1 pt-2">
            <DrawerTitle>PatternBase</DrawerTitle>
            <DrawerDescription>
              54 AI-UX patterns across four frameworks
            </DrawerDescription>
          </DrawerHeader>

          <nav className="mt-3 flex flex-col gap-1" aria-label="Mobile">
            <DrawerClose asChild>
              <Link href="/" className={linkClass(isHomePath(pathname))}>
                Home
              </Link>
            </DrawerClose>
            <DrawerClose asChild>
              <Link
                href="/patterns"
                className={linkClass(isPatternsPath(pathname))}
              >
                All Patterns
              </Link>
            </DrawerClose>

            <p className="text-muted-foreground px-3 pb-1 pt-3 text-xs font-semibold uppercase tracking-wider">
              Categories
            </p>
            {categories.map((cat) => (
              <DrawerClose asChild key={cat.id}>
                <Link
                  href={cat.href}
                  className={linkClass(
                    isPatternsPath(pathname) &&
                      pathname.startsWith(`/patterns/${cat.id}`),
                  )}
                >
                  <span>{cat.name}</span>
                  <span className="text-muted-foreground font-mono text-xs">
                    {cat.count}
                  </span>
                </Link>
              </DrawerClose>
            ))}
          </nav>

          <div className="border-border mt-auto border-t pt-3">
            <a
              href="https://github.com/kelvink96/pattern-base"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:bg-muted hover:text-foreground flex items-center gap-2 px-3 py-2 text-sm font-medium transition-colors"
            >
              <IconBrandGithub className="size-4" />
              GitHub
            </a>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
