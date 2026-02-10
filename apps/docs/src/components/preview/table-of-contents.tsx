"use client";

import { Box, Text } from "@mantine/core";
import { useEffect, useState } from "react";

interface TocItem {
  id: string;
  label: string;
}

interface TableOfContentsProps {
  items: TocItem[];
}

export function TableOfContents({ items }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "-80px 0px -60% 0px", threshold: 0 },
    );

    for (const item of items) {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    }

    return () => {
      observer.disconnect();
    };
  }, [items]);

  return (
    <Box
      component="nav"
      style={{
        position: "sticky",
        top: "calc(var(--header-height, 60px) + 24px)",
      }}
    >
      <Text fz="xs" fw={700} tt="uppercase" c="dimmed" mb="sm">
        On this page
      </Text>
      <Box
        style={{
          borderLeft: "1px solid var(--mantine-color-default-border)",
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        {items.map((item) => (
          <Box
            key={item.id}
            component="a"
            href={`#${item.id}`}
            onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
              e.preventDefault();
              document.getElementById(item.id)?.scrollIntoView({
                behavior: "smooth",
                block: "start",
              });
            }}
            py={4}
            px="md"
            fz="sm"
            style={{
              textDecoration: "none",
              color:
                activeId === item.id
                  ? "var(--mantine-color-violet-6)"
                  : "var(--mantine-color-dimmed)",
              fontWeight: activeId === item.id ? 600 : 400,
              borderLeft:
                activeId === item.id
                  ? "2px solid var(--mantine-color-violet-6)"
                  : "2px solid transparent",
              marginLeft: -1,
              transition: "color 150ms ease, border-color 150ms ease",
            }}
          >
            {item.label}
          </Box>
        ))}
      </Box>
    </Box>
  );
}
