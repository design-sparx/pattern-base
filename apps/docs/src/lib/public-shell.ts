import { categories, getPatternsByCategory } from "@/data/patterns";

export interface PublicNavCategory {
  id: string;
  name: string;
  count: number;
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

export function isHomePath(pathname: string): boolean {
  return pathname === "/";
}

export function isPatternsPath(pathname: string): boolean {
  return pathname.startsWith("/patterns");
}
