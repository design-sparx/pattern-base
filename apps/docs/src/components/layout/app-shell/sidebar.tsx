"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  IconCompass,
  IconEye,
  IconInfoCircle,
  IconKeyboard,
  IconLayoutGrid,
  IconSettings,
  IconShield,
} from "@tabler/icons-react";

import { categories, getPatternsByCategory } from "@/data/patterns";

const categoryIcons: Record<string, React.ElementType> = {
  "prompt-actions": IconKeyboard,
  wayfinders: IconCompass,
  tuners: IconSettings,
  governors: IconEye,
  "trust-builders": IconShield,
};

export function Sidebar() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-1 p-3">
      <Link
        href="/patterns"
        className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
          pathname === "/patterns"
            ? "bg-violet-50 text-violet-700 dark:bg-violet-950 dark:text-violet-300"
            : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
        }`}
      >
        <IconLayoutGrid size={16} />
        All Patterns
      </Link>

      {categories.map((cat) => {
        const catPatterns = getPatternsByCategory(cat.id);
        const isCatActive = pathname.includes(`/patterns/${cat.id}`);
        const isOpen = pathname.includes(`/patterns/${cat.id}`);
        const Icon = categoryIcons[cat.id] ?? LayoutGrid;

        return (
          <div key={cat.id} className="flex flex-col">
            <Link
              href={`/patterns/${cat.id}`}
              className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                isCatActive
                  ? "bg-violet-50 text-violet-700 dark:bg-violet-950 dark:text-violet-300"
                  : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
              }`}
            >
              <Icon size={16} />
              {cat.name} ({catPatterns.length})
            </Link>
            {isOpen && (
              <div className="ml-4 flex flex-col gap-0.5 border-l border-gray-200 pl-2 dark:border-gray-700">
                {catPatterns.map((p) => (
                  <Link
                    key={p.id}
                    href={`/patterns/${cat.id}/${p.slug}`}
                    className={`rounded-md px-3 py-1.5 text-sm transition-colors ${
                      pathname === `/patterns/${cat.id}/${p.slug}`
                        ? "bg-violet-50 text-violet-700 dark:bg-violet-950 dark:text-violet-300"
                        : "text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
                    }`}
                  >
                    {p.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        );
      })}

      <Link
        href="/about"
        className={`mt-2 flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
          pathname === "/about"
            ? "bg-violet-50 text-violet-700 dark:bg-violet-950 dark:text-violet-300"
            : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
        }`}
      >
        <IconInfoCircle size={16} />
        About
      </Link>
    </nav>
  );
}
