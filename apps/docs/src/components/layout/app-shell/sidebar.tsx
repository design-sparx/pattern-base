"use client";

import { AppShell, Box, NavLink, ScrollArea, Text } from "@mantine/core";
import {
  IconAdjustments,
  IconCompass,
  IconEye,
  IconInfoCircle,
  IconKeyboard,
  IconLayoutGrid,
  IconShield,
} from "@tabler/icons-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { categories, getPatternsByCategory } from "@/data/patterns";

const categoryIcons: Record<string, React.ElementType> = {
  "prompt-actions": IconKeyboard,
  wayfinders: IconCompass,
  tuners: IconAdjustments,
  governors: IconEye,
  "trust-builders": IconShield,
};

export function Sidebar() {
  const pathname = usePathname();

  return (
    <>
      <AppShell.Section grow my="md" component={ScrollArea}>
        <NavLink
          component={Link}
          href="/patterns"
          label="All Patterns"
          leftSection={<IconLayoutGrid size={16} stroke={1.5} />}
          active={pathname === "/patterns"}
          aria-current={pathname === "/patterns" ? "page" : undefined}
          variant="light"
          color="violet"
          fw={500}
          mb={4}
        />

        {categories.map((cat) => {
          const catPatterns = getPatternsByCategory(cat.id);
          const isCatActive = pathname.includes(`/patterns/${cat.id}`);
          const isOpen = pathname.includes(`/patterns/${cat.id}`);
          const Icon = categoryIcons[cat.id] ?? IconLayoutGrid;

          return (
            <NavLink
              key={cat.id}
              label={`${cat.name} (${String(catPatterns.length)})`}
              leftSection={<Icon size={16} stroke={1.5} />}
              active={isCatActive}
              defaultOpened={isOpen}
              variant="light"
              color="violet"
              fw={500}
              childrenOffset={28}
              mb={2}
            >
              <Box
                style={{
                  borderLeft: "1.5px solid var(--mantine-color-default-border)",
                  marginLeft: 4,
                }}
              >
                {catPatterns.map((p) => (
                  <NavLink
                    key={p.id}
                    component={Link}
                    href={`/patterns/${cat.id}/${p.slug}`}
                    label={p.name}
                    active={pathname === `/patterns/${cat.id}/${p.slug}`}
                    aria-current={
                      pathname === `/patterns/${cat.id}/${p.slug}`
                        ? "page"
                        : undefined
                    }
                    variant="light"
                    color="violet"
                  />
                ))}
              </Box>
            </NavLink>
          );
        })}

        <Box
          mt="md"
          pt="md"
          style={{ borderTop: "1px solid var(--mantine-color-default-border)" }}
        >
          <NavLink
            component={Link}
            href="/about"
            label="About"
            leftSection={<IconInfoCircle size={16} stroke={1.5} />}
            active={pathname === "/about"}
            variant="light"
            color="violet"
          />
        </Box>
      </AppShell.Section>
      <AppShell.Section>
        <Box mt="auto">
          <Text
            fz={10}
            c="dimmed"
            ta="center"
            style={{ opacity: 0.6, letterSpacing: "0.03em" }}
          >
            PatternBase v0.1.0
          </Text>
        </Box>
      </AppShell.Section>
    </>
  );
}
