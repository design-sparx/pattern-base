"use client";

import { useRouter } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { categories, patterns } from "@/data/patterns";
import { getCategoryIcon } from "@/lib/category-icons";

interface SpotlightContextValue {
  open: () => void;
  close: () => void;
}

const SpotlightContext = createContext<SpotlightContextValue | null>(null);

export function useSpotlight(): SpotlightContextValue {
  const ctx = useContext(SpotlightContext);
  if (!ctx) {
    throw new Error("useSpotlight must be used within a SpotlightProvider");
  }
  return ctx;
}

export function SpotlightProvider({
  children,
}: {
  children?: React.ReactNode;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const openSpotlight = useCallback(() => {
    setOpen(true);
  }, []);

  const closeSpotlight = useCallback(() => {
    setOpen(false);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const groups = useMemo(
    () =>
      categories
        .map((category) => ({
          category,
          items: patterns.filter((p) => p.category === category.id),
        }))
        .filter((group) => group.items.length > 0),
    [],
  );

  const contextValue = useMemo<SpotlightContextValue>(
    () => ({ open: openSpotlight, close: closeSpotlight }),
    [openSpotlight, closeSpotlight],
  );

  return (
    <SpotlightContext.Provider value={contextValue}>
      {children}
      <CommandDialog
        open={open}
        onOpenChange={setOpen}
        title="Search patterns"
        description="Search for a pattern, category, or tag"
      >
        <Command>
          <CommandInput autoFocus placeholder="Search patterns..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            {groups.map(({ category, items }) => {
              const Icon = getCategoryIcon(category.id);
              return (
                <CommandGroup key={category.id} heading={category.name}>
                  {items.map((pattern) => (
                    <CommandItem
                      key={pattern.id}
                      value={`${pattern.name} ${pattern.description} ${pattern.tags.join(" ")} ${category.name}`}
                      onSelect={() => {
                        router.push(
                          `/patterns/${pattern.category}/${pattern.slug}`,
                        );
                        closeSpotlight();
                      }}
                      className="py-2"
                    >
                      <Icon className="text-muted-foreground shrink-0" />
                      <div className="flex flex-col">
                        <span>{pattern.name}</span>
                        <span className="text-muted-foreground text-xs">
                          {pattern.description}
                        </span>
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              );
            })}
          </CommandList>
        </Command>
      </CommandDialog>
    </SpotlightContext.Provider>
  );
}
