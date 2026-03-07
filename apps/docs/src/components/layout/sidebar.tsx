"use client";

import {
  AppShell,
  Box,
  Collapse,
  NavLink,
  ScrollArea,
  Text,
  UnstyledButton,
} from "@mantine/core";
import {
  IconAdjustments,
  IconChevronRight,
  IconCompass,
  IconCreditCard,
  IconEye,
  IconKeyboard,
  IconLayoutGrid,
  IconShield,
} from "@tabler/icons-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

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
  const [openSections, setOpenSections] = useState<Record<string, boolean>>(
    () => {
      const initial: Record<string, boolean> = {};
      categories.forEach((cat) => {
        initial[cat.id] = pathname.includes(`/patterns/${cat.id}`);
      });
      return initial;
    },
  );

  const toggleSection = (id: string) => {
    setOpenSections((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <>
      <AppShell.Section grow my="md" component={ScrollArea} px="md">
        <NavLink
          component={Link}
          href="/patterns"
          label="All Patterns"
          leftSection={<IconLayoutGrid size={18} stroke={1.5} />}
          active={pathname === "/patterns"}
          fw={500}
          mb={4}
          variant="light"
          color="violet"
        />

        {categories.map((cat) => {
          const catPatterns = getPatternsByCategory(cat.id);
          const isCatActive = pathname.includes(`/patterns/${cat.id}`);
          const isOpen = openSections[cat.id] ?? false;
          const Icon = categoryIcons[cat.id] ?? IconLayoutGrid;

          return (
            <Box key={cat.id} mb={2}>
              <UnstyledButton
                onClick={() => {
                  toggleSection(cat.id);
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                  padding: "8px 12px",
                  borderRadius: "var(--mantine-radius-md)",
                  gap: 8,
                }}
              >
                <Icon size={16} stroke={1.5} />
                <Text
                  fz="sm"
                  fw={isCatActive ? 600 : 500}
                  style={{
                    flex: 1,
                    color: isCatActive
                      ? "var(--mantine-primary-color-filled)"
                      : "var(--mantine-color-text)",
                  }}
                >
                  {cat.name} ({catPatterns.length})
                </Text>
                <IconChevronRight
                  size={14}
                  style={{
                    transform: isOpen ? "rotate(90deg)" : "none",
                    transition: "transform 0.2s ease",
                    color: "var(--mantine-color-dimmed)",
                  }}
                />
              </UnstyledButton>
              <Collapse in={isOpen}>
                <Box ml={16} mt={2}>
                  {catPatterns.map((p) => (
                    <NavLink
                      key={p.id}
                      component={Link}
                      href={`/patterns/${cat.id}/${p.slug}`}
                      label={p.name}
                      active={pathname === `/patterns/${cat.id}/${p.slug}`}
                      fz="sm"
                      py={6}
                      variant="light"
                      color="violet"
                    />
                  ))}
                </Box>
              </Collapse>
            </Box>
          );
        })}

        <Box
          mt="md"
          pt="md"
          style={{ borderTop: "1px solid var(--mantine-color-default-border)" }}
        >
          <NavLink
            component={Link}
            href="/pricing"
            label="Pricing"
            leftSection={<IconCreditCard size={18} stroke={1.5} />}
            active={pathname === "/pricing"}
            fz="sm"
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
            AI Vory v0.1.0
          </Text>
        </Box>
      </AppShell.Section>
    </>
  );
}
