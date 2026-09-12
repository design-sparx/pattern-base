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

import { useSpotlight } from "@/components/layout/spotlight-provider";

export function Header({ onToggleSidebar }: { onToggleSidebar: () => void }) {
  const { setTheme, resolvedTheme } = useTheme();
  const colorScheme = resolvedTheme === "dark" ? "dark" : "light";
  const { open: openSpotlight } = useSpotlight();

  return (
    <div className="flex h-full items-center justify-between px-4">
      <div className="flex items-center gap-2">
        <button
          onClick={onToggleSidebar}
          className="inline-flex h-9 w-9 items-center justify-center rounded-md text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900 sm:hidden dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-100"
          aria-label="Toggle sidebar"
        >
          <svg
            className="size-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
        <Link href="/" className="flex items-center gap-2 no-underline">
          <IconSparkles
            size={24}
            className="text-violet-600 dark:text-violet-400"
            aria-hidden="true"
          />
          <span className="text-lg font-bold text-gray-900 dark:text-gray-100">
            PatternBase
          </span>
          <span className="inline-flex items-center rounded-md border border-dashed border-violet-500 px-1.5 py-0.5 text-xs font-medium text-violet-600 dark:text-violet-400">
            v0.1.0
          </span>
        </Link>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={openSpotlight}
          className="header-search flex items-center gap-2 rounded-md border border-gray-300 bg-white px-3 py-1.5 text-xs text-gray-500 transition-colors duration-150 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400"
          aria-label="Search patterns"
          style={{ minWidth: 220 }}
        >
          <IconSearch size={14} />
          <span className="flex-1 text-left">Search patterns...</span>
          <div className="flex items-center gap-1">
            <kbd className="rounded border border-gray-300 px-1.5 py-0.5 font-sans text-[10px] dark:border-gray-700">
              Ctrl
            </kbd>
            <kbd className="rounded border border-gray-300 px-1.5 py-0.5 font-sans text-[10px] dark:border-gray-700">
              K
            </kbd>
          </div>
        </button>

        <button
          onClick={() => {
            setTheme(resolvedTheme === "dark" ? "light" : "dark");
          }}
          aria-label="Toggle color scheme"
          className="inline-flex h-9 w-9 items-center justify-center rounded-md text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-100"
        >
          {colorScheme === "dark" ? (
            <IconSun size={18} />
          ) : (
            <IconMoon size={18} />
          )}
        </button>

        <a
          href="https://github.com/kelvink96/pattern-base"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          className="inline-flex h-9 w-9 items-center justify-center rounded-md text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-100"
        >
          <IconBrandGithub size={18} />
        </a>
      </div>
    </div>
  );
}
