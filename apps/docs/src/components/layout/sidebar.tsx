"use client";

import { Box, Divider, NavLink } from "@mantine/core";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { categories, getPatternsByCategory } from "@/data/patterns";

export function Sidebar() {
  const pathname = usePathname();

  return (
    <Box
      component="aside"
      style={{
        position: "fixed",
        left: 0,
        top: "var(--header-height)",
        bottom: 0,
        width: "var(--sidebar-width)",
        borderRight: "1px solid var(--mantine-color-gray-2)",
        backgroundColor: "white",
        overflowY: "auto",
        padding: 16,
      }}
    >
      <nav>
        <NavLink
          component={Link}
          href="/patterns"
          label="All Patterns"
          active={pathname === "/patterns"}
          fw={500}
          mb={8}
        />

        {categories.map((cat) => {
          const catPatterns = getPatternsByCategory(cat.id);
          const isActive = pathname.includes(`/patterns/${cat.id}`);

          return (
            <Box key={cat.id} mb="sm">
              <NavLink
                component={Link}
                href={`/patterns/${cat.id}`}
                label={`${cat.icon} ${cat.name}`}
                active={isActive}
                fw={600}
                variant="subtle"
              />
              <Box ml="sm">
                {catPatterns.map((p) => (
                  <NavLink
                    key={p.id}
                    component={Link}
                    href={`/patterns/${cat.id}/${p.slug}`}
                    label={p.name}
                    active={pathname === `/patterns/${cat.id}/${p.slug}`}
                    fz="sm"
                    py={6}
                  />
                ))}
              </Box>
            </Box>
          );
        })}

        <Divider my="md" />

        <NavLink
          component={Link}
          href="/pricing"
          label="Pricing"
          active={pathname === "/pricing"}
          fz="sm"
        />
      </nav>
    </Box>
  );
}
