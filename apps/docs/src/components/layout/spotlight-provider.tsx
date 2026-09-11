"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { IconSearch } from "@tabler/icons-react";
import { registry } from "@/lib/registry";
import { categories, patterns } from "@/data/patterns";

const categoryIcons: Record<string, React.ReactNode> = {
  "prompt-actions": "⌨️",
  wayfinders: "🧭",
  tuners: "🎚️",
  governors: "👁️",
  "trust-builders": "🛡️",
};

export function SpotlightProvider({
  children,
}: {
  children?: React.ReactNode;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const items = useMemo(() => {
    if (!query.trim()) return patterns.slice(0, 7);
    const q = query.toLowerCase();
    return patterns
      .filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q)) ||
          p.category.toLowerCase().includes(q),
      )
      .slice(0, 7);
  }, [query]);

  return (
    <>
      {children}
      {open && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh]">
          <div
            className="fixed inset-0 bg-black/50"
            onClick={() => setOpen(false)}
          />
          <div className="relative w-full max-w-xl rounded-lg border border-gray-200 bg-white shadow-xl dark:border-gray-800 dark:bg-gray-900">
            <div className="flex items-center gap-2 border-b border-gray-200 px-4 py-3 dark:border-gray-800">
              <IconSearch className="size-4 text-gray-400" />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search patterns..."
                className="flex-1 bg-transparent text-sm outline-none placeholder:text-gray-400 dark:text-gray-100"
              />
              <kbd className="rounded border border-gray-300 px-1.5 py-0.5 text-[10px] text-gray-400 dark:border-gray-700">
                ESC
              </kbd>
            </div>
            <div className="max-h-[300px] overflow-y-auto p-2">
              {items.length === 0 ? (
                <p className="py-6 text-center text-sm text-gray-400">
                  No patterns found.
                </p>
              ) : (
                items.map((p) => {
                  const cat = categories.find((c) => c.id === p.category);
                  return (
                    <button
                      key={p.id}
                      onClick={() => {
                        router.push(`/patterns/${p.category}/${p.slug}`);
                        setOpen(false);
                        setQuery("");
                      }}
                      className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                      <span className="text-lg">
                        {categoryIcons[p.category] ?? "📄"}
                      </span>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900 dark:text-gray-100">
                          {p.name}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {cat?.name ?? p.category}
                        </p>
                      </div>
                    </button>
                  );
                })
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
