"use client";

import { useState } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Github, Moon, Search, Sparkles, Sun } from "lucide-react";

export function PublicHeader() {
  const { setTheme, resolvedTheme } = useTheme();
  const colorScheme = resolvedTheme === "dark" ? "dark" : "light";
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 py-4">
      <div className="flex items-center gap-2">
        <Link href="/" className="flex items-center gap-2 no-underline">
          <Sparkles
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
          onClick={() => setSearchOpen(true)}
          className="header-search flex items-center gap-2 rounded-md border border-gray-300 bg-white px-3 py-1.5 text-xs text-gray-500 transition-colors duration-150 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400"
          aria-label="Search patterns"
          style={{ minWidth: 220 }}
        >
          <Search size={14} />
          <span className="sm:hidden">Search...</span>
          <span className="hidden flex-1 text-left sm:block">
            Search patterns...
          </span>
          <div className="flex items-center gap-1 sm:hidden">
            <kbd className="rounded border border-gray-300 px-1.5 py-0.5 font-sans text-[10px] dark:border-gray-700">
              Ctrl
            </kbd>
            <kbd className="rounded border border-gray-300 px-1.5 py-0.5 font-sans text-[10px] dark:border-gray-700">
              K
            </kbd>
          </div>
        </button>

        {searchOpen && (
          <div className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh]">
            <div className="w-full max-w-xl rounded-lg border border-gray-200 bg-white p-4 shadow-lg dark:border-gray-800 dark:bg-gray-900">
              <input
                autoFocus
                placeholder="Search patterns..."
                className="w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm outline-none dark:border-gray-700"
              />
              <button
                onClick={() => setSearchOpen(false)}
                className="mt-2 text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                Close
              </button>
            </div>
          </div>
        )}

        <button
          onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
          aria-label="Toggle color scheme"
          className="inline-flex h-9 w-9 items-center justify-center rounded-md text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-100"
        >
          {colorScheme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        <a
          href="https://github.com/kelvink96/pattern-base"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          className="inline-flex h-9 w-9 items-center justify-center rounded-md text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-100"
        >
          <Github size={18} />
        </a>
      </div>
    </div>
  );
}
