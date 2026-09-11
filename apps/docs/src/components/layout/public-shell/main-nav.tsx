"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "cn";

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
  isHomePath,
  isPatternsPath,
} from "@/lib/public-shell";

export function MainNav() {
  const pathname = usePathname();
  const categories = getNavCategories();
  const patternsActive = isPatternsPath(pathname);

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
          <NavigationMenuContent className="w-56">
            <ul className="grid gap-1 p-1">
              <li>
                <NavigationMenuLink asChild>
                  <Link
                    href="/patterns"
                    className={patternsActive ? "text-foreground" : undefined}
                  >
                    All Patterns
                  </Link>
                </NavigationMenuLink>
              </li>
              {categories.map((cat) => (
                <li key={cat.id}>
                  <NavigationMenuLink asChild>
                    <Link href={cat.href}>
                      <span>{cat.name}</span>
                      <span className="text-muted-foreground ml-auto font-mono text-xs">
                        {cat.count}
                      </span>
                    </Link>
                  </NavigationMenuLink>
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
