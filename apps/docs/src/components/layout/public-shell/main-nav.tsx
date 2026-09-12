"use client";

import { cn } from "cn";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentPropsWithoutRef } from "react";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  getNavCategories,
  getNavResources,
  isHomePath,
  isPatternsPath,
  isResourcePath,
} from "@/lib/public-shell";

export function MainNav() {
  const pathname = usePathname();
  const categories = getNavCategories();
  const resources = getNavResources();
  const patternsActive = isPatternsPath(pathname);
  const resourcesActive = resources.some((res) =>
    isResourcePath(res.href, pathname),
  );

  return (
    <NavigationMenu
      aria-label="Main navigation"
      className="hidden flex-1 md:flex"
    >
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink active={isHomePath(pathname)} asChild>
            <Link href="/" className={navigationMenuTriggerStyle()}>
              Home
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger className={cn(patternsActive && "bg-muted")}>
            Patterns
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-1.5 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              <ListItem
                title="All Patterns"
                href="/patterns"
                active={patternsActive}
                className="md:col-span-2"
              >
                Browse every pattern across all five categories.
              </ListItem>
              {categories.map((cat) => (
                <ListItem
                  key={cat.id}
                  title={cat.name}
                  href={cat.href}
                  active={pathname.startsWith(`/patterns/${cat.id}`)}
                >
                  {cat.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger className={cn(resourcesActive && "bg-muted")}>
            Resources
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-1.5 md:w-[420px]">
              {resources.map((res) => (
                <ListItem
                  key={res.href}
                  title={res.label}
                  href={res.href}
                  active={isResourcePath(res.href, pathname)}
                >
                  {res.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

function ListItem({
  title,
  children,
  href,
  count,
  active,
  className,
  ...props
}: ComponentPropsWithoutRef<"li"> & {
  href: string;
  count?: number;
  active?: boolean;
}) {
  return (
    <li {...props} className={cn(className)}>
      <NavigationMenuLink active={active} asChild>
        <Link
          href={href}
          className="hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground block flex select-none flex-col items-start space-y-1 rounded-xl p-3 leading-none no-underline outline-none transition-colors"
        >
          <div className="flex items-center justify-between gap-2 text-sm font-medium">
            <span>{title}</span>
            {count !== undefined && (
              <span className="text-muted-foreground font-mono text-xs font-normal">
                {count}
              </span>
            )}
          </div>
          <div className="text-muted-foreground line-clamp-2 text-sm leading-snug">
            {children}
          </div>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}
