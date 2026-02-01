"use client";

import { Spotlight } from "@mantine/spotlight";
import { useRouter } from "next/navigation";
import { categories, patterns } from "@/data/patterns";
import {
  IconKeyboard,
  IconCompass,
  IconAdjustments,
  IconEye,
  IconShield,
} from "@tabler/icons-react";

const categoryIcons: Record<string, React.ReactNode> = {
  "prompt-actions": <IconKeyboard size={18} />,
  wayfinders: <IconCompass size={18} />,
  tuners: <IconAdjustments size={18} />,
  governors: <IconEye size={18} />,
  "trust-builders": <IconShield size={18} />,
};

export function SpotlightProvider() {
  const router = useRouter();

  const actions = patterns.map((p) => {
    const cat = categories.find((c) => c.id === p.category);
    return {
      id: p.id,
      label: p.name,
      description: p.description,
      leftSection: categoryIcons[p.category],
      group: cat?.name ?? p.category,
      onClick: () => {
        router.push(`/patterns/${p.category}/${p.slug}`);
      },
      keywords: [...p.tags, p.category, p.name].join(" "),
    };
  });

  return (
    <Spotlight
      shortcut={["mod + K"]}
      actions={actions}
      nothingFound="No patterns found"
      searchProps={{
        placeholder: "Search patterns...",
      }}
    />
  );
}
