import { categories, getPatternsByCategory } from "@/data/patterns";

export interface PublicNavCategory {
  id: string;
  name: string;
  count: number;
  href: string;
  description: string;
}

export interface PublicNavResource {
  label: string;
  href: string;
  description: string;
}

export function getNavCategories(): PublicNavCategory[] {
  return categories.map((cat) => ({
    id: cat.id,
    name: cat.name,
    count: getPatternsByCategory(cat.id).length,
    href: `/patterns/${cat.id}`,
    description: cat.description,
  }));
}

export function getNavResources(): PublicNavResource[] {
  return [
    {
      label: "About",
      href: "/about",
      description: "What PatternBase is and where it comes from.",
    },
    {
      label: "Changelog",
      href: "/changelog",
      description: "Releases and notable changes across the project.",
    },
    {
      label: "Contact",
      href: "/contact",
      description: "Report bugs, request patterns, or ask questions.",
    },
    {
      label: "Privacy",
      href: "/privacy",
      description: "How the site and the npm packages handle data.",
    },
  ];
}

export function isHomePath(pathname: string): boolean {
  return pathname === "/";
}

export function isPatternsPath(pathname: string): boolean {
  return pathname.startsWith("/patterns");
}

export function isResourcePath(href: string, pathname: string): boolean {
  return pathname === href || pathname.startsWith(`${href}/`);
}
