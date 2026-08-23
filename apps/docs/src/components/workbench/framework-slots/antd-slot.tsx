"use client";

import { useMantineColorScheme } from "@mantine/core";
import { ConfigProvider, theme as antdTheme } from "antd";

import { antdRegistry } from "@/lib/registry/antd";

interface SlotProps {
  patternId: string;
}

export function AntdSlot({ patternId }: SlotProps) {
  const { colorScheme } = useMantineColorScheme();
  const Component = antdRegistry[patternId];
  if (!Component) return null;
  return (
    <div className="antd-preview">
      <ConfigProvider
        theme={{
          algorithm:
            colorScheme === "dark"
              ? antdTheme.darkAlgorithm
              : antdTheme.defaultAlgorithm,
        }}
      >
        <Component />
      </ConfigProvider>
    </div>
  );
}
