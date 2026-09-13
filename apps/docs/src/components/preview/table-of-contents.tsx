"use client";

import { useEffect, useId, useMemo, useState } from "react";

import { cn } from "@/lib/utils";

interface TocItem {
  id: string;
  label: string;
}

interface TableOfContentsProps {
  items: TocItem[];
  className?: string;
}

export function TableOfContents({
  items,
  className,
}: Readonly<TableOfContentsProps>) {
  const [activeId, setActiveId] = useState<string>(items[0]?.id ?? "");
  const sectionId = useId();

  useEffect(() => {
    if (items.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              a.target.getBoundingClientRect().top -
              b.target.getBoundingClientRect().top,
          );

        if (visible[0]) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        rootMargin: "0px 0px -56px 0px",
        threshold: 0,
      },
    );

    items.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [items]);

  const handleClick = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;

    const header = document.querySelector(
      '[data-slot="app-shell-header"], header',
    );
    const offset = header ? (header as HTMLElement).offsetHeight + 12 : 56;

    el.scrollIntoView({ behavior: "smooth", block: "start" });
    const top = el.getBoundingClientRect().top + window.pageYOffset - offset;
    window.scrollTo({ top, behavior: "smooth" });
  };

  const activeLabel = useMemo(
    () => items.find((item) => item.id === activeId)?.label,
    [activeId, items],
  );

  return (
    <nav
      aria-labelledby={`${sectionId}-title`}
      className={cn("hidden xl:block", className)}
    >
      <p
        id={`${sectionId}-title`}
        className="text-muted-foreground mb-3 text-xs font-semibold uppercase tracking-wider"
      >
        {activeLabel ?? "On this page"}
      </p>
      <ul className="space-y-1">
        {items.map((item) => (
          <li key={item.id}>
            <button
              type="button"
              onClick={() => handleClick(item.id)}
              className={cn(
                "block w-full text-left text-sm transition-colors",
                activeId === item.id
                  ? "text-foreground font-medium"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {item.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
